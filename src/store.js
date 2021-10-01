import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    wallets: [],
    walletsPage: 1,
    walletsLimit: 5,
    walletsTotal: 1,
    nameFilter: "",
    emailFilter: "",
    dateFilter: "",
    isFetchingData: false
  },

  getters: {
    filters({ nameFilter, emailFilter, dateFilter }) {
      let filter = "";

      if (nameFilter) filter += `&nome_like=${nameFilter}`;
      if (emailFilter) filter += `&email_like=${emailFilter}`;
      if (dateFilter) filter += `&data_abertura_like=${dateFilter}`;

      return filter;
    }
  },

  mutations: {
    setWallets(state, payload) {
      state.wallets = payload;
    },

    setWalletsTotal(state, payload) {
      state.walletsTotal = payload;
    },

    setWalletsPage(state, payload) {
      state.walletsPage = payload;
    },

    setWalletsLimit(state, payload) {
      state.walletsLimit = payload;
    },

    setNameFilter(state, payload) {
      state.nameFilter = payload;
    },

    setEmailFilter(state, payload) {
      state.emailFilter = payload;
    },

    setDateFilter(state, payload) {
      state.dateFilter = payload;
    }
  },

  actions: {
    async getWallets({
      commit,
      getters,
      state: { walletsPage, walletsLimit }
    }) {
      this.isFetchingData = true;

      const response = await fetch(
        `http://localhost:3004/users?_page=${walletsPage}&_limit=${walletsLimit}${getters.filters}`
      );
      const data = await response.json();
      const total = response.headers.get("X-Total-Count");

      commit("setWalletsTotal", parseInt(total));
      commit("setWallets", data);

      this.isFetchingData = false;
    },

    async addWallet({ dispatch }, payload) {
      this.isFetchingData = true;

      await fetch("http://localhost:3004/users", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      this.isFetchingData = false;

      dispatch("getWallets");
    },

    async updateWallet({ dispatch }, payload) {
      this.isFetchingData = true;

      await fetch(`http://localhost:3004/users/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      });

      this.isFetchingData = false;

      dispatch("getWallets");
    },

    cleanNameFilter({ commit, dispatch }) {
      commit("setNameFilter", "");
      dispatch("getWallets");
    },

    cleanEmailFilter({ commit, dispatch }) {
      commit("setEmailFilter", "");
      dispatch("getWallets");
    },

    cleanDateFilter({ commit, dispatch }) {
      commit("setDateFilter", "");
      dispatch("getWallets");
    }
  }
});
