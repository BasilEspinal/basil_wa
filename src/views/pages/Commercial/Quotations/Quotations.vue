<script setup>
import { ref, watch, provide, onBeforeMount, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { z } from 'zod';
import ability from '@/service/ability.js';
import useData from '@/service/FetchData/FetchDataAPI.js';

const { getRequest } = useData();
const namePage = ' Quotations ';
const titlePage = namePage + 'Management';
const toast = useToast();

// Mock Data Management
const STORAGE_KEY = 'quotations_data';
const loadQuotationsFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    // Initial mock data
    return [
        {
            uuid: crypto.randomUUID(),
            quotation_number: 'COT-2026-001',
            customer: {
                uuid: '1',
                name: 'Cliente Demo 1',
                code: 'CLI001'
            },
            quotation_date: '2026-02-01',
            valid_until: '2026-03-01',
            items: [
                {
                    product_uuid: 'prod-1',
                    product_name: 'Producto A',
                    quantity: 100,
                    unit_price: 15.50,
                    subtotal: 1550.00
                },
                {
                    product_uuid: 'prod-2',
                    product_name: 'Producto B',
                    quantity: 50,
                    unit_price: 25.00,
                    subtotal: 1250.00
                }
            ],
            subtotal: 2800.00,
            tax_rate: 19,
            tax_amount: 532.00,
            total: 3332.00,
            status: {
                name: 'Borrador',
                code: 'draft'
            },
            notes: 'Cotización de ejemplo',
            created_at: '2026-02-01T10:00:00',
            updated_at: '2026-02-01T10:00:00'
        }
    ];
};

const saveQuotationsToStorage = (quotations) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quotations));
};

const generateQuotationNumber = () => {
    const year = new Date().getFullYear();
    const count = dataFromComponent.value.length + 1;
    return `COT-${year}-${String(count).padStart(3, '0')}`;
};

// Data
const dataFromComponent = ref(loadQuotationsFromStorage());
const Customers = ref([]);
const customers = ref([]);
const Products = ref([]);
const products = ref([]);

// Dialogs
const formDialogNew = ref(false);
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);

const formDialogNewTitle = 'Create new' + namePage;
const formDialogEditTitle = 'Edit' + namePage;
const formDialogCloneTitle = 'Clone' + namePage;
const formDialogExportTitle = 'Export' + namePage;
const formDialogDeleteTitle = 'Delete' + namePage;

const filename = ref('quotations');
const isChanging = ref(false);

// Table settings
const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

const listRowSelect = ref([]);
const loading = ref(false);
const filters = ref();
const selectedRegisters = ref([]);
const rowUUID = ref(null);

// Quotation form fields
const quotationItems = ref([]);
const taxRate = ref(19);

// Status options
const statusOptions = ref([
    { name: 'Borrador', code: 'draft' },
    { name: 'Enviada', code: 'sent' },
    { name: 'Aprobada', code: 'approved' },
    { name: 'Rechazada', code: 'rejected' },
    { name: 'Expirada', code: 'expired' }
]);

// Export options
const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });

onBeforeMount(() => {
    readAll();
    initFilters();
});

const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        quotation_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'customer.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        quotation_date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        valid_until: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const clearFilter = () => {
    initFilters();
};

const readAll = async () => {
    loading.value = true;
    // Load customers from API (or mock)
    const respCustomers = await getRequest('/endpoint');
    if (respCustomers.ok && respCustomers.data?.data) {
        Customers.value = respCustomers.data.data.map((customer) => ({ 
            uuid: customer.uuid, 
            name: customer.name,
            code: customer.code 
        }));
    } else {
        // Mock customers if API fails
        Customers.value = [
            { uuid: '1', name: 'Cliente Demo 1', code: 'CLI001' },
            { uuid: '2', name: 'Cliente Demo 2', code: 'CLI002' },
            { uuid: '3', name: 'Cliente Demo 3', code: 'CLI003' }
        ];
    }

    // Mock products
    Products.value = [
        { uuid: 'prod-1', name: 'Producto A', price: 15.50 },
        { uuid: 'prod-2', name: 'Producto B', price: 25.00 },
        { uuid: 'prod-3', name: 'Producto C', price: 30.00 },
        { uuid: 'prod-4', name: 'Producto D', price: 12.75 }
    ];

    loading.value = false;
};

