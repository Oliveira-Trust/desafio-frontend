
<template>
  <App-Modal>
    <div class="title-modal" slot="modalHeader">
      <h3>Adicionar Carteira</h3>
    </div>
    <template v-slot:modalBody>
      <form @submit.prevent="submitted">
        <section class="container-modal">
          <App-Input
            class="modal-input"
            type="text"
            v-model="$v.form.nome.$model"
            :error="$v.form.nome.$error"
            label="Nome"
            name="nome"
          />

          <App-Input
            class="modal-input"
            type="text"
            v-model="$v.form.sobrenome.$model"
            :error="$v.form.sobrenome.$error"
            label="Sobrenome"
            name="sobrenome"
          />
          <App-Input
            class="modal-input"
            type="email"
            v-model="$v.form.email.$model"
            :error="$v.form.email.$error"
            label="E-mail"
            name="email"
          />
          <div class="group-amount">
            <App-InputMoney
              class="modal-input w-50"
              v-model="fieldValue"
              label="Valor de compra"
              name="valueReal"
            />
            <div class="w-50 amount">{{ displayQuantityBTC }}</div>
          </div>
        </section>
      </form>
    </template>
    <template v-slot:modalFooter>
      <App-Button variation="default" @click="dismiss()"> Cancelar </App-Button>
      <App-Button variation="primary" submit="'submit'"> Adicionar </App-Button>
    </template>
  </App-Modal>
</template>

<script>
import * as API from "@/services/ApiBitcoin";
import * as methods from "@/utils/methods";
import { required } from "vuelidate/lib/validators";
export default {
  name: "App-ModalRegister",
  async created() {
    await this.startFields("BTC", "BRL", this.form.valor_carteira);
  },
  data() {
    return {
      amountBRL: 0,
      getPriceBuy: 0,
    };
  },
  computed: {
    fieldValue: {
      get() {
        return methods.convertCurrency(this.amountBRL, "BRL");
      },
      set(value) {
        this.updateBTC(value);
        return value;
      },
    },
    displayQuantityBTC() {
      return methods.convertCurrency(this.form.valor_carteira, "BTC");
    },
  },
  methods: {
    async startFields(currencyOrigin, currencyDestination, quantityBTC) {
      const { amountBRL, amountDesconvert, constValueBITCOIN } =
        await API.currencyConversion(
          currencyOrigin,
          currencyDestination,
          quantityBTC
        );

      this.getPriceBuy = constValueBITCOIN;
      this.amountBRL = amountBRL;
      this.form.valor_carteira = amountDesconvert;
    },

    updateBTC(value) {
      let number = methods.calculateAmountBRL(
        methods.deconvertCurrency(value),
        this.getPriceBuy
      );
      this.form.valor_carteira = number;
    },
    submitted() {
      this.$v.$touch();
      // close(this.form);
    },
  },
  validations: {
    form: {
      nome: {
        required,
      },
      sobrenome: {
        required,
      },
      email: {
        required,
      },
    },
  },
  props: {
    close: {
      type: Function,
      required: true,
    },
    dismiss: {
      type: Function,
      required: true,
    },
    form: {
      type: Object,
      default: () => {
        return {
          nome: "",
          sobrenome: "",
          email: "",
          valor_carteira: 0,
        };
      },
    },
  },
};
</script>

<style scoped>
.title-modal {
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #f2f2f2;
}
.container-modal {
  padding: 1rem;
}
.modal-input {
  margin-bottom: 0.5rem;
}

.group-amount {
  display: flex;
  align-items: center;
}

.group-amount .modal-input,
.amount {
  margin-right: 1rem;
}
.amount {
  font-weight: 600;
  font-size: 1.2rem;
}
button {
  font-size: 1rem;
}
</style>