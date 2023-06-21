<template>
  <section>
    <h6 class="my-3">Editar Carteira</h6>
    <WalletForm typeAction="updateWallet"></WalletForm>
  </section>
</template>

<script>
  import WalletForm from '../../Wallet/WalletForm/WalletForm.vue';

  export default {
    name: 'WalletUpdateModal',
    components: {
      WalletForm
    }
  }
</script>
