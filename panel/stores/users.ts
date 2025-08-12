import { defineStore } from 'pinia'
import { usersService } from '~/services/users'
import { filterService, type FilterParams, type FilterState } from '~/services/filters'
import type { User, UsersState } from '~/interfaces'

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    allUsers: [],
    currentPage: 1,
    totalRecords: 0,
    totalPages: 0,
    loading: false,
    itemsPerPage: 30,
    filters: filterService.clearFilters(),
    filterState: {
      activeFilters: filterService.clearFilters(),
      hasActiveFilters: false
    }
  }),

  getters: {
    paginatedUsers: (state) => {
      return state.allUsers
    },
    
    currentPageRecordsCount: (state) => {
      return state.allUsers.length
    },

    hasActiveFilters: (state) => {
      return state.filterState.hasActiveFilters
    }
  },

  actions: {
    async loadUsers(page: number = 1) {
      this.loading = true
      try {
        const response = await usersService.getUsers(page, this.itemsPerPage)
        this.allUsers = response.data
        this.currentPage = response.currentPage
        this.totalRecords = response.totalCount
        this.totalPages = response.totalPages
      } catch (error) {
        console.error('Erro ao carregar usuários:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async searchUsers(filters: FilterParams, page: number = 1) {
      this.loading = true
      try {
        const response = await usersService.searchUsers(filters, page, this.itemsPerPage)
        this.allUsers = response.data
        this.currentPage = response.currentPage
        this.totalRecords = response.totalCount
        this.totalPages = response.totalPages
        this.filters = filters
        this.filterState = filterService.createFilterState(filters)
      } catch (error) {
        console.error('Erro na busca:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async setCurrentPage(page: number) {
      if (page >= 1) {
        if (this.hasActiveFilters) {
          await this.searchUsers(this.filters, page)
        } else {
          await this.loadUsers(page)
        }
      }
    },

    async clearFilters() {
      this.filters = filterService.clearFilters()
      this.filterState = filterService.createFilterState(this.filters)
      await this.loadUsers(1)
    },

    resetState() {
      this.allUsers = []
      this.currentPage = 1
      this.totalRecords = 0
      this.totalPages = 0
      this.loading = false
      this.filters = filterService.clearFilters()
      this.filterState = filterService.createFilterState(this.filters)
    }
  }
})
