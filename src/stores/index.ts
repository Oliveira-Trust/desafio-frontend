import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types/user.type';
import type { PaginationData } from '@/types/pagination.type';
import type { FilterData } from '@/types/filter.type';
import { getPaginatedUsersRequest, getUsersRequest, deleteUserRequest, updateUserRequest, createUserRequest } from '@/services/user.service';
import { pullCryptoCurrencyPriceRequest } from '@/services/currency.service';

export const useAppStore = defineStore('app', () => {
  const users = ref<User[]>([])
  const filter = ref<FilterData>({nome: '', sobrenome: '', email: ''})
  const paginationData = ref<PaginationData>({totalItems: 0, currentPage: 1, pages: 0})
  const currency = ref('BRL')
  const cryptoCurrency = ref('BTC')
  const cryptoCurrencyValue = ref(0)

  async function pullPaginatedUsers({ currentPage = 1, pageLimit = 10 }: { currentPage?: number, pageLimit?: number}) {
    let queryString = '';
    queryString += '?_page=' + currentPage;
    queryString += '&_limit=' + pageLimit;

    queryString += `&${Object.keys(filter.value)[0]}_like=${
      filter.value?.nome
    }`;
    queryString += `&${Object.keys(filter.value)[1]}_like=${
      filter.value?.sobrenome
    }`;
    queryString += `&${Object.keys(filter.value)[2]}_like=${
      filter.value?.email
    }`;

    const usersResponse = await getPaginatedUsersRequest(queryString);
    users.value = usersResponse.data

    paginationData.value = {
      currentPage,
      totalItems: usersResponse.items,
      pages: Math.ceil(usersResponse.items / pageLimit),
    };
  }

  async function getAllUsers() {
    const response = await getUsersRequest();

    return response;
  }

  async function createUser(user: Omit<User, 'id'>) {
    await createUserRequest(user);
    pullPaginatedUsers({ currentPage: paginationData.value.currentPage });
  }

  async function updateUser(id: number, user: Omit<User, 'id'> & { id?: number }) {
    await updateUserRequest(id, user);
    pullPaginatedUsers({ currentPage: paginationData.value.currentPage });
  }

  async function deleteUser(id: number) {
    await deleteUserRequest(id);
    pullPaginatedUsers({ currentPage: paginationData.value.currentPage });
  }

  function setFilter(filterData: FilterData) {
    filter.value = filterData;
  }

  async function pullCryptoCurrencyPrice() {
    const coin = await pullCryptoCurrencyPriceRequest(cryptoCurrency.value, currency.value);
    cryptoCurrencyValue.value = coin[`${cryptoCurrency.value}${currency.value}`].bid;
  }

  return { users, filter, setFilter, paginationData, pullPaginatedUsers, getAllUsers, deleteUser, updateUser, createUser, cryptoCurrencyValue, pullCryptoCurrencyPrice }
})
