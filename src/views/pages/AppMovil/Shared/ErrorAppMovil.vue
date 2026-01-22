<script setup>
const props = defineProps({
    title: { type: String },
    description: { type: String },
    logoUrl: { type: String },
    checklist: { type: Array, default: () => [] },
    steps: { type: Array, default: () => [] } // New prop for step-by-step instructions
});
</script>

<template>
    <div class="flex flex-column align-items-center justify-content-center m-2">
        <div class="w-full max-w-30rem" style="border-radius: 40px; padding: 0.2rem; background: linear-gradient(180deg, rgba(255, 30, 60, 0.2) 0%, rgba(33, 150, 243, 0) 100%)">
            <div class="w-full surface-card py-5 px-4 sm:px-6 flex flex-column align-items-center shadow-4" style="border-radius: 38px">
                <!-- Header -->
                <div class="flex flex-column align-items-center text-center">
                    <img :src="logoUrl" alt="logo" class="mb-3 w-3rem flex-shrink-0" />
                    <h1 class="text-900 font-bold text-2xl mb-2 line-height-2">{{ title || 'Reporte de Situación' }}</h1>
                    <img src="/demo/images/error/asset-error.svg" alt="Error" class="mb-3 opacity-80" width="120px" />
                </div>

                <!-- Checklist: Structural Verification -->
                <div v-if="checklist && checklist.length > 0" class="w-full mt-2">
                    <p class="text-700 font-medium mb-2 ml-1 text-sm uppercase tracking-wider">Verificación de Configuración</p>
                    <div v-for="(item, index) in checklist" :key="index" class="flex align-items-center mb-2 p-3 border-round-xl transition-all transition-duration-200" :class="item.ok ? 'bg-green-50 border-left-3 border-green-500' : 'bg-red-50 border-left-3 border-red-500'">
                        <i :class="item.ok ? 'pi pi-check-circle text-green-600' : 'pi pi-exclamation-circle text-red-600'" class="mr-3 text-xl"></i>
                        <div class="flex flex-column">
                            <span :class="item.ok ? 'text-green-900 font-semibold' : 'text-red-900 font-bold'" class="text-sm md:text-base">{{ item.label }}</span>
                            <span class="text-600 text-xs">{{ item.ok ? 'Vinculado correctamente' : 'Error de vinculación detectado' }}</span>
                        </div>
                    </div>
                </div>

                <!-- Solution Steps: The "Paso a Paso" -->
                <div v-if="steps && steps.length > 0" class="w-full mt-4 p-4 surface-100 border-round-2xl">
                    <h3 class="text-900 font-bold mb-3 flex align-items-center">
                        <i class="pi pi-directions mr-2 text-primary"></i>
                        Pasos para solucionar:
                    </h3>
                    <div class="flex flex-column gap-3">
                        <div v-for="(step, idx) in steps" :key="idx" class="flex gap-3">
                            <div class="flex-shrink-0 w-2rem h-2rem border-circle bg-primary text-white flex align-items-center justify-content-center font-bold">
                                {{ idx + 1 }}
                            </div>
                            <div class="flex flex-column">
                                <span class="text-800 font-medium line-height-3">{{ step.title }}</span>
                                <span v-if="step.desc" class="text-600 text-sm line-height-3 mt-1">{{ step.desc }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else-if="description" class="text-700 mt-3 text-center line-height-3">
                    <p class="text-lg">{{ description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.border-left-3 { border-left-width: 4px !important; }
</style>
