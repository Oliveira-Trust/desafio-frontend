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
  },

  async createUser(userData: Omit<User, 'id' | 'data_abertura' | 'endereco' | 'data_nascimento' | 'endereco_carteira'>): Promise<User> {
    const endpoint = import.meta.env.VITE_CREATE_USER || '/users';
    
    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const newUser = {
      ...userData,
      id: crypto.randomUUID(),
      data_abertura: new Date().toISOString().split('T')[0] || '',
      endereco: '',
      data_nascimento: '',
      endereco_carteira: ''
    };

    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }

    return newUser;
  },

  async updateUser(userData: User): Promise<User> {
    const endpoint = import.meta.env.VITE_UPDATE_USER || '/users';
    
    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const url = `${API_BASE_URL}${endpoint}/${userData.id}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }

    return userData;
  },

  async deleteUser(userId: string): Promise<void> {
    const endpoint = import.meta.env.VITE_DELETE_USER || '/users';
    
    if (!endpoint) {
      throw new Error('Erro interno');
    }

    const url = `${API_BASE_URL}${endpoint}/${userId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }
  },

  exportToCSV(users: User[]): void {
    if (users.length === 0) {
      alert('Não há dados para exportar')
      return
    }

    const headers = ['Nome', 'Sobrenome', 'Email', 'Endereço', 'Data de Nascimento', 'Data de Abertura', 'Valor da Carteira', 'Endereço da Carteira']
    
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        `"${user.nome}"`,
        `"${user.sobrenome}"`,
        `"${user.email}"`,
        `"${user.endereco}"`,
        `"${user.data_nascimento}"`,
        `"${user.data_abertura}"`,
        user.valor_carteira,
        `"${user.endereco_carteira}"`
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `usuarios_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}