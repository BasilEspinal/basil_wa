<template>
    <div>
        <div class="card">
            <div>
                <h1>Información de roles</h1>
            </div>
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                            <template v-slot:start>
                                <div>
                                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                                    <!-- <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" /> -->
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                                </div>
                            </template>
                        </Toolbar>
                    </div>
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
                @select-all-change="onSelectAllChange"
                v-model:selection="selectedRegisters"
                @rowExpand="onRowExpand"
                @rowCollapse="onRowCollapse"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                v-model:expandedRows="expandedRows"
                v-if="ability.can('rol_listado')"
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
                <Column expander style="width: 5rem" />
                <Column field="xxxxxx" filterField="xxxxxx" header="Name " sortable frozen="">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <!--Here add other columns-->
                <!-- 
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
            </Column> -->
                <template #expansion="{ data }">
                    <div class="p-3">
                        <h5>Orders for {{ data.name }}</h5>
                        <div class="col-12 lg:col-8">
                            <div class="card">
                                <h5>Name: {{ data.name }}</h5>
                                <h5>Id rol {{ data.id }}</h5>
                                
                                <Button label="Save" icon="pi pi-save" class="p-button-success flex items-center justify-center mb-2 mt-2" @click="changeRoles" size="large" />

                                <PickList v-model="picklistValue" listStyle="height:250px" dataKey="code">
                                    <template #sourceheader> From </template>
                                    <template #targetheader> To </template>
                                    <template #item="slotProps">
                                        <div>{{ slotProps.item.name }}</div>
                                    </template>
                                </PickList>
                            </div>
                        </div>
                        <!-- <DataTable :value="dataResponseAPI.data">
                        
                        <Column field="description" filterField="description" header="Description" sortable> 
                                
                                <template #body="{ data }">
                                    {{ data.permissions[0].name }} 
                                </template>
                                <template #filter="{ filterModel }">
                                    <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                                </template>
                        </Column> -->

                        <!-- <Column v-for="(column, index) in columnas" :key="index" >
                            <template #body="{ data }">
                                {{ console.log(columnas, data.permissions) }}
                                {{ column.permissions[index].description }} 
                            </template>
                            
                            <template #filter="{ filterModel }">
                                <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="'Search by ' + column.name" />
                            </template>
                        </Column> -->

                        <!-- <Column field="status" header="Status" sortable>
                            <template #body="data">
                                <Tag :value="data.data.status.toLowerCase()" :severity="getOrderSeverity(data.data)" />
                            </template>
                        </Column> -->
                        <!-- <Column headerStyle="width:4rem">
                            <template #body>
                                <Button icon="pi pi-search" />
                            </template>
                        </Column> -->
                        <!-- </DataTable> -->
                    </div>
                </template>
            </DataTable>
            <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto"> 
                <div class="col-12">
                    <div class="card">
                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-6">
                        <label for="name" class="p-d-block">Name</label>
                        <InputText v-model="firstNameV" inputId="name" aria-labelledby="basic" placeholder="Type your name here" :class="{ 'p-invalid': errors['first_name'] }"/>
                        <label for="name" class="block text-l mb-2" :class="{ 'text-red-700': errors['first_name'] }">
                        {{ errors['first_name'] }}
                        </label>
                        </div>
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
            <Dialog v-model:visible="deleteDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
                <div class="flex align-items-center">
                    <div class="p-grid">
                        <!-- <pre>{{ listRowSelect[0].name }}</pre> -->
                        <div>
                            <label> {{ recordsDelete[0]['name'] }} </label>
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
import { AbilityBuilder } from '@casl/ability';
import { useToast } from 'primevue/usetoast';

let endpoint = ref('/roles'); 
const loading = ref(false);
import ProductService from '@/service/ProductService';
const router = useRouter();
const {
    getAllResponseAPI,
    getAllResponsePermissionsAPI,
    getAllResponseListAPI,
    totalRecordsResponseAPI,
    currentPageResponseAPI,
    linksResponseAPI,
    postResponseAPI,
    putResponseAPI,
    deleteResponseAPI,
    errorResponseAPI,
    dataResponseAPI,
    dataResponseListAPI,
    statusCode
} = useDataAPI();

