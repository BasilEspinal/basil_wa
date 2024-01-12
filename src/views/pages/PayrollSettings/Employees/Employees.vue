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
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                            </div>
                        </template>
                    </Toolbar>
                </div>
            </div>
            <div class="card">
                <Button type="button" icon="pi pi-table" label="" class="p-button-outlined mb-2" @click="customTable" />
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
                id="tblData"
                ref="dt"
                v-model:selection="selectedRegisters"
                v-model:filters="filters"
                :class="`p-datatable-${size.class}`"
                :value="dataResponseAPI.data"
                showGridlines
                :globalFilterFields="['workCenter.name', 'last_name', 'company.name']"
                tableStyle="min-width: 75rem"
                dataKey="uuid"
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

                <Column filterField="document_type" header="Type of Document" sortable>
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
                        {{ data.gender.name }}
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
                        {{ data.payment_type.name }}
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
                        <Tag :value="data.status.name" :severity="data.status.color" />
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by status" />
                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
              <pre>{{ dataPost }}</pre>  
              <pre>{{ values }}</pre>
                <pre>{{ errors }}</pre>
                <div class="p-grid">
                    <form>
                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="typeOfDocumentId" class="p-d-block">Type of documents</label>
                        <Dropdown v-model="selectedDocumentType" :options="typesDocument" optionLabel="label" inputId="typeOfDocumentId" aria-labelledby="basic" :placeholder="selectedDocumentType.name" />
                        
                    </div>
                        

                    <div class="p-col-6 p-md-4 mb-2">

                        <label for="document_id" class="p-d-block">Document</label>
                        <InputText v-model="documentV" inputId="document_id" aria-labelledby="basic" placeholder="Type your document here" :class="{ 'p-invalid': errors['document'] }"/>
                        <label for="document_id" class="block text-l mb-2" :class="{ 'p-invalid text-red-700': errors['document']}">
                            {{ errors['document']  }}
                        </label>
                    </div>

                    

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="name" class="p-d-block">Name</label>
                        <InputText v-model="firstNameV" inputId="name" aria-labelledby="basic" placeholder="Type your name here" :class="{ 'p-invalid': errors['first_name'] }"/>
                        <label for="name" class="block text-l mb-2" :class="{ 'text-red-700': errors['first_name'] }">
                        {{ errors['first_name'] }}
                        </label>
                    </div>
                    

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="lastName" class="p-d-block">Last Name</label>
                        <InputText v-model="lastNameV" inputId="lastName" aria-labelledby="basic" placeholder="Type your last name here" :class="{ 'p-invalid': errors['last_name'] }"/>
                        <label for="lastName" class="block text-l mb-2" :class="{ 'text-red-700': errors['last_name'] }">
                        {{ errors['last_name'] }}
                        </label>
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="email" class="p-d-block">Email</label>
                        <InputText v-model="emailV" inputId="email" aria-labelledby="basic" placeholder="Type your email here" :class="{ 'p-invalid': errors['email'] }" />
                        <label for="email" class="block text-l mb-2" :class="{ 'text-red-700': errors['email'] }">
                        {{ errors['email'] }}
                        </label>
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="bankAccountNumber" class="p-d-block">Account number</label>
                        <InputText v-model="bankAccountNumberV" inputId="bankAccountNumber" aria-labelledby="basic" placeholder="Type your account here" :class="{ 'p-invalid': errors['bank_account_number'] }"/>
                        <label for="bankAccountNumber" class="block text-l mb-2" :class="{ 'text-red-700': errors['bank_account_number'] }">
                        {{ errors['bank_account_number'] }}
                        </label>
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="bankAccountDoc" class="p-d-block">Account Document</label>
                        <InputText v-model="bankAccountDocV" inputId="bankAccountDoc" aria-labelledby="basic" placeholder="Type your account document here" :class="{ 'p-invalid': errors['bank_account_doc'] }"/>
                        <label for="bankAccountDoc" class="block text-l mb-2" :class="{ 'text-red-700': errors['bank_account_doc'] }">
                        {{ errors['bank_account_doc'] }}
                        </label>
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="paymentTypes" class="p-d-block">Payment types</label>
                        <Dropdown v-model="selectedPaymentType" :options="paymentTypes" optionLabel="code" inputId="paymentType" aria-labelledby="basic" :placeholder="selectedPaymentType.code" />
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="workCenter" class="p-d-block">Work Center</label>
                        <Dropdown v-model="selectedWorkCenters" :options="workCenters" optionLabel="name" inputId="workCenter" aria-labelledby="basic" :placeholder="selectedWorkCenters.name" />
                    </div>

                    <div class="p-col-6 p-md-4 mb-2">
                        <label for="genderType" class="p-d-block">Select gender</label>
                        <Dropdown v-model="selectedGenderType" :options="genderTypes" optionLabel="label" inputId="genderType" aria-labelledby="basic" :placeholder="selectedGenderType.label" />
                    </div>

                    <!-- <div class="p-col-6 p-md-4 mb-2">
                        <label for="farmsId" class="p-d-block">Farms</label>
                        <Dropdown v-model="selectedFarm" :options="farms" optionLabel="name" inputId="farmsId" aria-labelledby="basic" :placeholder="selectedFarm.name" />
                    </div> -->
                </form>
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

            <Dialog v-model:visible="exportDialog" :style="{ width: '280px' }" :header=" headerDialog" :modal="true" class="p-fluid">
                <div class="field col">
                    <label>File name</label>
                    <InputText id="name" v-model="filename" :required="true" integeronly />
                    <span class="p-float-label mt-5">
                        <Dropdown v-model="format" :options="ext_file" optionLabel="name" :class="{ 'p-invalid w-full md:w-14rem': format == '', ' w-full md:w-14rem': format != '' }" />
                        <label for="cs-city">Format</label>
                    </span>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="exportDialog = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
                </template>
            </Dialog>
            <Toast />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onBeforeMount, onMounted,provide} from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useEmployeesParameters from '@/composables/PayrollSettings/Employees/EmployeesParameters.js';
