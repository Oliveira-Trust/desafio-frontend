import Vue from 'vue'
//import VueRouter from 'vue-router';
import App from './App.vue'
// import store from './store'

//Vue.use(VueRouter);

export function bootstrapVue(elementId) {
  new Vue({
    //VueRouter,
    // store,
    render: h => h(App)
  }).$mount(elementId)
}