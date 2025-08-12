import { defineStore } from 'pinia'
import { usersService } from '~/services/users'
import type { User, UsersState, SearchUsersParams } from '~/interfaces'

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    allUsers: [],
    currentPage: 1,
    totalRecords: 0,
    totalPages: 0,
    loading: false,
    itemsPerPage: 30
  }),

  getters: {
    paginatedUsers: (state) => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage
      return state.allUsers.slice(startIndex, endIndex)
    },
    
    currentPageRecordsCount: (state) => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage
      const endIndex = startIndex + state.itemsPerPage
      const currentPageUsers = state.allUsers.slice(startIndex, endIndex)
      return currentPageUsers.length
    }
  },

  actions: {
    async loadUsers() {
      this.loading = true
      try {
        const response = await usersService.getUsers()
        this.allUsers = response
        this.totalRecords = response.length
        this.totalPages = Math.ceil(response.length / this.itemsPerPage)
        this.currentPage = 1
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchUsers(params: SearchUsersParams) {
      this.loading = true
      try {
        const response = await usersService.searchUsers(params)
        this.allUsers = response
        this.totalRecords = response.length
        this.totalPages = Math.ceil(response.length / this.itemsPerPage)
        this.currentPage = 1
      } catch (error) {
        console.error('Erro na busca:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    setCurrentPage(page: number) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
      }
    },

    resetState() {
      this.allUsers = []
      this.currentPage = 1
      this.totalRecords = 0
      this.totalPages = 0
      this.loading = false
    }
  }
})
