<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => ({
            title: undefined,
            icon: undefined,
            to: {},
            gate: undefined
        })
    },
    text: {
        type: Boolean,
        default: false
    }
});
</script>
<template>
    <router-link v-if="item.gate === undefined || $can(item.gate)" :to="item.to" v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li class="layout-root-menuitem" :class="[isActive && 'active', isExactActive && 'active']">
            <a :href="href" class="layout-root-menuitem">
                <template v-if="text">
                    <i :class="item.icon" class="layout-menuitem-icon"></i>
                    <span class="layout-menuitem-text">{{ item.title }}</span>
                </template>
                <template v-else>
                    <i :class="item.icon" class="layout-menuitem-icon"></i>
                    <span class="layout-menuitem-text">{{ item.title }}</span>
                    <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.children"></i>
                </template>
            </a>
        </li>
    </router-link>
</template>
