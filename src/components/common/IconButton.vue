<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const emit = defineEmits(['onClick'])

defineProps({
  name: {
    type: String,
    default: 'pencil-alt'
  },
  tooltipText: {
    type: String,
    default: undefined
  }
})

const onClick = () => {
  emit('onClick')
}
</script>

<template>
  <div class="icon-button" @click="onClick">
    <font-awesome-icon :icon="['fas', name]" />
    <span v-if="tooltipText" class="tooltip-text">{{ tooltipText }}</span>
  </div>
</template>

<style scoped>
.icon-button {
  position: relative;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 2px;
  border-radius: 50%;
  cursor: pointer;
}

.icon-button:hover {
  background-color: #dfdfdf;
}

.icon {
  fill: #656565;
}

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
