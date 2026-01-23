<script setup>
import UnderConstruction from '@/components/UnderConstruction.vue';
</script>

<template>
    <div>
        <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
            <div class="flex align-items-center justify-content-between p-3">
                <div class="flex align-items-center gap-3">
                    <div class="bg-primary-50 p-3 border-round-circle">
                        <i class="pi pi-info-circle text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">Estado de Registros</h1>
                        <p class="m-0 text-600 font-medium mt-1">Información de estado de los registros del sistema</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">
            <UnderConstruction />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
