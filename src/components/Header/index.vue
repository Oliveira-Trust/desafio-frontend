<!-- Componente Header -->
<template>
  <header>
    <img :src="svgUrl" alt="Logo" class="logo" />

    <div class="user">
      <i class="pi pi-user user-svg"></i>
      <span class="user-name">Otávio Oliveira</span>
      <i class="pi pi-sign-out exit-svg"></i>
    </div>
  </header>
</template>

<script>
import svg from '@/assets/brand.svg'

export default {
  name: 'Header',
  components: {
  },
  data() {
    return {
      svgUrl: svg,
    }
  },
}
</script>

<style scoped>
@import './styles.css';
</style>
