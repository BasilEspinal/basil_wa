<script setup>
import { computed } from 'vue';
import { state } from '@/service/WebSocket/socket';

// Computed property for connection state
const connected = computed(() => state.connected);
</script>

<template>
    <p>State: {{ connected }}</p>
</template>
