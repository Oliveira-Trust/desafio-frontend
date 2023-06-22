const store = {
  namespaced: true,
  state: {
    objModal: {}
  },
  getters: {
    getObjModal: (state) => state.objModal 
  },
  actions: {
    showModal({ commit }, modalName) {
      commit('SHOW_MODAL', modalName);
    }
  },
  mutations: {
    SHOW_MODAL(state, modalName) {
      state.objModal= {
        ...state.objModal,
        [modalName]: true
      };
    },
    HIDE_MODAL(state) {
      state.objModal = {}
    }
  },

};

export default store;