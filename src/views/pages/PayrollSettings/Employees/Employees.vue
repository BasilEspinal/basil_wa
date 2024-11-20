<template>
    <div>

        <div class="card">
            <!-- <h1 v-if="!ability.can('menux','comercialx')">{{ $t('menux') }}</h1> -->
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-6 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 2rem">
                            <template #center>
                                <Divider layout="vertical" />
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Detalles" icon="pi pi-bars" class="p-button-success mb-2 mt-2"
                                    @click="openForm('detalles')" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit"
                                    icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openDialog('edit')"
                                    size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="listRowSelect.length > 0" label="New" icon="pi pi-plus"
                                    class="p-button-success mb-2 mt-2" @click="openDialog('new')" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2"
                                    @click="openDialog('clone')" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="listRowSelect.length > 0" label="Export" icon="pi pi-file-import"
                                    class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash"
                                    class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                                <Divider v-if="ability.can('empleado_editar')" layout="vertical" />
                                <!-- ActionButton Component -->
                                <ActionButton v-if="ability.can('empleado_editar')" :items="itemsActions" :listRowSelect="listRowSelect" />

    
                            </template>
                        </Toolbar>
                    </div>

                </div>
            </div>
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
                        </template>
                        <template v-slot:center>

                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label">
                            </SelectButton>

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

                <Summary :listRowSelect="listRowSelect" />
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid mx-auto">
                <!-- <div class="grid">
                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center">

                            <label for="confirmed_qty_V" class="font-semibold w-6rem"> {{
                                    t('appmovil.quantityRequested') }}</label>

                            <InputNumber v-model="confirmed_qty_V" class="flex-auto" showButtons
                                buttonLayout="horiontal" :min="0">
                                <template #incrementbuttonicon>
                                    <span class="pi pi-plus" />
                                </template>
                                <template #decrementbuttonicon>
                                    <span class="pi pi-minus" />
                                </template>
                            </InputNumber>
                        </div>

                        <FrontEndErrors :errorsNew="errorsNew" name="confirmed_qty_V" />
                        <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />

                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center">

                            <label class="font-semibold w-6rem" for="textarea">{{ t('appmovil.notas') }}</label>
                            <Textarea v-model="notes" class="flex-auto" inputId="textarea" rows="5" cols="30"
                                variant="filled" />
                            <FrontEndErrors :errorsNew="errorsNew" name="notes" />
                            <BackendErrors :name="errorResponseAPI?.errors?.notes_small" />

                        </div>
                    </div>



                </div> -->
                <Card class="p-fluid text-center mx-auto flex flex-wrap gap-3 mb-3 p-fluid flex-auto" v-if="backendValidationFlag">
                    <template #title>Please check this</template>
                        <template #content>
                            <div class="flex-auto">
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['backendValidation'] }">
                                {{ backendValidation.error }}
                                </small>
                            </div>
                        </template>
                </Card>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="gender_id" class="font-bold block mb-2"> Gender </label>
                        <Dropdown v-model="gender_id" :options="GenderList" optionLabel="name" class="w-full md:w-15rem" inputId="gender_id"  />
                        <FrontEndErrors :errorsNew="errorsNew" name="gender_id" />
                        <BackendErrors :name="errorResponseAPI?.errors?.gender" />

                    </div>
                    <div class="flex-auto">
                        <label for="first_name" class="font-bold block mb-2"> First Name </label>
                        <InputText id="username" v-model="first_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="first_nameProps" inputId="first_name" :useGrouping="false" />
                        <FrontEndErrors :errorsNew="errorsNew" name="first_name" />
                        <BackendErrors :name="errorResponseAPI?.errors?.first_name" />
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="last_name" class="font-bold block mb-2"> Surname </label>
                        <InputText id="username" v-model="last_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_nameProps" inputId="last_name" :useGrouping="false" />
                        <FrontEndErrors :errorsNew="errorsNew" name="last_name" />
                        <BackendErrors :name="errorResponseAPI?.errors?.last_name" />
                    </div>
                    <div class="flex-auto">
                        <label for="last_name_b" class="font-bold block mb-2"> Second Surname </label>
                        <InputText id="username" v-model="last_name_b" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_name_bProps" inputId="last_name_b" :useGrouping="false" />
                        <FrontEndErrors :errorsNew="errorsNew" name="last_name_b" />
                        <BackendErrors :name="errorResponseAPI?.errors?.last_name_b" />
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="document_type" class="font-bold block mb-2"> Document Type </label>
                        <Dropdown v-model="document_type" :options="DocumentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="document_type"  />
                        <FrontEndErrors :errorsNew="errorsNew" name="last_name_b" />
                        <BackendErrors :name="errorResponseAPI?.errors?.last_name_b" />
                    </div>
                    <div class="flex-auto">
                        <label for="documento" class="font-bold block mb-2"> Document </label>
                        <InputNumber v-model="documento" class="w-full md:w-15rem" inputId="documento" v-bind="documentoProps" />
                        <FrontEndErrors :errorsNew="errorsNew" name="documento" />
                        <BackendErrors :name="errorResponseAPI?.errors?.document" />
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="bank_account_number" class="font-bold block mb-2"> Bank Account Number </label>
                        <InputNumber v-model="bank_account_number" class="w-full md:w-15rem" inputId="bank_account_number" v-bind="bank_account_numberProps" />
                        <FrontEndErrors :errorsNew="errorsNew" name="bank_account_number" />
                        <BackendErrors :name="errorResponseAPI?.errors?.bank_account_number" />
                    </div>
                    <div class="flex-auto">
                        <label for="bank_account_doc" class="font-bold block mb-2"> Bank Account Doc </label>
                        <InputText id="bank_account_doc" v-model="bank_account_doc" class="flex-auto md:w-15rem" autocomplete="off" v-bind="bank_account_docProps" inputId="bank_account_doc" :useGrouping="false" />
                        <FrontEndErrors :errorsNew="errorsNew" name="bank_account_doc" />
                        <BackendErrors :name="errorResponseAPI?.errors?.bank_account_doc" />
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="payment_type_uuid" class="font-bold block mb-2"> Payment Type </label>
                        <Dropdown v-model="payment_type_uuid" :options="PaymentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="payment_type_uuid"  />
                        <FrontEndErrors :errorsNew="errorsNew" name="payment_type_uuid" />
                        <BackendErrors :name="errorResponseAPI?.errors?.payment_type_uuid" />
                    </div>
                    <div class="flex-auto">
                        <label for="work_center_uuid" class="font-bold block mb-2"> Work Center </label>
                        <Dropdown v-model="work_center_uuid" :options="WorkCenterList" optionLabel="name" class="w-full md:w-15rem" inputId="work_center_uuid" />
                        <FrontEndErrors :errorsNew="errorsNew" name="work_center_uuid" />
                        <BackendErrors :name="errorResponseAPI?.errors?.work_center_uuid" />
                    </div>

                </div>

                <div class="flex flex-wrap gap-3 mb-5 p-fluid" aria-hidden="false">
                    <div class="flex-auto">
                        <label for="email" class="font-bold block mb-2"> Email </label>
                        <InputText id="email" v-model="email" class="flex-auto md:w-15rem" autocomplete="off" v-bind="emailProps" inputId="email" :useGrouping="false" />
                        <FrontEndErrors :errorsNew="errorsNew" name="email" />
                        <BackendErrors :name="errorResponseAPI?.errors?.email" />
                    </div>
                    <div class="flex-auto">

                        <label for="JobType" class="font-bold block mb-2"> Job Type </label>
                        <AutoComplete v-model="job_typeV" inputId="ac" class="flex-auto" :suggestions="jobTypeList" @complete="searchJobTypes" field="name" dropdown />
                        
                        <FrontEndErrors :errorsNew="errorsNew" name="job_typeV" />
                        <BackendErrors :name="errorResponseAPI?.errors?.job_type_uuid" />
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid" aria-hidden="false">

                    <div class="flex-auto">
                        <label for="username" class="font-bold block mb-2">Company:</label>
                        <AutoComplete v-model="company" inputId="ac" class="flex-auto" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                        <FrontEndErrors :errorsNew="errorsNew" name="company" />
                        <BackendErrors :name="errorResponseAPI?.errors?.company" />
                    </div>


                    <div class="flex-auto" >
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm_uuid" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <FrontEndErrors :errorsNew="errorsNew" name="farm_uuid" />
                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
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
                        <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
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
import ability from '@/service/ability.js';
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
import Summary from '@/views/pages/template/V3/Summary.vue';
import ActionButton from '@/components/ActionButton.vue';
import {useActions} from '@/composables/ActionButton.js';
const { getItems,itemsActions, messageDialog,titleDialog,status_id_Action,flagDialog } = useActions();

