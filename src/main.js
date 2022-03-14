import Vue from 'vue'
import App from './App.vue'
import store from './plugins/store'
import JsonCSV from 'vue-json-csv'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.component('downloadCsv', JsonCSV)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