// Form validation
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            customer: z.object({
                name: z.string().min(1),
                uuid: z.string().min(1),
                code: z.string().optional()
            }),
            quotation_date: z.string().min(1),
            valid_until: z.string().min(1),
            status: z.object({
                name: z.string().min(1),
                code: z.string().min(1)
            }),
            notes: z.string().optional()
        })
    )
});

const [customer, customerProps] = defineField('customer');
const [quotation_date, quotationDateProps] = defineField('quotation_date');
const [valid_until, validUntilProps] = defineField('valid_until');
const [status, statusProps] = defineField('status');
const [notes, notesProps] = defineField('notes');

// Computed totals
const computedSubtotal = computed(() => {
    return quotationItems.value.reduce((sum, item) => sum + (item.subtotal || 0), 0);
});

const computedTaxAmount = computed(() => {
    return (computedSubtotal.value * taxRate.value) / 100;
});

const computedTotal = computed(() => {
    return computedSubtotal.value + computedTaxAmount.value;
});

// Item management
const addItem = () => {
    quotationItems.value.push({
        product_uuid: '',
        product_name: '',
        quantity: 1,
        unit_price: 0,
        subtotal: 0
    });
};

const removeItem = (index) => {
    quotationItems.value.splice(index, 1);
};

const updateItemSubtotal = (item) => {
    item.subtotal = item.quantity * item.unit_price;
};

const onProductSelect = (item, selectedProduct) => {
    if (selectedProduct) {
        item.product_uuid = selectedProduct.uuid;
        item.product_name = selectedProduct.name;
        item.unit_price = selectedProduct.price;
        updateItemSubtotal(item);
    }
};

// Search functions
const searchCustomers = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            customers.value = [...Customers.value];
        } else {
            customers.value = Customers.value.filter((cust) => {
                return cust.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchProducts = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products.value = [...Products.value];
        } else {
            products.value = Products.value.filter((prod) => {
                return prod.name.toLowerCase().includes(event.query.toLowerCase());
            });
        }
    }, 200);
};

// CRUD Operations
const openNew = () => {
    resetForm();
    quotationItems.value = [];
    taxRate.value = 19;
    status.value = { name: 'Borrador', code: 'draft' };
    quotation_date.value = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    valid_until.value = nextMonth.toISOString().split('T')[0];
    addItem();
    formDialogNew.value = true;
};

const openEdit = (rowData) => {
    resetForm();
    const source = rowData || listRowSelect.value[0];
    if (!source) return;

    rowUUID.value = source.uuid;
    customer.value = source.customer;
    quotation_date.value = source.quotation_date;
    valid_until.value = source.valid_until;
    status.value = source.status;
    notes.value = source.notes;
    quotationItems.value = JSON.parse(JSON.stringify(source.items));
    taxRate.value = source.tax_rate;

    formDialogEdit.value = true;
};

const openClone = (rowData) => {
    resetForm();
    const source = rowData || listRowSelect.value[0];
    if (!source) return;

    customer.value = source.customer;
    quotation_date.value = new Date().toISOString().split('T')[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    valid_until.value = nextMonth.toISOString().split('T')[0];
    status.value = { name: 'Borrador', code: 'draft' };
    notes.value = source.notes;
    quotationItems.value = JSON.parse(JSON.stringify(source.items));
    taxRate.value = source.tax_rate;

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
    if (quotationItems.value.length === 0) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Debe agregar al menos un producto', life: 3000 });
        return;
    }

    const newQuotation = {
        uuid: crypto.randomUUID(),
        quotation_number: generateQuotationNumber(),
        customer: values.customer,
        quotation_date: values.quotation_date,
        valid_until: values.valid_until,
        items: quotationItems.value,
        subtotal: computedSubtotal.value,
        tax_rate: taxRate.value,
        tax_amount: computedTaxAmount.value,
        total: computedTotal.value,
        status: values.status,
        notes: values.notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    dataFromComponent.value.push(newQuotation);
    saveQuotationsToStorage(dataFromComponent.value);

    toast.add({ severity: 'success', summary: 'Create', detail: 'Cotización creada exitosamente', life: 3000 });
    formDialogNew.value = false;
});

