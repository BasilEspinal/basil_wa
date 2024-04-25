<script setup>
import { ref, watch, provide, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import Table from '@/components/Table.vue';
import useRestrictionVarieties from '@/composables/Product/Varieties/restrictionsVarieties.js';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest, putRequest, deleteRequest } = useData();
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as XLSX from 'xlsx';
import ability from '@/service/ability.js';
import { z } from 'zod';
import { saveAs } from 'file-saver';

const dataFromComponent = ref();
const { conditionsVarieties } = useRestrictionVarieties();

const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const formDialogNew = ref(false);
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);

const allLabels = ref([]);
allLabels.value = Object.values(conditionsVarieties).map((condition) => condition.fieldName);
const toast = useToast();
const filename = ref('table');
const headerNamesRow = ref([]);
const isChanging = ref(false);
let endpoint = ref('/variants');

const getIndexByLabel = (fieldName) => {
    const index = headerNamesRow.value.findIndex((objeto) => objeto.label === fieldName);
    return index !== -1 ? index : null;
};
onBeforeMount(async () => {
    readAll();
});

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
    dataFromComponent.value = response.data;
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
            codigo: z.string().min(4),
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
const [codigo, codigoProps] = defineField('codigo');
const [farm] = defineField('farm');
const [company] = defineField('company');

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });

const listRowSelect = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
const onHeaderNames = (data) => (headerNames.value = data);

provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);

const createVarieties = handleSubmitNew(async (values) => {
    const data = {
        code: values.codigo,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
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

const openNew = () => {
    resetForm();
    formDialogNew.value = true;
};

const openEdit = () => {
    resetForm();
    const { code, company: empresa, farm: finca, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
    codigo.value = code;
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: finca.uuid, name: finca.name };

    formDialogEdit.value = true;
};

const openClone = () => {
    resetForm();
    const { company: empresa, farm: finca, name: nombre } = listRowSelect.value[0];

    name.value = nombre;
    company.value = { id: empresa.uuid, name: empresa.name };
    farm.value = { id: finca.uuid, name: finca.name };
    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const EditVarieties = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        code: values.codigo,
        name: values.name
    };
    // company_id: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
    // farm_id: values.farm ? values.farm : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const CloneVarieties = handleSubmitNew(async (values) => {
    const data = {
        code: values.codigo,
        name: values.name,
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9',
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97'
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
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

const ExportVarieties = () => {
    const eventos = exportAll.value.name == 'ALL' ? dataFromComponent.value.data.map((data) => data) : listRowSelect.value.map((data) => data);
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

const DeleteVarieties = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach( async item => {
            const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        loadingData();
        toast.add({ severity: 'success', summary: 'Deleted Varieties', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        listRowSelect.value = [];
    }
};

const remove = (aver) => {
    const index = listRowSelect.value.findIndex(x => x.id === aver.id);
    if (index !== -1) {
        listRowSelect.value.splice(index, 1);
    }
};
</script>

<template>
    <div>
    <div class="card">
        <h1>Información de tipo de Variedades</h1>
    </div>

    <div class="card">
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
        <Table title="" path-api="/unit_types" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataGot="dataFromComponent" :allLabels="allLabels" />

        <Dialog v-model:visible="formDialogNew" modal :header="'Create new varieties'" class="p-fluid text-center mx-auto">
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
                    <InputText id="username" v-model="codigo" class="flex-auto" autocomplete="off" v-bind="codigoProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['codigo'] }">
                    {{ errorsNew.codigo }}
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
                <Button type="button" label="Save" @click="createVarieties()" />
            </div>
        </Dialog>

        <Dialog v-model:visible="formDialogEdit" modal :header="'Edit varieties'" class="p-fluid text-center mx-auto">
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
                    <InputText id="username" v-model="codigo" class="flex-auto" autocomplete="off" v-bind="codigoProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['codigo'] }">
                    {{ errorsNew.codigo }}
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
                    <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="EditVarieties"
                        field="name" dropdown />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                    {{ errorsNew.company }}
                </small>
            </div> -->

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                <Button type="button" label="Save" @click="EditVarieties()" />
            </div>
        </Dialog>

        <Dialog v-model:visible="formDialogClone" modal :header="'Clone varieti'" class="p-fluid text-center mx-auto">
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
                    <InputText id="username" v-model="codigo" class="flex-auto" autocomplete="off" v-bind="codigoProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['codigo'] }">
                    {{ errorsNew.codigo }}
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
                <Button type="button" label="Save" @click="CloneVarieties()" />
            </div>
        </Dialog>

        <Dialog v-model:visible="formDialogExport" :style="{ width: '290px' }" header="Export varieties" :modal="true" class="p-fluid">
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
                <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportVarieties" />
            </template>
        </Dialog>

        <Dialog v-model:visible="formDialogDelete" :style="{ width: '450px' }" header="Delete" :modal="true">
            <label for="username" class="text-2xl font-medium w-6rem">
                Are you sure you want to delete the selected ones?
            </label>
            <div class="card flex flex-wrap mt-2 gap-2">
                <div v-for="item in listRowSelect" :key="item.id">
                    <Chip :label="item.name" removable @remove="remove(item)" icon="pi pi-ban" />
                </div>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="formDialogDelete = false" />
                <Button type="button" label="Delete" @click="DeleteVarieties" />
            </div>
        </Dialog>

        <Toast />
    </div>
</div>
</template>

<style lang="scss" scoped>
.text-danger {
    color: red;
}
</style>
