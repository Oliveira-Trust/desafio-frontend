<template>
  <h1>{{ titulo }}</h1>
</template>

<script>
export default {
  name: 'Titulo',
  props: {
    titulo: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
