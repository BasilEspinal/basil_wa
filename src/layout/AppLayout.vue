<script setup>
import { computed, watch, ref, onBeforeMount, onMounted } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import { useRouter } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
import { useLayout } from '@/layout/composables/layout';
import ability from '@/service/ability.js';
import ErrorsUnknown from '../components/ErrorsBackendUnknown/ErrorsUnknown.vue';
import { InitialDataService } from '@/service/InitialData';
// Error store
import { hasCriticalError, errorMessages } from '@/stores/errorStore.js';

const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const { getAllResponsePermissionsAPI, dataResponsePermissionsAPI } = useDataAPI();
const outsideClickListener = ref(null);
const router = useRouter();
const lengthPermissions = ref(0);
const userStoraged = ref('');
const nameStoraged = ref('');
const emailStoraged = ref('');
const dataStart = ref([]);


onBeforeMount(async () => {
    await getAllResponsePermissionsAPI('/abilities');
    lengthPermissions.value = dataResponsePermissionsAPI.value.length;
     // Get initial backend data
  const response = await InitialDataService.getDatastart();
    
    const errors = response?.data.errors || {};
    
  const filtered = Object.fromEntries(Object.entries(errors).filter(([_, v]) => v !== null));

  if (Object.keys(filtered).length > 0) {
    errorMessages.value = filtered;
    hasCriticalError.value = true;
  }

  // Continue loading layout info if no critical error
  if (!hasCriticalError.value) {
    userStoraged.value = sessionStorage.getItem('accessSessionUser');
    nameStoraged.value = sessionStorage.getItem('accessSessionEmployeeName');
    emailStoraged.value = sessionStorage.getItem('accessSessionEmail');
  }
});

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeMount(() => {
    if (!sessionStorage.getItem('accessSessionToken')) {
        router.push('/auth/login');
    } else {
    }
});

const initializeValues = async () => {
    userStoraged.value = sessionStorage.getItem('accessSessionUser');
    nameStoraged.value = sessionStorage.getItem('accessSessionEmployeeName');
    emailStoraged.value = sessionStorage.getItem('accessSessionEmail');
};

const containerClass = computed(() => {
    return {
        'layout-theme-light': layoutConfig.darkTheme.value === 'light',
        'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
        'layout-overlay': layoutConfig.menuMode.value === 'overlay',
        'layout-static': layoutConfig.menuMode.value === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive.value,
        'layout-mobile-active': layoutState.staticMenuMobileActive.value,
        'p-input-filled': layoutConfig.inputStyle.value === 'filled',
        'p-ripple-disabled': !layoutConfig.ripple.value
    };
});
const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
//
</script>

<template>
    <div :class="[(ability.can('agro_tv_menu') && lengthPermissions == 1) || lengthPermissions == 0 ? '' : 'layout-wrapper', containerClass]">
        <app-topbar :userStoraged="userStoraged" :nameStoraged="nameStoraged" :emailStoraged="emailStoraged"></app-topbar>

        <div v-if="(ability.can('agro_tv_menu') && lengthPermissions == 1) || lengthPermissions == 0"></div>
        <div v-else class="layout-sidebar">
            <app-sidebar></app-sidebar>
        </div>
        
        <div class="layout-main-container">
            <Card class="bg-warning" v-if="hasCriticalError" :style="{ width: '100%', height: '100%' }">
    <template #title >
        <p class="m-0 text-red-600 font-semibold">
        Señor usuario usted debe configurar estos parámetros para que pueda funcionar correctamente la plataforma.
    </p></template>
    <template #content>
        <ErrorsUnknown/>
    </template>
</Card>
            
            <div v-if="(ability.can('agro_tv_menu') && lengthPermissions == 1) || lengthPermissions == 0"></div>
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
    
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped>
.text-red-600 {
  color: #dc2626;
}
.font-semibold {
  font-weight: 600;
}

.bg-warning {
  background-color: #fef2f2;
}

</style>
