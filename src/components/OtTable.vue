<template>
  <ot-card title="Carteiras">
    <b-table striped :fields="fields" :items="items">
      <template #cell(data_abertura)="{ value }">
        {{ getFormattedDate(value) }}
      </template>
      <template #cell(valor_carteira)="{ value }">
        {{ getFormattedBitcoin(value) }}
      </template>
      <template #cell(actions)>
        <b-btn size="sm" variant="link">
          <b-icon-pencil-fill />
        </b-btn>
        <b-btn size="sm" variant="link">
          <b-icon-trash-fill />
        </b-btn>
      </template>
    </b-table>
  </ot-card>
</template>

<script>
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
      items: [
        {
          id: 1,
          nome: "Doroteya",
          sobrenome: "Powder",
          email: "dpowder0@wisc.edu",
          endereco: "6906 Merchant Center",
          data_nascimento: "1996-01-03T14:28:31Z",
          data_abertura: "2018-05-16T15:50:23Z",
          valor_carteira: 3.83526236,
          endereco_carteira: "1Q956unZUz1RHVtUrZbEZSXgu65RLMF5h3"
        }
      ]
    };
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
    }
  }
};
</script>

<style scoped>
.btn-link {
  color: black;
}
</style>
