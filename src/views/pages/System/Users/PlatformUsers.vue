<script setup>
import { ref, onMounted } from 'vue';
import FormRols from './FormRols.vue';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import ability from '@/service/ability.js';
import { z } from 'zod';

//import useData from '@/service/FetchData/FetchDataAPI.js';
//const { getRequest, postRequest, putRequest, deleteRequest } = useData();

import { CrudService } from '@/service/CRUD/CrudService';

const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
let endpoint = ref('/users');

const crudService = CrudService(endpoint.value);
const loading = ref(false);
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const users = ref([]);

const farmDefault = sessionStorage.getItem('accessSessionFarm');

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
const toast = useToast();

const { handleSubmit, errors, defineField } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(6),
            email: z.string().email(),
            password: z.string().min(8),
            confirmation: z
                .string()
                .min(8)
                .refine((value) => password.value === value, { message: 'Different Passwords' })
        })
    )
});

const {
    handleSubmit: submitEdit,
    errors: errorEdit,
    defineField: defineEdit,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            nameEdit: z.string().min(6),
            emailEdit: z.string().email(),
            passwordEdit: z
                .string()
                .refine((value) => !value.length || value.length >= 8, { message: 'String must contain at least 8 character(s)' })
                .optional()
        })
    )
});

const [nameEdit, nameEditProps] = defineEdit('nameEdit');
const [emailEdit, emailEditProps] = defineEdit('emailEdit');
const [passwordEdit, passwordEditProps] = defineEdit('passwordEdit');
const [name, nameProps] = defineField('name');
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [confirmation, confirmProps] = defineField('confirmation');

onMounted(() => {
    loadingData();
});

const loadingData = async () => {
    loading.value = true;
    //const response = await getRequest(endpoint.value);
    const response = await crudService.getAll();

    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    users.value = response.data.data;
    loading.value = false;
};

const openNew = () => {
    resetForm();
    headerDialogNew.value = 'New User';
    DialogNew.value = true;
};

const openEdit = () => {
    resetForm();
    headerDialogEdit.value = 'Edit User';
    const data = selectedRegisters.value[0];
    nameEdit.value = data.name;
    emailEdit.value = data.email;
    DialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    headerDialogClone.value = 'Clone a user';
    const data = selectedRegisters.value[0];
    name.value = data.name;
    DialogClone.value = true;
};
const openDelete = () => {
    headerDialogDelete.value = 'Delete Users';
    DialogDelete.value = true;
};

const openExport = () => {
    headerDialogExport.value = 'Export users';
    DialogExport.value = true;
};

const newUser = handleSubmit(async (values) => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        farm_uuid: values.farm ? values.farm.uuid : farmDefault,
        roles: [{ id: 1 }]
    };
    //const restp = await postRequest(endpoint.value, data);
    const restp = await crudService.create(data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
});

