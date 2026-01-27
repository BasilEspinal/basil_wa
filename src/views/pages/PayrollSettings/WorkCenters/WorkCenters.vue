<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
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
import ActionButton from '@/components/ActionButton.vue';
import FloatingSelectionBar from '@/components/layout/FloatingSelectionBar.vue';
import { useActions } from '@/composables/ActionButton.js';
const { getItems, itemsActions, messageDialog, titleDialog, status_id_Action, flagDialog } = useActions(`/processflow/CropLot`);

const { t } = useI18n();

const dynamicColumns = [
    { field: 'name', header: 'Name', frozen: true, color: false },
    { field: 'code', header: 'Code', frozen: false, color: false },
    { field: 'taskoftype.name', header: 'Task Name', frozen: false, color: false },
    // { field: 'taskoftype.code', header: 'Task Code', frozen: false, color: false },
    { field: 'status.name', header: 'Status Name', frozen: false, color: true },
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },
    { field: 'created_at', header: 'Created At', frozen: false, color: false },
    { field: 'updated_at', header: 'Updated At', frozen: false, color: false }
];

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
};
const formProperties = ref({ open: false, title: '', mode: '', data: null });
const openForm = (mode, rowData) => {
    if (rowData) {
        onRowSelect(rowData);
    }

    formProperties.value = {
        open: true,
        title: mode === 'Ver Detalles' || mode === 'details' ? 'Detalles de Centro de Trabajo' : 'Formulario',
        mode: mode,
        data: mode === 'detalles' || mode === 'details' ? null : (rowData || listRowSelect.value[0])
    };
};

let endpoint = ref('/work_centers'); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();

const TaskOfType = ref([]);
const taskOfType = ref([]);

