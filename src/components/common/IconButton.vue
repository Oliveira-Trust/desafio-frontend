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
  font-size: 14px;
  visibility: hidden;
  min-width: 60px;
  background-color: #424242;
  color: #fff;
  text-align: center;
  padding: 7px 0;
  border-radius: 6px;
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 50%;
  margin-left: -30px;
  opacity: 0;
  transition: opacity 0.2s;
}

.icon-button .tooltip-text::after {
  content: ' ';
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #424242 transparent;
}

.icon-button:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
