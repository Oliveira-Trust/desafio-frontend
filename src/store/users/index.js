import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { getUsersList } from "@/services"
// Registro de Cookies
Vue.use(VueCookies);

export const state = {
    usersList: Vue.$cookies.get('usersList') != undefined ? Vue.$cookies.get('usersList') : {
        results: [], count: 0, total: 0
    },
}

export const mutations = {
    SET_USERS_LIST (state, users) {
        state.usersList = users;
        Vue.$cookies.set('usersList', state.usersList);
    },
    SET_ACTIVE_PAGE (state, activePage) {
        state.usersList.activePage = activePage;
        Vue.$cookies.set('usersList', state.usersList);
    }
}

export const actions = {
    async getUsers ({ commit }, queryString = '') {
        const { results, count, total } = await getUsersList(queryString);
        commit('SET_USERS_LIST', { results, count, total });
    },
    setActivePage ({ commit }, activePage) {
        commit('SET_ACTIVE_PAGE', activePage);
    }
}