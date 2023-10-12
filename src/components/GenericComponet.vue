<script setup>
import { ref } from 'vue';
import Table from './Table.vue';
import ToolbarComponet from './ToolbarComponet.vue';

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