import SelectButton from 'primevue/selectbutton';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';


let endpoint = ref('/employees');
const loading = ref(false);

const router = useRouter();

const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();
const { conditionalColumns } = useEmployeesParameters();
const toast = useToast();
////////////////////////////////////////////
let dataPost = ref({
    document_type: '',
    document: '4',
    first_name: '',
    last_name: '',
    last_name_b: '',
    gender_id: '',
    email: '',
    bank_account_number: '',
    bank_account_doc: '',
    work_center_id: '',
    payment_type_id: '',
    farm_id: ''
});
const {
  values,
  errors,
  meta,
  validate,
  handleSubmit,
  setFieldValue,
  setErrors,
  defineField,
} = useForm({
  validationSchema: toTypedSchema(
    z.object({
      document_type: z.string(),
      document: z.string().nonempty('Field is required').min(3),
      first_name: z.string().nonempty('Field is required').min(3),
      last_name: z.string().nonempty('Field is required').min(3),
      last_name_b: z.string().nonempty('Field is required').min(3),
      gender_id: z.string(),
      email: z.string().nonempty('Field is required').min(3).email(),
      bank_account_number: z.string().min(3),
      bank_account_doc: z.string().min(3),
      work_center_id: z.string(),
      payment_type_id: z.string(),
      farm_id: z.string(),
    })
  ),
});

const [
    documentTypeV,
     documentTypeAttrs
] = defineField('document_type', validate);
const [
    documentV,
    documentAttrs
] = defineField('document', validate);

const [
  firstNameV,
  firstNameAttrs
] = defineField('first_name', validate);

const [
  lastNameV,
  lastNameAttrs
] = defineField('last_name', validate);

const [
  lastNameBV,
  lastNameBAttrs
] = defineField('last_name_b', validate);

const [
  genderIdV,
  genderIdAttrs
] = defineField('gender_id', validate);

const [emailV, emailAttrs] = defineField('email', validate);

