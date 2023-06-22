<template>
  <header id="Header" class="py-2">
    <div class="container">
      <div class="d-flex flex-row align-items-center">
        <Logo></Logo>
        <Account></Account>
      </div>
    </div>
  </header>
</template>

<script>
  import Logo from './Logo.vue'
  import Account from './Account/Account.vue'

  export default {
    components: {
      Logo,
      Account
    }
  }
</script>

<style scoped>
  #Header {
    background-color: #fff;
    box-shadow: 0px -1px 11px #CCC;
    width: 100%;
  }
</style>