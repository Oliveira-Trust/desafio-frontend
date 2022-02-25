<template>
  <div id="app">
    <template-index />
    <loading v-if="isLoading" />
    <modal-error v-if="hasError" />
  </div>
</template>

<script>
import TemplateIndex from "./templates";
import { mapGetters } from "vuex";
import Loading from "./components/Loading";
import ModalError from "./components/ModalError";

export default {
  name: "App",
  components: {
    TemplateIndex,
    Loading,
    ModalError,
  },
  computed: {
    ...mapGetters("GLOBAL", ["isLoading", "hasError"]),
  },
  async created() {
    this.$store.dispatch("USERS/initialGet");
    this.$store.dispatch("GLOBAL/getRefsBitCoin");
  },
};
</script>

<style>
html {
  font-size: 16px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  background: #eee;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
