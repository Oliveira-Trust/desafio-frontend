<style src="./Wallet.css"></style>

<template>
  <div class="containerWallet">
    <slot name="wallet"> </slot>
    <div class="walletHeader">
      <span class="walletTextHeader">Carteiras</span>

      <button class="walletButtonHeader" @click="exportCSV">
        Exportar CSV
      </button>
    </div>

    <table class="tableWallet">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>Email</th>
          <th>Bitcoin</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in displayedUsers" :key="user.id">
          <td>{{ user.nome }}</td>
          <td>{{ user.sobrenome }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.valor_carteira }}</td>
          <td class="tableButton">
            <button
              class="buttonPencil pi pi-pencil"
              @click.stop="openedModalEdit = user.id"
            ></button>
            <Modal
              title="Editar Carteira"
              :show="openedModalEdit === user.id"
              closeOnClickOutside
              @close="closeModal"
            >
              <body class="bodyModal" slot="body">
                <FormEditWallet
                  :userEdit="{
                    id: user.id,
                    nome: user.nome,
                    sobrenome: user.sobrenome,
                    email: user.email,
                    valor_carteira: user.valor_carteira,
                  }"
                  @walletUpdated="$emit('walletUpdated')"
                  @updateSuccess="closeModal"
                  @close="closeModal"
                />
              </body>
            </Modal>
            <button
              class="buttonTrash pi pi-trash"
              @click.stop="openedModalDelete = user.id"
            ></button>
            <Modal
              :show="openedModalDelete === user.id"
              closeOnClickOutside
              @close="closeModal"
            >
              <body class="bodyModal" slot="body">
                <FormDeleteWallet
                  @walletUpdated="$emit('walletUpdated')"
                  @deleteSuccess="closeModal"
                  :userId="user.id"
                  @close="closeModal"
                />
              </body>
            </Modal>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <span class="register">{{ users.length }} registro(s)</span>
      <div>
        <button
          class="pi pi-angle-left"
          @click="prevPage"
          :disabled="currentPage === 1"
        ></button>
        <span class="number"> {{ currentPage }} de {{ totalPages }}</span>
        <button
          class="pi pi-angle-right"
          @click="nextPage"
          :disabled="currentPage === totalPages"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "../../../../components/Modal/Modal.vue";
import FormEditWallet from "../FormEditWallet/FormEditWallet.vue";
import FormDeleteWallet from "../FormDeleteWallet/FormDeleteWallet.vue";

export default {
  props: ["users"],
  components: {
    Modal,
    FormEditWallet,
    FormDeleteWallet,
  },
  data() {
    return {
      openedModalEdit: null,
      openedModalDelete: null,
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.pageSize);
    },
    displayedUsers() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.users.slice(start, end);
    },
  },
  methods: {
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    closeModal() {
      this.openedModalEdit = null;
      this.openedModalDelete = null;
    },

    json2csv(json) {
      const simpleArray = JSON.parse(json);
      const header = simpleArray
        .map((x) => Object.keys(x))
        .reduce((acc, cur) => (acc.length > cur.length ? acc : cur), []);

      const replacer = (key, value) =>
        value === undefined || value === null ? "" : value;
      let csv = simpleArray.map((row) =>
        header
          .map((fieldName) => JSON.stringify(row[fieldName], replacer))
          .join(",")
      );
      csv = [header.join(","), ...csv];
      return csv.join("\r\n");
    },
    exportCSV() {
      const csvContent = this.json2csv(JSON.stringify(this.users));
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "walletData.csv");
      document.body.appendChild(link);
      link.click();
    },
  },
};
</script>
