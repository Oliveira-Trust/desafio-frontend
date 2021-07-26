<template>
  <div class="app-layout flex" :class="{ 'app-overlay': !menuHiddenMobile }">
    <LayoutAsideNavigation :is-hidden-mobile.sync="menuHiddenMobile" />
    <div class="flex flex-column w-full">
      <LayoutTheHeader @toogle-menu="toogleMenu" />
      <main class="container mx-auto pa-6">
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  menuHiddenMobile = true

  toogleMenu() {
    this.menuHiddenMobile = !this.menuHiddenMobile
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  min-height: 100vh;
}

.app-overlay::after {
  background-color: rgba($cor-preta, 0.5);
  content: '';
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 999;
}
</style>
