const URL = "http://localhost:3004/users";

const state = {
    wallets: [],
    pagination: {
      count: 0,
      first: 1,
      actual: 1,
      next: undefined,
      last: undefined
    }
  }

const actions = {
    async fetchWallets({commit}, context){
        const {page = 1, limit = 10} = context;
        const response = await fetch(`${URL}?_page=${page}&_limit=${limit}`);
        const total = response.headers.get('X-Total-Count');
        const totalPages = total / limit;
        const nextPage = page + 1;
        const previousPage = page - 1;
        const pagination = {
            count: parseInt(total),
            first: 1,
            previous: previousPage > 1 ? previousPage : undefined,
            actual: page,
            next: nextPage > totalPages ? undefined : nextPage,
            last: totalPages
        }
        const wallets = await response.json();
        commit("updateWallets", wallets);
        commit("updatePagination", pagination);
    },
    async createWallet({commit}, body){
        const response = await fetch(URL, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          });
          const wallet = await response.json();
          commit("createWallet", wallet)
    }
}

const mutations = {
    updateWallets (state, wallets) {
        state.wallets = wallets.map(wallet => {
          return {
              id: wallet.id,
              nome: wallet.nome,
              sobrenome: wallet.sobrenome,
              email: wallet.email,
              bitcoin: wallet.valor_carteira
          }
        })
      },
      createWallet(state, wallet){
        const newWallets = state.wallets;
        newWallets.push(wallet);
        state.wallets = newWallets.map(wallet => {
            return {
                id: wallet.id,
                nome: wallet.nome,
                sobrenome: wallet.sobrenome,
                email: wallet.email,
                bitcoin: wallet.valor_carteira
            }
          })
      },
      updatePagination(state, pagination){
        state.pagination = pagination;
      },
}

export default {state, actions, mutations}