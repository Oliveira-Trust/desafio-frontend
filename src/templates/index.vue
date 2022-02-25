<template>
  <main class="main">
    <Header />
    <div class="content">
      <Title @add="add" />
      <Search @update:input="searchInput" @update:submit="searchSubmit" />
      <Wallet
        :users="usersFilter"
        @handleCsv="handleCsv"
        @updateUser="updateUser"
        @deleteUser="deleteUser"
      />
      <Pagination
        :usersLength="users.length"
        :showPagination="showPagination"
        :itemsPerPage="itemsPerPage"
        @pagination="pagination"
        :page="page"
      />
      <Footer />
    </div>
    <ModalCreateAndUpdate
      v-if="showModalCreateAndUpdate"
      :fieldsError="fieldsError"
      :nome="createAndUpdateUser.nome"
      :sobrenome="createAndUpdateUser.sobrenome"
      :email="createAndUpdateUser.email"
      :id="createAndUpdateUser.id"
      :valorDeCompra="createAndUpdateUser.valor_carteira"
      @update:input="createAndUpdateInput"
      @createAndUpdateActions="createAndUpdateActions"
    />
    <ModalDelete v-if="showModalDelete" @deleteActions="deleteActions" />
  </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { csvExport } from "@/helpers";
import Header from "@/components/Header";
import Title from "@/components/Title";
import Search from "@/components/Search";
import Wallet from "@/components/Wallet";
import Pagination from "@/components/Pagination";
import Footer from "@/components/Footer";
import ModalCreateAndUpdate from "@/components/ModalCreateAndUpdate";
import ModalDelete from "@/components/ModalDelete";
export default {
  name: "TemplateIndex",
  components: {
    Header,
    Title,
    Search,
    Wallet,
    Pagination,
    Footer,
    ModalCreateAndUpdate,
    ModalDelete,
  },
  data: () => ({
    showModalCreateAndUpdate: false,
    showModalDelete: false,
    fieldsError: [],
    createAndUpdateUser: {
      nome: "",
      sobrenome: "",
      email: "",
      id: -1,
      valor_carteira: 0,
    },
    searchValue: {
      key: "",
      value: "",
    },
    showPagination: true,
    page: 1,
    itemsPerPage: 10,
    actualPosition: 10,
    usersFilter: [],
  }),
  computed: {
    ...mapGetters("USERS", ["users", "getUser", "filterUsers"]),
  },
  watch: {
    users() {
      this.pagination({ page: this.page, end: this.actualPosition });
    },
  },
  methods: {
    ...mapActions("USERS", ["removeUser", "addUsers", "updateUsers"]),
    add() {
      this.resetUser();
      this.showModalCreateAndUpdate = true;
    },
    handleCsv() {
      csvExport(this.users);
      this.$toast.success("CSV exportado com sucesso!");
    },
    searchInput(e) {
      if (!e.val.length) {
        return this.resetSearchValue();
      }
      const key = e.key.replace("search_", "");
      this.searchValue.key = key;
      this.searchValue.value = e.val;
    },
    searchSubmit() {
      if (this.searchValue.key.length && this.searchValue.value.length) {
        if (this.filterUsers(this.searchValue).length) {
          this.filterUsers(this.searchValue).length > this.itemsPerPage
            ? (this.showPagination = true)
            : (this.showPagination = false);
          return (this.usersFilter = [...this.filterUsers(this.searchValue)]);
        }
        this.$toast.warning("Nenhum usuário encontrado!");
        this.pagination({ page: 1, end: this.itemsPerPage });
      } else {
        this.pagination({ page: 1, end: this.itemsPerPage });
      }
    },
    resetSearchValue() {
      this.searchValue = {
        key: "",
        value: "",
      };
    },
    updateUser(e) {
      this.showModalCreateAndUpdate = true;
      this.createAndUpdateUser = { ...this.getUser(e) };
    },
    createAndUpdateInput(e) {
      this.createAndUpdateUser[e.key] = e.val;
    },
    createAndUpdateActions(e) {
      if (e) {
        this.fieldsError = [];
        this.isAValidUser();
      } else {
        this.$toast.clear();
        this.fieldsError = [];
        this.showModalCreateAndUpdate = false;
        this.resetUser();
      }
    },
    isAValidUser() {
      if (
        !this.createAndUpdateUser.nome ||
        !this.createAndUpdateUser.sobrenome ||
        !this.createAndUpdateUser.email ||
        !this.createAndUpdateUser.valor_carteira
      ) {
        !this.createAndUpdateUser.nome && this.fieldsError.push("nome");
        !this.createAndUpdateUser.sobrenome &&
          this.fieldsError.push("sobrenome");
        !this.createAndUpdateUser.email && this.fieldsError.push("email");
        !this.createAndUpdateUser.valor_carteira &&
          this.fieldsError.push("valor_carteira");
      } else {
        this.fieldsError = [];
        this.createAndUpdateUser.id < 0
          ? this.addUsers({ ...this.createAndUpdateUser })
          : this.updateUsers({ ...this.createAndUpdateUser });
        this.showModalCreateAndUpdate = false;
        this.resetUser();
        this.$toast.success("Operação realizada com sucesso!");
      }
    },
    deleteUser(e) {
      this.showModalDelete = true;
      this.createAndUpdateUser = { ...this.getUser(e) };
    },
    deleteActions(e) {
      if (e) {
        this.removeUser(this.createAndUpdateUser);
        this.$toast.success("Usuário deletado!");
      }
      this.showModalDelete = false;
      this.resetUser();
    },
    resetUser() {
      this.createAndUpdateUser.nome = "";
      this.createAndUpdateUser.sobrenome = "";
      this.createAndUpdateUser.email = "";
      this.createAndUpdateUser.id = -1;
      this.createAndUpdateUser.valor_carteira = null;
    },
    pagination(e) {
      this.showPagination = true;
      this.page = e.page;
      this.actualPosition = e.end;
      let i = e.end - this.itemsPerPage;
      this.usersFilter = this.users.slice(i, e.end);
    },
  },
  created() {
    this.actualPosition = this.itemsPerPage;
  },
};
</script>
<style scoped>
.content {
  margin: 0 auto;
  max-width: 1300px;
  padding: 0 10px;
  width: 100%;
  user-select: none;
}
</style>
