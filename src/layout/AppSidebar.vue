

<template>
    <app-menu></app-menu>
    <!-- <sidebar-layout></sidebar-layout> -->
    <!--Logo dinamico-->
    <img :src="pathImg" height="150" class="mr-2" />
</template>

<style lang="scss" scoped></style>

<script setup>
import AppMenu from './AppMenu.vue';
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';


 const pathImg =ref('/layout/images/logo-basil.png')
// const pathImg =ref('https://www.google.com/imgres?q=GOOGLE%20IMAGES&imgurl=https%3A%2F%2Fplay-lh.googleusercontent.com%2F1-hPxafOxdYpYZEOKzNIkSP43HXCNftVJVttoo4ucl7rsMASXW3Xr6GlXURCubE1tA%3Dw3840-h2160-rw&imgrefurl=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdev%3Fid%3D5700313618786177705%26hl%3Den_US%26gl%3DUS&docid=x_hf6-7_nBDr_M&tbnid=mNvT3T4Zgwn3FM&vet=12ahUKEwj5uNLtyZeGAxXpkIkEHW9ZD6gQM3oECGsQAA..i&w=3840&h=2160&hcb=2&ved=2ahUKEwj5uNLtyZeGAxXpkIkEHW9ZD6gQM3oECGsQAA')

</script>
