<script setup lang="ts">
import NavBar from '@/components/feature/NavBar.vue'
import Button from '@/components/common/CommonButton.vue'
import UsersTable from '@/components/feature/UsersTable.vue'
import CommonCard from '@/components/common/CommonCard.vue'
import FilterInput from './components/feature/FilterInput.vue'
import DeleteUserModal from './components/feature/modals/DeleteUserModal.vue'
import type { User } from './types/user.type'
import { ref } from 'vue'

const userToDelete = ref<User>({} as User)
const isDeleteUserModalOpen = ref(false)

const showUserModal = () => {
  console.log('showUserModal')
}

const showDeleteUserModal = () => {
  isDeleteUserModalOpen.value = true
}

const handleDeleteUser = (user: User) => {
  userToDelete.value = user
  showDeleteUserModal()
}

const closeDeleteUserModal = () => {
  isDeleteUserModalOpen.value = false
  userToDelete.value = {} as User
}
</script>

<template>
  <div id="app">
    <NavBar />
    <div class="flex justify-center">
      <div class="flex flex-col w-[80vw]">
        <div class="flex justify-between items-center mt-7">
          <h1 class="font-black py-7 w-full">BTC Carteiras</h1>
          <div class="flex justify-end items-center py-7 w-full">
            <Button label="Adicionar Carteira" @onClick="showUserModal" />
          </div>
          <div class="flex justify-center items-center py-7"></div>
        </div>
        <div class="flex flex-col py-5">
          <CommonCard class="mb-10">
            <FilterInput />
          </CommonCard>
          <CommonCard>
            <UsersTable @editUserClick="() => {}" @deleteUserClick="handleDeleteUser" />
          </CommonCard>
        </div>
        <div class="my-10 flex justify-center text-xs text-gray-400">
          <b>Fintools | Desafio Front-End</b>
        </div>
      </div>
    </div>
    <DeleteUserModal
      :user="userToDelete"
      :isOpen="isDeleteUserModalOpen"
      @close="closeDeleteUserModal"
    />
  </div>
</template>
<style scoped>
@media only screen and (max-width: 790px) {
  .app-container-body {
    width: 90vw;
  }
}
</style>
