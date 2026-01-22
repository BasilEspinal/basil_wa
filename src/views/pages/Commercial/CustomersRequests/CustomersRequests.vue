<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import { computed } from 'vue';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';

import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import Summary from '@/components/Summary.vue';
import ActionButton from '@/components/ActionButton.vue';
import { useForm } from 'vee-validate';

import { useActions } from '@/composables/ActionButton.js';
const { getItems, itemsActions, messageDialog, titleDialog, status_id_Action, flagDialog } = useActions(`/processflow/CustomerRequest`);

const { t } = useI18n();

const dynamicColumns = [
    { field: 'dispatch_number_lot', header: 'Dispatch Number Lot', frozen: true, color: false },
    { field: 'order_number_customer', header: 'Order Number Customer', frozen: false, color: false },
    { field: 'invoice_number_customer', header: 'Invoice Number Customer', frozen: false, color: false },
    { field: 'customer_name', header: 'Customer Name', frozen: false, color: false },
    { field: 'request_date', header: 'Request Date', frozen: false, color: false },
    { field: 'delivery_datetime', header: 'Delivery Datetime', frozen: false, color: false },
    { field: 'created_at', header: 'Created At', frozen: false, color: false },
    { field: 'updated_at', header: 'Updated At', frozen: false, color: false },
    // Nested fields for employee
    { field: 'employee_id.full_name', header: 'Employee Full Name', frozen: false, color: false },
    { field: 'employee_id.document', header: 'Employee Document', frozen: false, color: false },
    { field: 'employee_id.email', header: 'Employee Email', frozen: false, color: false },
    // Nested fields for product
    { field: 'product.name', header: 'Product Name', frozen: false, color: false },
    { field: 'product.short_name', header: 'Product Short Name', frozen: false, color: false },
    { field: 'variant.name', header: 'Variant Name', frozen: false, color: false },
    { field: 'product_type.name', header: 'Product Type', frozen: false, color: false },
    // Nested fields for company
    { field: 'company.name', header: 'Company Name', frozen: false, color: false },

    // Nested fields for farm
    { field: 'farm.name', header: 'Farm Name', frozen: false, color: false },

    // Nested fields for status
    { field: 'status.name', header: 'Status Name', frozen: false, color: true }
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

let endpoint = ref(`/customer_requests`); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const errorResponseAPI = crudService.getErrorResponse();
const dataFromComponent = ref();

const products = ref([]);
const Products = ref([]);
const productsType = ref([]);
const ProductsType = ref([]);
const variants = ref([]);
const Variants = ref([]);
const packingTypes = ref([]);
const PackingTypes = ref([]);

const packingsQtyDispatch = ref([]);
const PackingsQtyDispatch = ref([]);
const packingsTypesDispatch = ref([]);
const PackingsTypesDispatch = ref([]);
const packingsWeightDispatch = ref([]);
const PackingsWeightDispatch = ref([]);
const unitsTypeDispatch = ref([]);
const UnitsTypeDispatch = ref([]);
const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const companyDefault = sessionStorage.getItem('accessSessionCompany');

const employeeNameDefault = ref('');
const employeeUuidDefault = ref('');

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
    employeeNameDefault.value = sessionStorage.getItem('accessSessionEmployeeName');
    employeeUuidDefault.value = localStorage.getItem('accesSessionEmployeeUuid');
});
const listRowSelect = ref([]);
const loading = ref(false);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
watch(listRowSelect, RowSelect);
const cardSections = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    openDialogSettlement('patch_action');
    const row = listRowSelect.value[0];
    if (row) {
        cardSections.value = [
            {
                title: 'General Information',
                fields: {
                    UUID: row.uuid,
                    'Dispatch Number Lot': row.dispatch_number_lot,
                    'Order Number Customer': row.order_number_customer,
                    'Invoice Number Customer': row.invoice_number_customer,
                    'Customer Name': row.customer_name,
                    'Request Date': row.request_date,
                    'Delivery Datetime': row.delivery_datetime,
                    'Created At': row.created_at,
                    'Updated At': row.updated_at
                },
                icon: 'pi pi-calendar',
                bgColor: 'var(--primary-50)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Employee Information',
                fields: {
                    'Employee UUID': row.employee_id?.uuid,
                    'Full Name': row.employee_id?.full_name,
                    Document: row.employee_id?.document,
                    Email: row.employee_id?.email,
                    Phone: row.employee_id?.phone_movil_number,
                    Gender: row.employee_id?.gender?.name,
                    'Document Type': row.employee_id?.document_type?.name,
                    'Created At': row.employee_id?.created_at,
                    'Updated At': row.employee_id?.updated_at
                },
                icon: 'pi pi-user',
                bgColor: 'var(--primary-100)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Product Information',
                fields: {
                    'Product Name': row.product?.name,
                    'Product Short Name': row.product?.short_name,
                    'Variant Name': row.variant?.name,
                    'Product Type': row.product_type?.name,
                    Cultivated: row.product?.cultivated ? 'Yes' : 'No',
                    'Created At': row.product?.created_at,
                    'Updated At': row.product?.updated_at
                },
                icon: 'pi pi-box',
                bgColor: 'var(--primary-200)',
                iconColor: 'var(--primary-color)'
            },
            {
                title: 'Company Information',
                fields: {
                    'Company Name': row.company?.name,
                    'Company Code': row.company?.code,
                    Website: row.company?.url_path,
                    'Logo File': row.company?.file_name,
                    'Created At': row.company?.created_at,
                    'Updated At': row.company?.updated_at
                },
                icon: 'pi pi-building',
                bgColor: 'bg-orange-100',
                iconColor: 'text-orange-500'
            },
            {
                title: 'Farm Information',
                fields: {
                    'Farm Name': row.farm?.name,
                    'Farm Code': row.farm?.code,
                    'Created At': row.farm?.created_at,
                    'Updated At': row.farm?.updated_at
                },
                icon: 'pi pi-map-marker',
                bgColor: 'bg-purple-100',
                iconColor: 'text-purple-500'
            },
            {
                title: 'Status Information',
                fields: {
                    'Status Name': row.status?.name,
                    Description: row.status?.description,
                    Color: row.status?.color,
                    Model: row.status?.model,
                    'Created At': row.status?.created_at,
                    'Updated At': row.status?.updated_at
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

    const respPackingsType = await InitialDataService.getPackingTypes();
    if (!respPackingsType.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingsType.error, life: 3000 });
    PackingTypes.value = respPackingsType.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

    const respProducts = await InitialDataService.getProducts();
    if (!respProducts.ok) toast.add({ severity: 'error', detail: 'Error' + respProducts.error, life: 3000 });
    Products.value = respProducts.data.data.map((product) => ({ id: product.uuid, name: product.name }));

    const respVariants = await InitialDataService.getVariants();
    if (!respVariants.ok) toast.add({ severity: 'error', detail: 'Error' + respVariants.error, life: 3000 });
    Variants.value = respVariants.data.data.map((variant) => ({ id: variant.uuid, name: variant.name }));

    const respProductsType = await InitialDataService.getProductTypes();
    if (!respProductsType.ok) toast.add({ severity: 'error', detail: 'Error' + respProductsType.error, life: 3000 });
    ProductsType.value = respProductsType.data.data.map((productType) => ({ id: productType.uuid, name: productType.name }));

    const respPackingQtyDispatch = await InitialDataService.getPackingQtyDispatch();
    if (!respPackingQtyDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingQtyDispatch.error, life: 3000 });
    PackingsQtyDispatch.value = respPackingQtyDispatch.data.data.map((packing) => ({ id: packing.id, name: packing.label }));

    const respPackingTypesDispatch = await InitialDataService.getPackingTypes();
    if (!respPackingTypesDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingTypesDispatch.error, life: 3000 });
    PackingsTypesDispatch.value = respPackingTypesDispatch.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

    const respPackingWeightDispatch = await InitialDataService.getPackingWeightDispatch();
    if (!respPackingWeightDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingWeightDispatch.error, life: 3000 });
    PackingsWeightDispatch.value = respPackingWeightDispatch.data.data.map((packing) => ({ id: packing.id, name: packing.label }));

    const respUnitsTypeDispatch = await InitialDataService.getUnitsType();
    if (!respUnitsTypeDispatch.ok) toast.add({ severity: 'error', detail: 'Error' + respUnitsTypeDispatch.error, life: 3000 });
    UnitsTypeDispatch.value = respUnitsTypeDispatch.data.data.map((packing) => ({ id: packing.uuid, name: packing.name }));

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
    initialValues: {
        productV: { name: '', id: '' },
        product_typeV: { name: '', id: '' },
        variantV: { name: '', id: '' },
        packing_typeV: { name: '', id: '' },
        employeeV: { name: '', id: '' },
        packing_qty_dispatchV: { name: '', id: '' },
        packing_type_dispatchV: { name: '', id: '' },
        packing_dispatch_weightV: { name: '', id: '' },
        unit_type_dispatch_V: { name: '', id: '' },
        packing_name_customerV: 'CAJAS',
        outlet_temperatureV: 0
    },
    validationSchema: toTypedSchema(
        z.object({
            // name: z.string().min(4),
            order_number_customerV: z.string().min(4),
            invoice_number_customerV: z.string().min(4),
            customer_nameV: z.string().min(4),
            request_dateV: z.date(),
            delivery_datetimeV: z.date(),
            place_of_deliveryV: z.string().min(4),
            dispatch_number_lotV: z.string().min(4),
            request_qty_V: z.number().min(1).max(1000),
            packing_name_customerV: z.string().min(1),
            outlet_temperatureV: z.number().min(4),
            productV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            product_typeV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),
            variantV: z.object({
                name: z.string().min(4),
                id: z.string().min(4)
            }),

            packing_typeV: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),

            packing_qty_dispatchV: z.object({
                name: z.number().min(1),
                id: z.number().min(1)
            }),
            //Lista desplegable BOL etc
            packing_type_dispatchV: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),
            packing_dispatch_weightV: z.object({
                name: z.number().min(1),
                id: z.number().min(1)
            }),

            unit_type_dispatch_V: z.object({
                name: z.string().min(1),
                id: z.string().min(1)
            }),

            // employeeV: z.object({
            //     name: z.string().min(4),
            //     id: z.string().min(4)
            // }),
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
// const [name, nameProps] = defineField('name');

