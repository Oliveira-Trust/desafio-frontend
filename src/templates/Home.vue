<template>
  <div>
    <div class="container container-flex-center-between m-b-2">
      <App-Title> BTC Carteiras </App-Title>
      <App-Button variation="primary" @click="openModalRegister">
        Adicionar Carteira
      </App-Button>
    </div>
    <App-FormSearch @filtrarUsers="getWalletsList" />
    <main class="container">
      <article class="card">
        <section>
          <div class="container-flex-center-between header-table">
            <App-Title level="h4"> Carteiras </App-Title>

            <download-csv :data="getWalletsAll" name="wallets.csv">
              <App-Button
                class="container-flex-center-between"
                variation="secondary"
              >
                Exportar CSV
              </App-Button>
            </download-csv>
          </div>
          <App-TableWallets
            :listWallets="getWalletsPagination"
            :removeWallet="removeWallet"
            :editWallet="editWallet"
          />
        </section>
      </article>
      <div class="table-info container-flex-center-between">
        <div class="totalRecord">{{ getTotalRecords }} Registro(s)</div>

        <App-Pagination
          :currentPage="selectedPage"
          :totalRecords="getTotalRecords"
          @changePage="listWalletsPagination"
        />
      </div>
    </main>
  </div>
</template>

<script>
import ModalService from "@/services/ModalService";
import ModalRegister from "@/layouts/ModalRegister.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App-Home",
  computed: {
    ...mapGetters("wallets", [
      "getWalletsAll",
      "getWalletsPagination",
      "getTotalRecords",
      "selectedPage",
    ]),
  },
  created() {
    this.getAllWalletsList();
  },
  watch: {
    walletsPagination: {
      handler: "getWalletsList",
      immediate: true,
    },
  },
  methods: {
    ...mapActions("wallets", [
      "listWalletsPagination",
      "listAllWallets",
      "removeWallet",
      "editWallet",
      "createWallet",
    ]),
    async getWalletsList(filter = "") {
      try {
        await this.listWalletsPagination({ page: 1, filter });
      } catch (error) {
        console.error({
          text: error,
          type: "error",
        });
      }
    },
    async getAllWalletsList() {
      try {
        await this.listAllWallets();
      } catch (error) {
        console.error({
          text: error,
          type: "error",
        });
      }
    },
    openModalRegister() {
      ModalService.open(ModalRegister, {
        form: { valor_carteira: 0 },
      }).then((retorno) => {
        this.createWallet(retorno);
      });
    },
  },
};
</script>

<style scoped>
.card {
  margin-bottom: 0px;
}
.header-table {
  margin-bottom: 2rem;
}
.table-info {
  border-top: 1px solid #f2f2f2;
  background-color: #fff;
  padding: 1rem;
  color: var(--color-default);
  margin-bottom: 1.3rem;
  border-radius: 0 0 0.25rem 0.25rem;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.1);
}
.totalRecord {
  font-size: var(--size-s);
}
</style>
