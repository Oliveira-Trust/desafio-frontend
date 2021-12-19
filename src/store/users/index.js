import Vue from 'vue';
import VueCookies from 'vue-cookies';
import { getUsersList, updateUserInList, deleteUserInList, createUserInList } from "@/services/users"
import { downloadBlobCsv } from "@/utils"
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
    EXPORT_CSV (state) {
        downloadBlobCsv('usuarios', state.usersList.results);
    }
}

export const actions = {
    async getUsers ({ commit }, queryString = '') {
        const { results, count, total } = await getUsersList(queryString);
        commit('SET_USERS_LIST', { results, count, total });
    },
    async updateUser (_, user) {
        await updateUserInList(user);
    },
    async createUser (_, user) {
        await createUserInList(user);
    },
    async deleteUser (_, id) {
        await deleteUserInList(id);
    },
    async exportUserCsv ({ commit, dispatch }, type) {
        if (type == 'all') {
            await dispatch('getUsers');
        }
        commit('EXPORT_CSV');

    }
}