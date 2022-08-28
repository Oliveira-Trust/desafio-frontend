<template>
  <div>
    <CHeader />
    <div class="c-container">
      <div>
        <div class="c-container direction-row justify-space-between">
          <h4>BTC Carteiras</h4>
          <CButton
            label="Adicionar Carteira"
            @click-button="openModalAddorEdit"
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
      <h3 slot="header">{{ id ? "Editar" : "Adicionar " }} Carteira</h3>
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
          <CButton
            :label="id ? 'Editar' : 'Adicionar'"
            @click-button="addUser()"
          />
        </div>
      </div>
    </CModal>
    <CModal v-if="showModalDelete" @close="showModalDelete = false">
      <div slot="header">
        <div style="text-align: center">
          <img
            @click="$emit('delete', item)"
            src="@/assets/imgs/trash-4-xxl.png"
            class="c-icon large circle"
            alt="Delete"
          />
        </div>
      </div>
      <div slot="body">
        <div class="c-container justify-space-between">
          <h3 class="title-delete">Excluir Carteira</h3>
          <h6 class="subtitle-delete">
            Tem certeza que deseja excluir essa Carteira?
          </h6>
          <h6 class="subtitle-delete">Essa ação não poderá ser desfeita</h6>
        </div>
        <div class="c-container justify-space-between">
          <CButton
            label="Excluir"
            class="danger margin-top"
            @click-button="$deleteUser()"
          />
          <CButton
            label="Cancelar"
            :clear="true"
            class="margin-right margin-top"
            @click-button="closeModalDelete()"
          />
        </div>
      </div>
    </CModal>
    <div class="c-container">
      <CCard>
        <CTable
          :headers="headers"
          :body="body"
          @edit="editUser"
          @delete="openModalDelete"
        />
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
      showModalDelete: false,
      id: 0,
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
    users: {
      immediate: true,
      deep: true,
      handler(val) {
        this.body = [];
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
  },

  methods: {
    ...mapActions("users", ["listUsers", "createUser", "deleteUser"]),
    ...mapActions("money", ["convertMoney"]),
    changeInputValue(value) {
      this.model = value;
    },

    closeModalAdd() {
      this.showModal = false;
    },

    closeModalDelete() {
      this.showModalDelete = false;
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
      this.clearForm();
      this.showModal = false;
    },

    clearForm() {
      this.nome = "";
      this.sobrenome = "";
      this.email = "";
      this.bitcoin = 0;
      this.real = 0;
      this.id = 0;
    },

    openModalAddorEdit() {
      this.clearForm();
      this.showModal = true;
    },

    editUser(user) {
      this.id = user.id;
      this.nome = user.nome;
      this.sobrenome = user.sobrenome;
      this.email = user.email;
      this.bitcoin = user.bitcoin;
      this.real =
        Number(this.money.bid.replace(/\D/g, "")) * Number(user.bitcoin);
      this.showModal = true;
    },

    $deleteUser() {
      this.deleteUser(this.id);
      this.closeModalDelete();
    },

    openModalDelete(user) {
      this.id = user.id;
      this.showModalDelete = true;
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

.title-delete {
  font-size: 22px;
  margin: 0;
  padding: 0;
  text-align: center;
  font-weight: bold;
}

.subtitle-delete {
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 200;
  text-align: center;
}
</style>
