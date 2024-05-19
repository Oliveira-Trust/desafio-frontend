<template>
  <div class="cabecalho">
    <Title :text="'BTC Carteiras'" :level="'h1'"/>
    <Button :color="'primary'">Adicionar carteira</Button>
  </div>
</template>

<script>
import Button from '../../components/Button/index.vue'
import Title from '../../components/Title/index.vue'

export default {
  name: 'CabecalhoTabela',
  components: {
    Button,
    Title,
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
