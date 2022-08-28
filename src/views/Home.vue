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
          <div class="error" v-if="$v.$error && !$v.nome.required">
            Nome é um campo obrigatório
          </div>

          <CInput
            classes="margin-bottom"
            :placeholder="'Sobrenome'"
            :value="sobrenome"
            @change-value="(e) => (sobrenome = e)"
          />
          <div class="error" v-if="$v.$error && !$v.sobrenome.required">
            Sobrenome é um campo obrigatório
          </div>

          <CInput
            classes="margin-bottom"
            :placeholder="'Email'"
            :value="email"
            @change-value="(e) => (email = e)"
          />
          <div class="error" v-if="$v.$error && !$v.email.email">
            Email inválido
          </div>
          <div class="error" v-if="$v.$error && !$v.email.required">
            Email é um campo obrigatório
          </div>

          <div class="c-container direction-row no-margin align-items">
            <div class="c-container__half">
              <CInput
                classes="margin-bottom"
                :placeholder="'Valor da compra'"
                :value="real"
                type="number"
                @change-value="changeMoney"
              />
              <div class="error" v-if="$v.$error && !$v.bitcoin.required">
                Valor da compra é um campo obrigatório
              </div>
            </div>
            <div class="c-container__half">
              <h5 class="c-text h5 flex-2">BTC {{ bitcoin }}</h5>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="c-container direction-row justify-flex-end">
          <CButton
            label="Cancelar"
            :clear="true"
            class="margin-right"
            @click-button="closeModalAdd()"
          />
          <CButton label="Adicionar" @click-button="addUser()" />
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

import { email, required } from "vuelidate/lib/validators";

import CHeader from "@/components/Header.vue";
import CButton from "@/components/Button.vue";
import CInput from "@/components/Input.vue";
import CCard from "@/components/Card.vue";
import CModal from "@/components/Modal.vue";
import CTable from "@/components/Table.vue";

export default {
  name: "Home",
  components: { CHeader, CButton, CInput, CCard, CModal, CTable },
  validations() {
    return {
      nome: { required },
      sobrenome: { required },
      email: { required, email },
      bitcoin: { required },
    };
  },
  data() {
    return {
      nome: "",
      sobrenome: "",
      email: "",
      bitcoin: 0,
      real: 0,
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
    ...mapGetters("money", ["money"]),
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
    ...mapActions("users", ["listUsers", "createUser"]),
    ...mapActions("money", ["convertMoney"]),
    changeInputValue(value) {
      this.model = value;
    },

    closeModalAdd() {
      this.showModal = false;
    },

    changeBRLtoBTC(value) {
      const bid = Number(this.money.bid.replace(/\D/g, "")) / 100;
      const perc = Number(value) / bid;
      const result = (1 / 100) * perc;

      return result.toFixed(5);
    },

    changeMoney(value) {
      this.bitcoin = this.changeBRLtoBTC(value);
    },

    addUser() {
      console.log(this.$v);
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      this.createUser({
        nome: this.nome,
        sobrenome: this.sobrenome,
        email: this.email,
        bitcoin: this.bitcoin,
      });
      this.showModal = false;
    },
  },
  created() {
    this.listUsers();
    this.convertMoney();
  },
};
</script>

<style scoped>
.error {
  font-size: 12px;
  margin-bottom: 10px;
  color: #e90404;
}
</style>
