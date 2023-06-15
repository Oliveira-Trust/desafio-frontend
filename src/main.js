import Vue from 'vue'
import App from './App.vue'
import store from './store'
import 'vue-awesome/icons/pencil-alt'
import 'vue-awesome/icons/trash'
import Icon from 'vue-awesome/components/Icon'

Vue.config.productionTip = false
Vue.component('v-icon', Icon)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
