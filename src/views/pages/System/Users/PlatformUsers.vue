<script setup>
import { ref, onMounted, computed } from 'vue';
import FormRols from './FormRols.vue';
import { useToast } from 'primevue/usetoast';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { FilterMatchMode } from 'primevue/api';
import ability from '@/service/ability.js';
import { InitialDataService } from '@/service/InitialData.js';
import { z } from 'zod';


import { CrudService } from '@/service/CRUD/CrudService';
import FloatingSelectionBar from '@/components/layout/FloatingSelectionBar.vue';
import ActionButton from '@/components/ActionButton.vue';
import { useActions } from '@/composables/ActionButton.js';
const { getItems, itemsActions, messageDialog, titleDialog, status_id_Action, flagDialog } = useActions(`/processflow/User`);


let endpoint = ref('/users');

const crudService = CrudService(endpoint.value);
const loading = ref(false);
const selectedRegisters = ref([]);
const expandedRows = ref([]);
const users = ref([]);
const rowUUID = ref(null);

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
    readInitialData();
    loadingData();
    initFilters();
});

const size = ref();
const sizeOptions = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

/**
 * Initializes the default filters for the DataTable.
 */
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
};

const clearFilter = () => {
    initFilters();
};

const globalFilter = computed(() => {
    return ['name', 'email'];
});

const readInitialData = async () => {
    InitialDataService.getSize().then((data) => {
        size.value = data;
    });
    InitialDataService.getSizeOptions().then((data) => {
        sizeOptions.value = data;
    });
};

/**
 * Fetches user records from the API using CrudService.
 */
const loadingData = async () => {
    loading.value = true;
    const response = await crudService.getAll();

    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    users.value = response.data.data;
    loading.value = false;
};

/**
 * Opens the dialog for creating a new user.
 */
const openNew = () => {
    resetForm();
    headerDialogNew.value = 'New User';
    DialogNew.value = true;
};

/**
 * Opens the dialog for editing an existing user.
 * @param {Object} rowData - The user record to edit.
 */
const openEdit = (rowData) => {
    resetForm();
    headerDialogEdit.value = 'Edit User';
    const data = rowData || selectedRegisters.value[0];
    if (data) {
        selectedRegisters.value = [data];
    }
    if (!data) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    }
    rowUUID.value = data.id;
    nameEdit.value = data.name;
    emailEdit.value = data.email;
    DialogEdit.value = true;
};

const openClone = (rowData) => {
    resetForm();
    headerDialogClone.value = 'Clone a user';
    const data = rowData || selectedRegisters.value[0];
    if (!data) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    }
    rowUUID.value = data.id;
    name.value = data.name;
    DialogClone.value = true;
};
const openDelete = (rowData) => {
    if (rowData) {
        selectedRegisters.value = [rowData];
    }
    headerDialogDelete.value = 'Delete Users';
    DialogDelete.value = true;
};

const deleteSingleRecord = (rowData) => {
    selectedRegisters.value = [rowData];
    openDelete();
};

const openExport = () => {
    headerDialogExport.value = 'Export users';
    DialogExport.value = true;
};

/**
 * Submits the form to create a new user.
 */
const newUser = handleSubmit(async (values) => {
    DialogNew.value = false;
    const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        farm_uuid: values.farm ? values.farm.uuid : farmDefault,
        roles: [{ id: 1 }]
    };
    const restp = await crudService.create(data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
});

/**
 * Submits the form to edit an existing user.
 */
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
    const restp = await crudService.update(rowUUID.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    DialogEdit.value = false;
    loadingData();
    selectedRegisters.value = [];
});

/**
 * Deletes selected users after confirmation.
 */
const deleteUsers = async () => {
    DialogDelete.value = false;
    try {
        const deletePromises = [];
        selectedRegisters.value.forEach(async (item) => {
            const deletePromise = crudService.delete(item.id);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted User', detail: 'Deleted', life: 3000 });
    } catch (error) {
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

/**
 * Handles batch patching of status for selected users.
 */
const patchAction = async () => {
    try {
        const patchPromises = [];
        selectedRegisters.value.forEach(async (item) => {
            const data = {
                status_id: status_id_Action.value
            };
            const patchPromise = crudService.patch(item.uuid, data);
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
        // Error handling
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
                        <i class="pi pi-users text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">Usuarios</h1>
                        <p class="m-0 text-600 font-medium mt-1">Gestión integral de roles y accesos</p>
                    </div>
                </div>
                <div class="flex gap-2">
                </div>
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
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onRowSelect(selectedRegisters)"
                v-model:filters="filters"
                :class="`p-datatable-${size?.class || 'default-size'}`"
                :globalFilterFields="globalFilter"
            >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                        <div class="flex gap-2 align-items-center">
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar Filtros" class="p-button-outlined p-button-sm" @click="clearFilter()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar..." class="w-full md:w-20rem" />
                            </span>
                        </div>

                        <div class="hidden xl:block">
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        </div>

                        <div class="flex gap-2">
                            <Button icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openNew" v-tooltip.top="'Nuevo Usuario'" />
                            <Button icon="pi pi-file-export" class="p-button-outlined p-button-secondary p-button-rounded" @click="openExport" v-tooltip.top="'Exportar'" />
                        </div>
                    </div>
                </template>
                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column expander style="width: 5rem" />
                <Column field="name" header="Nombre" sortable />
                <Column field="email" header="Email" sortable />

                <Column header="Acciones" :frozen="true" alignFrozen="right" style="min-width: 10rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button v-if="ability.can('usuario_editar')" icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-warning" @click="openEdit(data)" v-tooltip.top="'Editar'" />
                            <Button v-if="ability.can('usuario_crear')" icon="pi pi-copy" class="p-button-rounded p-button-text p-button-secondary" @click="openClone(data)" v-tooltip.top="'Clonar'" />
                            <Button v-if="ability.can('usuario_eliminar')" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteSingleRecord(data)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
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
