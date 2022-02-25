<template>
  <div class="container-pagination">
    <small>{{ usersLength }} registro(s)</small>
    <ul
      v-if="usersLength > itemsPerPage && showPagination"
      class="pages-number"
      @click="emit"
    >
      <li
        class="pages-number-item pages-number-first"
        @click="() => (localPage = 1)"
      >
        <font-awesome-icon icon="fa-solid fa-angle-left" />
      </li>
      <li
        v-for="(item, index) in options"
        :key="index"
        :class="localPage === item && 'active'"
        class="pages-number-item"
        @click="() => (localPage = item)"
      >
        {{ item }}
      </li>
      <li
        class="pages-number-item pages-number-last"
        @click="() => (localPage = options.length)"
      >
        <font-awesome-icon icon="fa-solid fa-angle-right" />
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: {
    usersLength: { type: Number, default: 0 },
    showPagination: { type: Boolean, default: false },
    itemsPerPage: { type: Number, default: 10 },
    page: { type: Number, default: 1 },
  },
  data: () => ({
    localPage: 1,
    options: [],
  }),
  watch: {
    usersLength(val) {
      if (val / this.itemsPerPage + 0.9 < this.localPage) {
        this.localPage--;
        this.emit();
      }
      this.options = [];
      let i = 0;
      let calc = val / this.itemsPerPage;
      while (i < calc) {
        this.options.push(i + 1);
        i++;
      }
    },
    page(val) {
      this.localPage = val;
    },
  },
  methods: {
    emit() {
      this.$emit("pagination", {
        page: this.localPage,
        end: this.localPage * this.itemsPerPage,
      });
    },
  },
};
</script>
<style scoped>
.container-pagination {
  align-items: center;
  background: #fff;
  border-radius: 0px 0px 8px;
  border-top: 1px solid #eee;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  padding: 20px;
}
.pages-number {
  display: flex;
  gap: 5px;
  list-style: none;
}
.pages-number-item {
  border-radius: 4px;
  border: 1px solid silver;
  cursor: pointer;
  display: grid;
  font-size: 0.7rem;
  height: 22px;
  place-items: center;
  width: 22px;
}
.pages-number-last,
.pages-number-first {
  border: none;
}
.active {
  background: #0069d9;
  color: #fff;
}
</style>
