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
                {
                    path: '/product/varieties',
                    name: 'varieties',
                    component: () => import('@/views/pages/product/Varieties/Varieties.vue')
                },
                {
                    path: '/product/productvarieties',
                    name: 'productvarieties',
                    component: () => import('@/views/pages/product/ProductVarieties/ProductVarieties.vue')
                },

                {
                    path: '/product/products',
                    name: 'products',
                    component: () => import('@/views/pages/product/Products/Products.vue')
                },

                {
                    path: '/product/productTypes',
                    name: 'productTypes',
                    component: () => import('@/views/pages/product/ProductTypes/ProductTypes.vue')
                },

                {
                    path: '/product/packing_types',
                    name: 'packingtypes',
                    component: () => import('@/views/pages/product/PackingTypes/PackingTypes.vue')
                },

                {
                    path: '/product/unit_types',
                    name: 'unitTypes',
                    component: () => import('@/views/pages/product/UnitTypes/UnitTypes.vue')
                },
               
                {
                    path: '/payrollsettings/PaymentTypes',
                    name: 'PaymentTypes',
                    component: () => import('@/views/pages/PayrollSettings/PaymentType/PaymentType.vue')
                },
                {
                    path: '/payrollsettings/taskstarif',
                    name: 'taskstarif',
                    component: () => import('@/views/pages/PayrollSettings/TasksTarif/TasksTarif.vue')
                },


                {
                    path: '/payrollsettings/taskstypes',
                    name: 'taskstypes',
                    component: () => import('@/views/pages/PayrollSettings/TasksTypes/TasksTypes.vue')
                },

                {
                    path: '/payrollsettings/payperiods',
                    name: 'payperiods',
                    component: () => import('@/views/pages/PayrollSettings/PaymentPeriods/PaymentPeriods.vue')
                },
                {
                    path: '/payrollsettings/calendars',
                    name: 'calendars',
                    component: () => import('@/views/pages/PayrollSettings/Calendars/Calendars.vue')
                },
                {
                    path: '/payrollsettings/JobTypes',
                    name: 'jobtypes',
                    component: () => import('@/views/pages/PayrollSettings/JobTypes/JobTypes.vue')
                },
                {
                    path: '/payrollsettings/workstarif',
                    name: 'contractors',
                    component: () => import('@/views/pages/PayrollSettings/WorksTarif/WorksTarif.vue')
                },
                {
                    path: '/payrollsettings/Workcenters',
                    name: 'workcenters',
                    component: () => import('@/views/pages/PayrollSettings/WorkCenters/WorkCenters.vue')
                },

                {
                    path: '/payrollsettings/Employees',
                    name: 'employees',
                    component: () => import('@/views/pages/PayrollSettings/Employees/Employees.vue')
                },

                {
                    path: '/production/croplots',
                    name: 'cropslots',
                    component: () => import('@/views/pages/Production/CropLots/CropLots.vue')
                },


                {
                    path: '/production/Vehicles',
                    name: 'vehicles',
                    component: () => import('@/views/pages/Production/Vehicles/Vehicles.vue')
                },
                {
                    path: '/production/TemperatureControl',
                    name: 'temperature',
                    component: () => import('@/views/pages/Production/TemperatureControl/temperatureControl.vue')
                },
                {
                    path: '/production/MetereologicalStation',
                    name: 'metereological',
                    component: () => import('@/views/pages/Production/MetereologicalStation/metereologicalStation.vue')
                },
                {
                    path: '/PayrollSettlement/DailyPlanner',
                    name: 'dailyplanner',
                    component: () => import('@/views/pages/PayrollSettlement/DailyPlanner/DailyPlanner.vue')
                },

                {
                    path: '/PayrollSettlement/WorkRegisterCorta',
                    name: 'workregistercorta',
                    component: () => import('@/views/pages/PayrollSettlement/WorkRegisterCorta/AreaMovementRegister.vue')
                },
                {
                    path: '/PayrollSettlement/WorkRegisterSelection',
                    name: 'WorkRegisterSelection',
                    component: () => import('@/views/pages/PayrollSettlement/WorkRegisterSelection/DailyWorkRegistering.vue')
                },

                {
                    path: '/PayrollSettlement/TransferTasks',
                    name: 'TransferTasks',
                    component: () => import('@/views/pages/PayrollSettlement/TransferTasks/TransfersTasks.vue')
                },

                {
                    path: '/PayrollSettlement/DiscountRegistering',
                    name: 'DiscountRegistering',
                    component: () => import('@/views/pages/PayrollSettlement/DiscountRegistering/DiscountRegistering.vue')
                },
                {
                    path: '/PayrollSettlement/WorkRegisterDaily',
                    name: 'WorkRegisterDaily',
                    component: () => import('@/views/pages/PayrollSettlement/WorkRegisterDaily/EmployeeDailyWork.vue')
                },
                
                {
                    path: '/Commercial/CustomersRequests/CustomersRequests',
                    name: '/CustomersRequests',
                    component: () => import('@/views/pages/Commercial/CustomersRequests/CustomersRequests.vue')
                },

                {
                    path: '/Commercial/Customers/Customers',
                    name: 'Customers',
                    component: () => import('@/views/pages/Commercial/Customers/Customers.vue')
                },
                {
                    path: '/admon/companies',
                    name: 'companies',
                    component: () => import('@/views/pages/Managment/Company/Company.vue')
                },

                {
                    path: '/admon/farms',
                    name: 'farms',
                    component: () => import('@/views/pages/Managment/Farms/Farms.vue')
                },
                {
                    path: '/system/users',
                    name: 'users',
                    component: () => import('@/views/pages/System/Users/PlatformUsers.vue')
                },

                
                {
                    path: '/system/roles',
                    name: 'roles',
                    component: () => import('@/views/pages/System/Roles/Roles.vue')
                },
                
                {
                    path: '/system/permissions',
                    name: 'permissions',
                    component: () => import('@/views/pages/System/Permissions/Permissions.vue')
                },

                {
                    path: '/system/statuses',
                    name: 'statuses',
                    component: () => import('@/views/pages/System/PlatformStatuses/PlatformRegisteringStatus.vue')
                },

                {
                    path: '/AppMovil/Corta',
                    name: 'appmovil_corta',
                    component: () => import('@/views/pages/AppMovil/AppMovilCorta.vue')
                },
                {
                    path: '/AppMovil/PreFrio',
                    name: 'appmovil_prefio',
                    component: () => import('@/views/pages/AppMovil/AppMovilPreFrio.vue')
                },
                {
                    path: '/AppMovil/Seleccion',
                    name: 'appmovil_seleccion',
                    component: () => import('@/views/pages/AppMovil/AppMovilSeleccion.vue')
                },
                {
                    path: '/AppMovil/Contractor',
                    name: 'appmovil_contractor',
                    component: () => import('@/views/pages/AppMovil/AppMovilContractor.vue')
                },
                {
                    path: '/AppMovil/Agronomo',
                    name: 'appmovil_agronomo',
                    component: () => import('@/views/pages/AppMovil/AppMovilAgronomo.vue')
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
