import { apiService } from './api';
import type { User, SearchUsersParams } from '~/interfaces';

export const usersService = {
  async getUsers(): Promise<User[]> {
    const endpoint = import.meta.env.VITE_LIST_USERS
    if (!endpoint) {
      throw new Error('Erro interno');
    }

    return await apiService.request<User[]>(endpoint);
  },

  async searchUsers(params: SearchUsersParams): Promise<User[]> {
    const endpoint = import.meta.env.VITE_LIST_USERS;

    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const searchParams = new URLSearchParams()

    if (params.nome) searchParams.append('nome', params.nome);
    if (params.sobrenome) searchParams.append('sobrenome', params.sobrenome);
    if (params.email) searchParams.append('email', params.email);

    const url = `${endpoint}?${searchParams.toString()}`;
    return await apiService.request<User[]>(url);
  }
}