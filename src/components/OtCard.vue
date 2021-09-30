<template>
  <section class="container">
    <h1>{{ title }}</h1>

    <slot />
  </section>
</template>

<script>
export default {
  name: "OtCard",

  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped>
section {
  padding: 25px;
  background-color: white;
  border-radius: 5px;
}

h1 {
  font-size: 1.25rem;
  font-weight: normal;
}
</style>
