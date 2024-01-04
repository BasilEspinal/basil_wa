<template>
    <div class="card">
        <div>
            <pre>{{ listRowSelect[0] }}</pre>
            <pre>{{ dataPost }}</pre>
            
            <!-- <pre>{{rules}}</pre> -->
            <h1>Información de Empleados</h1>
        </div>
    </div>

    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <!-- <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i> -->
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                        </div>
                    </template>
                </Toolbar>
            </div>
        </div>
        <div class="card"><Button type="button" :icon="valueCustomTable.icon" label="Custom Table" class="p-button-outlined mb-2" @click="customTable()" /></div>

        <div class="card" v-if="valueCustomTable.status">
            <div class="card">
                <div v-if="valueCustomTable.status" class="flex justify-content-center mb-4">
                    <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                </div>
            </div>

            <div class="card" v-if="valueCustomTable.status">
                <h5>¿Which columns do you want to watch?</h5>
                <MultiSelect v-model="column" :options="columnas" optionLabel="field" placeholder="Seleccione columnas" :filter="true" display="chip" class="w-full md:w-50rem" @change="onColumnsChange(column)">
                    <template #value="slotProps">
                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.header">
                            <div>{{ option.header }}</div>
                        </div>
                    </template>

                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option.header }}</div>
                        </div>
                    </template>
                </MultiSelect>
            </div>
        </div>

        <!-- <template v-if="$can('producto_listado')">  -->

        <template>
            <h1>No tienes permisos</h1>
        </template>

        <DataTable
            responsiveLayout="scroll"
            v-model:selection="selectedRegisters"
            @row-select="onRowSelect(selectedRegisters)"
            @row-unselect="onRowSelect(selectedRegisters)"
            v-model:filters="filters"
            :filters="filters"
            :class="`p-datatable-${size.class}`"
            :value="dataResponseAPI.data"
            showGridlines
            :globalFilterFields="['workCenter.name', 'last_name', 'company.name']"
            :rows="20"
            tableStyle="min-width: 75rem"
            dataKey="uuid"
            ref="dt"
            :paginator="true"
            :loading="loading"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            filterDisplay="menu"
            @select-all-change="onSelectAllChange"
            scrollable
            scrollHeight="600px"
            resizableColumns
            columnResizeMode="expand"
            sortMode="multiple"
        >
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                    </span>
                </div>
            </template>

            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column v-if="column?.some((obj) => obj.field === 'document')" field="document" header=" Document" sortable :frozen="documentFrozen">
                <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    {{ data.document }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column v-if="column?.some((obj) => obj.field === 'document_type')" header="Type of Document" sortable>
                <template #body="{ data }">
                    {{ data.document_type }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            <Column v-if="column?.some((obj) => obj.field === 'first_name')" field="first_name" header="Name" sortable>
                <template #body="{ data }">
                    {{ data.first_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'last_name')" -->
            <Column field="last_name" header="Last Name" sortable>
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'gender_id')" -->
            <Column field="gender" header="Gender" sortable>
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="status" header="Status" sortable>
                <template #body="{ data }">
                    <Tag :value="data.status.name" :severity="'EFC88B'" />
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'email')" -->
            <Column field="email" header="Email" sortable>
                <template #body="{ data }">
                    {{ data.email }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="workCenterName" header="Work Center Name" sortable>
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'bank_account_number')" -->
            <Column field="bankAccountNumber" header="Bank Account Number" sortable>
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account" />
                </template>
            </Column>

            <Column field="farmName" header="Farm Name" sortable>
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="companyName" header="Company Name" sortable>
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="email" header="Email" sortable>
                <template #body="{ data }">
                    {{ data.email }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="workCenterName" header="Work Center Name" sortable>
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'bank_account_number')" -->
            <Column field="bankAccountNumber" header="Bank Account Number" sortable>
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account" />
                </template>
            </Column>

            <Column field="farmName" header="Farm Name" sortable>
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>

            <Column field="companyName" header="Company Name" sortable>
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by country" />
                </template>
            </Column>
        </DataTable>

        
        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" header="Products Details" :modal="true" class="p-fluid text-center mx-auto">
            <div class="p-grid"> 

<pre>{{ dataPost }}</pre>

                <div class="p-col-6 p-md-4 mb-2">
            <label for="farmsId" class="p-d-block">Type of documents</label>
            <Dropdown v-model="listRowSelect[0].document_type" :options="typesDocument" optionLabel="id" inputId="typeOfDocumentId" aria-labelledby="basic" placeholder="Select a Type of document" />
        </div>
        <div class="p-col-6 p-md-4 mb-2">
    <label for="document_id" class="p-d-block">Document</label>
    <InputText v-model="listRowSelect[0].document" inputId="document" aria-labelledby="basic" placeholder="Type your document here" />
</div>


        <div class="p-col-6 p-md-4 mb-2">
            <label for="name" class="p-d-block">Name</label>
            <InputText v-model="listRowSelect[0].first_name" inputId="name" aria-labelledby="basic" placeholder="Type your name here" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="lastName" class="p-d-block">Last Name</label>
            <InputText v-model="listRowSelect[0].last_name" inputId="lastName" aria-labelledby="basic" placeholder="Type your last name here" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="email" class="p-d-block">Email</label>
            <InputText v-model="listRowSelect[0].email" inputId="email" aria-labelledby="basic" placeholder="Type your last email here" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="bankAccountNumber" class="p-d-block">Account number</label>
            <InputText v-model="listRowSelect[0].bank_account_number" inputId="bankAccountNumber" aria-labelledby="basic" placeholder="Type your last email here" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="bankAccountDoc" class="p-d-block">Account Document</label>
            <InputText v-model="listRowSelect[0].bank_account_doc" inputId="bankAccountDoc" aria-labelledby="basic" placeholder="Type your account document here" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="workCenter" class="p-d-block">Work Center</label>
            <Dropdown v-model="listRowSelect[0].work_center_id" :options="workCenters" optionLabel="id" inputId="workCenter" aria-labelledby="basic" placeholder="Select a work center" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="genderType" class="p-d-block">Select gender</label>
            <Dropdown v-model="listRowSelect[0].gender" :options="genderTypes" optionLabel="id" inputId="genderType" aria-labelledby="basic" placeholder="Select a type" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="companyId" class="p-d-block">Company</label>
            <Dropdown v-model="listRowSelect[0].company_id" :options="companies" optionLabel="id" inputId="companyId" aria-labelledby="basic" placeholder="Select a company" />
        </div>

        <div class="p-col-6 p-md-4 mb-2">
            <label for="farmsId" class="p-d-block">Farms</label>
            <Dropdown v-model="listRowSelect[0].farm.id" :options="farms" optionLabel="id" inputId="companyId" aria-labelledby="basic" placeholder="Select a company" />
        </div>

        <div class="p-col-6 text-center">
            <label for="status" class="p-d-block">Status</label>
            <div class="card flex justify-content-center">
                <SelectButton v-model="statusDialog" :options="optionsStatus" aria-labelledby="basic" class="p-invalid" />
            </div>

            <div>
                <ul>
                    <li v-for="(message, key) in validationMessages" :key="key">{{ message }}</li>
                </ul>
            </div>
        </div>
    </div> -->

    <template #footer>
        <div>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
        </div>
    </template>
</Dialog>

    </div>
</template>

<script setup>
import { ref, watch, provide, onBeforeMount, onMounted, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useEmployeesParameters from '@/composables/PayrollSettings/Employees/EmployeesParameters.js';
import SelectButton from 'primevue/selectbutton';
import { useAbility } from '@casl/vue';
const { can, rules } = useAbility();
const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();
const { conditionalColumns } = useEmployeesParameters();
let endpoint = ref('/employees');
const toast = useToast();
const columnas = ref([]);
const column = ref([]);
const valueCustomTable = ref({ status: false, icon: 'pi pi-lock', label: 'Custom Table' });
const mode = ref('');
const selectedTypeDocument = ref();
const selectedGenderType = ref();
const typesDocument = ref([
    { label: 'Cedula de ciudadania', id: 'CEDCIUD' },
    { label: 'Cedula de extranjería', id: 'CEDEXTR' }
]);
const genderTypes = ref([
    {
        id: '',
        label: 'Selecionar Tipo Documento'
    },
    {
        id: 'F',
        label: 'Femenino'
    },
    {
        id: 'M',
        label: 'Masculino'
    },
    {
        id: 'O',
        label: 'Otro'
    }
]);
const workCenters = ref([
    {
        id: 1,
        uuid: '40add967-f6cb-4794-940a-e519ddaaead8',
        name: 'Contratista',
        code: 'con01'
    }
]);
const companies = ref([
    {
        id: 1,
        uuid: 'd9612b51-2966-4bac-b1f7-5a7718e0c95a',
        name: 'Basil Farms',
        code: '900137869'
    }
]);

const farms = ref([
    {
        id: 1,
        uuid: 'c86883a4-9334-4519-96df-3a9416a293f6',
        name: 'Retoño',
        code: 'fin01'
    }
]);


const statusDialog = ref('Active');
const optionsStatus = ref(['Inactive', 'Active']);

const formDialog = ref(false);
//For opening the dialog
const headerNamesRow = ref([]);
const hideDialog = () => {
    
    formDialog.value = false;
};
const isChanging = ref(false);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        //readAll(endpoint.value);
    }
);
const listRowSelect = ref([]);
let dataPost = ref({
    document: "",
    first_name: "",
    last_name: "",
    last_name_b: "",
    gender_id: "",
    email: "",
    document_type: "",
    bank_account_number: "",
    bank_account_doc: "",
    bank_type_buy: "",
    work_center_id: null,
    company_id: null,
    farm_id: null,
    status_id: null
});




