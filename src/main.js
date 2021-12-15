import Vue from 'vue'
import App from './App.vue'

// css global
import '@/scss/core.scss';


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')