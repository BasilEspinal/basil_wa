<script setup>
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';
import useProducts from '@/composables/Products/productsAPI.js'
/////////////////////////////////////////////
//pai
import { provide } from 'vue';
const isChanging = ref(false);
provide('isChanging', isChanging);
/////////////////////////////////////////////
const { data, error, postProducts } = useProducts();
const requestData = {
      "name": "Juancho",
      "short_name": "JCY",
      "slug": "909090"
    };
const newProduct = async () => {
      await postProducts(requestData,"/products");
      console.log('Datos:', data);
      console.log('Error:', error);
    };
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
        <button @click="newProduct">Realizar POST</button>
    </div>
</template>

<style></style>
