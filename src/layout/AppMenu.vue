<script setup>
import { ref, onBeforeMount } from 'vue';
import { computed } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import ability from '@/service/ability.js';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const {
    getAllResponseAPI,
    getAllResponsePermissionsAPI,
    
} = useDataAPI();

//This is the model that will be used to create the menu
// const model2 = ref([
//     {
//         items: [
//             {
//                 label: 'Dashboards',
//                 gate: 'monitor_menu',
//                 items: [
//                     {
//                         label: 'Centro de control',
//                         icon: 'pi pi-fw pi-home',
//                         to: '/applayout',
//                         gate: 'monitor_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 rol: 'admin',
//                 icon: 'pi pi-desktop',
//                 label: 'Monitor Online',
//                 gate: 'monitor_corta_menu',
//                 items: [
//                     {
//                         label: '10 de Mejor Rendimiento',
//                         icon: 'pi pi-fw pi-table',
//                         to: '/monitorCorta',
//                         gate: 'monitor_corta_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 rol: 'admin',
//                 icon: 'pi pi-bars',
//                 label: 'Producto',
//                 gate: 'producto_menu',
//                 items: [
//                     {
//                         label: 'Variedades',
//                         to: '/product/varieties',
//                         icon: 'pi pi-th-large',
//                         gate: 'producto_variedades_menu'
//                     },
//                     {
//                         icon: 'pi pi-bars',
//                         label: 'Productos',
//                         to: '/product/products',
//                         gate: 'producto_productos_menu'
//                     },
//                     // {
//                     //     label: 'No-En-Uso-Variedades de producto',
//                     //     to: '/product/productvarieties',
//                     //     icon: 'pi pi-list',
//                     //     gate: 'producto_variedadesdeproducto_menu',
//                     // },
//                     {
//                         label: 'Tipos de productos',
//                         icon: 'pi pi-bookmark',
//                         to: '/product/productTypes',
//                         gate: 'producto_tiposdeproducto_menu'
//                     },
//                     {
//                         label: 'Tipos de Unidades',
//                         to: '/product/unit_types',
//                         icon: 'pi pi-bookmark',
//                         gate: 'producto_tiposdeunidades_menu'
//                     },
//                     {
//                         label: 'Tipos de Empaque',
//                         to: '/product/packing_types',
//                         icon: 'pi pi-bookmark',
//                         gate: 'producto_tiposdeempaque_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Comercial',
//                 rol: 'admin',
//                 icon: 'pi pi-sitemap',
//                 gate: 'comercial_menu',
//                 items: [
//                     {
//                         label: 'Ofertas de producto',
//                         to: '/Commercial/ProductAvailability/ProductAvailability',
//                         icon: 'pi pi-folder',
//                         gate: 'comercial_ofertasdeproducto_menu'
//                     },
//                     {
//                         label: 'Solicitudes de Clientes',
//                         to: '/Commercial/CustomersRequests/CustomersRequests',
//                         icon: 'pi pi-bookmark',
//                         gate: 'comercial_solicitudesdeclientes_menu,'
//                     },
//                     {
//                         label: 'Clientes',
//                         to: '/Commercial/Customers/Customers',
//                         icon: 'pi pi-bookmark',
//                         gate: 'comercial_clientes_menu,'
//                     },
//                     {
//                         label: 'Despachos',
//                         to: '/Commercial/Delivery/Delivery',
//                         icon: 'pi pi-bolt',
//                         gate: 'comercial_despachos_menu,'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Producción',
//                 rol: 'admin',
//                 icon: 'pi pi-shopping-cart',
//                 gate: 'produccion_menu',
//                 items: [
//                     {
//                         label: 'Lotes para Cultivo ',
//                         to: '/production/croplots',
//                         icon: 'pi pi-bars',
//                         gate: 'produccion_lotesparacultivo_menu'
//                     },
//                     {
//                         label: 'Vehículos',
//                         to: '/production/vehicles',
//                         icon: 'pi pi-car',
//                         gate: 'produccion_vehiculos_menu,'
//                     },
//                     {
//                         label: 'Programación de Lotes',
//                         to: '/production/LotsSchedule',
//                         icon: 'pi pi-calendar-minus',
//                         gate: 'produccion_programaciondelotes_menu'
//                     },
//                     {
//                         label: 'Control de temperatura',
//                         to: '/production/TemperatureControl',
//                         icon: 'pi pi-calendar-minus',
//                         gate: ''
//                     },
//                     {
//                         label: 'Estación metereológica',
//                         to: '/production/MetereologicalStation',
//                         icon: 'pi pi-calendar-minus',
//                         gate: ''
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Configuración de Pagos',
//                 rol: 'admin',
//                 icon: 'pi pi-dollar',
//                 gate: 'configuraciondepagos_menu',
//                 items: [
//                     {
//                         label: 'Tipos de Pago',
//                         to: '/payrollsettings/PaymentTypes',
//                         icon: 'pi pi-tablet',
//                         gate: 'configuraciondepagos_tiposdepago_menu'
//                     },
//                     {
//                         label: 'Tipos de Tareas',
//                         to: '/payrollsettings/taskstypes',
//                         icon: 'pi pi-list',
//                         gate: 'configuraciondetiposdetareas_menu'
//                     },
//                     {
//                         label: 'Tarifas por Tareas',
//                         to: '/payrollsettings/taskstarif',
//                         icon: 'pi pi-bookmark',
//                         gate: 'configuraciondepagos_tarifasportarea_menu,'
//                     },
//                     {
//                         label: 'Tipos de Labores',
//                         to: '/payrollsettings/donetypes',
//                         icon: 'pi pi-list',
//                         gate: 'configuraciondetiposdetareas_menu'
//                     },
//                     // {
//                     //     label: 'Tipos de trabajo',
//                     //     to: '/payrollsettings/jobtypes/',
//                     //     icon: 'pi pi-list',
//                     //     gate: 'configuraciondetiposdetareas_menu',
//                     // },
//                     {
//                         label: 'Tarifas por Labores',
//                         to: '/payrollsettings/workstarif',
//                         icon: 'pi pi-briefcase',
//                         gate: 'configuraciondepagos_tarifasporlabores_menu'
//                     },
//                     {
//                         label: 'Periodos de Pago',
//                         to: '/payrollsettings/payperiods',
//                         icon: 'pi pi-calendar-plus',
//                         gate: 'configuraciondepagos_periodosdepago_menu,'
//                     },
//                     {
//                         label: 'Calendarios',
//                         to: '/payrollsettings/calendars',
//                         icon: 'pi pi-calendar-times',
//                         gate: 'configuraciondepagos_calendarios_menu'
//                     },

