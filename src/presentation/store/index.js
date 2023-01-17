import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

const store = { 
    state : {      
        count: 0      
    },
    mutations: {
      increment (state) {
        state.count++
      }
    },
    getters: {
      count: (state) => state.count || [],
    },   
}

export default store