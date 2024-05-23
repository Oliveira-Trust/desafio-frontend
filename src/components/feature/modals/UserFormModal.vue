<script setup lang="ts">
import CommonModal from '../../common/CommonModal.vue'
import TextInput from '../../common/TextInput.vue'
import CommonButton from '../../common/CommonButton.vue'
import TextButton from '../../common/TextButton.vue'
import { getCryptoValueByCurrencyValue } from '@/utils/currency.utils'
import { computed, ref, watch } from 'vue'
import type { User } from '@/types/user.type'
import { useAppStore } from '@/stores'

const store = useAppStore()

const emit = defineEmits(['close'])

const props = defineProps<{
  title?: string
  isOpen?: boolean
  user?: User
}>()

const user = ref<Omit<User, 'id'> & { id?: number }>(
  props.user ?? { nome: '', sobrenome: '', email: '', valor_carteira: 0 }
)

const userCurrencyToAsk = ref('')
const cryptoCurrencyAmoutToBuy = ref(0)
const userTotalCryptoCurrency = ref<string | number>(0)

const cryptoCurrencyValue = computed(() => {
  return store.cryptoCurrencyValue
})

const isEditing = computed(() => {
  return !!user.value?.id
})

const isAmountValid = computed(() => {
  return cryptoCurrencyAmoutToBuy.value || cryptoCurrencyAmoutToBuy.value === 0
})

const isEmailValid = computed(() => {
  return (
    user.value?.email &&
    user.value?.email.includes('@') &&
    user.value?.email.includes('.') &&
    user.value?.email.slice(-1) !== '.'
  )
})

const isFormValid = computed(() => {
  return (
    isAmountValid.value &&
    user.value?.nome &&
    user.value?.sobrenome &&
    user.value?.email &&
    isEmailValid.value
  )
})

const close = async () => {
  emit('close')
  userCurrencyToAsk.value = ''
  cryptoCurrencyAmoutToBuy.value = 0
  await store.pullCryptoCurrencyPrice()
  userTotalCryptoCurrency.value = user.value?.valor_carteira ?? 0
}

const save = async () => {
  if (isEditing.value && user.value.id) {
    await store.updateUser(user.value.id, {
      ...user.value,
      valor_carteira: parseFloat(userTotalCryptoCurrency.value as string)
    })
    close()
    return
  }
  user.value.valor_carteira = cryptoCurrencyAmoutToBuy.value
  await store.createUser(user.value)
  close()
}

watch(
  () => props.isOpen,
  async () => {
    userCurrencyToAsk.value = ''
    cryptoCurrencyAmoutToBuy.value = 0
    await store.pullCryptoCurrencyPrice()
    userTotalCryptoCurrency.value = user.value?.valor_carteira ?? 0
  }
)

watch(
  () => userCurrencyToAsk.value,
  (val) => {
    const cryptoValue = getCryptoValueByCurrencyValue(val, cryptoCurrencyValue.value.toString())
    cryptoCurrencyAmoutToBuy.value = cryptoValue
    userTotalCryptoCurrency.value = ((user.value?.valor_carteira ?? 0) + cryptoValue).toFixed(8)
  }
)

watch(
  () => props.user?.id,
  () => {
    user.value = { ...props.user } as User
    userTotalCryptoCurrency.value = user.value.valor_carteira ?? 0
  }
)
</script>

<template>
  <div class="user-modal">
    <CommonModal
      with-expiration
      :title="isEditing ? 'Editar Carteira' : 'Adicionar Carteira'"
      v-if="isOpen"
      @close="close"
    >
      <template v-slot:body>
        <TextInput placeholder="Nome" v-model="user.nome" />
        <TextInput placeholder="Sobrenome" v-model="user.sobrenome" />
        <TextInput placeholder="E-mail" v-model="user.email" />
        <div class="buy-in">
          <TextInput
            isCurrency
            class="buy-in-input"
            placeholder="Valor de compra"
            v-model="userCurrencyToAsk"
            :error="!isAmountValid"
          />
          <h3 v-if="isAmountValid" class="buy-in-btc-value">BTC {{ cryptoCurrencyAmoutToBuy }}</h3>
          <p v-else class="buy-in-invalid">Valor inválido</p>
        </div>
        <div v-if="isEditing" class="wallet-value">
          <b>Valor da Carteira</b>
          <h3 v-if="isAmountValid" class="btc-full-value">BTC {{ userTotalCryptoCurrency }}</h3>
          <div v-else class="btc-full-value-loading"></div>
        </div>
        <div class="user-modal-actions">
          <TextButton class="user-modal-actions-close" @onClick="close" label="Cancelar" />
          <CommonButton
            class="user-modal-actions-submit"
            :disabled="!isFormValid"
            @onClick="save"
            label="Salvar"
          />
        </div>
      </template>
    </CommonModal>
  </div>
</template>
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
  color: #e53935;
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
