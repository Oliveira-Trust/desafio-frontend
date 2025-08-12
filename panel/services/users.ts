import type { User } from '~/interfaces';
import { filterService, type FilterParams } from './filters';

const API_BASE_URL = import.meta.env.VITE_ENDPOINT_URL || 'http://localhost:3000'

export interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  totalPages: number
  currentPage: number
  perPage: number
}

interface JsonServerResponse<T> {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: T[]
}

export const usersService = {
  async getUsers(page: number = 1, perPage: number = 10): Promise<PaginatedResponse<User>> {
    const endpoint = import.meta.env.VITE_LIST_USERS
    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const searchParams = new URLSearchParams()
    searchParams.append('_page', page.toString())
    searchParams.append('_per_page', perPage.toString())

    const url = `${API_BASE_URL}${endpoint}?${searchParams.toString()}`;
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`)
    }
    
    const jsonResponse: JsonServerResponse<User> = await response.json()
    
    return {
      data: jsonResponse.data,
      totalCount: jsonResponse.items,
      totalPages: jsonResponse.pages,
      currentPage: page,
      perPage
    }
  },

  async searchUsers(filters: FilterParams, page: number = 1, perPage: number = 10): Promise<PaginatedResponse<User>> {
    const endpoint = import.meta.env.VITE_LIST_USERS;

    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const searchParams = filterService.getSearchParams(filters, page, perPage)
    const url = `${API_BASE_URL}${endpoint}?${searchParams.toString()}`;
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`)
    }
    
    const jsonResponse: JsonServerResponse<User> = await response.json()
    
    return {
      data: jsonResponse.data,
      totalCount: jsonResponse.items,
      totalPages: jsonResponse.pages,
      currentPage: page,
      perPage
    }
  }
}