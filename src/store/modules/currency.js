const currencyURL = "https://economia.awesomeapi.com.br/json/last/";

const state = {
    origin: "BRL",
    amount: 0
}

const actions = {
  async convertCoin ({commit, state}, value){
    const origin = state.origin
    const to = "BTC"
    const URL = `${currencyURL}${to}-${origin}`
    const key = `${to}${origin}`;
    const response = await fetch(URL);
    const data = await response.json();
    const amount = parseInt(value)/parseInt(data[key].bid);
    commit("updateAmount", amount)
  }
}

const mutations = {
      updateAmount(state, amount){
        state.amount = amount
      }
}

export default {state, actions, mutations}