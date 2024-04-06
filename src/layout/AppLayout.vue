<script setup>
import { computed, watch, ref, onBeforeMount, onMounted } from 'vue';
import AppTopbar from './AppTopbar.vue';
import AppFooter from './AppFooter.vue';
import { useRouter } from 'vue-router';
import AppSidebar from './AppSidebar.vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useLayout } from '@/layout/composables/layout';
import ability from '@/service/ability.js';
const {getAllResponsePermissionsAPI,dataResponsePermissionsAPI  } =
    useDataAPI();
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener = ref(null);
const router = useRouter();
const lengthPermissions = ref(0);
onBeforeMount(async () => {
    
    await getAllResponsePermissionsAPI("/abilities");
    lengthPermissions.value = dataResponsePermissionsAPI.value.length;
    
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
    }
});

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
    <div :class="[
    (ability.can('agro_tv_menu') && lengthPermissions==1) ||lengthPermissions==0 ? '' : 'layout-wrapper',
    containerClass
    ]" >
        <app-topbar></app-topbar>
        
        <div v-if="(ability.can('agro_tv_menu')&&lengthPermissions==1)||lengthPermissions==0"  >
            
        </div>
        <div v-else class="layout-sidebar" >
            <app-sidebar></app-sidebar>
        </div> 


        <div class="layout-main-container">
            <div v-if="(ability.can('agro_tv_menu') && lengthPermissions==1) ||lengthPermissions==0" >
                
            </div>
            <div class="layout-main">
                <router-view></router-view>
            </div>
            <app-footer></app-footer>
        </div>
        <div class="layout-mask"></div>
    </div>
</template>

<style lang="scss" scoped></style>
