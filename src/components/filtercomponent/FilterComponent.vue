<template>
  <div class="filter__container">
    <input class="input" type="text" v-model="filtroNome" placeholder="Nome">
    <input class="input" type="text" v-model="filtroSobrenome" placeholder="Sobrenome">
    <input class="input" type="text" v-model="filtroEmail" placeholder="Email">
    <button @click="aplicarFiltro" class="search__button">
      <img class="icon" src="../../assets/img/icons/search_icon.png" alt="Buscar">
      <p>Buscar</p>
    </button>
  </div>
</template>

<script>
import FilterComponentScript from './FilterComponentScript.js'; 

export default {
  name: 'FilterComponent',
  mixins: [FilterComponentScript], 
}
</script>

<style scoped>

@import './FilterComponentStyle.css';
</style>