<template>
  <div id="app">
    <Home/>
  </div>
</template>

<script>
import Home from './components/pages/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  },
  created() {
    document.title = "Oliveira Trust"
    document.body.classList.add('bg-light')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
#app {
  font-family: "SourceSansPro", Helvetica, Arial, sans-serif;
  font-size: 14px;
  font-weight: bold;
  color: black;
}
</style>
