import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/user.type';
import type { PaginationData } from '@/types/pagination.type';
import type { FilterData } from '@/types/filter.type';
import { getPaginatedUsers, getUsers } from '@/services/user.service';

export const useAppStore = defineStore('app', () => {
  const users = ref<User[]>([])
  const filter = ref<FilterData | null>(null)
  const paginationData = ref<PaginationData>({totalItems: 0, currentPage: 1, pages: 0})

  async function pullPaginatedUsers({ currentPage = 1, pageLimit = 10 }: { currentPage?: number, pageLimit?: number}) {
    let queryString = '';
    queryString += '?_page=' + currentPage;
    queryString += '&_per_page=' + pageLimit;

    queryString += `&${Object.keys(filter)[0]}_like=${
      filter.value?.nome
    }`;
    queryString += `&${Object.keys(filter)[1]}_like=${
      filter.value?.sobrenome
    }`;
    queryString += `&${Object.keys(filter)[2]}_like=${
      filter.value?.email
    }`;

    const usersResponse = await getPaginatedUsers(queryString);
    users.value = usersResponse.data

    paginationData.value = {
      currentPage,
      totalItems: usersResponse.items,
      pages: Math.ceil(usersResponse.items / pageLimit),
    };
  }

  async function getAllUsers() {
    const response = await getUsers();

    return response;
  }

  return { users, paginationData, pullPaginatedUsers, getAllUsers }
})
