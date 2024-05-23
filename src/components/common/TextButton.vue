<script setup lang="ts">
interface Props {
  label: string
}

const emit = defineEmits(['onClick'])
withDefaults(defineProps<Props>(), {
  label: 'Cancelar'
})

const onClick = () => {
  emit('onClick')
}
</script>
<template>
  <b class="cursor-pointer text-blue-400 hover:text-blue-500" @click="onClick">{{ label }}</b>
</template>
<style scoped></style>
