<template>
  <div>
    <CHeader />
    <div>
      <CButton :outline="true" label="Adicionar Carteira" />
      <CInput
        :placeholder="'Teste'"
        :value="model"
        @change-value="changeInputValue"
      />
    </div>
  </div>
</template>

<script>
import CHeader from "@/components/Header.vue";
import CButton from "@/components/Button.vue";
import CInput from "@/components/Input.vue";

export default {
  name: "Home",
  components: { CHeader, CButton, CInput },
  data() {
    return {
      model: "",
    };
  },

  methods: {
    changeInputValue(value) {
      this.model = value;
    },
  },
};
</script>

<style scoped></style>
