const currencyURL = "https://economia.awesomeapi.com.br/json/last/";

const fetchData = async (origin, to) => {
    const URL = `${currencyURL}${to}-${origin}`
    const response = await fetch(URL);
    const data = await response.json();
    return data
} 

const state = {
    origin: "BRL",
    to: "BTC",
    amount: 0,
    bitcoin: 0,
    bid: 0,
}

const actions = {
  async convertCoinToBTC ({commit, state}, value){
    const {origin, to} = state
    const key = `${to}${origin}`;
    const data = await fetchData(origin, to)
    const amount = parseInt(value)/parseInt(data[key].bid);
    commit("updateBitcoin", amount);
    commit("updateBid", parseInt(data[key].bid));
  },
  async convertBTCtoCoin ({commit, state}, value){
    const {origin, to, bid} = state;
    const key = `${to}${origin}`;
    let amount;
    if(!bid){
      const data = await fetchData(origin, to);
      amount = parseInt(value) * parseInt(data[key].bid);
      commit("updateAmount", amount)
    }else{
      amount = value * bid;
      commit("updateAmount", amount)
    }
  },
  clearAmountAndBitcoinState({commit}){
    commit("updateBitcoin", 0);
    commit("updateAmount", 0)
  }
}

const mutations = {
      updateBitcoin(state, amount){
        state.bitcoin = amount
      },
      updateAmount(state, amount){
        state.amount = amount
      },
      updateBid(state, bid){
        state.bid = bid
      }
}

export default {state, actions, mutations}