<template>
  <b class="text-button" @click="onClick">{{ label }}</b>
</template>

<script>

export default {
  name: 'TextButton',
  props: {
    label: {
      type: String,
      default: 'Cancelar',
    },
  },
  methods: {
    onClick () {
      this.$emit('onClick');
    }
  }
}
</script>

<style scoped>
.text-button {
  cursor: pointer;
  color: #2979FF;
}

.text-button:hover {
  color: #5393FF;
}
</style>
