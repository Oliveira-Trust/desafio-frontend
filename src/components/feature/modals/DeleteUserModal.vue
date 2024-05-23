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
  await store.removeUser(props.user.id)
  close()
}
</script>

<template>
  <div class="delete-user-modal">
    <Modal v-show="isOpen" @close="close">
      <template v-slot:body>
        <div class="delete-user-modal-body">
          <div class="delete-user-modal-icon-circle">
            <font-awesome-icon
              class="delete-user-modal-icon"
              :icon="['fas', 'trash']"
              style="color: red; font-size: 2em"
            />
          </div>
          <h2>Excluir Carteira</h2>
          <p>Tem certeza que deseja excluir essa Carteira?</p>
          <p>Essa ação não poderá ser desfeita.</p>
          <div class="delete-user-modal-actions">
            <Button
              class="delete-user-modal-actions-submit"
              :danger="true"
              @onClick="deleteUser"
              label="Excluir"
            />
            <TextButton class="delete-user-modal-actions-close" @onClick="close" label="Cancelar" />
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>
<style scoped>
.delete-user-modal-body {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.delete-user-modal-icon-circle {
  border: 2px solid #dc3545;
  border-radius: 50%;
  margin-bottom: 30px;
}

.delete-user-modal-icon {
  padding: 14px 16px 7px 16px;
  fill: #dc3545;
}

.delete-user-modal-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.delete-user-modal-actions-close {
  margin: 10px;
}

.delete-user-modal-actions-submit {
  width: 90%;
  margin: 10px;
}

.delete-user-modal-body > h2 {
  margin-bottom: 4px;
}

.delete-user-modal-body > p {
  margin: 2px;
}
</style>
