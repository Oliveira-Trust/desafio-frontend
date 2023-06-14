import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    wallets: [],
    pagination: {
      count: 0,
      first: 1,
      actual: 1,
      next: undefined,
      last: undefined
    }
  },
  mutations,
  actions
})

export default store;