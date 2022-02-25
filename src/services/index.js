import axios from 'axios'
import store from '../store/index'

const API_ENVS = {
  local: 'http://localhost:3004'
}

const apiClient = axios.create({
  baseURL: API_ENVS.local,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json'
  }
})

apiClient.interceptors.request.use(config => {
  store.dispatch('GLOBAL/setLoading', true)
  return config
})

apiClient.interceptors.response.use(
  response => {
    store.dispatch('GLOBAL/setLoading', false)
    return response
  },
  error => {
    store.dispatch('GLOBAL/setLoading', false)
    return Promise.reject(error)
  }
)

export default {
  async getData () {
    return apiClient.get('/users')
  },
  async refsBitcoin () {
    apiClient.defaults.baseURL = 'https://economia.awesomeapi.com.br/'
    return apiClient.get('/json/last/BTC-USD,BTC-EUR,BTC-BRL')
  }
}
