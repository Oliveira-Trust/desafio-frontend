<template>
  <div class="container-loading">
    <div class="loading" />
  </div>
</template>
<script>
export default {
  name: "Loading",
};
</script>
<style scoped>
.container-loading {
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  left: 0;
  max-width: 100%;
  place-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
}
.loading {
  animation: rotate 1s ease-out infinite;
  border-radius: 50%;
  border: 3px solid #fff;
  border-left-color: transparent;
  height: 80px;
  width: 80px;
  position: relative;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
