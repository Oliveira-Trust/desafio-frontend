<template>
  <div class="cabecalho">
    <Title :text="'BTC Carteiras'" :level="'h1'" />
    <Button :color="'primary'">Adicionar carteira</Button>
    <AddCarteiraModal :user="selectedUser" :visible="isEditModalVisible" @close="isEditModalVisible = false" @save="editUser" />
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
}
</script>

<style scoped>
@import './styles.css';
</style>
