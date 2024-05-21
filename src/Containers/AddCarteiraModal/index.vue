<template>
  <div class="modal" v-if="visible">
    <div class="modal-content">
      <button class="close" @click="closeModal">
        <i class="pi pi-times"></i>
      </button>
      <Title :level="'h2'" :text="'Adicionar carteira'" />
      <form @submit.prevent="submitAdd" class="form-edit">
        <div class="row">
          <Input v-model="newUser.nome" :type="'text'" :placeholder="'Nome'" id="nome" required />
        </div>
        <div class="row">
          <Input v-model="newUser.sobrenome" :type="'text'" :placeholder="'Sobrenome'" id="sobrenome" required />
        </div>
        <div class="row">
          <Input v-model="newUser.email" :type="'email'" :placeholder="'E-mail'" id="email" required />
        </div>
        <div class="row">
          <select v-model="selectedCurrency" @change="fetchExchangeRate">
            <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
          </select>
          <Input v-model.number="currencyValue" :type="'number'" step="0.01" :placeholder="'Valor'" id="currencyValue" required />
          <span>BTC {{ btcValue }}</span>
        </div>
        <Button :color="'primary'" type="submit">Adicionar</Button>
        <Button :color="'outlined'" type="button" @click="closeModal">Cancelar</Button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import Title from '../../components/Title/index.vue'
import Input from '../../components/Input/index.vue'
import Button from '../../components/Button/index.vue'

export default {
  name: 'AddCarteiraModal',
  components: {
    Title,
    Input,
    Button
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newUser: {
        nome: '',
        sobrenome: '',
        email: '',
        valor_carteira: 0
      },
      selectedCurrency: 'USD',
      exchangeRate: 0,
      currencies: ['USD', 'EUR', 'BRL'],
      currencyValue: 0,
      btcValue: 0
    }
  },
  computed: {
    ...mapGetters('users', ['allUsers'])
  },
  methods: {
    ...mapActions('users', ['fetchUsers', 'createUser']),
    closeModal() {
      this.$emit('close')
    },
    async submitAdd() {
      try {
        await this.convertToBTC()
        await this.createUser({ ...this.newUser, valor_carteira: this.btcValue, id: String(this.allUsers.length + 1) })
        this.newUser = {
          nome: '',
          sobrenome: '',
          email: '',
          valor_carteira: 0
        }
        this.fetchUsers()
        this.closeModal()
      } catch (error) {
        console.error('Erro ao adicionar usuário:', error)
      }
    },
    async fetchExchangeRate() {
      try {
        const response = await axios.get(`https://economia.awesomeapi.com.br/last/BTC-${this.selectedCurrency}`)
        const rate = response.data[`BTC${this.selectedCurrency}`].bid
        this.exchangeRate = parseFloat(rate)
        await this.convertToBTC()
      } catch (error) {
        console.error('Erro ao buscar taxa de câmbio:', error)
      }
    },
    async convertToBTC() {
      if (this.exchangeRate && this.currencyValue) {
        this.btcValue = parseFloat((this.currencyValue / this.exchangeRate).toFixed(8))
      }
    }
  },
  watch: {
    currencyValue(newValue) {
      this.fetchExchangeRate(newValue)
    }
  },
}
</script>

<style scoped>
@import '../EditCarteiraModal/styles.css'
</style>
