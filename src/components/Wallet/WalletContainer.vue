<template>
  <Fragment>
    <WalletHeader />
    <Search />
    <WalletsList />
  </Fragment>
</template>

<script>
  import WalletHeader from './WalletHeader/WalletHeader.vue';
  import Search from '../Search/Search.vue';
  import WalletsList from './WalletsList/WalletsList.vue';
  import { Fragment } from 'vue-fragment';

  export default {
    components: {
      WalletHeader,
      Search,
      WalletsList,
      Fragment
    }
  }
</script>