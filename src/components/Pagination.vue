<template>
  <div class="container-flex-center-between" v-if="displayPages">
    <App-Button variation="icone" size="small" @click="pageChanged(currentPage - 1)">
      <ArrowLeftIcon :size="18" fillColor="var(--color-default)" />
    </App-Button>

    <App-Button
      v-for="pagina in listPages"
      :key="pagina"
      :styleObject="objectStyle"
      :variation="pagina == currentPage ? 'primary' : 'secondary'"
      @click="pageChanged(pagina)"
      v-show="pagina"
    >
      {{ pagina }}
    </App-Button>

    <App-Button variation="icone" size="small" @click="pageChanged(currentPage - 1)">
      <ArrowRightIcon :size="18" fillColor="var(--color-default)" />
    </App-Button>
  </div>
</template>

<script>
export default {
  name: "App-Pagination",
  data() {
    return {
      objectStyle: {
        fontSize: "0.6rem",
        padding: "0.4rem",
        margin: "0 0.2rem 0 0",
      },
    };
  },
  props: {
    currentPage: {
      type: [String, Number],
      default: 1,
    },
    total: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      default: 10,
    },
  },
  mounted() {
    this.currentPage ? 1 : this.currentPage + 1;
  },
  computed: {
    displayPages() {
      return this.total > this.limit;
    },

    numberOfPages() {
      return Math.ceil(this.total / this.limit);
    },
    listPages() {
      if (this.numberOfPages <= 1) return [1];
      let previousPage = this.currentPage - 1;
      let nextPage =
        this.currentPage + 1 <= this.numberOfPages && this.currentPage + 1;
      return [previousPage, this.currentPage, nextPage].filter(Boolean);
    },
  },
  methods: {
    pageChanged(offset) {
      this.$emit("change-page", offset);
    },
  },
};
</script>

<style scoped>
.pages {
}
</style>