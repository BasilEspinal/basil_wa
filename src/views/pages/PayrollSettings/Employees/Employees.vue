<template>
    <div class="card">
        <div>
            <h1>Información de Empleados </h1>
            <pre>{{ selectedRegisters }}</pre>
        </div>


    </div>


    <div class="card">
        <div class="flex justify-content-center mb-4">
            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
        </div>
        <!--:class="`p-datatable-${size.class}`" this is for the size of table -->
        <DataTable :rowHover="true" responsiveLayout="scroll" 
         v-model:selection="selectedRegisters" 
            @row-select="onRowSelect(selectedRegisters)" 
            @row-unselect="onRowSelect(selectedRegisters)"
            v-model:filters="filters" 
            :class="`p-datatable-${size.class}`"
            :value="dataResponseAPI.data"
            showGridlines :rows="20" 
            tableStyle="min-width: 75rem" 
            dataKey="uuid" 
            :totalRecords="totalRecordsResponseAPI"
            @page="onPage($event)" 
            @sort="onSort($event)" 
            ref="dt" 
            lazy 
            :first="first" 
            paginator 
            :loading="loading"
            @select-all-change="onSelectAllChange">

            <template #header>
                <div class="flex justify-content-between">

                </div>
            </template>
            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

            <Column field="document" header="Document" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.document }}
                </template>
            </Column>

            <Column field="typeDocument" header="Type of Document" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.document_type }}
                </template>
            </Column>

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.first_name }}
                </template>
            </Column>

            <Column field="name" header="Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
            </Column>

            <Column field="gender" header="Gender" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
            </Column>

            <Column field="prueba" header="ColumnaPrueba" style="min-width: 12rem">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <Avatar :image="'demo/images/avatar/amyelsner.png'" size="large" shape="circle"></Avatar>
                        <!-- <span>{{ data.gender_id }}</span> -->
                    </div>
                </template>
            </Column>

            <Column field="status" header="Status" style="min-width: 12rem">
                <template #body="{ data }">
                    <Tag :value="data.status.name" :severity="'#EFC88B'" />
                </template>
            </Column>

            <Column field="email" header="Email" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.email }}
                </template>
            </Column>

            <Column field="workCenterName" header="Work Center Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
            </Column>

            <Column field="bankAccountNumber" header="Bank Account Number" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
            </Column>

            <Column field="farmName" header="Farm Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
            </Column>

            <Column field="companyName" header="Company Name" style="min-width: 12rem">
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
            </Column>
            <template #footer> In total there are {{ dataResponseAPI.data ? dataResponseAPI.data.length : 0 }} products.
            </template>
        </DataTable>
    </div>
</template>

<script setup>


import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useRestrictionProducts from '@/composables/Product/Products/restrictionsProducts';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js'
import { FilterMatchMode, FilterOperator } from 'primevue/api';

const { getAllResponseAPI,totalRecordsResponseAPI,currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();

let endpoint = ref("/employees?page="+"1")
const selectedRegisters = ref([]);
const listRowSelect = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
};
watch(listRowSelect, onRowSelect);

onBeforeMount(() => {
    initFilters();
})
//let endpointDocumentType = ref("/document-types")
onMounted(async () => {

    
    loading.value = true;
    lazyParams.value = {
        first: dt.value.first,
        rows: dt.value.rows,
        sortField: null,
        sortOrder: null,
        filters: filters.value
    };
    
    loadLazyData();
    selectedRegisters.value = [];

    
    
})

const dt = ref();
const loading = ref(false);
const lazyParams = ref({});
const first = ref(0);

const loadLazyData =async (event) => {
        
        lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
        endpoint.value = "/employees?page="+(lazyParams.value.page+1);
        await getAllResponseAPI(endpoint.value)
        loading.value = false;
        
};
const onPage = async (event) => {
    loading.value = true;
    lazyParams.value = event;
    loadLazyData(event);
    
    
};
const onSort = (event) => {
    lazyParams.value = event;
    loadLazyData(event);
    
};

const clearFilter = () => {
    initFilters();
};
const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

    };
};
// sizeOptionsButton
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);


</script>

<style lang="scss" scoped></style>