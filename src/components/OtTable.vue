<template>
  <ot-card title="Carteiras">
    <b-table striped :fields="fields" :items="items" :busy="isLoading">
      <template #cell(data_abertura)="{ value }">
        {{ getFormattedDate(value) }}
      </template>

      <template #cell(valor_carteira)="{ value }">
        {{ getFormattedBitcoin(value) }}
      </template>

      <template #cell(actions)>
        <b-btn class="mr-1" size="sm" variant="link">
          <b-icon-pencil-fill />
        </b-btn>

        <b-btn size="sm" variant="link">
          <b-icon-trash-fill />
        </b-btn>
      </template>

      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong class="m-2">Carregando...</strong>
        </div>
      </template>
    </b-table>

    <b-pagination
      :total-rows="totalRows"
      :per-page="itemsPerPage"
      v-model="currentPage"
      @input="requestWallets"
    />
  </ot-card>
</template>

<script>
import OtCard from "./OtCard.vue";

import { getWallets } from "../services/api";

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
      items: [],
      currentPage: 1,
      totalRows: 1,
      itemsPerPage: 5,
      isLoading: false
    };
  },

  async beforeMount() {
    this.isLoading = true;

    const { data, total } = await getWallets(
      this.currentPage,
      this.itemsPerPage
    );

    this.totalRows = total;
    this.items = data;
    this.isLoading = false;
  },

  methods: {
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

    async requestWallets() {
      this.isLoading = true;

      const { data } = await getWallets(this.currentPage, this.itemsPerPage);

      this.items = data;
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
.btn-link {
  color: black;
}
</style>
