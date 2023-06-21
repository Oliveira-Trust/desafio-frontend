<template>
  <div id="app">
    <Header></Header>
    <WalletContainer></WalletContainer>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import WalletContainer from './components/Wallet/WalletContainer.vue';

  export default {
    name: 'App',
    components: {
      Header,
      WalletContainer
    }
  }
</script>

<style>
  @import url('../node_modules/bootstrap-icons/font/bootstrap-icons.css');
  body {
    background-color: #fcfcfd;
  }
</style>
