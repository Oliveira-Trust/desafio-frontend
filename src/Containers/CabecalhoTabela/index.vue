<template>
  <div class="cabecalho">
    <Title :text="'BTC Carteiras'" :level="'h1'" />
    <Button :color="'primary'" type="button" @click="openAddCarteiraModal">Adicionar carteira</Button>
    <AddCarteiraModal :visible="isAddCarteiraModalVisible" @close="isAddCarteiraModalVisible = false" @add="addCarteira" />
  </div>
</template>

<script>
import Button from '../../components/Button/index.vue'
import Title from '../../components/Title/index.vue'
import AddCarteiraModal from '../AddCarteiraModal/index.vue'

export default {
  name: 'CabecalhoTabela',
  components: {
    Button,
    Title,
    AddCarteiraModal
  },
  methods: {
    openAddCarteiraModal() {
      this.isAddCarteiraModalVisible = true
    },
    addCarteira(newCarteira) {
      console.log('Nova carteira:', newCarteira)
      this.isAddCarteiraModalVisible = false
    },
  },
  data() {
    return {
      isAddCarteiraModalVisible: false
    }
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
