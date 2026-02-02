<script setup>


const props = defineProps({
    selection: {
        type: Array,
        default: () => []
    },
    label: {
        type: String,
        default: 'registros seleccionados'
    }
});

const emit = defineEmits(['clear', 'delete']);
</script>

<template>
    <transition name="slide-up">
        <div v-if="selection.length > 0" class="floating-bar-container">
            <div class="floating-bar shadow-8 p-3 flex align-items-center justify-content-between">
                <div class="flex align-items-center gap-3">
                    <div class="selection-count flex align-items-center justify-content-center bg-primary text-white border-round-circle font-bold">
                        {{ selection.length }}
                    </div>
                    <span class="text-900 font-medium">{{ selection.length === 1 ? '1 registro seleccionado' : `${selection.length} ${label}` }}</span>
                    <Button icon="pi pi-times" @click="emit('clear')" text rounded severity="secondary" v-tooltip.top="'Limpiar selección'" />
                </div>

                <div class="flex align-items-center gap-2">
                    <slot name="actions"></slot>
                    <Button 
                        label="Eliminar" 
                        icon="pi pi-trash" 
                        severity="danger" 
                        raised 
                        class="p-button-rounded px-4"
                        @click="emit('delete')"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.floating-bar-container {
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1100;
    width: auto;
    min-width: 500px;
}

.floating-bar {
    background: rgba(var(--surface-card-rgb), 0.85);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.125);
    border-radius: 100px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.selection-count {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.1rem;
    box-shadow: 0 4px 10px rgba(var(--primary-color-rgb), 0.3);
}

/* Animations */
.slide-up-enter-active, .slide-up-leave-active {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-enter-from, .slide-up-leave-to {
    transform: translate(-50%, 100px);
    opacity: 0;
}
</style>
