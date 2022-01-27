import Vue from 'vue';

import App from './App.vue';
import store from '@/store';

import '../src/assets/styles/global.css';
import './register-components';

import JsonCSV from 'vue-json-csv';
import money from 'v-money';
import Vuelidate from 'vuelidate';


Vue.config.productionTip = false;
Vue.component('downloadCsv', JsonCSV);
Vue.use(money, { precision: 4 });
Vue.use(Vuelidate);


new Vue({
  render: h => h(App),
  store
}).$mount('#app');
