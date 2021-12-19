import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// import modules of stores
import * as users from './users';
import * as notification from './notification';

export default new Vuex.Store({
    modules: {
        users: {
            namespaced: true,
            ...users
        },
        notification: {
            namespaced: true,
            ...notification
        },
    },
});