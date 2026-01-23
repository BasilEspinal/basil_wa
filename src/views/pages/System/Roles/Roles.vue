<script setup>
import { ref, onMounted } from 'vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import ability from '@/service/ability.js';
import { z } from 'zod';
import FormPermissions from './FormPermissions.vue';

//import useData from '@/service/FetchData/FetchDataAPI.js';
//const { getRequest, postRequest, deleteRequest } = useData();

import { CrudService } from '@/service/CRUD/CrudService';
import FloatingSelectionBar from '@/components/layout/FloatingSelectionBar.vue';
import ActionButton from '@/components/ActionButton.vue';
import { useActions } from '@/composables/ActionButton.js';
const { getItems, itemsActions, messageDialog, titleDialog, status_id_Action, flagDialog } = useActions(`/processflow/Role`);

let endpoint = ref('/roles');

const crudService = CrudService(endpoint.value);

const loading = ref(false);
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const roles = ref([]);
const rowUUID = ref(null);
const headerDialogNew = ref('');
const headerDialogClone = ref('');
const headerDialogDelete = ref('');
const DialogNew = ref(false);
const DialogClone = ref(false);
const DialogDelete = ref(false);
const toast = useToast();
const listPermiss = ref([]);

onMounted(() => {
    loadingData();
});

const { handleSubmit, errors, defineField, resetForm } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(6)
        })
    )
});

const [name, nameProps] = defineField('name');

const newRol = handleSubmit(async (values) => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        permissions: [{ id: 1 }]
    };
    //const restp = await postRequest(endpoint.value, data);
    const restp = await crudService.create(data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
});

const CloneRol = handleSubmit(async (values) => {
    DialogClone.value = false;
    const data = {
        name: values.name,
        permissions: roles.value.find(r => r.id === rowUUID.value).permissions.map((perm) => ({ id: perm.id }))
    };
    //const restp = await postRequest(endpoint.value, data);
    const restp = await crudService.create(data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
});

const loadLazyData = async () => {
    loading.value = true;
    //const response = await getRequest(endpoint.value);
    const response = await crudService.getAll();

    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    roles.value = response.data.data ?? [];
    loading.value = false;
};

const remove = (aver) => {
    const index = selectedRegisters.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        selectedRegisters.value.splice(index, 1);
    }
};

const loadingData = async () => {
    await loadLazyData();
};

const openNew = () => {
    resetForm();
    headerDialogNew.value = 'new Rol';
    DialogNew.value = true;
};

const openClone = (rowData) => {
    resetForm();
    headerDialogClone.value = 'Clone Rol';
    const data = rowData || selectedRegisters.value[0];
    if (!data) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    }
    rowUUID.value = data.id;
    name.value = data.name;
    listPermiss.value = data.permissions.map((perm) => ({ name: perm.name }));
    DialogClone.value = true;
};

const openDelete = (rowData) => {
    if (rowData) {
        selectedRegisters.value = [rowData];
    }
    headerDialogDelete.value = 'Delete Roles';
    DialogDelete.value = true;
};

const deleteSingleRecord = (rowData) => {
    selectedRegisters.value = [rowData];
    openDelete();
};

