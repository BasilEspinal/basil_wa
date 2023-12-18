<template>
    <div class="card">
        <div>
            <h1>Información de Empleados </h1>

        </div>

    </div>



    <div class="card">


        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2"
                    style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2"
                                @click="openNew" size="large" />
                            <!-- <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i> -->
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit"
                                icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit"
                                size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone"
                                icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone"
                                size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2"
                                @click="openExport" size="large" />
                            <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash"
                                class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />

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
                    <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label">
                    </SelectButton>
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

        <DataTable responsiveLayout="scroll" v-model:selection="selectedRegisters"
            @row-select="onRowSelect(selectedRegisters)" @row-unselect="onRowSelect(selectedRegisters)"
            v-model:filters="filters" :class="`p-datatable-${size.class}`" :value="dataResponseAPI.data" showGridlines
            :rows="20" tableStyle="min-width: 75rem" dataKey="uuid" :totalRecords="totalRecordsResponseAPI"
            @page="onPage($event)" @sort="onSort($event)" ref="dt" lazy :first="first" paginator :loading="loading"
            @select-all-change="onSelectAllChange" scrollable scrollHeight="600px" resizableColumns
            columnResizeMode="expand">

            <template #header>
                <div class="flex justify-content-between">

                </div>


            </template>

            <template #empty> No customers found. </template>
            <template #loading> Loading customers data. Please wait. </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

            <!-- <Column field="document" header="Document" style="min-width: 2rem"> -->
            <!-- Line above uses a set min width as minimum, if that is does not placed is automatically -->

            <Column v-if="column?.some(obj => obj.field === 'document')" field="document" header=" Document"
                :frozen="documentFrozen">
                <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel=""
                        offLabel="" />
                    <div>&nbsp; </div>
                </template>


                <template #body="{ data }">

                    {{ data.document }}
                </template>

            </Column>

            <Column v-if="column?.some(obj => obj.field === 'document_type')" header="Type of Document">
                <template #body="{ data }">
                    {{ data.document_type }}
                </template>
            </Column>


            <Column v-if="column?.some(obj => obj.field === 'first_name')" sortable field="first_name" header="Name">
                <template #body="{ data }">
                    {{ data.first_name }}
                </template>
            </Column>

            <Column v-if="column?.some(obj => obj.field === 'last_name')" field="last_name" header="Name">
                <template #body="{ data }">
                    {{ data.last_name }}
                </template>
            </Column>

            <Column v-if="column?.some(obj => obj.field === 'gender_id')" field="gender" header="Gender">
                <template #body="{ data }">
                    {{ data.gender_id }}
                </template>
            </Column>

            <Column field="prueba" header="ColumnaPrueba">
                <template #body="{ data }">
                    <div class="flex align-items-center gap-2">
                        <Avatar :image="'demo/images/avatar/amyelsner.png'" size="large" shape="circle"></Avatar>
                        <!-- <span>{{ data.gender_id }}</span> -->
                    </div>
                </template>
            </Column>

            <Column field="status" header="Status">
                <template #body="{ data }">
                    <Tag :value="data.status.name" :severity="'#EFC88B'" />
                </template>
            </Column>

            <Column v-if="column?.some(obj => obj.field === 'email')" field="email" header="Email">
                <template #body="{ data }">
                    {{ data.email }}
                </template>
            </Column>

            <Column field="workCenterName" header="Work Center Name">
                <template #body="{ data }">
                    {{ data.workCenter.name }}
                </template>
            </Column>

            <Column v-if="column?.some(obj => obj.field === 'bank_account_number')" field="bankAccountNumber"
                header="Bank Account Number">
                <template #body="{ data }">
                    {{ data.bank_account_number }}
                </template>
            </Column>

            <Column field="farmName" header="Farm Name">
                <template #body="{ data }">
                    {{ data.farm.name }}
                </template>
            </Column>

            <Column field="companyName" header="Company Name">
                <template #body="{ data }">
                    {{ data.company.name }}
                </template>
            </Column>

            <template #footer>
                Currently this page has got {{ dataResponseAPI.data ? dataResponseAPI.data.length : 0 }} registers. //
                In total there are {{ totalRecordsResponseAPI ? totalRecordsResponseAPI : 0 }} registers.
            </template>

        </DataTable>


        
        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" header="Products Details" :modal="true" class="p-fluid">
    <div>
      <label for="document_id" class="p-d-block">Document</label>

      <div>
        <component v-model="v$.$model" is="inputNumber" inputId="document_id" aria-labelledby="basic" placeholder="Type your document here" />

        <!-- Display validation errors for documentDialog -->
        <div v-if="!v$.$pending.documentDialog && v$.$error.documentDialog">
          <ul>
            <li v-for="(message, key) in validationMessages" :key="key">{{ message }}</li>
          </ul>
        </div>

        <!-- Submit button -->
        <div class="formgrid grid">
          <Button :disabled="v$.$pending" label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
          <Button :disabled="v$.$pending" label="Save" icon="pi pi-check" class="p-button-text" @click="submitForm" />
        </div>
      </div>
    </div>
  </Dialog>
    </div>