const { t } = useI18n();

const dynamicColumns = [
    { field: 'document', header: 'Document', frozen: false, color: false },
    { field: 'document_type.name', header: 'Type of Document', frozen: false, color: false },
    { field: 'first_name', header: 'Name', frozen: false, color: false },
    { field: 'last_name', header: 'Last Name', frozen: false, color: false },
    { field: 'gender.name', header: 'Gender', frozen: false, color: false },
    { field: 'email', header: 'Email', frozen: false, color: false },
    { field: 'workCenter.name', header: 'Work Center Name', frozen: false, color: false },
    { field: 'jobType.name', header: 'Job Type', frozen: false, color: false },
    { field: 'bank_account_number', header: 'Bank Account Number', frozen: false, color: false },
    { field: 'bank_account_doc', header: 'Bank Account Document', frozen: false, color: false },
    { field: 'payment_type.name', header: 'Payment Type', frozen: false, color: false },
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },
    { field: 'created_at', header: 'Creation Date', frozen: false, color: false },
    { field: 'updated_at', header: 'Modification Date', frozen: false, color: false },
    { field: 'status.name', header: 'Status', frozen: false, color: true }
];

const formConfig = ref([
  {
    type: 'InputNumber',
    label: 'Quantity Requested',
    model: 'confirmed_qty_V',
    props: {
      min: 0,
      max: 1000,
      showButtons: true,
      buttonLayout: 'horizontal'
    }
  },
  {
    type: 'Textarea',
    label: 'Notes',
    model: 'notes',
    props: {
      rows: 5,
      cols: 30
    }
  }
]);

