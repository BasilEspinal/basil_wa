<template>
    <div>
    <div class="card">
        <div>
            

            
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
        <div class="card"><Button type="button" icon="pi pi-table" label="" class="p-button-outlined mb-2" @click="customTable"/>
            <h5 v-if="valueCustomTable.status">¿Which columns do you want to watch?</h5>
                <MultiSelect v-if="valueCustomTable.status" v-model="column" :options="columnas" optionLabel="field" placeholder="Seleccione columnas" :filter="true" display="chip" class="w-full md:w-20rem" @change="onColumnsChange(column)">
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
        
        
            <!-- <div class="card">
                <div v-if="valueCustomTable.status" class="flex justify-content-center mb-4">
                    <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                </div>
            </div> -->

            <!-- <div class="card" v-if="valueCustomTable.status">
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
            </div> -->
        

        <!-- <template v-if="$can('producto_listado')">  -->

        <template>
            <h1>No tienes permisos</h1>
        </template>

        <DataTable
            
            v-model:selection="selectedRegisters"
            v-model:filters="filters"
            :class="`p-datatable-${size.class}`"
            :value="dataResponseAPI.data"
            showGridlines
            :globalFilterFields="['workCenter.name', 'last_name', 'company.name']"
            tableStyle="min-width: 75rem"
            dataKey="uuid"
            ref="dt"
            :paginator="true"
            :loading="loading"
            :rows="20"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            filterDisplay="menu"
            scrollable
            scrollHeight="600px"
            resizableColumns
            columnResizeMode="expand"
            sortMode="multiple"
            @row-select="onRowSelect(selectedRegisters)"
            @row-unselect="onRowSelect(selectedRegisters)"
            @select-all-change="onSelectAllChange"
        >
            <!-- <template #header>
                <div class="flex justify-content-between flex-column sm:flex-row">
                    <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                    <span class="p-input-icon-left mb-2">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                    </span>
                </div>
            </template> -->
            <template #header>
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
            <Column v-if="column?.some((obj) => obj.field === 'document')" field="document" header=" Document" sortable :frozen="documentFrozen">
                <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                    <div>&nbsp;</div>
                </template>

                <template #body="{ data }">
                    {{ data.document }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by document" />
                </template>
            </Column>

            <Column  filterField = "document_type" header="Type of Document" sortable>
                <template #body="{ data }">
                    {{ data.document_type.name }}
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
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                </template>
            </Column>
            
            <Column field="last_name" header="Last Name" sortable>
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by last name" />
                </template>
            </Column>
            
            <Column field="gender" filterField="gender_id" header="Gender" sortable>
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by gender" />
                </template>
            </Column>

            
            
            <Column field="email" header="Email" sortable>
                <template #body="{ data }">
                    {{ data.email }}
                </template>

                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by email" />
                </template>
            </Column>

            <Column field="workCenterName" filterField="workCenter.name" header="Work Center Name" sortable>
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by workcenter" />
                </template>
            </Column>
            
            <Column field="bankAccountNumber" filterField="bank_account_number" header="Bank Account Number" sortable>
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account number" />
                </template>
            </Column>

            <Column field="bankAccountDoc" filterField="bank_account_doc" header="Bank Account Document" sortable>
                <template #body="{ data }">
                    {{ data.bank_account_doc }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account Document" />
                </template>
            </Column>

            <Column field="paymentType" filterField="payment_type.name" header="Payment Type" sortable>
                <template #body="{ data }">
                    <!-- {{ data.payment_type.name }} -->
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by payment type" />
                </template>
            </Column>

            <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by farm" />
                </template>
            </Column>

            <Column field="companyName" header="Company Name" sortable>
                <template #body="{ data }">
                    {{ data.company.name }}
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
        <!-- <pre>{{ dataResponseAPI.data }}</pre> -->
        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <div class="p-grid">
                <!-- <pre>{{ listRowSelect[0].workCenter }}</pre>-->
                <pre>{{ dataPost }}</pre>
                <!-- 
                <pre>{{ selectedPaymentType }}</pre> -->
                <!-- <pre>{{ listRowSelect}}</pre> -->
                <!--<pre>{{ selectedGenderType}}</pre> -->
                
                
                <div class="p-col-6 p-md-4 mb-2">
                    <label for="typeDocument" class="p-d-block">Type of documents</label>
                    <Dropdown v-model="selectedDocumentType" :options="typesDocument" optionLabel="name" inputId="typeOfDocumentId" aria-labelledby="basic" :placeholder="selectedDocumentType.name" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="document_id" class="p-d-block">Document</label>
                    <InputText v-model="dataPost.document" inputId="document" aria-labelledby="basic" placeholder="Type your document here" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="name" class="p-d-block">Name</label>
                    <InputText v-model="dataPost.first_name" inputId="name" aria-labelledby="basic" placeholder="Type your name here" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="lastName" class="p-d-block">Last Name</label>
                    <InputText v-model="dataPost.last_name" inputId="lastName" aria-labelledby="basic" placeholder="Type your last name here" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="email" class="p-d-block">Email</label>
                    <InputText v-model="dataPost.email" inputId="email" aria-labelledby="basic" placeholder="Type your email here" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="bankAccountNumber" class="p-d-block">Account number</label>
                    <InputText v-model="dataPost.bank_account_number" inputId="bankAccountNumber" aria-labelledby="basic" placeholder="Type your account here" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="bankAccountDoc" class="p-d-block">Account Document</label>
                    <InputText v-model="dataPost.bank_account_doc" inputId="bankAccountDoc" aria-labelledby="basic" placeholder="Type your account document here" />
                </div>
                <pre>{{selectedPaymentType}}</pre>
                <div class="p-col-6 p-md-4 mb-2">
                    <label for="paymentTypes" class="p-d-block">Payment types</label>
                    <Dropdown v-model="selectedPaymentType" :options="paymentTypes" optionLabel="code" inputId="paymentType" aria-labelledby="basic" :placeholder="selectedPaymentType.name" />
                </div>
<div>h1</div>
                <div class="p-col-6 p-md-4 mb-2">
                    <label for="workCenter" class="p-d-block">Work Center</label>
                    <Dropdown v-model="selectedWorkCenters" :options="workCenters" optionLabel="name" inputId="workCenter" aria-labelledby="basic" :placeholder="selectedWorkCenters.name" />
                </div>

                <div class="p-col-6 p-md-4 mb-2">
                    <label for="genderType" class="p-d-block">Select gender</label>
                    <Dropdown v-model="selectedGenderType" :options="genderTypes" optionLabel="label" inputId="genderType" aria-labelledby="basic" :placeholder="selectedGenderType.label" />
                </div>

                <div class="p-col-6 p-md-4 mb-2" >
                    <label for="farmsId" class="p-d-block">Farms</label>
                    <Dropdown v-model="selectedFarm" :options="farms" optionLabel="name" inputId="farmsId" aria-labelledby="basic" :placeholder="selectedFarm.name" />
                </div>

            </div>

            <template #footer>
                <div>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
                </div>
            </template>
        </Dialog>
        <Toast />

        <Dialog v-model:visible="deleteDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <div class="flex align-items-center">
                <div class="p-grid">
                    <div class="p-col-6 p-md-4 mb-2">
                        <label> {{ recordsDelete[0].document }} </label>
                    </div>
                    <div>
                        <label> {{ recordsDelete[0].first_name }} </label>
                    </div>
                    <div>
                        <label> {{ recordsDelete[0].last_name }} </label>
                    </div>
                </div>

                <i class="pi pi-exclamation-triangle ml-3 mb-2" style="font-size: 2rem" />
            </div>
            <template #footer>
                <div>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
                </div>
            </template>
        </Dialog>
        <Toast />
    </div>
</div>
</template>

<script setup>
import { ref,inject, watch, provide, onBeforeMount, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useEmployeesParameters from '@/composables/PayrollSettings/Employees/EmployeesParameters.js';
import SelectButton from 'primevue/selectbutton';
import { useRouter } from 'vue-router';


import { AbilityBuilder, Ability } from '@casl/ability';
import { ABILITY_TOKEN } from '@casl/vue';
import { useAbility } from '@casl/vue';
// Define a symbol for the injection token


// Use inject to get the $ability from the parent component
const $ability = inject('$ability', null);
const router = useRouter();
const { can, rules } = useAbility();
const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, statusCode } = useDataAPI();
const { conditionalColumns } = useEmployeesParameters();
let endpoint = ref('/employees');
const toast = useToast();
const columnas = ref([]);
const column = ref([]);
const valueCustomTable = ref({ status: false, icon: 'pi pi-table', label: '' });
const mode = ref();
const selectedFarm = ref({uuid: "", name:""});
const selectedGenderType = ref({ id: "",label:""});


const selectedPaymentType = ref({
			id: "",
			code: "",	
		});
        
const selectedWorkCenters = ref(
    {
  uuid: "35c8cb40-2635-481a-ad1b-7ff46522b506",
  name: "Selección",
  code: "sel01",
  created_at: "2024-01-07",
  updated_at: "2024-01-07"
}

);
const headerDialog = ref('');
const selectedDocumentType = ref([
    { 
        label: '',
        id: ''
    },
    
]);
const typesDocument = ref([
    { 
        name: 'Cedula de ciudadania',
        id: 'CEDCIUD'
    },
    { 
        name: 'Cedula de extranjería',
        id: 'CEDEXTR' }
]);


const genderTypes = ref([
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
const paymentTypes = ref([
{
			"id": 1,
			"code": "BBVA",
            "name": "BBVA"
		},
		{
			"id": 2,
			"code": "DALE!",
            "name": "DALE!"

		},
		{
			"id": 3,
			"code": "EFECTIVO",
            "name": "EFECTIVO"
		}
	])
const workCenters = ref([
{
			"id": 1,
			"name": "Contratista"
		},
		{
			"id": 2,
			"name": "Corta"
		},
		{
			"id": 3,
			"name": "Planta"
		},
		{
			"id": 4,
			"name": "Selección"
		},
		{
			"id": 5,
			"name": "Laboratorio"
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
        uuid: 'c86883a4-9334-4519-96df-3a9416a293f6',
        id: 0,
        name: 'Otra',
        code: 'FIN00'
    },
    {
        uuid: 'c86883a4-9334-4519-96df-3a9416a293f6',
        id: 1,
        name: 'Retoño',
        code: 'FIN01'
    },
    {
        id: 2,
        uuid: '21eb9f91-25df-458a-81fa-68e5a91eed69',
        name: 'La consentida',
        code: 'FIN02'
    }
]);

const statusDialog = ref('Active');
const optionsStatus = ref(['Inactive', 'Active']);
const formDialog = ref(false);
const deleteDialog = ref(false);
const hideDialog = () => {
    formDialog.value = false;
    deleteDialog.value = false;
    recordsDelete.value = [];
    resetValues();
};

const listRowSelect = ref([]);
let dataPost = ref(
    {
  document_type: "",
  document: "4",
  first_name: "",
  last_name: "",
  last_name_b: "",
  gender_id: "",
  email: "",
  bank_account_number: "",
  bank_account_doc: "",
  work_center_id: "",
  payment_type_id: "",
  farm_id: ""
}
);

const resetValues = () => {
    dataPost.value.document = '';
    dataPost.value.first_name = '';
    dataPost.value.last_name = '';
    dataPost.value.last_name_b = '';
    dataPost.value.gender_id = '';
    dataPost.value.email = '';
    dataPost.value.document_type = '';
    dataPost.value.bank_account_number = '';
    dataPost.value.bank_account_doc = '';
    dataPost.value.work_center_id = null;
    // dataPost.value.company_id = null;
    dataPost.value.farm_id = null;
    dataPost.value.payment_type_id = null;
    
};

const assignValues = (modex) => {
    
    if ((modex ==='EDIT')) {
        
        
        selectedDocumentType.value.id = listRowSelect.value[0].document_type.id;
        selectedDocumentType.value.name = listRowSelect.value[0].document_type.name;
        dataPost.value.document_type = listRowSelect.value[0].document_type.id;
        dataPost.value.document = listRowSelect.value[0].document;
        dataPost.value.first_name = listRowSelect.value[0].first_name;
        dataPost.value.last_name = listRowSelect.value[0].last_name;
        dataPost.value.last_name_b = listRowSelect.value[0].last_name_b;
        selectedGenderType.value.id = listRowSelect.value[0].gender_id;
        selectedGenderType.value.label = listRowSelect.value[0].gender_label;
        dataPost.value.gender_id = listRowSelect.value[0].gender_id;
        dataPost.value.email = listRowSelect.value[0].email;
        dataPost.value.bank_account_number = listRowSelect.value[0].bank_account_number;
        dataPost.value.bank_account_doc = listRowSelect.value[0].bank_account_doc;
        dataPost.value.bank_type_buy = listRowSelect.value[0].bank_type_buy;
        selectedWorkCenters.value.id = listRowSelect.value[0].workCenter.id;
        selectedWorkCenters.value.name = listRowSelect.value[0].workCenter.name;
        dataPost.value.work_center_id = listRowSelect.value[0].workCenter.uuid;
        selectedFarm.value.id = listRowSelect.value[0].farm.id;
        dataPost.value.farm_id = listRowSelect.value[0].farm.id;
        selectedPaymentType.value.id = listRowSelect.value[0].payment_type.id;
        selectedPaymentType.value.code = listRowSelect.value[0].payment_type.name;
        dataPost.value.payment_type_id = listRowSelect.value[0].payment_type.id;
        selectedFarm.value.uuid = listRowSelect.value[0].farm.uuid;
        selectedFarm.value.name = listRowSelect.value[0].farm.name;
        dataPost.value.farm_id = listRowSelect.value[0].farm.uuid;
        
    }
    if ((modex=== 'CLONE' )) {
        
        selectedDocumentType.value.id = listRowSelect.value[0].document_type.id;
        selectedDocumentType.value.name = listRowSelect.value[0].document_type.name;
        dataPost.value.document_type = "";
        dataPost.value.document = "";
        dataPost.value.first_name = listRowSelect.value[0].first_name;
        dataPost.value.last_name = listRowSelect.value[0].last_name;
        dataPost.value.last_name_b = listRowSelect.value[0].last_name_b;
        selectedGenderType.value.id = listRowSelect.value[0].gender_id;
        selectedGenderType.value.label = listRowSelect.value[0].gender_label;
        dataPost.value.gender_id = listRowSelect.value[0].gender_id;
        dataPost.value.email = listRowSelect.value[0].email;
        dataPost.value.bank_account_number = listRowSelect.value[0].bank_account_number;
        dataPost.value.bank_account_doc = listRowSelect.value[0].bank_account_doc;
        dataPost.value.bank_type_buy = listRowSelect.value[0].bank_type_buy;
        selectedWorkCenters.value.id = listRowSelect.value[0].workCenter.id;
        selectedWorkCenters.value.name = listRowSelect.value[0].workCenter.name;
        dataPost.value.work_center_id = listRowSelect.value[0].workCenter.uuid;
        selectedFarm.value.id = listRowSelect.value[0].farm.id;
        dataPost.value.farm_id = listRowSelect.value[0].farm.id;
        selectedPaymentType.value.id = listRowSelect.value[0].payment_type.id;
        selectedPaymentType.value.code = listRowSelect.value[0].payment_type.name;
        dataPost.value.payment_type_id = listRowSelect.value[0].payment_type.id;
        selectedFarm.value.uuid = listRowSelect.value[0].farm.uuid;
        selectedFarm.value.name = listRowSelect.value[0].farm.name;
        dataPost.value.farm_id = listRowSelect.value[0].farm.uuid;
        
    }
};

watch(
    selectedFarm,
    () => {
        dataPost.value.farm_id = selectedFarm.value.id;
        
    },
    { deep: true }
);

watch(
    selectedDocumentType,
    () => {
        dataPost.value.document_type = selectedDocumentType.value.id;
    },
    { deep: true }
);
watch(
    selectedWorkCenters,
    () => {
        dataPost.value.work_center_id = selectedWorkCenters.value.id;
    },
    { deep: true }
);
watch(
    selectedPaymentType,
    () => {
        dataPost.value.payment_type_id = selectedPaymentType.value.id;
    },
    { deep: true }
);
watch(
    selectedGenderType,
    () => {
        dataPost.value.gender_id = selectedGenderType.value.id;
    },
    { deep: true }
);

const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New employee record';
};
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a employee record';
    assignValues(mode.value)
};

const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a employee record';
    formDialog.value = true;
    assignValues(mode.value)
};
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a employee record';
    resetValues();
    deleteDialog.value = true;

    for (let key in listRowSelect.value) {
        recordsDelete.value.push({
            uuid: listRowSelect.value[key].uuid,
            document: listRowSelect.value[key].document,
            first_name: listRowSelect.value[key].first_name,
            last_name: listRowSelect.value[key].last_name
        });
    }
};

