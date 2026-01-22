<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import ability from '@/service/ability.js';
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { toTypedSchema } from '@vee-validate/zod';
import { computed } from 'vue';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import Summary from '@/components/Summary.vue';

const { t } = useI18n();

const dynamicColumns = [
    { field: 'transaction_date', header: 'Transaction Date', frozen: true, color: false },
    { field: 'code_pays_period', header: 'Pays Period Code', frozen: true, color: false },
    { field: 'tasks_of_type.name', header: 'Task Name', frozen: false, color: false },
    { field: 'tasks_statuses.name', header: 'Task Status', frozen: false, color: true },
    { field: 'worker_employee.document', header: 'Employee Document', frozen: false, color: false },
    { field: 'worker_employee.full_name', header: 'Employee Name', frozen: false, color: false },
    { field: 'type_price_task', header: 'Task Price Type', frozen: false, color: false },
    { field: 'type_day_tarif', header: 'Day Tarif Type', frozen: false, color: false },
    { field: 'task_qty', header: 'Task Quantity', frozen: false, color: false },
    { field: 'task_total_pays', header: 'Task Total Pays', frozen: false, color: false },
    { field: 'packing_type.name', header: 'Packing Type', frozen: false, color: false },
    { field: 'notes_small', header: 'Notes', frozen: false, color: false }
];

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
};
const formProperties = ref({ open: false, title: '', mode: '', data: null });
const openForm = (mode) => {
    console.log(mode);

    formProperties.value = {
        open: true,
        title: mode === 'Ver Detalles',
        mode: mode,
        data: mode === 'detalles' ? null : listRowSelect.value[0]
    };
};

const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
const uuidDiscrepancy = ref('');
let endpoint = ref(`/transactions/journal/journals`); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export xxxxxxxxxx';
const formDialogDeleteTitle = 'Delete xxxxxxxxxx';
const formDialogExport = ref(false);
const formDialogDelete = ref(false);
const toast = useToast();
const filename = ref('table');

let size = ref();
let sizeOptions = ref();

onMounted(() => {});

onBeforeMount(() => {
    readAll();
    initFilters();
});
const listRowSelect = ref([]);
const loading = ref(false);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
watch(listRowSelect, RowSelect);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
    const row = listRowSelect.value[0];
    if (row) {
        cardSections.value = [
            {
                title: 'General Information',
                fields: {
                    UUID: row.uuid,
                    'Transaction Date': row.transaction_date,
                    'Week of Year': row.week_Of_Year
                },
                icon: 'pi pi-calendar',
                bgColor: 'var(--primary-50)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Task Information',
                fields: {
                    'Task Code': row.tasks_of_type?.code,
                    'Task Name': row.tasks_of_type?.name,
                    'Task Quantity': row.task_qty,
                    'Price per Task': row.price_tarif_task
                },
                icon: 'pi pi-tasks',
                bgColor: 'var(--primary-200)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Employee Information',
                fields: {
                    'Worker Name': row.worker_employee?.full_name,
                    Document: row.worker_employee?.document,
                    Email: row.worker_employee?.email
                },
                icon: 'pi pi-user',
                bgColor: 'var(--primary-50)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Packing Information',
                fields: {
                    'Packing Type': row.packing_type?.name,
                    'Dispatch Code': row.packing_type?.code_dispatch,
                    'Weight Tare': `${row.packing_type?.weight_tare}kg`
                },
                icon: 'pi pi-box',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-500'
            },
            {
                title: 'Task Status Information',
                fields: {
                    Status: row.tasks_statuses?.name,
                    Description: row.tasks_statuses?.description
                },
                icon: 'pi pi-info-circle',
                bgColor: 'var(--surface-100)',
                iconColor: 'var(--text-color-secondary)'
            },
            {
                title: 'Planner Task Information',
                fields: {
                    'Transaction Date': row.planner_tasks?.transaction_date,
                    'Crop Lot Codes': row.planner_tasks?.crop_lots.map((lot) => lot.code).join(', ')
                },
                icon: 'pi pi-map-marker',
                bgColor: 'bg-orange-100',
                iconColor: 'text-orange-500'
            },
            {
                title: 'Company Information',
                fields: {
                    'Company Name': row.company?.name,
                    'Company Code': row.company?.code,
                    Website: row.company?.url_path
                },
                icon: 'pi pi-building',
                bgColor: 'var(--primary-100)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Status',
                fields: {
                    Status: row.status?.name,
                    Description: row.status?.description
                },
                icon: 'pi pi-info-circle',
                bgColor: 'var(--surface-100)',
                iconColor: 'var(--text-color-secondary)'
            }
        ];
    }
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
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
    dynamicColumns.forEach((col) => {
        filters.value[col.field] = {
            operator: FilterOperator.AND,
            constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
        };
    });
};
// Dynamically create globalFilterFields based on dynamicColumns
const globalFilter = computed(() => {
    return dynamicColumns.map((col) => col.field);
});
const documentFrozen = ref(true);
const readAll = async () => {
    loadingData();

    InitialDataService.getSize().then((data) => {
        size.value = data;
    });
    InitialDataService.getSizeOptions().then((data) => {
        sizeOptions.value = data;
    });

    const respFarms = await InitialDataService.getBranches();

    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await InitialDataService.getCompanies();
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
};
const loadingData = async () => {
    //const response = await getRequest(endpoint.value);
    const response = await crudService.getAll();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data.data;
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {}
);

