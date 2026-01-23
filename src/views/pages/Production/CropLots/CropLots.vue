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
    { field: 'code', header: 'Code', frozen: true, color: false },
    { field: 'area_m2', header: 'Area (m²)', frozen: false, color: false },
    { field: 'channel_average', header: 'Channel Average', frozen: false, color: false },
    { field: 'zone', header: 'Zone', frozen: false, color: false },
    { field: 'latitude', header: 'Latitude', frozen: false, color: false },
    { field: 'longitude', header: 'Longitude', frozen: false, color: false },
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
        onRowSelect([rowData]);
    }

    formProperties.value = {
        open: true,
        title: mode === 'Ver Detalles' || mode === 'details' ? 'Detalles de Lote de Cultivo' : 'Formulario',
        mode: mode,
        data: mode === 'detalles' || mode === 'details' ? null : (rowData || listRowSelect.value[0])
    };
};

let endpoint = ref(`/crop_lots`); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();
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
const selectedRegisters = ref([]);
const loading = ref(false);
const cardSections = ref([]);

const onSelectAllChange = (event) => {
    selectedRegisters.value = listRowSelect.value;
};

const onRowSelect = (data) => {
    selectedRegisters.value = listRowSelect.value;
    openDialogSettlement('patch_action');
    const row = listRowSelect.value[0];
    if (row) {
        cardSections.value = [
            {
                title: 'General Information',
                fields: {
                    UUID: row.uuid,
                    Code: row.code,
                    'Area (m²)': row.area_m2,
                    'Channel Average': row.channel_average,
                    Zone: row.zone,
                    Latitude: row.latitude || 'Not available',
                    Longitude: row.longitude || 'Not available',
                    'Created At': row.created_at,
                    'Updated At': row.updated_at
                },
                icon: 'pi pi-calendar',
                bgColor: 'surface-card',
                iconColor: 'text-primary'
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
                bgColor: 'surface-card',
                iconColor: 'text-primary'
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
                bgColor: 'surface-card',
                iconColor: 'text-primary'
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
                bgColor: 'surface-card',
                iconColor: 'text-primary'
            }
        ];
    }
};

watch(listRowSelect, onRowSelect);


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
            codeV: z.string().min(2),
            area_m2V: z.string().min(1),
            channel_averageV: z.number().min(1).max(100),
            zoneV: z.string().min(2),
            latitudeV: z.string().optional(),
            longitudeV: z.string().optional(),
            farmV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            companyV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional()
        })
    )
});

const [codeV, codeVProps] = defineField('codeV');
const [area_m2V, area_m2VProps] = defineField('area_m2V');
const [channel_averageV, channel_averageVProps] = defineField('channel_averageV');
const [zoneV, zonePropsV] = defineField('zoneV');
const [latitudeV, latitudeVProps] = defineField('latitudeV');
const [longitudeV, longitudeVProps] = defineField('longitudeV');
const [farmV] = defineField('farmV');
const [companyV] = defineField('companyV');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });


const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');

const openDialogSettlement = async (mode) => {
    if (listRowSelect.value.length != 0) {
        //await getItems(listRowSelect.value[0].status.id);
        await getItems(0);
        console.log('listRowSelectiddddddd:', listRowSelect.value[0].status.id);
        //await getItems('non-flow')
        console.log('listRowSelect:', listRowSelect.value[0].status.id);
        console.log(itemsActions.value);
    }
    state.value = mode;
};

const openDialog = (mode) => {
    formDialogTitle.value = mode === 'new' ? 'Create new register' : mode === 'edit' ? 'Edit new register' : mode === 'clone' ? 'Clone new register' : mode === 'patch' ? 'Patch new register' : '';

    if (mode === 'new') {
        resetForm();
    } else if (listRowSelect.value.length < 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    } else {
        resetForm();
        const { code, area_m2, channel_average, zone, latitude, longitude, farm, company } = listRowSelect.value[0];
        codeV.value = code;
        area_m2V.value = area_m2;
        channel_averageV.value = channel_average;
        zoneV.value = zone;
        latitudeV.value = latitude;
        longitudeV.value = longitude;
        farmV.value = { name: farm.name, id: farm.uuid };
        companyV.value = { name: company.name, id: company.uuid };
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
    console.log('listRowSelect:', listRowSelect.value);
    console.log(values);
    const data = {
        code: values.codeV,
        area_m2: values.area_m2V,
        channel_average: values.channel_averageV,
        zone: values.zoneV,
        latitude: values.latitudeV,
        longitude: values.longitudeV,
        farm_uuid: values.farmV ? values.farmV.id : farmDefault,
        company_uuid: values.companyV ? values.companyV.id : companyDefault
    };
    console.log('data:', data);
    const { uuid } = listRowSelect.value[0] || {};
    if (state.value === 'new') {
        responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'edit') {
        responseCRUD.value = await crudService.update(uuid, data);
    } else if (state.value === 'clone') {
        responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'patch') {
        responseCRUD.value = await crudService.patch(uuid, data);
    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    if (responseCRUD.value && responseCRUD.value.ok) {
        toast.add({
            severity: 'success',
            summary: state.value,
            detail: 'Done',
            life: 3000
        });
        await loadingData();

        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    } else if (responseCRUD.value) {
        console.log('Error:', responseCRUD.value.error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: responseCRUD.value.error || 'Ocurrió un error inesperado',
            life: 3000
        });
    }
});