const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a employee record';
    resetValues();
    formDialog.value = true;
};

const newRecord = async (requestDataUnitTypes, endpoint) => {
    await postResponseAPI(requestDataUnitTypes, endpoint);
    recordsDelete.value = [];
    

    switch (statusCode.value) {
        case 201:
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
            formDialog.value = false;
            hideDialog();
            router.go();
            break;

        case 422:
            toast.add({ severity: 'error', summary: 'Validation Error', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        case 200:
            toast.add({ severity: 'warn', summary: 'xxxxxr', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        default:
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'There was an error', life: 3000 });
    }
};
const updateRecord = async (requestDataUnitTypes, id, endpoint) => {
    await putResponseAPI(requestDataUnitTypes, endpoint, id);
    recordsDelete.value = [];


    switch (statusCode.value) {
        case 202:
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });

            hideDialog();
            router.go();
            break;

        case 422:
            toast.add({ severity: 'error', summary: 'Validation Error', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        case 200:
            toast.add({ severity: 'warn', summary: 'xxxxxr', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        default:
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'There was an error', life: 3000 });
    }
};
const dropRecord = async (id, endpoint) => {
    await deleteResponseAPI({}, endpoint, id);

    

    switch (statusCode.value) {
        case 204:
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
            router.go();
            hideDialog();
            break;

        case 422:
            toast.add({ severity: 'error', summary: 'Validation Error', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        case 200:
            toast.add({ severity: 'warn', summary: 'xxxxxr', detail: 'There are validation errors', life: 3000 });
            // Puedes agregar más casos según sea necesario
            break;
        default:
            toast.add({ severity: 'error', summary: 'Error Message', detail: 'There was an error', life: 3000 });
    }
};
const saveRecord = async () => {
    switch (mode.value) {
        case 'NEW':
            await newRecord(dataPost.value, endpoint.value, statusCode.value);
            break;
        case 'EDIT':
            
            await updateRecord(dataPost.value, listRowSelect.value[0].uuid, endpoint.value);
            break;
        case 'DELETE':
            if (recordsDelete.value.length > 0 && recordsDelete.value.length < 2) await dropRecord(recordsDelete.value[0].uuid, endpoint.value);
            else {
                toast.add({ severity: 'error', summary: 'Error Message', detail: 'No puedes eliminar mas de un registro', life: 3000 });
                
            }
            break;
        case 'CLONE':
            
        await newRecord(dataPost.value, endpoint.value, statusCode.value);
        break;    
    }
    mode.value = '';
};

////////////////////////////////////////////////////////////////
const customTable = () => {
    if (valueCustomTable.value.status) {
        valueCustomTable.value.status = false;
        //valueCustomTable.value.icon = 'pi pi-lock';
    } else {
        valueCustomTable.value.status = true;
        //valueCustomTable.value.icon = 'pi pi-lock-open';
    }
};
const documentFrozen = ref(false);

const selectedRegisters = ref([]);

const onRowSelect = (data) => {
    
    listRowSelect.value = data;
    
    //assignValues(mode.value)
    
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

const updateAbility = (user, token)=>  {
            const bearer = 'Bearer ' + token;

            fetch('http://164.90.146.196:81/api/v1/abilities', {
                headers: {
                    Authorization: bearer,
                    accept: 'application/json'
                }
            })
                .then((response) => response.json())
                .then((permissions) => {
                    const { can, rules } = new AbilityBuilder(Ability);
                    can(permissions);
                    console.log(permissions)
                    this.$ability.update(rules);
                });
        }
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
    
    let mappedArray1 = [];

    const types = ['string', 'number'];

    for (let key in dataResponseAPI.value.data[0]) {
        if (types.includes(typeof dataResponseAPI.value.data[0][key])) mappedArray1.push(key);
    }
    

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
        gender_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'workCenter.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank_account_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank_account_doc: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'payment_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

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