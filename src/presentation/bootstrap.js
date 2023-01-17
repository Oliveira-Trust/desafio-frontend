import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from './store/index.js'

Vue.config.productionTip = false

export function bootstrapVue(elementId) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(elementId)
}