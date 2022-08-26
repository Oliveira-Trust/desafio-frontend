import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.scss";

import api from "./configs/api";

Vue.prototype.$http = api;
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
