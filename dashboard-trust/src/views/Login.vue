<template>
  <div>
    <Header />
    <Banner />
    <main class="conteudo">
      <b-container>
        <b-row>
          <b-col>
            <transition name="fade-titulo" mode="out-in" appear>
              <h1 class="titulo">Olá, informe seu login e senha</h1>
            </transition>
          </b-col>
        </b-row>
        <transition name="fade-login" appear>
          <b-row
            v-if="mostrarLogin"
            class="fundo-login py-5 px-3 rounded lg shadow"
          >
            <b-col lg="4">
              <b-form>
                <b-form-group label="E-mail:">
                  <b-form-input
                    v-model="dados_acesso.login"
                    id="input-1"
                    type="email"
                    placeholder="email@dominio.com"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group label="Senha:">
                  <b-form-input
                    v-model="dados_acesso.senha"
                    id="input-2"
                    type="password"
                    placeholder="super senha"
                    required
                  ></b-form-input>
                </b-form-group>
                <div class="d-flex justify-content-between align-items-end">
                  <small
                    v-b-tooltip.hover.bottom="'A senha é 123'"
                    class="d-block"
                    >esqueci minha senha</small
                  >
                  <b-button
                    @click.prevent="logar()"
                    class="float-right px-5"
                    type="submit"
                    variant="outline-light"
                    >fazer login</b-button
                  >
                </div>
              </b-form>
            </b-col>
            <b-col lg="8" class="mt-5 mt-lg-0">
              <img src="https://i.ibb.co/zngBVGC/Mask-Group.jpg" alt="" />
            </b-col>
          </b-row>
        </transition>
      </b-container>
    </main>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Banner from "@/components/Banner";

export default {
  name: "Login",
  components: {
    Header,
    Banner,
  },
  data() {
    return {
      mostrarLogin: false,
      dados_acesso: {
        carregando: false,
        login: "",
        senha: null,
      },
    };
  },
  methods: {
    logar() {
      this.$store.dispatch("obterUsuario", this.dados_acesso).then(() => {
        this.$router.push({ name: "Home" });
      });
    },
  },
  created() {
    this.mostrarLogin = true;
  },
};
</script>

<style lang="scss" scoped>
.fundo-login {
  background: linear-gradient(
    45deg,
    rgba(0, 95, 115, 1) 0%,
    rgba(174, 32, 18, 1) 100%
  );
  color: var(--light);
}

.fade-login-enter-to,
.fade-login-leave-to {
  transition: all 0.6s;
}

.fade-login-enter,
.fade-login-leave-to {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}
</style>