const [order_number_customerV, order_number_customerVProps] = defineField('order_number_customerV');
const [invoice_number_customerV, invoice_number_customerVProps] = defineField('invoice_number_customerV');
const [customer_nameV, customer_nameVProps] = defineField('customer_nameV');
const [request_dateV, request_dateVProps] = defineField('request_dateV');
const [delivery_datetimeV, delivery_datetimeVProps] = defineField('delivery_datetimeV');
const [place_of_deliveryV, place_of_deliveryVProps] = defineField('place_of_deliveryV');
const [dispatch_number_lotV, dispatch_number_lotVProps] = defineField('dispatch_number_lotV');
const [request_qty_V, request_qty_VProps] = defineField('request_qty_V');
const [packing_name_customerV, packing_name_customerVProps] = defineField('packing_name_customerV');
const [outlet_temperatureV, outlet_temperatureVProps] = defineField('outlet_temperatureV');
const [productV, productVProps] = defineField('productV');
const [product_typeV, product_typeVProps] = defineField('product_typeV');
const [variantV, variantVProps] = defineField('variantV');
const [packing_typeV, packing_typeVProps] = defineField('packing_typeV');
const [packing_qty_dispatchV, packing_qty_dispatchVProps] = defineField('packing_qty_dispatchV');
const [packing_type_dispatchV, packing_type_dispatchVProps] = defineField('packing_type_dispatchV');
const [packing_dispatch_weightV, packing_dispatch_weightProps] = defineField('packing_dispatch_weightV');
const [unit_type_dispatch_V, unit_type_dispatch_VProps] = defineField('unit_type_dispatch_V');
const [employeeV, employeeVProps] = defineField('employeeV');
const [farm] = defineField('farm');
const [company] = defineField('company');

