<script setup>
import Table from '@/components/Table.vue';
import { ref, watch, provide, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import useRestrictionProducts from '@/composables/Product/Products/restrictionsProducts';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';  
const { getRequest, postRequest, putRequest, deleteRequest } = useData();

import ability from '@/service/ability.js';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { saveAs } from 'file-saver';

const dataFromComponent = ref();
const allLabels = ref([]);
const { conditionsProducts } = useRestrictionProducts();
allLabels.value = Object.values(conditionsProducts).map((condition) => condition.fieldName);
let endpoint = ref('/products');
const toast = useToast();
const filename = ref('table');
const isChanging = ref(false);

const extenciones = ref([{ name: 'CSV' }, { name: 'XLS' }]);
const optionsEsport = ref([{ name: 'ALL' }, { name: 'SELECTED' }]);
const format = ref({ name: 'CSV' });
const exportAll = ref({ name: 'ALL' });

const Farms = ref([]);
const farms = ref([]);
const Compan = ref([]);
const compa = ref([]);

const formDialogNew = ref(false);
const formDialogEdit = ref(false);
const formDialogClone = ref(false);
const formDialogExport = ref(false);
const formDialogDelete = ref(false);

const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    validationSchema: toTypedSchema(
        z.object({
            name: z.string().min(4),
            slug: z.string().min(4),
            shortname: z.string().min(3),
            cultivate: z.boolean(),
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
const [shortname, shortnameProps] = defineField('shortname');
const [slug, codigoProps] = defineField('slug');
const [cultivate] = defineField('cultivate', false);
const [farm] = defineField('farm');
const [company] = defineField('company');

const readAll = async () => {
    loadingData();
    const respFarms = await getRequest('/farms');
    if (!respFarms.ok) toast.add({ severity: 'error', detail: 'Error' + respFarms.error, life: 3000 });
    Farms.value = respFarms.data.data.map((farm) => ({ id: farm.uuid, name: farm.name }));

    const respCompan = await getRequest('/companies');
    if (!respCompan.ok) toast.add({ severity: 'error', detail: 'Error' + respCompan.error, life: 3000 });
    Compan.value = respCompan.data.data.map((comp) => ({ id: comp.uuid, name: comp.name }));
};


onBeforeMount(async () => {
    readAll();
});

const loadingData = async () => {
    const response = await getRequest(endpoint.value);
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dataFromComponent.value = response.data;};

watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll();
        console.log(newValue);
        console.log(oldValue);
    }
);

const listRowSelect = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
const onHeaderNames = (data) => (headerNames.value = data);

provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);
//////////////////////////////////////////////////////////////////////
//Functions for toolbar
const openEdit = () => {
    resetForm();
    const { slug: slugvalue, name: nombre, short_name, cultivated } = listRowSelect.value[0];

    name.value = nombre;
    slug.value = slugvalue;
    cultivate.value = cultivated;
    shortname.value = short_name;

    formDialogEdit.value = true;
};

const openNew = () => {
    resetForm();
    cultivate.value = false;
    formDialogNew.value = true;
};

const openClone = () => {
    resetForm();
    const { name: nombre, short_name, cultivated, farm: finca, company: empresa } = listRowSelect.value[0];

    name.value = nombre;
    cultivate.value = cultivated;
    shortname.value = short_name;
    farm.value = { id: finca.uuid, name: finca.name };
    company.value = { id: empresa.uuid, name: empresa.name };

    formDialogClone.value = true;
};

const openExport = () => {
    format.value = { name: 'CSV' };
    formDialogExport.value = true;
};

const openDelete = () => {
    formDialogDelete.value = true;
};

const createProducts = handleSubmitNew(async (values) => {
    const data = {
        name: values.name,
        slug: values.slug,
        short_name: values.shortname,
        cultivated: values.cultivate,
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97',
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9'
    };
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();
    formDialogNew.value = false;
});

const editProducts = handleSubmitNew(async (values) => {
    const { uuid } = listRowSelect.value[0];
    const data = {
        slug: values.slug,
        name: values.name,
        cultivated: values.cultivate
    };
    const restp = await putRequest(endpoint.value, data, uuid);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Edit', detail: restp.ok ? 'Editado' : restp.error, life: 3000 });
    loadingData();
    formDialogEdit.value = false;
});

const cloneProducts = handleSubmitNew(async (values) => {
    const data = {
        name: values.name,
        slug: values.slug,
        short_name: values.shortname,
        cultivated: values.cultivate,
        farm_uuid: values.farm ? values.farm.id : '8ef93a7b-31bf-4233-af80-481020e9cf97',
        company_uuid: values.company ? values.company.id : '25b4319c-e93f-4411-936c-118060f5e7c9'
    };
    const restp = await postRequest(endpoint.value, data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Clone', detail: restp.ok ? 'Clonado' : restp.error, life: 3000 });
    loadingData();
    formDialogClone.value = false;
});

const ExportProducts= () => {
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

const DeleteVarieties = async () => {
    formDialogDelete.value = false;

    try {
        const deletePromises = [];
        listRowSelect.value.forEach( async item => {
            const deletePromise = await deleteRequest(endpoint.value, item.uuid);
            deletePromises.push(deletePromise);
        });
        await Promise.all(deletePromises);
        toast.add({ severity: 'success', summary: 'Deleted Varieties', detail: 'Deleted', life: 3000 });
    } catch (error) {
        console.error('Error deleting:', error);
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error deleting', life: 3000 });
    } finally {
        setTimeout(() => {
            loadingData();
        }, 100);
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
    <div class="card">
        <h1>Información de productos</h1>
    </div>

    <div class="card">
        <Toolbar>
            <template #center>
                <Button  v-if="ability.can('producto_crear')" :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mb-2 mt-2" @click="openNew" size="large" />
                <Divider v-if="ability.can('producto_crear')" layout="vertical" />
                <Button  v-if="ability.can('producto_editar')" :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mb-2 mt-2" @click="openEdit" size="large" />
                <Divider v-if="ability.can('producto_editar')" layout="vertical" />
                <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mb-2 mt-2" @click="openClone" size="large" />
                <Divider layout="vertical" />
                <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mb-2 mt-2" @click="openExport" size="large" />
                <Divider layout="vertical" />
                <Button v-if="ability.can('producto_eliminar')" :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mb-2 mt-2" @click="openDelete" size="large" />
            </template>
        </Toolbar>
        <Table v-if="ability.can('producto_listado')" title="" path-api="" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataGot="dataFromComponent" :allLabels="allLabels" />

        <Dialog v-model:visible="formDialogNew" :style="{ width: '500px' }" modal :header="'Create new Product'" class="p-fluid text-center mx-auto">
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold mr-2">Name :</label>
                        <InputText id="username" class="w-18rem mr-3" v-model="name" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.name }}
                    </small>
                </div>
                <div class="flex justify-content-end">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold mr-2">Cultivated:</label>
                        <InputSwitch v-model="cultivate" />
                    </div>
                </div>
            </div>
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-5rem">Slug:</label>
                        <InputText id="username" v-model="slug" class="flex-auto" autocomplete="off" v-bind="codigoProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['slug'] }">
                        {{ errorsNew.slug }}
                    </small>
                </div>
                <div class="ml-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-6rem mr-1">Shortname:</label>
                        <InputText id="username" v-model="shortname" class="flex-auto" autocomplete="off" v-bind="shortnameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.shortname }}
                    </small>
                </div>
            </div>
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-5rem">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                </div>
                <div class="ml-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-8rem">Companny:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                </div>
            </div>

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="formDialogNew = false" />
                <Button type="button" label="Save" @click="createProducts()" />
            </div>
        </Dialog>

        <Dialog v-model:visible="formDialogEdit" modal :header="'Edit product'" class="p-fluid text-center mx-auto">
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-8rem">Name :</label>
                    <InputText id="username" v-model="name" class="flex-auto" autocomplete="off" v-bind="nameProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                    {{ errorsNew.name }}
                </small>
            </div>
            <div class="mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-8rem">Slug :</label>
                    <InputText id="username" v-model="slug" class="flex-auto" autocomplete="off" v-bind="slugProps" />
                </div>
                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['slug'] }">
                    {{ errorsNew.slug }}
                </small>
            </div>
            <div class="justify-content-center mb-3">
                <div class="flex align-items-center gap-3 mb-1">
                    <label for="username" class="font-semibold w-6rem mr-2">Cultivated:</label>
                    <InputSwitch v-model="cultivate" />
                </div>
            </div>
            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="formDialogEdit = false" />
                <Button type="button" label="Save" @click="editProducts()" />
            </div>
        </Dialog>

        <Dialog v-model:visible="formDialogClone" :style="{ width: '500px' }" modal :header="'Clone Product'" class="p-fluid text-center mx-auto">
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold mr-2">Name :</label>
                        <InputText id="username" class="w-18rem mr-3" v-model="name" autocomplete="off" v-bind="nameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.name }}
                    </small>
                </div>
                <div class="flex justify-content-end">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold mr-2">Cultivated:</label>
                        <InputSwitch v-model="cultivate" />
                    </div>
                </div>
            </div>
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-5rem">Slug:</label>
                        <InputText id="username" v-model="slug" class="flex-auto" autocomplete="off" v-bind="codigoProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['slug'] }">
                        {{ errorsNew.slug }}
                    </small>
                </div>
                <div class="ml-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-6rem mr-1">Shortname:</label>
                        <InputText id="username" v-model="shortname" class="flex-auto" autocomplete="off" v-bind="shortnameProps" />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['name'] }">
                        {{ errorsNew.shortname }}
                    </small>
                </div>
            </div>
            <div class="flex mb-3">
                <div>
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-5rem">Farm :</label>
                        <AutoComplete v-model="farm" inputId="ac" :suggestions="farms" @complete="searchFarms" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['farm'] }">
                        {{ errorsNew.farm }}
                    </small>
                </div>
                <div class="ml-3">
                    <div class="flex align-items-center">
                        <label for="username" class="font-semibold w-8rem">Companny:</label>
                        <AutoComplete v-model="company" inputId="ac" :suggestions="compa" @complete="searchCompannies" field="name" dropdown />
                    </div>
                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['company'] }">
                        {{ errorsNew.company }}
                    </small>
                </div>
            </div>

            <div class="flex justify-content-end gap-2">
                <Button type="button" label="Cancel" severity="secondary" @click="formDialogClone = false" />
                <Button type="button" label="Save" @click="cloneProducts()" />
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
                <Button label="Export" icon="pi pi-check" class="p-button-text" @click="ExportProducts" />
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
</template>

<style lang="scss" scoped>
.text-danger {
    color: red;
    /* O el color que desees */
}
</style>
