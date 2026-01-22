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

<template>
    <div>
        <Toast />
        <SplitButton :disabled="!(listRowSelect.length > 0)" class="mb-2 mt-2 w-full" label="Action" icon="pi pi-check" dropdownIcon="pi pi-cog" :model="items" size="large" severity="primary" text raised />
    </div>
</template>

<style scoped>
/* Añade estilos si lo necesitas */
</style>
