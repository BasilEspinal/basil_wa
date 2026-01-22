<script setup>
const props = defineProps({
    title: { type: String },
    description: { type: String },
    logoUrl: { type: String }
});
</script>

<template>
    <div>
        <div class="flex flex-column align-items-center justify-content-center m-4">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, rgba(255, 30, 60, 0.4) 10%, rgba(33, 150, 243, 0) 40%, rgba(255, 30, 60, 0.4) 80%)">
                <div class="w-full surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center" style="border-radius: 53px">
                    <div class="grid flex flex-column align-items-center">
                        <img :src="logoUrl" alt="logo" class="mb-2 w-4rem flex-shrink-0" />
                        <h1 class="text-900 font-bold text-3xl mb-1">{{ title ? title : 'Unknown error' }}</h1>
                        <img src="/demo/images/error/asset-error.svg" alt="Error" class="mb-4" width="50%" />
                        <span class="text-700 mb-4"> <h2>{{ description ? description : 'Unknown error' }}</h2></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
