<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <h2>Editar objeto</h2>
      <hr>
      <!-- Campos para edição -->
      <div class="input-container">
        <label for="nome" class="label-placeholder" :class="{ 'active': usuarioEditado.nome }">Nome</label>
        <input type="text" id="nome" v-model="usuarioEditado.nome" @input="toggleLabel('nome')">
        <div class="req" :class="{ 'active': !usuarioEditado.nome }">*</div>
      </div>
      <div class="input-container">
        <label for="sobrenome" class="label-placeholder" :class="{ 'active': usuarioEditado.sobrenome }">Sobrenome</label>
        <input type="text" id="sobrenome" v-model="usuarioEditado.sobrenome" @input="toggleLabel('sobrenome')">
        <div class="req" :class="{ 'active': !usuarioEditado.sobrenome }">*</div>
      </div>
      <div class="input-container">
        <label for="email" class="label-placeholder" :class="{ 'active': usuarioEditado.email }">Email</label>
        <input type="email" id="email" v-model="usuarioEditado.email" @input="toggleLabel('email')">
        <div class="req" :class="{ 'active': !usuarioEditado.email }">*</div>
      </div>
      <div class="input-container">
        <label for="valorCompra" class="label-placeholder" :class="{ 'active': usuarioEditado.valorCompra }">Valor de Compra (R$)</label>
        <input type="number" min="0" id="valorCompra" v-model="usuarioEditado.valorCompra" @input="bitcoinValue">
        <div class="req" :class="{ 'active': !usuarioEditado.valorCompra }">*</div>
      </div>
      
      <!-- Exibição do valor do Bitcoin -->
      <div class="bottom-container">
        <span>BTC {{ valorbitcoin }}</span>
        <div class="button-container">
          <button @click="cancelar" class="cancel-button">Cancelar</button>
          <button @click="editar" class="add-button">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditModalComponentScript from './EditModalComponentScript.js';

export default {
  name: 'EditModalComponent',
  mixins: [EditModalComponentScript],
  props: ['isOpen']
};
</script>

<style scoped>
/* Estilos CSS importados aqui */
@import "./EditModalComponentStyle.css";
</style>
