<template>
  <div id="app" class="content">
    <div>
      <PageHome />
      <App-ModalRoot />
    </div>
    <App-Footer />
  </div>
</template>

<script>
import PageHome from "./page/PageHome.vue";
export default {
  name: "App",
  components: {
    PageHome,
  },
};
</script>

<style>
.content {
  overflow: hidden; /*remove a margem vinda de elementos interno, não pode ter height fixo*/
  position: relative;
  min-height: 100%;
}
.content+div {
  margin-bottom: 50px;
}
</style>
