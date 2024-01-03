<template>
    <div class="card">
        <div>
            <pre>{{ listRowSelect }}</pre>
            <h1>Información de Empleados</h1>
        </div>
    </div>

    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2"
                    style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button v-if="$can('empleado_crear')" label="New" icon="pi pi-plus"
                                class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <!-- <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i> -->
                            <Button v-if="$can('empleado_editar')"
                                :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit"
                                icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit"
                                size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone"
                                icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone"
                                size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2"
                                @click="openExport" size="large" />
                            <Button v-if="$can('empleado_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete"
                                icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete"
                                size="large" />
                        </div>
                    </template>
                </Toolbar>
            </div>
        </div>
        <div class="card"><Button type="button" :icon="valueCustomTable.icon" label="Custom Table"
                class="p-button-outlined mb-2" @click="customTable()" /></div>

        <div class="card" v-if="valueCustomTable.status">
            <div class="card">
                <div v-if="valueCustomTable.status" class="flex justify-content-center mb-4">
                    <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                </div>
            </div>

            <div class="card" v-if="valueCustomTable.status">
                <h5>¿Which columns do you want to watch?</h5>
                <MultiSelect v-model="column" :options="columnas" optionLabel="field" placeholder="Seleccione columnas"
                    :filter="true" display="chip" class="w-full md:w-50rem" @change="onColumnsChange(column)">
                    <template #value="slotProps">
                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2"
                            v-for="option of slotProps.value" :key="option.header">
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
            
            <DataTable  responsiveLayout="scroll" v-model:selection="selectedRegisters"
            @row-select="onRowSelect(selectedRegisters)" @row-unselect="onRowSelect(selectedRegisters)"
            v-model:filters="filters" :filters="filters" :class="`p-datatable-${size.class}`" :value="dataResponseAPI.data"
            showGridlines :globalFilterFields="['workCenter.name', 'last_name', 'company.name']" :rows="20"
            tableStyle="min-width: 75rem" dataKey="uuid" :totalRecords="totalRecordsResponseAPI" ref="dt" :paginator="true"
            :loading="loading" :rowsPerPageOptions="[5, 10, 20, 50]" filterDisplay="menu"
            @select-all-change="onSelectAllChange" scrollable scrollHeight="600px" resizableColumns
            columnResizeMode="expand" sortMode="multiple" v-if="$can('empleado_listado')">
            <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2"
                        @click="clearFilter()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                    </span>
                </div>
            </template>

            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

            <!-- <Column field="document" header="Document" style="min-width: 2rem"> -->
            <!-- Line above uses a set min width as minimum, if that is does not placed is automatically -->

            <Column v-if="column?.some((obj) => obj.field === 'document')" field="document" header=" Document" sortable
                :frozen="documentFrozen">
                <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel=""
                        offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    {{ data.document }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <Column v-if="column?.some((obj) => obj.field === 'document_type')" header="Type of Document" sortable>
                <template #body="{ data }">
                    {{ data.document_type }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>

            <Column v-if="column?.some((obj) => obj.field === 'first_name')" field="first_name" header="Name" sortable>
                <template #body="{ data }">
                    {{ data.first_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'last_name')" -->
            <Column  field="last_name" header="Last Name" sortable>
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'gender_id')" -->
            <Column  field="gender" header="Gender" sortable>
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <Column field="prueba" header="ColumnaPrueba">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <Avatar :image="'demo/images/avatar/amyelsner.png'" size="large" shape="circle"></Avatar>
                        <!-- <span>{{ data.gender_id }}</span> -->
                    </div>
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <Column field="status" header="Status" sortable>
                <template #body="{ data }">
                    <Tag :value="data.status.name" :severity="'#EFC88B'" />
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'email')" -->
            <Column  field="email" header="Email" sortable>
                <template #body="{ data }">
                    {{ data.email }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <Column field="workCenterName" header="Work Center Name" sortable>
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>
            <!-- v-if="column?.some((obj) => obj.field === 'bank_account_number')" -->
            <Column  field="bankAccountNumber"
                header="Bank Account Number" sortable>
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by Bank Account" />
                </template>
            </Column>

            <Column field="farmName" header="Farm Name" sortable>
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <Column field="companyName" header="Company Name" sortable>
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                        placeholder="Search by country" />
                </template>
            </Column>

            <template #footer> Currently this page has got {{ dataResponseAPI.data ? dataResponseAPI.data.length : 0 }}
                registers. // In total there are {{ totalRecordsResponseAPI ? totalRecordsResponseAPI : 0 }} registers.
            </template>
        </DataTable>

        
        <template >

            <h1>No tienes permisos</h1>
        </template>
        


        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" header="Products Details" :modal="true"
            class="p-fluid text-center mx-auto">
            <div class="p-grid">

                <pre>{{ serverError }}</pre>
                <pre>{{ dataPost }}</pre>
                <div class="p-col-12 p-md-4 mb-2">
                    <label for="document_id" class="p-d-block">Document</label>
                    <InputNumber v-model="documentDialog" inputId="document_id" aria-labelledby="basic"
                        placeholder="Type your document here" />
                </div>

                <div class="p-col-12 p-md-4 mb-2">
                    <label for="typeDocument" class="p-d-block">Type of Document</label>
                    <Dropdown v-model="selectedTypeDocument" :options="typesDocument" optionLabel="label"
                        inputId="typeDocument" aria-labelledby="basic" placeholder="Select a type" />
                </div>

                <div class="p-col-12 p-md-4 mb-2">
                    <label for="name" class="p-d-block">Name</label>
                    <InputText v-model="nameDialog" inputId="name" aria-labelledby="basic"
                        placeholder="Type your name here" />
                </div>

                <div class="p-col-12 p-md-4 mb-2">
                    <label for="lastName" class="p-d-block">Last Name</label>
                    <InputText v-model="lastNameDialog" inputId="lastName" aria-labelledby="basic"
                        placeholder="Type your last name here" />
                </div>

                <!---->
                
                <!---->
                <div class="p-col-12 p-md-4 mb-2">
                    <label for="genderType" class="p-d-block">Select gender</label>
                    <Dropdown v-model="selectedGenderType" :options="genderTypes" optionLabel="label"
                        inputId="genderType" aria-labelledby="basic" placeholder="Select a type" />
                </div>
                
                <label for="lastName" class="p-d-block">Status</label>
                <div class="card flex justify-content-center">
                    <SelectButton v-model="statusDialog" :options="optionsStatus" aria-labelledby="basic"
                        class="p-invalid" />
                </div>
                <!---->

                <div class="p-col-12 text-center">
                    <div>
                        <ul>
                            <li v-for="(message, key) in validationMessages" :key="key">{{ message }}</li>
                        </ul>
                    </div>
                </div>
            </div>
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
    { label: 'Cedula de extranjería', id: 'CEDEXTR' },

]);
const genderTypes = ref([
{
		"id": "",
		"label": "Selecionar Tipo Documento"
	},
	{
		"id": "F",
		"label": "Femenino"
	},
	{
		"id": "M",
		"label": "Masculino"
	},
	{
		"id": "O",
		"label": "Otro"
	}

]);
const documentDialog = ref();
const nameDialog = ref('');
const lastNameDialog = ref('');
const genderDialog = ref('');
const statusDialog = ref('Inactive');
const optionsStatus = ref(['Inactive', 'Active']);
const formDialog = ref(false);
//For opening the dialog
const headerNamesRow = ref([]);
const hideDialog = () => {
    formDialog.value = false;
};
let dataPost = ref(
    {
  document: "10263",
  first_name: "Brayan",
  last_name: "Yepes",
  last_name_b: "Garcia",
  gender_id: "F",
  email: "sebastian6@mail.com",
  document_type: "CEDCIUD",
  bank_account_number: "1026283",
  bank_account_doc: "1026283",
  bank_type_buy: "asdsfgfg",
  work_center_id: 1,
  company_id: 1,
  farm_id: 1
}

);
//const sendRequestedData = ref([]);

const openNew = () => {
    mode.value = 'NEW';
    formDialog.value = true;
};
let serverError = ref(null);
let isServerError = ref(false);
const newRecord = async (requestDataUnitTypes, endpoint) => {
    // sendRequestedData.value.push({
    //     document: '102228656588',
    //     first_name: 'Sebastian',
    //     last_name: 'Yepes',
    //     last_name_b: 'Garcia',
    //     gender_id: null,
    //     email: 'sebastian@mail.com',
    //     document_type: 'CEDCIUD',
    //     bank_account_number: null,
    //     bank_account_doc: null,
    //     bank_type_buy: null,
    //     workCenter: 1,
    //     farm: 1
    // })
    await postResponseAPI(requestDataUnitTypes, endpoint);
    //console.log(errorResponseAPI.value)
    serverError.value = errorResponseAPI.value;
    //console.log(serverError.value)
    alert(serverError.value._rawValue)
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
        newRecord(dataPost, endpoint.value)
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
const listRowSelect = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
};

watch(
    () => dataResponseAPI.value,
    (x, y) => { },
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

<style lang="scss" scoped>.flex-container {
    display: flex;
    justify-content: center;
}</style>