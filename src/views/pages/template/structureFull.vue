<template>
    <div>
    <div class="card">
        <div>
            <h1>Información de lotes para Cultivo</h1> 
        </div>
    </div>
    <div class="card">
        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <!--Here you have to paste toolbar-->
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
         
        >
        <template #header>

        </template>

        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>
        <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
        <Column field="" filterField="" header=" " sortable frozen=""> <!--Replace :frozen with the model-->
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
        <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
        </Dialog>
        <Dialog v-model:visible="deleteDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true" class="p-fluid text-center mx-auto">
        </Dialog> 
    </div>
</div>
    
</template>

<script setup>
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
const { getAllResponseAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, statusCode } = useDataAPI();
let endpoint = ref('/endpoint'); //replace endpoint with your endpoint
const loading = ref(false);

const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);


onMounted(async () => {
    await loadLazyData();
});

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