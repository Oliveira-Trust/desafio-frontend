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
  box-shadow: 2px 2px #AAAAAA;
  padding: 20px;
}
</style>
