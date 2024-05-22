<script setup lang="ts">
import IconButton from '../common/IconButton.vue'
import ProfileAvatar from './ProfileAvatar.vue'
</script>
<template>
  <div class="h-20 bg-white [box-shadow:#9999993d_0px_3px_8px] flex justify-center">
    <div class="w-4/5 h-full p-0 flex justify-between items-center">
      <div class="flex items-center">
        <img class="mr-2.5 w-8" src="../../assets/logo.png" alt="Oliveira Trust Logo" />
        <h2 class="font-black">OLIVEIRA TRUST</h2>
      </div>
      <div class="flex items-center">
        <ProfileAvatar />
        <b class="mx-2.5">Otávio Oliveira</b>
        <IconButton tooltipText="Sair" name="arrow-right-from-bracket" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 790px) {
  .nav-bar-content > h2 {
    display: none;
  }

  .nav-bar-contents {
    width: 90%;
  }
}
</style>
