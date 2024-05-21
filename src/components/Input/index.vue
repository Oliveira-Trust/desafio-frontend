<template>
  <input :type="type" :placeholder="placeholder" :value="value" @input="onChange" />
</template>

<script>
export default {
  name: 'Input',
  props: {
    type: {
      type: String,
      default: 'text',
      validate: (value) => ['text', 'email', 'number'].includes(value),
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      required: true
    },
  },
  methods: {
    onChange(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style scoped>
@import './styles.css';
</style>
