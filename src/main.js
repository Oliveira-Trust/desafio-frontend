import Vue from 'vue'
import App from './App.vue'
import router from './router';
// vuex
import store from './store';
// icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// components global
import ComponentRegistration from '@/utils/component-registration';
// css global
import '@/scss/core.scss';
// Registro de Icones
library.add(fas);
Vue.component('font-awesome-icon', FontAwesomeIcon);


ComponentRegistration();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');