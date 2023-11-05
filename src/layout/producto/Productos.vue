<script setup>
import { ref } from 'vue';
import Table from '../../components/Table.vue';
import ToolbarComponet from '../../components/ToolbarComponet.vue';

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
        <h1>Productos</h1>
        <ToolbarComponet :rowSelect="listRowSelect" :headerNames="headerNames" @modDataToolbar="onModDataToolbar" />
        <Table title="" path-api="http://164.90.146.196:81/api/v1/products" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" />
    </div>
</template>

<style></style>
