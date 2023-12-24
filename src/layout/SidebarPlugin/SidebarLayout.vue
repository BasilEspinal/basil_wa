<script>
export default {
    data() {
        return {
            sidebarLinks: [
                {
                    title: 'Inicio',
                    icon: '',
                    to: '/applayout',
                    children: [
                        {
                            title: 'Centro de control',
                            icon: 'pi pi-fw pi-home',
                            to: '/applayout'
                        }
                    ]
                },
                {
                    title: 'Monitor Online',
                    icon: 'pi pi-desktop',
                    to: '',
                    children: [{ title: 'Corta', icon: 'pi pi-fw pi-table', to: '/corta' }]
                },
                {
                    title: 'Producto',
                    icon: 'pi pi-bars',
                    to: '/product/products',
                    gate: 'producto_listado',
                    children: [
                        {
                            title: 'Variedades',
                            icon: 'pi pi-th-large',
                            to: '/product/varieties',
                            gate: 'variante_listado'
                        },
                        {
                            title: 'Productos',
                            icon: 'pi pi-bars',
                            to: '/product/products',
                            gate: 'producto_listado'
                        },
                        {
                            title: 'Variedades de producto',
                            icon: 'pi pi-list',
                            to: '/product/productvarieties'
                        },
                        {
                            title: 'Tipos de productos',
                            icon: 'pi pi-bookmark',
                            to: '/product/productTypes',
                            gate: 'tipo_producto_listado'
                        },
                        {
                            title: 'Tipos de Unidades',
                            icon: 'pi pi-bookmark',
                            to: '/product/unit_types',
                            gate: 'unidad_medida_listado'
                        },
                        {
                            title: 'Tipos de Empaque',
                            icon: 'pi pi-bookmark',
                            to: '/product/packing_types',
                            gate: 'tipo_empaque_listado'
                        }
                    ]
                },
                {
                    title: 'Comercial',
                    icon: 'pi pi-sitemap',
                    to: '',
                    children: [
                        {
                            title: 'Ofertas de producto',
                            icon: 'pi pi-folder',
                            to: '/access'
                        },
                        {
                            title: 'Solicitudes de Clientes',
                            icon: 'pi pi-bookmark',
                            to: '/comercial/customers_requests'
                        },
                        {
                            title: 'Clientes',
                            icon: 'pi pi-bookmark',
                            to: '/comercial/customers'
                        },
                        {
                            title: 'Despachos',
                            icon: 'pi pi-bolt',
                            to: '/access'
                        }
                    ]
                },
                {
                    title: 'Producción',
                    icon: 'pi pi-shopping-cart',
                    to: '',
                    children: [
                        {
                            title: 'Lotes para Cultivo ',
                            icon: 'pi pi-bars',
                            to: '/production/croplots'
                        },
                        {
                            title: 'Vehículos',
                            icon: 'pi pi-car',
                            to: '/production/vehicles'
                        },
                        {
                            title: 'Programación de Lotes',
                            icon: 'pi pi-calendar-minus',
                            to: '/access'
                        }
                    ]
                },
                {
                    title: 'Configuración de Pagos',
                    icon: 'pi pi-dollar',
                    to: '',
                    children: [
                        {
                            title: 'Tipos de Pago',
                            icon: 'pi pi-tablet',
                            to: '/payrollsettings/PaymentTypes'
                        },
                        {
                            title: 'Tipos de Tareas',
                            icon: 'pi pi-list',
                            to: '/payrollsettings/taskstypes'
                        },
                        {
                            title: 'Tarifas por Tareas',
                            icon: 'pi pi-bookmark',
                            to: '/payrollsettings/taskstarif'
                        },
                        {
                            title: 'Tarifas por Labores',
                            icon: 'pi pi-briefcase',
                            to: '/payrollsettings/workstarif'
                        },
                        {
                            title: 'Periodos de Pago',
                            icon: 'pi pi-calendar-plus',
                            to: '/payrollsettings/payperiods'
                        },
                        {
                            title: 'Calendarios',
                            icon: 'pi pi-calendar-times',
                            to: '/payrollsettings/calendars'
                        },

                        {
                            title: 'Centros de Trabajo',
                            icon: 'pi pi-bookmark',
                            to: '/payrollsettings/Workcenters'
                        },
                        {
                            title: 'Cargos',
                            icon: 'pi pi-bolt',
                            to: '/payrollsettings/Jobtypes'
                        },
                        {
                            title: 'Empleados',
                            icon: 'pi pi-users',
                            to: '/payrollsettings/Employees'
                        }
                    ]
                },
                {
                    title: 'Liquidacion de nómina',
                    icon: 'pi pi-money-bill',
                    to: '',
                    children: [
                        {
                            title: 'Planeación Diaria',
                            icon: 'pi pi-tablet',
                            to: '/PayrollSettlement/DailyPlanner'
                        },
                        {
                            title: 'Trabajos de Corta',
                            icon: 'pi pi-percentage',
                            to: '/PayrollSettlement/WorkRegisterCorta'
                        },
                        {
                            title: 'Traslado a Prefrio',
                            icon: 'pi pi-bookmark',
                            to: '/PayrollSettlement/TransferTasks'
                        },
                        {
                            title: 'Trabajos de Selección',
                            icon: 'pi pi-tablet',
                            to: '/PayrollSettlement/WorkRegisterSelection'
                        },
                        {
                            title: 'Labores de Contratistas',
                            icon: 'pi pi-share-alt',
                            to: '/PayrollSettlement/WorkRegisterDaily'
                        },

                        {
                            title: 'Descuentos de Nómina',
                            icon: 'pi pi-ticket',
                            to: '/PayrollSettlement/DiscountRegistering'
                        }
                    ]
                },
                {
                    title: 'Administración',
                    icon: 'pi pi-prime',
                    to: '',
                    children: [
                        {
                            title: 'Empresa',
                            icon: 'pi pi-folder',
                            to: '/admin/companies'
                        },
                        {
                            title: 'Fincas',
                            icon: 'pi pi-bookmark',
                            to: '/admin/farms'
                        }
                    ]
                },
                {
                    title: 'Sistema',
                    icon: 'pi pi-desktop',
                    to: '',
                    gate: 'usuario_listado',
                    children: [
                        {
                            title: 'Usuarios',
                            icon: 'pi pi-id-card',
                            to: '/system/Users'
                        },
                        {
                            title: 'Roles',
                            icon: 'pi pi-user-plus',
                            to: '/system/roles'
                        },
                        {
                            title: 'Permisos',
                            icon: 'pi pi-eye-slash',
                            to: '/system/permissions'
                        },
                        {
                            title: 'Estado de Registros',
                            icon: 'pi pi-bell',
                            to: '/system/statuses'
                        }
                    ]
                }
            ]
        };
    }
};
</script>
<template>
    <div class="wrapper">
        <side-bar :sidebarLinks="sidebarLinks"> </side-bar>
    </div>
</template>