const deleteRoles = async () => {
    DialogDelete.value = false;
    try {
        const deletePromises = [];
        selectedRegisters.value.forEach(async (item) => {
            //const deletePromise = await deleteRequest(endpoint.value, item.id);
            const deletePromise = await await crudService.delete(item.id);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted User', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        selectedRegisters.value = [];
    }
};

const onRowSelect = (data) => {
    if (data && !Array.isArray(data)) {
        selectedRegisters.value = [data];
    } else if (data) {
        selectedRegisters.value = data;
    }
    openDialogSettlement('patch_action');
};

const openDialogSettlement = async (mode) => {
    if (selectedRegisters.value.length != 0 && selectedRegisters.value[0].status) {
        await getItems(selectedRegisters.value[0].status.id);
    }
};

const patchAction = async () => {
    try {
        const patchPromises = [];
        selectedRegisters.value.forEach(async (item) => {
            const data = {
                status_id: status_id_Action.value
            };
            const patchPromise = await crudService.patch(item.id, data);
            patchPromises.push(patchPromise);
        });

        const responses = await Promise.all(patchPromises);
        const hasError = responses.some((response) => !response.ok);

        if (!hasError) {
            toast.add({ severity: 'success', summary: 'Success', detail: 'Records updated successfully', life: 3000 });
            flagDialog.value = false;
            loadingData();
            selectedRegisters.value = [];
        } else {
            const errorMsg = responses.find((r) => !r.ok)?.error || 'Unknown error';
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error updated records: ' + errorMsg, life: 3000 });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
</script>
<template>
    <div>
        <Toast />
        <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
            <div class="flex align-items-center justify-content-between p-3">
                <div class="flex align-items-center gap-3">
                    <div class="bg-primary-50 p-3 border-round-circle">
                        <i class="pi pi-lock text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">Roles</h1>
                        <p class="m-0 text-600 font-medium mt-1">Definición de perfiles y permisos del sistema</p>
                    </div>
                </div>
                <div class="flex gap-2">
                </div>
            </div>
        </div>

        <div class="card">
            <!-- <Toolbar style="margin-bottom: 1rem">
                <template #center>
                    <Button v-if="ability.can('rol_crear')" label="New" icon="pi pi-plus" class="p-button-success" @click="openNew" size="large" />
                    <Divider layout="vertical" />
                    <Button v-if="ability.can('rol_editar')" :disabled="selectedRegisters.length != 1" label="Clone" icon="pi pi-copy" class="p-button-secondary" @click="openClone" size="large" />
                    <Divider layout="vertical" />
                    <Button v-if="ability.can('rol_eliminar')" :disabled="!selectedRegisters.length" label="Delete" icon="pi pi-trash" class="p-button-danger" @click="openDelete" size="large" />
                </template>
            </Toolbar> -->
            <DataTable
                v-model:expandedRows="expandedRows"
                :loading="loading"
                :value="roles"
                dataKey="id"
                :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 75rem"
                showGridlines
                :paginator="true"
                v-model:selection="selectedRegisters"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onRowSelect(selectedRegisters)"
            >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                        <div class="flex gap-2 align-items-center">
                            <h1 class="m-0 text-xl font-semibold">Listado de Roles</h1>
                        </div>
                        <div class="flex gap-2">
                            <Button icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openNew" v-tooltip.top="'Nuevo Rol'" />
                            <Button icon="pi pi-file-export" class="p-button-outlined p-button-secondary p-button-rounded" @click="openExport" v-tooltip.top="'Exportar'" />
                        </div>
                    </div>
                </template>
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column expander style="width: 5rem" />
                <Column field="name" header="Nombre del Rol" sortable />

                <Column header="Acciones" :frozen="true" alignFrozen="right" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button v-if="ability.can('rol_editar')" icon="pi pi-copy" class="p-button-rounded p-button-text p-button-secondary" @click="openClone(data)" v-tooltip.top="'Clonar'" />
                            <Button v-if="ability.can('rol_eliminar')" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteSingleRecord(data)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
                <template #expansion="{ data }">
                    <FormPermissions :data="data" @update="loadingData" />
                </template>
            </DataTable>
        </div>
        <Dialog v-model:visible="DialogNew" modal :header="headerDialogNew" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 m-2">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <FrontEndErrors :errorsNew="errorsNew" name="name" />
                <BackendErrors :name="errorResponseAPI?.errors?.name" />
            </div>
            <Divider />
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogNew = false" />
                <Button type="button" label="Save" @click="newRol()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogClone" modal :header="headerDialogClone" class="p-fluid text-center mx-auto" :style="{ width: '25rem' }">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 m-2">
                    <label for="username" class="font-bold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <FrontEndErrors :errorsNew="errorsNew" name="name" />
                <BackendErrors :name="errorResponseAPI?.errors?.name" />
            </div>
            <div class="mb-3">
                <label for="username" class="font-bold w-6rem mb-2">Permissions</label>
                <div class="justify-content-center">
                    <div v-for="tab in listPermiss" :key="tab.title" optionLabel="name">
                        <Chip class="m-1" :label="tab.name" />
                    </div>
                </div>
            </div>
            <Divider />
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogClone = false" />
                <Button type="button" label="Save" @click="CloneRol()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogDelete" modal :header="headerDialogDelete" class="p-fluid text-center mx-auto col-10 md:col-4">
            <div class="card flex flex-wrap gap-2">
                <div v-for="item in selectedRegisters" :key="item.id">
                    <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                </div>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogDelete = false" />
                <Button type="button" label="Delete" @click="deleteRoles" />
            </div>
        </Dialog>
        <FloatingSelectionBar :selection="selectedRegisters" :showExport="true" @clear="selectedRegisters = []" @delete="openDelete" @export="openExport">
            <template #actions>
                <ActionButton :items="itemsActions" :listRowSelect="selectedRegisters" />
            </template>
        </FloatingSelectionBar>
        <Dialog v-model:visible="flagDialog" :style="{ width: '450px' }" :header="titleDialog" :modal="true">
            <label for="username" class="text-2xl font-medium w-6rem"> {{ messageDialog }} </label>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="flagDialog = false" />
                <Button type="button" label="Save" @click="patchAction" />
            </div>
        </Dialog>
    </div>
</template>

<style lang="scss" scoped></style>