const editUser = submitEdit(async (values) => {
    const { farm, roles, id } = selectedRegisters.value[0];
    const data = {
        name: values.nameEdit,
        email: values.emailEdit,
        farm_uuid: values.farm ? values.farm.uuid : farmDefault,
        roles: roles.map((rol) => ({ id: rol.id }))
    };
    if (values.passwordEdit) {
        data.password = values.passwordEdit;
    }
    //const restp = await putRequest(endpoint.value, data, id);
    const restp = await crudService.update(id, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    DialogEdit.value = false;
    loadingData();
    selectedRegisters.value = [];
});

const deleteUsers = async () => {
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

const remove = (aver) => {
    const index = selectedRegisters.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        selectedRegisters.value.splice(index, 1);
    }
};

const expandAll = () => {
    expandedRows.value = users.value.reduce((acc, p) => (acc[p.id] = true) && acc, {});
};

const collapseAll = () => {
    expandedRows.value = null;
};
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
            <DataTable
                v-model:expandedRows="expandedRows"
                :loading="loading"
                :value="users"
                dataKey="id"
                :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]"
                tableStyle="min-width: 75rem"
                showGridlines
                :paginator="true"
                v-model:selection="selectedRegisters"
            >
                <template #header>
                    <Toolbar>
                        <template v-slot:start>
                            <div class="grid justify-content-center">
                                <div class="col-12 lg:col-2 text-center">
                                    <Button v-if="ability.can('usuario_crear')" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" size="large" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button v-if="ability.can('usuario_editar')" :disabled="selectedRegisters.length != 1" icon="pi pi-file-edit" class="p-button-help mr-2" @click="openEdit" size="large" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button v-if="ability.can('usuario_crear')" :disabled="selectedRegisters.length != 1" icon="pi pi-copy" class="p-button-secondary mr-2" @click="openClone" size="large" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button v-if="ability.can('usuario_eliminar')" :disabled="!selectedRegisters.length" icon="pi pi-trash" class="p-button-danger mr-2" @click="openDelete" size="large" />
                                </div>
                            </div>
                        </template>
                    </Toolbar>
                </template>
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
                    <Column field="" filterField="" header=" Email" sortable>
                        <template #body="{ data }">
                            {{ data.email }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                        </template>
                    </Column>
                </template>
                <template #expansion="{ data }">
                    <FormRols :data="data" @update="loadingData" />
                </template>
            </DataTable>
        </div>
        <Dialog v-model:visible="DialogNew" modal :header="headerDialogNew" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['name'] }">{{ errors.name }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="email" class="flex-auto" autocomplete="off" v-bind="emailProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['email'] }">{{ errors.email }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Password</label>
                    <Password id="password1" v-model="password" placeholder="Password" :feedback="false" :toggleMask="true" v-bind="passwordProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['password'] }">
                    {{ errors.password }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Confirm</label>
                    <Password id="password1" v-model="confirmation" placeholder="Password" :feedback="false" :toggleMask="true" v-bind="confirmProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['confirmation'] }">
                    {{ errors.confirmation }}
                </small>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogNew = false" />
                <Button type="button" label="Save" @click="newUser()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogEdit" modal :header="headerDialogEdit" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="nameEdit" class="flex-auto" autocomplete="off" v-bind="nameEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['nameEdit'] }">
                    {{ errorEdit.nameEdit }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="emailEdit" class="flex-auto" autocomplete="off" v-bind="emailEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['emailEdit'] }">
                    {{ errorEdit.emailEdit }}
                </small>
            </div>
            <div class="mb-3" v-if="ability.can('editar_contrasena')">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="passwordEdit" class="font-semibold w-6rem">Password </label>
                    <Password id="id" v-model="passwordEdit" :feedback="false" :toggleMask="true" v-bind="passwordEditProps" />
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
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['name'] }">{{ errors.name }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="email" class="flex-auto" autocomplete="off" v-bind="emailProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['email'] }">{{ errors.email }}</small>
            </div>
            <div class="mb-3" v-if="ability.can('editar_contrasena')">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Password</label>
                    <Password id="password1" v-model="password" placeholder="Password" :feedback="false" :toggleMask="true" v-bind="passwordProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['password'] }">
                    {{ errors.password }}
                </small>
            </div>
            <div class="mb-3" v-if="ability.can('editar_contrasena')">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="password" class="font-semibold w-6rem">Confirm</label>
                    <Password id="password1" v-model="confirmation" placeholder="Password" :feedback="false" :toggleMask="true" v-bind="confirmProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errors['confirmation'] }">
                    {{ errors.confirmation }}
                </small>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogClone = false" />
                <Button
                    type="button"
                    label="Save"
                    @click="
                        () => {
                            newUser();
                            DialogClone = false;
                        }
                    "
                />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogExport" modal :header="headerDialogExport" class="p-fluid text-center mx-auto col-10 md:col-4">
            <h2>EXPORT</h2>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogExport = false" />
                <Button type="button" label="Export" />
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
                <Button type="button" label="Delete" @click="deleteUsers" />
            </div>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped></style>
