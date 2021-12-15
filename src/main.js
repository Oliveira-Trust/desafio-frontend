import Vue from 'vue'
import App from './App.vue'
import router from './router';
// components global
import ComponentRegistration from '@/utils/component-registration';
// css global
import '@/scss/core.scss';


ComponentRegistration();

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');