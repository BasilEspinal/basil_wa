export default [
    {
        path: '/AppMovil/General',
        name: 'captura de datos',
        component: () => import('@/views/pages/AppMovil/WorkAreaSelector.vue')
    },
    {
        path: '/AppMovil/Corta',
        name: 'appmovil_corta',
        component: () => import('@/views/pages/AppMovil/Corta/AppMovilCorta.vue')
    },
    {
        path: '/AppMovil/Corta/Envios',
        name: 'appmovil_corta_envios',
        component: () => import('@/views/pages/AppMovil/Information/Shippings_appmovil.vue')
    },
    {
        path: '/AppMovil/Corta/Recibidos',
        name: 'appmovil_corta_recibidos',
        component: () => import('@/views/pages/AppMovil/Information/Receivings_appmovil.vue')
    },
    {
        path: '/AppMovil/Contractor',
        name: 'appmovil_contractor',
        component: () => import('@/views/pages/AppMovil/Contractor/AppMovilContractor.vue')
    }
];
