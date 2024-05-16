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
const namePage = ' Employees ';
const titlePage = namePage + 'information';
const dataFromComponent = ref();
const Farms = ref([]);
const farms = ref([]);
const GenderList = ref([]);
const DocumentTypeList = ref([]);
const WorkCenterList = ref([]);
const PaymentTypeList = ref([]);
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
let endpoint = ref('/employees');
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
        document_type: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'workCenter.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        document: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        first_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        last_name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        gender_id: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        email: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank_account_number: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        bank_account_doc: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'payment_type.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'farm.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        companyName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] }
    };
};

const documentFrozen = ref(false);
const readAll = async () => {
    loadingData();
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respDocumentTypeList = await getRequest('/lists/documentType');
    if (!respDocumentTypeList.ok) toast.add({ severity: 'error', detail: 'Error' + respDocumentTypeList.error, life: 3000 });
    DocumentTypeList.value = respDocumentTypeList.data.map((comp) => ({ id: comp.id, name: comp.label }));

    const respWorkCenter = await getRequest('/work_centers');
    console.log('respWorkCenter', respWorkCenter);
    if (!respWorkCenter.ok) toast.add({ severity: 'error', detail: 'Error' + respWorkCenter.error, life: 3000 });
    WorkCenterList.value = respWorkCenter.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));

    const respGenderList = await getRequest('/lists/genderType');
    if (!respGenderList.ok) toast.add({ severity: 'error', detail: 'Error' + respGenderList.error, life: 3000 });
    GenderList.value = respGenderList.data.map((comp) => ({ id: comp.id, name: comp.label }));

    const respPaymentType = await getRequest('/payment_types');
    if (!respPaymentType.ok) toast.add({ severity: 'error', detail: 'Error' + respPaymentType.error, life: 3000 });
    PaymentTypeList.value = respPaymentType.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
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
            documento: z.number().min(10000000, 'min length 8').max(999999999999, 'max length 12'),
            first_name: z.string().min(3),
            last_name: z.string().min(3),
            last_name_b: z.string().min(3),
            gender_id: z.object({
                id: z.string(),
                name: z.string().min(3)
            }),
            email: z.string().email(),
            document_type: z.object({
                id: z.string(),
                name: z.string().min(3)
            }),
            bank_account_number: z.number().min(10000000, 'min length 8'),
            bank_account_doc: z.string().min(3),
            payment_type_uuid: z.object({
                id: z.string().min(3),
                name: z.string().min(3)
            }),
            work_center_uuid: z.object({
                id: z.string().min(3),
                name: z.string().min(3)
            }),
            farm_uuid: z
                .object({
                    id: z.string().min(3),
                    name: z.string().min(3)
                })
                .optional()
        })
    )
});
const [documento, documentoProps] = defineField('documento');
const [first_name, first_nameProps] = defineField('first_name');
const [last_name, last_nameProps] = defineField('last_name');
const [last_name_b, last_name_bProps] = defineField('last_name_b');
const [email, emailProps] = defineField('email');
const [bank_account_number, bank_account_numberProps] = defineField('bank_account_number');
const [bank_account_doc, bank_account_docProps] = defineField('bank_account_doc');
const [gender_id] = defineField('gender_id');
const [document_type] = defineField('document_type');
const [payment_type_uuid] = defineField('payment_type_uuid');
const [work_center_uuid] = defineField('work_center_uuid');
const [farm_uuid] = defineField('farm_uuid');

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
    const {
        document: documentoN,
        first_name: firstName,
        last_name: lastName,
        last_name_b: lastNameB,
        email: Email,
        gender: Gender,
        document_type: DocumentType,
        bank_account_number: BankAccountNumber,
        bank_account_doc: BankAccountDoc,
        payment_type: PaymentType,
        workCenter: WorkC,
        farm: Farm
    } = listRowSelect.value[0];

    documento.value = Number(documentoN);
    first_name.value = firstName;
    last_name.value = lastName;
    last_name_b.value = lastNameB;
    gender_id.value = { id: Gender.id, name: Gender.name };
    email.value = Email;
    document_type.value = DocumentTypeList.value.filter((a) => a.id == DocumentType.id)[0];
    bank_account_number.value = Number(BankAccountNumber);
    bank_account_doc.value = BankAccountDoc;
    payment_type_uuid.value = { id: PaymentType.uuid, name: PaymentType.name };
    work_center_uuid.value = { id: WorkC.uuid, name: WorkC.name };
    farm_uuid.value = { id: Farm.id, name: Farm.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const {
        document: documentoN,
        first_name: firstName,
        last_name: lastName,
        last_name_b: lastNameB,
        email: Email,
        gender: Gender,
        document_type: DocumentType,
        bank_account_number: BankAccountNumber,
        bank_account_doc: BankAccountDoc,
        payment_type: PaymentType,
        workCenter: WorkC,
        farm: Farm
    } = listRowSelect.value[0];

    documento.value = Number(documentoN);
    first_name.value = firstName;
    last_name.value = lastName;
    last_name_b.value = lastNameB;
    gender_id.value = { id: Gender.id, name: Gender.name };
    email.value = Email;
    document_type.value = DocumentTypeList.value.filter((a) => a.id == DocumentType.id)[0];
    bank_account_number.value = Number(BankAccountNumber);
    bank_account_doc.value = BankAccountDoc;
    payment_type_uuid.value = { id: PaymentType.uuid, name: PaymentType.name };
    work_center_uuid.value = { id: WorkC.uuid, name: WorkC.name };
    farm_uuid.value = { id: Farm.id, name: Farm.name };

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
        document: values.documento + '',
        first_name: values.first_name,
        last_name: values.last_name,
        last_name_b: values.last_name_b,
        gender_id: values.gender_id.id,
        email: values.email,
        document_type: values.document_type.id,
        bank_account_number: values.bank_account_number + '',
        bank_account_doc: values.bank_account_doc,
        payment_type_uuid: values.payment_type_uuid.id,
        work_center_uuid: values.work_center_uuid.id,
        farm_uuid: values.farm_uuid.id
    };
    console.log('data: ', data);
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
});

