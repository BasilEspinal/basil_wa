<script setup>
import { ref, watch } from 'vue';
import Table from '@/components/Table.vue';

import ToolbarComponet from '@/components/ToolbarComponet.vue';

const listRowSelect = ref([]);
import { useRouter } from 'vue-router';

const router = useRouter();
const rutaDecodificada = ref(decodeURIComponent(router.currentRoute.value.query.ruta));

/*
const props = defineProps({
    pathApi: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Generic Componet'
    }
});*/

watch(
    () => router.currentRoute.value.query.ruta ,
    () => {
        console.log('cambia: ', router.currentRoute.value.query.ruta);
        rutaDecodificada.value = decodeURIComponent(router.currentRoute.value.query.ruta);
    }
);

function RowSelect(data) {
    listRowSelect.value = data;
}
</script>

<template>
    <div class="card">
        <h1 v-text="$route.params.title"></h1>
        <ToolbarComponet :rowSelect="listRowSelect" />
        <Table title="Control de corta" :path-api="rutaDecodificada" @onRowSelect="RowSelect" />
    </div>
</template>

<style></style>
