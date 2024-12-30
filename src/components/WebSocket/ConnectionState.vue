<template>
    <p>State: {{ connected }}</p>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { state } from "@/service/WebSocket/socket";
  
  // Computed property for connection state
  const connected = computed(() => state.connected);
  </script>
  