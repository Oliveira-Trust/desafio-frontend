import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// import modules of stores
import * as users from './users';

export default new Vuex.Store({
    modules: {
        users: {
            namespaced: true,
            ...users
        },
    },
});