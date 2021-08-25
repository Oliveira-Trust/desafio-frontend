import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  // strict: true,
  state: {
    usuario: {
      nome: "",
      email: "",
      senha: "",
    },
  },
  mutations: {
    MUDAR_USUARIO(state, payload) {
      state.usuario = Object.assign(state.usuario, payload);
    },
  },
  actions: {
    // Apenas para exemplificar, não irei utilizar token de autenticação por não se tratar de um sistema real
    obterUsuario(context, payload) {
      return axios.get("http://localhost:3004/usuario").then((response) => {
        let usuario = response.data[0].email,
          senha = response.data[0].senha;

        if (usuario === payload.login && senha === payload.senha) {
          context.commit("MUDAR_USUARIO", response.data[0]);
          window.localStorage.user = usuario;
          window.localStorage.password = senha;
        } else {
          Swal.fire({
            icon: "error",
            title: "usuário ou senha inválidos",
            confirmButtonColor: "#dc3545",
          });
        }
      });
    },
    manterLogado(context) {
      return axios.get("http://localhost:3004/usuario").then((response) => {
        context.commit("MUDAR_USUARIO", response.data[0]);
      });
    },
    deslogarUsuario(context) {
      context.commit("MUDAR_USUARIO", {
        nome: "",
        email: "",
        senha: "",
      });
    },
  },
  modules: {},
});
