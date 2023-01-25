import apiExchange from '../../infrastructure/http/api-converter'

export const asyncCurrencyExchange = async function(from, to, val) {
  let result = val
  if(to !== 'BTC'){
    let bid = await apiExchange.get(`/last/${from}-${to}`)    
    bid = bid[`${from}${to}`].bid
    result = val * bid
  }
  return result
}
export const syncCurrencyExchange = function(val, bid) {
  let result = val * bid                 
  return result
}
export const getCurrencyBid = async function(from, to) {
  let result = 1
  if(to !== 'BTC'){
    result = await apiExchange.get(`/last/${from}-${to}`)   
    result = result[`${from}${to}`].bid     
  }
  return result
}



      