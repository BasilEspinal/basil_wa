<script setup>
import { ref, onMounted } from 'vue';
import { CrudService } from '@/service/CRUD/CrudService';

/**
 * Top 10 Performance Monitor
 * Currently shows the first 10 employees. 
 * Placeholder for future performance-based endpoint.
 */

// Configuration for easy future updates
const config = ref({
    endpoint: '/employees',
    limit: 10,
    title: 'Top 10 Rendimiento de Empleados',
    fields: {
        title: 'full_name',
        subtitle: 'jobType.name',
        detail: 'document',
        badge: 'workCenter.name',
        status: 'status.name'
    }
});

const dataviewValue = ref(null);
const layout = ref('grid');
const sortKey = ref(null);
const sortOrder = ref(null);
const sortField = ref(null);
const sortOptions = ref([
    { label: 'Nombre (A-Z)', value: 'full_name' },
    { label: 'Nombre (Z-A)', value: '!full_name' }
]);

// Detail View State
const displayDetail = ref(false);
const selectedEmployee = ref(null);

const employeeCrud = CrudService(config.value.endpoint);

const loadTopPerformers = async () => {
    try {
        
        const response = await employeeCrud.getAll();
        if (response.ok && response.data?.data) {
            // Take first 10 as requested
            dataviewValue.value = response.data.data.slice(0, config.value.limit);
            
        } else {
            
        }
    } catch (e) {
        
    }
};

onMounted(loadTopPerformers);

const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
};

const showDetails = (employee) => {
    selectedEmployee.value = employee;
    displayDetail.value = true;
};
</script>