const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');
const formDialogExportTitle = 'Export records';
const formDialogDeleteTitle = 'Delete records';
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
    if (data && !Array.isArray(data)) {
        listRowSelect.value = [data];
    } else if (data) {
        listRowSelect.value = data;
    }
};
watch(listRowSelect, RowSelect);
const cardSections = ref([]);
const onRowSelect = (data) => {
    if (data && !Array.isArray(data)) {
        listRowSelect.value = [data];
    } else {
        listRowSelect.value = data;
    }
    openDialogSettlement('patch_action');
    const row = listRowSelect.value[0];
    if (row) {
        cardSections.value = [
            {
                title: 'General Information',
                fields: {
                    UUID: row.uuid,
                    Name: row.name,
                    Code: row.code,
                    'Created At': row.created_at,
                    'Updated At': row.updated_at
                },
                icon: 'pi pi-id-card',
                bgColor: 'var(--primary-50)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Task Information',
                fields: {
                    'Task UUID': row.taskoftype?.uuid,
                    'Task Code': row.taskoftype?.code,
                    'Task Name': row.taskoftype?.name,
                    'Created At': row.taskoftype?.created_at,
                    'Updated At': row.taskoftype?.updated_at
                },
                icon: 'pi pi-tasks',
                bgColor: 'bg-yellow-100',
                iconColor: 'text-yellow-500'
            },
            {
                title: 'Status Information',
                fields: {
                    'Status UUID': row.status?.uuid,
                    Name: row.status?.name,
                    Color: row.status?.color,
                    Description: row.status?.description,
                    Model: row.status?.model,
                    'Created At': row.status?.created_at,
                    'Updated At': row.status?.updated_at
                },
                icon: 'pi pi-info-circle',
                bgColor: 'var(--surface-100)',
                iconColor: 'var(--text-color-secondary)'
            },
            {
                title: 'Farm Information',
                fields: {
                    'Farm UUID': row.farm?.uuid,
                    Name: row.farm?.name,
                    Code: row.farm?.code,
                    'Created At': row.farm?.created_at,
                    'Updated At': row.farm?.updated_at
                },
                icon: 'pi pi-map-marker',
                bgColor: 'var(--primary-100)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Company Information',
                fields: {
                    'Company UUID': row.company?.uuid,
                    Name: row.company?.name,
                    Code: row.company?.code,
                    Website: row.company?.url_path,
                    'Logo File': row.company?.file_name,
                    'Created At': row.company?.created_at,
                    'Updated At': row.company?.updated_at
                },
                icon: 'pi pi-building',
                bgColor: 'var(--primary-200)',
                iconColor: 'var(--primary-color)'
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

    const respTaskOfType = await InitialDataService.getTaskOfType();
    
    if (!respTaskOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTaskOfType.error, life: 3000 });
    TaskOfType.value = respTaskOfType.data.data.map((taskType) => ({ id: taskType.uuid, name: taskType.name }));

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
            name: z.string().min(4),
            codeV: z.string().min(4),
            taskTypeV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
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
const [taskTypeV] = defineField('taskTypeV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);

const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');
const formMode = ref('');
const rowUUID = ref(null);

const openDialogSettlement = async (mode) => {
    if (listRowSelect.value.length != 0) {
        await getItems(listRowSelect.value[0].status.id);
    }
    state.value = mode;
};

const openDialog = (mode, rowData) => {
    formMode.value = mode;
    formDialogTitle.value = mode === 'new' ? 'Create new register' : mode === 'edit' ? 'Edit register' : mode === 'clone' ? 'Clone register' : mode === 'patch' ? 'Patch register' : '';

    if (mode === 'new') {
        resetForm();
        rowUUID.value = null;
    } else {
        const source = rowData || listRowSelect.value[0];
        if (!source) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
            return;
        }
        rowUUID.value = source.uuid;
        resetForm();
        const { code, company: empresa, farm: farmParameter, name: nombre, taskoftype } = source;

        name.value = nombre;
        codeV.value = code;
        if (taskoftype) taskTypeV.value = { id: taskoftype.uuid, name: taskoftype.name };
        if (empresa) company.value = { id: empresa.uuid, name: empresa.name };
        if (farmParameter) farm.value = { id: farmParameter.uuid, name: farmParameter.name };
    }

    formDialog.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const actionRecordManager = handleSubmitNew(async (values) => {
    console.log('✅ Action Record Manager (Success)', { values, mode: formMode.value, rowUUID: rowUUID.value });
    const responseCRUD = ref();
    
    
    const data = {
        code: values.codeV,
        name: values.name,
        tasks_of_type_uuid: values.taskTypeV ? values.taskTypeV.id : null,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };
    
    if (formMode.value === 'new') {
        responseCRUD.value = await crudService.create(data);
    } else if (formMode.value === 'edit') {
        const uuid = rowUUID.value;
        responseCRUD.value = await crudService.update(uuid, data);
    } else if (formMode.value === 'clone') {
        responseCRUD.value = await crudService.create(data);
    } else if (formMode.value === 'patch') {
        const uuid = rowUUID.value;
        responseCRUD.value = await crudService.patch(uuid, data);
    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    if (responseCRUD.value && responseCRUD.value.ok) {
        toast.add({
            severity: responseCRUD.value.ok ? 'success' : 'error',
            summary: formMode.value,
            detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
            life: 3000
        });
        await loadingData();

        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
}, (context) => {
    console.warn('❌ Action Record Manager (Validation Failed)', context.errors);
    toast.add({
        severity: 'warn',
        summary: 'Validation Failed',
        detail: 'Please check the form for errors',
        life: 3000
    });
});

const patchAction = async () => {
    try {
        const patchPromises = [];
        listRowSelect.value.forEach(async (item) => {
            const data = {
                status_id: status_id_Action.value
            };
            const patchPromise = await crudService.patch(item.uuid, data);
            
            patchPromises.push(patchPromise);
        });

        const responses = await Promise.all(patchPromises);

        const hasError = responses.some((response) => !response.ok);

        if (!hasError) {
            toast.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Records updated successfully',
                life: 3000
            });

            formDialog.value = false;
            listRowSelect.value = [];
            selectedRegisters.value = [];
            flagDialog.value = false;
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Some records could not be updated',
                life: 3000
            });
        }

        await loadingData(); // Refresh data
    } catch (error) {
        
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error updating records',
            life: 3000
        });
    } finally {
        listRowSelect.value = [];
    }
};

