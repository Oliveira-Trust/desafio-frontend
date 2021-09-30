<template>
  <ot-card title="Carteiras">
    <div class="table-container mb-3">
      <b-table striped :fields="fields" :items="wallets" :busy="isFetchingData">
        <template #cell(data_abertura)="{ value }">
          {{ getFormattedDate(value) }}
        </template>

        <template #cell(valor_carteira)="{ value }">
          {{ getFormattedBitcoin(value) }}
        </template>

        <template #cell(actions)>
          <div class="d-flex">
            <b-btn class="mr-1" size="sm" variant="link">
              <b-icon-pencil-fill />
            </b-btn>

            <b-btn size="sm" variant="link">
              <b-icon-trash-fill />
            </b-btn>
          </div>
        </template>

        <template #table-busy>
          <div class="text-center text-primary my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong class="m-2">Carregando...</strong>
          </div>
        </template>
      </b-table>
    </div>

    <b-pagination
      :total-rows="walletsTotal"
      :per-page="walletsLimit"
      v-model="currentPage"
      @input="handleChangePagination"
    />
  </ot-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import OtCard from "./OtCard.vue";

export default {
  name: "OtTable",

  components: { OtCard },

  data() {
    return {
      fields: [
        "nome",
        "sobrenome",
        "email",
        { key: "valor_carteira", label: "Bitcoin" },
        "data_abertura",
        { key: "actions", label: "Ações" }
      ],
      currentPage: 1
    };
  },

  computed: {
    ...mapState(["wallets", "walletsTotal", "walletsLimit", "isFetchingData"])
  },

  async beforeMount() {
    this.getWallets();
  },

  methods: {
    ...mapMutations(["setWalletsPage"]),

    ...mapActions(["getWallets"]),

    getFormattedDate(date) {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      const localDate = new Date(date);

      return localDate.toLocaleDateString("pt-br", {
        ...options,
        month: "numeric"
      });
    },

    getFormattedBitcoin(value) {
      return String(value).replace(".", ",");
    },

    handleChangePagination() {
      this.setWalletsPage(this.currentPage);
      this.getWallets();
    }
  }
};
</script>

<style scoped>
.btn-link {
  color: black;
}

.table-container {
  width: 100%;
  overflow: auto;
}
</style>
