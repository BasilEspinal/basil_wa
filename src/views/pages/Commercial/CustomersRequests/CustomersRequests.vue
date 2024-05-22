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
                    <Button :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
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
        >
        <template #header>
            <!--Uncomment when filters are done-->

            <Toolbar class = "mb-2">
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
        <Column field="dispatch_number_lot" filterField="dispatch_number_lot" header="Dispatch Num Lot" sortable :frozen="documentFrozen"> <!--Replace :frozen with the model-->
            <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    {{ data.dispatch_number_lot }} 
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                </template>
        </Column>

        <Column field="order_number_customer" filterField="order_number_customer" header="Order Number Customer" sortable> 
            
                <template #body="{ data }">
                    {{ data.order_number_customer }} 
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by order Number Customer" />
                </template>
        </Column>

        <Column field="invoice_number_customer" filterField="invoice_number_customer" header="Invoice Number Customer" sortable> 
            
            <template #body="{ data }">
                {{ data.invoice_number_customer }} 
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
            </template>
    </Column>


    <Column field="delivery_datetime" filterField="delivery_datetime" header="Delivery Datetime" sortable> 
            
            <template #body="{ data }">
                {{ data.delivery_datetime }} 
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
            </template>
    </Column>

    <Column field="delivery_datetime" filterField="delivery_datetime" dataType="date" header="Delivery Datetime" sortable> 
            
            <template #body="{ data }">
                {{ data.delivery_datetime }} 
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
            </template>
    </Column>

    <Column field="packaging_presentation" filterField="packaging_presentation" header="Packaging Presentation" sortable> 
            
            <template #body="{ data }">
                {{ data.packaging_presentation }} 
            </template>
            <template #filter="{ filterModel }">
                <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Inovice Customer" />
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
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Dispatch Num Lot</label>
                        <InputText id="username" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" :frozen="documentFrozen"/>
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                        {{ errorsNew.dispatch_number_lotV }}
                    </small>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="order_number_customer" class="font-semibold w-6rem">Order Number Customer</label>
                        <InputText id="username" v-model="order_number_customerV" class="flex-auto" autocomplete="off" v-bind="order_number_customerVProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['order_number_customerV'] }">
                        {{ errorsNew.order_number_customerV }}
                    </small>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="order_number_customer" class="font-semibold w-6rem">Invoice Number Customer</label>
                        <InputText id="username" v-model="invoice_number_customerV" class="flex-auto" autocomplete="off" v-bind="invoice_number_customerVProps" />
                        
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['invoice_number_customerV'] }">
                        {{ errorsNew.invoice_number_customerV }}
                    </small>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="request_date" class="font-semibold w-6rem">Request Date</label>
                        <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                        <Calendar dateFormat="dd/mm/yy" v-model="request_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select request date"  />
                        
                    </div>

                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_dateV'] }">
                        {{ errorsNew.request_dateV }}
                    </small>
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="request_date" class="font-semibold w-6rem">Delivery Datetime :</label>
                        <Calendar id="calendar-24h" v-model="delivery_datetimeV" showTime hourFormat="24" class="flex-auto" showIcon  inputId="buttondisplay"  />
                    </div>
                    
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['delivery_datetimeV'] }">
                        {{ errorsNew.delivery_datetimeV }}
                    </small>
                    
                </div>

                <!-- <InputText type="text" v-model="value" /> -->


                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-6rem">Farm :</label>
                        <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-6rem">Company:</label>
                        <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Name :</label>
                        <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.name }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Dispatch Num Lot :</label>
                        <InputText id="username" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                        {{ errorsNew.dispatch_number_lotV }}
                    </small>
                </div>
                <div class="mb-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-3">Farm :</label>
                    <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name"
                        dropdown />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                    {{ errorsNew.farm }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-3">Companny:</label>
                    <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="EditRecord"
                        field="name" dropdown />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                    {{ errorsNew.company }}
                </small>
            </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Name :</label>
                        <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.name }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Dispatch Num Lot :</label>
                        <InputText id="username" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                        {{ errorsNew.dispatch_number_lotV }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Companny:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
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
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder} from '@casl/ability';
const namePage = ' Customer Requests ';
const titlePage = namePage+'information';
const dataFromComponent = ref();
const packing_type = ref([]);
const Packing_type = ref([]);
const products = ref([]);
const Products = ref([]);
const products_variants = ref([]);
const Products_variants = ref([]);
const employees = ref([]);
const Employees = ref([]);
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);