const EditRecord = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        document: values.documento + '',
        first_name: values.first_name,
        last_name: values.last_name,
        last_name_b: values.last_name_b,
        gender_id: values.gender_id.id,
        email: values.email,
        document_type: values.document_type.id,
        bank_account_number: values.bank_account_number + '',
        bank_account_doc: values.bank_account_doc,
        payment_type_uuid: values.payment_type_uuid.id,
        work_center_uuid: values.work_center_uuid.id,
        farm_uuid: values.farm_uuid.id
    };
    console.log('DATA: ', data);

    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const cloneRecord = handleSubmitNew(async (values) => {
    const data = {
        document: values.documento + '',
        first_name: values.first_name,
        last_name: values.last_name,
        last_name_b: values.last_name_b,
        gender_id: values.gender_id.id,
        email: values.email,
        document_type: values.document_type.id,
        bank_account_number: values.bank_account_number + '',
        bank_account_doc: values.bank_account_doc,
        payment_type_uuid: values.payment_type_uuid.id,
        work_center_uuid: values.work_center_uuid.id,
        farm_uuid: values.farm_uuid.id
    };
    console.log('data: ', data);
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
                    <Button v-if="ability.can('producto_crear')" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                    <Divider v-if="ability.can('producto_crear')" layout="vertical" />
                    <Button v-if="ability.can('producto_editar')" :disabled="!(selectedRegisters.length > 0 && selectedRegisters.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                    <Divider v-if="ability.can('producto_editar')" layout="vertical" />
                    <Button :disabled="!(selectedRegisters.length > 0 && selectedRegisters.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                    <Divider layout="vertical" />
                    <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                    <Divider layout="vertical" />
                    <Button v-if="ability.can('producto_eliminar')" :disabled="!selectedRegisters.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
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
                :globalFilterFields="[
                    'workCenter.name',
                    'document',
                    'first_name',
                    'last_name',
                    'gender.name',
                    'email',
                    'bank_account_number',
                    'bank_account_doc',
                    'payment_type.name',
                    'farm.name',
                    'company.name',
                    'created_at',
                    'updated_at',
                    'status.name'
                ]"
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

                <template #empty> No customers found. </template>
                <template #loading> Loading customers data. Please wait. </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
                <Column v-if="column?.some((obj) => obj.field === 'document')" field="document" header=" Document" sortable :frozen="documentFrozen">
                    <template #header>
                        <ToggleButton v-model="documentFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="" offLabel="" />
                        <div>&nbsp;</div>
                    </template>

                    <template #body="{ data }">
                        {{ data.document }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by document" />
                    </template>
                </Column>

                <Column filterField="document_type" header="Type of Document" sortable>
                    <template #body="{ data }">
                        {{ data.document_type.name }}
                    </template>

                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
                    </template>
                </Column>

                <Column v-if="column?.some((obj) => obj.field === 'first_name')" field="first_name" header="Name" sortable>
                    <template #body="{ data }">
                        {{ data.first_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by name" />
                    </template>
                </Column>

                <Column field="last_name" header="Last Name" sortable>
                    <template #body="{ data }">
                        {{ data.last_name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by last name" />
                    </template>
                </Column>

                <Column field="gender" filterField="gender_id" header="Gender" sortable>
                    <template #body="{ data }">
                        {{ data.gender.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by gender" />
                    </template>
                </Column>

                <Column field="email" header="Email" sortable>
                    <template #body="{ data }">
                        {{ data.email }}
                    </template>

                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by email" />
                    </template>
                </Column>

                <Column field="workCenterName" filterField="workCenter.name" header="Work Center Name" sortable>
                    <template #body="{ data }">
                        {{ data.workCenter.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by workcenter" />
                    </template>
                </Column>

                <Column field="bankAccountNumber" filterField="bank_account_number" header="Bank Account Number" sortable>
                    <template #body="{ data }">
                        {{ data.bank_account_number }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account number" />
                    </template>
                </Column>

                <Column field="bankAccountDoc" filterField="bank_account_doc" header="Bank Account Document" sortable>
                    <template #body="{ data }">
                        {{ data.bank_account_doc }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by Bank Account Document" />
                    </template>
                </Column>

                <Column field="paymentType" filterField="payment_type.name" header="Payment Type" sortable>
                    <template #body="{ data }">
                        {{ data.payment_type.name }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by payment type" />
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

                <Column field="companyName" filterField="companyName" header="Company Name" sortable>
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
                        <Tag :value="data.status.name" :severity="data.status.color" />
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText v-model="filterModel.value" type="text" class="p-column-filter" placeholder="Search by status" />
                    </template>
                </Column>
            </DataTable>

            <Dialog v-model:visible="formDialogNew" modal :header="formDialogNewTitle" class="p-fluid mx-auto">
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="gender_id" class="font-bold block mb-2"> Gender </label>
                        <Dropdown v-model="gender_id" :options="GenderList" optionLabel="name" class="w-full md:w-15rem" inputId="gender_id" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['gender_id'] }">
                                {{ errorsNew.gender_id }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="first_name" class="font-bold block mb-2"> First Name </label>
                        <InputText id="username" v-model="first_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="first_nameProps" inputId="first_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['first_name'] }">
                                {{ errorsNew.first_name }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="last_name" class="font-bold block mb-2"> Surname </label>
                        <InputText id="username" v-model="last_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_nameProps" inputId="last_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name'] }">
                                {{ errorsNew.last_name }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="last_name_b" class="font-bold block mb-2"> Second Surname </label>
                        <InputText id="username" v-model="last_name_b" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_name_bProps" inputId="last_name_b" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name_b'] }">
                                {{ errorsNew.last_name_b }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="document_type" class="font-bold block mb-2"> Document Type </label>
                        <Dropdown v-model="document_type" :options="DocumentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="document_type" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['document_type'] }">
                                {{ errorsNew.document_type }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="documento" class="font-bold block mb-2"> Document </label>
                        <InputNumber v-model="documento" class="w-full md:w-15rem" inputId="documento" v-bind="documentoProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['documento'] }">
                                {{ errorsNew.documento }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="bank_account_number" class="font-bold block mb-2"> Bank Account Number </label>
                        <InputNumber v-model="bank_account_number" class="w-full md:w-15rem" inputId="bank_account_number" v-bind="bank_account_numberProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_number'] }">
                                {{ errorsNew.bank_account_number }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="bank_account_doc" class="font-bold block mb-2"> Bank Account Doc </label>
                        <InputText id="bank_account_doc" v-model="bank_account_doc" class="flex-auto md:w-15rem" autocomplete="off" v-bind="bank_account_docProps" inputId="bank_account_doc" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_doc'] }">
                                {{ errorsNew.bank_account_doc }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="payment_type_uuid" class="font-bold block mb-2"> Payment Type </label>
                        <Dropdown v-model="payment_type_uuid" :options="PaymentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="payment_type_uuid" v-bind="payment_typeProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['payment_type_uuid'] }">
                                {{ errorsNew.payment_type_uuid }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="work_center_uuid" class="font-bold block mb-2"> Work Center </label>
                        <Dropdown v-model="work_center_uuid" :options="WorkCenterList" optionLabel="name" class="w-full md:w-15rem" inputId="work_center_uuid" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['work_center_uuid'] }">
                                {{ errorsNew.work_center_uuid }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="email" class="font-bold block mb-2"> Email </label>
                        <InputText id="email" v-model="email" class="flex-auto md:w-15rem" autocomplete="off" v-bind="emailProps" inputId="email" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['email'] }">
                                {{ errorsNew.email }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm_uuid" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
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
                        <label for="gender_id" class="font-bold block mb-2"> Gender </label>
                        <Dropdown v-model="gender_id" :options="GenderList" optionLabel="name" class="w-full md:w-15rem" inputId="gender_id" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['gender_id'] }">
                                {{ errorsNew.gender_id }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="first_name" class="font-bold block mb-2"> First Name </label>
                        <InputText id="username" v-model="first_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="first_nameProps" inputId="first_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['first_name'] }">
                                {{ errorsNew.first_name }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="last_name" class="font-bold block mb-2"> Surname </label>
                        <InputText id="username" v-model="last_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_nameProps" inputId="last_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name'] }">
                                {{ errorsNew.last_name }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="last_name_b" class="font-bold block mb-2"> Second Surname </label>
                        <InputText id="username" v-model="last_name_b" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_name_bProps" inputId="last_name_b" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name_b'] }">
                                {{ errorsNew.last_name_b }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="document_type" class="font-bold block mb-2"> Document Type </label>
                        <Dropdown v-model="document_type" :options="DocumentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="document_type" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['document_type'] }">
                                {{ errorsNew.document_type }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="documento" class="font-bold block mb-2"> Document </label>
                        <InputNumber v-model="documento" class="w-full md:w-15rem" inputId="documento" v-bind="documentoProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['documento'] }">
                                {{ errorsNew.documento }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="bank_account_number" class="font-bold block mb-2"> Bank Account Number </label>
                        <InputNumber v-model="bank_account_number" class="w-full md:w-15rem" inputId="bank_account_number" v-bind="bank_account_numberProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_number'] }">
                                {{ errorsNew.bank_account_number }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="bank_account_doc" class="font-bold block mb-2"> Bank Account Doc </label>
                        <InputText id="bank_account_doc" v-model="bank_account_doc" class="flex-auto md:w-15rem" autocomplete="off" v-bind="bank_account_docProps" inputId="bank_account_doc" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_doc'] }">
                                {{ errorsNew.bank_account_doc }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="payment_type_uuid" class="font-bold block mb-2"> Payment Type </label>
                        <Dropdown v-model="payment_type_uuid" :options="PaymentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="payment_type_uuid" v-bind="payment_typeProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['payment_type_uuid'] }">
                                {{ errorsNew.payment_type_uuid }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="work_center_uuid" class="font-bold block mb-2"> Work Center </label>
                        <Dropdown v-model="work_center_uuid" :options="WorkCenterList" optionLabel="name" class="w-full md:w-15rem" inputId="work_center_uuid" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['work_center_uuid'] }">
                                {{ errorsNew.work_center_uuid }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="email" class="font-bold block mb-2"> Email </label>
                        <InputText id="email" v-model="email" class="flex-auto md:w-15rem" autocomplete="off" v-bind="emailProps" inputId="email" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['email'] }">
                                {{ errorsNew.email }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm_uuid" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
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
                        <label for="gender_id" class="font-bold block mb-2"> Gender </label>
                        <Dropdown v-model="gender_id" :options="GenderList" optionLabel="name" class="w-full md:w-15rem" inputId="gender_id" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['gender_id'] }">
                                {{ errorsNew.gender_id }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="first_name" class="font-bold block mb-2"> First Name </label>
                        <InputText id="username" v-model="first_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="first_nameProps" inputId="first_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['first_name'] }">
                                {{ errorsNew.first_name }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="last_name" class="font-bold block mb-2"> Surname </label>
                        <InputText id="username" v-model="last_name" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_nameProps" inputId="last_name" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name'] }">
                                {{ errorsNew.last_name }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="last_name_b" class="font-bold block mb-2"> Second Surname </label>
                        <InputText id="username" v-model="last_name_b" class="flex-auto md:w-15rem" autocomplete="off" v-bind="last_name_bProps" inputId="last_name_b" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['last_name_b'] }">
                                {{ errorsNew.last_name_b }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="document_type" class="font-bold block mb-2"> Document Type </label>
                        <Dropdown v-model="document_type" :options="DocumentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="document_type" v-bind="gender_idProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['document_type'] }">
                                {{ errorsNew.document_type }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="documento" class="font-bold block mb-2"> Document </label>
                        <InputNumber v-model="documento" class="w-full md:w-15rem" inputId="documento" v-bind="documentoProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700 ': errorsNew['documento'] }">
                                {{ errorsNew.documento }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="bank_account_number" class="font-bold block mb-2"> Bank Account Number </label>
                        <InputNumber v-model="bank_account_number" class="w-full md:w-15rem" inputId="bank_account_number" v-bind="bank_account_numberProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_number'] }">
                                {{ errorsNew.bank_account_number }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="bank_account_doc" class="font-bold block mb-2"> Bank Account Doc </label>
                        <InputText id="bank_account_doc" v-model="bank_account_doc" class="flex-auto md:w-15rem" autocomplete="off" v-bind="bank_account_docProps" inputId="bank_account_doc" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['bank_account_doc'] }">
                                {{ errorsNew.bank_account_doc }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-3 p-fluid">
                    <div class="flex-auto">
                        <label for="payment_type_uuid" class="font-bold block mb-2"> Payment Type </label>
                        <Dropdown v-model="payment_type_uuid" :options="PaymentTypeList" optionLabel="name" class="w-full md:w-15rem" inputId="payment_type_uuid" v-bind="payment_typeProps" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['payment_type_uuid'] }">
                                {{ errorsNew.payment_type_uuid }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="work_center_uuid" class="font-bold block mb-2"> Work Center </label>
                        <Dropdown v-model="work_center_uuid" :options="WorkCenterList" optionLabel="name" class="w-full md:w-15rem" inputId="work_center_uuid" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['work_center_uuid'] }">
                                {{ errorsNew.work_center_uuid }}
                            </small>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap gap-3 mb-5 p-fluid">
                    <div class="flex-auto">
                        <label for="email" class="font-bold block mb-2"> Email </label>
                        <InputText id="email" v-model="email" class="flex-auto md:w-15rem" autocomplete="off" v-bind="emailProps" inputId="email" :useGrouping="false" />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['email'] }">
                                {{ errorsNew.email }}
                            </small>
                        </div>
                    </div>
                    <div class="flex-auto">
                        <label for="farm" class="font-bold block mb-2"> Farm </label>
                        <AutoComplete v-model="farm_uuid" class="w-full md:w-15rem" inputId="farm" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                        <div class="flex-auto">
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                                {{ errorsNew.farm }}
                            </small>
                        </div>
                    </div>
                </div>

                <div class="flex justify-content-end gap-2">
                    <Button type="button" label="Cancel" severity="secondary" @click="formDialogClone = false" />
                    <Button type="button" label="Save" @click="cloneRecord()" />
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
                        <Chip :label="item.first_name + ' ' + item.last_name" removable @remove="remove(item)" icon="pi pi-ban" />
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
