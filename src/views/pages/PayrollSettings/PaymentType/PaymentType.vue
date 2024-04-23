<template>
    <div>
    <div class="card">
        <div>
            <h1>Información de tipo de pagos</h1> 
        </div>
    </div>
    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <!--Uncomment when table is done-->
                <pre>falta CRUD</pre>
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button v-if = "ability.can('tipo_pago_crear')" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <Button v-if = "ability.can('empleado_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                            <Button v-if = "ability.can('tipo_pago_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                            <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button v-if = "ability.can('tipo_pago_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
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
        @row-select="onRowSelect(selectedRegisters)"
        @row-unselect="onRowSelect(selectedRegisters)"
        @select-all-change="onSelectAllChange"
        v-model:selection="selectedRegisters"
        filterDisplay="menu"
        v-model:filters="filters"
        :globalFilterFields="['code', 'name', 'company.name']"
        v-if = "ability.can('tipo_pago_listado')"
         
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
        <Column field="code" filterField="code" header="code " sortable :frozen="documentFrozen"> <!--Replace :frozen with the model-->
            <template #header>
                    <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
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
        <Dialog v-model:visible="DialogEdit" modal :header="headerDialogEdit" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3  mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="nameEdit" class="flex-auto" autocomplete="off"
                        v-bind="nameEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['nameEdit'] }">
                    {{ errorEdit.nameEdit }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="emailEdit" class="flex-auto" autocomplete="off"
                        v-bind="emailEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['emailEdit'] }">
                    {{ errorEdit.emailEdit }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="passwordEdit" class="font-semibold w-6rem">Password </label>
                    <Password id="id" v-model="passwordEdit" :feedback="false" :toggleMask="true"
                        v-bind="passwordEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['passwordEdit'] }">
                    {{ errorEdit.passwordEdit }}
                </small>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogEdit = false" />
                <Button type="button" label="Save" @click="editUser()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogClone" modal :header="headerDialogClone" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3  mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['name'] }">{{ errors.name
                    }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="email" class="flex-auto" autocomplete="off" v-bind="emailProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['email'] }">{{ errors.email
                    }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Password</label>
                    <Password id="password1" v-model="password" placeholder="Password" :feedback="false"
                        :toggleMask="true" v-bind="passwordProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['password'] }">
                    {{ errors.password }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Confirm</label>
                    <Password id="password1" v-model="confirmation" placeholder="Password" :feedback="false"
                        :toggleMask="true" v-bind="confirmProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['confirmation'] }">
                    {{ errors.confirmation }}
                </small>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogClone = false" />
                <Button type="button" label="Save" @click="() => { newUser(); DialogClone = false }" />
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
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder} from '@casl/ability';

let endpoint = ref('/payment_types'); //replace endpoint with your endpoint
const loading = ref(false);
const headerDialogNew = ref('');
const headerDialogEdit = ref('');
const headerDialogClone = ref('');
const headerDialogExport = ref('');
const headerDialogDelete = ref('');
const DialogNew = ref(false);
const DialogEdit = ref(false);
const DialogClone = ref(false);
const DialogExport = ref(false);
const DialogDelete = ref(false);

const { getAllResponseAPI,getAllResponsePermissionsAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponsePermissionsAPI,dataResponseListAPI, statusCode } =
    useDataAPI();
const documentFrozen = ref(false); 
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
    headerDialogNew.value = 'New payment type record';
    DialogEdit.value = true;
    resetValues();
    
    
}
const newUser = handleSubmit(async values => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        "farm_uuid": '8ef93a7b-31bf-4233-af80-481020e9cf97',
        "roles": [{ "id": 1 }]
    };
    console.log('data: ' , data);
    await postResponseAPI(data, endpoint.value);
    const restp = dataResponseAPI.value.data;
    console.log('data: ' , restp);
    toast.add({ severity: restp ? 'success' : 'error', summary: 'Create User ' + values.name, detail: restp ? "Creado" : "Error", life: 3000 });
    loadingData();
});
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