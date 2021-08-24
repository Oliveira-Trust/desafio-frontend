<template>
  <div>
    <div class="banner"></div>
  </div>
</template>

<script>
export default {
  name: "Banner",
};
</script>

<style lang="scss" scoped>
.banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: calc(300px + 60px);
  background: var(--rufous);
  z-index: -1;
}
</style>
