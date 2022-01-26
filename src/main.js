import Vue from 'vue';
import App from './App.vue';

import '../src/assets/styles/global.css';
import './register-components';

Vue.config.productionTip = false;


import JsonCSV from 'vue-json-csv';
Vue.component('downloadCsv', JsonCSV);

new Vue({
  render: h => h(App),
}).$mount('#app');
