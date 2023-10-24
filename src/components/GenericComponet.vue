<script setup>
import { ref, watch } from 'vue';
import Table from '@/components/Table.vue';

import ToolbarComponet from '@/components/ToolbarComponet.vue';

const listRowSelect = ref([]);
import { useRouter } from 'vue-router';

const router = useRouter();
const rutaCodificada = router.currentRoute.value.query.ruta
const rutaDecodificada = ref(decodeURIComponent(rutaCodificada));
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

const onModDataToolbar = (data) => {
    dataMod.value = data;
};

const onHeaderNames = (data) => (headerNames.value = data);
</script>

<template>
    <div class="card">
        <h1 v-text="$route.params.title"></h1>
        <ToolbarComponet :rowSelect="listRowSelect" :headerNames="headerNames" @modDataToolbar="onModDataToolbar" />
        <Table title="Control de corta" :path-api="rutaDecodificada" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" />
    </div>
</template>

<style></style>
