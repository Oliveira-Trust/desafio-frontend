<template>
  <BoxContent>
    <div class="header">
      <Title :text="'Carteiras'" :level="'h2'">Test</Title>
      <Button :color="'outlined'" @click="exportToCSV">Exportar CSV</Button>
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
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>{{ user.nome }}</td>
          <td>{{ user.sobrenome }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.valor_carteira }}</td>
          <td style="text-align: right;">
            <div class="buttons-action">
              <button type="button" @click="openEditModal(user)"><i class="pi pi-pencil"></i></button>
              <button type="button" @click="deleteUser(user.id)"><i class="pi pi-trash"></i></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-box">
      <span class="registros">{{ allUsers ? allUsers.length : 0 }} registros</span>

      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1" class="arrows">
          <i class="pi pi-angle-left"></i>
        </button>
        <button v-for="number in totalPages" :key="number" @click="goToPage(number)" :class="currentPage === number ? 'current-number' : null">{{ number }}</button>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="arrows">
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </div>

    <EditCarteiraModal :user="selectedUser" :visible="isEditModalVisible" @close="isEditModalVisible = false" @save="editUser" />
  </BoxContent>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BoxContent from '../../components/BoxContent/index.vue'
import Title from '../../components/Title/index.vue'
import Button from '../../components/Button/index.vue'
import EditCarteiraModal from '../EditCarteiraModal/index.vue'
import * as XLSX from 'xlsx'

export default {
  name: 'Tabela',
  components: {
    BoxContent,
    Title,
    Button,
    EditCarteiraModal
  },
  computed: {
    ...mapGetters('users', ['allUsers']),
    paginatedUsers() {
      if (!this.allUsers) return []
      const startIndex = (this.currentPage - 1) * this.perPage
      const endIndex = startIndex + this.perPage
      return this.allUsers.slice(startIndex, endIndex)
    },
    totalPages() {
      if (!this.allUsers) return 0
      return Math.ceil(this.allUsers.length / this.perPage)
    }
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'deleteUser', 'updateUser']),
    openEditModal(user) {
      this.selectedUser = { ...user }
      this.isEditModalVisible = true
    },
    editUser(updatedUser) {
      this.updateUser(updatedUser)
      this.isEditModalVisible = false
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      if (page > 0 && page <= this.totalPages) {
        this.currentPage = page
      }
    },
    exportToCSV() {
      const data = this.allUsers.map(user => ({
        Nome: user.nome,
        Sobrenome: user.sobrenome,
        Email: user.email,
        Bitcoin: user.valor_carteira
      }))

      const worksheet = XLSX.utils.json_to_sheet(data)
      const csv = XLSX.utils.sheet_to_csv(worksheet)

      // Create a Blob from the CSV data
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)

      // Create a link to download it
      const a = document.createElement('a')
      a.href = url
      a.download = 'users.csv'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    }
  },
  created() {
    this.fetchUsers()
  },
  data() {
    return {
      isEditModalVisible: false,
      selectedUser: {},
      currentPage: 1,
      perPage: 10,
    }
  }
}
</script>

<style scoped>
@import './styles.css';
</style>
