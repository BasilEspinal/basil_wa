import { createRouter, createWebHashHistory } from 'vue-router';

import AppLayout from '@/layout/AppLayout.vue';

import Landing from '@/views/pages/Landing.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: Landing,
        },
        {
            path: '/applayout',
            component: AppLayout,
            children: [
                {
                    path: '/applayout',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },

                {
                    path: '/landing',
                    name: 'landing',
                    component: () => import('@/views/pages/Landing.vue')
                },
                {
                    path: '/variants',
                    name: 'varieties',
                    component: () => import('@/views/pages/product/Varieties/Varieties.vue')
                },
                {
                    path: '/productvarieties',
                    name: 'productvarieties',
                    component: () => import('@/views/pages/product/ProductVarieties/ProductVarieties.vue')
                },

                {
                    path: '/products',
                    name: 'products',
                    component: () => import('@/views/pages/product/Products/Products.vue')
                },

                {
                    path: '/productTypes',
                    name: 'productTypes',
                    component: () => import('@/views/pages/product/ProductTypes/ProductTypes.vue')
                },

                {
                    path: '/packing_types',
                    name: 'packingtypes',
                    component: () => import('@/views/pages/product/PackingTypes/PackingTypes.vue')
                },

                {
                    path: '/unit_types',
                    name: 'unitTypes',
                    component: () => import('@/views/pages/product/UnitTypes/UnitTypes.vue')
                },


                {
                    path: '/companies',
                    name: 'companies',
                    component: () => import('@/views/pages/Managment/Company/Company.vue')
                },

                {
                    path: '/farms',
                    name: 'farms',
                    component: () => import('@/views/pages/Managment/Farms/Farms.vue')
                },

                {
                    path: '/JobTypes',
                    name: 'jobtypes',
                    component: () => import('@/views/pages/Managment/JobTypes/JobTypes.vue')
                },

                {
                    path: '/Workcenters',
                    name: 'workcenters',
                    component: () => import('@/views/pages/Managment/WorkCenters/WorkCenters.vue')
                },

                {
                    path: '/Employees',
                    name: 'employees',
                    component: () => import('@/views/pages/Managment/Employees/Employees.vue')
                },

                {
                    path: '/croplots',
                    name: 'cropslots',
                    component: () => import('@/views/pages/Production/CropLots/CropLots.vue')
                },


                {
                    path: '/Vehicles',
                    name: 'vehicles',
                    component: () => import('@/views/pages/Production/Vehicles/Vehicles.vue')
                },

                {
                    path: '/taskstarif',
                    name: 'taskstarif',
                    component: () => import('@/views/pages/Payroll/TasksTarif/TasksTarif.vue')
                },


                {
                    path: '/taskstypes',
                    name: 'taskstypes',
                    component: () => import('@/views/pages/Payroll/TasksTypes/TasksTypes.vue')
                },

                {
                    path: '/payperiods',
                    name: 'payperiods',
                    component: () => import('@/views/pages/Payroll/PaymentPeriods/PaymentPeriods.vue')
                },
                {
                    path: '/calendars',
                    name: 'calendars',
                    component: () => import('@/views/pages/Payroll/Calendars/Calendars.vue')
                },

                {
                    path: '/DailyPlanner',
                    name: 'dailyplanner',
                    component: () => import('@/views/pages/PayrollSettlement/DailyPlanner/DailyPlanner.vue')
                },

                {
                    path: '/WorkRegisterCorta',
                    name: 'workregistercorta',
                    component: () => import('@/views/pages/PayrollSettlement/WorkRegisterCorta/AreaMovementRegister.vue')
                },
                {
                    path: '/WorkRegisterSelection',
                    name: 'WorkRegisterSelection',
                    component: () => import('@/views/pages/PayrollSettlement/WorkRegisterSelection/DailyWorkRegistering.vue')
                },

                {
                    path: '/TransferTasks',
                    name: 'TransferTasks',
                    component: () => import('@/views/pages/PayrollSettlement/TransferTasks/TransfersTasks.vue')
                },

                {
                    path: '/DiscountRegistering',
                    name: 'DiscountRegistering',
                    component: () => import('@/views/pages/PayrollSettlement/DiscountRegistering/DiscountRegistering.vue')
                },

                {
                    path: '/Contractors',
                    name: 'contractors',
                    component: () => import('@/views/pages/PayrollSettlement/Contractors/EmployeeDailyWorkRegistering.vue')
                },

                

                {
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/pages/System/Users/PlatformUsers.vue')
                },

                
                {
                    path: '/roles',
                    name: 'roles',
                    component: () => import('@/views/pages/System/Roles/Roles.vue')
                },
                
                {
                    path: '/permissions',
                    name: 'permissions',
                    component: () => import('@/views/pages/System/Permissions/Permissions.vue')
                },

                {
                    path: '/statuses',
                    name: 'statuses',
                    component: () => import('@/views/pages/System/PlatformStatuses/PlatformRegisteringStatus.vue')
                },

                
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
        },
    ]
});

export default router;
