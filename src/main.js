import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);
Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    users: [],
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
