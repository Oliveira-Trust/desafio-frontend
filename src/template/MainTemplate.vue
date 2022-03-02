<template>
  <div>
    <slot />
  </div>
</template>
<script>
export default {
  name: "MainTemplate",
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background: #f5f6f8;
  color: #000000;
  font-family: "Roboto", sans-serif;
}
</style>
