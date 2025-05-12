<script setup>
import { computed } from 'vue';

// Ruta al logo SVG en el directorio público

const logoSrc = computed(() => {
    return `/layout/images/construction/under.jpg`;
});
</script>

<template>
    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <!--Uncomment when table is done-->

                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <img :src="logoSrc" alt="Sitio en Construcción" />
                    <h1>Sitio en Construcción</h1>
                    <p>Estamos trabajando para ofrecerte una mejor experiencia. ¡Vuelve pronto!</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>
