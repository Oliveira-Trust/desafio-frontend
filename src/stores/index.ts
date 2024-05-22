import { ref } from 'vue'
import { defineStore } from 'pinia'
import { makeRequest } from '@/utils/request.utils';

export const useAppStore = defineStore('app', () => {
  const users = ref({})

  async function pullUsers() {
    const response = await makeRequest(import.meta.env.VITE_USERS_API_ENDPOINT);

    users.value = await response.json();
  }

  return { users, pullUsers }
})
