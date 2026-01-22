<script setup>
import { ref, watch, provide, onBeforeMount, onMounted, computed } from 'vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
import { useRouter } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
const dataFromComponent = ref();
const summary = ref();
const sales = ref([
    { product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
    { product: 'Black Watch', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
    { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
    { product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
    { product: 'Brown Purse', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
    { product: 'Chakra Bracelet', lastYearSale: 52, thisYearSale: 65, lastYearProfit: 421132, thisYearProfit: 150005 },
    { product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 12, lastYearProfit: 131211, thisYearProfit: 100214 },
    { product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 66442, thisYearProfit: 53322 },
    { product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232 },
    { product: 'Gold Phone Case', lastYearSale: 75, thisYearSale: 54, lastYearProfit: 21212, thisYearProfit: 12533 }
]);

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const totalTaskQtyTask = ref(0);
const totalTaskTotal = ref(0);
const totalTaskQtyHoraExtra = ref(0);
const totalHoraExtraTotal = ref(0);
const totalTaskQtyLabor = ref(0);
const totalLaborTotal = ref(0);
const totalTaskQtyJournal = ref(0);
const totalJournalTotal = ref(0);

const lastYearTotal = computed(() => {
    let total = 0;
    for (let sale of sales.value) {
        total += sale.lastYearProfit;
    }

    return formatCurrency(total);
});

const thisYearTotal = computed(() => {
    let total = 0;
    for (let sale of sales.value) {
        total += sale.thisYearProfit;
    }

    return formatCurrency(total);
});
const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
const namePage = ' Summary by employees information ';
const titlePage = ' ' + namePage + ' information';

const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');

const formDialogNew = ref(false);
const formDialogNewTitle = 'Create new xxxxxxxxxx';
const formDialogEditTitle = 'Edit xxxxxxxxxx';
const formDialogCloneTitle = 'Clone xxxxxxxxxx';
const formDialogExportTitle = 'Export xxxxxxxxxx';
const formDialogDeleteTitle = 'Delete xxxxxxxxxx';
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);
let endpoint = ref('/transactions/transEmployee'); //replace endpoint with your endpoint

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
    onRowSelect();
};
const filters = ref();

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },

        'worker_employee.document': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'worker_employee.first_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'worker_employee.last_name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'planner_tasks.transaction_date': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'tasks_of_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        type_day_tarif: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        type_price_task: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        price_tarif_task: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        task_qty: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        task_total: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
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

const totals = ref();
const loadingData = async () => {
    const response = await getRequest(endpoint.value);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;

    const response2 = await getRequest('/transactions/transemployeegroupperiod');
    if (!response2.ok) toast.add({ severity: 'error', detail: 'Error' + response2.error, life: 3000 });
    summary.value = response2.data.data;
    // Ahora, asigna las funciones computadas a cada ref, convirtiendo strings a números
    totalTaskQtyTask.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_task) || 0;
        }
        return total;
    });

    totalTaskTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_task) || 0;
        }
        return total;
    });

    totalTaskQtyHoraExtra.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_hora_extra) || 0;
        }
        return total;
    });

    totalHoraExtraTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_hora_extra) || 0;
        }
        return total;
    });

    totalTaskQtyLabor.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_labor) || 0;
        }
        return total;
    });

    totalLaborTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_labor) || 0;
        }
        return total;
    });

    totalTaskQtyJournal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_journal) || 0;
        }
        return total;
    });

    totalJournalTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_journal) || 0;
        }
        console.log(total);
        return total;
    });
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

const openNew = () => {
    resetForm();
    formDialogNew.value = true;
};

