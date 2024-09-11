<template>
    <div>
      <Toast />
      <SplitButton
        :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" 
        class="p-button-success mb-2 mt-2"
        label="Action" 
        icon="pi pi-check" 
        dropdownIcon="pi pi-cog" 
        :model="items" />
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  // Definir las props que recibe el componente
  const props = defineProps({
    items: {
      type: Array,
      required: true
    },
    listRowSelect: {
      type: Array,
      required: true
    }
  });
  </script>
  
  <style scoped>
  /* Añade estilos si lo necesitas */
  </style>
  