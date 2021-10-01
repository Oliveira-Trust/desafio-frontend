<template>
  <b-modal
    id="wallet-modal"
    :title="`${isEditMode ? 'Editar' : 'Cadastrar'} carteira`"
    centered
    hide-header-close
    :visible="open"
  >
    <b-form-group label="Nome" label-for="wallet-user-name">
      <b-input
        class="mt-2"
        id="wallet-user-name"
        type="text"
        placeholder="Maria"
        trim
        v-model="input.nome"
      />
    </b-form-group>

    <b-form-group
      class="mt-3"
      label="Sobrenome"
      label-for="wallet-user-surname"
    >
      <b-input
        class="mt-2"
        id="wallet-user-surname"
        type="text"
        placeholder="Silva"
        trim
        v-model="input.sobrenome"
      />
    </b-form-group>

    <b-form-group class="mt-3" label="Email" label-for="wallet-user-email">
      <b-input
        class="mt-2"
        id="wallet-user-email"
        type="email"
        placeholder="email@email.com"
        trim
        v-model="input.email"
      />
    </b-form-group>

    <b-form-group class="mt-3" label="Nome" label-for="wallet-user-value">
      <b-row>
        <b-col cols="6">
          <b-input
            class="mt-2"
            id="wallet-user-value"
            type="number"
            placeholder="999,99"
            min="0"
            step="0.1"
            number
            v-model="input.reais"
          />
        </b-col>
        <b-col cols="6" class="align-self-center">
          <p class="mb-0 btc-value">BTC {{ input.valor_carteira }}</p>
        </b-col>
      </b-row>
    </b-form-group>

    <template #modal-footer>
      <b-btn class="text-decoration-none" variant="link" @click="closeModal">
        Cancelar
      </b-btn>
      <b-btn @click="sendForm">
        {{ isEditMode ? "Alterar" : "Adicionar" }}
      </b-btn>
    </template>
  </b-modal>
</template>

<script>
import { mapActions } from "vuex";

import { getCurrentBtcValue } from "../services/btcBroker";

export default {
  name: "WalletModal",

  props: {
    wallet: {
      type: Object,
      default: () => ({})
    },

    open: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      btcValue: 1,
      input: {
        nome: "",
        sobrenome: "",
        email: "",
        reais: 0,
        valor_carteira: 0
      }
    };
  },

  computed: {
    isEditMode() {
      return !!Object.keys(this.wallet).length;
    }
  },

  watch: {
    open(open) {
      if (open && this.isEditMode) {
        Object.keys(this.input).forEach(key => {
          if (key == "valor_carteira") {
            this.input.reais = this.wallet[key] * this.btcValue;
          } else {
            this.input[key] = this.wallet[key];
          }
        });
      }
    },

    "input.reais": function(value) {
      this.input.valor_carteira = parseFloat(
        (value / this.btcValue).toFixed(10)
      );
    }
  },

  methods: {
    ...mapActions(["addWallet", "updateWallet"]),

    closeModal() {
      this.$emit("close");
      this.input = {
        nome: "",
        sobrenome: "",
        email: "",
        reais: 0,
        valor_carteira: 0
      };
    },

    sendForm() {
      if (this.isEditMode) {
        this.updateWallet({ ...this.input, id: this.wallet.id });
        this.closeModal();
      } else {
        const data_abertura = new Date().toISOString();

        this.addWallet({ ...this.input, data_abertura });
        this.closeModal();
      }
    }
  },

  async beforeMount() {
    this.btcValue = await getCurrentBtcValue();
  }
};
</script>

<style scoped>
.btc-value {
  font-size: 1.3rem;
}
</style>
