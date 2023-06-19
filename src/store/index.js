import Vue from 'vue'
import Vuex from 'vuex'
import currency from './modules/currency';
import wallets from './modules/wallets';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    currency,
    wallets
  }
})

export default store;