import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("./components/Main.vue"),
        },

    ]
});

export default router;