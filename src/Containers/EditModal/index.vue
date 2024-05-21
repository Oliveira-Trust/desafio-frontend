<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <Title :level="'h2'" :text="'Editar carteira'" />
      <form @submit.prevent="submitEdit" class="form-edit">
        <div class="row">
          <Input v-model="userCopy.nome" :type="'text'" :placeholder="'Nome'" id="nome" required />
        </div>
        <div class="row">
          <Input v-model="userCopy.sobrenome" :type="'text'" :placeholder="'Sobrenome'" id="sobrenome" required />
        </div>
        <div class="row">
          <Input v-model="userCopy.email" :type="'email'" :placeholder="'E-mail'" id="email" required />
        </div>
        <div class="row">
          <select v-model="selectedCurrency" @change="fetchExchangeRate">
            <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
          </select>
          <Input v-model.number="currencyValue" :type="'number'" step="0.01" :placeholder="'Valor'" id="currencyValue" required @input="convertToBTC" />
          <span>BTC {{ userCopy.valor_carteira }}</span>
        </div>
        <Button :color="'primary'" type="submit">Salvar</Button>
        <Button :color="'outlined'" @click="closeModal">Cancelar</Button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Title from '../../components/Title/index.vue'
import Input from '../../components/Input/index.vue'
import Button from '../../components/Button/index.vue'

export default {
  name: 'EditModal',
  components: {
    Title,
    Input,
    Button
  },
  props: {
    user: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      userCopy: { ...this.user },
      selectedCurrency: 'USD',
      exchangeRate: 0,
      currencies: ['USD', 'EUR', 'BRL'],
      currencyValue: 0
    }
  },
  watch: {
    user(newUser) {
      this.userCopy = { ...newUser }
      this.convertToCurrency()
    },
    selectedCurrency() {
      this.fetchExchangeRate()
    }
  },
  methods: {
    closeModal() {
      this.$emit('close')
    },
    submitEdit() {
      this.$emit('save', { ...this.userCopy })
    },
    async fetchExchangeRate() {
      try {
        const response = await axios.get(`https://economia.awesomeapi.com.br/last/BTC-${this.selectedCurrency}`)
        const rate = response.data[`BTC${this.selectedCurrency}`].bid
        this.exchangeRate = parseFloat(rate)
        this.convertToCurrency()
      } catch (error) {
        console.error('Erro ao buscar taxa de câmbio:', error)
      }
    },
    convertToCurrency() {
      if (this.exchangeRate && this.userCopy.valor_carteira) {
        this.currencyValue = (this.userCopy.valor_carteira * this.exchangeRate).toFixed(2)
      } else {
        this.currencyValue = 0
      }
    },
    convertToBTC() {
      if (this.exchangeRate && this.currencyValue) {
        this.userCopy.valor_carteira = parseFloat((this.currencyValue / this.exchangeRate).toFixed(8))
      }
    }
  },
  created() {
    this.fetchExchangeRate()
  }
}
</script>

<style scoped>
@import './styles.css'
</style>
