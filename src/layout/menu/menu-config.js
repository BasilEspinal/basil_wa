export const getMenuConfig = (t) => [
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
                icon: 'pi pi-box',
                label: t('menu.product'),
                gate: 'producto_menu',
                items: [
                    {
                        label: t('menu.varieties'),
                        to: '/product/varieties',
                        icon: 'pi pi-tags',
                        gate: 'producto_variedades_menu'
                    },
                    {
                        icon: 'pi pi-box',
                        label: t('menu.products'),
                        to: '/product/products',
                        gate: 'producto_productos_menu'
                    },
                    {
                        label: t('menu.productTypes'),
                        icon: 'pi pi-list',
                        to: '/product/productTypes',
                        gate: 'producto_tiposdeproducto_menu'
                    },
                    {
                        label: t('menu.unitTypes'),
                        to: '/product/unit_types',
                        icon: 'pi pi-chart-bar',
                        gate: 'producto_tiposdeunidades_menu'
                    },
                    {
                        label: t('menu.packingTypes'),
                        to: '/product/packing_types',
                        icon: 'pi pi-inbox',
                        gate: 'producto_tiposdeempaque_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.commercial.name'),
                rol: 'admin',
                icon: 'pi pi-briefcase',
                gate: 'comercial_menu',
                items: [
                    {
                        label: t('menu.productOffers'),
                        to: '/Commercial/ProductAvailability/ProductAvailability',
                        icon: 'pi pi-percentage',
                        gate: 'comercial_ofertasdeproducto_menu'
                    },
                    {
                        label: t('menu.clientRequests'),
                        to: '/Commercial/CustomersRequests/CustomersRequests',
                        icon: 'pi pi-envelope',
                        gate: 'comercial_solicitudesdeclientes_menu'
                    },
                    {
                        label: t('menu.clients'),
                        to: '/Commercial/Customers/Customers',
                        icon: 'pi pi-users',
                        gate: 'comercial_clientes_menu'
                    },
                    {
                        label: t('menu.deliveries'),
                        to: '/Commercial/Delivery/Delivery',
                        icon: 'pi pi-truck',
                        gate: 'comercial_despachos_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.production.name'),
                rol: 'admin',
                icon: 'pi pi-cog',
                gate: 'produccion_menu',
                items: [
                    {
                        label: t('menu.cultivationLots'),
                        to: '/production/croplots',
                        icon: 'pi pi-microsoft',
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
                        icon: 'pi pi-calendar',
                        gate: 'produccion_programaciondelotes_menu'
                    },
                    {
                        label: t('menu.temperatureControl'),
                        to: '/production/TemperatureControl',
                        icon: 'pi pi-thermometer',
                        gate: ''
                    },
                    {
                        label: t('menu.meteoStation'),
                        to: '/production/MetereologicalStation',
                        icon: 'pi pi-cloud',
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
                icon: 'pi pi-wallet',
                gate: 'configuraciondepagos_menu',
                items: [
                    {
                        label: t('menu.paymentTypes'),
                        to: '/payrollsettings/PaymentTypes',
                        icon: 'pi pi-credit-card',
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
                        icon: 'pi pi-money-bill',
                        gate: 'configuraciondepagos_tarifasportarea_menu'
                    },
                    {
                        label: t('menu.workTypes'),
                        to: '/payrollsettings/donetypes',
                        icon: 'pi pi-check-square',
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
                        icon: 'pi pi-building',
                        gate: 'configuraciondepagos_centrosdetrabajo_menu'
                    },
                    {
                        label: t('menu.jobTypes'),
                        to: '/payrollsettings/Jobtypes',
                        icon: 'pi pi-briefcase',
                        gate: 'configuraciondepagos_cargos_menu'
                    },
                    {
                        label: t('menu.employees'),
                        to: '/payrollsettings/Employees',
                        icon: 'pi pi-id-card',
                        gate: 'configuraciondepagos_empleados_menu'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.payrollSettlement.title'),
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
                        label: t('menu.dailyTransactionsContractor'),
                        to: '/PayrollSettlement/DailyTransactionsContractor',
                        icon: 'pi pi-user-edit',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },
                    {
                        label: t('menu.dailyTransactions'),
                        to: '/PayrollSettlement/DailyTransactions',
                        icon: 'pi pi-wallet',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },

                    {
                        label: t('menu.payrollSettlement.JournalTransactions.title'),
                        to: '/PayrollSettlement/JournalTransactions',
                        icon: 'pi pi-book',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },
                    {
                        label: t('menu.payrollSettlement.LedgerTransactions.title'),
                        to: '/PayrollSettlement/LedgerTransactions',
                        icon: 'pi pi-database',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },

                    {
                        label: t('menu.shipping.shippingProcess'),
                        to: '/PayrollSettlement/ShippingProcess/ShippingProcess',
                        icon: 'pi pi-truck',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },

                    {
                        label: t('menu.transferToPrefrio'),
                        to: '/PayrollSettlement/TransferTasks',
                        icon: 'pi pi-sort-alt',
                        gate: 'liquidaciondenomina_trasladoaprefrio_menu'
                    },
                    {
                        label: t('menu.dailySettlement'),
                        to: '/PayrollSettlement/DailySettlement',
                        icon: 'pi pi-check-circle',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },
                    {
                        label: t('menu.employeeSummary'),
                        to: '/PayrollSettlement/EmployeesInformation',
                        icon: 'pi pi-users',
                        gate: 'liquidaciondenomina_planeaciondiaria_menu'
                    },
                    {
                        label: t('menu.periodSummary'),
                        to: '/PayrollSettlement/PaymentPeriodsInformation',
                        icon: 'pi pi-calendar-times',
                        gate: 'liquidaciondenomina_payment_periods_information_menu'
                    },
                    {
                        label: t('menu.payrollDiscounts'),
                        to: '/PayrollSettlement/DiscountRegistering',
                        icon: 'pi pi-percentage',
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
                        icon: 'pi pi-globe',
                        gate: 'administracion_empresa_menu'
                    },
                    {
                        label: t('menu.farms'),
                        to: '/admon/farms',
                        icon: 'pi pi-map',
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
                icon: 'pi pi-mobile',
                gate: 'appmovil_menu',
                items: [
                    {
                        label: t('menu.dataCapture'),
                        to: '/AppMovil/General',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_data_capture'
                    },
                    {
                        label: t('menu.contractorCapture'),
                        to: '/AppMovil/Contractor',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_contratista_menu'
                    },
                    {
                        label: t('appmovil.shipping.shippingProcess'),
                        to: '/AppMovil/Corta/Envios',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_shipping_process_envio'
                    },
                    {
                        label: t('appmovil.shipping.deliveryProcess'),
                        to: '/AppMovil/Corta/Recibidos',
                        icon: 'pi pi-mobile',
                        gate: 'appmovil_shipping_process_recibido'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: t('menu.template'),
                rol: 'admin',
                icon: 'pi pi-desktop',
                gate: 'appmovil_agronomia_menu',
                items: [
                    {
                        label: t('menu.template'),
                        to: '/pages/template',
                        icon: 'pi pi-file',
                        gate: 'appmovil_agronomia_menu'
                    }
                ]
            }
        ]
    }
];