const EditRecord = handleSubmitNew(async (values) => {
    if (quotationItems.value.length === 0) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Debe agregar al menos un producto', life: 3000 });
        return;
    }

    const index = dataFromComponent.value.findIndex(q => q.uuid === rowUUID.value);
    if (index !== -1) {
        dataFromComponent.value[index] = {
            ...dataFromComponent.value[index],
            customer: values.customer,
            quotation_date: values.quotation_date,
            valid_until: values.valid_until,
            items: quotationItems.value,
            subtotal: computedSubtotal.value,
            tax_rate: taxRate.value,
            tax_amount: computedTaxAmount.value,
            total: computedTotal.value,
            status: values.status,
            notes: values.notes || '',
            updated_at: new Date().toISOString()
        };

        saveQuotationsToStorage(dataFromComponent.value);
        toast.add({ severity: 'success', summary: 'Edit', detail: 'Cotización editada exitosamente', life: 3000 });
        formDialogEdit.value = false;
    }
});

const CloneRecord = handleSubmitNew(async (values) => {
    if (quotationItems.value.length === 0) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Debe agregar al menos un producto', life: 3000 });
        return;
    }

    const newQuotation = {
        uuid: crypto.randomUUID(),
        quotation_number: generateQuotationNumber(),
        customer: values.customer,
        quotation_date: values.quotation_date,
        valid_until: values.valid_until,
        items: quotationItems.value,
        subtotal: computedSubtotal.value,
        tax_rate: taxRate.value,
        tax_amount: computedTaxAmount.value,
        total: computedTotal.value,
        status: values.status,
        notes: values.notes || '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    };

    dataFromComponent.value.push(newQuotation);
    saveQuotationsToStorage(dataFromComponent.value);

    toast.add({ severity: 'success', summary: 'Clone', detail: 'Cotización clonada exitosamente', life: 3000 });
    formDialogClone.value = false;
});

const ExportRecord = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.map((data) => data) : listRowSelect.value.map((data) => data);
    formDialogExport.value = false;
    if (!eventos.length) return;
    if (format.value.name == 'CSV') formatCSV(eventos);
    else formatXLS(eventos);
};

