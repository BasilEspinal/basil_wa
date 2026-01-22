<script setup>
import AppMenu from './AppMenu.vue';
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

const logoUrl = computed(() => {
    const lightLogo = import.meta.env.VITE_APP_SIDEBAR_LOGO_LIGHT || import.meta.env.VITE_APP_LOGO_LIGHT;
    const darkLogo = import.meta.env.VITE_APP_SIDEBAR_LOGO_DARK || import.meta.env.VITE_APP_LOGO_DARK;

    if (!lightLogo || !darkLogo) {
        return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
    }
    return layoutConfig.darkTheme.value ? darkLogo : lightLogo;
});
</script>

<template>
    <div class="flex flex-column h-full">
        <app-menu></app-menu>
        <div class="mt-auto flex justify-content-center mb-3">
             <img :src="logoUrl" height="150" class="mr-2" />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
