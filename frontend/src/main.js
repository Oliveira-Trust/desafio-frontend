import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

//Bootstrap:
import 'bootstrap/dist/css/bootstrap.min.css'

// FontAwesome:
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser)
library.add(faSignOutAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// Components:
import LoginComponent from './pages/Login/LoginComponent'
import HomeComponent from './pages/Home/HomeComponent'
import FuncionariosComponent from './pages/Funcionarios/FuncionariosComponent'
import UploadComponent from './pages/Upload/UploadComponent'


Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'login', component: LoginComponent },
  { path: '/home', name: 'home', component: HomeComponent },
  { path: '/funcionarios', name: 'funcionarios', component: FuncionariosComponent },
  { path: '/upload', name: 'upload', component: UploadComponent }
]

const router = new VueRouter({
  routes  // short for `routes: routes`
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
