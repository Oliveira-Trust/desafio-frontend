const URL = "http://localhost:3004/users";
const currencyURL = "https://economia.awesomeapi.com.br/json/last/";

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
    },
    async convertCoin({commit, state}, currency){
        const {origin} = state;
        const response = await fetch(`${currencyURL}BTC-${origin}`);
        const amount = await response.json();
        const value = parseInt(currency)/parseInt(amount.BTCBRL.bid)
        commit("updateAmount", value)
    }
}

export default actions