<template>
  <div id="app">
    <ot-header />

    <main>
      <ot-filters class="mt-3" />
    </main>
  </div>
</template>

<script>
import OtFilters from "./components/OtFilters.vue";
import OtHeader from "./components/OtHeader.vue";

export default {
  name: "App",

  components: {
    OtHeader,
    OtFilters
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
  background-color: var(--bs-gray-200);
  flex: auto;
}
</style>
