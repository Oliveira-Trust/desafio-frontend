<template>
  <div id="app">
    <NavBar />
    <h1>BTC Carteiras</h1>
    <div class="app-container">
      <Card class="app-container-filter">
        <FilterInput/>
      </Card>
      <Card class="app-container-table">
        <UsersTable/>
      </Card>
    </div>
  </div>
</template>

<script>
import UsersTable from './components/feature/UsersTable.vue'
import Card from './components/reusable/Card.vue'
import NavBar from './components/feature/NavBar.vue'
import FilterInput from './components/feature/FilterInput.vue'

export default {
  name: 'App',
  components: {
    UsersTable,
    Card,
    NavBar,
    FilterInput,
  },
  async created () {
    await this.$store.dispatch('pullUsers');
  },
}
</script>

<style scoped>
h1 {
  padding: 30px 80px;
}

.app-container {
  padding: 20px 80px;
}

.app-container-filter {
  margin-bottom: 40px;
}

</style>

<style>
* {
  padding: 0;
  margin: 0;
}

html {
  background-color: #F4F4F4;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
}
</style>
