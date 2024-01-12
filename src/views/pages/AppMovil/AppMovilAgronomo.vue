<template>
    <div>
        <div class="card">
             <div>
                <!-- {{ data_planner }} -->
              
                <h3>Planeacióm Diaria para el Area: {{ areawork}}</h3>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12 md:col-6">
                        <pre>Empleado Cortador : {{data_planner.name_employee}}</pre>
                    </div>
                     <div class="field col-12 md:col-6">
                        <pre>Fecha Planeada :{{ data_planner.planner_date }}</pre>
                    </div>
                  <div class="field col-12 md:col-6">
                        <pre>Producto:{{data_planner.product_type}}</pre>
                    </div>
                     <div class="field col-12 md:col-6">
                        <pre>Variedad : {{data_planner.product_variant}}</pre>
                    </div>
                      <div class="field col-12 md:col-6">
                        <pre>Lote Despacho : {{data_planner.lot_dispatch}}</pre>
                    </div>
                </div>
            </div> 
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <!-- <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                        </div>
                    </template>
                </Toolbar>
            </div> -->
                </div>
            </div>
            <!-- <pre>{{ dataResponseAPI }}</pre> -->

            <div class="col-12">
                <div class="card">
                    <div class="p-fluid formgrid grid">
                         <div class="field col-12 md:col-6">
                             <label for="tasktype">Tipo Actividad</label>
                                <Dropdown  v-model="select_tasks_type" :options="task_type" filter optionLabel="name" placeholder="Select Task"   class="w-full md:w-20rem" />
                        </div>
                        <div class="field col-12 md:col-6">
                             <label for="cropslots">Lote</label>
                                <Dropdown  v-model="selected_crops_lots" :options="crops_lots" filter optionLabel="name" placeholder="Select Lots"   class="w-full md:w-20rem" />
                        </div>
                        <div  v-if="select_tasks_type.name !== 'Task'" class="field col-12 md:col-6">
                             <label for="dones_work">Labor</label>
                                <Dropdown  v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" placeholder="Select Labor"   class="w-full md:w-20rem" />
                        </div>
                        <div class="field col-12 md:col-6">
                            <label for="quanty">Quanty</label>
                            <InputNumber v-model="quanty" inputId="minmax" :min="1" :max="5" />
                        </div>
                        
                        
                        <div class="field col-12 md:col-6">
                            <label for="weightunit">Peso Aproximado</label>
                            <p>

                                <label for="weightunit">4.0 Kg</label>
                            </p>
                        </div>
                        <div class="field col-12 md:col-3">
                            <label for="priceunit">Precio Unitario</label>
                            <p>
                                <label for="peso">{{ priceunit }}</label>
                            </p>
                        </div>
                        <div class="field col-12 md:col-3">
                            <label for="priceunit">Precio Total</label>
                            <p>
                                <label for="peso">{{ quanty*priceunit }}</label>
                            </p>
                        </div>
                        <div class="field col-12">
                            <label for="notas">Notas</label>
                            <Textarea id="address" rows="2" />
                        </div>
                    </div>
                    
                    <div class="field col-12">
                            
                        <Button label="Enviar" icon="pi pi-check" />
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
///Demo  App Movil

const data_planner = ref({
    document: 'XXXXXX',
    planner_date: '2024-01-13',
    product_type: 'Albaca',
    product_variant: 'Nufar',
    lot_dispatch: '20822-5589',
    name_employee: 'Nombre del empleado',
    nameSupervisor: 'Nombre Supervisor',
});

const quanty = ref();
const pricetotal = ref();
const priceunit=ref(1850)
const selected_crops_lots = ref();
const crops_lots = [
    { name: 'L1', code: 'L1' },
    { name: 'L2', code: 'L2' },
    { name: 'L3', code: 'L3' }
];

const select_tasks_type = ref(
    { name: '', code: '' },
);

const task_type = [
    { name: 'Task', code: 'Task' },
    { name: 'HoraExtra', code: 'HoraExtra' },
    { name: 'Labor Contratista', code: 'Labor' }
];

const select_dones_work = ref();
const dones_work = [
    { name: 'ASEO', code: 'A01' },
    { name: 'CANASTILLA', code: 'A02' },
    { name: 'DESEMSEMILLADA', code: 'A03' },
    { name: 'DESHIERBA', code: 'A04' }
];


const areawork = ref('Control Agronomía');

const onSelectAllChangeItems = (event) => {
    selectedItems.value = event.checked ? items.value.map((item) => item.value) : [];
    selectAll.value = event.checked;
};
const onChange = (event) => {
    selectAll.value = event.value.length === items.value.length;
};

const selectedItems = ref();
const selectAll = ref(false);
const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));

//////
const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();

let endpoint = ref('/planner_tasks'); //replace endpoint with your endpoint
const loading = ref(false);

const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

onMounted(async () => {
    await loadLazyData();
});

const filters = ref();
onBeforeMount(() => {
    initFilters();
});

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        //xxxx: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    await getAllResponseAPI(endpoint.value);
    loading.value = false;
    data_planner.product_type.value=dataResponseAPI.data[0].product.name
};

const listRowSelect = ref([]);
const selectedRegisters = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};
//Cut and paste this at the end
watch(listRowSelect, onRowSelect);
const onSelectAllChange = () => {
    onRowSelect();
};

const mode = ref();
const formDialog = ref(false);
const deleteDialog = ref(false);
const headerDialog = ref('');
const hideDialog = () => {
    formDialog.value = false;
    deleteDialog.value = false;
    recordsDelete.value = [];
    resetValues();
};
const resetValues = () => {};
const assignValues = (modex) => {
    if (modex === 'EDIT') {
    }
    if (modex === 'CLONE') {
    }
};
const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New xxxxxxx record';
};
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a xxxxx record';
    assignValues(mode.value);
};
const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a xxxx record';
    formDialog.value = true;
    assignValues(mode.value);
};
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a xxxxx record';
    resetValues();
    deleteDialog.value = true;
};
const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a xxxxx record';
    resetValues();
    formDialog.value = true;
};
</script>

<style lang="scss" scoped>
</style>