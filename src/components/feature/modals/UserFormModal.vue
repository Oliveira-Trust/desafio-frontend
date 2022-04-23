<template>
  <div class="user-modal">
    <Modal
      :title="isEditing ? 'Editar Carteira' : 'Adicionar Carteira'"
      v-show="isOpen"
      @close="close"
    >
    <template v-slot:body>
      <TextInput placeholder="Nome" v-model="user.nome"/>
      <TextInput placeholder="Sobrenome" v-model="user.sobrenome"/>
      <TextInput placeholder="E-mail" v-model="user.email"/>
      <div class="user-value">
        <TextInput class="user-value-input" placeholder="Valor de compra"/>
        <h3 class="user-value-btc-value" >BTC {{ isEditing ? user.valor_carteira : '0.00000' }}</h3>
      </div>
      <div class="walled-modal-actions">
        <b class="walled-modal-actions-close" @click="close">Cancelar</b>
        <Button class="walled-modal-actions-submit" label="Adicionar"/>
      </div>
    </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../../reusable/Modal.vue'
import TextInput from '../../reusable/TextInput.vue'
import Button from '../../reusable/Button.vue'

export default {
  name: 'UserFormModal',
  components: {
    Modal,
    TextInput,
    Button
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
  },
  computed: {
    isEditing () {
      return !!this.user.id;
    }
  }
}
</script>

<style scoped>
.user-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-value-input {
  width: 50%;
}

.user-value-btc-value {
  margin-left: 10px;
  width: 50%;
}

.walled-modal-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.walled-modal-actions-close {
  margin: 20px;
  cursor: pointer;
  color: #2979FF
}

.walled-modal-actions-submit {
  margin: 20px;
}

.walled-modal-actions-close:hover {
  color: #5393FF
}
</style>
