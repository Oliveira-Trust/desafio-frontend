<template>
  <div class="main">
    <Header />
    <Search />
    <Table v-bind:users="users"></Table>
    <Footer />
  </div>
</template>

<script>
import api from "../api";
import Table from './Table.vue'
import Search from './Search.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'

export default {
  name: 'Main',
  components: {
    Table,
    Search,
    Header,
    Footer
  },
  data() {
      return {
          users: []
      }
  },
  created() {
      this.getUsersData();
  },
  methods: {
      getUsersData() {
      api
         .get("/users?_limit=10")
         .then((response) => {
           console.log(response);
           this.users = response.data;
         })
         .catch((error) => {
           console.log(error);
         });
      }
  },
}
</script>

<style lang="scss" scoped>
</style>
