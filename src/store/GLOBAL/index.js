import services from '../../services'
import { SET_ERROR, SET_LOADING, SET_REFS_BITCOIN } from './mutations-types'
const GLOBAL = {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    refsBitcoin: {}
  },
  mutations: {
    [SET_ERROR]: (state, status) => (state.error = status),
    [SET_LOADING]: (state, status) => (state.loading = status),
    [SET_REFS_BITCOIN]: (state, payload) => (state.refsBitcoin = payload)
  },
  getters: {
    isLoading: state => state.loading,
    hasError: state => state.error,
    refsBitcoin: state => state.refsBitcoin
  },
  actions: {
    setError ({ commit }, status) {
      commit(SET_ERROR, status)
    },
    setLoading ({ commit }, status) {
      commit(SET_LOADING, status)
    },
    setRefsBitcoin ({ commit }, payload) {
      commit(SET_REFS_BITCOIN, payload)
    },
    async getRefsBitCoin ({ dispatch }) {
      try {
        const { data } = await services.refsBitcoin()
        const payload = {
          brl: data.BTCBRL.bid,
          eur: data.BTCEUR.bid,
          usd: data.BTCUSD.bid
        }
        dispatch('setRefsBitcoin', payload)
      } catch {
        dispatch('setError', true)
      }
    }
  }
}

export default GLOBAL
