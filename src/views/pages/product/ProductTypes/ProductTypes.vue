
<template>
    <h1>Información tipo de productos </h1>
    <div class="card">



        <div class="grid">
            <div class="col-xs-12 col-sm-6 col-md-4 mb-2 text-center mx-auto">
                <Toolbar class="bg-gray-900 shadow-2"
                    style="border-radius: 3rem; background-image: linear-gradient(to right, var(--green-100), var(--green-200))">
                    <template v-slot:start>
                        <div>
                            <Button :disabled="headerNames.length > 0" label="New" icon="pi pi-plus"
                                class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                            <!-- <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i> -->
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit"
                                icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit"
                                size="large" />
                            <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone"
                                icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone"
                                size="large" />
                            <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import"
                                class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                            <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash"
                                class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />

                        </div>
                    </template>
                </Toolbar>

            </div>


            <Dialog v-model:visible="formDialog" :style="{ width: '700px' }" header="Unit Types Details" :modal="true"
                class="p-fluid">
                <div class="formgrid grid">
                    <!-- <pre>{{ listRowSelect}}</pre> -->


                    <div v-for="key in conditionsProductsTypes " :key="key" class="field">


                        <div class="field col">
                            <!-- <div v-if="key.type === 'text' && (key.label === 'name' || key.label === 'code')" class="field col"> -->

                            <!-- <label v-text="key.label"></label> -->
                            <!-- <pre>{{conditionsProducts }}</pre> -->

                            <label :for="key.label" class="ml-2"> {{ key.label }} </label>
                            <!-- <pre>{{ listRowSelect.length}}</pre> -->

                            <!-- <pre>{{ headerNamesRow }}</pre> -->

                            <div v-if="listRowSelect.length == 0">
                                <component v-model="headerNamesRow[getIndexByLabel(key.fieldName)].data"
                                    :is='key.typeDataForm' :label="key.label" :inputId="key.label" :options="options"
                                    aria-labelledby="basic" :placeholder="key.label" />
                            </div>
                            <div v-else>
                                <component v-model="headerNamesRow[getIndexByLabel(key.fieldName)].data"
                                    :is="key.typeDataForm" :label="key.label" :inputId="key.label" :options="options"
                                    aria-labelledby="basic" :placeholder="key.label" />

                            </div>


                            <!-- <InputText id="name" v-model="key.data" :required="true" integeronly /> -->


                            <div v-if="isServerError && allLabels.includes(key.fieldName)" class="text-danger">
                                <div v-for="errorKey in Object.keys(serverError)" :key="errorKey" class="text-danger">
                                    <span class="text-danger" v-if="key.fieldName == errorKey"
                                        v-text="`${serverError[errorKey]}`"></span>

                                </div>
                            </div>

                        <!-- <div v-if="isServerError && conditionsProducts .code.label == key.label" class="text-danger">
                                <div v-for="errorKey in Object.keys(serverError)" :key="errorKey" class="text-danger">
                                    <span class="text-danger" v-if="key.label == errorKey"
                                        v-text="`${serverError[errorKey]}`"></span>

                                </div>
                                </div> -->


                        </div>
                    </div>
                </div>
                <template #footer>
                    <div>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                        <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveRecord" />

                    </div>
                </template>
            </Dialog>

            <Dialog v-model:visible="exportDialog" :style="{ width: '280px' }" header="Unit Types Details" :modal="true"
                class="p-fluid">
                <div class="field col">
                    <label>File name</label>
                    <InputText id="name" v-model="filename" :required="true" integeronly />
                    <span class="p-float-label mt-5">
                        <Dropdown v-model="format" :options="extenciones" optionLabel="name"
                            :class="{ 'p-invalid w-full md:w-14rem': format == '', ' w-full md:w-14rem': format != '' }" />
                        <label for="cs-city">Format</label>
                    </span>
                </div>
                <template #footer>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="exportDialog = false" />
                    <Button label="Export" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
                </template>
            </Dialog>


            <Dialog v-model:visible="deleteRecords" :style="{ width: '450px' }" header="Confirm" :modal="true">
                <div class="flex align-items-center " v-for="item in headerNamesRow" :key="item">
                    <Checkbox class="mr-2" v-model="item.selecti" :binary="true" />
                    <label :for="item.id"> {{ item.label }} </label>
                    <i class="pi pi-exclamation-triangle ml-3 mb-2" style="font-size: 2rem" />
                </div>

                <div class="flex align-items-center justify-content-center"><br><br><span>Are you sure you want to delete
                        the selected ones?</span></div>

                <template #footer>
                    <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteRecords = false" />
                    <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="saveRecord" />
                </template>
            </Dialog>

            <Toast />
        </div>


        <Table title="" path-api="/unit_types" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect"
            :dataGot="dataFromComponent" :allLabels="allLabels" />

    </div>
