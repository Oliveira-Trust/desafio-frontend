<template>
  <div id="app">
    <!-- Cabecalho da página -->
    <Header />

    <!-- Cabeçalho da tabela, formulário de busca e tabela com paginação -->
    <div class="container">
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
