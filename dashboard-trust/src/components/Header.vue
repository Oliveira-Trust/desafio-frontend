<template>
  <div>
    <b-navbar
      toggleable="lg"
      type="light"
      variant="light"
      fixed="top"
      class="shadow-sm"
    >
      <b-navbar-brand>
        <router-link to="/">
          <img src="../assets/logotipo.svg" alt="" />
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="usuario.nome" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar class="mr-2" :text="iniciaisNome"></b-avatar>
              <em>{{ usuario.nome }}</em>
            </template>
            <b-dropdown-item @click="sair()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["usuario"]),
    iniciaisNome() {
      let nome_completo = this.usuario.nome.split(" ");
      let iniciais = nome_completo[0].charAt(0) + nome_completo[1].charAt(0);
      return iniciais;
    },
  },
  methods: {
    sair() {
      this.$store.dispatch("deslogarUsuario");
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("password");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style></style>
