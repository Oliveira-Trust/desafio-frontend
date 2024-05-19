import axios from 'axios'
import Vue from 'vue'

const state = {
  users: [],
}

const getters = {
  allUsers: (state) => state.users,
}

const actions = {
  async fetchUsers({ commit }) {
    const response = await axios.get('http://localhost:3004/users')
    commit('setUsers', response.data)
  },
  async deleteUser({ commit }, id) {
    await axios.delete(`http://localhost:3004/users/${id}`)
    commit('removeUser', id)
  },
  async updateUser({ commit }, updatedUser) {
    const response = await axios.put(
      `http://localhost:3004/users/${updatedUser.id}`,
      updatedUser,
    )
    commit('editUser', response.data)
  },
}

const mutations = {
  setUsers: (state, users) => (state.users = users),
  removeUser: (state, id) =>
    (state.users = state.users.filter((user) => user.id !== id)),
  editUser: (state, updatedUser) => {
    const index = state.users.findIndex((user) => user.id === updatedUser.id)
    if (index !== -1) {
      Vue.set(state.users, index, updatedUser)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
