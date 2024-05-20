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
        <tr v-for="user in allUsers" :key="user.id">
          <td>{{ user.nome }}</td>
          <td>{{ user.sobrenome }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.valor_carteira }}</td>
          <td style="text-align: right;">
            <div class="buttons-action">
              <button type="button" @click="editUser(user)"><i class="pi pi-pencil"></i></button>
              <button type="button" @click="deleteUser(user.id)"><i class="pi pi-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-box">
      <span class="registros">{{ allUsers.length }} registros</span>
      <Pagination />
    </div>
  </BoxContent>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
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
  computed: {
    ...mapGetters('users', ['allUsers'])
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser', 'updateUser']),
    editUser(user) {
      this.updateUser(user)
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
@import './styles.css';
</style>
