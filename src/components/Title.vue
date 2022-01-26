<template>
  <component :is="level" class="title">
    <slot />
  </component>
</template>

<script>
export default {
  name: "App-Title",
  props: {
    level: {
      type: String,
      default: "h1",
      validator: (value) => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/);
      },
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 1.8rem;
  font-weight: var(--weight-mega-bold);
}
</style>