import Vue from 'vue'
import App from './App.vue'
import router from './router';
import '@/scss/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
/* import specific icons */
import { faArrowRightFromBracket, faPen, faTrash, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faArrowRightFromBracket, faPen, faTrash, faMagnifyingGlass);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
