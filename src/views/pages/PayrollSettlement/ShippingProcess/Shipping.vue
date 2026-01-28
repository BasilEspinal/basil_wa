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
import ShippingSummary from './ShippingSummary.vue';
import ActionButton from '@/components/ActionButton.vue';
import FloatingSelectionBar from '@/components/layout/FloatingSelectionBar.vue';
import { useActions } from '@/composables/ActionButton.js';
const { itemsActions } = useActions('/transactions/shipping/shippings');
const { t } = useI18n();

const dynamicColumns = [
    { field: 'transaction_date', header: 'Transaction Date', frozen: true, color: false },
    { field: 'shipping_statuses.name', header: 'Shipping Status', frozen: true, color: true },
    { field: 'voyage_num', header: 'Voyage Num', frozen: false, color: false },
    { field: 'vehicle.vehicle_type', header: 'Vehicle Name', frozen: false, color: false },
    { field: 'sent_qty', header: 'Send Qty', frozen: false, color: false },
    { field: 'tasks_of_type.name', header: 'Task Of Type', frozen: false, color: false },
    { field: 'dispatch_number_lot', header: 'Dispatch Number', frozen: false, color: false },
    { field: 'product.name', header: 'Product Name', frozen: false, color: false },
    { field: 'varieties.name', header: 'Variety Name', frozen: false, color: false },
    { field: 'product_type.name', header: 'Product Type Name', frozen: false, color: false },
    { field: 'packing_type.name', header: 'Packing Type Name', frozen: false, color: false },
    { field: 'supervisory.full_name', header: 'Supervisor First Name', frozen: false, color: false },
    { field: 'employee.full_name', header: 'Employee First Name', frozen: false, color: false },
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },
    { field: 'status.name', header: 'Status Name', frozen: false, color: true }
];

const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value && value[key], obj);
};
const formProperties = ref({ open: false, title: '', mode: '', data: null });
const openForm = (mode) => {
    

    formProperties.value = {
        open: true,
        title: mode === 'Ver Detalles',
        mode: mode,
        data: mode === 'detalles' ? null : listRowSelect.value[0]
    };
};

const prueba = ref({ revisar: 'revisar GET-POST-PUT-DELETE' });
let endpoint = ref('/transactions/shipping/shippings'); //replace endpoint with your endpoint
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
            name: z.string().min(4),
            codeV: z.string().min(4),
            farm: z
                .object({
                    id: z.string().min(4),
                    name: z.string().min(4)
                })
                .optional(),
            company: z
                .object({
                    id: z.string().min(4),
                    name: z.string().min(4)
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

const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');

const openDialog = (mode) => {
    formDialogTitle.value = mode === 'new' ? 'Create new register' : mode === 'edit' ? 'Edit new register' : 'Clone new register';

    if (mode === 'new') {
        resetForm();
    } else if (listRowSelect.value.length < 1) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Select a record', life: 3000 });
        return;
    } else {
        const { code, company: empresa, farm: farmParameter, name: nombre } = listRowSelect.value[0];
        name.value = nombre;
        codeV.value = code;
        company.value = { id: empresa.uuid, name: empresa.name };
        farm.value = { id: farmParameter.uuid, name: farmParameter.name };
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
    const data = {
        code: values.codeV,
        name: values.name,
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault
    };

    // Verifica si es un nuevo registro o si es edición/duplicado
    if (state.value === 'new') {
        responseCRUD.value = await crudService.create(data);
    } else {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = state.value === 'edit' ? await crudService.update(uuid, data) : await crudService.create(data);
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

    // Flatten nested objects for export
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
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

    // Flatten nested objects
    const flattenObject = (obj, prefix = '') => {
        return Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            const fullKey = prefix ? `${prefix}.${key}` : key;

            if (value && typeof value === 'object' && !Array.isArray(value)) {
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
            <!-- <h1 v-if="!ability.can('menux','comercialx')">{{ $t('menux') }}</h1> -->
            <div class="grid">
                <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                    <!--Uncomment when table is done-->

                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto"></div>
                </div>
            </div>
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
                    <div class="flex flex-column md:flex-row md:justify-content-between md:align-items-center gap-3">
                        <div class="flex gap-2 align-items-center">
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar Filtros" class="p-button-outlined p-button-sm" @click="clearFilter()" />
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Buscar despacho..." class="w-full md:w-20rem" />
                            </span>
                        </div>

                        <div class="hidden xl:block">
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label" />
                        </div>

                        <div class="flex gap-2">
                            <Button icon="pi pi-plus" class="p-button-raised p-button-success p-button-rounded" @click="openDialog('new')" v-tooltip.top="'Nuevo Registro'" />
                            <Button icon="pi pi-file-export" class="p-button-outlined p-button-secondary p-button-rounded" @click="openExport" :disabled="!dataFromComponent || dataFromComponent.length === 0" v-tooltip.top="'Exportar'" />
                        </div>
                    </div>
                </template>

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column v-for="col in dynamicColumns" :key="col.field" :field="col.field" :header="col.frozen && documentFrozen ? '' : col.header" :frozen="col.frozen && documentFrozen" sortable>
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
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-text p-button-danger" @click="openDelete(data)" v-tooltip.top="'Eliminar'" />
                        </div>
                    </template>
                </Column>
            </DataTable>
            <Dialog v-model:visible="formProperties.open" modal :header="formProperties.title" class="p-fluid text-center mx-auto">
                <ShippingSummary :listRowSelect="listRowSelect" />
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <div class="grid">
                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                            <label for="username" class="font-semibold w-6rem">Name :</label>
                            <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                        </div>
                        <FrontEndErrors :errorsNew="errorsNew" name="name" />
                        <BackendErrors :name="errorResponseAPI?.errors?.code" />
                    </div>

                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                            <label for="username" class="font-semibold w-6rem">Code :</label>
                            <InputText id="username" v-model="codeV" class="flex-auto" autocomplete="off" v-bind="codeVProps" />
                        </div>
                        <FrontEndErrors :errorsNew="errorsNew" name="codeV" />
                        <BackendErrors :name="errorResponseAPI?.errors?.code" />
                    </div>

                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                            <label for="farm" class="font-semibold w-6rem">Farm :</label>

                            <AutoComplete v-model="farm" class="flex-auto" :suggestions="farms" @complete="searchBranches" optionLabel="name" placeholder="Introduce the value" dropdown />
                        </div>
                        <FrontEndErrors :errorsNew="errorsNew" name="farm" />
                        <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                    </div>

                    <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                            <label for="company" class="font-semibold w-6rem">Company:</label>
                            <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompanies" optionLabel="name" dropdown />
                        </div>
                        <FrontEndErrors :errorsNew="errorsNew" name="company" />
                        <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
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
