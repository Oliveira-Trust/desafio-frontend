<template>
  <div>
    <CHeader />
    <div>
      <CButton :outline="true" label="Adicionar Carteira" />
    </div>
  </div>
</template>

<script>
import CHeader from "@/components/Header.vue";
import CButton from "@/components/Button.vue";

export default {
  name: "Home",
  components: { CHeader, CButton },
};
</script>

<style scoped></style>
