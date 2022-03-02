<template>
  <MainTemplate>
    <div>
      <UpBar class="upbar"/>
      <Main/>
      <Wallet/>
    </div>
  </MainTemplate>
</template>

<script>
import MainTemplate from "@/template/MainTemplate";
import UpBar from "@/components/UpBar.vue";
import Main from "@/components/Main.vue";
import Wallet from "@/components/Wallet.vue";
export default {
  name: "App",
  components: {
    MainTemplate,
    UpBar,
    Main,
    Wallet,
  },
};
</script>

<style>
div {
  width: 100%;
  height: 100%;
}

.upbar {
  background-color: #ffffff;
}
</style>