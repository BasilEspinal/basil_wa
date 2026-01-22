<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed } from 'vue';

const { layoutConfig } = useLayout();

// const logoUrl = computed(() => {
//     // return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
//     return "/layout/images/logo-basil.png";
// });

const logoUrl = computed(() => {
    const lightLogo = import.meta.env.VITE_APP_LOGO_LIGHT;
    const darkLogo = import.meta.env.VITE_APP_LOGO_DARK;

    if (!lightLogo || !darkLogo) {
        return `layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.png`;
    }
    return layoutConfig.darkTheme.value ? darkLogo : lightLogo;
});

const appName = import.meta.env.VITE_APP_NAME || 'AgroOnline';
</script>

<template>
    <div class="layout-footer">
        <img :src="logoUrl" alt="Logo" height="20" class="mr-2" />
        by
        <span class="font-medium ml-2">{{ appName }}</span>
    </div>
</template>
<style lang="scss" scoped></style>
