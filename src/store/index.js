import Vue from 'vue';
import Vuex from 'vuex';
import wallet from './wallet';
import converter from './converter';
import modal from './modal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    wallet,
    converter,
    modal
  }
});