const picklistValue = ref([[], []]);
const onChangeRoles = () => {
    console.log(picklistValue.value[1]);
};
// {

// "name":"pruebaRolV2",
// "permissions":[
//     {"id":17},
//     {"id":42},
//     {"id":43}
// ]

// }
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
      first_name: z.string().nonempty('Field is required').min(3),
    })
  ),
});
const [
  firstNameV,
  
] = defineField('first_name', validate);

const changeRoles = async () => {
    console.log(
        picklistValue.value[1].map((item) => {
            return {
                id: item.code
            };
        })
    );
    await putResponseAPI(
        {
            name: 'pruebaRolV2',
            permissions: picklistValue.value[1].map((item) => {
                return {
                    id: item.code
                };
            })
        },
        '/roles',
        35
    );
};
const dataNewRole = async () => {
    console.log(picklistValue.value[1]);
    return(
        {
            name: firstNameV.value,
            permissions: [{ id: 17 }]
        })
    
    
};
const permissionsListFromValue = async () => {
    console.log(picklistValue.value);
    await getAllResponseListAPI(`/permissions/without-roles/2`);
    const dataFrom = ref();
    dataFrom.value = dataResponseListAPI.value;
    const transformObject = (originalObj) => {
        return Object.entries(originalObj).map(([key, value]) => {
            return { name: value, code: key };
        });
    };
    const tet = transformObject(dataFrom.value);
    picklistValue.value[0] = tet;
};
const permissionsListToValue = async () => {
    console.log(picklistValue.value);
    await getAllResponseListAPI(`/permissions/roles/2`);
    const dataTo = ref();
    dataTo.value = dataResponseListAPI.value;
    const transformObject = (originalObj) => {
        return Object.entries(originalObj).map(([key, value]) => {
            return { name: value, code: key };
        });
    };
    const tet = transformObject(dataTo.value);
    picklistValue.value[1] = tet;
};

const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

const expandedRows = ref([]);
const toast = useToast();
let dataPost = ref({
    
    first_name: '',
    
});
watch(
    firstNameV,
    () => {
        dataPost.value.first_name = firstNameV.value;
    },
    { deep: true }
);
const saveRecord = async () => {
    let data = [];
    switch (mode.value) {
        case 'NEW':
            console.log(dataPost.value.first_name);
            await newRecord({name:dataPost.value.first_name,permissions: [{ id: 17 }]}, endpoint.value, statusCode.value);
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
const dropRecord = async (id, endpoint) => {
    await deleteResponseAPI({}, endpoint, deleteRecords[0].id);

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
const onRowExpand = (event) => {
    toast.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    permissionsListFromValue();
    permissionsListToValue();
};
const onRowCollapse = (event) => {
    toast.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
};
const expandAll = () => {
    expandedRows.value = products.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
};
const collapseAll = () => {
    expandedRows.value = null;
};

const columnas = ref();

onMounted(async () => {
    await loadLazyData();
    await getAllResponsePermissionsAPI('/abilities');
    columnas.value = dataResponseAPI.value.data;
    console.log(columnas.value);
    const permissionNames = [];
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
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        //xxxx: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
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
};
const resetValues = () => {};
const assignValues = (modex) => {
    if (modex === 'EDIT') {
    }
    if (modex === 'CLONE') {
    }
};
const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New xxxxxxx record';
};
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a xxxxx record';
    assignValues(mode.value);
};
const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a xxxx record';
    formDialog.value = true;
    assignValues(mode.value);
};
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a xxxxx record';
    resetValues();
    deleteDialog.value = true;

    for (let key in listRowSelect.value) {
        recordsDelete.value.push({
            name: listRowSelect.value[key].name,
            id: listRowSelect.value[key].id,
        });
    }
};
const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a xxxxx record';
    resetValues();
    formDialog.value = true;
};
</script>

<style lang="scss" scoped></style>