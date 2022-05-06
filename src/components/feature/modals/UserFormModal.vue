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
        <TextInput
          isCurrency
          class="wallet-value-input"
          placeholder="Valor de compra"
          v-model="userCurrency"
          :readOnly="isEditing"
          :error="!isAmountValid"
        />
        <h3 v-if="isAmountValid" class="wallet-value-btc-value" >BTC {{ userCryptoCurrency }}</h3>
        <p v-else class="wallet-value-invalid">Valor inválido</p>
      </div>
      <div class="user-modal-actions">
        <TextButton class="user-modal-actions-close" @onClick="close" label="Cancelar"/>
        <Button class="user-modal-actions-submit" :disabled="!isEditing && !isFormValid" @onClick="save" label="Salvar"/>
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
import {
  getCurrencyValueByCryptoValue,
  getCryptoValueByCurrencyValue
} from '../../../helpers/currency.utils'

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
  data () {
    return {
      userCurrency: 0,
      userCryptoCurrency: ''
    }
  },
  methods: {
    close () {
      this.$emit('close');
    },
    save () {
      // check validation before saving
      console.log(this.user, this.userCryptoCurrency);
    }
  },
  watch: {
    async isOpen () {
      await this.$store.dispatch('pullCryptoCurrencyPrice');
      const currencyValue = getCurrencyValueByCryptoValue(this.user.valor_carteira, this.cryptoCurrencyValue);
      this.userCurrency = this.user.valor_carteira ? currencyValue : 0;
      this.userCryptoCurrency = this.isEditing ? this.user.valor_carteira : '0.00000000';
    },
    userCurrency (val) {
      if (this.isEditing) return;
      const cryptoValue = getCryptoValueByCurrencyValue(val, this.cryptoCurrencyValue);
      this.userCryptoCurrency = cryptoValue;
    }
  },
  computed: {
    cryptoCurrencyValue () {
      return this.$store.getters.getCryptoCurrencyValue;
    },
    isEditing () {
      return !!this.user.id;
    },
    isAmountValid () {
      return this.userCryptoCurrency || this.userCryptoCurrency === 0;
    },
    isFormValid () {
      return parseFloat(this.userCurrency)
        && this.user.nome
        && this.user.sobrenome
        && this.user.email;
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

.wallet-value-invalid {
  color: #E53935;
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