const patchAction = async () => {
    try {
        const patchPromises = [];
        listRowSelect.value.forEach(async (item) => {
            const data = {
                status_id: status_id_Action.value
            };
            const patchPromise = await crudService.patch(item.uuid, data);
            console.log('patchPromise:', patchPromise);
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
            await loadingData();
            dataFromComponent.value = [...dataFromComponent.value]; // 🧠 force array reference change
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Some records could not be updated',
                life: 3000
            });
        }

        await loadingData();
        dataFromComponent.value = [...dataFromComponent.value]; // 🧠 force array reference change
    } catch (error) {
        console.error('Error updating records:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error updating records',
            life: 3000
        });
    } finally {
        listRowSelect.value = [];
        await loadingData();
        dataFromComponent.value = [...dataFromComponent.value]; // 🧠 force array reference change
    }
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
        console.error('Error deleting:', error);
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
                        <i class="pi pi-map text-primary text-3xl"></i>
                    </div>
                    <div>
                        <h1 class="m-0 text-3xl font-bold tracking-tight">{{ $t('menu.production.cropLots') }}</h1>
                        <p class="m-0 text-600 font-medium mt-1">Gestión y zonificación de lotes de cultivo</p>
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
                @row-select="onRowSelect"
                @row-unselect="onRowSelect"
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
                                <InputText v-model="filters['global'].value" placeholder="Buscar lote..." class="w-full md:w-20rem" />
                            </span>
                        </div>

                        <div class="hidden xl:block">
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        </div>

                        <div class="flex gap-2">
                            <Button icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openDialog('new')" v-tooltip.top="'Nuevo Lote'" />
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
                        <label for="username" class="font-semibold w-6rem">Code :</label>
                        <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="codeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.code" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="area_m2V" class="font-semibold w-3">Area(m2):</label>
                        <InputText id="area_m2V" v-model="area_m2V" class="flex-auto" autocomplete="off" v-bind="area_m2VProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="area_m2V" />
                    <BackendErrors :name="errorResponseAPI?.errors?.area_m2" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="channel_averageV" class="font-semibold">Channel avg:</label>
                        <InputNumber id="channel_averageV" v-model="channel_averageV" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="channel_averageV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.channel_average" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="zoneV" class="font-semibold w-6rem">Zone :</label>
                        <InputText id="zoneV" v-model="zoneV" class="flex-auto" autocomplete="off" v-bind="zonePropsV" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="zoneV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.zone" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="latitudeV" class="font-semibold">Latitude:</label>
                        <InputText id="latitudeV" v-model="latitudeV" class="flex-auto" autocomplete="off" v-bind="latitudeVProps" />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="latitudeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.latitude" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="longitudeV" class="font-semibold">Longitude:</label>
                        <InputText id="longitudeV" v-model="longitudeV" class="flex-auto" autocomplete="off" v-bind="longitudeVProps" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="longitudeV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.longitude" />
                </div>

                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-3">Farm :</label>
                        <AutoComplete v-model="farmV" inputId="ac" class="flex-auto" :suggestions="farms" @complete="searchBranches" field="name" dropdown />
                    </div>

                    <FrontEndErrors :errorsNew="errorsNew" name="farmV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                </div>
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="username" class="font-semibold w-3">Company:</label>
                        <AutoComplete v-model="companyV" inputId="ac" class="flex-auto" :suggestions="compa" @complete="searchCompanies" field="name" dropdown />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="companyV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.company" />
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
