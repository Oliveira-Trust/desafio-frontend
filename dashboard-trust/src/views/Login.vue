<template>
  <div>
    <Header />
    <Banner />
    <main class="conteudo">
      <b-container>
        <b-row>
          <b-col>
            <h1 class="titulo">Olá, infome seu login e senha</h1>
          </b-col>
        </b-row>
        <b-row class="fundo-login py-5 px-3 rounded lg">
          <b-col lg="4">
            <b-form>
              <b-form-group label="E-mail:">
                <b-form-input
                  id="input-1"
                  type="email"
                  placeholder="email@dominio.com"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Senha:">
                <b-form-input
                  id="input-1"
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
                  class="float-right px-5"
                  type="submit"
                  variant="outline-light"
                  >logar</b-button
                >
              </div>
            </b-form>
          </b-col>
          <b-col lg="8" class="my-5 mt-lg-0">
            <img src="https://i.ibb.co/zngBVGC/Mask-Group.jpg" alt="" />
          </b-col>
        </b-row>
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
};
</script>

<style lang="scss" scoped>
.fundo-login {
  background: var(--maroon-web);
  color: var(--light);
}
</style>
