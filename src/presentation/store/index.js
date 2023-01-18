import Vue from 'vue';
import Vuex from 'vuex';
import api from '../../infrastructure/http/api';


Vue.use(Vuex)

const store = new Vuex.Store({ 
  namespaced : true,
  state : {      
      users: []
  },
  mutations: {
    setUsers (state, userList) {
      state.users = userList
    }
  },
  getters: {
    getUsersGridView(state){
      return state.users.map(u=> { return {
          id: u.id,
          nome: u.nome,
          sobrenome: u.sobrenome,
          email: u.email, 
          bitcoin: u.bitcoin
        }
      })
    }
  },  
  actions:{
    async requestUsers({commit}){
      const res = await api.get('/users')	
      commit('setUsers', res)        
    }
  } 
})
export default store