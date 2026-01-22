<script setup>
const props = defineProps({
    title: { type: String },
    description: { type: String },
    logoUrl: { type: String },
    checklist: { type: Array, default: () => [] }
});
</script>

<template>
    <div>
        <div class="flex flex-column align-items-center justify-content-center m-4">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(255, 30, 60, 0.4) 10%, rgba(33, 150, 243, 0) 40%, rgba(255, 30, 60, 0.4) 80%)">
                <div class="w-full surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                    <div class="grid flex flex-column align-items-center">
                        <img :src="logoUrl" alt="logo" class="mb-2 w-4rem flex-shrink-0" />
                        <h1 class="text-900 font-bold text-center text-3xl mb-1">{{ title ? title : 'Unknown error' }}</h1>
                        <img src="/demo/images/error/asset-error.svg" alt="Error" class="mb-4" width="50%" />
                        
                        <!-- Checklist Section -->
                        <div v-if="checklist && checklist.length > 0" class="w-full mt-2">
                            <div v-for="(item, index) in checklist" :key="index" class="flex align-items-center mb-3 bg-gray-50 p-2 border-round">
                                <i :class="item.ok ? 'pi pi-check-circle text-green-500' : 'pi pi-times-circle text-red-500'" class="mr-3" style="font-size: 1.5rem"></i>
                                <div class="flex flex-column">
                                    <span :class="item.ok ? 'text-900 font-medium' : 'text-red-700 font-bold'" class="text-xl">{{ item.label }}</span>
                                    <span class="text-600 text-sm">{{ item.ok ? 'Configurado correctamente' : 'Falta configuración o acceso' }}</span>
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-700 mb-4 text-center"> <h2>{{ description ? description : 'Unknown error' }}</h2></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
