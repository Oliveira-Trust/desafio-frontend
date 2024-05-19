<template>
  <div class="pagination">
    <button type="button" class="arrows">
      <i class="pi pi-angle-left"></i>
    </button>
    <div class="pages">
      <button type="button">1</button>
      <button type="button">2</button>
      <button type="button">3</button>
    </div>
    <button type="button" class="arrows">
      <i class="pi pi-angle-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      totalPage: 0,
      pageList: [],
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.pageSize)
    },
    pageLists() {
      let list = []
      for (let i = 1; i <= this.totalPage; i++) {
        list.push(i)
      }
      return list
    },
  },
  methods: {
    handleClick(index) {
      this.$emit('change', index)
    },
  },
  mounted() {
    this.pageList = this.pageLists
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
