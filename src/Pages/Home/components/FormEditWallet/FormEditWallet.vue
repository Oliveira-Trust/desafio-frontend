<style src="./FormEditWallet.css"></style>

<template>
  <div>
    <form class="formValidation" @submit.prevent="onSubmit">
      <input
        v-model="user.nome"
        placeholder="Nome"
        id="nome"
        name="input_nome"
      />
      <p class="errorMessage" v-if="errors.nome">{{ errors.nome }}</p>
      <input
        v-model="user.sobrenome"
        placeholder="Sobrenome"
        id="sobrenome"
        name="input_sobrenome"
      />
      <p class="errorMessage" v-if="errors.sobrenome">
        {{ errors.sobrenome }}
      </p>
      <input
        v-model="user.email"
        placeholder="E-mail"
        id="email"
        name="input_email"
      />
      <p class="errorMessage" v-if="errors.email">{{ errors.email }}</p>
      <div class="valuePurchase">
        <input
          v-model="user.valor_carteira"
          placeholder="Valor de Compra(Numeros)"
          id="valor_carteira"
          name="input_valor_carteira"
          maxlength="9"
          pattern="[0-9]+"
        />
        <span class="textBTC">BTC {{ btcValue.toFixed(9).slice(0, 9) }}</span>
      </div>
      <p class="errorMessage" v-if="errors.valor_carteira">
        {{ errors.valor_carteira }}
      </p>
      <div class="buttonFinish">
        <button class="buttonCancel" type="button" @click="close">
          Cancelar
        </button>
        <button class="buttonToAdd" type="submit">
          Adicionar
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import Users from "../../../../services/users.js";
import Moedas from "../services/moedas.js";

export default {
  name: "FormEditWallet",
  props: {
    userEdit: {
      type: Object,
    },
  },
  data() {
    return {
      errors: [],
      user: {
        id: this.userEdit.id,
        nome: this.userEdit.nome,
        sobrenome: this.userEdit.sobrenome,
        email: this.userEdit.email,
        valor_carteira: this.userEdit.valor_carteira,
      },
      btcValue: 0,
    };
  },
  watch: {
    "user.valor_carteira": function(novoValor) {
      this.listarMoedas(novoValor);
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },

    listarMoedas(novoValor) {
      Moedas.listarMoeda().then((resposta) => {
        const novovalorBtc = novoValor / resposta.data.BTCBRL.bid;
        this.btcValue = novovalorBtc;
      });
    },

    listar() {
      Users.listar().then((resposta) => {
        this.users = resposta.data;
      });
    },

    onSubmit() {
      this.errors = {};

      const nomeRegex = /^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/;
      const sobrenomeRegex = /^[a-zA-ZÀ-ÿ]+( [a-zA-ZÀ-ÿ]+)*$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const valor_carteiraRegex = /^\d+(\.\d{1,5})?$/;

      const trimmedNome = this.user.nome ? this.user.nome.trim() : "";
      const trimmedSobreNome = this.user.sobrenome
        ? this.user.sobrenome.trim()
        : "";
      const trimmedEmail = this.user.email ? this.user.email.trim() : "";
      const trimmedvalor_carteira = this.user.valor_carteira
        ? this.user.valor_carteira.trim()
        : "";

      if (!trimmedNome) {
        this.errors.nome = "Nome obrigatório!";
      } else if (!nomeRegex.test(trimmedNome)) {
        this.errors.nome =
          "Nome inválido. Por favor, digite apenas caracteres.";
      }

      if (!trimmedSobreNome) {
        this.errors.sobrenome = "Sobrenome obrigatório!";
      } else if (!sobrenomeRegex.test(trimmedSobreNome)) {
        this.errors.sobrenome =
          "Nome inválido. Por favor, digite apenas caracteres.";
      }

      if (!trimmedEmail) {
        this.errors.email = "E-mail obrigatório!";
      } else if (!emailRegex.test(trimmedEmail)) {
        this.errors.email = "E-mail inválido!";
      }

      if (!trimmedvalor_carteira) {
        this.errors.valor_carteira = "Valor de compra obrigatório!";
      } else if (!valor_carteiraRegex.test(trimmedvalor_carteira)) {
        this.errors.valor_carteira =
          "Valor de compra inválido. Digite apenas valores numéricos.";
      }

      if (Object.keys(this.errors).length === 0) {
        this.user.valor_carteira = this.btcValue.toFixed(5);
        let formValidation = {
          nome: trimmedNome,
          sobrenome: trimmedSobreNome,
          email: trimmedEmail,
          valor_carteira: this.user.valor_carteira,
        };
        this.$emit("formValidation", formValidation);

        Users.atualizar(this.user).then(() => {
          this.$emit("walletUpdated");
          this.$emit("updateSuccess");
          this.user.nome = null;
          this.user.sobrenome = null;
          this.user.email = null;
          this.user.valor_carteira = null;
        });
      }
    },
  },
};
</script>
