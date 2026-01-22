export default [
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
        path: '/production/LotsSchedule',
        name: 'LotsSchedule',
        component: () => import('@/views/pages/Production/LotsSchedule/LotsSchedule.vue')
    }
];
