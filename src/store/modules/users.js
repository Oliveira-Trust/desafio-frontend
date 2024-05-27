import Vue from 'vue'
import axios from 'axios'

const state = {
  users: [],
}

const getters = {
  allUsers: (state) => state.users,
}

const actions = {
  async fetchUsers({ commit }) {
    try {
      const response = await axios.get(`http://localhost:3004/users`)
      commit('setUsers', { users: response.data })
    } catch (error) {
      console.error('Erro ao buscar usuários:', error)
    }
  },
  async createUser({ commit }, newUser) {
    try {
      const response = await axios.post('http://localhost:3004/users', newUser)
      commit('addUser', response.data)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  },
  async deleteUser({ commit }, id) {
    try {
      await axios.delete(`http://localhost:3004/users/${id}`)
      commit('removeUser', id)
    } catch (error) {
      console.error('Erro ao deletar usuário:', error)
    }
  },
  async updateUser({ commit }, updatedUser) {
    try {
      const response = await axios.put(
        `http://localhost:3004/users/${updatedUser.id}`,
        updatedUser,
      )
      commit('editUser', response.data)
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
    }
  },
  async filterUsers({ commit, state }, filters) {
    let filteredUsers = state.users

    if (filters.nome) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nome.toLowerCase().includes(filters.nome.toLowerCase()),
      )
    }

    if (filters.sobrenome) {
      filteredUsers = filteredUsers.filter((user) =>
        user.sobrenome.toLowerCase().includes(filters.sobrenome.toLowerCase()),
      )
    }

    if (filters.email) {
      filteredUsers = filteredUsers.filter((user) =>
        user.email.toLowerCase().includes(filters.email.toLowerCase()),
      )
    }

    commit('setUsers', { users: filteredUsers })
  },
}

const mutations = {
  setUsers(state, { users }) {
    state.users = users
  },
  addUser(state, newUser) {
    state.users.push(newUser)
  },
  removeUser(state, id) {
    state.users = state.users.filter((user) => user.id !== id)
  },
  editUser(state, updatedUser) {
    const index = state.users.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      Vue.set(state.users, index, updatedUser)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
