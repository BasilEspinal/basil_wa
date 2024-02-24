<script setup>
import AppMenu from './AppMenu.vue';
import { ref } from 'vue';

const logo = ref(`http://localhost:3030/imagenes/image4.png`);//"/layout/images/logo-basil.png"
</script>

<template>
    <app-menu></app-menu>
    <!-- <sidebar-layout></sidebar-layout> -->
    <!--Logo dinamico-->
    <img :src=logo height="150" class="mr-2" />
</template>

<style lang="scss" scoped></style>
