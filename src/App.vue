<template>
  <div id="app">
    <!-- Header da página -->
    <Header />

    <div class="container">
      <!-- Título e botão de adicionar -->
      <CabecalhoTabela />
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css'
import Header from './components/Header/index.vue'
import CabecalhoTabela from './Containers/CabecalhoTabela/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    CabecalhoTabela,
  },
}
</script>

<style>
@import './styles/global.css';
</style>
