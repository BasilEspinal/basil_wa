<script setup>
import { onBeforeMount, computed } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
import { useI18n } from 'vue-i18n';
import { getMenuConfig } from './menu/menu-config';

const { t } = useI18n();
const { getAllResponsePermissionsAPI } = useDataAPI();

// Modularized Menu Configuration
const model2 = computed(() => getMenuConfig(t));

onBeforeMount(() => {
    fetchInfoAndUpdateValue();
});

async function fetchInfoAndUpdateValue() {
    try {
        await getAllResponsePermissionsAPI('/abilities');
    } catch (error) {
        
    }
}
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model2" :key="item.label || i">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
