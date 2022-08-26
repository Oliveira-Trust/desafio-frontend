<template>
  <div>
    <CHeader />
    <div class="c-container">
      <CButton :outline="true" label="Adicionar Carteira" />
      <CCard>
        <div class="c-container direction-row justify-space-between">
          <CInput
            classes="margin-right"
            :placeholder="'Teste'"
            :value="model"
            @change-value="changeInputValue"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Teste'"
            :value="model"
            @change-value="changeInputValue"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Teste'"
            :value="model"
            @change-value="changeInputValue"
          />
          <CButton :outline="true" label="Adicionar Carteira" />
        </div>
      </CCard>
    </div>
  </div>
</template>

<script>
import CHeader from "@/components/Header.vue";
import CButton from "@/components/Button.vue";
import CInput from "@/components/Input.vue";
import CCard from "@/components/Card.vue";

export default {
  name: "Home",
  components: { CHeader, CButton, CInput, CCard },
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
