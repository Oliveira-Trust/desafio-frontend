import * as API from "@/services/ApiWallets"
import * as types from "./mutation-types";

export const state = {
  WalletsPagination: {
    list: [],
    filter: '',
    totalRecords: 0,
    page: 1
  },
  WalletsAll: [],
};

export const mutations = {
  [types.LOAD_LIST_PAGINATION](state, listPagination) {
    state.WalletsPagination.list = listPagination.list;
    state.WalletsPagination.totalRecords = listPagination.totalRecords;
    state.WalletsPagination.page = listPagination.page;

  },
  [types.LOAD_LIST_ALL](state, listAll) {
    state.WalletsAll = listAll;
  },
  [types.SELECT_PAGE](state, page) { state.WalletsPagination.page = page || 1; },
  [types.TOTAL_RECORDS](state, totalRecords) { state.WalletsPagination.totalRecords = totalRecords; },
  [types.FILTER](state, filter) { state.WalletsPagination.list = filter; },
  [types.DELETE_WALLET](state, id) {
    state.WalletsPagination.list = state.WalletsPagination.list
      .filter(wallet => wallet.id != id);
  },
};

export const getters = {
  getWalletsAll(state) { return state.WalletsAll; },
  getWalletsPagination(state) { return state.WalletsPagination.list; },
  selectedPage(state) { return state.WalletsPagination.page || 1; },
  getTotalRecords(state) { return state.WalletsPagination.totalRecords; },
  getFilter(state) { return state.WalletsPagination.filter; },
};

export const actions = {
  async listWalletsPagination({ commit, getters }, playload) {
    const { page, filter } = playload;
    let retornoPage = page || 1;
    retornoPage = getters.getWalletsPagination.length === 0 ? page - 1 : retornoPage;
    const { list, totalRecords } = await API.getWalletsPagination(retornoPage, filter);
    commit(types.LOAD_LIST_PAGINATION, { list, totalRecords, page: retornoPage });
  },
  async listAllWallets({ commit }) {
    const list = await API.getAllWallets();
    commit(types.LOAD_LIST_ALL, list);
  },
  async removeWallet({ commit, dispatch, getters }, wallet) {
    await API.removeWallet(wallet.id);
    commit(types.DELETE_WALLET, wallet.id);
    dispatch('listWalletsPagination', { page: getters.selectedPage, filter: getters.getFilter });
    dispatch('listAllWallets');
  },
  async editWallet({ dispatch, getters }, wallet) {
    await API.editWallet(wallet);
    dispatch('listWalletsPagination', { page: getters.selectedPage, filter: getters.getFilter });
    dispatch('listAllWallets');
  },
  async createWallet({ dispatch, getters }, wallet) {
    await API.createWallet(wallet);
    dispatch('listWalletsPagination', { page: getters.selectedPage, filter: getters.getFilter });
    dispatch('listAllWallets');
  },

}