//                     {
//                         label: 'Centros de Trabajo',
//                         to: '/payrollsettings/Workcenters',
//                         icon: 'pi pi-bookmark',
//                         gate: 'configuraciondepagos_centrosdetrabajo_menu'
//                     },
//                     {
//                         label: 'Cargos',
//                         to: '/payrollsettings/Jobtypes',
//                         icon: 'pi pi-bolt',
//                         gate: 'configuraciondepagos_cargos_menu'
//                     },
//                     {
//                         label: 'Empleados',
//                         to: '/payrollsettings/Employees',
//                         icon: 'pi pi-users',
//                         gate: 'configuraciondepagos_empleados_menu,'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Liquidacion de nómina',
//                 rol: 'admin',
//                 icon: 'pi pi-money-bill',
//                 gate: 'liquidacion_nomina_menu',
//                 items: [
//                     {
//                         label: 'Planeación Diaria',
//                         to: '/PayrollSettlement/DailyPlanner',
//                         icon: 'pi pi-tablet',
//                         gate: 'liquidaciondenomina_planeaciondiaria_menu'
//                     },
//                     {
//                         label: 'Transacciones del dia',
//                         to: '/PayrollSettlement/DailyTransactions',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_transacciones_diarias_menu'
//                     },
//                     {
//                         label: 'Shipping',
//                         to: '/PayrollSettlement/Shipping/Dispatching',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_transacciones_diarias_menu'
//                     },

