<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { defineProps } from 'vue';

// Definir los props que el componente acepta
const props = defineProps({
  name: String,
});

onMounted(() => {
  console.log('Component mounted');
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
    </small>
  </div>
</template>

<style scoped>

</style>