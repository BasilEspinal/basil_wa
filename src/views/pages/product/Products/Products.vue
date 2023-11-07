<script setup>
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';

const listRowSelect = ref([]);

const dataMod = ref({});
const headerNames = ref([]);

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
        <h1>Informaciòn de Productos</h1>
        <ToolbarComponet :rowSelect="listRowSelect" :headerNames="headerNames" @modDataToolbar="onModDataToolbar" />
        <Table title="" path-api="/products" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" />
    </div>
</template>

<style></style>
