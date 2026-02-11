export default [
    {
        path: '/Commercial/CustomersRequests/CustomersRequests',
        name: '/CustomersRequests',
        component: () => import('@/views/pages/Commercial/CustomersRequests/CustomersRequests.vue')
    },
    {
        path: '/Commercial/Delivery/Delivery',
        name: '/Delivery',
        component: () => import('@/views/pages/Commercial/Delivery/Delivery.vue')
    },
    {
        path: '/Commercial/ProductAvailability/ProductAvailability',
        name: '/ProductAvailability',
        component: () => import('@/views/pages/Commercial/ProductAvailability/ProductAvailability.vue')
    },
    {
        path: '/Commercial/Customers/Customers',
        name: 'Customers',
        component: () => import('@/views/pages/Commercial/Customers/Customers.vue')
    },
    {
        path: '/Commercial/Quotations/Quotations',
        name: 'Quotations',
        component: () => import('@/views/pages/Commercial/Quotations/Quotations.vue')
    }
];
