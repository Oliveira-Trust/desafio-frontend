import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue"

Vue.use(VueRouter)

const mode = 'history'
const routes = [
    {path:'/', name:'Home', component: home},
]

export default new VueRouter({
    mode: mode,
    routes: routes
})
