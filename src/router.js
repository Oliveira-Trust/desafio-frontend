import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);
const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            component: () => import("./layouts/Default.vue"),
            meta: { requireAuth: false }, // validação de autenticação
            children: [
                {
                    path: '/',
                    name: 'App',
                    component: () => import(/* webpackChunkName: "Login" */ '@/App.vue'),
                },
                // {
                //     path: '/login',
                //     name: 'Login',
                //     component: () => import(/* webpackChunkName: "Login" */ '@/views/Login.vue'),
                // },
                // {
                //     path: '/register',
                //     name: 'Register',
                //     component: () => import(/* webpackChunkName: "Login" */ '@/views/Register.vue'),
                // },

            ]
        },
        {
            path: "/",
            component: () => import("./layouts/Default.vue"),
            meta: { requireAuth: true }, // validação de autenticação
            children: [
                // {
                //     path: "/dashboard",
                //     name: "Dashboard",
                //     component: () => import("@/views/Home.vue"),
                // },
            ]
        },

    ]
});

export default router;