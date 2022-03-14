import Vue from 'vue'
import Vuex from 'vuex'

import Carteira from '@/model/Carteira.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modal: {
            titulo: 'Adicionar Carteira'
        },
        itens: [],
        carteira: new Carteira()
    },
    getters: {
        modal(state) {
            return state.modal
        },
        carteira(state) {
            return state.carteira
        },
        itens(state) {
            return state.itens
        }
    },
    mutations: {
        limpaCarteira(state) {
            state.carteira = new Carteira()
        }, 
    }
})