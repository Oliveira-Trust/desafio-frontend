<template>
  <button :class="color" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'outlined'].includes(value),
      required: true,
    },
    icon: {
      type: Boolean,
      default: false,
    }
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
