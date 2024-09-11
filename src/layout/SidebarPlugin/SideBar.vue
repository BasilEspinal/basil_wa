<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Inicio'
        },
        sidebarLinks: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {};
    }
};
</script>
<template>
    <div class="sidebar">
        <div class="logo">
            <a href="/" class="simple-text logo-normal">
                {{ title }}
            </a>
        </div>
        <div class="layout-root-menuitem">
            <ul class="nav">
                <slot>
                    <template v-for="(item, i) in sidebarLinks">
                        <sidebar-item-group v-if="item.children && $can(item.gate)" :key="`group-${i}`" :item="item"> </sidebar-item-group>

                        <sidebar-link v-else :key="`item-${i}`" :item="item"></sidebar-link>
                    </template>
                </slot>
            </ul>
        </div>
    </div>
</template>