</template>

<script setup>


import Table from '@/components/Table.vue';
import { ref, watch, provide, onBeforeMount } from 'vue';
import { useToast } from 'primevue/usetoast';
import useRestrictionProductsTypes from '@/composables/Product/ProductsTypes/restrictionProductsTypes';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js'
import ToolbarComponet from '@/components/ToolbarComponet.vue';

const { getAllResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI } = useDataAPI();
const requestDataDelete = {}
const dataFromComponent = ref();
const allLabels = ref([])
const { conditionsProductsTypes } = useRestrictionProductsTypes();
allLabels.value = Object.values(conditionsProductsTypes).map(condition => condition.fieldName);
let endpoint = ref("/product_types")
const idEditRecord = ref()
const toast = useToast();
const formDialog = ref(false);
const deleteRecords = ref(false);
const exportDialog = ref(false);
const mode = ref('');
const filename = ref('table');
const headerNamesRow = ref([]);
const isChanging = ref(false);
let dataTmp = ref({});

const getIndexByLabel = (fieldName) => {
    const index = headerNamesRow.value.findIndex(objeto => objeto.label === fieldName);
    return index !== -1 ? index : null;
};
onBeforeMount(async () => {
    readAll(endpoint.value);
});

const readAll = async (endpoint) => {

    await getAllResponseAPI(endpoint);
    dataFromComponent.value = dataResponseAPI.value;
    // dataFromComponent.value = JSON.parse(JSON.stringify(dataFromComponent.value, null, 2));
};
watch(
    () => dataFromComponent.value,
    (newValue, oldValue) => {

    }
);
watch(
    () => isChanging.value,
    (newValue, oldValue) => {
        readAll(endpoint.value)
        console.log(newValue)
        console.log(oldValue)
    }
);

let serverError = ref(null);
let isServerError = ref(false);
const newRecord = async (requestDataUnitTypes, endpoint) => {
    await postResponseAPI(requestDataUnitTypes, endpoint);
    serverError.value = errorResponseAPI.value;
    if (serverError.value._rawValue != "") {
        isServerError.value = true
        toast.add({ severity: 'Error', summary: 'There are some errores', detail: 'Must correct some mistakes', life: 3000 });
    }
    else {
        isChanging.value = true
        isServerError.value = false
        hideDialog();
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
    }


};

const updateRecord = async (requestDataUnitTypes, id, endpoint) => {
    await putResponseAPI(requestDataUnitTypes, endpoint, id);

    serverError.value = errorResponseAPI.value;
    if (serverError.value._rawValue != "") {
        isServerError.value = true
        toast.add({ severity: 'Error', summary: 'There are some errores', detail: 'Must correct some mistakes', life: 3000 });
    }
    else {
        isChanging.value = true
        isServerError.value = false
        hideDialog();
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
    }
};
const dropRecord = async (id, endpoint) => {
    await deleteResponseAPI(requestDataDelete, endpoint, id);
    serverError.value = errorResponseAPI.value;
    if (serverError.value._rawValue != "") {
        isServerError.value = true
        toast.add({ severity: 'Error', summary: 'There are some errores', detail: 'Must correct some mistakes', life: 3000 });
    }
    else {
        isChanging.value = true
        isServerError.value = false
        hideDialog();
        toast.add({ severity: 'success', summary: 'Successful', detail: 'Done', life: 3000 });
    }
};
const extenciones = ref([
    {
        name: 'CSV',
        code: true
    },
    {
        name: 'XLS',
        code: false
    }
]);
const format = ref('');

let requestData = {}
const hideDialog = () => {
    formDialog.value = false;
};

