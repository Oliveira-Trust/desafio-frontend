import Vue from 'vue';
import Vuex from 'vuex';
import User from '../../domain/models/user';
import UserDTO from '../../infrastructure/dto/user';
import api from '../../infrastructure/http/api';
import { getCurrencyBid, syncCurrencyExchange } from '../../domain/usecases/currencyExchange';
import {reconvertDate} from '../../services/utils/dateTime'

Vue.use(Vuex)

const store = new Vuex.Store({ 
  namespaced : true,
  state : {      
      users: [],
      openedModal: null,
      selectedUser: new User(),     
      selectedCurrency: 'BTC',
      selectedCurrencyBid: 1       
  },
  mutations: {

    setSelectedCurrency (state, currency) {
      state.selectedCurrency = currency
    },
    setSelectedCurrencyBid (state, bid) {
      state.selectedCurrencyBid = bid
    },
    setUsers (state, userList) {
      state.users = userList
    },
    addUser (state, newUser) {
      state.users.push(newUser)
    },
    updateUser (state, updated) {      
      const user = state.users.find(u => u.id === updated.id);
      Object.assign(user, updated);

    },
    removeUser (state, deleted) {
      state.users = state.users.filter(u=> u.id !== deleted)
    },
    setSelectedUser (state, user) {
      state.selectedUser = user
    },
    showModal (state, modalName) {
      state.openedModal = modalName
    },
    cleanModal(state){
      state.openedModal = null
      state.selectedUser = new User()
    }

  },
  getters: {
    filteredUsers: (state) => (filterObj) => {
      const userList = state.users.map(u=> { return new User(u)})
      let filteredList = userList.filter((u) => {
        for (const key in filterObj) {
          if (filterObj[key] && 
            !u[key]?.toString()
              .toLowerCase()
              .includes(filterObj[key].toLowerCase())) {
            return false;
          }
        }
        u.valor_currency = syncCurrencyExchange(u.valor_currency, state.selectedCurrencyBid)
        u.data_abertura = reconvertDate(u.data_abertura)
        u.data_nascimento = reconvertDate(u.data_nascimento)
        return true;
      });                    
      return filteredList
    }
  },  
  actions:{
    async requestUsers({commit}){
      const res = await api.get('/users')	
      commit('setUsers', res)        
    },
    async postUser({commit}, payload){
      const userDTO = new UserDTO(payload)
      const res = await api.post('/users', userDTO)	
      commit('addUser', res)        
    },
    async deleteUser({commit}, payload){
      await api.remove('/users', payload)	
      commit('removeUser', payload)        
    },
    async putUser({commit}, payload){
      await api.put('/users', payload)	
      commit('updateUser', payload)        
    },
    async getCurrencyBid({state, commit}){
      const res = await getCurrencyBid('BTC',state.selectedCurrency)                   
      commit('setSelectedCurrencyBid', res)        
    },


  } 
})
export default store