const [
  bankAccountNumberV,
  bankAccountNumberAttrs
] = defineField('bank_account_number', validate);

const [
  bankAccountDocV,
  bankAccountDocAttrs
] = defineField('bank_account_doc', validate);

const [
  workCenterIdV,
  workCenterIdAttrs
] = defineField('work_center_id', validate);

const [
  paymentTypeIdV,
  paymentTypeIdAttrs
] = defineField('payment_type_id', validate);

const [farmIdV, farmIdAttrs] = defineField('farm_id', validate);

// Asignar valores y manejar cambios
watch(
  () => ({
    // documentTypeV: documentTypeV.value,
    documentV: documentV.value,
    firstNameV: firstNameV.value,
    lastNameV: lastNameV.value,
    lastNameBV: lastNameBV.value,
    // genderIdV: genderIdV.value,
    emailV: emailV.value,
    bankAccountNumberV: bankAccountNumberV.value,
    bankAccountDocV: bankAccountDocV.value,
    // workCenterIdV: workCenterIdV.value,
    // paymentTypeIdV: paymentTypeIdV.value,
    // farmIdV: farmIdV.value,
  }),
  (newValues) => {
    // dataPost.value.document_type = newValues.documentTypeV;
    dataPost.value.document = newValues.documentV;
    dataPost.value.first_name = newValues.firstNameV;
    dataPost.value.last_name = newValues.lastNameV;
    dataPost.value.last_name_b = newValues.lastNameBV;
    // dataPost.value.gender_id = newValues.genderIdV;
    dataPost.value.email = newValues.emailV;
    dataPost.value.bank_account_number = newValues.bankAccountNumberV;
    dataPost.value.bank_account_doc = newValues.bankAccountDocV;
    // dataPost.value.work_center_id = newValues.workCenterIdV;
    // dataPost.value.payment_type_id = newValues.paymentTypeIdV;
    // dataPost.value.farm_id = newValues.farmIdV;
  },
  { deep: true }
);


///////////////////////////////////////////
// sizeOptionsButton
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

