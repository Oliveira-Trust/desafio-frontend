<template>
  <div>
    <CHeader />
    <div class="c-container">
      <div>
        <div class="c-container direction-row justify-space-between">
          <h4>BTC Carteiras</h4>
          <CButton
            label="Adicionar Carteira"
            @click-button="showModal = true"
          />
        </div>
      </div>
      <CCard>
        <div class="c-container direction-row justify-space-between">
          <CInput
            classes="margin-right"
            :placeholder="'Nome'"
            :value="nome"
            @change-value="(e) => (nome = e)"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Sobrenome'"
            :value="sobrenome"
            @change-value="(e) => (sobrenome = e)"
          />
          <CInput
            classes="margin-right"
            :placeholder="'Email'"
            :value="email"
            @change-value="(e) => (email = e)"
          />
          <CButton :outline="true" label="Buscar" />
        </div>
      </CCard>
    </div>
    <CModal v-if="showModal" @close="showModal = false">
      <h3 slot="header">Adicionar Carteira</h3>
      <div slot="body">
        <div class="c-container justify-space-between">
          <CInput
            classes="margin-bottom"
            :placeholder="'Nome'"
            :value="nome"
            @change-value="(e) => (nome = e)"
          />
          <CInput
            classes="margin-bottom"
            :placeholder="'Sobrenome'"
            :value="sobrenome"
            @change-value="(e) => (sobrenome = e)"
          />
          <CInput
            classes="margin-bottom"
            :placeholder="'Email'"
            :value="email"
            @change-value="(e) => (email = e)"
          />
          <div class="c-container direction-row no-margin align-items">
            <div class="c-container__half">
              <CInput
                classes="margin-bottom"
                :placeholder="'Valor da compra'"
                :value="bitcoin"
                @change-value="(e) => (bitcoin = e)"
              />
            </div>
            <div class="c-container__half">
              <h5 class="c-text h5 flex-2">BTC 0.9898</h5>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="c-container direction-row justify-flex-end">
          <CButton label="Cancelar" :clear="true" class="margin-right" />
          <CButton label="Adicionar" />
        </div>
      </div>
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
      bitcoin: 0,
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
