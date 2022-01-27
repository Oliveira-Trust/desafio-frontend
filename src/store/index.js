import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as wallets from './wallets';

export default new Vuex.Store({
    modules: {
      wallets: {
            namespaced: true,
            ...wallets
        }
    },
});