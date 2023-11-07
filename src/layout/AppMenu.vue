<script setup>
import { ref, onBeforeMount } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import MenuService from '@/service/MenuService';

const menuService = new MenuService();

const oldModel = ref([]);
const model2 = ref([
    {
        label: 'Inicio',

        items: [{ label: 'Centro de control', icon: 'pi pi-fw pi-home', to: '/applayout' }]
    },

    {
        items: [
            {
                rol: 'admin',
                icon: 'pi pi-bars',
                label: 'Producto',
                items: [
                    {
                        label: 'Variedades',
                        to: '/variants',
                        icon: 'pi pi-th-large'
                    },
                    {
                        icon: 'pi pi-bars',

                        label: 'Productos',
                        icon: 'pi pi-bars',
                        to: '/products'
                    },
                    {
                        label: 'Variedades de producto',
                        to: '/productvarieties',
                        icon: 'pi pi-list'
                    },
                    {
                        label: 'Tipos de productos',
                        icon: 'pi pi-bookmark',
                        to: '/productTypes'
                    },
                    {
                        label: 'Tipos de Unidades',
                        to: '/unit_types',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Tipos de Empaque',
                        to: '/packing_types',
                        icon: 'pi pi-bookmark'
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
                items: [
                    {
                        label: 'Ofertas de producto',
                        to: '/access',
                        icon: 'pi pi-folder'
                    },
                    {
                        label: 'Solicitudes de Clientes',
                        to: '/access',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Clientes',
                        to: '/access',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Despachos',
                        to: '/access',
                        icon: 'pi pi-bolt'
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
                items: [
                    {
                        label: 'Empresa',
                        to: '/companies',
                        icon: 'pi pi-folder'
                    },
                    {
                        label: 'Fincas',
                        to: '/farms',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Centros de Trabajo',
                        to: '/Workcenters',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Cargos',
                        to: '/Jobtypes',
                        icon: 'pi pi-bolt'
                    },
                    {
                        label: 'Empleados',
                        to: '/Employees',
                        icon: 'pi pi-users'
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
                items: [
                    {
                        label: 'Lotes de Terreno',
                        to: '/croplots',
                        icon: 'pi pi-bars'
                    },
                    {
                        label: 'Vehiculos',
                        to: '/vehicles',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Programación de Lotes',
                        to: '/access',
                        icon: 'pi pi-calendar-minus'
                    }
                ]
            }
        ]
    },
    {
        items: [
            {
                label: 'Nómina',
                rol: 'admin',
                icon: 'pi pi-dollar',
                items: [
                    {
                        label: 'Tarifas por Tareas',
                        to: '/taskstarif',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Tipos de Tareas',
                        to: '/taskstypes',
                        icon: 'pi pi-list'
                    },

                    {
                        label: 'Periodos de Pago',
                        to: '/payperiods',
                        icon: 'pi pi-calendar-plus'
                    },
                    {
                        label: 'Calendarios',
                        to: '/calendars',
                        icon: 'pi pi-calendar-times'
                    },
                    {
                        label: 'Labores de Finca',
                        to: '/access',
                        icon: 'pi pi-briefcase'
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
                items: [
                    {
                        label: 'Planeación Diaria',
                        to: '/DailyPlanner',
                        icon: 'pi pi-tablet'
                    },
                    {
                        label: 'Trabajos de Corta',
                        to: '/WorkRegisterCorta',
                        icon: 'pi pi-percentage'
                    },
                    {
                        label: 'Traslado a Prefrio',
                        to: '/TransferTasks',
                        icon: 'pi pi-bookmark'
                    },
                    {
                        label: 'Trabajos de Selección',
                        to: '/WorkRegisterSelection',
                        icon: 'pi pi-tablet'
                    },
                    {
                        label: 'Labores de Contratistas',
                        to: '/Contractors',
                        icon: 'pi pi-share-alt'
                    },

                    {
                        label: 'Descuentos de Nómina',
                        to: '/DiscountRegistering',
                        icon: 'pi pi-ticket'
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
                items: [
                    {
                        label: 'Usuarios',
                        to: '/Users',
                        icon: 'pi pi-id-card'
                    },
                    {
                        label: 'Roles',
                        to: '/roles',
                        icon: 'pi pi-user-plus'
                    },
                    {
                        label: 'Permisos',
                        to: '/permissions',
                        icon: 'pi pi-eye-slash'
                    },
                    {
                        label: 'Estado de Registros',
                        to: '/statuses',
                        icon: 'pi pi-bell'
                    }
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
        model.value = await menuService.getMenu();
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
        <template v-for="(item, i) in model2" :key="item">
            <!--<div class="card">-->
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
            <!--</div>-->
        </template>
    </ul>
</template>
<style lang="scss" scoped></style>
