import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import moment from "moment";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(moment);
moment.suppressDeprecationWarnings = true;

Vue.filter("FormatandoData", (data) => {
  return moment(
    new Date(data),
    ["MM-DD-YYYY", "YYYY-MM-DD"],
    "pt-br",
    true
  ).fromNow();
});

Vue.filter("NomeSobrenome", (nomeCompleto) => {
  let nomeAnterior = nomeCompleto.split(" "),
    primeirosNomes = `${nomeAnterior[0]} ${nomeAnterior[1]}`;

  return primeirosNomes;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
