<template>
    <div>

        <div class="card">
            <h1>{{ $t('menu.taskRates') }}</h1>

            <Dialog v-model:visible="flagDialog" :style="{ width: '450px' }" :header="titleDialog" :modal="true">
            <label for="username" class="text-2xl font-medium w-6rem"> {{ messageDialog }} </label>
            <!-- <Summary :listRowSelect="listRowSelect" /> -->
            <div class="flex justify-content-end gap-2">
              <Button type="button" label="Cancel" severity="secondary" @click="flagDialog = false" />
              <Button type="button" label="Save" @click="patchAction" />
              
            </div>
          </Dialog>
            <!-- <pre>{{ listRowSelect }}</pre> -->
            <DataTable :value="dataFromComponent" dataKey="uuid" tableStyle="min-width: 75rem" showGridlines
                :loading="loading" scrollable scrollHeight="600px" resizableColumns columnResizeMode="expand"
                sortMode="multiple" :paginator="true" :rows="50" :rowsPerPageOptions="[5, 10, 20, 50]"
                :class="`p-datatable-${size?.class || 'default-size'}`" @row-select="onRowSelect(listRowSelect)"
                @row-unselect="onRowSelect(listRowSelect)" @select-all-change="onSelectAllChange"
                v-model:selection="listRowSelect" filterDisplay="menu" v-model:filters="filters"
                :globalFilterFields="globalFilter">
                <template #header>
                    <!--Uncomment when filters are done-->

                    <Toolbar class="mb-2">
                        <template v-slot:start>
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar"
                                class="p-button-outlined mb-2" @click="clearFilter()" />
                                
                        </template>
                        <template v-slot:end>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                            </span>
                            
                                            <!-- Action Button -->

                        </template>
                        
                        <template v-slot:center>

                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label">
                            </SelectButton>
                            
                            

                        </template>

                        
                    </Toolbar>
                    
                  <Toolbar>
                    <template v-slot:start>
                    <div class="grid justify-content-center">
    <!-- Toolbar -->
    
                
                    <!--Uncomment when table is done-->

                    

                                
                                    
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                            
                                            icon="pi pi-bars" 
                                            class="mr-2" 
                                            @click="openForm('detalles')" 
                                        />
                                    </div>
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" 
                                            
                                            icon="pi pi-file-edit" 
                                            class="p-button-help mr-2" 
                                            @click="openDialog('edit')" 
                                        />
                                    </div>

                                    <!-- Second row -->
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="listRowSelect.length > 0" 
                                            
                                            icon="pi pi-plus" 
                                            class="p-button-success mr-2" 
                                            @click="openDialog('new')" 
                                        />
                                    </div>
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" 
                                            icon="pi pi-copy" 
                                            class="p-button-secondary mr-2" 
                                            @click="openDialog('clone')" 
                                        />
                                    </div>

                                    <!-- Third row -->
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="!listRowSelect.length > 0" 
                                            icon="pi pi-file-import" 
                                            class="p-button-warning mr-2" 
                                            @click="openExport" 
                                        />
                                    </div>
                                    <div class="col-12 lg:col-2 text-center">
                                        <Button 
                                            :disabled="!listRowSelect.length > 0" 
                                            icon="pi pi-trash" 
                                            class="p-button-danger mr-2" 
                                            @click="openDelete" 
                                        />
                                    </div>



                                

                    


                
    
