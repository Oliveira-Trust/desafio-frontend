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
  border-radius: 10px;
  box-shadow: 1px 1px 1px 2px #DDDDDD;
  padding: 20px;
  min-width: 580px;
}
</style>