const openEdit = () => {
    resetForm();
    const { code, company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
    codeV.value = code;
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const { company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: farmParameter.uuid, name: farmParameter.name };
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
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const CloneRecord = handleSubmitNew(async (values) => {
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    formDialogClone.value = false;
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
        <div class="card">
            <div>
                <h1>{{ titlePage }}</h1>
            </div>
        </div>
        <div class="card">
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 1rem">
                            <template #center>
                                <Button :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider layout="vertical" />
                                <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>
            <!-- <pre>{{ dataResponseAPI }}</pre> -->
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
                :class="`p-datatable-${size.class}`"
                @row-select="onRowSelect(selectedRegisters)"
                @row-unselect="onRowSelect(selectedRegisters)"
                @select-all-change="onSelectAllChange"
                v-model:selection="selectedRegisters"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="[
                    'name',
                    'company.name',
                    'farm.name',
                    'status.name',
                    'created_at',
                    'updated_at',
                    'worker_employee.document',
                    'worker_employee.first_name',
                    'worker_employee.last_name',
                    'planner_tasks.transaction_date',
                    'tasks_of_type.name',
                    'type_day_tarif',
                    'type_price_task',
                    'price_tarif_task',
                    'name',
                    'task_qty',
                    'task_total'
                ]"
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

                <Column field="worker_employee.document" filterField="worker_employee.document" header="Document" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" @click.stop />
                        <span class="ml-2">{{ col.header }}</span>
                    </template>
                    <template #body="{ data }">
                        {{ data.worker_employee.document }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Document" />
                    </template>
                </Column>

                <Column field="worker_employee.first_name" filterField="worker_employee.first_name" header="First Name" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" @click.stop />
                        <span class="ml-2">{{ col.header }}</span>
                    </template>
                    <template #body="{ data }">
                        {{ data.worker_employee.first_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by First Name" />
                    </template>
                </Column>

                <Column field="worker_employee.last_name" filterField="worker_employee.last_name" header="Last Name" sortable :frozen="documentFrozen">
                    <!--Replace :frozen with the model-->
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" @click.stop />
                        <span class="ml-2">{{ col.header }}</span>
                    </template>
                    <template #body="{ data }">
                        {{ data.worker_employee.last_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Last Name" />
                    </template>
                </Column>
                <Column field="planner_tasks.transaction_date" filterField="planner_tasks.transaction_date" header="Transaction Date" sortable>
                    <template #body="{ data }">
                        {{ data.planner_tasks.transaction_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Transaction Date" />
                    </template>
                </Column>

                <Column field="tasks_of_type.name" filterField="tasks_of_type.name" header="Task Type Name" sortable>
                    <template #body="{ data }">
                        {{ data.tasks_of_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Task Type Name" />
                    </template>
                </Column>
                <Column field="type_day_tarif" filterField="type_day_tarif" header="Type Day Tarif" sortable>
                    <template #body="{ data }">
                        {{ data.type_day_tarif }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Type Day Tarif" />
                    </template>
                </Column>

                <Column field="type_price_task" filterField="type_price_task" header="Type Price Task" sortable>
                    <template #body="{ data }">
                        {{ data.type_price_task }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Type Price Task" />
                    </template>
                </Column>

                <Column field="price_tarif_task" filterField="price_tarif_task" header="Price Tarif Task" sortable>
                    <template #body="{ data }">
                        {{ data.price_tarif_task }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Price Tarif Task" />
                    </template>
                </Column>

                <Column field="name" filterField="name" header="Name" sortable>
                    <template #body="{ data }">
                        {{ data.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Name" />
                    </template>
                </Column>

                <Column field="task_qty" filterField="task_qty" header="Task Quantity" sortable>
                    <template #body="{ data }">
                        {{ data.task_qty }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Task Quantity" />
                    </template>
                </Column>

                <Column field="task_total" filterField="task_total" header="Task Total" sortable>
                    <template #body="{ data }">
                        {{ data.task_total }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Task Total" />
                    </template>
                </Column>

                <!-- planner_tasks.transaction_date
        tasks_of_type.name
        worker_employee.document
        worker_employee.first_name
        worker_employee.last_name
        type_day_tarif
        type_price_task
        price_tarif_task
        name
        task_qty
        task_total -->

                <!--Here add other columns-->

                <!-- <Column field="farmName" filterField="farm.name" header="Farm Name" sortable>
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
            </Column> -->
            </DataTable>

            <DataTable :value="summary" tableStyle="min-width: 50rem">
                <ColumnGroup type="header">
                    <Row>
                        <Column header="Employees" :rowspan="3" />
                        <Column header="Type price task" :rowspan="3" />
                        <Column header="Type Day Tarif" :rowspan="3" />

                        <Column header="Cortar" :colspan="4" />
                    </Row>
                    <Row>
                        <Column header="Task" :colspan="2" />
                        <Column header="Labor" :colspan="2" />
                        <Column header="Journal" :colspan="2" />
                        <Column header="Hora Extra" :colspan="2" />
                    </Row>
                    <Row>
                        <Column header="Quantity" sortable field="task_qty_task" />
                        <Column header="Total" sortable field="total_task" />

                        <Column header="Quantity" sortable field="task_qty_labor" />
                        <Column header="Total" sortable field="total_labor" />

                        <Column header="Quantity" sortable field="task_qty_journal" />
                        <Column header="Total" sortable field="total_journal" />

                        <Column header="Quantity" sortable field="task_qty_hora_extra" />
                        <Column header="Total" sortable field="total_hora_extra" />
                    </Row>
                </ColumnGroup>
                <Column field="worker_employee.first_name" />
                <Column field="type_price_task" />
                <Column field="type_day_tarif" />

                <Column field="task_qty_task">
                    <template #body="slotProps">
                        {{ slotProps.data.task_qty_task }}
                    </template>
                </Column>
                <Column field="total_task">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.total_task) }}
                    </template>
                </Column>

                <Column field="task_qty_labor">
                    <template #body="slotProps">
                        {{ slotProps.data.task_qty_labor }}
                    </template>
                </Column>

                <Column field="total_labor">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.total_labor) }}
                    </template>
                </Column>

                <Column field="task_qty_journal">
                    <template #body="slotProps">
                        {{ slotProps.data.task_qty_journal }}
                    </template>
                </Column>

                <Column field="total_journal">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.total_journal) }}
                    </template>
                </Column>

                <Column field="task_qty_hora_extra">
                    <template #body="slotProps">
                        {{ slotProps.data.task_qty_hora_extra }}
                    </template>
                </Column>

                <Column field="total_hora_extra">
                    <template #body="slotProps">
                        {{ formatCurrency(slotProps.data.total_hora_extra) }}
                    </template>
                </Column>
                <!-- 


        <Column field="thisYearProfit">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.thisYearProfit)}}
            </template>
        </Column> -->

                <!-- <Column field="journal_quantity">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.lastYearProfit)}}
            </template>
        </Column>
        <Column field="journal_total">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.thisYearProfit)}}
            </template>
        </Column>

        <Column field="hora_extra_quantity">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.lastYearProfit)}}
            </template>
        </Column>
        <Column field="hora_extra_total">
            <template #body="slotProps">
                {{formatCurrency(slotProps.data.thisYearProfit)}}
            </template>
        </Column> -->
                <ColumnGroup type="footer">
                    <Row>
                        <Column footer="Totals:" :colspan="3" footerStyle="text-align:right" />
                        <Column :footer="totalTaskQtyTask" />
                        <Column :footer="totalTaskTotal" />
                        <Column :footer="totalTaskQtyLabor" />
                        <Column :footer="totalLaborTotal" />
                        <Column :footer="totalTaskQtyJournal" />
                        <Column :footer="totalJournalTotal" />
                        <Column :footer="totalTaskQtyHoraExtra" />
                        <Column :footer="totalHoraExtraTotal" />

                        <!-- <Column :footer="totalJournalTotal" /> -->
                        <!-- <Column :footer="thisYearTotal" />
                <Column :footer="lastYearTotal" />
                <Column :footer="thisYearTotal" />
                <Column :footer="thisYearTotal" />
                <Column :footer="thisYearTotal" /> -->
                    </Row>
                </ColumnGroup>
            </DataTable>

            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid text-center mx-auto">
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
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                    <Button type="button" label="Save" @click="createRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid text-center mx-auto">
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
                <!-- <div class="mb-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-3">Farm :</label>
                    <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name"
                        dropdown />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                    {{ errorsNew.farm }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-3">Companny:</label>
                    <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="EditRecord"
                        field="name" dropdown />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                    {{ errorsNew.company }}
                </small>
            </div> -->

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                    <Button type="button" label="Save" @click="EditRecord()" />
                </div>
            </Dialog>

            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid text-center mx-auto">
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
                        <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