//                     // {
//                     //     label: 'Trabajos de Corta',
//                     //     to: '/PayrollSettlement/WorkRegisterCorta',
//                     //     icon: 'pi pi-percentage',
//                     //     gate: 'liquidaciondenomina_trabajosdecorta_menu'
//                     // },
//                     {
//                         label: 'Traslado a Prefrio',
//                         to: '/PayrollSettlement/TransferTasks',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_trasladoaprefrio_menu'
//                     },

//                     {
//                         label: 'Liquidación Diaria',
//                         to: '/PayrollSettlement/DailySettlement',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_liquidacion_diaria_menu'
//                     },


//                     {
//                         label: 'Resumen de empleados',
//                         to: '/PayrollSettlement/EmployeesInformation',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_employees_information_menu'
//                     },

//                     {
//                         label: 'Resumen de periodo',
//                         to: '/PayrollSettlement/PaymentPeriodsInformation',
//                         icon: 'pi pi-bookmark',
//                         gate: 'liquidaciondenomina_payment_periods_information_menu'
//                     },
//                     // {
//                     //     label: 'Trabajos de Selección',
//                     //     to: '/PayrollSettlement/WorkRegisterSelection',
//                     //     icon: 'pi pi-tablet',
//                     //     gate: 'liquidaciondenomina_trabajosdeseleccion_menu'
//                     // },
//                     // {
//                     //     label: 'Trabajos de Contratistas',
//                     //     to: '/PayrollSettlement/WorkRegisterDaily',
//                     //     icon: 'pi pi-share-alt',
//                     //     gate: 'liquidaciondenomina_laboresdecontratista_menu'
//                     // },

