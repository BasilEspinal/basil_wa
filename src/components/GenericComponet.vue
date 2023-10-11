<script setup>
import { ref } from 'vue';
import Table from '../views/uikit/Table.vue';
import ToolbarComponet from './ToolbarComponet.vue';

const listRowSelect = ref([]);

const props = defineProps({
    pathApi: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Generic Componet'
    }
});

function RowSelect(data) {
    listRowSelect.value = data;
}
</script>

<template>
    <div class="card">
        <h1 v-text="props.title"></h1>
        <ToolbarComponet :rowSelect="listRowSelect" />
        <Table title="Control de corta" path-api="https://basilespinal.github.io/api_v1/cutcontrols.json" @onRowSelect="RowSelect" />
    </div>
</template>

<style></style>
