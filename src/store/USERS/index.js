import {
  ADD_USERS,
  REMOVE_USERS,
  SET_USERS,
  UPDATE_USERS
} from './mutations-types'
import services from '../../services'
const USERS = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    [SET_USERS]: (state, payload) => (state.users = [...payload]),
    [ADD_USERS]: (state, payload) => state.users.push(payload),
    [REMOVE_USERS]: (state, index) => state.users.splice(index, 1),
    [UPDATE_USERS]: (state, { index, payload }) =>
      state.users.splice(index, 1, payload)
  },
  getters: {
    users: state => state.users,
    getUser: state => id => {
      return state.users.find(user => user.id === id)
    },
    filterUsers: state => ({ key, value }) => {
      return state.users.filter(user =>
        user[key].toLowerCase().startsWith(value.toLowerCase())
      )
    }
  },
  actions: {
    setUsers ({ commit }, payload) {
      commit(SET_USERS, payload)
    },
    removeUser ({ state, commit }, { id }) {
      const index = state.users.findIndex(user => user.id === id)
      commit(REMOVE_USERS, index)
    },
    addUsers ({ state, commit }, payload) {
      payload.id = state.users.length * 33
      commit(ADD_USERS, payload)
    },
    updateUsers ({ state, commit }, payload) {
      const index = state.users.findIndex(user => user.id === payload.id)
      commit(UPDATE_USERS, { index, payload })
    },
    async initialGet ({ dispatch }) {
      try {
        const { data } = await services.getData()
        const payload = data.map(
          ({ id, nome, sobrenome, email, valor_carteira }) => ({
            id,
            nome,
            sobrenome,
            email,
            valor_carteira
          })
        )
        dispatch('setUsers', payload)
      } catch {
        dispatch('GLOBAL/setError', true, { root: true })
      }
    }
  }
}

export default USERS
