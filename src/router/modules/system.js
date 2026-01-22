export default [
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
    }
];
