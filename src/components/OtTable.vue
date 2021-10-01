<template>
  <ot-card title="Carteiras">
    <div class="table-container mb-3">
      <b-table
        id="wallet-table"
        striped
        :fields="fields"
        :items="wallets"
        :busy="isFetchingData"
      >
        <template #cell(data_abertura)="{ value }">
          {{ getFormattedDate(value) }}
        </template>

        <template #cell(valor_carteira)="{ value }">
          {{ getFormattedBitcoin(value) }}
        </template>

        <template #cell(actions)="{ item }">
          <div class="d-flex">
            <b-btn
              class="mr-1"
              size="sm"
              variant="link"
              @click="$emit('edit-wallet', item)"
            >
              <b-icon-pencil-square />
            </b-btn>

            <b-btn size="sm" variant="link" @click="deleteWallet(item)">
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

    <div class="d-flex justify-content-between align-items-end">
      <b-pagination
        class="mb-0"
        :total-rows="walletsTotal"
        :per-page="walletsLimit"
        v-model="currentPage"
        @input="handleChangePagination"
      />

      <b-btn size="md" @click="exportCSV">Exportar CSV</b-btn>
    </div>
  </ot-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import OtCard from "./OtCard.vue";

const downloadFile = (text, fileName) => {
  const link = document.createElement("a");
  link.setAttribute(
    "href",
    `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`
  );
  link.setAttribute("download", fileName);

  link.style.display = "none";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

const tableToCsv = table => {
  const rows = table.querySelectorAll("tr");

  return [].slice
    .call(rows)
    .map(row => {
      let cells = [...row.querySelectorAll("th,td")];
      cells = cells.slice(0, cells.length - 1);

      return [].slice
        .call(cells)
        .map(cell => cell.textContent.replace(",", "."))
        .join(",");
    })
    .join("\n");
};

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

  beforeMount() {
    this.getWallets();
  },

  methods: {
    ...mapMutations(["setWalletsPage"]),

    ...mapActions(["getWallets", "deleteWallet"]),

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
    },

    exportCSV() {
      const table = document.getElementById("wallet-table");
      const csv = tableToCsv(table);

      downloadFile(csv, "table.csv");
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
