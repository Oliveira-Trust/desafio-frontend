<template>
  <aside class="container">
    <form
      @submit.prevent="filtrarUsers"
      class="container-flex-center-between card"
    >
      <App-Input class="InputField" v-model="filtro.nome" label="Nome" name="nome" />

      <App-Input
        class="InputField"
        v-model="filtro.sobrenome"
        label="Sobrenome"
        name="sobrenome"
      />
      <App-Input
        class="InputField"
        :type="'email'"
        v-model="filtro.email"
        label="E-mail"
        name="email"
      />

      <App-Button class="container-flex-center-between" variation="secondary">
        <!-- class="btn btn-default btn-default-shadow btn-search" -->
        <SearchIcon :size="17" class="icone-search"/>
        Buscar
      </App-Button>
    </form>
  </aside>
</template>

<script>
export default {
  name: "App-FormSearch",
  components: {},
  data: () => {
    return {
      filtro: () => {},
      InputField: {
        margin: "0 0.3rem",
      },
    };
  },
  methods: {
    filtrarUsers() {
      this.controle = "";
      let nome = this.filtro.nome && `nome_like=${this.filtro.nome}`;
      this.controle = nome && "&";

      let sobrenome =
        this.filtro.sobrenome &&
        `${this.controle}sobrenome_like=${this.filtro.sobrenome}`;
      this.controle = nome && "&";

      let email =
        this.filtro.email && `${this.controle}emil_like=${this.filtro.email}`;

      this.$emit("filtrarUsers", { busca: `${nome}${sobrenome}${email}` });
    },
  },
};
</script>

<style scoped>
.InputField {
  margin: 0 0.3rem;
}
.icone-search {
  margin-right: 0.3rem;
}
</style>
