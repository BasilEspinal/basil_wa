<script setup>
import { ref,onMounted  } from 'vue';
import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';
import useProducts from '@/composables/products'

const listRowSelect = ref([]);
const dataMod = ref({});
const headerNames = ref([]);
 
const { products, getAllProducts } = useProducts()

  onMounted(() => {
     console.info("OnMounted")
            getAllProducts()
        })

// function RowSelect(data) {
//     listRowSelect.value = data;
// }

// const onModDataToolbar = (data) => {
//     dataMod.value = data;
// };

// const onHeaderNames = (data) => (headerNames.value = data);

</script>

<template>
    <div class="card">
        <h1>Productos Composable</h1>
        {{products}}
        <!-- <ToolbarComponet :rowSelect="listRowSelect" :headerNames="headerNames" @modDataToolbar="onModDataToolbar" /> -->
     
        <!-- <Table title="" path-api="/products" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="dataMod" /> -->
    </div>
</template>

<style></style>