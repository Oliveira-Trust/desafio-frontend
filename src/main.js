import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    users: [],
  },
  actions: {
    async pullUsers ({ commit }) {
      const response = await fetch('http://localhost:3004/users');
      const users = await response.json();
      commit('setUsers', users);
    },
  },
  mutations: {
    setUsers (state, users) {
      state.users = users;
    },
  },
  getters: {
    getUsers (state) {
      return state.users;
    },
  },
});

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