const resetValues = () => {
    dataPost.value.document = "";
    dataPost.value.first_name = "";
    dataPost.value.last_name = "";
    dataPost.value.last_name_b = "";
    dataPost.value.gender_id = "";
    dataPost.value.email = "";
    dataPost.value.document_type = "";
    dataPost.value.bank_account_number = "";
    dataPost.value.bank_account_doc = "";
    dataPost.value.bank_type_buy = "";
    dataPost.value.work_center_id = null;
    dataPost.value.company_id = null;
    dataPost.value.farm_id = null;
    dataPost.value.status_id = null;
};

const assignValues = () => {
    if(mode.value ="EDIT"){
        dataPost.value.document = listRowSelect.value[0].document;
dataPost.value.first_name = listRowSelect.value[0].first_name;
dataPost.value.last_name = listRowSelect.value[0].last_name;
dataPost.value.last_name_b = listRowSelect.value[0].last_name_b;
dataPost.value.gender_id = listRowSelect.value[0].gender_id;
dataPost.value.email = listRowSelect.value[0].email;
dataPost.value.document_type = listRowSelect.value[0].document_type;
dataPost.value.bank_account_number = listRowSelect.value[0].bank_account_number;
dataPost.value.bank_account_doc = listRowSelect.value[0].bank_account_doc;
dataPost.value.bank_type_buy = listRowSelect.value[0].bank_type_buy;
if(listRowSelect.value[0].work_center_id){dataPost.value.work_center_id = null}
else{ dataPost.value.work_center_id = listRowSelect.value[0].work_center_id;}
dataPost.value.company_id = listRowSelect.value[0].company_id;
dataPost.value.farm_id = listRowSelect.value[0].farm_id;
dataPost.value.status_id = listRowSelect.value[0].status_id;
    }
};
watch(listRowSelect, () => {
  assignValues();
}, { deep: true });

