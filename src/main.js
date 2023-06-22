import Vue from 'vue'
import store from './store'
import { reboot, bootstrap } from './bootstrap'
import App from './App.vue'

Vue.config.productionTip = false

Vue.use(reboot)
Vue.use(bootstrap)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
