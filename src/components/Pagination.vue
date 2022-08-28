<template>
  <div class="c-pagination">
    <div class="c-pagination__item no-border">
      <img
        src="@/assets/imgs/arrow.png"
        class="c-icon small no-margin rotate"
        @click="pageDown"
      />
    </div>
    <div
      v-for="i in pages"
      :key="i"
      class="c-pagination__item"
      @click="$emit('changePage', i)"
    >
      {{ i }}
    </div>
    <div class="c-pagination__item no-border">
      <img
        src="@/assets/imgs/arrow.png"
        class="c-icon small no-margin"
        @click="pageUp"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CPagination",
  props: {
    pages: {
      default: 1,
      required: true,
    },
    page: {
      default: 1,
      required: true,
    },
  },
  methods: {
    pageDown() {
      if (this.page > 2) {
        this.$emit("pageDown");
      }
    },
    pageUp() {
      if (this.page <= this.pages) {
        this.$emit("pageUp");
      }
    },
  },
};
</script>
