const state = {
	example: null
}

const mutations = {
	setExample: (state, payload) => state.example = payload
}

const getters = {
	example: state => state.example
}

const actions = {
	setExample: ({ commit }, payload) => commit('setExample', payload)
}

export default {
    namespaced: true,
    stateFactory: true,
    state,
    mutations,
    getters,
    actions,
}