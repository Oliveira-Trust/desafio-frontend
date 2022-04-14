<template>
  <div id="app">
    <NavBar />
    <div class="users-table-card">
      <Card>
        <UsersTable/>
      </Card>
    </div>
  </div>
</template>

<script>
import UsersTable from './components/UsersTable.vue'
import Card from './components/Card.vue'
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    UsersTable,
    Card,
    NavBar,
  },
  async created () {
    await this.$store.dispatch('pullUsers');
  },
}
</script>

<style scoped>
.users-table-card {
  padding: 80px;
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