<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5 v-text="config.title"></h5>
                <DataView :value="dataviewValue" :layout="layout" :paginator="true" :rows="10" :sortOrder="sortOrder" :sortField="sortField">
                    <template #header>
                        <div class="grid grid-nogutter">
                            <div class="col-6 text-left">
                                <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Ordenar por" @change="onSortChange($event)" />
                            </div>
                            <div class="col-6 text-right">
                                <DataViewLayoutOptions v-model="layout" />
                            </div>
                        </div>
                    </template>
                    
                    <template #list="slotProps">
                        <div class="col-12">
                            <div class="flex flex-column md:flex-row align-items-center p-3 w-full">
                                <!-- Avatar Placeholder -->
                                <div class="my-4 md:my-0 w-9 md:w-10rem flex justify-content-center mr-5">
                                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" class="bg-primary text-white" style="width: 80px; height: 80px" />
                                </div>
                                
                                <div class="flex-1 text-center md:text-left">
                                    <div class="font-bold text-2xl">{{ getNestedValue(slotProps.data, config.fields.title) }}</div>
                                    <div class="mb-3 text-700">{{ getNestedValue(slotProps.data, config.fields.subtitle) }}</div>
                                    <div class="flex align-items-center justify-content-center md:justify-content-start">
                                        <i class="pi pi-id-card mr-2 text-primary"></i>
                                        <span class="font-semibold">{{ getNestedValue(slotProps.data, config.fields.detail) }}</span>
                                    </div>
                                </div>
                                
                                <div class="flex flex-column justify-content-center w-full md:w-auto align-items-center md:align-items-end mt-5 md:mt-0 gap-2">
                                    <div class="flex align-items-center gap-2 mb-2">
                                        <i class="pi pi-building text-500"></i>
                                        <Tag :value="getNestedValue(slotProps.data, config.fields.badge)" severity="info" />
                                    </div>
                                    <div class="flex align-items-center gap-2 mb-3">
                                        <i class="pi pi-check-circle text-500"></i>
                                        <Tag :value="getNestedValue(slotProps.data, config.fields.status)" severity="success" />
                                    </div>
                                    <Button icon="pi pi-search" label="Ver detalles" class="p-button-outlined p-button-sm w-full md:w-auto" @click="showDetails(slotProps.data)" />
                                </div>

                            </div>
                        </div>
                    </template>

                    <template #grid="slotProps">
                        <div class="col-12 md:col-4">
                            <div class="card m-3 border-1 surface-border shadow-1 hover:shadow-3 transition-duration-200 flex flex-column">
                                <div class="flex align-items-center justify-content-between mb-3">
                                    <div class="flex align-items-center">
                                        <i class="pi pi-building mr-2 text-primary"></i>
                                        <span class="font-semibold text-sm">{{ getNestedValue(slotProps.data, config.fields.badge) }}</span>
                                    </div>
                                    <Tag :value="getNestedValue(slotProps.data, config.fields.status)" severity="success" size="small" />
                                </div>
                                <div class="text-center mb-3">
                                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" class="bg-primary-100 text-primary-500 mb-3" style="width: 60px; height: 60px" />
                                    <div class="text-xl font-bold mb-1">{{ getNestedValue(slotProps.data, config.fields.title) }}</div>
                                    <div class="text-600">{{ getNestedValue(slotProps.data, config.fields.subtitle) }}</div>
                                </div>
                                <div class="flex align-items-center justify-content-center border-top-1 surface-border py-3 mb-3">
                                    <i class="pi pi-id-card mr-2 text-500"></i>
                                    <span class="font-medium text-900">{{ getNestedValue(slotProps.data, config.fields.detail) }}</span>
                                </div>
                                <Button label="Ver más" icon="pi pi-external-link" class="p-button-outlined w-full mt-auto" @click="showDetails(slotProps.data)" />
                            </div>
                        </div>
                    </template>
                </DataView>
            </div>
        </div>

        <!-- Employee Detail Dialog -->
        <Dialog v-model:visible="displayDetail" modal header="Detalles del Empleado" :style="{ width: '50vw' }" :breakpoints="{ '960px': '75vw', '641px': '90vw' }">
            <div v-if="selectedEmployee" class="grid">
                <div class="col-12 flex flex-column align-items-center mb-4">
                    <Avatar icon="pi pi-user" size="xlarge" shape="circle" class="bg-primary text-white mb-2" style="width: 100px; height: 100px" />
                    <h3 class="m-0">{{ selectedEmployee.full_name }}</h3>
                    <span class="text-600">{{ selectedEmployee.jobType?.name }}</span>
                </div>

                <!-- Personal Information -->
                <div class="col-12 md:col-6">
                    <div class="p-3 border-round surface-100 h-full">
                        <h6 class="text-primary uppercase m-0 mb-3"><i class="pi pi-user mr-2"></i>Información Personal</h6>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Documento:</div>
                            <div class="col-12 sm:col-7 font-bold">{{ selectedEmployee.document }} ({{ selectedEmployee.document_type?.name }})</div>
                        </div>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Género:</div>
                            <div class="col-12 sm:col-7">{{ selectedEmployee.gender?.name }}</div>
                        </div>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Email:</div>
                            <div class="col-12 sm:col-7 text-primary underline line-height-3" style="word-break: break-all;">{{ selectedEmployee.email || 'N/A' }}</div>
                        </div>
                        <div class="grid grid-nogutter">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Teléfono:</div>
                            <div class="col-12 sm:col-7">{{ selectedEmployee.phone_movil_number || 'N/A' }}</div>
                        </div>
                    </div>
                </div>

                <!-- Job Information -->
                <div class="col-12 md:col-6">
                    <div class="p-3 border-round surface-100 h-full">
                        <h6 class="text-primary uppercase m-0 mb-3"><i class="pi pi-briefcase mr-2"></i>Información Laboral</h6>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Centro de Trabajo:</div>
                            <div class="col-12 sm:col-7 font-bold text-primary">{{ selectedEmployee.workCenter?.name }}</div>
                        </div>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Empresa:</div>
                            <div class="col-12 sm:col-7">{{ selectedEmployee.company?.name }}</div>
                        </div>
                        <div class="grid grid-nogutter mb-3">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Finca:</div>
                            <div class="col-12 sm:col-7">{{ selectedEmployee.farm?.name }}</div>
                        </div>
                        <div class="grid grid-nogutter">
                            <div class="col-12 sm:col-5 text-600 font-medium mb-1 sm:mb-0">Tipo Pago:</div>
                            <div class="col-12 sm:col-7">{{ selectedEmployee.payment_type?.name }}</div>
                        </div>
                    </div>
                </div>

                <!-- Status Information -->
                <div class="col-12 mt-3">
                    <div class="p-3 border-round border-1 surface-border">
                        <div class="flex justify-content-between align-items-center">
                            <div class="flex align-items-center">
                                <i class="pi pi-info-circle mr-2 text-primary"></i>
                                <span class="font-bold">Estado del Registro</span>
                            </div>
                            <Tag :value="selectedEmployee.status?.name" severity="success" />
                        </div>
                        <p class="text-600 mt-2 mb-0">{{ selectedEmployee.status?.description || 'Sin descripción disponible.' }}</p>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cerrar" icon="pi pi-times" class="p-button-text" @click="displayDetail = false" />
            </template>
        </Dialog>
    </div>
</template>

<style scoped>
.transition-duration-200 {
    transition: all 0.2s ease-in-out;
}
</style>
