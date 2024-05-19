<template>
  <div id="app">
    <!-- Cabecalho da página -->
    <Header />

    <!-- Cabeçalho da tabela, formulário de busca e tabela com paginação -->
    <div class="container">
      <CabecalhoTabela />
      <FormularioFiltro />
      <Tabela />
    </div>
  </div>
</template>

<script>
import 'primeicons/primeicons.css'
import Header from './components/Header/index.vue'
import Tabela from './containers/Tabela/index.vue'
import CabecalhoTabela from './containers/CabecalhoTabela/index.vue'
import FormularioFiltro from './containers/FormularioFiltro/index.vue'

export default {
  name: 'App',
  components: {
    Header,
    CabecalhoTabela,
    FormularioFiltro,
    Tabela,
  },
}
</script>

<style>
@import './styles/global.css';
</style>
