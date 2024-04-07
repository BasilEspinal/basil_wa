<script setup>
import { ref, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import FormRols from './FormRols.vue';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';

let endpoint = ref('/users');
const loading = ref(false);
const { dataResponseAPI, getAllResponseAPI, putResponseAPI, postResponseAPI, deleteResponseAPI, errorResponseAPI } = useDataAPI();
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const users = ref([]);
const headerDialogSave = ref('');
const headerDialogNew = ref('');
const headerDialogEdit = ref('');
const headerDialogClone = ref('');
const headerDialogExport = ref('');
const headerDialogDelete = ref('');
const DialogSave = ref(false);
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
            confirmation: z.string().min(8).refine(value => password.value === value, { message: 'Different Passwords' })
        }),
    ),
});

const { handleSubmit: submitEdit, errors: errorEdit, defineField: defineEdit } = useForm({
    validationSchema: toTypedSchema(
        z.object({
            nameEdit: z.string().min(6),
            emailEdit: z.string().email()
        }),
    ),
});

const [nameEdit, nameEditProps] = defineEdit('nameEdit');
const [emailEdit, emailEditProps] = defineEdit('emailEdit');
const [name, nameProps] = defineField('name');
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [confirmation, confirmProps] = defineField('confirmation');

onMounted(() => {
    loadingData();
});

const loadingData = async () => {
    await loadLazyData();
    permissionsListToValue();
};

const permissionsListToValue = async () => {
    users.value = dataResponseAPI.value.data;
};

const loadLazyData = async () => {
    loading.value = true;
    await getAllResponseAPI(endpoint.value);
    loading.value = false;
};

const openNew = () => {
    headerDialogNew.value = 'New User';
    DialogNew.value = true;
};

const openEdit = () => {
    headerDialogEdit.value = 'Edit User';
    const data = selectedRegisters.value[0];
    nameEdit.value = data.name;
    emailEdit.value = data.email;
    DialogEdit.value = true;
};

const openClone = () => {
    headerDialogClone.value = 'Clone a xx record';
    const data = selectedRegisters.value[0];
    name.value = data.name;
    email.value = data.email;
    password.value = '';
    confirmation.value = '';
    DialogClone.value = true;
};
const openDelete = () => {
    headerDialogDelete.value = 'Delete Users';
    DialogDelete.value = true;
};

const openExport = () => {
    headerDialogExport.value = 'Export a xxx record';
    DialogExport.value = true;
};

const newUser = handleSubmit(async values => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        "farm_id": 1,
        "roles": [{ "id": 1 }]
    };
    await postResponseAPI(data, endpoint.value);
    const restp = dataResponseAPI.value.data;
    toast.add({ severity: restp ? 'success' : 'error', summary: 'Create User ' + values.name, detail: restp ? "Creado" : "Error", life: 3000 });
    loadingData();
});

const editUser = submitEdit(async values => {
    const dataJson = ({
        name: values.nameEdit,
        email: values.emailEdit,
        "farm_id": 1,
        "employee_id": 1,
        roles: selectedRegisters.value[0].roles.map(rol => ({ id: rol.id }))
    });
    const restp = await putResponseAPI(dataJson, endpoint.value, selectedRegisters.value[0].id);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Update User ' + values.nameEdit, detail: restp.ok ? "Update" : "Error", life: 3000 });
    DialogEdit.value = false;
    loadingData();
});

const deleteUsers = () => {
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
// function exportToCSV() {
//     const data = [];

//     data.push(",ID,NOMBRE,ROLES\n");

//     DataPrueba.value.map( user => {
//         let roles = '';
//         user.roles.forEach(rol => {
//             roles += `${rol.name_rol}\n,,,`;
//         });
//         data.push(`${user.user_id},${user.user_name},${roles}\n`);
//     });

//     const blob = new Blob([data.toString()], { type: "text/csv" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "Eventos";
//     link.click();
// }

const remove = (aver) => {
    const index = selectedRegisters.value.findIndex(x => x.id === aver.id);
    if (index !== -1) {
        selectedRegisters.value.splice(index, 1);
    }
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
            <Toolbar style="margin-bottom: 1rem;">
                <template #center>
                    <Button label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew"
                        size="large" />
                    <Button :disabled="!(selectedRegisters.length == 1)" label="Edit" icon="pi pi-file-edit"
                        class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                    <Button :disabled="!(selectedRegisters.length == 1)" label="Clone" icon="pi pi-copy"
                        class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                    <Button :disabled="!selectedRegisters.length > 0" label="Delete" icon="pi pi-trash"
                        class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                </template>
            </Toolbar>
            <DataTable v-model:expandedRows="expandedRows" :loading="loading" :value="users" dataKey="id" :rows="50"
                :rowsPerPageOptions="[5, 10, 20, 50]" tableStyle="min-width: 75rem" showGridlines :paginator="true"
                v-model:selection="selectedRegisters">
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
                </template>
                <template #expansion="{ data }">
                    <FormRols :data="data" @update="loadingData" />
                </template>
            </DataTable>
        </div>
        <Dialog v-model:visible="DialogSave" modal :header="headerDialogSave" class="p-fluid text-center mx-auto">
            <span class="p-text-primary block m-5">Se actualizara la informacion de {{ selectedRegisters.length }}
                usuarios.</span>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogSave = false"></Button>
                <Button type="button" label="Save" @click="saveRoles()"></Button>
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogNew" modal :header="headerDialogNew" class="p-fluid text-center mx-auto">
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
                <Button type="button" label="Cancel" severity="secondary" @click="DialogNew = false" />
                <Button type="button" label="Save" @click="newUser()" />
            </div>
        </Dialog>
        <Dialog v-model:visible="DialogEdit" modal :header="headerDialogEdit" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3  mb-1">
                    <label for="username" class="font-semibold w-6rem">Name</label>
                    <InputText id="username" v-model="nameEdit" class="flex-auto" autocomplete="off"
                        v-bind="nameEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['nameEdit'] }">{{
                        errorEdit.nameEdit
                    }}</small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="email" class="font-semibold w-6rem">Email</label>
                    <InputText id="email" v-model="emailEdit" class="flex-auto" autocomplete="off"
                        v-bind="emailEditProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorEdit['emailEdit'] }">{{
                        errorEdit.emailEdit
                    }}</small>
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
        <Dialog v-model:visible="DialogExport" modal :header="headerDialogExport"
            class="p-fluid text-center mx-auto col-10 md:col-4">
            <h2>EXPORT</h2>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="DialogExport = false" />
                <Button type="button" label="Export" />
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
                <Button type="button" label="Delete" @click="deleteUsers" />
            </div>
        </Dialog>
    </div>
</template>
<style lang="scss" scoped></style>
