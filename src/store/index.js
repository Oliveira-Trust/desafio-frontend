import Vue from 'vue'
import Vuex from 'vuex'
import GLOBAL from './GLOBAL/index'
import USERS from './USERS/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    GLOBAL,
    USERS
  }
})
