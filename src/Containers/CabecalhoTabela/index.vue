<template>
  <div class="cabecalho">
    <Titulo :text="'BTC Carteiras'" :level="'h1'"/>
    <Button :color="'primary'">Adicionar carteira</Button>
  </div>
</template>

<script>
import Button from '../../components/Button/index.vue'
import Titulo from '../../components/Titulo/index.vue'

export default {
  name: 'CabecalhoTabela',
  components: {
    Button,
    Titulo,
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
