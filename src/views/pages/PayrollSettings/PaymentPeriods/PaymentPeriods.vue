<template>
    <div>
        <div class="card">
            <div>
                <h1>{{ titlePage }}</h1>
            </div>
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 1rem">
                            <template #center>
                                <Button v-if="ability.can('periodo_pago_crear')" :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                                <Divider layout="vertical" />
                                <Button
                                    v-if="ability.can('periodo_pago_editar')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Edit"
                                    icon="pi pi-file-edit"
                                    class="p-button-help mb-2 mt-2"
                                    @click="openEdit"
                                    size="large"
                                />
                                <Divider layout="vertical" />
                                <Button
                                    v-if="ability.can('periodo_pago_crear')"
                                    :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)"
                                    label="Clone"
                                    icon="pi pi-copy"
                                    class="p-button-secondary mb-2 mt-2"
                                    @click="openClone"
                                    size="large"
                                />
                                <Divider layout="vertical" />
                                <Button v-if="ability.can('periodo_pago_editar')" :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider layout="vertical" />
                                <Button v-if="ability.can('periodo_pago_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>
            <!-- <pre>{{ dataResponseAPI }}</pre> -->
            <DataTable
                :value="dataFromComponent"
                dataKey="uuid"
                tableStyle="min-width: 75rem"
                showGridlines
                :loading="loading"
                scrollable
                scrollHeight="600px"
                resizableColumns
                columnResizeMode="expand"
                sortMode="multiple"
                :paginator="true"
                :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                :class="`p-datatable-${size.class}`"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onSelectAllChange"
                v-model:selection="selectedRegisters"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="['name', 'company.name', 'farm.name', 'status.name', 'created_at', 'updated_at']"
                v-if="ability.can('periodo_pago_listado')"
            >
                <template #header>
                    <!--Uncomment when filters are done-->

                    <Toolbar class="mb-2">
                        <template v-slot:start>
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                        </template>
                        <template v-slot:end>
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                            </span>
                        </template>
                        <template v-slot:center>
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                        </template>
                    </Toolbar>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="code" filterField="code" header="Code" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <template #body="{ data }">
                        {{ data.code }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="start_date" filterField="start_date" header="Start date" sortable>
                    <template #body="{ data }">
                        {{ data.start_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="end_date" filterField="end_date" header="End date" sortable>
                    <template #body="{ data }">
                        {{ data.end_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="period_num" filterField="period_num" header="Period Number" sortable>
                    <template #body="{ data }">
                        {{ data.period_num }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="quantity_days" filterField="quantity_days" header="Quantity days" sortable>
                    <template #body="{ data }">
                        {{ data.period_num }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>
                <!--Here add other columns-->

                <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
                    <template #body="{ data }">
                        {{ data.farm.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by farm" />
                    </template>
                </Column>

                <Column field="companyName" filterField="company.name" header="Company Name" sortable>
                    <template #body="{ data }">
                        {{ data.company.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by farm" />
                    </template>
                </Column>

                <Column field="createdAt" filterField="created_at" header="Creation date" sortable>
                    <template #body="{ data }">
                        {{ data.created_at }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by creation date" />
                    </template>
                </Column>

                <Column field="updatedAt" filterField="updated_at" header="Modification date" sortable>
                    <template #body="{ data }">
                        {{ data.updated_at }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by modification date" />
                    </template>
                </Column>

                <Column field="status" filterField="status.name" header="Status" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.status.name" :severity="'EFC88B'" />
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by status" />
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="start_date" class="font-semibold w-3">Start Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="start_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="start_dateV" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.start_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.start_date"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="end_dateV" class="font-semibold w-3">End Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="end_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.end_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.end_date"/>
                </div>

                <!-- <div class="mb-3">
                    <div class=" flex align-items-center">
                        <label for="periodNumberV" class="font-semibold w-3">Period Number:</label>
                        <InputNumber v-model="periodNumberV" inputId="minmax" :min="0" :max="100" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.periodNumberV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.period_num" />
                </div> -->

                

                <div class="mb-3">
                    <div class=" flex align-items-center">
                        <label for="username" class="font-semibold w-6rem">Period Number type day: </label>
                    <AutoComplete v-model="periodNumberV" dropdown :suggestions="periodNumber" field="name"  @complete="searchPeriodNumber" placeholder="" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['periodNumberV'] }">
                        {{ errorsNew.periodNumberV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.period_num" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid"/>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="start_date" class="font-semibold w-3">Start Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="start_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="start_dateV" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.start_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.start_date"/>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="end_dateV" class="font-semibold w-3">End Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="end_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.end_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.end_date"/>
                </div>

                <div class="mb-3">
                    <div class=" flex align-items-center">
                        <label for="username" class="font-semibold w-6rem">Period Number type day: </label>
                    <AutoComplete v-model="periodNumberV" dropdown :suggestions="periodNumber" field="name"  @complete="searchPeriodNumber" placeholder="" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['periodNumberV'] }">
                        {{ errorsNew.periodNumberV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.period_num" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid"/>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="start_date" class="font-semibold w-3">Start Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="start_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="start_dateV" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.start_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.start_date" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="end_dateV" class="font-semibold w-3">End Date:</label>

                        <Calendar dateFormat="dd/mm/yy" v-model="end_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" />
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['transaction_dateV'] }">
                        {{ errorsNew.end_dateV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.end_date" />
                </div>


                <div class="mb-3">
                    <div class=" flex align-items-center">
                        <label for="username" class="font-semibold w-6rem">Period Number type day: </label>
                    <AutoComplete v-model="periodNumberV" dropdown :suggestions="periodNumber" field="name"  @complete="searchPeriodNumber" placeholder="" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['periodNumberV'] }">
                        {{ errorsNew.periodNumberV }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.period_num" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.farm" />
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogClone = false" />
                    <Button type="button" label="Save" @click="CloneRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle" :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="username" v-model="filename" class="flex-auto" autocomplete="off" v-bind="nameProps" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name" :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected ones? </label>
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
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder} from '@casl/ability';
import periodNumberValues from '@/composables/PayrollSettings/PaymentPeriods/periodNumbers.json';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
const prueba = ref({revisar: 'revisar GET-POST-PUT-DELETE'});
const namePage = ' Payment Periods ';
const titlePage = ' ' + namePage + ' information';
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');

const PeriodNumber = ref([]);
const periodNumber = ref(periodNumberValues);


const formDialogNewTitle = 'Create new ' + namePage;
const formDialogEditTitle = 'Edit ' + namePage;
const formDialogCloneTitle = 'Clone ' + namePage;
const formDialogExportTitle = 'Export ' + namePage;
const formDialogDeleteTitle = 'Delete ' + namePage;
const formDialogNew = ref(false);
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/pay_periods'); //replace endpoint with your endpoint

////////////
//Form here
////////////
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

onBeforeMount(() => {
    readAll();
    initFilters();
});
const listRowSelect = ref([]);
const loading = ref(false);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
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
        code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        start_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        end_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        period_num: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        quantity_days: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/companies');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
    console.log(Compan.value)
        
    const respPeriodNumbers = periodNumber.value; // Asignar el JSON importado

    PeriodNumber.value = respPeriodNumbers.data.map((period) => ({ id: period.id, name: period.name }));

    console.log(PeriodNumber.value);

};
const loadingData = async () => {
    const response = await getRequest(endpoint.value);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {}
);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll(endpoint.value);
        console.log(newValue);
        console.log(oldValue);
    }
);
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({initialValues:{
    // name: '',
    // codeV: '',
    start_dateV: new Date(),
    end_dateV: new Date(),
    periodNumberV: '',
    farm: '',
    company: ''
},
    validationSchema: toTypedSchema(
        z.object({
            // name: z.string().min(4),
            // codeV: z.string().min(4),
            start_dateV:z.date(),
            end_dateV:z.date(),
            // periodNumberV:z.number().min(0).max(31),
            periodNumberV: z
                .object({
                name: z.string().min(4),
                id: z.number()
            }),
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
                .optional()
        })
    )
});
// const [name, nameProps] = defineField('name');
// const [codeV, codeVProps] = defineField('codeV');
const [start_dateV] = defineField('start_dateV');
const [end_dateV] = defineField('end_dateV');
const [periodNumberV] = defineField('periodNumberV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);

function formatTransactionDate(date) {
    // Asegurarse de que el año, mes y día tienen el formato correcto
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const dd = String(date.getDate()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    return formattedDate;
}

const openNew = () => {
    resetForm();
    formDialogNew.value = true;
};

const openEdit = () => {
    resetForm();
    const { period_num:periodNum, company: empresa, farm: farmParameter, start_date:startDate, end_date:endDate } = listRowSelect.value[0];
console.log(periodNumber.value)
    // start_dateV.value = new Date(start_date);

    start_dateV.value = new Date(startDate);
    end_dateV.value = new Date(endDate);
    periodNumberV.value = { id: periodNum, name: periodNumber.value.data.find(p => p.id === periodNum).name };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();

    const { period_num: periodNum, company: empresa, farm: farmParameter, start_date: startDate, end_date: endDate } = listRowSelect.value[0];

    start_dateV.value = new Date(startDate);
    end_dateV.value = new Date(endDate);
    periodNumberV.value = { id: periodNum, name: periodNumber.value.data.find(p => p.id === periodNum).name };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };
    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};
const createRecord = handleSubmitNew(async (values) => {
    const start_dateFormatted = formatTransactionDate(start_dateV.value);
    const end_dateFormatted = formatTransactionDate(end_dateV.value);
    console.log(start_dateFormatted);
    console.log(end_dateFormatted);
    const data = {
        start_date: start_dateFormatted,
        end_date: end_dateFormatted,
        period_num: values.periodNumberV.id,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    console.log(data);
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
    prueba.value = data;
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const start_dateFormatted  = formatTransactionDate(start_dateV.value);
    const end_dateFormatted  = formatTransactionDate(end_dateV.value);
    const data = {
        start_date: start_dateFormatted,
        end_date: end_dateFormatted,
        period_num: values.periodNumberV.id,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
    prueba.value = data;
    if (restp.ok) {
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
});

const CloneRecord = handleSubmitNew(async (values) => {
    const start_dateFormatted  = formatTransactionDate(start_dateV.value);
    const end_dateFormatted  = formatTransactionDate(end_dateV.value);
    const data = {
        start_date: start_dateFormatted,
        end_date: end_dateFormatted,
        period_num: values.periodNumberV.id,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    formDialogClone.value = false;
    prueba.value = data;
    if (restp.ok) {
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
});
const searchCompannies = (event) => {
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

const searchPeriodNumber = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            periodNumber.value = [...PeriodNumber.value];
        } else {
            periodNumber.value = PeriodNumber.value.filter((fram) => {
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
    saveAs(file, filename.value + '.xlsx');
}

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach(async (item) => {
            const deletePromise = await deleteRequest(endpoint.value, item.uuid);
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

const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped></style>
