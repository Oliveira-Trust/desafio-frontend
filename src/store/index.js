import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    users: [],
    filter: {
      nome: '',
      sobrenome: '',
      email: ''
    },
    paginationData: {
      currentPage: 1,
      pages: 1,
      totalItems: 0
    }
  },
  actions: {
    async pullUsers ({ commit }, { currentPage, pageLimit }) {
      if(!pageLimit) pageLimit = 10;

      let queryString = '';
      queryString += '?_page=' + currentPage;
      queryString += '&_limit=' + pageLimit;

      const response = await fetch(process.env.VUE_APP_USERS_API_ENDPOINT + queryString);

      const totalItems = response.headers.get('X-Total-Count');
      const users = await response.json();

      commit('setUsers', users);
      commit('setPaginationData', { currentPage, totalItems, pages: Math.ceil(totalItems / pageLimit) });
    },
  },
  mutations: {
    setUsers (state, users) {
      state.users = users;
    },
    setPaginationData (state, paginationData) {
      state.paginationData = paginationData;
    },
  },
  getters: {
    getUsers (state) {
      return state.users;
    },
    getFilter (state) {
      return state.filter;
    },
    getPaginationData (state) {
      return state.paginationData;
    },
  },
});