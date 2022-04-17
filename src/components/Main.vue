<template>
  <div class="main">
    <Header />
    <div class="add-user-container">
      <div class="add-user">
        <span>BTC Carteiras</span>
        <Button label="Adicionar Carteira" v-bind:hasIcon="false" buttonClass="btn-color"/>
      </div>
    </div>
    <Search />
    <div class="table-main-container shadow-lg">
      <div class="table-title">
        <span>Carteira</span>
        <Button label="Exportar CSV" v-bind:hasIcon="false" buttonClass="btn-outline"/>
      </div>
      <Table v-bind:users="users"></Table>
    </div>
    <Footer />
  </div>
</template>

<script>
import api from "../api";
import Table from './Table.vue'
import Search from './Search.vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Button from './Button.vue'

export default {
  name: 'Main',
  components: {
    Table,
    Search,
    Header,
    Footer,
    Button
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
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .add-user-container {
      display: flex;
      justify-content: center;
      width: 100%;

      .add-user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1200px;
        padding: 46px 0 30px 0;
        width: 100%;

        span {
          font-size: 28px;
          font-weight: 700;
          color: #3a3a3a;
        }
      }
    }

    .table-main-container {
      box-sizing: border-box;
      padding: 20px;
      border-radius: 4px;
      background-color: #fff;
      max-width: 1200px;
      width: 100%;

      .table-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 0;

        span {
          font-weight: 600;
          color: #3a3a3a;
          font-size: 18px;
        }
      }
    }
  }
</style>
