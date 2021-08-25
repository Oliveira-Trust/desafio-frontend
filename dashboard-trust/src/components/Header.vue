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
          <b-nav-item-dropdown v-if="usuario" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-avatar class="mr-2" :text="iniciais"></b-avatar>
              <em>Junior Araújo</em>
            </template>
            <b-dropdown-item href="#">Adicionar Funcionário</b-dropdown-item>
            <b-dropdown-item>
              <router-link to="/login">Sair</router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      usuario: null,
      iniciais: "",
    };
  },
  methods: {},
  created() {},
};
</script>

<style></style>