onMounted(async () => {
    loading.value = true;
    lazyParams.value = {
        //TODO
        filters: filters.value
    };
    await loadLazyData();
    console.log(dataResponseAPI.value.data);
    selectedRegisters.value = [];
    column.value = null;
    fillHeaderCustom();

    //selectedPaymentType.value.id = listRowSelect.value[0].payment_type.id;
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
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
    endpoint.value = '/employees';
    await getAllResponseAPI(endpoint.value);
    loading.value = false;
    // const workCentersItemId = await getListWorkCentersItemById('yourCodeToSearch');
    await getListFarms();
    await getListPaymentTypes();
    await getListDocumentTypes();
    await getListGenderTypes();
    await getListWorkCenters();
};

const listRowSelect = ref([]);
const selectedRegisters = ref([]);

const onRowSelect = (data) => {
    listRowSelect.value = data;

    //assignValues(mode.value)
};

const mode = ref();
const formDialog = ref(false);
const deleteDialog = ref(false);
const hideDialog = () => {
    formDialog.value = false;
    deleteDialog.value = false;
    recordsDelete.value = [];
    resetValues();
};

const resetValues = () => {
    dataPost.value.document = '';
    dataPost.value.first_name = '';
    dataPost.value.last_name = '';
    dataPost.value.last_name_b = '';
    dataPost.value.gender_id = null;
    dataPost.value.email = '';
    dataPost.value.document_type = '';
    dataPost.value.bank_account_number = '';
    dataPost.value.bank_account_doc = '';
    dataPost.value.work_center_id = '';
    dataPost.value.farm_id = '';
    dataPost.value.payment_type_id = '';
};
const iddd = ref();
const assignValues = (modex) => {
    if (modex === 'EDIT') {
        selectedDocumentType.value.id = listRowSelect.value[0].document_type.id;
        selectedDocumentType.value.name = listRowSelect.value[0].document_type.name;
        dataPost.value.document_type = listRowSelect.value[0].document_type.id;

        dataPost.value.document = listRowSelect.value[0].document;
        //dataPost.value.first_name = listRowSelect.value[0].first_name;
        dataPost.value.first_name = listRowSelect.value[0].first_name;
        dataPost.value.last_name = listRowSelect.value[0].last_name;
        dataPost.value.last_name_b = listRowSelect.value[0].last_name_b;

        dataPost.value.email = listRowSelect.value[0].email;

        dataPost.value.bank_account_number = listRowSelect.value[0].bank_account_number;
        dataPost.value.bank_account_doc = listRowSelect.value[0].bank_account_doc;

        selectedGenderType.value.id = listRowSelect.value[0].gender.id;
        selectedGenderType.value.label = listRowSelect.value[0].gender.name;
        dataPost.value.gender_id = listRowSelect.value[0].gender_id;

        selectedWorkCenters.value.id = workCenters.value.find((type) => type.name === listRowSelect.value[0].workCenter.name)?.id || null;
        selectedWorkCenters.value.name = listRowSelect.value[0].workCenter.name;

        selectedPaymentType.value.id = paymentTypes.value.find((type) => type.code === listRowSelect.value[0].payment_type.name)?.id || null;
        selectedPaymentType.value.code = listRowSelect.value[0].payment_type.name;

        selectedFarm.value.id = farms.value.find((type) => type.name === listRowSelect.value[0].farm.name)?.id || null;
        selectedFarm.value.name = listRowSelect.value[0].farm.name;

        dataPost.value.employee_uuid = listRowSelect.value[0].uuid;
    }
    if (modex === 'CLONE') {
        resetValues();
        selectedDocumentType.value.id = '';
        selectedDocumentType.value.name = '';
        dataPost.value.document_type = '';

        dataPost.value.document = '';

        dataPost.value.first_name = listRowSelect.value[0].first_name;
        dataPost.value.last_name = listRowSelect.value[0].last_name;
        dataPost.value.last_name_b = listRowSelect.value[0].last_name_b;

        //dataPost.value.email = listRowSelect.value[0].email;

        //dataPost.value.bank_account_number = listRowSelect.value[0].bank_account_number;
        dataPost.value.bank_account_doc = listRowSelect.value[0].bank_account_doc;

        // selectedGenderType.value.id = listRowSelect.value[0].gender.id;
        // selectedGenderType.value.label = listRowSelect.value[0].gender.name;
        // dataPost.value.gender_id = listRowSelect.value[0].gender_id;

        //selectedWorkCenters.value.id = workCenters.value.find(type => type.name === listRowSelect.value[0].workCenter.name)?.id || null;
        //selectedWorkCenters.value.name = listRowSelect.value[0].workCenter.name;

        //selectedPaymentType.value.id = paymentTypes.value.find(type => type.code === listRowSelect.value[0].payment_type.name)?.id || null;
        //selectedPaymentType.value.code = listRowSelect.value[0].payment_type.name;

        //selectedFarm.value.id = farms.value.find(type => type.name === listRowSelect.value[0].farm.name)?.id || null;
        //selectedFarm.value.name = listRowSelect.value[0].farm.name;
    }
};

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
    assignValues(mode.value);
};

const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a employee record';
    formDialog.value = true;
    assignValues(mode.value);
};

