<script setup lang="ts">
import NavBar from '@/components/feature/NavBar.vue'
import Button from '@/components/common/CommonButton.vue'
import UsersTable from '@/components/feature/UsersTable.vue'
import CommonCard from '@/components/common/CommonCard.vue'

const showUserModal = () => {
  console.log('showUserModal')
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
        <div class="py-5">
          <CommonCard>
            <UsersTable @editUserClick="() => {}" @deleteUserClick="() => {}" />
          </CommonCard>
        </div>
        <div class="my-10 flex justify-center text-xs text-gray-400">
          <b>Fintools | Desafio Front-End</b>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 790px) {
  .app-container-body {
    width: 90vw;
  }
}
</style>