</div>

                    </template>
                    <template v-slot:end>
    <div class="col-12 lg:col-12 text-center ">
                                    <ActionButton 
                                        :items="itemsActions" 
                                        :listRowSelect="listRowSelect" 
                                        class="w-12"   
                                    />
                                    </div>  
                    </template>
                  </Toolbar>  
                </template>
                

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column v-for="(col) in dynamicColumns" :key="col.field" :field="col.field" :header="col.header"
                    :frozen="col.frozen || false" sortable>
                    <!-- Header Template -->
                    <template v-if="col.frozen" #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel=""
                            offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <!-- Body Template -->
                    <template #body="{ data }">
                        <!-- Conditionally render the Tag component if col.color is true -->
                        <Tag v-if="col.color" :value="getNestedValue(data, col.field)"
                            :style="{ backgroundColor: data.status.color, color: '#FFFFFF' }" />

                        <!-- Render the text only if Tag is not rendered -->
                        <span v-else>
                            {{ getNestedValue(data, col.field) }}
                        </span>
                    </template>

                    <!-- Filter Template -->
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            :placeholder="'Search by ' + col.header" />
                    </template>
                </Column>




            </DataTable>
            <Dialog v-model:visible="formProperties.open" modal :header="formProperties.title"
                class="p-fluid text-center mx-auto">
                <div class="grid"> 
                <Summary
                    v-for="(cardData, index) in cardSections"
                    :key="index"
                    :title="cardData.title"
                    :fields="cardData.fields"
                    :icon="cardData.icon"
                    :bgColor="cardData.bgColor"
                    :iconColor="cardData.iconColor"
                    />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <div class="grid">
                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="taskType" class="font-semibold w-3"> Tasks Type </label>
                            <AutoComplete v-model="taskTypeV" class="w-full" inputId="taskTypeV" :suggestions="taskOfType" @complete="searchTaskOfType" field="name" dropdown />
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['taskType'] }">
                                    {{ errorsNew.taskType }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.taskType" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="type_date" class="font-semibold w-3"> Type Date </label>
                            <Dropdown v-model="type_date" :options="typeDateList" optionLabel="name" class="w-full" inputId="type_date" v-bind="type_dateProps" />
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['type_date'] }">
                                    {{ errorsNew.type_date }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.work_type_day" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3">
                        <div class="flex align-items-center">
                            <label for="username" class="font-semibold w-3">Task type tarif: </label>
                            <AutoComplete v-model="task_type_tarifV" dropdown inputId="task_type_tarifV" :suggestions="task_type_tarifObject" field="name" @complete="searchTypeOfTaskTarif" placeholder="Busca o selecciona " />
                        </div>
                        <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['task_type_tarifV'] }">
                            {{ errorsNew.task_type_tarifV }}
                        </small>
                        <BackendErrors :name="errorResponseAPI?.errors?.type_price" />
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="price_tarif" class="font-semibold w-3"> Price Tarif </label>
                            <InputNumber v-model="price_tarif" class="w-full" inputId="price_tarif" mode="currency" currency="USD" locale="en-US" v-bind="price_tarifProps" />
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['price_tarif'] }">
                                    {{ errorsNew.price_tarif }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.price_tarif" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="packingType" class="font-semibold w-3"> Packing Types </label>
                            <AutoComplete v-model="packingType" class="w-full" inputId="packingType" :suggestions="packingTipesL" @complete="searchPackingType" field="name" dropdown />
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packingType'] }">
                                    {{ errorsNew.packingType }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.packing_type" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="farm" class="font-semibold w-3"> Farm </label>
                            <AutoComplete v-model="farm" class="w-full" inputId="farm" :suggestions="farms" @complete="searchBranches" field="name" dropdown />
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                    {{ errorsNew.farm }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.farm" />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-3 mb-1">
                            <label for="username" class="font-semibold w-3">Company:</label>
                            <AutoComplete v-model="company" class="w-full" inputId="ac" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                        </div>
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                {{ errorsNew.company }}
                            </small>
                            <BackendErrors :name="errorResponseAPI?.errors?.company" />
                        </div>
                    </div>
                </div>


                <div class="flex justify-content-end gap-2 flex-auto">
                    <Button class="flex-auto" type="button" label="Cancel" severity="secondary"
                        @click="formDialog = false" />
                    <Button class="flex-auto" type="button" label="Save" @click="actionRecordManager(state)" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle"
                :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="username" v-model="filename" class="flex-auto" autocomplete="off"
                            v-bind="nameProps" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name"
                            :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle"
                :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected
                    ones?
                </label>
                <div class="card flex flex-wrap mt-2 gap-2">
                    <div v-for="item in listRowSelect" :key="item.id">
                        
                        <Chip :label="item.code" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />
        </div>
    </div>

</template>

<!-- 
filterDisplay="menu"
v-model:filters="filters"
:globalFilterFields="['', 'company.name']"


const documentFrozen = ref(false); change name field 
<DataTable id="tblData"
     -->
<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import Summary from '@/components/Summary.vue';
import ActionButton from '@/components/ActionButton.vue';
import {useActions} from '@/composables/ActionButton.js';
const { getItems,itemsActions, messageDialog,titleDialog,status_id_Action,flagDialog } = useActions(`/processflow/CropLot`);

const { t } = useI18n();

const dynamicColumns = [
    
    { field: 'work_type_day', header: 'Work Type Day', frozen: false, color: false },
    { field: 'type_price', header: 'Type Price', frozen: false, color: false },
    { field: 'price_tarif', header: 'Price Tarif', frozen: false, color: false },
    // Nested fields for taskType
    
    { field: 'taskType.name', header: 'Task Type Name', frozen: false, color: false },
    // Nested fields for packing_type
    
    { field: 'packing_type.name', header: 'Packing Type Name', frozen: false, color: false },
    { field: 'packing_type.code_dispatch', header: 'Code Dispatch', frozen: false, color: false },
    { field: 'packing_type.weight_tare', header: 'Weight Tare', frozen: false, color: false },
    // Nested fields for company
    
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },
    
    // Nested fields for farm
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    { field: 'status.name', header: 'Status Name', frozen: false, color: true },
    
];




const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
};
const formProperties = ref({ open: false, title: '', mode: '', data: null });
const openForm = (mode) => {
    console.log(mode);

    formProperties.value = {
        open: true,
        title: mode === 'Ver Detalles',
        mode: mode,
        data: mode === 'detalles' ? null : listRowSelect.value[0]
    };
}


let endpoint = ref('/tarif_of_tasks');
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const PackingTipeList = ref([]);
const packingTipesL = ref([]);
const TaskOfType = ref([]);
const taskOfType = ref([]);
const task_type_tarif = ref([]);
const task_type_tarifObject = ref([]);
const typeDateList = ref([]);


const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export records';
const formDialogDeleteTitle = 'Delete records';
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');

let size = ref()
let sizeOptions = ref()

onMounted(() => {

});

onBeforeMount(() => {

    readAll();
    initFilters();

});
const listRowSelect = ref([]);
const loading = ref(false);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
watch(listRowSelect, RowSelect);
const cardSections = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    openDialogSettlement('patch_action');
    const row = listRowSelect.value[0];
    if (row) {
        cardSections.value = [
            {
                title: 'General Information',
                fields: {
                    'UUID': row.uuid,
                    'Work Type Day': row.work_type_day,
                    'Type Price': row.type_price,
                    'Price Tarif': row.price_tarif
                },
                icon: 'pi pi-calendar',
                bgColor: 'bg-green-100',
                iconColor: 'text-green-500'
            },
            {
                title: 'Task Type Information',
                fields: {
                    'Task Type ID': row.taskType?.id,
                    'Task Type UUID': row.taskType?.uuid,
                    'Task Type Code': row.taskType?.code,
                    'Task Type Name': row.taskType?.name
                },
                icon: 'pi pi-tasks',
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-500'
            },
            {
                title: 'Packing Type Information',
                fields: {
                    'Packing Type ID': row.packing_type?.id,
                    'Packing Type UUID': row.packing_type?.uuid,
                    'Packing Type Code': row.packing_type?.code,
                    'Packing Type Name': row.packing_type?.name,
                    'Code Dispatch': row.packing_type?.code_dispatch,
                    'Weight Tare': row.packing_type?.weight_tare
                },
                icon: 'pi pi-box',
                bgColor: 'bg-teal-100',
                iconColor: 'text-teal-500'
            },
            {
                title: 'Company Information',
                fields: {
                    'Company ID': row.company?.id,
                    'Company UUID': row.company?.uuid,
                    'Company Name': row.company?.name,
                    'Company Code': row.company?.code
                },
                icon: 'pi pi-building',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-500'
            },
            {
                title: 'Farm Information',
                fields: {
                    'Farm ID': row.farm?.id,
                    'Farm Name': row.farm?.name,
                    'Farm Code': row.farm?.code
                },
                icon: 'pi pi-map-marker',
                bgColor: 'bg-gray-100',
                iconColor: 'text-gray-500'
            }
        ];
    }
};


watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};
const filters = ref();

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
    dynamicColumns.forEach((col) => {
        filters.value[col.field] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        };
    });
};
// Dynamically create globalFilterFields based on dynamicColumns
const globalFilter = computed(() => {
    return dynamicColumns.map(col => col.field);
});
const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();

    InitialDataService.getSize().then((data) => { size.value = data; });
    InitialDataService.getSizeOptions().then((data) => { sizeOptions.value = data; });

    const respFarms = await InitialDataService.getBranches();
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await InitialDataService.getCompanies();
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const respTaskOfType = await InitialDataService.getTaskOfType();
    if (!respTaskOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTaskOfType.error, life: 3000 });
    TaskOfType.value = respTaskOfType.data.data.map((taskType) => ({ id: taskType.uuid, name: taskType.name }));
    
    const respTaskTypeTarif = await InitialDataService.getTaskTypeTarif();
    if (!respTaskTypeTarif.ok) toast.add({ severity: 'error', detail: 'Error' + respTaskTypeTarif.error, life: 3000 });
    task_type_tarif.value = respTaskTypeTarif.data.data.map((taskTypeTarif) => ({ id: taskTypeTarif.code, name: taskTypeTarif.label }));

    const respPacking = await InitialDataService.getPackingTypes();
    if (!respPacking.ok) toast.add({ severity: 'error', detail: 'Error' + respPacking.error, life: 3000 });
    PackingTipeList.value = respPacking.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const resptypeDate = await InitialDataService.getWorkTypeDay();
    if (!resptypeDate.ok) toast.add({ severity: 'error', detail: 'Error' + resptypeDate.error, life: 3000 });
    typeDateList.value = resptypeDate.data.data.map((comp) => ({ id: comp.id, name: comp.label }));

};
const loadingData = async () => {
    //const response = await getRequest(endpoint.value);
    const response = await crudService.getAll();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => { }
);

