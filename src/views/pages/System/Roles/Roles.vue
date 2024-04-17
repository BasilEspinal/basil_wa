<script setup>
import { ref, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import FormPermissions from './FormPermissions.vue';

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


const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(6),
        }),
    ),
});

const [name, nameProps] = defineField('name');

const newRol = handleSubmit(async values => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        "permissions": [{ "id": 1 }]
    };
    await postResponseAPI(data, endpoint.value);
    const restp = dataResponseAPI.value.data;
    toast.add({ severity: restp ? 'success' : 'error', summary: 'Create User ' + values.name, detail: restp ? "Creado" : "Error", life: 3000 });
    loadingData();
});

const CloneRol = handleSubmit(async values => {
    DialogClone.value = false;
    const data = {
        name: values.name,
        "permissions": selectedRegisters.value[0].permissions.map(perm => ({ id: perm.id }))
    };
    await postResponseAPI(data, endpoint.value);
    const restp = dataResponseAPI.value.data;
    toast.add({ severity: restp ? 'success' : 'error', summary: 'Create User ' + values.name, detail: restp ? "Creado" : "Error", life: 3000 });
    loadingData();
});


const loadLazyData = async () => {
    loading.value = true;
    await getAllResponseAPI(endpoint.value);
    roles.value = dataResponseAPI.value.data;
    loading.value = false;
    await getAllResponseListAPI(`/permissions`);
    permisos.value = dataResponseListAPI.value.data.map(permso => ({ id: permso.uuid, name: permso.name }));
};

const remove = (aver) => {
    const index = selectedRegisters.value.findIndex(x => x.id === aver.id);
    if (index !== -1) {
        selectedRegisters.value.splice(index, 1);
    }
};

const loadingData = async () => {
    await loadLazyData();
}

const openNew = () => {
    headerDialogNew.value = 'new Rol';
    DialogNew.value = true;
};

const openClone = () => {
    headerDialogClone.value = 'Clone Rol';
    name.value = selectedRegisters.value[0].name;
    listPermiss.value = selectedRegisters.value[0].permissions.map(perm => ({ name: perm.name }));
    DialogClone.value = true;
};

const openDelete = () => {
    headerDialogDelete.value = 'Delete Users';
    DialogDelete.value = true;
};

const deleteRoles = () => {
    DialogDelete.value = false;
    selectedRegisters.value.forEach(async (item) => {
        const data = ({});
        await deleteResponseAPI(data, endpoint.value, item.id);
        const resp = errorResponseAPI.value;
        toast.add({ severity: resp ? 'success' : 'error', summary: 'Deleted User', detail: resp ? "Deleted" : "Error", life: 3000 });
    });
    selectedRegisters.value = [];
    loadingData();
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
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar class="bg-gray-900 shadow-2" style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                            <template v-slot:start>
                                <div>
                                    <Button v-if = "ability.can('rol_crear')" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                                    <Button v-if = "ability.can('rol_editar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                                    <Button v-if = "ability.can('rol_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                                    <!-- <Button label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" /> -->
                                    <Button v-if = "ability.can('rol_eliminar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                                </div>
                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>
            <Divider />
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogClone = false" />
                <Button type="button" label="Save" @click="CloneRol()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogDelete" modal :header="headerDialogDelete"
            class="p-fluid text-center mx-auto col-10 md:col-4">
            <div class="card flex flex-wrap gap-2">
                <div v-for="item in selectedRegisters" :key="item.id">
                    <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-user" />
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
