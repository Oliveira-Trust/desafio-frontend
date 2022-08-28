import Vue from "vue";
import Vuex from "vuex";

import users from "./users";
import money from "./money";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    money,
  },
  strict: process.env.NODE_ENV !== "production",
});
