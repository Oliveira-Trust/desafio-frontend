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
      <div class="wallet-value">
        <TextInput class="wallet-value-input" placeholder="Valor de compra"/>
        <h3 class="wallet-value-btc-value" >BTC {{ isEditing ? user.valor_carteira : '0.00000' }}</h3>
      </div>
      <div class="user-modal-actions">
        <TextButton class="user-modal-actions-close" @onClick="close" label="Cancelar"/>
        <Button class="user-modal-actions-submit" label="Adicionar"/>
      </div>
    </template>
    </Modal>
  </div>
</template>

<script>
import Modal from '../../reusable/Modal.vue'
import TextInput from '../../reusable/TextInput.vue'
import Button from '../../reusable/Button.vue'
import TextButton from '../../reusable/TextButton.vue'

export default {
  name: 'UserFormModal',
  components: {
    Modal,
    TextInput,
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
  },
  computed: {
    isEditing () {
      return !!this.user.id;
    }
  }
}
</script>

<style scoped>
.wallet-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wallet-value-input {
  width: 50%;
}

.wallet-value-btc-value {
  margin-left: 10px;
  width: 50%;
}

.user-modal-actions {
  margin: 40px 0 30px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
}

.user-modal-actions-close {
  margin-top: 10px;
}

.user-modal-actions-submit {
  margin-top: 10px;
  margin-left: 30px;
}
</style>