const formDialogNew = ref(false);
const formDialogNewTitle = 'Create new'+namePage;
const formDialogEditTitle = 'Edit'+namePage;
const formDialogCloneTitle = 'Clone' + namePage;
const formDialogExportTitle = 'Export' + namePage;
const formDialogDeleteTitle = 'Delete'+namePage;
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/customers_requests');  //replace endpoint with your endpoint


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
        dispatch_number_lot: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        delivery_datetime: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        // delivery_datetime_time: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(4),
            order_number_customerV: z.string().min(4),
            
            invoice_number_customerV: z.string().min(4),
            customer_nameV: z.string().min(4),
            request_dateV: z.date(),
            delivery_datetimeV: z.date(),
            place_of_deliveryV: z.string().min(4),
            packing_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            productV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            products_variantsV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            dispatch_number_lotV: z.string().min(4),
            packaging_presentation_qty_V: z.string().min(4),
            packaging_presentation_presentationType_V: z.string().min(4),
            packaging_presentation_weight_V: z.string().min(4),
            packaging_presentation_measuring_unit_V: z.string().min(4),
            request_qty_V: z.string().min(4),
            packing_type_nameV: z.string().min(4),
            outlet_temperatureV: z.number().min(4),
            employeeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
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
const [name, nameProps] = defineField('name');
const [dispatch_number_lotV, dispatch_number_lotVProps] = defineField('dispatch_number_lotV');
const [order_number_customerV, order_number_customerVProps] = defineField('order_number_customerV');
const [invoice_number_customerV, invoice_number_customerVProps] = defineField('invoice_number_customerV');
const [customer_nameV, customer_nameVProps] = defineField('customer_nameV');
const [request_dateV, request_dateVProps] = defineField('request_dateV');
const [delivery_datetimeV, delivery_datetimeVProps] = defineField('delivery_datetimeV');
const [place_of_deliveryV, place_of_deliveryVProps] = defineField('place_of_deliveryV');
const [packing_typeV, packing_typeVProps] = defineField('packing_typeV');
const [productV, productVProps] = defineField('productV');
const [products_variantsV, products_variantsVProps] = defineField('products_variantsV');
const [packaging_presentation_qty_V, packaging_presentation_qty_VProps] = defineField('packaging_presentation_qty_V');
const [packaging_presentation_presentationType_V, packaging_presentation_presentationType_VProps] = defineField('packaging_presentation_presentationType_V');
const [packaging_presentation_weight_V, packaging_presentation_weight_VProps] = defineField('packaging_presentation_weight_V');
const [packaging_presentation_measuring_unit_V, packaging_presentation_measuring_unit_VProps] = defineField('packaging_presentation_measuring_unit_V');
const [request_qty_V, request_qty_VProps] = defineField('request_qty_V');
const [packing_type_nameV, packing_type_nameVProps] = defineField('packing_type_nameV');
const [outlet_temperatureV, outlet_temperatureVProps] = defineField('outlet_temperatureV');
const [employeeV, employeeVProps] = defineField('employeeV');
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

const createRecord = handleSubmitNew(async (values) => {
    const data = {
        dispatch_number_lot: values.dispatch_number_lotV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
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
const openNew = () => {
    resetForm();
    formDialogNew.value = true;

};

const openEdit = () => {
    resetForm();
    const { dispatch_number_lot, company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
    dispatch_number_lotV.value = dispatch_number_lot;
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const { company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
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

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        dispatch_number_lot: values.dispatch_number_lotV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : values.farm
    };
    
    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        dispatch_number_lot: values.dispatch_number_lotV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    formDialogClone.value = false;
});

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

const searchProduct = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products.value = [...Products.value];
        } else {
            products.value = Products.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};


const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packing_type.value = [...Packing_type.value];
        } else {
            packing_type.value = Packing_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchVariant = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products_variants.value = [...Products_variants.value];
        } else {
            products_variants.value = Products_variants.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchEmployee = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            employees.value = [...Employees.value];
        } else {
            employees.value = Employees.value.filter((fram) => {
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

<style lang="scss" scoped>
</style>