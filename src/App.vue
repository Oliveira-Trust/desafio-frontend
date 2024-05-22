<script setup lang="ts">
import NavBar from '@/components/feature/NavBar.vue'
</script>

<template>
  <div id="app">
    <NavBar />
    <div class="flex justify-center">
      <div class="w-[80vw]">
        <div class="flex justify-between mt-7">
          <h1 class="font-black py-7">BTC Carteiras</h1>
          <div class="flex justify-center items-center py-7"></div>
        </div>
        <div class="py-5"></div>
        <div class="my-10 flex justify-center text-xs text-gray-400">
          <b>Fintools | Desafio Front-End</b>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 790px) {
  .app-container-body {
    width: 90vw;
  }
}
</style>
