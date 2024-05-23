<script setup lang="ts">
import { computed, onMounted } from 'vue'
import IconButton from '../common/IconButton.vue'
import CommonButton from '../common/CommonButton.vue'
import { useAppStore } from '@/stores'
import type { User } from '@/types/user.type'
import { exportUsersToCSV } from '@/utils/export.utils'

const store = useAppStore()
const emit = defineEmits(['editUserClick', 'deleteUserClick'])

const users = computed(() => store.users)
const pagination = computed(() => store.paginationData)

onMounted(() => {
  store.pullPaginatedUsers({})
})

const handleEditClick = (user: User) => {
  emit('editUserClick', user)
}

const handleDeleteClick = (user: User) => {
  emit('deleteUserClick', user)
}

const handlePageClick = async (page: number) => {
  await store.pullPaginatedUsers({ currentPage: page })
}

const handleFirstPageClick = async () => {
  await store.pullPaginatedUsers({ currentPage: 1 })
}

const handleLastPageClick = async () => {
  await store.pullPaginatedUsers({ currentPage: pagination.value.pages })
}

const handlePreviousPageClick = async () => {
  if (pagination.value.currentPage === 1) return
  await store.pullPaginatedUsers({ currentPage: pagination.value.currentPage - 1 })
}

const handleNextPageClick = async () => {
  if (pagination.value.currentPage === pagination.value.pages) return
  await store.pullPaginatedUsers({ currentPage: pagination.value.currentPage + 1 })
}

const handleExportToCSV = async () => {
  const users = await store.getAllUsers()
  exportUsersToCSV(users)
}
</script>
<template>
  <div class="users-table">
    <div class="flex justify-between mb-5">
      <h2 class="mb-5">Carteiras</h2>
      <CommonButton outlined @onClick="handleExportToCSV" label="Exportar CSV" />
    </div>
    <table class="w-full">
      <tr>
        <th>Nome</th>
        <th class="user-surname-column">Sobrenome</th>
        <th class="user-email-column">Email</th>
        <th>Bitcoin</th>
        <th></th>
      </tr>
      <tr class="user-row" v-for="user in users" :key="user.id">
        <td>{{ user.nome }}</td>
        <td class="user-surname-column">{{ user.sobrenome }}</td>
        <td class="user-email-column">{{ user.email }}</td>
        <td>{{ user.valor_carteira }}</td>
        <td class="flex justify-end items-center">
          <div class="flex justify-center items-center">
            <IconButton
              class="m-1"
              name="pencil-alt"
              tooltipText="Editar"
              @onClick="handleEditClick(user)"
            />
            <IconButton
              class="m-1"
              name="trash-alt"
              tooltipText="Excluir"
              @onClick="handleDeleteClick(user)"
            />
          </div>
        </td>
      </tr>
    </table>
    <hr class="solid" />
    <div class="mt-2.5 flex justify-between">
      <p class="text-gray-500">{{ pagination.totalItems }} registro(s)</p>
      <div class="flex justify-center items-center">
        <IconButton name="chevron-left" @onClick="handlePreviousPageClick" />
        <div class="flex justify-center items-end text-gray-300" v-if="pagination.currentPage >= 4">
          <CommonButton small outlined label="1" @onClick="handleFirstPageClick" />
          ...
        </div>
        <div v-for="i in [2, 1]" :key="'previous-' + i">
          <CommonButton
            v-if="pagination.currentPage > i"
            small
            outlined
            :label="(pagination.currentPage - i).toString()"
            @onClick="handlePageClick(pagination.currentPage - i)"
          />
        </div>
        <CommonButton
          small
          :label="pagination.currentPage.toString()"
          @onClick="handlePageClick(pagination.currentPage)"
        />
        <div v-for="i in 2" :key="'next-' + i">
          <CommonButton
            v-if="pagination.currentPage + i <= pagination.pages"
            small
            outlined
            :label="(pagination.currentPage + i).toString()"
            @onClick="handlePageClick(pagination.currentPage + i)"
          />
        </div>
        <div
          class="flex justify-center items-end text-gray-300"
          v-if="pagination.currentPage <= pagination.pages - 3"
        >
          ...
          <CommonButton
            small
            outlined
            :label="pagination.pages.toString()"
            @onClick="handleLastPageClick"
          />
        </div>
        <IconButton name="chevron-right" @onClick="handleNextPageClick" />
      </div>
    </div>
  </div>
</template>
<style scoped>
td {
  @apply h-12 p-1.5 text-left align-bottom;
}

th {
  @apply text-left;
}

table tr:nth-child(odd) td {
  @apply bg-slate-100;
}

table tr:nth-child(odd):hover td {
  @apply bg-slate-200;
}

.user-row:hover {
  @apply bg-slate-200;
}

.user-row > td:first-child {
  @apply border-l-2 border-transparent;
}

.user-row:hover > td:first-child {
  @apply border-l-2 border-blue-500;
}

@media only screen and (max-width: 790px) {
  .user-surname-column {
    display: none;
  }
}

@media only screen and (max-width: 560px) {
  .user-email-column {
    display: none;
  }
}
</style>
