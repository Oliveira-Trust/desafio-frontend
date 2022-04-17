<template>
  <div class="search-container">
    <div class="search shadow-lg">
      <Input inputValue="" inputType="text" inputLabel="Nome"/>
      <Input inputValue="" inputType="text" inputLabel="Sobrenome"/>
      <Input inputValue="" inputType="text" inputLabel="E-mail"/>

      <Button label="Buscar" />
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
  }
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
