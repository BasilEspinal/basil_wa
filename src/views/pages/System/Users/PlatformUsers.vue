<script setup>
import { ref, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import PickList from './PickList.vue';
import { useToast } from 'primevue/usetoast';

let endpoint = ref('/users');
const loading = ref(false);
const { dataResponseAPI, getAllResponseAPI, putResponseAPI, dataResponsPUT } = useDataAPI();
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const users = ref([]);
const roles = ref();
const headerDialog = ref('');
const formDialog = ref(false);
const toast = useToast();

onMounted(async () => {
    await loadLazyData();
    permissionsListToValue();
});

const permissionsListToValue = async () => {
    users.value = dataResponseAPI.value.data;
    await getAllResponseAPI('/roles');
    roles.value = dataResponseAPI.value.data.map(role => ({ id: role.id, name: role.name }));
};
const loadLazyData = async () => {
    await getAllResponseAPI(endpoint.value);
    loading.value = false;
};

const openSave = () => {
    // formDialog.value = true;
    // headerDialog.value = `Se actualizara la informacion de ${selectedRegisters.value.length} usuarios `;
    selectedRegisters.value.forEach(async user => {
        const dataJson = ({
            name: user.name,
            email: user.email,
            "farm_id": user.id,
            roles: user.roles.map(rol => ({ id: rol.id }))
        });
        const restp = await putResponseAPI(dataJson, endpoint.value, user.id);
        toast.add({ severity: restp.ok? 'success': 'error', summary: 'Update User '+user.name, detail: restp.ok ? "Acualizado": "Error", life: 3000 });
    });
};
const openNew = () => {
    formDialog.value = true;
    headerDialog.value = 'New xxxxxxx record';
};
const openEdit = () => {
    formDialog.value = true;
    headerDialog.value = 'Edit a xxxxx record';
};
const openClone = () => {
    headerDialog.value = 'Clone a xxxx record';
    formDialog.value = true;
};
const openDelete = () => {
    headerDialog.value = 'Delete a xxxxx record';
};
const openExport = () => {
    headerDialog.value = 'Export a xxxxx record';
    formDialog.value = true;
};

function updateRoles(data) {
    const { id, list } = data;
    users.value.map(role => {
        if (role.id == id) {
            role.roles = list;
            return role;
        } else {
            return role;
        }
    });
}

</script>
<template>
    <div>
        <Toast />
        <div class="card">
            <div>
                <h1>Resumen de roles asociados a los usuarios</h1>
            </div>
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-4 text-center mx-auto">
                    <Toolbar class="bg-gray-900 shadow-2"
                        style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                        <template v-slot:start>
                            <div>
                                <Button :disabled="!selectedRegisters.length" label="Save" icon="pi pi-save"
                                    class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openSave" size="large" />
                                <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2"
                                    @click="openNew" size="large" />
                                <Button :disabled="!(selectedRegisters.length == 1)" label="Edit" icon="pi pi-file-edit"
                                    class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                                <Button :disabled="!(selectedRegisters.length == 1)" label="Clone" icon="pi pi-copy"
                                    class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                                <Button label="Export" icon="pi pi-file-import"
                                    class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                                <Button :disabled="!selectedRegisters.length > 0" label="Delete" icon="pi pi-trash"
                                    class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                            </div>
                        </template>
                    </Toolbar>
                </div>
            </div>
            {{ dataResponsPUT }}
            <DataTable v-model:expandedRows="expandedRows" :loading="loading" :value="users" dataKey="id" :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 75rem" showGridlines :paginator="true"
                @row-select="onRowSelect(selectedRegisters)" v-model:selection="selectedRegisters"
                @row-unselect="onRowSelect(selectedRegisters)" @rowExpand="onRowExpand" @rowCollapse="onRowCollapse">
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column expander style="width: 5rem" />
                <Column field="xxxxxx" filterField="xxxxxx" header="Name" sortable frozen="">
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel=""
                            offLabel="" />
                        <div>&nbsp;</div>
                    </template>
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            placeholder="Search by " />
                    </template>
                </Column>
                <Column field="" filterField="" header=" Email" sortable>
                    <template #body="{ data }">
                        {{ data.email }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter"
                            placeholder="Search by " />
                    </template>
                </Column>
                <template #expansion="{ data }">
                    <div class="p-3">
                        <h5>Orders for {{ data.name }}</h5>
                        <div class="col-12 ">
                            <div class="card">
                                <h5>Name: {{ data.name }}</h5>
                                <h5>Perteneciente a finca: {{ data.farm.name }}</h5>
                                <div class="card flex justify-content-center">
                                    <PickList :dataListA="roles" :dataListB="data.roles" :id="data.id"
                                        @SelectDataListB="updateRoles" />
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataTable>
            <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" :header="headerDialog" :modal="true"
                class="p-fluid text-center mx-auto">
                <pre>{{ selectedRegisters }}</pre>
            </Dialog>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
