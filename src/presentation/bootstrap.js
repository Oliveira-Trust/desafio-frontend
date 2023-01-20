import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import store from './store/index.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './main.scss'

Vue.use(Vuetify)
Vue.config.productionTip = false

export function bootstrapVue(elementId) {
  new Vue({
    router,
    store,
    vuetify: new Vuetify({}),
    render: h => h(App)
  }).$mount(elementId)  
}