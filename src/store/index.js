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
    },
    currency: 'BRL',
    cryptoCurrency: 'BTC',
    cryptoCurrencyValue: 0,
  },
  actions: {
    async pullUsers ({ state, commit }, { currentPage, pageLimit }) {
      if(!pageLimit) pageLimit = 10;

      let queryString = '';
      queryString += ('?_page=' + currentPage);
      queryString += ('&_limit=' + pageLimit);

      queryString += `&${Object.keys(state.filter)[0]}_like=${state.filter.nome}`
      queryString += `&${Object.keys(state.filter)[1]}_like=${state.filter.sobrenome}`
      queryString += `&${Object.keys(state.filter)[2]}_like=${state.filter.email}`

      const response = await fetch(process.env.VUE_APP_USERS_API_ENDPOINT + queryString);

      const totalItems = response.headers.get('X-Total-Count');
      const users = await response.json();

      commit('setUsers', users);
      commit('setPaginationData', { currentPage, totalItems, pages: Math.ceil(totalItems / pageLimit) });
    },
    async pullCryptoCurrencyPrice ({ state, commit }) {
      const response = await fetch(`${process.env.VUE_APP_CRYPTO_PRICE_ENDPOINT}${state.cryptoCurrency}-${state.currency}`);
      const coin = await response.json();
      commit('setCryptoCurrencyValue', coin[`${state.cryptoCurrency}${state.currency}`].bid);
    },
    async createUser ({ commit, state }, user) {
      const response = await fetch(process.env.VUE_APP_USERS_API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const createdUser = await response.json();
      state.paginationData.totalItems += 1;
      commit('addUser', createdUser);
      // dispatch('pullUsers', { currentPage: 1 });
    },
    async deleteUser ({ commit, state }, userId) {
      await fetch(`${process.env.VUE_APP_USERS_API_ENDPOINT}/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      state.paginationData.totalItems -= 1;
      commit('removeUser', userId);
      // dispatch('pullUsers', { currentPage: 1 });
    },
    async updateUser (_, user) {
      const { id, ...userPatch } = user;

      await fetch(`${process.env.VUE_APP_USERS_API_ENDPOINT}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(userPatch),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
    },
  },
  mutations: {
    setUsers (state, users) {
      state.users = users;
    },
    addUser (state, user) {
      state.users = [...state.users, user];
    },
    removeUser (state, userId) {
      state.users = state.users.filter(u => u.id !== userId);
    },
    setFilter (state, filter) {
      state.filter = filter;
    },
    setPaginationData (state, paginationData) {
      state.paginationData = paginationData;
    },
    setCryptoCurrencyValue (state, cryptoCurrencyValue) {
      state.cryptoCurrencyValue = cryptoCurrencyValue;
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
    getCryptoCurrencyValue (state) {
      return state.cryptoCurrencyValue;
    },
  },
});