const state = {
	loadingRequest: false
}

const mutations = {
	setLoadingRequest: (state, payload) => state.loadingRequest = payload
}

const getters = {
	loadingRequest: state => state.loadingRequest
}

const actions = {
	setLoadingRequest: ({ commit }, payload) => commit('setLoadingRequest', payload)
}

export default {
    namespaced: true,
    stateFactory: true,
    state,
    mutations,
    getters,
    actions,
}