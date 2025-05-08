<template>
    <div>
<!-- <pre>{{ listRowSelect }}</pre> -->
 
        <div class="card">
            <h1>{{ $t('menu.dailyPlanning') }}</h1>

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
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Transaction Date :</label>
                        <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                        <Calendar dateFormat="dd/mm/yy" v-model="transaction_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select transaction date" />
                    </div>


                    <FrontEndErrors :errorsNew="errorsNew" name="transaction_dateV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.transaction_date" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Task of Type :</label>
                        <AutoComplete v-model="task_of_typeV" inputId="ac" class="flex-auto" :suggestions="tasks_of_type" @complete="searchTaskOfType" field="name" dropdown placeholder="Select Task of Type" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="task_of_typeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Crop Lots Code :</label>
                        
                        <MultiSelect v-model="crop_lots_codeV" display="chip" :options="CropLots" optionLabel="code" filter placeholder="Select Crop Lots" :maxSelectedLabels="5" class="flex-auto">
                            <template #footer>
                                <div class="py-2 px-4">
                                    <b>{{ crop_lots_codeV ? crop_lots_codeV.length : 0 }}</b> item{{ (crop_lots_codeV ? crop_lots_codeV.length : 0) > 1 ? 's' : '' }} selected.
                                </div>
                            </template>
                        </MultiSelect>
                        <!-- <AutoComplete v-model="crop_lots_codeV" class="flex-auto" inputId="ac" :suggestions="crop_lots" @complete="searchCropLots" field="code" dropdown /> -->
                    </div>


                    <FrontEndErrors :errorsNew="errorsNew" name="crop_lots_codeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.crop_lots" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="productV" class="font-semibold w-3">Product :</label>
                        <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="productV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Type of products:</label>
                        <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="products_type" @complete="searchProductType" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="product_typeV" />
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.product_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.product_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.product_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Packing types:</label>
                        <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packings_type" @complete="searchPackingType" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="packing_typeV" />
                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.packing_type_uuid }">
                        <div v-if="errorResponseAPI?.errors?.packing_type_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.packing_type_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Vehicles:</label>
                        <AutoComplete v-model="vehiclesV" class="flex-auto" inputId="ac" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="vehiclesV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.vehicle_uuid" />
                    
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Variants:</label>
                        <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="variantV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Customer Request:</label>
                        <AutoComplete v-model="customer_requestV" class="flex-auto" inputId="ac" :suggestions="customer_request" @complete="searchCustomerRequest" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="customer_requestV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.customer_request_uuid" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchBranches" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="farm" />
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="company" />

                    <small id="username-help" :class="{ 'p-invalid text-red-500': errorResponseAPI?.errors?.company_uuid }">
                        <div v-if="errorResponseAPI?.errors?.company_uuid">
                            <div v-for="(error, index) in errorResponseAPI.errors.company_uuid" :key="index">
                                {{ error }}
                            </div>
                        </div>
                    </small>
                    <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
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
const { getItems,itemsActions, messageDialog,titleDialog,status_id_Action,flagDialog } = useActions(`/processflow/PlannerTask`);

const { t } = useI18n();

