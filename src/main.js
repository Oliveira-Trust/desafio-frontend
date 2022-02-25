import Vue from 'vue'
import App from './App.vue'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faUser,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faAngleLeft,
  faAngleRight
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Toast, { POSITION } from 'vue-toastification'

import 'vue-toastification/dist/index.css'

library.add([
  faCoffee,
  faUser,
  faArrowRightFromBracket,
  faMagnifyingGlass,
  faPencil,
  faTrash,
  faAngleLeft,
  faAngleRight
])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Toast, { position: POSITION.BOTTOM_RIGHT })
Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
