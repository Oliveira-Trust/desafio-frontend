import HomeLayout from '@/layouts/HomeLayout'
import NotFound from '@/views/Errors/NotFound.vue'

const routes = [
    {
        path: '/',
        component: HomeLayout,
        redirect: 'home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/Home/index.vue'),
                name: 'Home',
                meta: { title: 'Home', auth: true }
            }
        ]
    },
    { path: '*', component: NotFound }
];

export default routes

