import { getWallets, postWallet, deleteWallet, updateWallet, searchWallet } from '../apiUser';

const parseLinkHeader = ( linkHeader ) => {
  const linkHeadersArray = linkHeader.split( ", " ).map( header => header.split( "; " ) );
  const linkHeadersMap = linkHeadersArray.map( header => {
     const thisHeaderRel = header[1].replace( /"/g, "" ).replace( "rel=", "" );
     const thisHeaderUrl = header[0].slice( 1, -1 );
     return [ thisHeaderRel, thisHeaderUrl ]
  } );

  return Object.fromEntries( linkHeadersMap );
};

const store = {
  state: {
    wallets: [],
    fullWallets: [],
    wallet: {},
    msgSearch: '',
    searchError: false,
    searchSuccess: false,
    pagination: {}
  },
  getters: {
    getWallets: (state) => state.wallets,
    getFullWallets: (state) => state.fullWallets, 
    getWallet: (state) => state.wallet,
    getMsgSearch: (state) => state.searchError,
    getSearchError: (state) => state.searchError,
    getSearchSuccess: (state) => state.searchSuccess,
    getPagination: (state) => state.pagination
  },
  actions: {
    async fetchWallets({ commit }, query= null) {
      try {
        const getQuery = query ? query : '?_sort=data_abertura&_order=desc&_page=1&_limit=10';
        const wallets = await getWallets(getQuery);
     
        const { data } = wallets;
        const { headers } = wallets;
        const links = parseLinkHeader(headers.link);

        commit('SET_WALLETS', data);
        commit('SET_PAGINATION', links);
      } catch (error) {
        console.error('Error');
      }
    },
    async fetchFullWallets({ commit }) {
      const fullWallets = await getWallets();
      const { data } = fullWallets;
      
      commit('SET_FULL_WALLETS', data);
    },
    async addWallet({ commit }, payload) {
      try {
        const { data } = await postWallet(payload);
        
        commit('ADD_WALLET', data);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteWallet({ commit }, id) {
      try {
        await deleteWallet(id);
        
        commit('DELETE_WALLET', id);
      } catch (error) {
        console.error('Error');
      }
    },
    async updateWallet({ commit }, payload) {
      try {
        const { data } = await updateWallet(payload);
       
        commit('UPDATE_WALLET', data);
      } catch (error) {
        console.log(error);
      }
    },
    async searchWallet({ commit }, query) {
      try {
        const { data } = await searchWallet(query);
        
        data.length ? commit('SEARCH_WALLET', data) : commit('SEARCH_NOT_FOUND');
      } catch (error) {
        console.log(error);
      }
    },
    setWallet({ commit }, wallet) {
      commit('SET_WALLET', wallet);
    }
  },
  mutations: {
    SET_WALLETS(state, wallets) {
      state.wallets = wallets;
      state.searchSuccess = false;
    },
    SET_FULL_WALLETS(state, fullWallets) {
      state.fullWallets = fullWallets;
    },
    SET_WALLET(state, wallet) {
      state.wallet = wallet;
    },
    SET_PAGINATION(state, links) {
      state.pagination = links;
    },
    ADD_WALLET(state, wallet) {
      state.wallets.unshift(wallet);
      state.showModal = false;
    },
    DELETE_WALLET(state, id) {
      const findIndex = state.wallets.findIndex(wallet => wallet.id === id);
      state.wallets.splice(findIndex, 1);
    },
    UPDATE_WALLET(state, wallet) {
      const findIndex = state.wallets.findIndex(elem => elem.id === wallet.id);
      state.wallets.splice(findIndex, 1, wallet);
    },
    SEARCH_WALLET(state, wallet) {
      state.wallets = wallet;
      state.searchError = false;
      state.msgSearch = '';
      state.searchSuccess = true;
    },
    SEARCH_NOT_FOUND(state) {
      state.searchError = true;
      state.searchError = 'Nenhuma carteira encontrada, favor tentar novamente.'
    }
  }
}

export default store;