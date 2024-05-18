<!-- Componente Header -->
<template>
  <div id="app">
    <Header />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
}
</style>
