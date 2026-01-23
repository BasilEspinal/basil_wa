<script setup>
import { defineProps, ref } from 'vue';

// Definir las props que recibe el componente
const props = defineProps({
    items: {
        type: Array,
        required: true
    },
    listRowSelect: {
        type: Array,
        required: true
    }
});

const menu = ref();
const toggle = (event) => {
    menu.value.toggle(event);
};

const getSeverityColor = (severity) => {
    switch (severity) {
        case 'success':
            return 'var(--green-500)';
        case 'danger':
            return 'var(--red-500)';
        case 'warning':
            return 'var(--orange-500)';
        case 'info':
            return 'var(--blue-500)';
        default:
            return 'var(--primary-color)';
    }
};
</script>

<template>
    <div class="action-button-container">
        <Button 
            type="button" 
            label="Acciones de Proceso" 
            icon="pi pi-bolt" 
            @click="toggle" 
            aria-haspopup="true" 
            aria-controls="overlay_menu" 
            :disabled="!(listRowSelect.length > 0)"
            class="p-button-raised p-button-rounded workflow-btn w-full px-4 py-3"
            severity="contrast"
        />
        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" class="workflow-menu">
            <template #start>
                <div class="px-3 py-2 border-bottom-1 surface-border">
                    <span class="text-xs font-bold text-500 uppercase tracking-wider">Transiciones Disponibles</span>
                </div>
            </template>
            <template #item="{ item }">
                <a 
                    v-ripple 
                    class="flex align-items-center p-3 cursor-pointer select-none transition-colors transition-duration-150 hover:surface-100" 
                    @click="item.command && item.command()"
                >
                    <div 
                        class="flex align-items-center justify-content-center border-round w-2rem h-2rem mr-3"
                        :style="{ backgroundColor: getSeverityColor(item.severity) + '15', color: getSeverityColor(item.severity) }"
                    >
                        <i :class="item.icon" class="text-lg"></i>
                    </div>
                    <span class="font-semibold text-800">{{ item.label }}</span>
                </a>
            </template>
        </Menu>
    </div>
</template>

<style scoped>
.workflow-btn {
    background: linear-gradient(135deg, var(--surface-800) 0%, var(--surface-900) 100%);
    border: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.workflow-btn:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    background: linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%);
}

.workflow-menu {
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    border: 1px solid var(--surface-border);
    overflow: hidden;
    min-width: 200px;
}

.action-button-container {
    perspective: 1000px;
}
</style>

<style scoped>
/* Añade estilos si lo necesitas */
</style>