function formatCSV(eventos) {
    const dataExport = [];
    const headers = ['Número', 'Cliente', 'Fecha', 'Válida Hasta', 'Subtotal', 'Impuesto', 'Total', 'Estado'];
    dataExport.push(headers.join(',') + '\n');
    
    eventos.forEach(row => {
        const line = [
            row.quotation_number,
            row.customer.name,
            row.quotation_date,
            row.valid_until,
            row.subtotal.toFixed(2),
            row.tax_amount.toFixed(2),
            row.total.toFixed(2),
            row.status.name
        ];
        dataExport.push(line.join(',') + '\n');
    });

    const blob = new Blob([dataExport.toString()], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename.value + '.csv';
    link.click();
}

function formatXLS(eventos) {
    const data = eventos.map((row) => ({
        'Número': row.quotation_number,
        'Cliente': row.customer.name,
        'Fecha': row.quotation_date,
        'Válida Hasta': row.valid_until,
        'Subtotal': row.subtotal.toFixed(2),
        'Impuesto': row.tax_amount.toFixed(2),
        'Total': row.total.toFixed(2),
        'Estado': row.status.name
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Cotizaciones');
    const binaryData = XLSX.write(workbook, { type: 'array' });

    const file = new File([binaryData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(file, filename.value + '.xlsx');
}

const DeleteRecord = async () => {
    formDialogDelete.value = false;

    try {
        listRowSelect.value.forEach((item) => {
            const index = dataFromComponent.value.findIndex(q => q.uuid === item.uuid);
            if (index !== -1) {
                dataFromComponent.value.splice(index, 1);
            }
        });

        saveQuotationsToStorage(dataFromComponent.value);
        toast.add({ severity: 'success', summary: 'Deleted Record', detail: 'Cotizaciones eliminadas', life: 3000 });
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error al eliminar', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const remove = (item) => {
    const index = listRowSelect.value.findIndex((x) => x.uuid === item.uuid);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};

const onRowSelect = (data) => {
    listRowSelect.value = data;
};

watch(listRowSelect, onRowSelect);

provide('isChanging', isChanging);
</script>

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
                    <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                        <Toolbar style="margin-bottom: 1rem">
                            <template #center>
                                <Button v-if="ability.can('comercial_cotizaciones_crear')" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                                <Divider v-if="ability.can('comercial_cotizaciones_crear')" layout="vertical" />
                                <Button v-if="ability.can('comercial_cotizaciones_editar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                                <Divider v-if="ability.can('comercial_cotizaciones_editar')" layout="vertical" />
                                <Button v-if="ability.can('comercial_cotizaciones_crear')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                                <Divider v-if="ability.can('comercial_cotizaciones_crear')" layout="vertical" />
                                <Button v-if="ability.can('comercial_cotizaciones_crear')" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                                <Divider v-if="ability.can('comercial_cotizaciones_crear')" layout="vertical" />
                                <Button v-if="ability.can('comercial_cotizaciones_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
                            </template>
                        </Toolbar>
                    </div>
                </div>
            </div>

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
                v-model:selection="selectedRegisters"
                filterDisplay="menu"
                v-model:filters="filters"
                :globalFilterFields="['quotation_number', 'customer.name', 'status.name', 'quotation_date', 'valid_until']"
                v-if="ability.can('comercial_cotizaciones_listado')"
            >
                <template #header>
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

                <template #empty> No quotations found. </template>
                <template #loading> Loading quotations data. Please wait. </template>
                
                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                
                <Column field="quotation_number" filterField="quotation_number" header="Número" sortable>
                    <template #body="{ data }">
                        {{ data.quotation_number }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Buscar por número" />
                    </template>
                </Column>

                <Column field="customer.name" filterField="customer.name" header="Cliente" sortable>
                    <template #body="{ data }">
                        {{ data.customer.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Buscar por cliente" />
                    </template>
                </Column>

                <Column field="quotation_date" filterField="quotation_date" header="Fecha" sortable>
                    <template #body="{ data }">
                        {{ data.quotation_date }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Buscar por fecha" />
                    </template>
                </Column>

                <Column field="valid_until" filterField="valid_until" header="Válida Hasta" sortable>
                    <template #body="{ data }">
                        {{ data.valid_until }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Buscar por fecha" />
                    </template>
                </Column>

                <Column field="total" header="Total" sortable>
                    <template #body="{ data }">
                        ${{ data.total.toFixed(2) }}
                    </template>
                </Column>

                <Column field="status.name" filterField="status.name" header="Estado" sortable>
                    <template #body="{ data }">
                        <Tag :value="data.status.name" :severity="data.status.code === 'approved' ? 'success' : data.status.code === 'rejected' ? 'danger' : 'info'" />
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Buscar por estado" />
                    </template>
                </Column>

                <Column field="created_at" header="Creado" sortable>
                    <template #body="{ data }">
                        {{ new Date(data.created_at).toLocaleDateString() }}
                    </template>
                </Column>
            </DataTable>

            <!-- New Dialog -->
            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid" style="width: 80%; max-width: 1200px;">
                <div class="grid">
                    <div class="col-12 md:col-6 mb-3">
                        <label for="customer" class="font-semibold">Cliente *</label>
                        <AutoComplete v-model="customer" inputId="customer" :suggestions="customers" @complete="searchCustomers" field="name" dropdown />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['customer'] }">
                            {{ errorsNew.customer }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="status" class="font-semibold">Estado *</label>
                        <Dropdown v-model="status" :options="statusOptions" optionLabel="name" placeholder="Seleccione estado" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['status'] }">
                            {{ errorsNew.status }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="quotation_date" class="font-semibold">Fecha de Cotización *</label>
                        <InputText id="quotation_date" v-model="quotation_date" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['quotation_date'] }">
                            {{ errorsNew.quotation_date }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="valid_until" class="font-semibold">Válida Hasta *</label>
                        <InputText id="valid_until" v-model="valid_until" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['valid_until'] }">
                            {{ errorsNew.valid_until }}
                        </small>
                    </div>

                    <div class="col-12 mb-3">
                        <label class="font-semibold">Productos</label>
                        <div v-for="(item, index) in quotationItems" :key="index" class="grid mb-2 p-3" style="border: 1px solid var(--surface-border); border-radius: 6px;">
                            <div class="col-12 md:col-4">
                                <label class="font-semibold text-sm">Producto</label>
                                <AutoComplete 
                                    v-model="item.product_name" 
                                    :suggestions="products" 
                                    @complete="searchProducts"
                                    @item-select="(e) => onProductSelect(item, e.value)"
                                    field="name" 
                                    dropdown 
                                />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Cantidad</label>
                                <InputNumber v-model="item.quantity" @input="updateItemSubtotal(item)" :min="1" />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Precio Unit.</label>
                                <InputNumber v-model="item.unit_price" @input="updateItemSubtotal(item)" mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div class="col-12 md:col-3">
                                <label class="font-semibold text-sm">Subtotal</label>
                                <InputNumber v-model="item.subtotal" mode="currency" currency="USD" locale="en-US" :disabled="true" />
                            </div>
                            <div class="col-12 md:col-1 flex align-items-end">
                                <Button icon="pi pi-trash" class="p-button-danger p-button-sm" @click="removeItem(index)" :disabled="quotationItems.length === 1" />
                            </div>
                        </div>
                        <Button label="Agregar Producto" icon="pi pi-plus" class="p-button-sm p-button-outlined" @click="addItem" />
                    </div>

                    <div class="col-12 md:col-8 mb-3">
                        <label for="notes" class="font-semibold">Notas/Observaciones</label>
                        <Textarea id="notes" v-model="notes" rows="3" />
                    </div>

                    <div class="col-12 md:col-4 mb-3">
                        <div class="mb-2">
                            <label class="font-semibold">Tasa de Impuesto (%)</label>
                            <InputNumber v-model="taxRate" :min="0" :max="100" suffix="%" />
                        </div>
                        <div class="p-3" style="background: var(--surface-card); border-radius: 6px;">
                            <div class="flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span class="font-semibold">${{ computedSubtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-content-between mb-2">
                                <span>Impuesto ({{ taxRate }}%):</span>
                                <span class="font-semibold">${{ computedTaxAmount.toFixed(2) }}</span>
                            </div>
                            <Divider />
                            <div class="flex justify-content-between">
                                <span class="font-bold">Total:</span>
                                <span class="font-bold text-xl">${{ computedTotal.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="formDialogNew = false" />
                    <Button label="Guardar" icon="pi pi-check" @click="createRecord()" />
                </template>
            </Dialog>

            <!-- Edit Dialog -->
            <Dialog v-model:visible="formDialogEdit" modal :header="formDialogEditTitle" class="p-fluid" style="width: 80%; max-width: 1200px;">
                <div class="grid">
                    <div class="col-12 md:col-6 mb-3">
                        <label for="customer" class="font-semibold">Cliente *</label>
                        <AutoComplete v-model="customer" inputId="customer" :suggestions="customers" @complete="searchCustomers" field="name" dropdown />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['customer'] }">
                            {{ errorsNew.customer }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="status" class="font-semibold">Estado *</label>
                        <Dropdown v-model="status" :options="statusOptions" optionLabel="name" placeholder="Seleccione estado" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['status'] }">
                            {{ errorsNew.status }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="quotation_date" class="font-semibold">Fecha de Cotización *</label>
                        <InputText id="quotation_date" v-model="quotation_date" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['quotation_date'] }">
                            {{ errorsNew.quotation_date }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="valid_until" class="font-semibold">Válida Hasta *</label>
                        <InputText id="valid_until" v-model="valid_until" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['valid_until'] }">
                            {{ errorsNew.valid_until }}
                        </small>
                    </div>

                    <div class="col-12 mb-3">
                        <label class="font-semibold">Productos</label>
                        <div v-for="(item, index) in quotationItems" :key="index" class="grid mb-2 p-3" style="border: 1px solid var(--surface-border); border-radius: 6px;">
                            <div class="col-12 md:col-4">
                                <label class="font-semibold text-sm">Producto</label>
                                <AutoComplete 
                                    v-model="item.product_name" 
                                    :suggestions="products" 
                                    @complete="searchProducts"
                                    @item-select="(e) => onProductSelect(item, e.value)"
                                    field="name" 
                                    dropdown 
                                />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Cantidad</label>
                                <InputNumber v-model="item.quantity" @input="updateItemSubtotal(item)" :min="1" />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Precio Unit.</label>
                                <InputNumber v-model="item.unit_price" @input="updateItemSubtotal(item)" mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div class="col-12 md:col-3">
                                <label class="font-semibold text-sm">Subtotal</label>
                                <InputNumber v-model="item.subtotal" mode="currency" currency="USD" locale="en-US" :disabled="true" />
                            </div>
                            <div class="col-12 md:col-1 flex align-items-end">
                                <Button icon="pi pi-trash" class="p-button-danger p-button-sm" @click="removeItem(index)" :disabled="quotationItems.length === 1" />
                            </div>
                        </div>
                        <Button label="Agregar Producto" icon="pi pi-plus" class="p-button-sm p-button-outlined" @click="addItem" />
                    </div>

                    <div class="col-12 md:col-8 mb-3">
                        <label for="notes" class="font-semibold">Notas/Observaciones</label>
                        <Textarea id="notes" v-model="notes" rows="3" />
                    </div>

                    <div class="col-12 md:col-4 mb-3">
                        <div class="mb-2">
                            <label class="font-semibold">Tasa de Impuesto (%)</label>
                            <InputNumber v-model="taxRate" :min="0" :max="100" suffix="%" />
                        </div>
                        <div class="p-3" style="background: var(--surface-card); border-radius: 6px;">
                            <div class="flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span class="font-semibold">${{ computedSubtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-content-between mb-2">
                                <span>Impuesto ({{ taxRate }}%):</span>
                                <span class="font-semibold">${{ computedTaxAmount.toFixed(2) }}</span>
                            </div>
                            <Divider />
                            <div class="flex justify-content-between">
                                <span class="font-bold">Total:</span>
                                <span class="font-bold text-xl">${{ computedTotal.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="formDialogEdit = false" />
                    <Button label="Guardar" icon="pi pi-check" @click="EditRecord()" />
                </template>
            </Dialog>

            <!-- Clone Dialog -->
            <Dialog v-model:visible="formDialogClone" modal :header="formDialogCloneTitle" class="p-fluid" style="width: 80%; max-width: 1200px;">
                <div class="grid">
                    <div class="col-12 md:col-6 mb-3">
                        <label for="customer" class="font-semibold">Cliente *</label>
                        <AutoComplete v-model="customer" inputId="customer" :suggestions="customers" @complete="searchCustomers" field="name" dropdown />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['customer'] }">
                            {{ errorsNew.customer }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="status" class="font-semibold">Estado *</label>
                        <Dropdown v-model="status" :options="statusOptions" optionLabel="name" placeholder="Seleccione estado" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['status'] }">
                            {{ errorsNew.status }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="quotation_date" class="font-semibold">Fecha de Cotización *</label>
                        <InputText id="quotation_date" v-model="quotation_date" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['quotation_date'] }">
                            {{ errorsNew.quotation_date }}
                        </small>
                    </div>

                    <div class="col-12 md:col-6 mb-3">
                        <label for="valid_until" class="font-semibold">Válida Hasta *</label>
                        <InputText id="valid_until" v-model="valid_until" type="date" />
                        <small :class="{ 'p-invalid text-red-700': errorsNew['valid_until'] }">
                            {{ errorsNew.valid_until }}
                        </small>
                    </div>

                    <div class="col-12 mb-3">
                        <label class="font-semibold">Productos</label>
                        <div v-for="(item, index) in quotationItems" :key="index" class="grid mb-2 p-3" style="border: 1px solid var(--surface-border); border-radius: 6px;">
                            <div class="col-12 md:col-4">
                                <label class="font-semibold text-sm">Producto</label>
                                <AutoComplete 
                                    v-model="item.product_name" 
                                    :suggestions="products" 
                                    @complete="searchProducts"
                                    @item-select="(e) => onProductSelect(item, e.value)"
                                    field="name" 
                                    dropdown 
                                />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Cantidad</label>
                                <InputNumber v-model="item.quantity" @input="updateItemSubtotal(item)" :min="1" />
                            </div>
                            <div class="col-12 md:col-2">
                                <label class="font-semibold text-sm">Precio Unit.</label>
                                <InputNumber v-model="item.unit_price" @input="updateItemSubtotal(item)" mode="currency" currency="USD" locale="en-US" />
                            </div>
                            <div class="col-12 md:col-3">
                                <label class="font-semibold text-sm">Subtotal</label>
                                <InputNumber v-model="item.subtotal" mode="currency" currency="USD" locale="en-US" :disabled="true" />
                            </div>
                            <div class="col-12 md:col-1 flex align-items-end">
                                <Button icon="pi pi-trash" class="p-button-danger p-button-sm" @click="removeItem(index)" :disabled="quotationItems.length === 1" />
                            </div>
                        </div>
                        <Button label="Agregar Producto" icon="pi pi-plus" class="p-button-sm p-button-outlined" @click="addItem" />
                    </div>

                    <div class="col-12 md:col-8 mb-3">
                        <label for="notes" class="font-semibold">Notas/Observaciones</label>
                        <Textarea id="notes" v-model="notes" rows="3" />
                    </div>

                    <div class="col-12 md:col-4 mb-3">
                        <div class="mb-2">
                            <label class="font-semibold">Tasa de Impuesto (%)</label>
                            <InputNumber v-model="taxRate" :min="0" :max="100" suffix="%" />
                        </div>
                        <div class="p-3" style="background: var(--surface-card); border-radius: 6px;">
                            <div class="flex justify-content-between mb-2">
                                <span>Subtotal:</span>
                                <span class="font-semibold">${{ computedSubtotal.toFixed(2) }}</span>
                            </div>
                            <div class="flex justify-content-between mb-2">
                                <span>Impuesto ({{ taxRate }}%):</span>
                                <span class="font-semibold">${{ computedTaxAmount.toFixed(2) }}</span>
                            </div>
                            <Divider />
                            <div class="flex justify-content-between">
                                <span class="font-bold">Total:</span>
                                <span class="font-bold text-xl">${{ computedTotal.toFixed(2) }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="formDialogClone = false" />
                    <Button label="Guardar" icon="pi pi-check" @click="CloneRecord()" />
                </template>
            </Dialog>

            <!-- Export Dialog -->
            <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" :header="formDialogExportTitle" :modal="true" class="p-fluid">
                <div class="mb-3">
                    <div class="flex align-items-center gap-3 mb-1">
                        <label for="filename" class="font-semibold w-6rem">Filename:</label>
                        <InputText id="filename" v-model="filename" class="flex-auto" autocomplete="off" :required="true" />
                    </div>
                </div>
                <div class="flex align-items-center gap-3">
                    <div class="align-items-center gap-3">
                        <label for="format" class="font-semibold">Format:</label>
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="' w-full'" />
                    </div>
                    <div class="align-items-center gap-3">
                        <label for="exportAll" class="font-semibold">Export:</label>
                        <Dropdown v-model="exportAll" :options="optionsEsport" optionLabel="name" :class="' w-full md:w-10rem'" />
                    </div>
                </div>

                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="formDialogExport = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportRecord" />
                </template>
            </Dialog>

            <!-- Delete Dialog -->
            <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" :header="formDialogDeleteTitle" :modal="true">
                <label for="username" class="text-2xl font-medium w-6rem"> ¿Está seguro que desea eliminar las cotizaciones seleccionadas? </label>
                <div class="card flex flex-wrap mt-2 gap-2">
                    <div v-for="item in listRowSelect" :key="item.uuid">
                        <Chip :label="item.quotation_number" removable @remove="remove(item)" icon="pi pi-ban" />
                    </div>
                </div>
                <div class="flex justify-content-end gap-2 mt-3">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                    <Button type="button" label="Delete" @click="DeleteRecord" />
                </div>
            </Dialog>

            <Toast />
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