const dynamicColumns = [
    { field: 'transaction_date', header: 'Transaction Date', frozen: false, color: false },
    { field: 'tasks_of_type.name', header: 'Task Of Type', frozen: false, color: false },
    { field: 'product.name', header: 'Product Name', frozen: false, color: false },
    { field: 'variant.name', header: 'Variant', frozen: false, color: false },
    { field: 'status.name', header: 'Status Name', frozen: false, color: true },
    { field: 'packing_type.name', header: 'Packing Type', frozen: false, color: false },
    { field: 'vehicle.vehicle_type', header: 'Vehicle Type', frozen: false, color: false },

    // { field: 'customer_request.customer_name', header: 'Customer Name', frozen: false, color: false },
    // { field: 'customer_request.dispatch_number_lot', header: 'Customer Name', frozen: false, color: false },
    // { field: 'customer_request.order_number_customer', header: 'Order Number', frozen: false, color: false },
    // { field: 'customer_request.invoice_number_customer', header: 'Invoice Number', frozen: false, color: false },
    // { field: 'customer_request.place_of_delivery', header: 'Place of Delivery', frozen: false, color: false },
    
    // { field: 'product_type.name', header: 'Product Type', frozen: false, color: false },
    // { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    // { field: 'company.name', header: 'Company Name', frozen: false, color: false },
    // { field: 'created_at', header: 'Created At', frozen: false, color: false },
    // { field: 'updated_at', header: 'Updated At', frozen: false, color: false },
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


let endpoint = ref('/planner_tasks'); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const CropLots = ref([]);
const products = ref([]);
const Products = ref([]);
const products_type = ref([]);
const Products_type = ref([]);
const tasks_of_type = ref([]);
const Tasks_of_type = ref([]);
const Tasks_of_type_filter = ref([]);
const packings_type = ref([]);
const Packings_type = ref([]);
const variants = ref([]);
const Variants = ref([]);
const customer_request = ref([]);
const Customer_request = ref([]);
const vehicles = ref([])
const Vehicles = ref([])

const otherTestValue = ref();

const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export records';
const formDialogDeleteTitle = 'Delete records';
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');

let valor = ref();

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
                title: 'Transaction Information',
                fields: {
                    'UUID': row.uuid,
                    'Transaction Date': row.transaction_date,
                    'Created At': row.created_at,
                    'Updated At': row.updated_at
                },
                icon: 'pi pi-calendar',
                bgColor: 'bg-green-100',
                iconColor: 'text-green-500'
            },
            {
                title: 'Crop Lots',
                fields: row.crop_lots?.reduce((acc, lot, index) => {
                    acc[`Lot ${index + 1}`] = lot.code;
                    return acc;
                }, {}),
                icon: 'pi pi-list',
                bgColor: 'bg-orange-100',
                iconColor: 'text-orange-500'
            },
            {
                title: 'Customer Request Information',
                fields: {
                    'Dispatch Lot': row.customer_request?.dispatch_number_lot,
                    'Order Number': row.customer_request?.order_number_customer,
                    'Invoice Number': row.customer_request?.invoice_number_customer,
                    'Customer Name': row.customer_request?.customer_name,
                    'Request Date': row.customer_request?.request_date,
                    'Delivery Date': row.customer_request?.delivery_datetime,
                    'Packing Quantity': row.customer_request?.packing_qty_dispatch,
                    'Dispatch Weight': row.customer_request?.packing_dispatch_weight,
                    'Packaging Presentation': row.customer_request?.packaging_presentation,
                    'Outlet Temperature': row.customer_request?.outlet_temperature,
                    'Request Quantity': row.customer_request?.request_qty,
                    'Packing Name': row.customer_request?.packing_name_customer,
                    'Place of Delivery': row.customer_request?.place_of_delivery,
                    'Created At': row.customer_request?.created_at,
                    'Updated At': row.customer_request?.updated_at
                },
                icon: 'pi pi-truck',
                bgColor: 'bg-blue-100',
                iconColor: 'text-blue-500'
            },
            {
                title: 'Product Information',
                fields: {
                    'Product UUID': row.product?.uuid,
                    'Name': row.product?.name,
                    'Short Name': row.product?.short_name,
                    'Slug': row.product?.slug,
                    'Cultivated': row.product?.cultivated ? 'Yes' : 'No',
                    'Created At': row.product?.created_at,
                    'Updated At': row.product?.updated_at
                },
                icon: 'pi pi-leaf',
                bgColor: 'bg-green-200',
                iconColor: 'text-green-700'
            },
            {
                title: 'Product Type Information',
                fields: {
                    'Product Type UUID': row.product_type?.uuid,
                    'Name': row.product_type?.name,
                    'Code': row.product_type?.code,
                    'Created At': row.product_type?.created_at,
                    'Updated At': row.product_type?.updated_at
                },
                icon: 'pi pi-tag',
                bgColor: 'bg-yellow-100',
                iconColor: 'text-yellow-500'
            },
            {
                title: 'Variant Information',
                fields: {
                    'Variant UUID': row.variant?.uuid,
                    'Name': row.variant?.name,
                    'Code': row.variant?.code,
                    'Created At': row.variant?.created_at,
                    'Updated At': row.variant?.updated_at
                },
                icon: 'pi pi-archive',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-500'
            },
            {
                title: 'Packing Type Information',
                fields: {
                    'Packing Type UUID': row.packing_type?.uuid,
                    'Name': row.packing_type?.name,
                    'Code': row.packing_type?.code,
                    'Dispatch Code': row.packing_type?.code_dispatch,
                    'Weight Tare': row.packing_type?.weight_tare,
                    'Created At': row.packing_type?.created_at,
                    'Updated At': row.packing_type?.updated_at
                },
                icon: 'pi pi-box',
                bgColor: 'bg-teal-100',
                iconColor: 'text-teal-500'
            },
            {
                title: 'Vehicle Information',
                fields: {
                    'Vehicle UUID': row.vehicle?.uuid,
                    'Code': row.vehicle?.code,
                    'Type': row.vehicle?.vehicle_type,
                    'Quantity Available': row.vehicle?.quantity_available,
                    'Weight Packing Type': row.vehicle?.weight_packing_type,
                    'Created At': row.vehicle?.created_at,
                    'Updated At': row.vehicle?.updated_at
                },
                icon: 'pi pi-car',
                bgColor: 'bg-gray-100',
                iconColor: 'text-gray-500'
            },
            {
                title: 'Company Information',
                fields: {
                    'Company UUID': row.company?.uuid,
                    'Name': row.company?.name,
                    'Code': row.company?.code,
                    'Website': row.company?.url_path,
                    'Logo File': row.company?.file_name,
                    'Created At': row.company?.created_at,
                    'Updated At': row.company?.updated_at
                },
                icon: 'pi pi-building',
                bgColor: 'bg-indigo-100',
                iconColor: 'text-indigo-500'
            },
            {
                title: 'Status Information',
                fields: {
                    'Status UUID': row.status?.uuid,
                    'Name': row.status?.name,
                    'Color': row.status?.color,
                    'Description': row.status?.description,
                    'Model': row.status?.model,
                    'Created At': row.status?.created_at,
                    'Updated At': row.status?.updated_at
                },
                icon: 'pi pi-info-circle',
                bgColor: 'bg-red-100',
                iconColor: 'text-red-500'
            },
            {
                title: 'Farm Information',
                fields: {
                    'Farm UUID': row.farm?.uuid,
                    'Name': row.farm?.name,
                    'Code': row.farm?.code,
                    'Created At': row.farm?.created_at,
                    'Updated At': row.farm?.updated_at
                },
                icon: 'pi pi-map-marker',
                bgColor: 'bg-orange-100',
                iconColor: 'text-orange-500'
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

    const respProducts = await InitialDataService.getProducts();
    if (!respProducts.ok) toast.add({ severity: 'error', detail: 'Error' + respProducts.error, life: 3000 });
    Products.value = respProducts.data.data.map((product) => ({ id: product.uuid, name: product.name }));

    const respProductsType = await InitialDataService.getProductTypes();
    if (!respProductsType.ok) toast.add({ severity: 'error', detail: 'Error' + respProductsType.error, life: 3000 });
    Products_type.value = respProductsType.data.data.map((product) => ({ id: product.uuid, name: product.name }));

    const respTasksOfType = await InitialDataService.getTaskOfType();
    if (!respTasksOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTasksOfType.error, life: 3000 });
    Tasks_of_type.value = respTasksOfType.data.data.map((task) => ({ id: task.uuid, name: task.name }));
    Tasks_of_type_filter.value = respTasksOfType.data.data.map((task) =>  task.name );

    const respPackingsType = await InitialDataService.getPackingTypes();
    if (!respPackingsType.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingsType.error, life: 3000 });
    Packings_type.value = respPackingsType.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

    const respVariants = await InitialDataService.getVariants();
    if (!respVariants.ok) toast.add({ severity: 'error', detail: 'Error' + respVariants.error, life: 3000 });
    Variants.value = respVariants.data.data.map((variant) => ({ id: variant.uuid, name: variant.name }));

    const respVehicles = await InitialDataService.getVehicles();
    if (!respVehicles.ok) toast.add({ severity: 'error', detail: 'Error' + respVehicles.error, life: 3000 });
    Vehicles.value = respVehicles.data.data.map((vehicle) => ({ id: vehicle.uuid, name: vehicle.vehicle_type }));

    const respCropLots = await InitialDataService.getCropLots();
    if (!respCropLots.ok) {
        toast.add({ severity: 'error', detail: 'Error: ' + respCropLots.error, life: 3000 });
        console.log(respCropLots);
    } else {
        CropLots.value = respCropLots.data.data.map((crop) => ({
            code: crop.code
        }));
    }
    const respCustomerRequest = await InitialDataService.getCustomerRequests();
    if (!respCustomerRequest.ok) toast.add({ severity: 'error', detail: 'Error' + respCustomerRequest.error, life: 3000 });
    Customer_request.value = respCustomerRequest.data.data.map((customer) => ({ id: customer.uuid, name: customer.dispatch_number_lot }));



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
        tasks_of_typeV: { name: '', id: '' },
        crop_lots_codeV: [],
        productV: { name: '', id: '' },
        product_typeV: { name: '', id: '' },
        packing_typeV: { name: '', id: '' },
        vehiclesV: { name: '', id: '' },
        variantV: { name: '', id: '' },
        transaction_dateV: '',
        customer_requestV: { name: '', id: '' },
        farm: { name: '', id: '' },
        company: { name: '', id: '' }
    },
    validationSchema: toTypedSchema(
        z.object({
            // name: z.string().min(4),
            // codeV: z.string().min(4),
            transaction_dateV: z.date(),
            task_of_typeV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            // crop_lots_codeV:z.array(z.object({
            //     code: z.string().min(2).optional(),

            // })),
            crop_lots_codeV: z
                .array(
                    z.object({
                        code: z.string().min(2).optional()
                    })
                )
                .min(1, { message: 'You should select at least one crop lot' }),

            productV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            product_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            packing_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            vehiclesV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            variantV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            customer_requestV: z
                .object({
                    name: z.string().min(4).optional(),
                    id: z.string().min(4).optional()
                })
                .optional(),
            farm: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional(),
            company: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional()
        })
    )
});
const [name, nameProps] = defineField('name');
const [codeV, codeVProps] = defineField('codeV');
const [farm] = defineField('farm');
const [company] = defineField('company');
const [transaction_dateV, transaction_dateVProps] = defineField('transaction_dateV');
const [task_of_typeV] = defineField('task_of_typeV');
const [crop_lots_codeV] = defineField('crop_lots_codeV');
const [productV] = defineField('productV');
const [product_typeV] = defineField('product_typeV');
const [packing_typeV] = defineField('packing_typeV');
const [variantV] = defineField('variantV');
const[vehiclesV] = defineField('vehiclesV');
const [customer_requestV] = defineField('customer_requestV');

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
    const {
        code,
        company: empresa,
        farm: farmParameter,
        name: nombre,
        tasks_of_type: task,
        variant: variant,
        packing_type: packing,
        product_type: productType,
        product: productX,
        transaction_date: date,
        crop_lots: crop_lots,
        customer_request: customer_request,
        vehicle: vehicle
    } = listRowSelect.value[0];
    console.log(listRowSelect.value[0]); 
    transaction_dateV.value = new Date(date + "T00:00");

    task_of_typeV.value = { id: task.uuid, name: task.name };
    crop_lots_codeV.value = crop_lots;
    productV.value = { id: productX.uuid, name: productX.name };
    product_typeV.value = { id: productType.uuid, name: productType.name };
    packing_typeV.value = { id: packing.uuid, name: packing.name };
    vehiclesV.value = { id: vehicle.uuid, name: vehicle.vehicle_type };
    variantV.value = { id: variant.uuid, name: variant.name };
    customer_requestV.value = { id: customer_request.uuid, name: customer_request.dispatch_number_lot };
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };
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
    const yyyy = values.transaction_dateV.getFullYear();
    const mm = String(values.transaction_dateV.getMonth() + 1).padStart(2, '0');
    const dd = String(values.transaction_dateV.getDate()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    console.log(formattedDate);
    const data = {
        tasks_of_type_uuid: values.task_of_typeV ? values.task_of_typeV.id : 'Prueba',

        crop_lots: values.crop_lots_codeV ? values.crop_lots_codeV : 'Prueba',
        transaction_date: formattedDate,
        product_uuid: values.productV ? values.productV.id : 'Prueba',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : 'Prueba',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : 'Prueba',
        vehicle_uuid: values.vehiclesV ? values.vehiclesV.id : 'Prueba',
        variant_uuid: values.variantV ? values.variantV.id : 'Prueba',
        customer_request_uuid: values.customer_requestV ? values.customer_requestV.id : 'Prueba',
        company_uuid: values.company && values.company.id ? values.company.id : companyDefault,
        farm_uuid: values.farm && values.farm.id ? values.farm.id : farmDefault
    };
    console.log(data);

    valor.value = data;
    console.log(data);
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
await loadingData();   


listRowSelect.value = [];
selectedRegisters.value = [];
await loadingData();
dataFromComponent.value = [...dataFromComponent.value]; // 🧠 force array reference change
formDialog.value = false;
flagDialog.value = false;
} else {
toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Some records could not be updated',
    life: 3000
});
}



        

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


const searchVehicles = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            vehicles.value = [...Vehicles.value];
        } else {
            vehicles.value = Vehicles.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};



const searchTaskOfType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            tasks_of_type.value = [...Tasks_of_type.value];
        } else {
            tasks_of_type.value = Tasks_of_type.value.filter((fram) => {
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
const searchProductType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products_type.value = [...Products_type.value];
        } else {
            products_type.value = Products_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packings_type.value = [...Packings_type.value];
        } else {
            packings_type.value = Packings_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchVariant = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            variants.value = [...Variants.value];
        } else {
            variants.value = Variants.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchCustomerRequest = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            customer_request.value = [...Customer_request.value];
        } else {
            customer_request.value = Customer_request.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};


</script>

<style lang="scss" scoped></style>