import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles.scss";

import api from "./configs/api";
import store from "./store";

Vue.prototype.$http = api;
Vue.prototype.$store = store;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