// Form data that holds values for the form fields
const formData = ref({
  confirmed_qty_V: null,
  notes: ''
});

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



const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
const uuidDiscrepancy = ref('');
let endpoint = ref(`/employees`);  //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const GenderList = ref([]);
const DocumentTypeList = ref([]);
const WorkCenterList = ref([]);
const PaymentTypeList = ref([]);
const jobTypeList = ref([]);
const JobTypeList = ref([]);

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
const onRowSelect = (data) => {
    listRowSelect.value = data;
    openDialogSettlement('patch_action');
};

const openDialogSettlement = async (mode) => {
    
    if(listRowSelect.value.length != 0){
        await getItems(listRowSelect.value[0].status.id);
    }
    state.value = mode;
    console.log('mode', mode);
    console.log('state', state.value);

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

    //const respDocumentTypeList = await getRequest('/lists/documentType');
    const respDocumentTypeList = await InitialDataService.getDocumentsType();
    if (!respDocumentTypeList.ok) toast.add({ severity: 'error', detail: 'Error' + respDocumentTypeList.error, life: 3000 });
    DocumentTypeList.value = respDocumentTypeList.data.data.map((comp) => ({ id: comp.id, name: comp.label }));

    const respWorkCenter = await InitialDataService.getWorkCenters();
    console.log('respWorkCenter', respWorkCenter);
    if (!respWorkCenter.ok) toast.add({ severity: 'error', detail: 'Error' + respWorkCenter.error, life: 3000 });
    WorkCenterList.value = respWorkCenter.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    //const respGenderList = await getRequest('/lists/genderType');
    const respGenderList = await InitialDataService.getGenderTypes();
    if (!respGenderList.ok) toast.add({ severity: 'error', detail: 'Error' + respGenderList.error, life: 3000 });
    GenderList.value = respGenderList.data.data.map((comp) => ({ id: comp.id, name: comp.label }));

    //const respJobType = await getRequest('/job_types');
    const respJobType = await InitialDataService.getJobTypes();
    if (!respJobType.ok) toast.add({ severity: 'error', detail: 'Error' + respJobType.error, life: 3000 });
    JobTypeList.value = respJobType.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
    console.log('JobTypeList', JobTypeList.value);

    //const respPaymentType = await getRequest('/payment_types');
    const respPaymentType = await InitialDataService.getPaymentTypes();
    if (!respPaymentType.ok) toast.add({ severity: 'error', detail: 'Error' + respPaymentType.error, life: 3000 });
    PaymentTypeList.value = respPaymentType.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));


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
    initialValues:{
        job_typeV: {id: '', name: ''}
    },  
    validationSchema: toTypedSchema(
        z.object({
            documento: z.number().min(10000000, 'min length 8').max(999999999999, 'max length 12'),
            first_name: z.string().min(3),
            last_name: z.string().min(3),
            last_name_b: z.string().min(3),
            gender_id: z.object({
                id: z.string(),
                name: z.string().min(3)
            }),
            email: z.string().email().optional(),
            document_type: z.object({
                id: z.string(),
                name: z.string().min(3)
            }),
            bank_account_number: z.number().min(10000000, 'min length 8'),
            bank_account_doc: z.string().min(3),
            job_typeV: z.object({
                id: z.string().min(3),
                name: z.string().min(3)
            }),
            payment_type_uuid: z.object({
                id: z.string().min(3),
                name: z.string().min(3)
            }),
            work_center_uuid: z.object({
                id: z.string().min(3),
                name: z.string().min(3)
            }),
            farm_uuid: z
                .object({
                    id: z.string().min(3),
                    name: z.string().min(3)
                })
                .optional(),

            company: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()

        })
    )
});

