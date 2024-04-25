<script setup>
import { ref, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import ability from '@/service/ability.js';
import { z } from 'zod';
import FormPermissions from './FormPermissions.vue';

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest } = useData();

let endpoint = ref('/roles');
const loading = ref(false);
const { dataResponseAPI, getAllResponseAPI, getAllResponseListAPI, dataResponseListAPI, postResponseAPI, deleteResponseAPI, errorResponseAPI } = useDataAPI();
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const roles = ref([]);
const permisos = ref([]);
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
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
});

const CloneRol = handleSubmit(async (values) => {
    DialogClone.value = false;
    const data = {
        name: values.name,
        permissions: selectedRegisters.value[0].permissions.map((perm) => ({ id: perm.id }))
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
});

const loadLazyData = async () => {
    loading.value = true;
    const response = await getRequest(endpoint.value);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    roles.value = response.data.data ?? [];
    loading.value = false;
    
    const permiss = await getRequest(`/permissions/without-roles/2`);
    const newArray = permiss.data ?? [];
    const listaDeObjetos = [];
    for (const clave in newArray) {
        listaDeObjetos.push({ id: clave, name: newArray[clave] });
    }
    permisos.value = listaDeObjetos;
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

const openClone = () => {
    resetForm();
    headerDialogClone.value = 'Clone Rol';
    name.value = selectedRegisters.value[0].name;
    listPermiss.value = selectedRegisters.value[0].permissions.map((perm) => ({ name: perm.name }));
    DialogClone.value = true;
};

const openDelete = () => {
    headerDialogDelete.value = 'Delete Users';
    DialogDelete.value = true;
};

const deleteRoles = async () => {
    DialogDelete.value = false;
    try {
        const deletePromises = [];
        selectedRegisters.value.forEach(async item => {
            const deletePromise = await deleteRequest(endpoint.value, item.id);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        toast.add({ severity: 'success', summary: 'Deleted User', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        setTimeout(() => {
            loadingData();
        }, 100);
        selectedRegisters.value = [];
    }
};
</script>
<template>
    <div>
        <Toast />
        <div class="card">
            <div>
                <h1>Información de roles</h1>
            </div>
        </div>
        <div class="card">
            <Toolbar style="margin-bottom: 1rem">
                <template #center>
                    <Button v-if="ability.can('rol_crear')" label="New" icon="pi pi-plus" class="p-button-success" @click="openNew" size="large" />
                    <Divider layout="vertical" />
                    <Button v-if="ability.can('rol_editar')" :disabled="selectedRegisters.length != 1" label="Clone" icon="pi pi-copy" class="p-button-secondary" @click="openClone" size="large" />
                    <Divider layout="vertical" />
                    <Button v-if="ability.can('rol_eliminar')" :disabled="!selectedRegisters.length" label="Delete" icon="pi pi-trash" class="p-button-danger" @click="openDelete" size="large" />
                </template>
            </Toolbar>
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
            >
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <template>
                    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                    <Column expander style="width: 5rem" />
                    <Column field="xxxxxx" filterField="xxxxxx" header="Name" sortable frozen="">
                        <template #body="{ data }">
                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                        </template>
                    </Column>
                </template>
                <template #expansion="{ data }">
                    <FormPermissions :permiss="permisos" :data="data" @update="loadingData" />
                </template>
            </DataTable>
        </div>
        <Dialog v-model:visible="DialogNew" modal :header="headerDialogNew" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 m-2">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['name'] }">{{ errors.name }}</small>
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
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['name'] }">
                    {{ errors.name }}
                </small>
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
    </div>
</template>

<style lang="scss" scoped></style>
