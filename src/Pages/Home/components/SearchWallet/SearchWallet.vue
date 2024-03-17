<style src="./SearchWallet.css"></style>
<template>
  <div>
    <slot name="searchWallet"> </slot>
    <form class="searchValidation" @submit.prevent="onSubmit">
      <div class="searchDivInput">
        <input v-model="nome" placeholder="Nome" id="name" name="input_name" />
        <p class="searchErrorMessage" v-if="errors.nome">{{ errors.nome }}</p>
      </div>
      <div class="searchDivInput">
        <input
          v-model="sobrenome"
          placeholder="Sobrenome"
          id="sobrenome"
          name="input_sobrenome"
        />
        <p class="searchErrorMessage" v-if="errors.sobrenome">
          {{ errors.sobrenome }}
        </p>
      </div>
      <div class="searchDivInput">
        <input
          v-model="email"
          placeholder="E-mail"
          id="email"
          name="input_email"
        />
        <p class="searchErrorMessage" v-if="errors.email">{{ errors.email }}</p>
      </div>
      <div class="searchDivButton">
        <button class="buttonSearch pi pi-search">Buscar</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchWallet",

  methods: {
    onSubmit() {
      this.errors = {};

      const nomeRegex = /^[a-zA-ZÀ-ÿ]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const trimmedNome = this.nome ? this.nome.trim() : "";
      const trimmedSobreNome = this.sobrenome ? this.sobrenome.trim() : "";
      const trimmedEmail = this.email ? this.email.trim() : "";

      if (trimmedNome && !nomeRegex.test(trimmedNome)) {
        this.errors.nome =
          "Nome inválido. Por favor, digite apenas caracteres.";
      }

      if (trimmedSobreNome && !nomeRegex.test(trimmedSobreNome)) {
        this.errors.sobrenome =
          "Sobrenome inválido. Por favor, digite apenas caracteres.";
      }

      if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
        this.errors.email =
          "E-mail inválido. Por favor, digite o e-mail corretamente.";
      }

      if (Object.keys(this.errors).length === 0) {
        let searchCriteria = {
          nome: trimmedNome,
          sobrenome: trimmedSobreNome,
          email: trimmedEmail,
        };

        this.$emit("search", searchCriteria);

        this.nome = null;
        this.sobrenome = null;
        this.email = null;
      }
    },
  },
  data() {
    return {
      nome: null,
      sobrenome: null,
      email: null,
      errors: [],
      users: [],
    };
  },
};
</script>
