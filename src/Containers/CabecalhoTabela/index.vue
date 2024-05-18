<template>
  <div>
    <Titulo :titulo="'BTC Carteiras'" />
    <Button :text="Botão" />
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

<style></style>
