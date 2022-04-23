<template>
  <div class="delete-user-modal">
    <Modal
      v-show="isOpen"
      @close="close"
    >
    <template v-slot:body>
      <div class="delete-user-modal-body">
        <div class="delete-user-modal-icon-circle">
          <v-icon class="delete-user-modal-icon" name="trash" scale="3"/>
        </div>
        <h2>Excluir Carteira</h2>
        <p>Tem certeza que deseja excluir essa Carteira?</p>
        <p>Essa ação não poderá ser desfeita.</p>
        <div class="delete-user-modal-actions">
          <Button class="delete-user-modal-actions-submit" :danger="true" label="Excluir"/>
          <TextButton class="delete-user-modal-actions-close" @onClick="close" label="Cancelar"/>
        </div>
      </div>
    </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../../reusable/Modal.vue'
import Button from '../../reusable/Button.vue'
import TextButton from '../../reusable/TextButton.vue'

export default {
  name: 'DeleteUserModal',
  components: {
    Modal,
    Button,
    TextButton,
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default: () => {},
    }
  },
  methods: {
    close () {
      this.$emit('close');
    },
  }
}
</script>

<style scoped>
.delete-user-modal-body {
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.delete-user-modal-icon-circle {
  border: 2px solid #DC3545;
  border-radius: 50%;
  margin-bottom: 30px;
}

.delete-user-modal-icon {
  padding: 14px 16px 7px 16px;
  fill: #DC3545;
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

</style>
