import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import Landing from '@/views/pages/Landing.vue';

// Import domain modules
import commercialRoutes from './modules/commercial';
import productionRoutes from './modules/production';
import payrollRoutes from './modules/payroll';
import productRoutes from './modules/product';
import systemRoutes from './modules/system';
import appMovilRoutes from './modules/appMovil';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Landing
        },
        {
            path: '/applayout',
            component: AppLayout,
            children: [
                {
                    path: '/pages/template',
                    name: 'template',
                    component: () => import('@/views/pages/template/V3/Agroonline_v3.vue')
                },
                {
                    path: '/applayout',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard/Dashboard.vue')
                },
                {
                    path: '/monitorCorta',
                    name: 'monit_corta',
                    component: () => import('@/views/Dashboard/Dashboard_Daily.vue')
                },
                {
                    path: '/landing',
                    name: 'landing',
                    component: () => import('@/views/pages/Landing.vue')
                },

                // Domain Modules
                ...productRoutes,
                ...payrollRoutes,
                ...productionRoutes,
                ...commercialRoutes,
                ...systemRoutes,
                ...appMovilRoutes
            ]
        },
        {
            path: '/pages/crud',
            name: 'crud',
            component: () => import('@/views/pages/template/Crud.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        }
    ]
});

export default router;
