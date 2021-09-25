import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/pt-br'
import '@/assets/scss/app.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import { methods } from '@/utils/methods'
import routes from '@/routes'
import store from '@/store'

Vue.use(VueRouter)
Vue.use(ElementUI, {
	locale
})
Vue.mixin({
	methods: methods
})

const router = new VueRouter({
	routes, // short for routes: routes
	linkActiveClass: 'active',
	scrollBehavior: (to) => {
		if (to.hash) {
			return {
				selector: to.hash
			}
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})



Vue.config.productionTip = false

new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
