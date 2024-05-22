<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  name: string
  tooltipText?: string
}

const emit = defineEmits(['onClick'])

withDefaults(defineProps<Props>(), {
  name: 'pencil-alt'
})

const onClick = () => {
  emit('onClick')
}
</script>

<template>
  <div
    class="icon-button relative h-6 w-6 flex justify-center items-center py-1 px-0.5 rounded-full cursor-pointer hover:bg-gray-200"
    @click="onClick"
  >
    <font-awesome-icon :icon="['fas', name]" />
    <span v-if="tooltipText" class="tooltip-text">{{ tooltipText }}</span>
  </div>
</template>

<style scoped>
.icon-button .tooltip-text {
  @apply text-[14px] invisible min-w-[60px] bg-[#424242] text-[#fff] text-center px-[0] py-[7px] rounded-[6px] absolute top-[120%] left-2/4 -ml-[30px] opacity-0 [transition:opacity_0.2s] after:content-['_'] after:absolute after:bottom-full after:left-2/4 after:-ml-[5px] after:border-[5px] after:border-solid;
}

.icon-button:hover .tooltip-text {
  @apply visible opacity-100;
}
</style>