const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    initialValues: {
        task_type_tarifV: { name: '', id: '' },
        farm: { id: farmDefault, name: '' },
        company: { id: companyDefault, name: '' }
    },
    validationSchema: toTypedSchema(
        z.object({
            type_date: z
                .object({
                    name: z.string().min(6)
                })
                .optional(),

            task_type_tarifV: z.object({
                name: z.string().min(4),
                id: z.string().min(2)
            }),
            price_tarif: z.number(),
            farm: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            company: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            packingType: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            taskTypeV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});
const [type_date, type_dateProps] = defineField('type_date');
const [price_tarif, price_tarifProps] = defineField('price_tarif');
const [farm] = defineField('farm');
const [company] = defineField('company');
const [packingType] = defineField('packingType');
const [taskTypeV] = defineField('taskTypeV');
const [task_type_tarifV] = defineField('task_type_tarifV');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);


const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');

const openDialogSettlement = async (mode) => {
    
    if(listRowSelect.value.length != 0){
        await getItems(listRowSelect.value[0].status.id);
    }
    state.value = mode;
    
};

const openDialog = (mode) => {

    formDialogTitle.value = 
    mode === 'new' ? 'Create new register' :
    mode === 'edit' ? 'Edit new register' :
    mode === 'clone' ? 'Clone new register' :
    mode === 'patch' ? 'Patch new register' : '';

    if (mode === 'new') {
        resetForm();
    } else if (listRowSelect.value.length < 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    } else {
        resetForm();
        const { work_type_day, type_price: typePrice, price_tarif: priceTarif, taskType, packing_type, farm: Farm } = listRowSelect.value[0];

        type_date.value = { id: work_type_day, name: work_type_day };
        task_type_tarifV.value = { id: typePrice, name: typePrice };
        price_tarif.value = Number(priceTarif);
        taskTypeV.value = { id: taskType.uuid, name: taskType.name };
        packingType.value = { id: packing_type.uuid, name: packing_type.name };
        farm.value = { id: Farm.uuid, name: Farm.name };
        company.value = { id: Farm.uuid, name: Farm.name };
        
    }

    formDialog.value = true;
    state.value = mode;
};


const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const actionRecordManager = handleSubmitNew(async (values) => {
    const responseCRUD = ref();
    console.log('listRowSelect:', listRowSelect.value);
    console.log(values)
    const data = {
        work_type_day: values.type_date.name,
        type_price: values.task_type_tarifV ? values.task_type_tarifV.id : 'No llega',
        price_tarif: values.price_tarif,
        tasks_of_type_uuid: values.taskTypeV ? values.taskTypeV.id : '',
        packing_type_uuid: values.packingType ? values.packingType.id : '',
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        company_uuid: values.company ? values.company.id : companyDefault
    };
    console.log('data:', data);
    if (state.value === 'new') {
        responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'edit') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.update(uuid, data);

    } else if (state.value === 'clone') {
        
        responseCRUD.value = await crudService.create(data);
    }
    else if (state.value === 'patch') {
        responseCRUD.value = await crudService.patch(uuid, data);
    }
 else {
        const { uuid } = listRowSelect.value[0];
    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    if (responseCRUD.value.ok) {
    toast.add({
        severity: responseCRUD.value.ok ? 'success' : 'error',
        summary: state.value,
        detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
        life: 3000
    });
    await loadingData();
    
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
    else {
        console.log('Error:', responseCRUD.value.error);
    }
});


const patchAction = async () => {

try {
    const patchPromises = [];
    listRowSelect.value.forEach(async (item) => {
        
        const data = {
        status_id: status_id_Action.value
        };
        const patchPromise = await crudService.patch(item.uuid, data);
        console.log('patchPromise:', patchPromise);
        patchPromises.push(patchPromise);
    });

const responses = await Promise.all(patchPromises);


const hasError = responses.some(response => !response.ok);

if (!hasError) {
toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Records updated successfully',
    life: 3000
});

formDialog.value = false;
listRowSelect.value = [];
selectedRegisters.value = [];
flagDialog.value = false;
} else {
toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Some records could not be updated',
    life: 3000
});
}

