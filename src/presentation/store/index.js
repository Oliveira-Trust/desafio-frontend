import Vue from 'vue';
import Vuex from 'vuex';
import User from '../../domain/models/user';
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
    filteredUsers: (state) => (filterObj)=> {
      const userList = state.users.map(u=> { return new User(u)})
      const filteredList = userList.filter((u) => {
        for (const key in filterObj) {
          if (u[key] !== filterObj[key]) {
            return false;
          }
        }
        return true;
      });      
      return filteredList
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