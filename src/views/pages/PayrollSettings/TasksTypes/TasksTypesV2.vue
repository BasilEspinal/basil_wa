<template>
    <div>
    <div class="card">
        <div>
            <h1>Información Tipos de Tareasx</h1> 
        </div>
    </div>
    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <!--Uncomment when table is done-->
                <pre>arreglar CRUD</pre>
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button v-if = "ability.can('tipo_tarea_crear')" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <Button v-if = "ability.can('tipo_tarea_editar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                            <Button v-if = "ability.can('tipo_tarea_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button v-if = "ability.can('tipo_tarea_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                        </div>
                    </template>
                </Toolbar>
            </div>

            </div>
        </div>
        <!-- <pre>{{ dataResponseAPI }}</pre> -->
        <DataTable
        id="tblData"
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
        filterDisplay="menu"
        v-model:filters="filters"
        :globalFilterFields="['code', 'name', 'company.name', 'farm.name', 'created_at', 'updated_at', 'status.name']"
        v-if = "ability.can('tipo_tarea_listado')"
         
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
        <Column field="code" filterField="code" header="code" sortable frozen="">
                    <template #header>
                        <ToggleButton v-model="codeFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <template #body="{ data }">
                        {{ data.code }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="name" filterField="name" header="name" sortable>
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
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
        <Dialog v-model:visible="formDialog" :style="{ width: '500px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="name" class="font-semibold w-6rem">Name :</label>
                    <InputText id="name" v-model="nameV" class="flex-auto" autocomplete="off"  />
                </div>
                <small id="name-help" :class="{ 'p-invalid text-red-700': errors['name'] }">
                    {{ errors['name'] }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="code" class="font-semibold w-6rem">Code :</label>
                    <InputText id="code" v-model="codeV" class="flex-auto" autocomplete="off"  />
                </div>
                <small id="code-help" :class="{ 'p-invalid text-red-700': errors['name'] }">
                    {{ errors['code'] }}
                </small>
                
            </div>   

            

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" icon="pi pi-times" severity="secondary" @click="hideDialog" />
                <Button type="button" label="Save" icon="pi pi-check" @click="saveRecord" />
            </div>
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
            <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected ones? </label>
            <div class="card flex flex-wrap mt-2 gap-2">
                <div v-for="item in listRowSelect" :key="item.id">
                    <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                </div>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="saveRecord" />
                <Button type="button" label="Delete" @click="DeleteVarieties" />
            </div>
            
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
import { useToast } from 'primevue/usetoast';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder} from '@casl/ability';

let endpoint = ref('/tasks_of_type'); //replace endpoint with your endpoint
const loading = ref(false);
const codeFrozen = ref(false);

const { getAllResponseAPI,getAllResponsePermissionsAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponsePermissionsAPI,dataResponseListAPI, statusCode } =
    useDataAPI();
const toast = useToast();

let dataPost = ref({
    code: '',
    name: '',
    farm_uuid: '',
    company_uuid: ''
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

      
      code: z.string().nonempty('Field is required').min(3),
      name: z.string().nonempty('Field is required').min(3),
      farm_uuid: z.string(),
        company_uuid: z.string(),
    })
  ),
});

const [
    codeV,
    codeAttrs
] = defineField('code', validate);

const [
  nameV,
  nameAttrs
] = defineField('name', validate);
const [
  farmV,
  farmAttrs
] = defineField('farm_uuid', validate);
const [
  companyV,
  companyAttrs
] = defineField('company_uuid', validate);

watch(
  () => ({
    // documentTypeV: documentTypeV.value,
    codeV: codeV.value,
    nameV: nameV.value,
    // farmIdV: farmIdV.value,
  }),
  (newValues) => {
    // dataPost.value.document_type = newValues.documentTypeV;
    dataPost.value.code = newValues.codeV;
    dataPost.value.name = newValues.nameV;

  },
  { deep: true }
);
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
        code: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] }
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
const resetValues = () => {
    dataPost.value.code = '';
    dataPost.value.name = '';
    dataPost.value.farm_uuid = '';
    dataPost.value.company_uuid = '';
}
const assignValues = (modex) => {
    if ((modex ==='EDIT')) {
        dataPost.value.code=listRowSelect.value[0].code;
        codeV.value=listRowSelect.value[0].code;
        dataPost.value.name=listRowSelect.value[0].name;
        nameV.value=listRowSelect.value[0].name;
        

    }
    if ((modex=== 'CLONE' )) {
        resetValues();
        dataPost.value.code=listRowSelect.value[0].code;
        codeV.value=listRowSelect.value[0].code;
        dataPost.value.name=listRowSelect.value[0].name;
        nameV.value=listRowSelect.value[0].name;
        
    }
}
const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New type of task record';
}
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a type of task record';
    assignValues(mode.value)

}
const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a type of task record';
    formDialog.value = true;
    assignValues(mode.value)
}
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a type of task record';
    resetValues();
    deleteDialog.value = true;
}
const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a type of task record';
    resetValues();
    formDialog.value = true;
}

const newRecord = async (requestDataUnitTypes, endpoint) => {
    await postResponseAPI(requestDataUnitTypes, endpoint);
    console.log(requestDataUnitTypes);
    recordsDelete.value = [];

    switch (statusCode.value) {
        case 201:
            loadLazyData();
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
            formDialog.value = false;
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
const updateRecord = async (requestDataUnitTypes, id, endpoint) => {
    await putResponseAPI(requestDataUnitTypes, endpoint, id);
    recordsDelete.value = [];

    switch (statusCode.value) {
        case 202:
            loadLazyData();
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });

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
const dropRecord = async (id, endpoint) => {
    await deleteResponseAPI({}, endpoint, id);

    switch (statusCode.value) {
        case 204:
            loadLazyData();
            toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
            
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
const remove = (aver) => {
    const index = listRowSelect.value.findIndex(x => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<style lang="scss" scoped>
</style>