const [documento, documentoProps] = defineField('documento');
const [first_name, first_nameProps] = defineField('first_name');
const [last_name, last_nameProps] = defineField('last_name');
const [last_name_b, last_name_bProps] = defineField('last_name_b');
const [email, emailProps] = defineField('email');
const [bank_account_number, bank_account_numberProps] = defineField('bank_account_number');
const [bank_account_doc, bank_account_docProps] = defineField('bank_account_doc');
const [gender_id] = defineField('gender_id');
const [document_type] = defineField('document_type');
const [job_typeV] = defineField('job_typeV');
const [payment_type_uuid] = defineField('payment_type_uuid');
const [work_center_uuid] = defineField('work_center_uuid');
const [farm_uuid] = defineField('farm_uuid');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);


const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');


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
        const {
        document: documentoN,
        first_name: firstName,
        last_name: lastName,
        last_name_b: lastNameB,
        email: Email,
        gender: Gender,
        document_type: DocumentType,
        bank_account_number: BankAccountNumber,
        bank_account_doc: BankAccountDoc,
        payment_type: PaymentType,
        jobType: JobType,
        workCenter: WorkC,
        farm: Farm,
        company: empresa
    } = listRowSelect.value[0];

    documento.value = Number(documentoN);
    first_name.value = firstName;
    last_name.value = lastName;
    last_name_b.value = lastNameB;
    gender_id.value = { id: Gender.id, name: Gender.name };
    email.value = Email;
    document_type.value = DocumentTypeList.value.filter((a) => a.id == DocumentType.id)[0];
    bank_account_number.value = Number(BankAccountNumber);
    bank_account_doc.value = BankAccountDoc;
    job_typeV.value  = { id: JobType.uuid, name: JobType.name };
    payment_type_uuid.value = { id: PaymentType.uuid, name: PaymentType.name };
    work_center_uuid.value = { id: WorkC.uuid, name: WorkC.name };
    farm_uuid.value = { id: Farm.uuid, name: Farm.name };
    company.value = { id: empresa.uuid, name: empresa.name };
    


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
    const data = {
        document: values.documento + '',
        first_name: values.first_name,
        last_name: values.last_name,
        last_name_b: values.last_name_b,
        gender_id: values.gender_id.id,
        email: values.email,
        document_type: values.document_type.id,
        bank_account_number: values.bank_account_number + '',
        bank_account_doc: values.bank_account_doc,
        payment_type_uuid: values.payment_type_uuid.id,
        job_type_uuid: values.job_typeV.id,
        work_center_uuid: values.work_center_uuid.id,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        status_id: 33
    };
    console.log('data:', data);
    if (state.value === 'new') {
        responseCRUD.value = await crudService.create(data);

    } else if (state.value === 'edit') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.update(uuid, data);
    } 
    else if (state.value === 'clone') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.create(data);
    }
    else if (state.value === 'patch') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.patch(uuid, data);
    }
    else if (state.value === 'delete') {
        const { uuid } = listRowSelect.value[0];
    }

    else {

    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    toast.add({
        severity: responseCRUD.value.ok ? 'success' : 'error',
        summary: state.value,
        detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
        life: 3000
    });

    if (responseCRUD.value.ok) {
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
    else {
        console.log('Error:', responseCRUD.value.error);
    }

    // Recargar datos
    loadingData();
});

const patchAction = async () => {

    
    const responseCRUD = ref();
    const { uuid } = listRowSelect.value[0];
        const data = {
            status_id: status_id_Action.value
        };
    responseCRUD.value = await crudService.patch(uuid, data);
    console.log('responseCRUD', responseCRUD.value);
    toast.add({
        severity: responseCRUD.value.ok ? 'success' : 'error',
        summary: 'Patch',
        detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
        life: 3000
    });
    if (responseCRUD.value.ok) {
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
        flagDialog.value = false;
    }
    else {
        console.log('Error:', responseCRUD.value.error);
    }
    loadingData();


        
};



const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach(async (item) => {
            //const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            const deletePromise = await crudService.delete(item.uuid);

            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
};

function formatCSV(eventos) {
    const dataExport = [];
    dataExport.push(',' + Object.keys(eventos[0]) + '\n');
    dataExport.push(eventos.map((row) => Object.values(row) + '\n'));

    const blob = new Blob([dataExport.toString()], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value;
    link.click();
}

function formatXLS(eventos) {
    const data = eventos.map((row) => Object.values(row));
    const headers = Object.keys(eventos[0]);
    const prueba = [headers, ...data];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(prueba, { headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const binaryData = XLSX.write(workbook, { type: 'array' });

    const file = new File([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // saveAs(file, filename.value + '.xlsx');
}


const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};

const searchJobTypes = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            jobTypeList.value = [...JobTypeList.value];
        } else {
            jobTypeList.value = JobTypeList.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
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
const searchFarms = (event) => {
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