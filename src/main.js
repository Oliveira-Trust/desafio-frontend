import Vue from 'vue';
import App from './App.vue';

import '../src/assets/styles/global.css';
import './register-components';
import store from '@/store';

Vue.config.productionTip = false;


import JsonCSV from 'vue-json-csv';
Vue.component('downloadCsv', JsonCSV);

// https://github.com/vuejs-tips/v-money
import money from 'v-money';
Vue.use(money, { precision: 4 });


new Vue({
  render: h => h(App),
  store
}).$mount('#app');
