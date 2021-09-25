const state = {
	user: null,
	userSearch: null,
	userCollection: '-',
}

const treatDataTable = data => {
	if (data && Array.isArray(data)) {
		data.map((item, index) => {
			item.index = index + 1
		}) 
	}
	return data
}

const mutations = {
	setUser: (state, payload) => state.user = payload,
	setUserSearch: (state, payload) => state.userSearch = payload,
	setUserCollection: (state, payload) => state.userCollection = treatDataTable(payload),
}

const getters = {
	user: state => state.user,
	userSearch: state => state.userSearch,
	userCollection: state => state.userCollection,
}

const actions = {
	setUser: ({ commit }, payload) => commit('setUser', payload),
	setUserSearch: ({ commit }, payload) => commit('setUserSearch', payload),
	setUserCollection: ({ commit }, payload) => commit('setUserCollection', payload),
}

export default {
    namespaced: true,
    stateFactory: true,
    state,
    mutations,
    getters,
    actions,
}