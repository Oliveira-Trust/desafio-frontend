export const state = () => ({
  loggedIn: false,
  user: {},
})
export const mutations = {
  setUser(state, user) {
    state.user = user || {}
    state.loggedIn = !!user
  },
  setLogged(state, islog) {
    state.loggedIn = islog
  },
}

export const actions = {
  setUser({ commit }, payload) {
    commit('setUser', payload)
  },

  setLogged({ commit }, payload) {
    commit('setLogged', payload)
  },
  logout({ commit }) {
    commit('setUser')
  },
}
