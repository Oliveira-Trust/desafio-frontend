import { getConverter } from "../apiUser"; 

const store = {
  state: {
    converter: {}
  },
  getters: {
    getConverter: (state) => state.converter
  },
  actions: {
    async getConverter({ commit }, formToConverter) {
      try {
        const keyConverter = formToConverter.replace('-', '');
        const { data } = await getConverter(formToConverter);

        commit('CONVERT_CURRENCY', data[keyConverter]);
      } catch (error) {
        console.error(`Erro ao converter ${formToConverter}`);
      }
    }
  },
  mutations: {
    CONVERT_CURRENCY(state, objConverter) {
      state.converter = objConverter;
    }
  }
}

export default store;