<template>
  <div class="table-wrapper">
    {{ users }}
  </div>
</template>

<script>

export default {
  name: 'Table',
  props: {
    users: Array
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
