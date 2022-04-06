<template>
  <div class="main">
    <Header />
    <Search />
    <Table v-bind:users="users"></Table>
  </div>
</template>

<script>
import api from "../api";
import Table from './Table.vue'
import Search from './Search.vue'
import Header from './Header.vue'

export default {
  name: 'Main',
  components: {
    Table,
    Search,
    Header
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
         .get("/users")
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
