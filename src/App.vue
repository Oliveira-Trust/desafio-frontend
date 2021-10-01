<template>
  <div id="app">
    <ot-header />

    <main>
      <ot-filters class="mt-3" />
      <ot-table class="mt-3" />
    </main>

    <wallet-modal />
  </div>
</template>

<script>
import OtFilters from "./components/OtFilters.vue";
import OtHeader from "./components/OtHeader.vue";
import OtTable from "./components/OtTable.vue";
import WalletModal from "./components/WalletModal.vue";

export default {
  name: "App",

  components: {
    OtHeader,
    OtFilters,
    OtTable,
    WalletModal
  }
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  width: 100%;
  background-color: var(--bs-gray-300);
  flex: auto;
}
</style>