await loadingData(); // Refresh data
} catch (error) {
    console.error('Error updating records:', error);
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Error updating records',
        life: 3000
    });
}

finally {listRowSelect.value = [];}
};

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        // Crear una lista de promesas para eliminar
        const deletePromises = listRowSelect.value.map(async (item) => {
            const response = await crudService.delete(item.uuid);
            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.error}`);
            }
            return response;
        });

        await Promise.all(deletePromises);
        await loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted successfully', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting records', life: 3000 });
    } finally {
        
        listRowSelect.value = [];
    }
};


const ExportRecord = () => {
    // Determine the data to export
    const events = exportAll.value.name === 'ALL'
        ? dataFromComponent.value.map((data) => data) // Export all current records
        : listRowSelect.value.map((data) => data);   // Export only selected records

    // Close the export dialog
    formDialogExport.value = false;

    // Check if there is data to export
    if (!events.length) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No data to export', life: 3000 });
        return;
    }

    // Export based on the selected format
    if (format.value.name === 'CSV') formatCSV(events);
    else formatXLS(events);
};

function formatCSV(events) {
    if (!events.length) return;

    // Updated flattenObject to handle arrays and nested objects
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (Array.isArray(value)) {
                // Handle arrays by joining their values into a string
                acc[fullKey] = value.map(item => (typeof item === 'object' ? JSON.stringify(item) : item)).join('; ');
            } else if (value && typeof value === 'object' && !(value instanceof Date)) {
                // Recursively flatten nested objects
                Object.assign(acc, flattenObject(value, fullKey));
            } else {
                acc[fullKey] = value;
            }
            return acc;
        }, {});
    };

    const flattenedData = events.map((item) => flattenObject(item));
    const headers = Object.keys(flattenedData[0]);

    // Create CSV content
    const rows = flattenedData.map((row) =>
        headers.map((header) => `"${row[header] ?? ''}"`).join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value || 'export.csv';
    link.click();
}

function formatXLS(events) {
    if (!events.length) return;

    // Updated flattenObject to handle arrays and nested objects
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (Array.isArray(value)) {
                // Handle arrays by joining their values into a string
                acc[fullKey] = value.map(item => (typeof item === 'object' ? JSON.stringify(item) : item)).join('; ');
            } else if (value && typeof value === 'object' && !(value instanceof Date)) {
                // Recursively flatten nested objects
                Object.assign(acc, flattenObject(value, fullKey));
            } else {
                acc[fullKey] = value;
            }
            return acc;
        }, {});
    };

    const flattenedData = events.map((item) => flattenObject(item));
    const headers = Object.keys(flattenedData[0]);
    const data = flattenedData.map((row) => headers.map((header) => row[header] ?? ''));

    // Create XLSX worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Generate and download file
    const binaryData = XLSX.write(workbook, { type: 'array' });
    const blob = new Blob([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value || 'export.xlsx';
    link.click();
}




const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
    
};

const searchCompanies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchBranches = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);


};

const searchTypeOfTaskTarif = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            task_type_tarifObject.value = [...task_type_tarif.value];
        } else {
            task_type_tarifObject.value = task_type_tarif.value.filter((task) => {
                return task.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchTaskOfType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            taskOfType.value = [...TaskOfType.value];
        } else {
            taskOfType.value = TaskOfType.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingTipesL.value = [...PackingTipeList.value];
        } else {
            packingTipesL.value = PackingTipeList.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

</script>

<style lang="scss" scoped></style>