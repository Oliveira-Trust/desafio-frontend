import { JSONSERVER } from '@/services/ApiAxios';
const api = JSONSERVER;

export const getWalletsPagination = async (page, filtro = '') => {
  const retorno = await api(`users/?_page=${page}&_limit=10 ${filtro}`);
  let totalRecords = retorno.headers['x-total-count'];
  return { list: retorno.data, totalRecords: Number(totalRecords) }
};

export const getAllWallets = async () => {
  const retorno = await api('users/');
  return retorno.data;
};

export const removeWallet = async (id) => {
  await api.delete(`users/${id}`);
};

export const editWallet = async (wallet) => {
  await api.put(`users/${wallet.id}`, wallet)
};

export const createWallet = async (wallet) => {
  await api.post(`users/`, wallet);
};