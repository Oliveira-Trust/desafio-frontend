<template>
  <component :is="tag">{{ text }}</component>
</template>

<script>
export default {
  name: 'Titulo',
  props: {
    text: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      default: 'h1',
      validator: (value) => ['h1', 'h2', 'h3'].includes(value),
    },
  },
  computed: {
    tag() {
      return this.level
    },
  },
}
</script>

<style scoped>
@import './style.css'
</style>
