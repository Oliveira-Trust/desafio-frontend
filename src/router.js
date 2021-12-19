import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import("./layouts/default.vue"),
            meta: { requireAuth: false }, // validação de autenticação
            children: [
                {
                    path: '/',
                    name: 'App',
                    component: () => import(/* webpackChunkName: "Dashboard" */ '@/views/dashboard'),
                },

            ]
        },

    ]
});

export default router;