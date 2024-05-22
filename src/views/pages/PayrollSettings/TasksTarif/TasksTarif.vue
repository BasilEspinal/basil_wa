<script setup>
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
const namePage = 'Tarif of Tasks ';
const titlePage = namePage + 'information';
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const PackingTipeList = ref([]);
const packingTipesL = ref([]);
const TaskTipeList = ref([]);
const taskTipesL = ref([]);

const formDialogNew = ref(false);
const formDialogNewTitle = 'Create new' + namePage;
const formDialogEditTitle = 'Edit' + namePage;
const formDialogCloneTitle = 'Clone' + namePage;
const formDialogExportTitle = 'Export' + namePage;
const formDialogDeleteTitle = 'Delete' + namePage;
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/tarif_of_tasks');
const typeDateList = ref([]);

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
};

watch(listRowSelect, onRowSelect);

const onSelectAllChange = () => {
    onRowSelect();
};
const filters = ref();

const clearFilter = () => {
    initFilters();
};

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        work_type_day: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        type_price: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        price_tarif: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'packing_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'company.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/task_of_types');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    TaskTipeList.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const respPacking = await getRequest('/packing_types');
    if (!respPacking.ok) toast.add({ severity: 'error', detail: 'Error' + respPacking.error, life: 3000 });
    PackingTipeList.value = respPacking.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const resptypeDate = await getRequest('/lists/workTypesDay');
    console.log('DATE ', resptypeDate);
    if (!resptypeDate.ok) toast.add({ severity: 'error', detail: 'Error' + resptypeDate.error, life: 3000 });
    typeDateList.value = resptypeDate.data.map((comp) => ({ id: comp.id, name: comp.label }));
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
        console.log(newValue);
        console.log(oldValue);
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
            type_date: z
                .object({
                    name: z.string().min(6)
                })
                .optional(),
            type_price: z.string().max(4).optional(),
            price_tarif: z.number(),
            farm: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            packingType: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            tacksType: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});
const [type_date, type_dateProps] = defineField('type_date');
const [type_price, type_priceProps] = defineField('type_price');
const [price_tarif, price_tarifProps] = defineField('price_tarif');
const [farm] = defineField('farm');
const [packingType] = defineField('packingType');
const [tacksType] = defineField('tacksType');

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

