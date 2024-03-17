<style src="./Home.css"></style>

<template>
  <div class="homeContainer">
    <div class="home">
      <h1>BTC Carteiras</h1>
      <button class="buttonModal" @click.stop="openedModal = true">
        Adicionar Carteira
      </button>
      <Modal
        title="Adicionar Carteira"
        :show="openedModal"
        @close="openedModal = false"
        closeOnClickOutside
      >
        <body class="bodyModal" slot="body">
          <FormAddWallet
            @walletAdded="fetchWallet"
            @close="openedModal = false"
          />
        </body>
      </Modal>
    </div>
    <div class="searchWallet" slot="searchWallet">
      <SearchWallet @search="handleSearch" />
    </div>
    <div class="wallet" slot="wallet">
      <Wallet @walletUpdated="fetchWallet" :users="users" />
    </div>
  </div>
</template>

<script>
import Users from "../../services/users.js";
import Modal from "../../components/Modal/Modal.vue";
import FormAddWallet from "../Home/components/FormAddWallet/FormAddWallet.vue";
import SearchWallet from "../Home/components/SearchWallet/SearchWallet.vue";
import Wallet from "../Home/components/Wallet/Wallet.vue";

export default {
  name: "Home",
  components: {
    Modal,
    FormAddWallet,
    SearchWallet,
    Wallet,
  },
  data() {
    return {
      users: [],
      openedModal: false,
    };
  },
  mounted() {
    this.fetchWallet();
  },

  methods: {
    fetchWallet() {
      Users.listar().then((resposta) => {
        this.users = resposta.data;
        this.openedModal = false;
      });
    },

    filteredUsers(searchCriteria) {
      return this.users.filter((user) => {
        const searchNome = searchCriteria.nome
          ? searchCriteria.nome.toLowerCase()
          : "";
        const searchSobrenome = searchCriteria.sobrenome
          ? searchCriteria.sobrenome.toLowerCase()
          : "";
        const searchEmail = searchCriteria.email
          ? searchCriteria.email.toLowerCase()
          : "";

        return (
          user.nome.toLowerCase().includes(searchNome) &&
          user.sobrenome.toLowerCase().includes(searchSobrenome) &&
          user.email.toLowerCase().includes(searchEmail)
        );
      });
    },
    handleSearch(searchCriteria) {
      if (
        searchCriteria.nome === "" &&
        searchCriteria.sobrenome === "" &&
        searchCriteria.email === ""
      ) {
        this.fetchWallet();
      } else {
        this.users = this.filteredUsers(searchCriteria);
      }
    },
  },
};
</script>
