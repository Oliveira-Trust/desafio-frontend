const currencyURL = "https://economia.awesomeapi.com.br/json/last/";

const state = {
    origin: "BRL",
    amount: 0
}

const actions = {
     async convertCoin({commit, state}, currency){
        const {origin} = state;
        const response = await fetch(`${currencyURL}BTC-${origin}`);
        const amount = await response.json();
        const value = parseInt(currency)/parseInt(amount.BTCBRL.bid)
        commit("updateAmount", value)
    }
}

const mutations = {
      updateAmount(state, amount){
        state.amount = amount
      }
}

export default {state, actions, mutations}