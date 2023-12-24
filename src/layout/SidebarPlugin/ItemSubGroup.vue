<script>
export default {
    name: 'SidebarItemSubGroup',
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
        }
    }
};
</script>
<template>
    <sidebar-item-group :item="item" text sub-group></sidebar-item-group>
</template>
