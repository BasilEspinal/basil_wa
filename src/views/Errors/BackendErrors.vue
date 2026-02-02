<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

import { useToast } from 'primevue/usetoast'; // Si usas PrimeVue

// Definir los props que el componente acepta
const props = defineProps({
    name: String
});
// Inicializar el toast
const toast = useToast();

onMounted(() => {
    // if (!props.name || props.name.length === 0) {
    //   // Mostrar toast si name no está definido o está vacío
    //   toast.add({ severity: 'warn', summary: 'Advertencia', detail: 'El nombre no está definido o está vacío', life: 3000 });
    // } else {
    //   
    // }
});

onMounted(() => {
    
});
</script>

<template>
    <div>
        <small id="username-help" :class="{ 'p-invalid text-red-500': props.name }">
            <div v-if="props.name">
                <div v-for="(error, index) in props.name" :key="index">
                    {{ error }}
                </div>
            </div>

            <div v-else>
                <small id="username-help" :class="{ 'p-invalid text-red-500': props.name }">
                    <!-- Aquí podrías agregar algún contenido opcional o dejarlo vacío -->
                    <div>{{ props.name }}</div>
                </small>
            </div>
        </small>
    </div>
</template>

<style scoped></style>
