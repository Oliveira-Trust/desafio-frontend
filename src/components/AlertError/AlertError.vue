<template>
  <div class="alert alert-danger" v-if="errors.length" role="alert">
    <div v-for="(error, index) in errors" v-bind:key="index">{{ error }}</div>
  </div>
</template>

<script>
  export default {
    props: ['errors']
  }
</script>
