<template>
    <div>

        <div class="card">
            <h1>{{ $t('menu.production.cropLots') }}</h1>

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
            
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Code :</label>
                        <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="codeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.code"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="area_m2V" class="font-semibold w-3">Area(m2):</label>
                        <InputText id="area_m2V" v-model="area_m2V" class="flex-auto" autocomplete="off" v-bind="area_m2VProps" />
                    </div>
        
                    <FrontEndErrors :errorsNew="errorsNew" name="area_m2V" />
                    <BackendErrors :name="errorResponseAPI?.errors?.area_m2"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="channel_averageV" class="font-semibold">Channel avg:</label>
                        <InputNumber id="channel_averageV" v-model="channel_averageV" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="channel_averageV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.channel_average"/>

                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="zoneV" class="font-semibold w-6rem">Zone :</label>
                        <InputText id="zoneV" v-model="zoneV" class="flex-auto" autocomplete="off" v-bind="zonePropsV" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="zoneV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.zone"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="latitudeV" class="font-semibold">Latitude:</label>
                        <InputText id="latitudeV" v-model="latitudeV" class="flex-auto" autocomplete="off" v-bind="latitudeVProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="latitudeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.latitude"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="longitudeV" class="font-semibold">Longitude:</label>
                        <InputText id="longitudeV" v-model="longitudeV" class="flex-auto" autocomplete="off" v-bind="longitudeVProps" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="longitudeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.longitude"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farmV" inputId="ac" class="flex-auto" :suggestions="farms" @complete="searchBranches" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="farmV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid"/>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="companyV" inputId="ac" class="flex-auto" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="companyV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.company"/>
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
    // { field: 'uuid', header: 'UUID', frozen: false, color: false },
    { field: 'code', header: 'Code', frozen: false, color: false },
    { field: 'area_m2', header: 'Area (m²)', frozen: false, color: false },
    { field: 'channel_average', header: 'Channel Average', frozen: false, color: false },
    { field: 'zone', header: 'Zone', frozen: false, color: false },
    //{ field: 'latitude', header: 'Latitude', frozen: false, color: false },
    //{ field: 'longitude', header: 'Longitude', frozen: false, color: false },
    { field: 'created_at', header: 'Created At', frozen: false, color: false },
    { field: 'updated_at', header: 'Updated At', frozen: false, color: false },
    // Nested fields for status
    { field: 'status.name', header: 'Status Name', frozen: false, color: true },
    // Nested fields for farm
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    // Nested fields for company
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },
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


let endpoint = ref(`/crop_lots`);  //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export xxxxxxxxxx';
const formDialogDeleteTitle = 'Delete xxxxxxxxxx';
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
            // 'UUID': row.uuid,
            'Code': row.code,
            'Area (m2)': row.area_m2,
            'Channel Average': row.channel_average,
            'Zone': row.zone,
          },
          icon: 'pi pi-calendar',
          bgColor: 'bg-green-100',
          iconColor: 'text-green-500'
        },
        {
          title: 'Location',
          fields: {
            'Latitude': row.latitude,
            'Longitude': row.longitude,

          },
          icon: 'pi pi-tasks',
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-500'
        },

        {
                    title: 'Farm Information',
                    fields: {
                        'Farm Name': row.farm?.name,
                        'Farm Code': row.farm?.code,
                        'Farm Website': row.farm?.url_path
                    },
                    icon: 'pi pi-building',
                    bgColor: 'bg-teal-100',
                    iconColor: 'text-teal-500'
        },
        {
          title: 'Company Information',
          fields: {
            'Company Name': row.company?.name,
            'Company Code': row.company?.code,
            'Website': row.company?.url_path
          },
          icon: 'pi pi-building',
          bgColor: 'bg-teal-100',
          iconColor: 'text-teal-500'
        },
        {
          title: 'Status',
          fields: {
            'Status': row.status?.name,
            'Description': row.status?.description
          },
          icon: 'pi pi-info-circle',
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
    validationSchema: toTypedSchema(
        z.object({
            codeV: z.string().min(2),
            area_m2V: z.string().min(1),
            channel_averageV: z.number().min(1).max(100),
            zoneV: z.string().min(2),
            latitudeV: z.string().optional(),
            longitudeV: z.string().optional(),
            farmV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            companyV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});

const [codeV, codeVProps] = defineField('codeV');
const [area_m2V, area_m2VProps] = defineField('area_m2V');
const [channel_averageV, channel_averageVProps] = defineField('channel_averageV');
const [zoneV, zonePropsV] = defineField('zoneV');
const [latitudeV, latitudeVProps] = defineField('latitudeV');
const [longitudeV, longitudeVProps] = defineField('longitudeV');
const [farmV] = defineField('farmV');
const [companyV] = defineField('companyV');

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
        const { code, area_m2, channel_average, zone, latitude, longitude, farm, company } = listRowSelect.value[0];
        codeV.value = code;
        area_m2V.value = area_m2;
        channel_averageV.value = channel_average;
        zoneV.value = zone;
        latitudeV.value = latitude;
        longitudeV.value = longitude;
        farmV.value = { name: farm.name, id: farm.uuid };
        companyV.value = { name: company.name, id: company.uuid };
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
        code: values.codeV,
        area_m2: values.area_m2V,
        channel_average: values.channel_averageV,
        zone: values.zoneV,
        latitude: values.latitudeV,
        longitude: values.longitudeV,
        farm_uuid: values.farmV?values.farmV.id: farmDefault,
        company_uuid: values.companyV?values.companyV.id: companyDefault

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

</script>

<style lang="scss" scoped></style>