const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            confirmed_qty_V: z.number().min(1),
            notes: z.string().optional()
        })
    )
});
const [confirmed_qty_V, confirmed_qty_VProps] = defineField('confirmed_qty_V');
const [notes] = defineField('notes');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);

const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');

const cardSections = ref([]);

// // Watch for changes in listRowSelect and update cardSections dynamically
// watch(
//   () => listRowSelect,
//   (newListRowSelect) => {

//     const row = newListRowSelect[0];
//     if (row) {
//       cardSections.value = [
//         {
//           title: 'General Information',
//           fields: {
//             'UUID': row.uuid,
//             'Transaction Date': row.transaction_date,
//             'Week of Year': row.week_Of_Year
//           },
//           icon: 'pi pi-calendar',
//           bgColor: 'var(--primary-50)',
//           iconColor: 'var(--primary-color)'
//         },
//         {
//           title: 'Task Information',
//           fields: {
//             'Task Code': row.tasks_of_type?.code,
//             'Task Name': row.tasks_of_type?.name,
//             'Task Quantity': row.task_qty,
//             'Price per Task': row.price_tarif_task
//           },
//           icon: 'pi pi-tasks',
//           bgColor: 'var(--primary-200)',
//           iconColor: 'var(--primary-color)'
//         },
//         {
//           title: 'Employee Information',
//           fields: {
//             'Worker Name': row.worker_employee?.full_name,
//             'Document': row.worker_employee?.document,
//             'Email': row.worker_employee?.email
//           },
//           icon: 'pi pi-user',
//           bgColor: 'var(--primary-50)',
//           iconColor: 'var(--primary-color)'
//         },
//         {
//           title: 'Packing Information',
//           fields: {
//             'Packing Type': row.packing_type?.name,
//             'Dispatch Code': row.packing_type?.code_dispatch,
//             'Weight Tare': `${row.packing_type?.weight_tare}kg`
//           },
//           icon: 'pi pi-box',
//           bgColor: 'bg-purple-100',
//           iconColor: 'text-purple-500'
//         },
//         {
//           title: 'Task Status Information',
//           fields: {
//             'Status': row.tasks_statuses?.name,
//             'Description': row.tasks_statuses?.description
//           },
//           icon: 'pi pi-info-circle',
//           bgColor: 'var(--surface-100)',
//           iconColor: 'var(--text-color-secondary)'
//         },
//         {
//           title: 'Planner Task Information',
//           fields: {
//             'Transaction Date': row.planner_tasks?.transaction_date,
//             'Crop Lot Codes': row.planner_tasks?.crop_lots
//               .map(lot => lot.code)
//               .join(', ')
//           },
//           icon: 'pi pi-map-marker',
//           bgColor: 'bg-orange-100',
//           iconColor: 'text-orange-500'
//         },
//         {
//           title: 'Company Information',
//           fields: {
//             'Company Name': row.company?.name,
//             'Company Code': row.company?.code,
//             'Website': row.company?.url_path
//           },
//           icon: 'pi pi-building',
//           bgColor: 'var(--primary-100)',
//           iconColor: 'var(--primary-color)'
//         },
//         {
//           title: 'Status',
//           fields: {
//             'Status': row.status?.name,
//             'Description': row.status?.description
//           },
//           icon: 'pi pi-info-circle',
//           bgColor: 'var(--surface-100)',
//           iconColor: 'var(--text-color-secondary)'
//         }
//       ];
//     }
//   },
//   { immediate: true } // Run the watcher immediately to initialize cardSections on component load
// );

