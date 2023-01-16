import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue"

Vue.use(VueRouter)

const routes = [
    {path:'/', name:'Home', component: home},
]
const mode = 'history'

export default new VueRouter({
    mode,
    routes
})
