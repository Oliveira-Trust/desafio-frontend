<template>
  <div id="app">
    <UsersTable/>
  </div>
</template>

<script>
import UsersTable from './components/UsersTable.vue'

export default {
  name: 'App',
  components: {
    UsersTable
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
