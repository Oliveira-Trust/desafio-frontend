import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@/scss/main.scss';

Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
