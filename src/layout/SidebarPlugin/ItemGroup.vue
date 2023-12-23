<script>
export default {
    name: 'SidebarItemGroup',
    props: {
        item: {
            type: Object,
            default: () => ({
                title: undefined,
                icon: undefined,
                to: {},
                gate: undefined,
                children: []
            })
        },
        text: {
            type: Boolean,
            default: false
        },
        subGroup: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        if (this.isActive) {
            this.$refs.tab.classList.add('show');
        }
    },
    computed: {
        getAttributeTitle: function () {
            return this.item.to;
        },
        textIcon: function () {
            return this.item.title;
        },
        isActive: function () {
            let m = this.subGroup ? this.$route.matched[2] : this.$route.matched[1];

            if (m !== undefined && m.name === this.item.to) {
                return true;
            }

            return false;
        }
    }
};
</script>
<template>
    <router-link :to="item.to" v-slot>
        <li class="layout-root-menuitem" :class="{ active: isActive }">
            <a :href="'#' + getAttributeTitle" class="nav-link collapsed" data-toggle="collapse">
                <template v-if="text">
                    <i :class="item.icon" class="layout-menu-item-icon"></i>
                    <span class="layout-menuitem-text">
                        {{ item.title }}
                    </span>
                </template>
                <template v-else>
                    <i :class="item.icon" class="layout-menuitem-icon"></i>
                    <span class="layout-menuitem-text">
                        {{ item.title }}
                    </span>
                    <i class="pi pi-fw pi-angle-down layout-submenu-toggler" v-if="item.children"></i>
                </template>
            </a>
            <div :id="getAttributeTitle" class="collapse" ref="tab">
                <ul class="nav">
                    <template v-for="(child, i) in item.children">
                        <sidebar-item-sub-group v-if="child.children" :key="`sub-group-${i}`" :item="child"> </sidebar-item-sub-group>

                        <sidebar-link v-else :key="`sub-item-${i}`" :item="child" text> </sidebar-link>
                    </template>
                </ul>
            </div>
        </li>
    </router-link>
</template>