</template>

<script setup>


import { ref, watch, provide, onBeforeMount, onMounted,computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useEmployeesParameters from '@/composables/PayrollSettings/Employees/EmployeesParameters.js'
import SelectButton from 'primevue/selectbutton';
import useVuelidate from '@vuelidate/core';
import { required, email, numeric } from '@vuelidate/validators';

const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();
const { conditionalColumns } = useEmployeesParameters();
let endpoint = ref("/employees?page=" + "1")
const columnas = ref([]);
const column = ref([]);
const valueCustomTable = ref({ status: false, icon: 'pi pi-lock', label: 'Custom Table' });
const mode = ref('');
////////////////////////////////////////////////////////////////////////////////
const formDialog = ref(false);
const documentDialog = ref(0);
const validations = { documentDialog: { $model: { required, numeric } } };
const v$ = useVuelidate(validations, { documentDialog });

const validationMessages = computed(() => {
  const messages = [];
  if (!v$.$pending.documentDialog && v$.$error.documentDialog) {
    if (v$.$errors.documentDialog.required) {
      messages.push('Document is required.');
    }
    if (v$.$errors.documentDialog.numeric) {
      messages.push('Document must be a valid number.');
    }
  }
  return messages;
});

const submitForm = () => {
  if (v$.$pending) {
    console.log('Form is still validating');
    return;
  }

  if (v$.$error) {
    console.log('Form has validation errors. Please correct them.');
    return;
  }

  formDialog.value = false;
  console.log(documentDialog.value)
  console.log('Form is valid. formDialog.value set to false.');
};
////////////////////////////////////////////////////////////////////////////////
//For opening the dialog

const hideDialog = () => {
    formDialog.value = false;
};

const openNew = () => {

    mode.value = 'NEW';
    formDialog.value = true;


};


const customTable = () => {
    if (valueCustomTable.value.status) {
        valueCustomTable.value.status = false;
        valueCustomTable.value.icon = 'pi pi-lock';
    }
    else {
        valueCustomTable.value.status = true;
        valueCustomTable.value.icon = 'pi pi-lock-open';

    }
}
const documentFrozen = ref(false);

const selectedRegisters = ref([]);
const listRowSelect = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
};

watch(
    () => dataResponseAPI.value,
    (x, y) => {


    },
    { immediate: true }
);
watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};


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

    await loadLazyData();

    selectedRegisters.value = [];

    column.value = null;
    fillHeaderCustom();




})



const fillHeaderCustom = () => {

    console.log(dataResponseAPI.value.data[0])
    let mappedArray1 = [];

    const types = ['string', 'number'];

    for (let key in dataResponseAPI.value.data[0]) {
        if (types.includes(typeof dataResponseAPI.value.data[0][key]))
            mappedArray1.push(key);
    }
    console.log(mappedArray1)

    columnas.value = mappedArray1.map((item) => {
        return {
            field: item,
            header: item.replaceAll('_', ' ').toUpperCase(),
            position: mappedArray1.indexOf(item)
        };
    });

    column.value = columnas.value;




}
const onColumnsChange = (column) => {
    column.sort((a, b) => a.position - b.position);
};
const dt = ref();
const loading = ref(false);
const lazyParams = ref({});
const first = ref(0);

const loadLazyData = async (event) => {

    lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };
    endpoint.value = "/employees?page=" + (lazyParams.value.page + 1);
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