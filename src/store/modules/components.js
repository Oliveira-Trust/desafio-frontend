const state = {
	showUserCreateForm: false
}

const mutations = {
	setShowUserCreateForm: (state, payload) => state.showUserCreateForm = payload
}

const getters = {
	showUserCreateForm: state => state.showUserCreateForm
}

const actions = {
	setShowUserCreateForm: ({ commit }, payload) => commit('setShowUserCreateForm', payload)
}

export default {
    namespaced: true,
    stateFactory: true,
    state,
    mutations,
    getters,
    actions,
}