const listRowSelect = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
};
let headerNames = ref([]);
const onHeaderNames = (data) => (
    headerNames.value = data

);


provide('isChanging', isChanging);
watch(listRowSelect, RowSelect);
const openEdit = () => {
    mode.value = 'EDIT';
    headerNamesRow.value = [];
    console.log("Entré al edit")
    for (let key in listRowSelect.value[0]) {
        if (key == 'id') {
            idEditRecord.value = listRowSelect.value[0][key]
            continue;
        }
        else if (!allLabels.value.includes(key)) continue
        headerNamesRow.value.push({
            label: key,
            data: listRowSelect.value[0][key],
            id: idEditRecord,
            selecti: true
        });

    }
    formDialog.value = true;
};

const openNew = () => {

    mode.value = 'NEW';
    headerNamesRow.value = [];
    for (let key in headerNames.value) {
        if (key == 'id') continue;
        else if (!allLabels.value.includes(key)) {
            continue
        }
        headerNamesRow.value.push({
            label: key,
            data: ''
        });
    }
    formDialog.value = true;
};

const openClone = () => {
    mode.value = 'CLONE';
    headerNamesRow.value = [];

    for (let key in headerNames.value) {
        if (key == 'id') continue;
        else if (!allLabels.value.includes(key)) {

            continue
        }
        headerNamesRow.value.push({
            label: key,
            data: headerNames.value[key]
        });
    }
    formDialog.value = true;
};

const openExport = () => {
    mode.value = 'EXPORT';
    format.value = '';
    exportDialog.value = true;
};

const openDelete = () => {
    mode.value = 'DELETE';
    headerNamesRow.value = [];


    for (let key in listRowSelect.value) {

        headerNamesRow.value.push({
            label: listRowSelect.value[key].name,
            id: listRowSelect.value[key].id,
            selecti: true
        });

    }
    deleteRecords.value = true;
};

const saveRecord = () => {
    let data = [];

    if (mode.value == 'DELETE') {
        headerNamesRow.value.map((item) => {
            if (item.selecti) {
                data.push(item.id);

                dropRecord(item.id, endpoint.value)
            }
        });
        isChanging.value = true
    } else if (mode.value == 'EXPORT') {
        if (format.value == '') {
            toast.add({ severity: 'error', summary: 'Select Format', detail: 'Must select a format', life: 3000 });
            return;
        }
        data = {
            data: format.value.code,
            name: filename.value + (format.value.code ? '.csv' : '.xls')
        };
        isChanging.value = true
    }
    else if (mode.value == 'NEW') {
        data = headerNamesRow.value.map((heade) => {
            const data = {};
            data[heade.label] = heade.data;

            dataTmp = data
            console.log(data)
            return data;
        });


        requestData = data.reduce((result, currentObject) => {

            const [key] = Object.keys(currentObject);
            const value = currentObject[key];
            result[key] = value;
            return result;
        }, {});

        newRecord(requestData, endpoint.value)


    }

    else if (mode.value == 'CLONE') {
        data = headerNamesRow.value.map((heade) => {
            const data = {};
            data[heade.label] = heade.data;
            dataTmp = data

            return data;
        });
        requestData = data.reduce((result, currentObject) => {
            const [key] = Object.keys(currentObject);
            const value = currentObject[key];
            result[key] = value;
            return result;
        }, {});
        newRecord(requestData, endpoint.value)
        isChanging.value = true
    }
    else if (mode.value == 'EDIT') {
        console.log("Guardé al edit")
        let id = 0
        data = headerNamesRow.value.map((heade) => {
            const data = {};
            data[heade.label] = heade.data;
            dataTmp = data

            if (heade.selecti)
                id = heade.id
            console.log(id)
            return data;

        });
        requestData = data.reduce((result, currentObject) => {
            const [key] = Object.keys(currentObject);
            const value = currentObject[key];
            result[key] = value;
            return result;
        }, {});
        updateRecord(requestData, id, endpoint.value)
        isChanging.value = true
    }

    deleteRecords.value = false;
    exportDialog.value = false;

};



</script>

<style lang="scss" scoped>
.text-danger {
    color: red;
    /* O el color que desees */
}
</style>