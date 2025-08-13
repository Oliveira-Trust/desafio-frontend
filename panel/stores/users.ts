import { defineStore } from 'pinia'
import { usersService } from '~/services/users'
import { filterService, type FilterParams, type FilterState } from '~/services/filters'
import type { User, UsersState } from '~/interfaces'
import { getItemsPerPage } from '~/utils/screen'

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
    },

    getItemsPerPage: (state) => {
      return getItemsPerPage()
    }
  },

  actions: {
    async loadUsers(page: number = 1) {
      this.loading = true
      try {
        const itemsPerPage = this.getItemsPerPage
        const response = await usersService.getUsers(page, itemsPerPage)
        this.allUsers = response.data
        this.currentPage = response.currentPage
        this.totalRecords = response.totalCount
        this.totalPages = response.totalPages
        this.itemsPerPage = itemsPerPage
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
        const itemsPerPage = this.getItemsPerPage
        const response = await usersService.searchUsers(filters, page, itemsPerPage)
        this.allUsers = response.data
        this.currentPage = response.currentPage
        this.totalRecords = response.totalCount
        this.totalPages = response.totalPages
        this.itemsPerPage = itemsPerPage
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

    async addUser(userData: Omit<User, 'id' | 'data_abertura' | 'endereco' | 'data_nascimento' | 'endereco_carteira'>) {
      try {
        const newUser = await usersService.createUser(userData);
        this.allUsers.unshift(newUser);
        this.totalRecords += 1;
        
        const totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
        if (totalPages !== this.totalPages) {
          this.totalPages = totalPages;
        }
        
        return newUser;
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        throw error;
      }
    },

    async updateUser(userData: User) {
      try {
        const updatedUser = await usersService.updateUser(userData);
        const index = this.allUsers.findIndex(user => user.id === userData.id);
        if (index !== -1) {
          this.allUsers[index] = updatedUser;
        }
        return updatedUser;
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw error;
      }
    },

    async deleteUser(userId: string) {
      try {
        await usersService.deleteUser(userId);
        this.allUsers = this.allUsers.filter(user => user.id !== userId);
        this.totalRecords -= 1;
        
        const totalPages = Math.ceil(this.totalRecords / this.itemsPerPage);
        if (totalPages !== this.totalPages) {
          this.totalPages = totalPages;
        }
        
        if (this.allUsers.length === 0 && this.currentPage > 1) {
          await this.setCurrentPage(this.currentPage - 1);
        }
      } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        throw error;
      }
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