const openExport = () => {
    mode.value = 'EXPORT';
    format.value = '';
    headerDialog.value = 'Export a employee record';
    exportDialog.value = true;
    console.info("ClickBoton", mode.value);
    resetValues();
    
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

const newRecord = async (requestDataUnitTypes, endpoint) => {
    await postResponseAPI(requestDataUnitTypes, endpoint);
    console.log(requestDataUnitTypes);
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
    let data = [];
    switch (mode.value) {
        case 'NEW':
            await newRecord(dataPost.value, endpoint.value, statusCode.value);
            break;
        case 'EDIT':
            await updateRecord(dataPost.value, listRowSelect.value[0].uuid, endpoint.value);
            console.info(dataPost.value);
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
        case 'EXPORT':
            console.info("SaveRecord", mode.value);
                if (format.value == '') {
                    toast.add({ severity: 'error', summary: 'Select Format', detail: 'Must select a format', life: 3000 });
                    return;
                }
                data = {
                    data: format.value.code,
                    name: filename.value + (format.value.code ? '.csv' : '.xls')
            };
            exportData(data);
            exportDialog.value = false;
            
            break;    
    }
    mode.value = '';
};
///////////////////////////////////////////////////////////////////
const selectedDocumentType = ref([
    {
        label: '',
        id: ''
    }
]);
const selectedFarm = ref({
    id: '',
    name: ''
});
const selectedGenderType = ref({
    id: '',
    label: ''
});
const selectedPaymentType = ref({
    id: '',
    code: ''
});
const selectedWorkCenters = ref({
    id: '',
    name: ''
});
const headerDialog = ref('');
const companies = ref([
    {
        id: 1,
        uuid: 'd9612b51-2966-4bac-b1f7-5a7718e0c95a',
        name: 'Basil Farms',
        code: '900137869'
    }
]);
const typesDocument = ref([]);
const genderTypes = ref([]);
const paymentTypes = ref([]);
const workCenters = ref([]);
const farms = ref([]);

async function getListFarms() {
    await getAllResponseListAPI('/lists_farms');
    farms.value = dataResponseListAPI.value.data;
    console.log(farms.value);
}
async function getListPaymentTypes() {
    await getAllResponseListAPI('/lists_payment_types');
    paymentTypes.value = dataResponseListAPI.value.data;
    console.log(paymentTypes.value);
}
async function getListDocumentTypes() {
    await getAllResponseListAPI('/lists_document_types');
    typesDocument.value = dataResponseListAPI.value;
    console.log(typesDocument.value);
}
async function getListGenderTypes() {
    await getAllResponseListAPI('/lists_gender_types');
    genderTypes.value = dataResponseListAPI.value;
    console.log(genderTypes.value);
}
async function getListWorkCenters() {
    await getAllResponseListAPI('/lists_work_centers');
    workCenters.value = dataResponseListAPI.value.data;
    console.log(workCenters.value);
}

////////////////////////////////////////////////////////////////
//Related to table properties
const columnas = ref([]);
const column = ref([]);
const valueCustomTable = ref({ status: false, icon: 'pi pi-table', label: '' });
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

const onSelectAllChange = () => {
    onRowSelect();
};

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

const exportDialog = ref(false);
const filename = ref('employees');
const isChanging = ref(false);
const dt = ref();
const format = ref('');

const ext_file = ref([
    {
        name: 'CSV',
        code: true
    },
    {
        name: 'XLS',
        code: false
    }
]);

provide('isChanging', isChanging);

const exportCSV = () => {
    dt.value.exportCSV();
};

const exportData = (data) => {
    data.data ? exportTableToCSV(data.name) : exportExcel(data.name);
};

const exportExcel = (name) => {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));

    const format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

    const htmls = document.getElementById('tblData').innerHTML;

    const ctx = {
        worksheet: 'Worksheet',
        table: htmls
    };

    const link = document.createElement('a');
    link.download = name;
    link.href = uri + base64(format(template, ctx));
    link.click();
};

function downloadCSV(csv, name) {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = name;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportTableToCSV(name) {
    let csv = [];
    const rows = document.querySelectorAll('table tr');

    for (let i = 0; i < rows.length; i++) {
        let row = [],
            cols = rows[i].querySelectorAll('td, th');

        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(','));
    }

    downloadCSV(csv.join('\n'), name);
}

const lazyParams = ref({});

////////////////////////////////////////////////////////////////

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
watch(
    () => dataResponseAPI.value,
    (x, y) => {},
    { immediate: true }
);
watch(listRowSelect, onRowSelect);

</script>

<style lang="scss" scoped>
.flex-container {
    display: flex;
    justify-content: center;
}
</style>