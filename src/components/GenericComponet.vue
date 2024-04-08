<script setup>
import { ref, watch } from 'vue';
import Table from './Table.vue';
import ToolbarComponet from './ToolbarComponet.vue';

const listRowSelect = ref([]);
import { useRouter } from 'vue-router';

const router = useRouter();
const rutaCodificada = router.currentRoute.value.query.ruta;
const rutaDecodificada = ref(decodeURIComponent(rutaCodificada));
const dataMod = ref({});
const headerNames = ref([]);
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

function RowSelect(data) {
    listRowSelect.value = data;
}

const onModDataToolbar = (data) => {
    dataMod.value = data;
};

const onHeaderNames = (data) => (headerNames.value = data);

watch(
    () => router.currentRoute.value,
    () => {
        rutaDecodificada.value = decodeURIComponent(router.currentRoute.value.query.ruta);
    }
);

</script>

<template>
    <div class="card">
        <h1 v-text="$route.params.title"></h1>
        <ToolbarComponet :rowSelect="listRowSelect" :headerNames="headerNames" @modDataToolbar="onModDataToolbar" />
        <Table title="" :path-api="rutaDecodificada" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" />
    </div>
</template>

<style></style>
