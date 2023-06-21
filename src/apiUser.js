import apiBase, { apiConverter } from './config';

const getWallets = (query = '') => {
  return apiBase.get(`/users${query}`);
};

const postWallet = (payload) => {
  return apiBase.post(`/users`, payload, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

const deleteWallet = (id) => {
  return apiBase.delete(`/users/${id}`);
};

const updateWallet = (payload) => {
  const { id } = payload;
  return apiBase.put(`/users/${id}`, payload);
};

const searchWallet = (query) => {
return apiBase.get(`/users?${query}`);
};

const getConverter = (fromTo = 'BTC-BRL') => {
  const normalizeFromTo = fromTo.toUpperCase();
  return apiConverter.get(`/json/last/${normalizeFromTo}`);
};


export {
  getWallets,
  postWallet,
  deleteWallet,
  updateWallet,
  searchWallet,
  getConverter
}