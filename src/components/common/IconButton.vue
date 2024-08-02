<script setup lang="ts">
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
    class="icon-button relative h-6 w-6 flex justify-center items-center py-1 px-0.5 rounded-full cursor-pointer hover:bg-gray-400"
    @click="onClick"
  >
    <font-awesome-icon :icon="['fas', name]" />
    <span v-if="tooltipText" class="tooltip-text z-10">{{ tooltipText }}</span>
  </div>
</template>

<style scoped>
.icon-button .tooltip-text {
  @apply text-sm invisible min-w-16 bg-neutral-800 text-white text-center py-2 rounded absolute top-[120%] left-2/4 -ml-7 opacity-0 [transition:opacity_0.2s];
}

.icon-button:hover .tooltip-text {
  @apply visible opacity-100;
}
</style>
