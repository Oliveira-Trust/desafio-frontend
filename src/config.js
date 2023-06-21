import axios from 'axios';

const apiBase = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL_API
});

const apiConverter = axios.create({
  baseURL: process.env.VUE_APP_COTACAO_API
});

export default apiBase;
export {
  apiConverter
}