const deleteSingleRecord = (rowData) => {
    listRowSelect.value = [rowData];
    openDelete();
};

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

        await Promise.all(deletePromises);
        await loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Deleted successfully', life: 3000 });
    } catch (error) {
        
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting records', life: 3000 });
    } finally {
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
const searchTaskOfType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            taskOfType.value = [...TaskOfType.value];
        } else {
            taskOfType.value = TaskOfType.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
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
        <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
            <div class="flex align-items-center justify-content-between p-3">
                <div class="flex align-items-center gap-3">
                    <div class="bg-primary-50 p-3 border-round-circle">
                        <i class="pi pi-building text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">{{ $t('menu.workCenters') }}</h1>
                        <p class="m-0 text-600 font-medium mt-1">Gestión de centros de costos y áreas de trabajo</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="card">

            <Dialog v-model:visible="flagDialog" :style="{ width: '450px' }" :header="titleDialog" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> {{ messageDialog }} </label>
                <!-- <Summary :listRowSelect="listRowSelect" /> -->
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="flagDialog = false" />
                    <Button type="button" label="Save" @click="patchAction" />
                </div>
            </Dialog>
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
                @select-all-change="onSelectAllChange"
                v-model:selection="listRowSelect"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="globalFilter"
            >
                <template #header>
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                        <div class="flex gap-2 align-items-center">
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar Filtros" class="p-button-outlined p-button-sm" @click="clearFilter()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar centro..." class="w-full md:w-20rem" />
                            </span>
                        </div>

                        <div class="hidden xl:block">
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        </div>

                        <div class="flex gap-2">
                            <Button icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openDialog('new')" v-tooltip.top="'Nuevo Centro'" />
                            <Button icon="pi pi-file-export" class="p-button-outlined p-button-secondary p-button-rounded" @click="openExport" :disabled="!dataFromComponent || dataFromComponent.length === 0" v-tooltip.top="'Exportar'" />
                        </div>
                    </div>
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
                <Column header="Acciones" :frozen="true" alignFrozen="right" style="min-width: 12rem">
                    <template #body="{ data }">
                        <div class="flex gap-2">
                            <Button icon="pi pi-eye" class="p-button-rounded p-button-text p-button-info" @click="openForm('details', data)" v-tooltip.top="'Detalles'" />
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-text p-button-warning" @click="openDialog('edit', data)" v-tooltip.top="'Editar'" />
                            <Button icon="pi pi-copy" class="p-button-rounded p-button-text p-button-secondary" @click="openDialog('clone', data)" v-tooltip.top="'Clonar'" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="deleteSingleRecord(data)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formProperties.open" modal :header="formProperties.title" class="p-fluid text-center mx-auto">
                <div class="grid">
                    <Summary v-for="(cardData, index) in cardSections" :key="index" :title="cardData.title" :fields="cardData.fields" :icon="cardData.icon" :bgColor="cardData.bgColor" :iconColor="cardData.iconColor" />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Name :</label>
                        <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="name" />
                    <BackendErrors :name="errorResponseAPI?.errors?.name" />
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-6rem">Code :</label>
                        <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="codeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.code" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="taskType" class="font-semibold w-3"> Tasks Type </label>
                        <AutoComplete v-model="taskTypeV" class="w-full" inputId="taskTypeV" :suggestions="taskOfType" @complete="searchTaskOfType" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="taskTypeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.taskType" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchBranches" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="farm" />
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-3">Companny:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="company" />
                    <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                </div>

                <div class="flex justify-content-end gap-2 flex-auto">
                    <Button class="flex-auto" type="button" label="Cancel" severity="secondary" @click="formDialog = false" />
                    <Button class="flex-auto" type="button" label="Save" @click="actionRecordManager" />
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
                        <Chip :label="item.code" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />

            <FloatingSelectionBar :selection="listRowSelect" @clear="listRowSelect = []" @delete="openDelete">
                <template #actions>
                    <div class="flex gap-2">
                        <Button icon="pi pi-file-import" class="p-button-outlined p-button-warning" label="Exportar" @click="openExport" />
                        <ActionButton :items="itemsActions" :listRowSelect="listRowSelect" />
                    </div>
                </template>
            </FloatingSelectionBar>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
