<template>
  <ot-card title="Filtros">
    <div class="filters-container">
      <filter-input
        input-id="name"
        label="Nome"
        placeholder="Maria Silva"
        type="text"
        :disabled="isFetchingData"
        :value="nameFilter"
        @input="setNameFilter"
        @clear-filter="cleanNameFilter"
      />

      <filter-input
        input-id="email"
        label="Email"
        placeholder="email@email.com"
        type="email"
        :disabled="isFetchingData"
        :value="emailFilter"
        @input="setEmailFilter"
        @clear-filter="cleanEmailFilter"
      />

      <filter-input
        input-id="date"
        label="Data de abertura"
        type="date"
        :disabled="isFetchingData"
        :value="dateFilter"
        @input="setDateFilter"
        @clear-filter="cleanDateFilter"
      />

      <b-btn
        class="search-btn as-block-md"
        size="md"
        :disabled="isFetchingData"
        @click="getWallets"
      >
        Pesquisar
      </b-btn>
    </div>
  </ot-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import OtCard from "./OtCard.vue";
import FilterInput from "./OtFilters/FilterInput.vue";

export default {
  name: "OtFilters",

  components: {
    OtCard,
    FilterInput
  },

  data() {
    return {
      userName: "",
      userEmail: "",
      creationDate: ""
    };
  },

  computed: {
    ...mapState(["nameFilter", "emailFilter", "dateFilter", "isFetchingData"])
  },

  methods: {
    ...mapMutations(["setNameFilter", "setEmailFilter", "setDateFilter"]),

    ...mapActions([
      "getWallets",
      "cleanNameFilter",
      "cleanEmailFilter",
      "cleanDateFilter"
    ])
  }
};
</script>

<style scoped>
.filters-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 90px;
  gap: 30px;
}

.search-btn {
  justify-self: end;
  align-self: end;
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: 1fr;
  }

  .as-block-md {
    width: 100%;
  }
}
</style>
