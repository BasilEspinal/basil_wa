<script setup>
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/service/FetchData/FetchDataAPI.js';
import UnderConstruction from '@/components/UnderConstruction.vue';
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
import ActionButton from '@/components/ActionButton.vue';
import FloatingSelectionBar from '@/components/layout/FloatingSelectionBar.vue';
const namePage = ' Descuentos de nómina ';
const titlePage = namePage + 'information';
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const formDialog = ref(false);
const formDialogTitle = ref('');
const formDialogExportTitle = 'Exportar Descuentos';
const formDialogDeleteTitle = 'Eliminar Descuentos';
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/endpoint'); //replace endpoint with your endpoint

////////////
//Form here
////////////
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

onBeforeMount(() => {
    readAll();
    initFilters();
});
const listRowSelect = ref([]);
const loading = ref(false);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};

watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    // onRowSelect();
};

const openForm = (mode, rowData) => {
    // Logic for viewing details if needed
};
const filters = ref();

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
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(true);
const readAll = async () => {
    loadingData();
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/companies');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
};
const loadingData = async () => {
    const response = await getRequest(endpoint.value);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {}
);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll(endpoint.value);
        
        
    }
);
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(4),
            codeV: z.string().min(4),
            farm: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            company: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});
const [name, nameProps] = defineField('name');
const [codeV, codeVProps] = defineField('codeV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);

const createRecord = handleSubmitNew(async (values) => {
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialog.value = false;
});

const searchCompannies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const state = ref('');

const openDialog = (mode, rowData) => {
    state.value = mode;
    formDialogTitle.value = mode === 'new' ? 'Crear Nuevo Descuento' : mode === 'edit' ? 'Editar Descuento' : mode === 'clone' ? 'Clonar Descuento' : '';

    if (mode === 'new') {
        resetForm();
    } else {
        const source = rowData || listRowSelect.value[0];
        if (!source) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Seleccione un registro', life: 3000 });
            return;
        }
        resetForm();
        const { code, company: empresa, farm: farmParameter, name: nombre } = source;

        name.value = nombre;
        codeV.value = code;
        company.value = { id: empresa.uuid, name: empresa.name };
        farm.value = { id: farmParameter.uuid, name: farmParameter.name };
    }

    formDialog.value = true;
};

const openNew = () => openDialog('new');
const openEdit = (data) => openDialog('edit', data);
const openClone = (data) => openDialog('clone', data);

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : values.farm
    };

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialog.value = false;
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    formDialog.value = false;
});

const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
};

function formatCSV(eventos) {
    const dataExport = [];
    dataExport.push(',' + Object.keys(eventos[0]) + '\n');
    dataExport.push(eventos.map((row) => Object.values(row) + '\n'));

    const blob = new Blob([dataExport.toString()], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value;
    link.click();
}

function formatXLS(eventos) {
    const data = eventos.map((row) => Object.values(row));
    const headers = Object.keys(eventos[0]);
    const prueba = [headers, ...data];
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(prueba, { headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    const binaryData = XLSX.write(workbook, { type: 'array' });

    const file = new File([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, filename.value + '.xlsx');
}

const deleteSingleRecord = (rowData) => {
    listRowSelect.value = [rowData];
    openDelete();
};

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach(async (item) => {
            const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted', life: 3000 });
    } catch (error) {
        
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<!-- 
filterDisplay="menu"
v-model:filters="filters"
:globalFilterFields="['', 'company.name']"


const documentFrozen = ref(true); change name field 
<DataTable id="tblData"
     -->
<template>
    <div>
        <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
            <div class="flex align-items-center justify-content-between p-3">
                <div class="flex align-items-center gap-3">
                    <div class="bg-primary-50 p-3 border-round-circle">
                        <i class="pi pi-percentage text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">Descuentos de Nómina</h1>
                        <p class="m-0 text-600 font-medium mt-1">Gestión y registro de descuentos aplicables</p>
                    </div>
                </div>
            </div>
            <UnderConstruction />
        </div>
        <div class="card">
            <DataTable
                :value="dataFromComponent"
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
                :class="`p-datatable-${size?.class || 'default-size'}`"
                v-model:selection="listRowSelect"
                filterDisplay="menu"
                v-model:filters="filters"
            >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                        <div class="flex gap-2 align-items-center">
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar Filtros" class="p-button-outlined p-button-sm" @click="clearFilter()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar descuento..." class="w-full md:w-20rem" />
                            </span>
                        </div>

                        <div class="hidden xl:block">
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        </div>

                        <div class="flex gap-2">
                            <Button v-if="ability.can('descuento_nomina_crear')" icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openDialog('new')" v-tooltip.top="'Nuevo Descuento'" />
                            <Button icon="pi pi-file-export" class="p-button-outlined p-button-secondary p-button-rounded" @click="openExport" :disabled="!dataFromComponent || dataFromComponent.length === 0" v-tooltip.top="'Exportar'" />
                        </div>
                    </div>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column field="code" filterField="code" :header="documentFrozen ? '' : 'Code'" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" @click.stop />
                        <span class="ml-2">Code</span>
                    </template>

                    <template #body="{ data }">
                        {{ data.code }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="name" filterField="name" header="Name" sortable>
                    <template #body="{ data }">
                        {{ data.name }}
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
                </Column>

                <Column header="Acciones" :frozen="true" alignFrozen="right" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button v-if="ability.can('descuento_nomina_editar')" icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-warning" @click="openDialog('edit', data)" v-tooltip.top="'Editar'" />
                            <Button v-if="ability.can('descuento_nomina_crear')" icon="pi pi-copy" class="p-button-rounded p-button-text p-button-secondary" @click="openDialog('clone', data)" v-tooltip.top="'Clonar'" />
                            <Button v-if="ability.can('descuento_nomina_eliminar')" icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteSingleRecord(data)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Name :</label>
                        <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.name }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Code :</label>
                        <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['codeV'] }">
                        {{ errorsNew.codeV }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Companny:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialog = false" />
                    <Button type="button" label="Save" @click="state === 'new' ? createRecord() : state === 'edit' ? EditRecord() : CloneRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle" :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="username" v-model="filename" class="flex-auto" autocomplete="off" v-bind="nameProps" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="username" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name" :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> Are you sure you want to delete the selected ones? </label>
                <div class="card flex flex-wrap mt-2 gap-2">
                    <div v-for="item in listRowSelect" :key="item.id">
                        <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />

            <FloatingSelectionBar 
                v-if="ability.can('descuento_nomina_eliminar') || ability.can('descuento_nomina_listado')"
                :selection="selectedRegisters" 
                @clear="selectedRegisters = []" 
                @delete="openDelete"
            >
                <template #actions>
                    <div class="flex gap-2">
                        <Button icon="pi pi-file-import" class="p-button-outlined p-button-warning" label="Exportar" @click="openExport" />
                    </div>
                </template>
            </FloatingSelectionBar>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
