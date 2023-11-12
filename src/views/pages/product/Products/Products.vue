<script setup>
import { ref } from 'vue';
import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';
import useProducts from '@/composables/Products/productsAPI.js'

const { data, error, postProducts } = useProducts();
const requestData = {
      "name": "Juancho",
      "short_name": "JCY",
      "slug": "31313131"
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

 /*
const solicitud= async()=> {


  const baseUrl = 'http://164.90.146.196:81/api/v1/products';
  const token = sessionStorage.getItem('accessSessionToken');
  
  const datos = {
    "name": "",
    "short_name": "",
    "slug": ""
  };

  // Configuración del objeto de solicitud
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json'
    },
    body: {},
  };

  try {
    const response = await fetch(baseUrl, requestOptions);

    if (!response.ok) {
      //throw new Error('Error en la solicitud POST');
      const responseDataError = await response.json();
      //console.log(responseDataError)
      const keys = Object.keys(responseDataError);

    // Recorrer las claves y mostrar los valores correspondientes
        keys.forEach(key => {
        console.log(`[${key}]:`, responseDataError[key]);
        });
      
    } else {
      const responseData = await response.json();
      //console.log('Respuesta del servidor:', responseData);
      

      // Puedes realizar acciones adicionales con la respuesta aquí
    }
  } catch (error) {
    //console.error('Corrija:', error);
    
    console.log(error)

  }

         
}*/

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
