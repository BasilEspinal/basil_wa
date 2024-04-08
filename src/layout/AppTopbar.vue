<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js'

import ability from '@/service/ability.js';
const {getAllResponsePermissionsAPI ,dataResponsePermissionsAPI} =
    useDataAPI();
const lengthPermissions = ref(0);
onMounted(async () => {
    await getAllResponsePermissionsAPI("/abilities");
    lengthPermissions.value = dataResponsePermissionsAPI.value.length;
});


const { layoutConfig, onMenuToggle, changeThemeSettings } = useLayout();
const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const dataUser = ref('');
const router = useRouter();
const toggleValue = ref(layoutConfig.darkTheme.value);

const logout = async () => {    
    await postResponseAPI({}, "/logout");
};

onMounted(() => {
    dataUser.value = sessionStorage.getItem('accessSessionUser');
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};
const onSettingsClick = () => {
    topbarMenuActive.value = false;
    router.push('/documentation');
};
const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const onChangeTheme = (mode) => {
    toggleValue.value = mode;
    const theme = mode ? 'lara-dark-teal' : 'lara-light-teal';
    const elementId = 'theme-css';
    const linkElement = document.getElementById(elementId);
    const cloneLinkElement = linkElement.cloneNode(true);
    const newThemeUrl = linkElement.getAttribute('href').replace(layoutConfig.theme.value, theme);
    cloneLinkElement.setAttribute('id', elementId + '-clone');
    cloneLinkElement.setAttribute('href', newThemeUrl);
    cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', elementId);
        changeThemeSettings(theme, mode);
    });
    linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
};

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
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
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const Exit = () => {
    localStorage.clear();
    sessionStorage.clear();
    logout();
    router.push('/#');
    

};
</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img :src="logoUrl" alt="logo" />
            <span>AgroOnline</span>
        </router-link>

        
        <button v-if="!(ability.can('agro_tv_menu') && lengthPermissions==1)" class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i v-if="!(ability.can('agro_tv_menu') && lengthPermissions==1)" class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">
            <div class="flex flex-wrap align-items-center justify-content-center md:justify-content-start">
                <i class="pi pi-user mr-2"></i>
                <p>{{ dataUser }}</p>
            </div>

            <Button @click="onChangeTheme(!toggleValue)" v-model="toggleValue" rounded outlined class="p-link layout-topbar-button">
                <i :class="{ 'pi pi-moon': !toggleValue, 'pi pi-sun': toggleValue }"></i>
            </Button>

            <Button @click="Exit()" rounded outlined class="p-link layout-topbar-button">
                <i class="pi pi-sign-out"></i>
            </Button>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
