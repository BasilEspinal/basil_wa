export default [
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
    }
];
