<template>
  <div>
    <CHeader />
    <div class="c-container">
      <CButton :outline="true" label="Adicionar Carteira" />
      <CCard>
        <div class="c-container direction-row justify-space-between">
          <CInput
            classes="margin-right"
            :placeholder="'Nome'"
            :value="nome"
            @change-value="changeInputValue"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Sobrenome'"
            :value="sobrenome"
            @change-value="changeInputValue"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Email'"
            :value="email"
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
        <CTable :headers="headers" :body="body" />
      </CCard>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
      nome: "",
      sobrenome: "",
      email: "",
      showModal: false,
      headers: [
        { value: "nome", label: "Nome" },
        { value: "sobrenome", label: "Sobrenome" },
        { value: "email", label: "Email" },
        { value: "bitcoin", label: "Bitcoin" },
        { value: "action", label: null },
      ],
      body: [],
    };
  },

  computed: {
    ...mapGetters("users", ["users"]),
  },

  watch: {
    users(val) {
      val.map((item) => {
        this.body.push({
          ...item,
          action: {
            edit: true,
            delete: true,
          },
        });
      });
    },
  },

  methods: {
    ...mapActions("users", ["listUsers"]),
    changeInputValue(value) {
      this.model = value;
    },
  },
  created() {
    this.listUsers();
  },
};
</script>

<style scoped></style>
