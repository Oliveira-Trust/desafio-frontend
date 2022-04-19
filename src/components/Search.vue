<template>
  <div class="search-container">
    <div class="search shadow-lg">
      <Input inputValue="" 
             inputType="text" 
             inputLabel="Nome"
             v-model="name"/>

      <Input inputValue="" 
             inputType="text" 
             inputLabel="Sobrenome"
             v-model="lastName"/>

      <Input inputValue="" 
             inputType="text" 
             inputLabel="E-mail"
             v-model="email"/>

      <Button v-on:click="sendValue" 
              label="Buscar" 
              v-bind:hasIcon="true" 
              buttonClass="btn-outline"/>
    </div>
  </div>
</template>

<script>
import Input from './Input.vue'
import Button from './Button.vue'

export default {
  name: 'Search',
  props: {
  },
  components: {
    Input,
    Button
  },
  data() {
    return {
      name: '',
      lastName: '',
      email: ''
    }
  },
  methods: {
    sendValue () {
      this.$emit('clicked', {
        name:this.name,
        lastName: this.lastName,
        email: this.email
      });
    },
  },
}
</script>

<style lang="scss" scoped>
  .search-container {
    display: flex;
    justify-content: center;
    width: 100%;

    .search {
      display: flex;
      box-sizing: border-box;
      padding: 20px;
      margin: 24px 0;
      border-radius: 4px;
      background: #fff;
      width: 100%;
      max-width: 1200px;
    }
  }
</style>