const events = ref([
    // { status: 'Request date', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0' },
    { status: 'Request date', date: request_dateV, icon: 'pi pi-shopping-cart', color: '#9C27B0' },
    { status: 'Delivery datetime', date: delivery_datetimeV, icon: 'pi pi-cog', color: '#673AB7' },
    { status: 'Confirmation', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });
const selectedRegisters = ref([]);

const formDialogTitle = ref('');
const formDialog = ref(false);

const state = ref('');

const openDialogSettlement = async (mode) => {
    if (listRowSelect.value.length != 0) {
        await getItems(listRowSelect.value[0].status.id);
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
        const {
            dispatch_number_lot,
            company: empresa,
            farm: farmParameter,
            order_number_customer: order_number_customer,
            invoice_number_customer: invoice_number_customer,
            customer_name: customer_name,
            request_date: request_date,
            delivery_datetime: delivery_datetime,
            place_of_delivery: place_of_delivery,
            request_qty: request_qty,
            packing_name_customer: packing_name_customer,
            outlet_temperature: outlet_temperature,
            product: product,
            product_type: product_type,
            variant: variant,
            packing_type: packing_type,
            packing_qty_dispatch: packing_qty_dispatch,
            packing_type_dispatch: packing_type_dispatch,
            packing_dispatch_weight: packing_dispatch_weight,
            unit_type_dispatch: unit_type_dispatch
        } = listRowSelect.value[0];

        order_number_customerV.value = order_number_customer;
        invoice_number_customerV.value = invoice_number_customer;
        customer_nameV.value = customer_name;
        request_dateV.value = new Date(request_date);
        delivery_datetimeV.value = new Date(delivery_datetime);
        place_of_deliveryV.value = place_of_delivery;
        dispatch_number_lotV.value = dispatch_number_lot;
        request_qty_V.value = Number(request_qty);
        packing_name_customerV.value = packing_name_customer;
        outlet_temperatureV.value = Number(outlet_temperature);
        productV.value = { id: product.uuid, name: product.name };
        product_typeV.value = { id: product_type.uuid, name: product_type.name };
        variantV.value = { id: variant.uuid, name: variant.name };
        packing_typeV.value = { id: packing_type.uuid, name: packing_type.name };
        packing_qty_dispatchV.value = { id: packing_qty_dispatch, name: packing_qty_dispatch };
        packing_type_dispatchV.value = { id: packing_type_dispatch.uuid, name: packing_type_dispatch.name };
        packing_dispatch_weightV.value = { id: packing_dispatch_weight, name: packing_dispatch_weight };
        unit_type_dispatch_V.value = { id: unit_type_dispatch.uuid, name: unit_type_dispatch.name };

        // employeeV.value = { id: employee.uuid, name: employee.name };
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
    console.log('listRowSelect:', listRowSelect.value);
    console.log(values);
    const data = {
        order_number_customer: values.order_number_customerV,
        invoice_number_customer: values.invoice_number_customerV,
        customer_name: values.customer_nameV,
        request_date: formatTransactionDateTime(values.request_dateV).formattedDate,
        delivery_datetime: formatTransactionDateTime(values.delivery_datetimeV).formattedDateTime,
        place_of_delivery: values.place_of_deliveryV,
        dispatch_number_lot: values.dispatch_number_lotV,
        request_qty: values.request_qty_V,
        packing_name_customer: values.packing_name_customerV,
        outlet_temperature: parseFloat(values.outlet_temperatureV).toFixed(2),
        product_uuid: values.productV ? values.productV.id : '',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : '',
        variant_uuid: values.variantV ? values.variantV.id : '',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : '',

        packing_qty_dispatch: values.packing_qty_dispatchV ? values.packing_qty_dispatchV.id : '',
        packing_type_dispatch_uuid: values.packing_type_dispatchV ? values.packing_type_dispatchV.id : '',
        // packing_type_dispatch_uuid: "8b57a8ef-c0c7-4bee-8e75-6db8ffe44b48",
        packing_dispatch_weight: values.packing_dispatch_weightV ? values.packing_dispatch_weightV.id : '',
        unit_type_dispatch_uuid: values.unit_type_dispatch_V ? values.unit_type_dispatch_V.id : '',
        // unit_type_dispatch_uuid: "0d8695c0-0d1b-4827-ab53-d18ed2d7d2ca",
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        employee_uuid: values.employeeV ? values.employeeV.id : employeeUuidDefault.value
    };
    console.log('data:', data);
    if (state.value === 'new') {
        responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'edit') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.update(uuid, data);
    } else if (state.value === 'clone') {
        responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'patch') {
        responseCRUD.value = await crudService.patch(uuid, data);
    } else {
        const { uuid } = listRowSelect.value[0];
    }

    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    if (responseCRUD.value.ok) {
        toast.add({
            severity: responseCRUD.value.ok ? 'success' : 'error',
            summary: state.value,
            detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
            life: 3000
        });
        await loadingData();

        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    } else {
        console.log('Error:', responseCRUD.value.error);
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
        console.error('Error updating records:', error);
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

function formatTransactionDateTime(date) {
    // Asegurarse de que el año, mes y día tienen el formato correcto
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const dd = String(date.getDate()).padStart(2, '0');

    // Asegurarse de que las horas, minutos y segundos tienen el formato correcto
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    // Formatear la fecha en formato YYYY-MM-DD
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    // Formatear la hora en formato HH:MM:SS
    const formattedTime = `${hh}:${min}:${ss}`;

    // Combinar fecha y hora en formato YYYY-MM-DD HH:MM:SS
    const formattedDateTime = `${formattedDate} ${formattedTime}`;
    return { formattedDateTime: formattedDateTime, formattedDate: formattedDate, formattedTime: formattedTime };
}

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

const searchCompannies = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            compa.value = [...Compan.value];
        } else {
            compa.value = Compan.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchFarms = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            farms.value = [...Farms.value];
        } else {
            farms.value = Farms.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchProduct = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            products.value = [...Products.value];
        } else {
            products.value = Products.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchProductType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            productsType.value = [...ProductsType.value];
        } else {
            productsType.value = ProductsType.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchVariant = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            variants.value = [...Variants.value];
        } else {
            variants.value = Variants.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingTypes.value = [...PackingTypes.value];
        } else {
            packingTypes.value = PackingTypes.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchPackingQtyDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsQtyDispatch.value = [...PackingsQtyDispatch.value];
        } else {
            packingsQtyDispatch.value = PackingsQtyDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchPackingTypeDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsTypesDispatch.value = [...PackingsTypesDispatch.value];
        } else {
            packingsTypesDispatch.value = PackingsTypesDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchPackingWeightDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packingsWeightDispatch.value = [...PackingsWeightDispatch.value];
        } else {
            packingsWeightDispatch.value = PackingsWeightDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchUnitsTypeDispatch = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            unitsTypeDispatch.value = [...UnitsTypeDispatch.value];
        } else {
            unitsTypeDispatch.value = UnitsTypeDispatch.value.filter((value) => {
                return value.name.toLowerCase().startsWith(event.query.toLowerCase());
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
            <h1>{{ $t('menu.clientRequests') }}</h1>

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

                            <!-- Action Button -->
                        </template>

                        <template v-slot:center>
                            <SelectButton v-model="size" :options="sizeOptions" optionLabel="label" dataKey="label"> </SelectButton>
                        </template>
                    </Toolbar>

                    <Toolbar>
                        <template v-slot:start>
                            <div class="grid justify-content-center">
                                <!-- Toolbar -->

                                <!--Uncomment when table is done-->

                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-bars" class="mr-2" @click="openForm('detalles')" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-file-edit" class="p-button-help mr-2" @click="openDialog('edit')" />
                                </div>

                                <!-- Second row -->
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="listRowSelect.length > 0" icon="pi pi-plus" class="p-button-success mr-2" @click="openDialog('new')" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" icon="pi pi-copy" class="p-button-secondary mr-2" @click="openDialog('clone')" />
                                </div>

                                <!-- Third row -->
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!listRowSelect.length > 0" icon="pi pi-file-import" class="p-button-warning mr-2" @click="openExport" />
                                </div>
                                <div class="col-12 lg:col-2 text-center">
                                    <Button :disabled="!listRowSelect.length > 0" icon="pi pi-trash" class="p-button-danger mr-2" @click="openDelete" />
                                </div>
                            </div>
                        </template>
                        <template v-slot:end>
                            <div class="col-12 lg:col-12 text-center">
                                <ActionButton :items="itemsActions" :listRowSelect="listRowSelect" class="w-12" />
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
                <div class="grid">
                    <Summary v-for="(cardData, index) in cardSections" :key="index" :title="cardData.title" :fields="cardData.fields" :icon="cardData.icon" :bgColor="cardData.bgColor" :iconColor="cardData.iconColor" />
                </div>
                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formProperties.open = false" />
                </div>
            </Dialog>
            <Dialog v-model:visible="formDialog" modal :header="formDialogTitle" class="p-fluid text-center mx-auto">
                <Avatar icon="pi pi-user" class="mr-3" size="xlarge" shape="circle" />
                <span> Employee: {{ employeeNameDefault }} </span>

                <Divider />

                <div class="flex mb-2 gap-2 justify-content-end">
                    <Button @click="active = 0" rounded label="1" class="w-2rem h-2rem p-0" :outlined="active !== 0" />
                    <Button @click="active = 1" rounded label="2" class="w-2rem h-2rem p-0" :outlined="active !== 1" />
                    <Button @click="active = 2" rounded label="3" class="w-2rem h-2rem p-0" :outlined="active !== 2" />
                </div>

                <TabView v-model:activeIndex="active">
                    <TabPanel header="Request">
                        <div class="grid">
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="order_number_customerV" class="font-semibold w-6rem">Order Number Customer</label>
                                    <InputText id="username" v-model="order_number_customerV" class="flex-auto" autocomplete="off" v-bind="order_number_customerVProps" />
                                </div>
                                <!-- <pre>{{order_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['order_number_customerV'] }">
                                    {{ errorsNew.order_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.order_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="invoice_number_customerV" class="font-semibold w-6rem">Invoice Number Customer</label>
                                    <InputText id="invoice_number_customerV" v-model="invoice_number_customerV" class="flex-auto" autocomplete="off" v-bind="invoice_number_customerVProps" />
                                </div>
                                <!-- <pre>{{invoice_number_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['invoice_number_customerV'] }">
                                    {{ errorsNew.invoice_number_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.invoice_number_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="customer_nameV" class="font-semibold w-6rem">Customer Name</label>
                                    <InputText id="customer_nameV" v-model="customer_nameV" class="flex-auto" autocomplete="off" v-bind="customer_nameVProps" />
                                </div>
                                <!-- <pre>{{customer_nameV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['customer_nameV'] }">
                                    {{ errorsNew.customer_nameV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.customer_name" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="request_dateV" class="font-semibold w-6rem">Request Date</label>
                                    <!-- <Calendar v-model="transaction_dateV" class="flex-auto" v-bind="transaction_dateVProps"/> -->
                                    <Calendar dateFormat="dd/mm/yy" v-model="request_dateV" class="flex-auto" showIcon :showOnFocus="false" inputId="buttondisplay" placeholder="Select request date" />
                                </div>
                                <!-- <pre>{{request_dateV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_dateV'] }">
                                    {{ errorsNew.request_dateV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_date" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="delivery_datetimeV" class="font-semibold w-6rem">Delivery Datetime :</label>
                                    <Calendar id="delivery_datetimeV-24h" v-model="delivery_datetimeV" showTime hourFormat="24" class="flex-auto" showIcon inputId="buttondisplay" />
                                </div>
                                <!-- <pre>{{delivery_datetimeV}}</pre> -->

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['delivery_datetimeV'] }">
                                    {{ errorsNew.delivery_datetimeV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.delivery_datetime" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="place_of_deliveryV" class="font-semibold w-6rem">Place of Delivery</label>
                                    <InputText id="place_of_deliveryV" v-model="place_of_deliveryV" class="flex-auto" autocomplete="off" v-bind="place_of_deliveryVProps" />
                                </div>
                                <!-- <pre>{{place_of_deliveryV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['place_of_deliveryV'] }">
                                    {{ errorsNew.place_of_deliveryV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.place_of_delivery" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="dispatch_number_lotV" class="font-semibold w-6rem">Dispatch Number Lot</label>
                                    <InputText id="dispatch_number_lotV" v-model="dispatch_number_lotV" class="flex-auto" autocomplete="off" v-bind="dispatch_number_lotVProps" :frozen="documentFrozen" />
                                </div>
                                <!-- <pre>{{dispatch_number_lotV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['dispatch_number_lotV'] }">
                                    {{ errorsNew.dispatch_number_lotV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.dispatch_number_lot" />
                            </div>
                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="request_qty_V" class="font-semibold w-6rem">Request qty:</label>
                                    <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_qty_V'] }">
                                    {{ errorsNew.request_qty_V }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="packing_name_customerV" class="font-semibold w-6rem">Packing Name Customer:</label>
                                    <InputText id="packing_name_customerV" v-model="packing_name_customerV" class="flex-auto" autocomplete="off" v-bind="packing_name_customerVProps" />
                                </div>
                                <!-- <pre>{{packing_name_customerV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['packing_name_customerV'] }">
                                    {{ errorsNew.packing_name_customerV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.packing_name_customer" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center gap-3 mb-1">
                                    <label for="outlet_temperatureV" class="font-semibold w-6rem">Outlet temperature:</label>

                                    <InputNumber
                                        v-model="outlet_temperatureV"
                                        inputId="temperature"
                                        class="flex-auto"
                                        prefix="&uarr; "
                                        suffix="℃"
                                        :min="0"
                                        :max="40"
                                        :step="0.1"
                                        :decimal-separator="','"
                                        locale="en-US"
                                        :minFractionDigits="2"
                                        :maxFractionDigits="2"
                                    />
                                </div>
                                <!-- <pre>{{outlet_temperatureV}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['outlet_temperatureV'] }">
                                    {{ errorsNew.outlet_temperatureV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.outlet_temperature" />
                            </div>

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="productV" class="font-semibold w-6rem">Product:</label>
                                    <AutoComplete v-model="productV" class="flex-auto" inputId="ac"
                                        :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['productV'] }">
                                    {{ errorsNew.productV }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                    <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac"
                                        :suggestions="productsType" @complete="searchProductType" field="name"
                                        dropdown />
                                </div>
                                
                                <small id="username-help"
                                    :class="{ 'p-invalid text-red-700': errorsNew['product_typeV'] }">
                                    {{ errorsNew.product_typeV }}
                                </small>
                            </div> -->

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                    <AutoComplete v-model="variantV" class="flex-auto" inputId="ac"
                                        :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['variantV'] }">
                                    {{ errorsNew.variantV }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                            </div> -->

                            <!-- <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                    <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac"
                                        :suggestions="packingTypes" @complete="searchPackingType" field="name"
                                        dropdown />
                                </div>
                                
                                <small id="username-help"
                                    :class="{ 'p-invalid text-red-700': errorsNew['packing_typeV'] }">
                                    {{ errorsNew.packing_typeV }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                    <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms"
                                        @complete="searchFarms" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                    {{ errorsNew.farm }}
                                </small>
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-3">
                                <div class="flex align-items-center">
                                    <label for="company" class="font-semibold w-6rem">Company:</label>
                                    <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa"
                                        @complete="searchCompannies" field="name" dropdown />
                                </div>
                                
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                                    {{ errorsNew.company }}
                                </small>
                            </div> -->
                        </div>
                    </TabPanel>
                    <TabPanel header="Presentation">
                        <Divider />

                        <Card>
                            <template #header> </template>

                            <template #title>Presentation</template>

                            <template #content>
                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_typeV" class="font-semibold w-6rem">Packing type:</label>
                                            <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packingTypes" @complete="searchPackingType" field="name" dropdown />
                                        </div>
                                        <!-- <pre>{{packing_typeV}}</pre> -->

                                        <FrontEndErrors :errorsNew="errorsNew" name="packing_typeV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="productV" class="font-semibold w-6rem">Product:</label>
                                            <AutoComplete v-model="productV" class="flex-auto" inputId="ac" :suggestions="products" @complete="searchProduct" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="productV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="variantV" class="font-semibold w-6rem">Variant:</label>
                                            <AutoComplete v-model="variantV" class="flex-auto" inputId="ac" :suggestions="variants" @complete="searchVariant" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="variantV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.variant_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="product_typeV" class="font-semibold w-6rem">Product Type:</label>
                                            <AutoComplete v-model="product_typeV" class="flex-auto" inputId="ac" :suggestions="productsType" @complete="searchProductType" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="product_typeV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.product_type_uuid" />
                                    </div>
                                </div>

                                <div class="grid">
                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_qty_dispatchV" class="font-semibold w-6rem">Packing Quantity Dispatch:</label>
                                            <AutoComplete v-model="packing_qty_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsQtyDispatch" @complete="searchPackingQtyDispatch" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="packing_qty_dispatchV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_qty_dispatch" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_type_dispatchV" class="font-semibold w-6rem">Packing Type Dispatch:</label>
                                            <AutoComplete v-model="packing_type_dispatchV" class="flex-auto" inputId="ac" :suggestions="packingsTypesDispatch" @complete="searchPackingTypeDispatch" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="packing_type_dispatchV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_type_dispatch_uuid" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="packing_dispatch_weightV" class="font-semibold w-6rem">Packing Dispatch Weight:</label>
                                            <AutoComplete v-model="packing_dispatch_weightV" class="flex-auto" inputId="ac" :suggestions="packingsWeightDispatch" @complete="searchPackingWeightDispatch" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="packing_dispatch_weightV" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.packing_dispatch_weight" />
                                    </div>

                                    <div class="mb-3 col-12 md:col-6 lg:col-3">
                                        <div class="flex align-items-center">
                                            <label for="username" class="font-semibold w-6rem">Unit type Dispatch:</label>
                                            <AutoComplete v-model="unit_type_dispatch_V" class="flex-auto" inputId="ac" :suggestions="unitsTypeDispatch" @complete="searchUnitsTypeDispatch" field="name" dropdown />
                                        </div>

                                        <FrontEndErrors :errorsNew="errorsNew" name="unit_type_dispatch_V" />
                                        <BackendErrors :name="errorResponseAPI?.errors?.unit_type_dispatch_uuid" />
                                    </div>
                                </div>
                            </template>

                            <template #footer>
                                <Card>
                                    <template #title> {{ packing_qty_dispatchV.name }} X {{ packing_type_dispatchV.name }} X {{ packing_dispatch_weightV.name }} X {{ unit_type_dispatch_V.name }}</template>
                                    <template #content> </template>
                                </Card>
                            </template>
                        </Card>

                        <Divider />

                        <div class="grid">
                            <div class="mb-3 col-12 md:col-6 lg:col-6">
                                <div class="flex align-items-center">
                                    <label for="farm" class="font-semibold w-6rem">Farm :</label>
                                    <AutoComplete v-model="farm" class="flex-auto" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                                </div>
                                <!-- <pre>{{farm}}</pre> -->

                                <FrontEndErrors :errorsNew="errorsNew" name="farm" />
                                <BackendErrors :name="errorResponseAPI?.errors?.farm_uuid" />
                            </div>

                            <div class="mb-3 col-12 md:col-6 lg:col-6">
                                <div class="flex align-items-center">
                                    <label for="company" class="font-semibold w-6rem">Company:</label>
                                    <AutoComplete v-model="company" class="flex-auto" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                                </div>
                                <!-- <pre>{{company}}</pre> -->

                                <FrontEndErrors :errorsNew="errorsNew" name="company" />
                                <BackendErrors :name="errorResponseAPI?.errors?.company_uuid" />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Summarize">
                        <Timeline :value="events" class="mb-3 col-12 md:col-12 lg:col-12">
                            <template #opposite="slotProps">
                                <small class="p-text-secondary">{{ slotProps.item.date }}</small>
                            </template>
                            <template #content="slotProps">
                                {{ slotProps.item.status }}
                            </template>
                        </Timeline>
                    </TabPanel>
                </TabView>

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
        </div>
    </div>
</template>

<style lang="scss" scoped></style>
