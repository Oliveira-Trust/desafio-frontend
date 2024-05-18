<template>
  <button :class="type">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
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