const openDialog = (mode) => {
    formDialogTitle.value = mode === 'new' ? 'Create new register' : mode === 'edit' ? 'Edit new register' : 'Clone new register';

    if (mode === 'new') {
        resetForm();
    } else if (listRowSelect.value.length < 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    } else {
    }

    formDialog.value = true;
    state.value = mode;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const actionRecordManager = handleSubmitNew(async (values) => {
    const responseCRUD = ref();
    const { uuid } = listRowSelect.value[0];
    const data = {
        confirmed_qty: values.confirmed_qty_V,
        notes_small: values.notes
    };
    console.log('data:', data);
    if (state.value === 'new') {
    } else if (state.value === 'edit') {
    } else if (state.value === 'patch') {
        responseCRUD.value = await crudService.patch(uuid, data);
    } else if (state.value === 'delete') {
    } else {
    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    toast.add({
        severity: responseCRUD.value.ok ? 'success' : 'error',
        summary: state.value,
        detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
        life: 3000
    });

    if (responseCRUD.value.ok) {
        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    } else {
        console.log('Error:', responseCRUD.value.error);
    }

    // Recargar datos
    loadingData();
});

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        // Crear una lista de promesas para eliminar
        const deletePromises = listRowSelect.value.map(async (item) => {
            const response = await crudService.delete(item.uuid);
            if (!response.ok) {
                throw new Error(`Error al eliminar: ${response.error}`);
            }
            return response;
        });

        // Esperar a que todas las eliminaciones se completen
        await Promise.all(deletePromises);

        // Actualizar la tabla después de la eliminación
        await loadingData();

        // Mostrar mensaje de éxito
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted successfully', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting records', life: 3000 });
    } finally {
        // Limpiar las selecciones
        listRowSelect.value = [];
    }
};

const ExportRecord = () => {
    // Determine the data to export
    const events =
        exportAll.value.name === 'ALL'
            ? dataFromComponent.value.map((data) => data) // Export all current records
            : listRowSelect.value.map((data) => data); // Export only selected records

    // Close the export dialog
    formDialogExport.value = false;

    // Check if there is data to export
    if (!events.length) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'No data to export', life: 3000 });
        return;
    }

    // Export based on the selected format
    if (format.value.name === 'CSV') formatCSV(events);
    else formatXLS(events);
};

function formatCSV(events) {
    if (!events.length) return;

    // Updated flattenObject to handle arrays and nested objects
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (Array.isArray(value)) {
                // Handle arrays by joining their values into a string
                acc[fullKey] = value.map((item) => (typeof item === 'object' ? JSON.stringify(item) : item)).join('; ');
            } else if (value && typeof value === 'object' && !(value instanceof Date)) {
                // Recursively flatten nested objects
                Object.assign(acc, flattenObject(value, fullKey));
            } else {
                acc[fullKey] = value;
            }
            return acc;
        }, {});
    };

    const flattenedData = events.map((item) => flattenObject(item));
    const headers = Object.keys(flattenedData[0]);

    // Create CSV content
    const rows = flattenedData.map((row) => headers.map((header) => `"${row[header] ?? ''}"`).join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value || 'export.csv';
    link.click();
}

