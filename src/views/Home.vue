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
          <CButton
            :outline="true"
            label="Adicionar Carteira"
            @click-button="showModal = true"
          />
        </div>
      </CCard>
    </div>
    <CModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">custom header</h3>
    </CModal>
    <div class="c-container">
      <CCard>
        <CTable />
      </CCard>
    </div>
  </div>
</template>

<script>
import CHeader from "@/components/Header.vue";
import CButton from "@/components/Button.vue";
import CInput from "@/components/Input.vue";
import CCard from "@/components/Card.vue";
import CModal from "@/components/Modal.vue";
import CTable from "@/components/Table.vue";

export default {
  name: "Home",
  components: { CHeader, CButton, CInput, CCard, CModal, CTable },
  data() {
    return {
      model: "",
      showModal: false,
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
