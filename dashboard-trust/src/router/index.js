import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: { name: "Login" },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/dashboard",
    name: "Home",
    component: Home,
    meta: {
      login: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  },
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.login)) {
    if (
      window.localStorage.user !== "cabralwd@icloud.com" &&
      window.localStorage.password !== "123"
    ) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