function formatXLS(events) {
    if (!events.length) return;

    // Updated flattenObject to handle arrays and nested objects
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (Array.isArray(value)) {
                // Handle arrays by joining their values into a string
                acc[fullKey] = value.map((item) => (typeof item === 'object' ? JSON.stringify(item) : item)).join('; ');
            } else if (value && typeof value === 'object' && !(value instanceof Date)) {
                // Recursively flatten nested objects
                Object.assign(acc, flattenObject(value, fullKey));
            } else {
                acc[fullKey] = value;
            }
            return acc;
        }, {});
    };

    const flattenedData = events.map((item) => flattenObject(item));
    const headers = Object.keys(flattenedData[0]);
    const data = flattenedData.map((row) => headers.map((header) => row[header] ?? ''));

    // Create XLSX worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');

    // Generate and download file
    const binaryData = XLSX.write(workbook, { type: 'array' });
    const blob = new Blob([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value || 'export.xlsx';
    link.click();
}

const remove = (aver) => {
    const index = listRowSelect.value.findIndex((x) => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};

const searchCompanies = (event) => {
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
const searchBranches = (event) => {
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
            <h1>{{ $t('menu.JournalTransactions') }}</h1>
            <!-- <pre>{{ listRowSelect }}</pre> -->
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
                @row-select="onRowSelect(listRowSelect)"
                @row-unselect="onRowSelect(listRowSelect)"
                @select-all-change="onSelectAllChange"
                v-model:selection="listRowSelect"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="globalFilter"
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

                    <Toolbar>
                        <template v-slot:start>
                            <div class="grid justify-content-center">
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-bars" class="mr-2" @click="openForm('detalles')" size="large" />
                                </div>

                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-file-edit" class="p-button-help mr-2" @click="openDialog('patch')" size="large" />
                                </div>

                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="listRowSelect.length > 0" icon="pi pi-plus" class="p-button-success mr-2" @click="openDialog('new')" size="large" />
                                </div>

                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-copy" class="p-button-secondary mr-2" @click="openDialog('clone')" size="large" />
                                </div>

                                <div class="col-12 lg:col-2 text-center">
                                    <Button icon="pi pi-file-import" class="p-button-warning mr-2" @click="openExport" size="large" />
                                </div>

                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!listRowSelect.length > 0" icon="pi pi-trash" class="p-button-danger mr-2" @click="openDelete" size="large" />
                                </div>
                            </div>
                        </template>
                    </Toolbar>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column v-for="col in dynamicColumns" :key="col.field" :field="col.field" :header="col.header" :frozen="col.frozen && documentFrozen" sortable>
                    <!-- Header Template -->
                    <template v-if="col.frozen" #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" @click.stop />
                        <span class="ml-2">{{ col.header }}</span>
                    </template>

                    <!-- Body Template -->
                    <template #body="{ data }">
                        <!-- Conditionally render the Tag component if col.color is true -->
                        <Tag v-if="col.color" :value="getNestedValue(data, col.field)" :style="{ backgroundColor: data.status.color, color: '#FFFFFF' }" />

                        <!-- Render the text only if Tag is not rendered -->
                        <span v-else>
                            {{ getNestedValue(data, col.field) }}
                        </span>
                    </template>

                    <!-- Filter Template -->
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" :placeholder="'Search by ' + col.header" />
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formProperties.open" modal :header="formProperties.title" class="p-fluid text-center mx-auto">
                <!-- <Summary :listRowSelect="listRowSelect" /> -->

                <div class="grid">
                    <Summary v-for="(cardData, index) in cardSections" :key="index" :title="cardData.title" :fields="cardData.fields" :icon="cardData.icon" :bgColor="cardData.bgColor" :iconColor="cardData.iconColor" />
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <div class="grid">
                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center">
                            <label for="confirmed_qty_V" class="font-semibold w-6rem"> {{ t('appmovil.quantityRequested') }}</label>

                            <InputNumber v-model="confirmed_qty_V" class="flex-auto" showButtons buttonLayout="horiontal" :min="0">
                                <template #incrementbuttonicon>
                                    <span class="pi pi-plus" />
                                </template>
                                <template #decrementbuttonicon>
                                    <span class="pi pi-minus" />
                                </template>
                            </InputNumber>
                        </div>

                        <FrontEndErrors :errorsNew="errorsNew" name="confirmed_qty_V" />
                        <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center">
                            <label class="font-semibold w-6rem" for="textarea">{{ t('appmovil.notas') }}</label>
                            <Textarea v-model="notes" class="flex-auto" inputId="textarea" rows="5" cols="30" variant="filled" />
                            <FrontEndErrors :errorsNew="errorsNew" name="notes" />
                            <BackendErrors :name="errorResponseAPI?.errors?.notes_small" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end gap-2 flex-auto">
                    <Button class="flex-auto" type="button" label="Cancel" severity="secondary" @click="formDialog = false" />
                    <Button class="flex-auto" type="button" label="Save" @click="actionRecordManager(state)" />
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
