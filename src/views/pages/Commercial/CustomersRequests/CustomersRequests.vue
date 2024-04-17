<template>
    <div>
    <div class="card">
        <div>
            <h1>Información de pedidos del cliente</h1> 
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
                            <Button v-if = "ability.can('solicitud_cliente_crear')" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <Button v-if = "ability.can('solicitud_cliente_editar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                            <Button v-if = "ability.can('solicitud_cliente_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button v-if = "ability.can('solicitud_cliente_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                        </div>
                    </template>
                </Toolbar>
            </div> -->

            </div>
        </div>
        <!-- <pre>{{ dataResponseAPI }}</pre> -->
        <DataTable
        :value="dataResponseAPI.data"
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
        v-if = "ability.can('solicitud_cliente_listado')"
         
        >
        <template #header>
            <!--Uncomment when filters are done-->

            <!-- <Toolbar class = "mb-2">
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
                </Toolbar> -->
        </template>

        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="xxxxxx" filterField="xxxxxx" header="xxxxxx " sortable frozen=""> <!--Replace :frozen with the model-->
            <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    <!-- {{ data.document }} replace with the object key-->
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                </template>
        </Column>

        <Column field="" filterField="" header=" " sortable> 
            
                <template #body="{ data }">
                    <!-- {{ data.document }} replace with the object key-->
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                </template>
        </Column>

        <!--Here add other columns-->

        <!-- <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
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
            </Column> -->

        </DataTable>
        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <pre>{{ selectedRegisters }}</pre>
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <pre>{{ selectedRegisters }}</pre>
        </Dialog> 
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
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder} from '@casl/ability';

let endpoint = ref('/customers_requests'); //replace endpoint with your endpoint
const loading = ref(false);
const documentFrozen = ref(false);
const { getAllResponseAPI,getAllResponsePermissionsAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponsePermissionsAPI,dataResponseListAPI, statusCode } =
    useDataAPI();

////////////
 //Form here
 ////////////   
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);


onMounted(async () => {
    await loadLazyData();
    await getAllResponsePermissionsAPI("/abilities");
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
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            order_number_customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			invoice_number_customer: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			customer_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			request_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			delivery_datetime: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			packaging_presentation: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			dispatch_number_lot: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			outlet_temperature: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			request_qty: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			packing_type_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			packing_type_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			employee_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			place_of_delivery: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			product_id:{ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			product_type_id:{ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			'farm.name':{ operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
			updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  };
};

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
    
    await getAllResponseAPI(endpoint.value);
    loading.value = false;
    
};


const listRowSelect = ref([]);
const selectedRegisters = ref([]);
const onRowSelect = (data) => {
    
    listRowSelect.value = data;
    //assignValues(mode.value)
    
};

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
}
const resetValues = () => {}
const assignValues = (modex) => {
    if ((modex ==='EDIT')) {}
    if ((modex=== 'CLONE' )) {}
}
const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New xxxxxxx record';
}
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a xxxxx record';
    assignValues(mode.value)

}
const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a xxxx record';
    formDialog.value = true;
    assignValues(mode.value)
}
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a xxxxx record';
    resetValues();
    deleteDialog.value = true;
}
const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a xxxxx record';
    resetValues();
    formDialog.value = true;
}

</script>

<style lang="scss" scoped>
</style>