<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CommonCard from './CommonCard.vue'

const emit = defineEmits(['close'])

const expiration = ref(0)
const expirationLimit = ref(120)
const expirationInterval = ref(0)

const props = defineProps<{
  title?: string
  withExpiration?: boolean
}>()

onMounted(() => {
  if (!props.withExpiration) return
  expirationInterval.value = setInterval(
    () => (expiration.value < expirationLimit.value ? (expiration.value += 1) : close()),
    1000
  )
})

const close = () => {
  clearInterval(expirationInterval.value)
  expiration.value = 0
  emit('close')
}

const handleBackgroundClick = (e: any) => {
  if (!e.target.className.includes('modal-background')) return
  close()
}
</script>

<template>
  <div
    class="modal-background fixed left-[0] top-[0] w-screen h-screen flex justify-center items-center bg-[#000000dd]"
    @click="handleBackgroundClick"
  >
    <div class="modal-dialog w-[45%]">
      <CommonCard>
        <div v-if="title" class="pl-5 pr-5 py-8">
          <h3>{{ title }}</h3>
          <hr class="solid" />
        </div>
        <div class="px-10">
          <slot name="body"></slot>
        </div>
        <div
          v-if="withExpiration"
          class="progress-bar relative rounded h-2.5 w-full bg-gray-300 [transition:height_0.5s]"
        >
          <div
            class="progress-bar-filled relative rounded h-2.5 bg-blue-500 [transition:width_0.5s,_height_0.5s]"
            :style="`width: ${expiration / 1.2}%`"
          ></div>
          <span class="tooltip-text"
            >Essa transação expirará em {{ expirationLimit - expiration }} segundos</span
          >
        </div>
      </CommonCard>
    </div>
  </div>
</template>

<style scoped>
.progress-bar:hover {
  @apply h-5;
}

.progress-bar:hover .progress-bar-filled {
  @apply h-5;
}

.progress-bar .tooltip-text {
  @apply text-sm invisible min-w-16 bg-neutral-800 text-white text-center px-4 py-2 rounded absolute top-[120%] left-2/4 -ml-7 opacity-0 [transition:opacity_0.2s];
}

.progress-bar:hover .tooltip-text {
  @apply visible opacity-100;
}

@media only screen and (max-width: 820px) {
  .modal-dialog {
    @apply w-3/5;
  }
}

@media only screen and (max-width: 500px) {
  .modal-dialog {
    @apply w-4/5;
  }
}
</style>
