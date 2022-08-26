import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

const Home = () => import("../views/Home");

const routes = [
  {
    path: "/",
    component: Home,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