const openNew = () => {
    mode.value = 'NEW';
    formDialog.value = true;
};
let serverError = ref(null);
let isServerError = ref(false);
const newRecord = async (requestDataUnitTypes, endpoint) => {
    await postResponseAPI(requestDataUnitTypes, endpoint);
    serverError.value = errorResponseAPI.value;
    if (serverError.value._rawValue != '') {
        isServerError.value = true;
        toast.add({ severity: 'Error', summary: 'There are some errores', detail: 'Must correct some mistakes', life: 3000 });
    } else {
        isChanging.value = true;
        isServerError.value = false;
        hideDialog();
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
    }
};

const openEdit = () => {
    mode.value = 'EDIT';


    formDialog.value = true;
    

    
};

const saveRecord = () => {
    if (mode.value == 'NEW') {
        newRecord(dataPost.value, endpoint.value);

    }
    if (mode.value == 'EDIT') {
        newRecord(dataPost.value, endpoint.value);
        

    }
};
////////////////////////////////////////////////////////////////
const customTable = () => {
    if (valueCustomTable.value.status) {
        valueCustomTable.value.status = false;
        valueCustomTable.value.icon = 'pi pi-lock';
    } else {
        valueCustomTable.value.status = true;
        valueCustomTable.value.icon = 'pi pi-lock-open';
    }
};
const documentFrozen = ref(false);

const selectedRegisters = ref([]);

const onRowSelect = (data) => {
    listRowSelect.value = data;
};

watch(
    () => dataResponseAPI.value,
    (x, y) => {},
    { immediate: true }
);
watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};

// const first = ref(0);
// const onSort = (event) => {
//     lazyParams.value = event;
//     loadLazyData(event);
// };

onBeforeMount(() => {
    initFilters();
});

onMounted(async () => {
    loading.value = true;
    lazyParams.value = {
        ////  first: dt.value.first,
        ////  rows: dt.value.rows,
        ////  sortField: null,
        ////  sortOrder: null,
        filters: filters.value
    };

    await loadLazyData();

    selectedRegisters.value = [];

    column.value = null;
    fillHeaderCustom();
});

const fillHeaderCustom = () => {
    //console.log(dataResponseAPI.value.data[0]);
    let mappedArray1 = [];

    const types = ['string', 'number'];

    for (let key in dataResponseAPI.value.data[0]) {
        if (types.includes(typeof dataResponseAPI.value.data[0][key])) mappedArray1.push(key);
    }
    console.log(mappedArray1);

    columnas.value = mappedArray1.map((item) => {
        return {
            field: item,
            header: item.replaceAll('_', ' ').toUpperCase(),
            position: mappedArray1.indexOf(item)
        };
    });

    column.value = columnas.value;
};
const onColumnsChange = (column) => {
    column.sort((a, b) => a.position - b.position);
};
const dt = ref();
const loading = ref(false);
const lazyParams = ref({});

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
    endpoint.value = '/employees';
    await getAllResponseAPI(endpoint.value);
    loading.value = false;
};

const clearFilter = () => {
    initFilters();
};
const filters = ref();
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        document: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        document_type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        first_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        last_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'workCenter.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank_account_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
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

<style lang="scss" scoped>
.flex-container {
    display: flex;
    justify-content: center;
}
</style>