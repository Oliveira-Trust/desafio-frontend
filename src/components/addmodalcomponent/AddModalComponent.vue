<template>
  <div class="modal" v-if="isOpen">
    <div class="modal-content">
      <h2>Adicionar carteira</h2>
      <hr>
      <div class="input-container">
        <label for="nome" class="label-placeholder" :class="{ 'active': novoUsuario.nome }">Nome</label>
        <input type="text" id="nome" v-model="novoUsuario.nome" @input="toggleLabel('nome')">
        <div class="req" :class="{ 'active': !novoUsuario.nome }">*</div>
      </div>
      <div class="input-container">
        <label for="sobrenome" class="label-placeholder" :class="{ 'active': novoUsuario.sobrenome }">Sobrenome</label>
        <input type="text" id="sobrenome" v-model="novoUsuario.sobrenome" @input="toggleLabel('sobrenome')">
        <div class="req" :class="{ 'active': !novoUsuario.sobrenome }">*</div>
      </div>
      <div class="input-container">
        <label for="email" class="label-placeholder" :class="{ 'active': novoUsuario.email }">Email</label>
        <input type="email" id="email" v-model="novoUsuario.email" @input="toggleLabel('email')">
        <div class="req" :class="{ 'active': !novoUsuario.email }">*</div>
      </div>
      <div class="input-container">
        <label for="valorCompra" class="label-placeholder" :class="{ 'active': novoUsuario.valorCompra }">Valor de Compra (R$)</label>
        <input type="number" min="0" id="valorCompra" v-model="novoUsuario.valorCompra" @input="bitcoinValue">
        <div class="req" :class="{ 'active': !novoUsuario.valorCompra }">*</div>
      </div>
      <div class="bottom-container">
        <span>BTC {{ valorbitcoin }}</span>
        <div class="button-container">
          <button @click="cancelar" class="cancel-button">Cancelar</button>
          <button @click="adicionar" class="add-button">Adicionar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddModalComponentScript from './AddModalComponentScript.js';

export default {
  name: 'AddModalComponent',
  mixins: [AddModalComponentScript],
  props: ['isOpen']
};
</script>

<style scoped>
@import "./AddModalComponentStyle.css";
</style>
