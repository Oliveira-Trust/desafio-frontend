<script setup lang="ts">
import Modal from '../../common/CommonModal.vue'
import Button from '../../common/CommonButton.vue'
import TextButton from '../../common/TextButton.vue'
import { useAppStore } from '@/stores'
import type { User } from '@/types/user.type'

interface Props {
  user: User
  isOpen?: boolean
  title?: string
}

const store = useAppStore()

const emit = defineEmits(['close'])
const props = defineProps<Props>()

const close = () => {
  emit('close')
}

const deleteUser = async () => {
  await store.deleteUser(props.user.id)
  close()
}
</script>

<template>
  <div class="delete-user-modal">
    <Modal v-show="isOpen" @close="close">
      <template v-slot:body>
        <div class="py-10 flex flex-col justify-center items-center text-center">
          <div class="border-4 border-red-500 rounded-full mb-6">
            <font-awesome-icon
              class="pl-4 pr-4 py-3 fill-red-500"
              :icon="['fas', 'trash']"
              style="color: red; font-size: 2em"
            />
          </div>
          <h2 class="mb-1">Excluir Carteira</h2>
          <p class="m-0.5">Tem certeza que deseja excluir essa Carteira?</p>
          <p>Essa ação não poderá ser desfeita.</p>
          <div class="mt-5 flex flex-col justify-center items-center w-full">
            <Button
              class="confirm-button w-11/12 m-2.5"
              :danger="true"
              @onClick="deleteUser"
              label="Excluir"
            />
            <TextButton class="close-button m-2.5" @onClick="close" label="Cancelar" />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
