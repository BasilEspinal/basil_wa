<script setup>
import { ref, onBeforeMount } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import ability from '@/service/ability.js';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';

const { getAllResponseAPI, getAllResponsePermissionsAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();

const model2 = ref([
    
    {
        items:[
            {
        label: 'Dashboards',
        gate: 'monitor_menu',
        items: [{ 
            label: 'Centro de control', 
            icon: 'pi pi-fw pi-home', 
            to: '/applayout',
            gate: 'agro_tv_menu',
        }]
    }
        ]
    },
    {
        items: [
            {
                rol: 'admin',
                icon: 'pi pi-desktop',
                label: 'Monitor Online',
                gate: 'monitor_vista',
                items: [{
                    label: '10 de Mejor Rendimiento', icon: 'pi pi-fw pi-table',
                    to: '/monitorCorta',
                    gate: 'monitor_corta_vista'
                }]
            }
        ]
    },
    {
        items: [
            {
                rol: 'admin',
                icon: 'pi pi-bars',
                label: 'Producto',
                gate: 'producto_vista',
                items: [
                    {
                        label: 'Variedades',
                        to: '/product/varieties',
                        icon: 'pi pi-th-large',
                        gate: 'producto_variedades_vista'
                    },
                    {
                        icon: 'pi pi-bars',
                        label: 'Productos',
                        to: '/product/products',
                        gate: 'producto_productos_vista',
                        
                    },
                    {
                        label: 'Variedades de producto',
                        to: '/product/productvarieties',
                        icon: 'pi pi-list',
                        gate: 'producto_variedadesDeProducto_vista',
                    },
                    {
                        label: 'Tipos de productos',
                        icon: 'pi pi-bookmark',
                        to: '/product/productTypes',
                        gate: 'producto_tiposDeProducto_vista',
                    },
                    {
                        label: 'Tipos de Unidades',
                        to: '/product/unit_types',
                        icon: 'pi pi-bookmark',
                        gate: 'producto_tiposDeUnidades_vista',
                    },
                    {
                        label: 'Tipos de Empaque',
                        to: '/product/packing_types',
                        icon: 'pi pi-bookmark',
                        gate: 'producto_tiposDeEmpaque_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Comercial',
                rol: 'admin',
                icon: 'pi pi-sitemap',
                gate: 'comercial_vista',
                items: [
                    {
                        label: 'Ofertas de producto',
                        to: '/access',
                        icon: 'pi pi-folder',
                        gate: 'comercial_ofertasDeProducto_vista',
                    },
                    {
                        label: 'Solicitudes de Clientes',
                        to: '/Commercial/CustomersRequests/CustomersRequests',
                        icon: 'pi pi-bookmark',
                        gate: 'comercial_solicitudesDeClientes_vista',
                    },
                    {
                        label: 'Clientes',
                        to: '/Commercial/Customers/Customers',
                        icon: 'pi pi-bookmark',
                        gate: 'comercial_clientes_vista',
                    },
                    {
                        label: 'Despachos',
                        to: '/access',
                        icon: 'pi pi-bolt',
                        gate: 'comercial_despachos_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Producción',
                rol: 'admin',
                icon: 'pi pi-shopping-cart',
                gate: 'produccion_vista',
                items: [
                    {
                        label: 'Lotes para Cultivo ',
                        to: '/production/croplots',
                        icon: 'pi pi-bars',
                        gate: 'produccion_lotesParaCultivo_vista',
                    },
                    {
                        label: 'Vehículos',
                        to: '/production/vehicles',
                        icon: 'pi pi-car',
                        gate: 'produccion_vehiculos_vista',
                    },
                    {
                        label: 'Programación de Lotes',
                        to: '/access',
                        icon: 'pi pi-calendar-minus',
                        gate: 'produccion_programacionDeLotes_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Configuración de Pagos',
                rol: 'admin',
                icon: 'pi pi-dollar',
                gate: 'configuracionDePagos_vista',
                items: [
                    {
                        label: 'Tipos de Pago',
                        to: '/payrollsettings/PaymentTypes',
                        icon: 'pi pi-tablet',
                        gate: 'configuracionDePagos_tiposDePago_vista',
                    
                    },
                    {
                        label: 'Tipos de Tareas',
                        to: '/payrollsettings/taskstypes',
                        icon: 'pi pi-list',
                        gate: 'configuracionDePagos_tiposDeTareas_vista',
                    },
                    {
                        label: 'Tarifas por Tareas',
                        to: '/payrollsettings/taskstarif',
                        icon: 'pi pi-bookmark',
                        gate: 'configuracionDePagos_tarifasPorTarea_vista',
                        
                    },
                    {
                        label: 'Tarifas por Labores',
                        to: '/payrollsettings/workstarif',
                        icon: 'pi pi-briefcase',
                        gate: 'configuracionDePagos_tarifasPorLabores_vista',
                    },
                    {
                        label: 'Periodos de Pago',
                        to: '/payrollsettings/payperiods',
                        icon: 'pi pi-calendar-plus',
                        gate: 'configuracionDePagos_periodosDePago_vista',
                    },
                    {
                        label: 'Calendarios',
                        to: '/payrollsettings/calendars',
                        icon: 'pi pi-calendar-times',
                        gate: 'configuracionDePagos_calendarios_vista',
                    },

                    {
                        label: 'Centros de Trabajo',
                        to: '/payrollsettings/Workcenters',
                        icon: 'pi pi-bookmark',
                        gate: 'configuracionDePagos_centrosDeTrabajo_vista',
                    },
                    {
                        label: 'Cargos',
                        to: '/payrollsettings/Jobtypes',
                        icon: 'pi pi-bolt',
                        gate: 'configuracionDePagos_cargos_vista',
                    },
                    {
                        label: 'Empleados',
                        to: '/payrollsettings/Employees',
                        icon: 'pi pi-users',
                        gate: 'configuracionDePagos_empleados_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Liquidacion de nómina',
                rol: 'admin',
                icon: 'pi pi-money-bill',
                gate: 'liquidacion_nomina_vista',
                items: [
                    {
                        label: 'Planeación Diaria',
                        to: '/PayrollSettlement/DailyPlanner',
                        icon: 'pi pi-tablet',
                        gate: 'liquidacionDeNomina_planeacionDiaria_vista',
                    },
                    {
                        label: 'Trabajos de Corta',
                        to: '/PayrollSettlement/WorkRegisterCorta',
                        icon: 'pi pi-percentage',
                        gate: 'liquidacionDeNomina_trabajosDeCorta_vista',
                    },
                    {
                        label: 'Traslado a Prefrio',
                        to: '/PayrollSettlement/TransferTasks',
                        icon: 'pi pi-bookmark',
                        gate: 'liquidacionDeNomina_trasladoAPrefrio_vista',

                    },
                    {
                        label: 'Trabajos de Selección',
                        to: '/PayrollSettlement/WorkRegisterSelection',
                        icon: 'pi pi-tablet',
                        gate: 'liquidacionDeNomina_trabajosDeSeleccion_vista',
                    },
                    {
                        label: 'Labores de Contratistas',
                        to: '/PayrollSettlement/WorkRegisterDaily',
                        icon: 'pi pi-share-alt',
                        gate: 'liquidacionDeNomina_laboresDeContratista_vista',
                    },

                    {
                        label: 'Descuentos de Nómina',
                        to: '/PayrollSettlement/DiscountRegistering',
                        icon: 'pi pi-ticket',
                        gate: 'liquidacionDeNomina_descuentosDeNomina_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Administración',
                rol: 'admin',
                icon: 'pi pi-prime',
                gate: 'administracion_vista',
                items: [
                    {
                        label: 'Empresa',
                        to: '/admon/companies',
                        icon: 'pi pi-folder',
                        gate:'administracion_empresa_vista',
                    },
                    {
                        label: 'Fincas',
                        to: '/admon/farms',
                        icon: 'pi pi-bookmark',
                        gate: 'administracion_fincas_vista',
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Sistema',
                rol: 'admin',
                icon: 'pi pi-desktop',
                gate:'sistema_vista',
                items: [
                    {
                        label: 'Usuarios',
                        to: '/system/Users',
                        icon: 'pi pi-id-card',
                        gate: 'sistema_usuarios_vista',
                    },
                    {
                        label: 'Roles',
                        to: '/system/roles',
                        icon: 'pi pi-user-plus',
                        gate: 'sistema_roles_vista',
                    },
                    {
                        label: 'Permisos',
                        to: '/system/permissions',
                        icon: 'pi pi-eye-slash',
                        gate: 'sistema_permisos_vista',
                    },
                    {
                        label: 'Estado de Registros',
                        to: '/system/statuses',
                        icon: 'pi pi-bell',
                        gate: 'sistema_estadoDeRegistros_vista'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'App Movil',
                rol: 'admin',
                icon: 'pi pi-box',
                gate: '',
                items: [
                    {
                        label: 'Captura de corta',
                        to: '/AppMovil/Corta',
                        icon: 'pi pi-mobile',
                        gate: ''
                    },
                    {
                        label: 'Captura de Prefio',
                        to: '/AppMovil/PreFrio',
                        icon: 'pi pi-mobile',
                        gate: ''
                    },
                    {
                        label: 'Captura de Seleccion',
                        to: '/AppMovil/Seleccion',
                        icon: 'pi pi-mobile',
                        gate: ''
                    },
                     {
                        label: 'Captura de Contratista',
                        to: '/AppMovil/Contractor',
                        icon: 'pi pi-mobile',
                        gate: ''
                    },
                    {
                        label: 'Captura de Agronomìa',
                        to: '/AppMovil/Agronomo',
                        icon: 'pi pi-mobile',
                        gate: ''
                    },
                ]
            }
        ]
    }



]);

onBeforeMount(() => {
    fetchInfoAndUpdateValue();
});

async function fetchInfoAndUpdateValue() {
    try {
        await getAllResponsePermissionsAPI("/abilities");
        
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
