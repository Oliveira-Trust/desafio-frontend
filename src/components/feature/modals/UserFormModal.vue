<template>
  <div class="user-modal">
    <Modal
      with-expiration
      :title="isEditing ? 'Editar Carteira' : 'Adicionar Carteira'"
      v-if="isOpen"
      @close="close"
    >
    <template v-slot:body>
      <TextInput placeholder="Nome" v-model="user.nome"/>
      <TextInput placeholder="Sobrenome" v-model="user.sobrenome"/>
      <TextInput placeholder="E-mail" v-model="user.email"/>
      <div class="buy-in">
        <TextInput
          isCurrency
          class="buy-in-input"
          placeholder="Valor de compra"
          v-model="userCurrencyToAsk"
          :error="!isAmountValid"
        />
        <h3 v-if="isAmountValid" class="buy-in-btc-value" >BTC {{ cryptoCurrencyAmoutToBuy }}</h3>
        <p v-else class="buy-in-invalid">Valor inválido</p>
      </div>
      <div v-if="isEditing" class="wallet-value">
        <b>Valor da Carteira</b>
        <h3 v-if="isAmountValid" class="btc-full-value" >BTC {{ userTotalCryptoCurrency }}</h3>
        <div v-else class="btc-full-value-loading"></div>
      </div>
      <div class="user-modal-actions">
        <TextButton class="user-modal-actions-close" @onClick="close" label="Cancelar"/>
        <Button
          class="user-modal-actions-submit"
          :disabled="!isFormValid"
          @onClick="save"
          label="Salvar"
        />
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
      userCurrencyToAsk: '',
      cryptoCurrencyAmoutToBuy: 0,
      userTotalCryptoCurrency: 0,
    }
  },
  methods: {
    close () {
      this.userCurrencyToAsk = '';
      this.cryptoCurrencyAmoutToBuy = 0;
      this.userTotalCryptoCurrency = 0;
      this.$emit('close');
    },
    async save () {
      if (this.isEditing) {
        this.user.valor_carteira = parseFloat(this.userTotalCryptoCurrency);
        await this.$store.dispatch('updateUser', this.user);
        this.close();
        return;
      }
      this.user.valor_carteira = this.cryptoCurrencyAmoutToBuy;
      await this.$store.dispatch('createUser', this.user);
      this.close();
    }
  },
  watch: {
    async isOpen () {
      this.userCurrencyToAsk = '';
      this.cryptoCurrencyAmoutToBuy = 0;
      await this.$store.dispatch('pullCryptoCurrencyPrice');
      this.userTotalCryptoCurrency = this.user.valor_carteira;
    },
    userCurrencyToAsk (val) {
      const cryptoValue = getCryptoValueByCurrencyValue(val, this.cryptoCurrencyValue);
      this.cryptoCurrencyAmoutToBuy = cryptoValue;
      this.userTotalCryptoCurrency = (this.user.valor_carteira + cryptoValue).toFixed(8);
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
      return this.cryptoCurrencyAmoutToBuy || this.cryptoCurrencyAmoutToBuy === 0;
    },
    isEmailValid () {
      return this.user.email
        && this.user.email.includes('@')
        && this.user.email.includes('.')
        && this.user.email.slice(-1) !== '.';
    },
    isFormValid () {
      return this.isAmountValid
        && this.user.nome
        && this.user.sobrenome
        && this.isEmailValid;
    }
  }
}
</script>

<style scoped>
.buy-in {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buy-in-input {
  width: 50%;
}

.buy-in-btc-value {
  margin-left: 10px;
  width: 50%;
}

.wallet-value {
  margin-top: 20px;
  width: 100%;
}

.wallet-value > b {
  color: #777;
}

.btc-full-value {
  margin-top: 5px;
}

.buy-in-invalid {
  color: #E53935;
  margin-left: 10px;
  width: 50%;
}

.user-modal-actions {
  margin: 20px 0 30px 0;
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

.btc-full-value-loading {
  height: 30px;
  width: 50%;
  background: #eee;
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
