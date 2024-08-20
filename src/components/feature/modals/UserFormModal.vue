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
  return (
    (parseFloat(userCurrencyToAsk.value) || 0) >= 0 &&
    (cryptoCurrencyAmoutToBuy.value || cryptoCurrencyAmoutToBuy.value >= 0)
  )
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
    const cryptoValue = getCryptoValueByCurrencyValue(
      val || '0',
      cryptoCurrencyValue.value.toString()
    )
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
        <TextInput class="form-modal-input" placeholder="Nome" v-model="user.nome" />
        <TextInput class="form-modal-input" placeholder="Sobrenome" v-model="user.sobrenome" />
        <TextInput class="form-modal-input" placeholder="E-mail" v-model="user.email" />
        <div class="flex justify-between items-center">
          <TextInput
            isCurrency
            class="form-modal-input w-1/2"
            placeholder="Valor de compra"
            v-model="userCurrencyToAsk"
            :error="!isAmountValid"
          />
          <h3 v-if="isAmountValid" class="ml-2.5 w-1/2">BTC {{ cryptoCurrencyAmoutToBuy }}</h3>
          <p v-else class="text-red-500 ml-2.5 w-1/2">Valor inválido</p>
        </div>
        <div v-if="isEditing" class="mt-5 w-full">
          <b class="text-gray-600">Valor da Carteira</b>
          <h3 v-if="isAmountValid" class="mt-1.5">BTC {{ userTotalCryptoCurrency }}</h3>
          <div v-else class="h-8 w-1/2 bg-gray-300 rounded-md animated-loading"></div>
        </div>
        <div class="flex justify-end items-center flex-wrap mt-5 mb-8 mx-0">
          <TextButton class="mt-2.5" @onClick="close" label="Cancelar" />
          <CommonButton
            class="save-btn mt-2.5 ml-8"
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
.animated-loading {
  background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