const searchTaskType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            taskTipesL.value = [...TaskTipeList.value];
        } else {
            taskTipesL.value = TaskTipeList.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingTipesL.value = [...PackingTipeList.value];
        } else {
            packingTipesL.value = PackingTipeList.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const openNew = () => {
    resetForm();
    formDialogNew.value = true;
};

const openEdit = () => {
    resetForm();
    const { work_type_day, type_price: typePrice, price_tarif: priceTarif, taskType, packing_type, farm: Farm } = listRowSelect.value[0];

    type_date.value = { id: work_type_day, name: work_type_day };
    type_price.value = typePrice;
    price_tarif.value = Number(priceTarif);
    tacksType.value = { id: taskType.uuid, name: taskType.name };
    packingType.value = { id: packing_type.uuid, name: packing_type.name };
    farm.value = { id: Farm.uuid, name: Farm.name };

    formDialogEdit.value = true;
    console.log(type_date.value, ',', type_price.value, ',', price_tarif.value, ',', tacksType.value, ',', packingType.value);
};

const openClone = () => {
    resetForm();
    const { work_type_day, type_price: typePrice, price_tarif: priceTarif, taskType, packing_type, farm: Farm } = listRowSelect.value[0];

    type_date.value = { id: work_type_day, name: work_type_day };
    type_price.value = typePrice;
    price_tarif.value = Number(priceTarif);
    tacksType.value = { id: taskType.uuid, name: taskType.name };
    packingType.value = { id: packing_type.uuid, name: packing_type.name };
    farm.value = { id: Farm.uuid, name: Farm.name };
    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const createRecord = handleSubmitNew(async (values) => {
    const data = {
        work_type_day: values.type_date.name,
        type_price: values.type_price ?? 'Task',
        price_tarif: values.price_tarif,
        tasks_of_type_uuid: values.tacksType ? values.tacksType.id : 'b545a934-7eb4-4bcc-adfb-cd70767419dd',
        packing_type_uuid: values.packingType ? values.packingType.id : 'b8379d76-526a-4b39-aacc-136918c5413f',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        work_type_day: values.type_date.name,
        type_price: values.type_price ?? 'Task',
        price_tarif: values.price_tarif,
        tasks_of_type_uuid: values.tacksType ? values.tacksType.id : 'b545a934-7eb4-4bcc-adfb-cd70767419dd',
        packing_type_uuid: values.packingType ? values.packingType.id : 'b8379d76-526a-4b39-aacc-136918c5413f',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    console.log('DATA: ', data);

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        work_type_day: values.type_date.name,
        type_price: values.type_price ?? 'Task',
        price_tarif: values.price_tarif,
        tasks_of_type_uuid: values.tacksType ? values.tacksType.id : 'b545a934-7eb4-4bcc-adfb-cd70767419dd',
        packing_type_uuid: values.packingType ? values.packingType.id : 'b8379d76-526a-4b39-aacc-136918c5413f',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogClone.value = false;
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
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) listRowSelect.value.splice(index, 1);
};
</script>

<template>
    <div>
        <div class="card">
            <h1>{{ titlePage }}</h1>
        </div>
        <div class="card">
            <Toolbar>
                <template #center>
                    <Button v-if="ability.can('tarifa_tarea_crear')" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                    <Divider v-if="ability.can('tarifa_tarea_crear')" layout="vertical" />
                    <Button v-if="ability.can('tarifa_tarea_editar')" :disabled="!(selectedRegisters.length > 0 && selectedRegisters.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                    <Divider v-if="ability.can('tarifa_tarea_editar')" layout="vertical" />
                    <Button v-if="ability.can('tarifa_tarea_crear')" :disabled="!(selectedRegisters.length > 0 && selectedRegisters.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                    <Divider v-if="ability.can('tarifa_tarea_crear')" layout="vertical" />
                    <Button v-if="ability.can('tarifa_tarea_crear')" :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                    <Divider v-if="ability.can('tarifa_tarea_crear')" layout="vertical" />
                    <Button v-if="ability.can('tarifa_tarea_crear')" :disabled="!selectedRegisters.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                </template>
            </Toolbar>
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
                :class="`p-datatable-${size.class} mt-3`"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onSelectAllChange"
                v-model:selection="selectedRegisters"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="['work_type_day', 'type_price', 'price_tarif', 'company.name', 'farm.name', 'status.name', 'created_at', 'updated_at']"
                v-if="ability.can('tarifa_tarea_listado')"
            >
                <template #header>
                    <!--Uncomment when filters are done-->

                    <Toolbar class="mb-2">
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

                <Column field="work_type_day" filterField="work_type_day" header="Work Type Day" sortable>
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>
                    <template #body="{ data }">
                        {{ data.work_type_day }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="type_price" filterField="type_price" header="Type Price" sortable>
                    <template #body="{ data }">
                        {{ data.type_price }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by " />
                    </template>
                </Column>

                <Column field="price_tarif" filterField="price_tarif" header="Price Tarif" sortable>
                    <template #body="{ data }"> $ {{ data.price_tarif }} </template>
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
            </DataTable>

            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid mx-auto">
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="type_date" class="font-bold block mb-2"> Type Date </label>
                        <Dropdown v-model="type_date" :options="typeDateList" optionLabel="name" class="w-full md:w-15rem" inputId="type_date" v-bind="type_dateProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['type_date'] }">
                                {{ errorsNew.type_date }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="type_price" class="font-bold block mb-2"> Type Price </label>
                        <InputText id="username" v-model="type_price" class="flex-auto md:w-15rem" autocomplete="off" v-bind="type_priceProps" inputId="type_price" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['type_price'] }">
                                {{ errorsNew.type_price }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="price_tarif" class="font-bold block mb-2"> Price Tarif </label>
                        <InputNumber v-model="price_tarif" class="w-full md:w-15rem" inputId="price_tarif" mode="currency" currency="USD" locale="en-US" v-bind="price_tarifProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['price_tarif'] }">
                                {{ errorsNew.price_tarif }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="packingType" class="font-bold block mb-2"> Packing Types </label>
                        <AutoComplete v-model="packingType" class="w-full md:w-15rem" inputId="packingType" :suggestions="packingTipesL" @complete="searchPackingType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packingType'] }">
                                {{ errorsNew.packingType }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="tacksType" class="font-bold block mb-2"> Tacks Type </label>
                        <AutoComplete v-model="tacksType" class="w-full md:w-15rem" inputId="tacksType" :suggestions="taskTipesL" @complete="searchTaskType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tacksType'] }">
                                {{ errorsNew.tacksType }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="type_date" class="font-bold block mb-2"> Type Date </label>
                        <Dropdown v-model="type_date" :options="typeDateList" optionLabel="name" class="w-full md:w-15rem" inputId="type_date" v-bind="type_dateProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['type_date'] }">
                                {{ errorsNew.type_date }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="type_price" class="font-bold block mb-2"> Type Price </label>
                        <InputText id="username" v-model="type_price" class="flex-auto md:w-15rem" autocomplete="off" v-bind="type_priceProps" inputId="type_price" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['type_price'] }">
                                {{ errorsNew.type_price }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="price_tarif" class="font-bold block mb-2"> Price Tarif </label>
                        <InputNumber v-model="price_tarif" class="w-full md:w-15rem" inputId="price_tarif" mode="currency" currency="USD" locale="en-US" v-bind="price_tarifProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['price_tarif'] }">
                                {{ errorsNew.price_tarif }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="packingType" class="font-bold block mb-2"> Packing Types </label>
                        <AutoComplete v-model="packingType" class="w-full md:w-15rem" inputId="packingType" :suggestions="packingTipesL" @complete="searchPackingType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packingType'] }">
                                {{ errorsNew.packingType }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="tacksType" class="font-bold block mb-2"> Tacks Type </label>
                        <AutoComplete v-model="tacksType" class="w-full md:w-15rem" inputId="tacksType" :suggestions="taskTipesL" @complete="searchTaskType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tacksType'] }">
                                {{ errorsNew.tacksType }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="type_date" class="font-bold block mb-2"> Type Date </label>
                        <Dropdown v-model="type_date" :options="typeDateList" optionLabel="name" class="w-full md:w-15rem" inputId="type_date" v-bind="type_dateProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['type_date'] }">
                                {{ errorsNew.type_date }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="type_price" class="font-bold block mb-2"> Type Price </label>
                        <InputText id="username" v-model="type_price" class="flex-auto md:w-15rem" autocomplete="off" v-bind="type_priceProps" inputId="type_price" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['type_price'] }">
                                {{ errorsNew.type_price }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="price_tarif" class="font-bold block mb-2"> Price Tarif </label>
                        <InputNumber v-model="price_tarif" class="w-full md:w-15rem" inputId="price_tarif" mode="currency" currency="USD" locale="en-US" v-bind="price_tarifProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['price_tarif'] }">
                                {{ errorsNew.price_tarif }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="packingType" class="font-bold block mb-2"> Packing Types </label>
                        <AutoComplete v-model="packingType" class="w-full md:w-15rem" inputId="packingType" :suggestions="packingTipesL" @complete="searchPackingType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packingType'] }">
                                {{ errorsNew.packingType }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="tacksType" class="font-bold block mb-2"> Tacks Type </label>
                        <AutoComplete v-model="tacksType" class="w-full md:w-15rem" inputId="tacksType" :suggestions="taskTipesL" @complete="searchTaskType" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['tacksType'] }">
                                {{ errorsNew.tacksType }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogClone = false" />
                    <Button type="button" label="Save" @click="CloneRecord()" />
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
                        <Chip :label="item.work_type_day" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" :disabled="!listRowSelect.length > 0" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>
            <Toast />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