//                     {
//                         label: 'Descuentos de Nómina',
//                         to: '/PayrollSettlement/DiscountRegistering',
//                         icon: 'pi pi-ticket',
//                         gate: 'liquidaciondenomina_descuentosdenomina_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Administración',
//                 rol: 'admin',
//                 icon: 'pi pi-prime',
//                 gate: 'administracion_menu',
//                 items: [
//                     {
//                         label: 'Empresa',
//                         to: '/admon/companies',
//                         icon: 'pi pi-folder',
//                         gate: 'administracion_empresa_menu'
//                     },
//                     {
//                         label: 'Fincas',
//                         to: '/admon/farms',
//                         icon: 'pi pi-bookmark',
//                         gate: 'administracion_fincas_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'Sistema',
//                 rol: 'admin',
//                 icon: 'pi pi-desktop',
//                 gate: 'sistema_menu',
//                 items: [
//                     {
//                         label: 'Usuarios',
//                         to: '/system/Users',
//                         icon: 'pi pi-id-card',
//                         gate: 'sistema_usuarios_menu'
//                     },
//                     {
//                         label: 'Roles',
//                         to: '/system/roles',
//                         icon: 'pi pi-user-plus',
//                         gate: 'sistema_roles_menu'
//                     },
//                     {
//                         label: 'Permisos',
//                         to: '/system/permissions',
//                         icon: 'pi pi-eye-slash',
//                         gate: 'sistema_permisos_menu'
//                     },
//                     {
//                         label: 'Estado de Registros',
//                         to: '/system/statuses',
//                         icon: 'pi pi-bell',
//                         gate: 'sistema_estadoderegistros_menu'
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         items: [
//             {
//                 label: 'App Movil',
//                 rol: 'admin',
//                 icon: 'pi pi-box',
//                 gate: 'appmovil_menu',
//                 items: [
//                     {
//                         label: 'Captura de datos',
//                         to: '/AppMovil/General',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_data_capture'
//                     },
//                     {
//                         label: 'Captura de corta',
//                         to: '/AppMovil/Corta',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_corta_menu'
//                     },
//                     {
//                         label: 'Captura de Prefio',
//                         to: '/AppMovil/PreFrio',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_prefrio_menu'
//                     },
//                     {
//                         label: 'Captura de Seleccion',
//                         to: '/AppMovil/Seleccion',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_prefrio_menu'
//                     },
//                     {
//                         label: 'Captura de Contratista',
//                         to: '/AppMovil/Contractor',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_contratista_menu'
//                     },
//                     {
//                         label: 'Captura de Agronomìa',
//                         to: '/AppMovil/Agronomo',
//                         icon: 'pi pi-mobile',
//                         gate: 'appmovil_agronomia_menu'
//                     }
//                 ]
//             }
//         ]
//     }
// ]);

const model2 = computed(() => ([
    {
        items: [
            {
                label: t('menu.dashboards'),
                gate: 'monitor_menu',
                items: [
                    {
                        label: t('menu.controlCenter'),
                        icon: 'pi pi-fw pi-home',
                        to: '/applayout',
                        gate: 'monitor_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                rol: 'admin',
                icon: 'pi pi-desktop',
                label: t('menu.monitorOnline'),
                gate: 'monitor_corta_menu',
                items: [
                    {
                        label: t('menu.top10Performance'),
                        icon: 'pi pi-fw pi-table',
                        to: '/monitorCorta',
                        gate: 'monitor_corta_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                rol: 'admin',
                icon: 'pi pi-bars',
                label: t('menu.product'),
                gate: 'producto_menu',
                items: [
                    {
                        label: t('menu.varieties'),
                        to: '/product/varieties',
                        icon: 'pi pi-th-large',
                        gate: 'producto_variedades_menu'
                    },
                    {
                        icon: 'pi pi-bars',
                        label: t('menu.products'),
                        to: '/product/products',
                        gate: 'producto_productos_menu'
                    },
                    {
                        label: t('menu.productTypes'),
                        icon: 'pi pi-bookmark',
                        to: '/product/productTypes',
                        gate: 'producto_tiposdeproducto_menu'
                    },
                    {
                        label: t('menu.unitTypes'),
                        to: '/product/unit_types',
                        icon: 'pi pi-bookmark',
                        gate: 'producto_tiposdeunidades_menu'
                    },
                    {
                        label: t('menu.packingTypes'),
                        to: '/product/packing_types',
                        icon: 'pi pi-bookmark',
                        gate: 'producto_tiposdeempaque_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.commercial'),
                rol: 'admin',
                icon: 'pi pi-sitemap',
                gate: 'comercial_menu',
                items: [
                    {
                        label: t('menu.productOffers'),
                        to: '/Commercial/ProductAvailability/ProductAvailability',
                        icon: 'pi pi-folder',
                        gate: 'comercial_ofertasdeproducto_menu'
                    },
                    {
                        label: t('menu.clientRequests'),
                        to: '/Commercial/CustomersRequests/CustomersRequests',
                        icon: 'pi pi-bookmark',
                        gate: 'comercial_solicitudesdeclientes_menu'
                    },
                    {
                        label: t('menu.clients'),
                        to: '/Commercial/Customers/Customers',
                        icon: 'pi pi-bookmark',
                        gate: 'comercial_clientes_menu'
                    },
                    {
                        label: t('menu.deliveries'),
                        to: '/Commercial/Delivery/Delivery',
                        icon: 'pi pi-bolt',
                        gate: 'comercial_despachos_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.production'),
                rol: 'admin',
                icon: 'pi pi-shopping-cart',
                gate: 'produccion_menu',
                items: [
                    {
                        label: t('menu.cultivationLots'),
                        to: '/production/croplots',
                        icon: 'pi pi-bars',
                        gate: 'produccion_lotesparacultivo_menu'
                    },
                    {
                        label: t('menu.vehicles'),
                        to: '/production/vehicles',
                        icon: 'pi pi-car',
                        gate: 'produccion_vehiculos_menu'
                    },
                    {
                        label: t('menu.lotScheduling'),
                        to: '/production/LotsSchedule',
                        icon: 'pi pi-calendar-minus',
                        gate: 'produccion_programaciondelotes_menu'
                    },
                    {
                        label: t('menu.temperatureControl'),
                        to: '/production/TemperatureControl',
                        icon: 'pi pi-calendar-minus',
                        gate: ''
                    },
                    {
                        label: t('menu.meteoStation'),
                        to: '/production/MetereologicalStation',
                        icon: 'pi pi-calendar-minus',
                        gate: ''
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.paymentSettings'),
                rol: 'admin',
                icon: 'pi pi-dollar',
                gate: 'configuraciondepagos_menu',
                items: [
                    {
                        label: t('menu.paymentTypes'),
                        to: '/payrollsettings/PaymentTypes',
                        icon: 'pi pi-tablet',
                        gate: 'configuraciondepagos_tiposdepago_menu'
                    },
                    {
                        label: t('menu.taskTypes'),
                        to: '/payrollsettings/taskstypes',
                        icon: 'pi pi-list',
                        gate: 'configuraciondetiposdetareas_menu'
                    },
                    {
                        label: t('menu.taskRates'),
                        to: '/payrollsettings/taskstarif',
                        icon: 'pi pi-bookmark',
                        gate: 'configuraciondepagos_tarifasportarea_menu'
                    },
                    {
                        label: t('menu.workTypes'),
                        to: '/payrollsettings/donetypes',
                        icon: 'pi pi-list',
                        gate: 'configuraciondetiposdetareas_menu'
                    },
                    {
                        label: t('menu.laborRates'),
                        to: '/payrollsettings/workstarif',
                        icon: 'pi pi-briefcase',
                        gate: 'configuraciondepagos_tarifasporlabores_menu'
                    },
                    {
                        label: t('menu.payPeriods'),
                        to: '/payrollsettings/payperiods',
                        icon: 'pi pi-calendar-plus',
                        gate: 'configuraciondepagos_periodosdepago_menu'
                    },
                    {
                        label: t('menu.calendars'),
                        to: '/payrollsettings/calendars',
                        icon: 'pi pi-calendar-times',
                        gate: 'configuraciondepagos_calendarios_menu'
                    },
                    {
                        label: t('menu.workCenters'),
                        to: '/payrollsettings/Workcenters',
                        icon: 'pi pi-bookmark',
                        gate: 'configuraciondepagos_centrosdetrabajo_menu'
                    },
                    {
                        label: t('menu.jobTypes'),
                        to: '/payrollsettings/Jobtypes',
                        icon: 'pi pi-bolt',
                        gate: 'configuraciondepagos_cargos_menu'
                    },
                    {
                        label: t('menu.employees'),
                        to: '/payrollsettings/Employees',
                        icon: 'pi pi-users',
                        gate: 'configuraciondepagos_empleados_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.payrollSettlement'),
                rol: 'admin',
                icon: 'pi pi-money-bill',
                gate: 'liquidacion_nomina_menu',
                items: [
                    {
                        label: t('menu.dailyPlanning'),
                        to: '/PayrollSettlement/DailyPlanner',
                        icon: 'pi pi-tablet',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },
                    {
                        label: t('menu.dailyTransactions'),
                        to: '/PayrollSettlement/DailyTransactions',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_transacciones_diarias_menu'
                    },
                    {
                        label: t('menu.shipping'),
                        to: '/PayrollSettlement/ShippingProcess/ShippingProcess',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_transacciones_diarias_menu'
                    },
                    {
                        label: t('menu.transferToPrefrio'),
                        to: '/PayrollSettlement/TransferTasks',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_trasladoaprefrio_menu'
                    },
                    {
                        label: t('menu.dailySettlement'),
                        to: '/PayrollSettlement/DailySettlement',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_liquidacion_diaria_menu'
                    },
                    {
                        label: t('menu.employeeSummary'),
                        to: '/PayrollSettlement/EmployeesInformation',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_employees_information_menu'
                    },
                    {
                        label: t('menu.periodSummary'),
                        to: '/PayrollSettlement/PaymentPeriodsInformation',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidaciondenomina_payment_periods_information_menu'
                    },
                    {
                        label: t('menu.payrollDiscounts'),
                        to: '/PayrollSettlement/DiscountRegistering',
                        icon: 'pi pi-ticket',
                        gate: 'liquidaciondenomina_descuentosdenomina_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.admin'),
                rol: 'admin',
                icon: 'pi pi-prime',
                gate: 'administracion_menu',
                items: [
                    {
                        label: t('menu.company'),
                        to: '/admon/companies',
                        icon: 'pi pi-folder',
                        gate: 'administracion_empresa_menu'
                    },
                    {
                        label: t('menu.farms'),
                        to: '/admon/farms',
                        icon: 'pi pi-bookmark',
                        gate: 'administracion_fincas_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.system'),
                rol: 'admin',
                icon: 'pi pi-desktop',
                gate: 'sistema_menu',
                items: [
                    {
                        label: t('menu.users'),
                        to: '/system/Users',
                        icon: 'pi pi-id-card',
                        gate: 'sistema_usuarios_menu'
                    },
                    {
                        label: t('menu.roles'),
                        to: '/system/roles',
                        icon: 'pi pi-user-plus',
                        gate: 'sistema_roles_menu'
                    },
                    {
                        label: t('menu.permissions'),
                        to: '/system/permissions',
                        icon: 'pi pi-eye-slash',
                        gate: 'sistema_permisos_menu'
                    },
                    {
                        label: t('menu.recordStatus'),
                        to: '/system/statuses',
                        icon: 'pi pi-bell',
                        gate: 'sistema_estadoderegistros_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.mobileApp'),
                rol: 'admin',
                icon: 'pi pi-box',
                gate: 'appmovil_menu',
                items: [
                    {
                        label: t('menu.dataCapture'),
                        to: '/AppMovil/General',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_data_capture'
                    },
                    {
                        label: t('menu.cortaCapture'),
                        to: '/AppMovil/Corta',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_corta_menu'
                    },
                    {
                        label: t('menu.preFrioCapture'),
                        to: '/AppMovil/PreFrio',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_prefrio_menu'
                    },
                    {
                        label: t('menu.selectionCapture'),
                        to: '/AppMovil/Seleccion',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_seleccion_menu'
                    },
                    {
                        label: t('menu.contractorCapture'),
                        to: '/AppMovil/Contractor',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_contratista_menu'
                    },
                    {
                        label: t('menu.agronomyCapture'),
                        to: '/AppMovil/Agronomo',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_agronomia_menu'
                    }
                ]
            }
        ]
    }
]));

onBeforeMount(() => {
    fetchInfoAndUpdateValue();
});

async function fetchInfoAndUpdateValue() {
    try {
        await getAllResponsePermissionsAPI('/abilities');
    } catch (error) {
        console.error('Error:', error);
    }
}
</script>

<!-- <template>
    <app-menu-item :model="oldModel" />
</template> -->
<template>
    <ul class="layout-menu">
        <div v-for="item in model2" :key="item.label">
            <!-- <p>{{ item.label }}</p> -->
            <div v-for="nestedItem in item.items" :key="nestedItem.label">
                <!-- <p>{{ nestedItem.label }} - Gate: {{ nestedItem.gate }}</p> -->
            </div>
        </div>
        <template v-for="(item, i) in model2" :key="item">
            <!-- <div class="card"> -->
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
            <!-- </div> -->
        </template>
    </ul>
</template>
<style lang="scss" scoped></style>
