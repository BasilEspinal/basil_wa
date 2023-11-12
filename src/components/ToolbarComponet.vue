<script setup>
import { ref, defineEmits } from 'vue';
import { useToast } from 'primevue/usetoast';

const emits = defineEmits([]);
const toast = useToast();
const productDialog = ref(false);
const deleteProducts = ref(false);
const exportDialog = ref(false);
const mode = ref('');
const filename = ref('table');
const headerNamesRow = ref([]);
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
///*****************************/
import useProducts from '@/composables/Products/productsAPI.js'
let dataTmp = ref()
const { data, error, postProducts } = useProducts();
let requestData = {}


const requestData2 = {
      "name": "Juanchoxx",
      "short_name": "JCY",
      "slug": "909090878787"
    };

const newProduct = async () => {
      await postProducts(requestData,"/products");
      console.log('Datos:', data);
      console.log('Error:', error);
    };
//***************************** */
const props = defineProps({
    rowSelect: {
        type: Array,
        default: () => []
    },
    headerNames: {
        type: Array,
        default: () => []
    }
});

const openEdit = () => {
    mode.value = 'EDIT';
    headerNamesRow.value = [];
    for (let key in props.rowSelect[0]) {
        if (key == 'id') continue;
        headerNamesRow.value.push({
            label: key,
            type: typeof props.rowSelect[0][key] == 'number' ? 'number' : 'text',
            data: props.rowSelect[0][key]
        });
    }
    productDialog.value = true;

    
};

const openNew = () => {
    //Title
    mode.value = 'NEW';
    //Title fields
    headerNamesRow.value = [];
    //make the structure
    for (let key in props.headerNames) {
        if (key == 'id') continue;
        headerNamesRow.value.push({
            label: key,
            type: typeof props.headerNames[key] == 'number' ? 'number' : 'text',
            data: ''
        });
    }
    productDialog.value = true;
    

};

const openClone = () => {
    mode.value = 'CLONE';
    headerNamesRow.value = [];
    for (let key in props.headerNames) {
        if (key == 'id') continue;
        headerNamesRow.value.push({
            label: key,
            type: typeof props.headerNames[key] == 'number' ? 'number' : 'text',
            data: props.headerNames[key]
        });
    }
    productDialog.value = true;
};

const openExport = () => {
    mode.value = 'EXPORT';
    format.value = '';
    exportDialog.value = true;
};

const openDelete = () => {
    mode.value = 'DELETE';
    headerNamesRow.value = [];
    for (let key in props.rowSelect) {
        headerNamesRow.value.push({
            id: props.rowSelect[key].id,
            selecti: true
        });
    }
    deleteProducts.value = true;
};

const hideDialog = () => {
    productDialog.value = false;
};

const saveProduct = () => {
    let data = [];

    if (mode.value == 'DELETE') {
        headerNamesRow.value.map((item) => {
            if (item.selecti) data.push(item.id);
        });
    } else if (mode.value == 'EXPORT') {
        if (format.value == '') {
            toast.add({ severity: 'error', summary: 'Select Format', detail: 'Must select a format', life: 3000 });
            return;
        }
        data = {
            data: format.value.code,
            name: filename.value + (format.value.code ? '.csv' : '.xls')
        };
    } else {
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
  
        console.log(requestData)
        
        
        newProduct(requestData)

    }
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    emits('modDataToolbar', { data: data, mode: mode.value });

    productDialog.value = false;
    deleteProducts.value = false;
    exportDialog.value = false;
    
};

</script>

<template>
    <div class="grid">
        <div class="col-12">

            <Toolbar>
                <template v-slot:start>
                    <div>
                        <Button :disabled="props.headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                        <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i>
                        <Button :disabled="!(props.rowSelect.length > 0 && props.rowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                        <Button :disabled="!(props.rowSelect.length > 0 && props.rowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                        <Button :disabled="props.headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                        <Button :disabled="!props.rowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                    </div>
                </template>
            </Toolbar>
        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '700px' }" header="Product Details" :modal="true" class="p-fluid">
            <div class="formgrid grid">
                <div v-for="key in headerNamesRow" :key="key" class="field">
                    <div v-if="key.type == 'number'" class="field col">
                        <label v-text="key.label"></label>
                        <InputNumber id="price" v-model="key.data" :required="true" />
                    </div>
                    <div v-if="key.type == 'text'" class="field col">
                        <label v-text="key.label"></label>
                        <InputText id="name" v-model="key.data" :required="true" integeronly />
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog" />
                    <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
                    
                </div>
            </template>
        </Dialog>

        <Dialog v-model:visible="exportDialog" :style="{ width: '280px' }" header="Product Details" :modal="true" class="p-fluid">
            <div class="field col">
                <label>File name</label>
                <InputText id="name" v-model="filename" :required="true" integeronly />
                <span class="p-float-label mt-5">
                    <Dropdown v-model="format" :options="extenciones" optionLabel="name" :class="{ 'p-invalid w-full md:w-14rem': format == '', ' w-full md:w-14rem': format != '' }" />
                    <label for="cs-city">Format</label>
                </span>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="exportDialog = false" />
                <Button label="Export" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProducts" :style="{ width: '250px' }" header="Confirm" :modal="true">
            <div class="flex align-items-center justify-content-center" v-for="item in headerNamesRow" :key="item">
                <Checkbox class="mr-2" v-model="item.selecti" :binary="true" />
                <label :for="item.id"> {{ item.id }} </label>
                <i class="pi pi-exclamation-triangle ml-3 mb-2" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete the selected products?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProducts = false" />
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Toast />
    </div>
</template>

<style></style>
