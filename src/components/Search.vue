<template>
  <div class="search-container flex">
    <div class="search flex shadow-lg">
      <Input inputValue="" inputType="text" inputPlaceholder="Nome"/>
      <Input inputValue="" inputType="text" inputPlaceholder="Sobrenome"/>
      <Input inputValue="" inputType="text" inputPlaceholder="E-mail"/>

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
    width: 100%;
    justify-content: center;

    .search {
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
