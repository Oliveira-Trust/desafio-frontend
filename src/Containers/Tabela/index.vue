<template>
  <BoxContent>
    <div class="header">
      <Title :text="'Carteiras'" :level="'h2'">Test</Title>
      <Button :color="'outlined'">Exportar CSV</Button>
    </div>

    <table tabindex="fixed">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Sobrenome</th>
          <th>E-mail</th>
          <th>Bitcoin</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>
        <tr>
          <td>a</td>
          <td>a</td>
          <td>a</td>
          <td>a</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-box">
      <span class="registros">30 registros</span>
      <Pagination />
    </div>
  </BoxContent>
</template>

<script>
import BoxContent from '../../components/BoxContent/index.vue'
import Title from '../../components/Title/index.vue'
import Button from '../../components/Button/index.vue'
import Pagination from '../../components/Pagination/index.vue'

export default {
  name: 'Tabela',
  components: {
    BoxContent,
    Title,
    Button,
    Pagination,
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
