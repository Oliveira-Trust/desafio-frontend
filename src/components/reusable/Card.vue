<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
}
</script>

<style scoped>
.card {
  background-color: #FFFFFF;
  border-radius: 4px;
  box-shadow: #0000003d 0px 3px 8px;
  padding: 20px;
}
</style>
