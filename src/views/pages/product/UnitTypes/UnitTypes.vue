
<template>
    <div class="card">
        <h1>Información tipo de Unidades </h1>
        







        <div class="grid">
        <div class="col-12">

            <Toolbar>
                <template v-slot:start>
                    <div>
                        <Button :disabled="headerNames.length > 0" label="New" icon="pi pi-plus" class="p-button-success mr-2 ml-2 mb-2 mt-2" @click="openNew" size="large" />
                        <!-- <i class="pi pi-bars p-toolbar-separator mr-2 ml-2 mb-2 mt-2"></i> -->
                        <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Edit" icon="pi pi-file-edit" class="p-button-help mr-2 ml-2 mb-2 mt-2" @click="openEdit" size="large" />
                        <Button :disabled="!(listRowSelect.length > 0 && listRowSelect.length < 2)" label="Clone" icon="pi pi-copy" class="p-button-secondary mr-2 ml-2 mb-2 mt-2" @click="openClone" size="large" />
                        <Button :disabled="headerNames.length > 0" label="Export" icon="pi pi-file-import" class="p-button-warning mr-2 ml-2 mb-2 mt-2" @click="openExport" size="large" />
                        <Button :disabled="!listRowSelect.length > 0" label="Delete" icon="pi pi-trash" class="p-button-danger mr-2 ml-2 mb-2 mt-2" @click="openDelete" size="large" />
                    </div>
                </template>
            </Toolbar>
        </div>
        <Dialog v-model:visible="productDialog" :style="{ width: '700px' }" header="Unit Types Details" :modal="true" class="p-fluid">
            <div class="formgrid grid">
                
                <div v-for="key in headerNamesRow" :key="key" class="field">
                    <div v-if="key.type == 'number'" class="field col">
                        
                        <label v-text="key.label"></label>
                        <InputNumber id="price" v-model="key.data" :required="true" />
                    
                    </div>
                    
                     <div v-if="key.type == 'text'" class="field col"> 
                        <!-- <div v-if="key.type === 'text' && (key.label === 'name' || key.label === 'code')" class="field col"> -->
                        
                        <label v-text="key.label"></label>
                        <InputText id="name" v-model="key.data" :required="true" integeronly  />

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

        <Dialog v-model:visible="exportDialog" :style="{ width: '280px' }" header="Unit Types Details" :modal="true" class="p-fluid">
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











        <Table title="Tipos de unidades" path-api="/unit_types" @HeaderNames="onHeaderNames" @onRowSelect="RowSelect" :dataMod="modDataToolbar"  />
        <button @click="dropUnitTypes(13)">Realizar Delete</button>
        
    </div>
</template>

<script setup>


import Table from '@/components/Table.vue';
import ToolbarComponet from '@/components/ToolbarComponet.vue';
import { ref,watch,onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useProducts from '@/composables/Products/productsAPI.js'
import useRestrictionUnitTypes from '@/composables/Products/UnitType/restrictionsUnitType.js'

import useUnitTypes from '@/composables/Products/unitTypeAPI.js'

const { dataUnitTypes, errorUnitTypes, postUnitTypes,putUnitTypes,deleteUnitTypes } = useUnitTypes();



const requestDataUnitTypesDelete = {
    
}
const newUnitTypes = async (requestDataUnitTypes) => {
      await postUnitTypes(requestDataUnitTypes,"/unit_types");
      console.log('Datos:', dataUnitTypes,);
      console.log('Error:', errorUnitTypes);
    };
const updateUnitTypes = async (requestDataUnitTypes,id) => {
      await putUnitTypes(requestDataUnitTypes,"/unit_types",id);
      console.log('Datos:', dataUnitTypes,);
      console.log('Error:', errorUnitTypes);
    };
const dropUnitTypes = async (id) => {
      await deleteUnitTypes(requestDataUnitTypesDelete,"/unit_types",id);
      console.log('Datos:', dataUnitTypes,);
      console.log('Error:', errorUnitTypes);
    };        
const {conditionsUnitType } = useRestrictionUnitTypes();
//========================================================
////////////////////////////////////////////
//Conditions

//UnitsType

//const conditionsUnitType = ["name","code"]
////////////////////////////////////////////
const modDataToolbar = ref()
const idEditUnitTypes = ref()
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

let dataTmp = ref()
const { data, error, postProducts } = useProducts();
let requestData = {}

function validarCampo(data) {
  // Verificar que data no sea undefined
  if (data && data.valor) {
    // Expresión regular para permitir solo números
    const regex = /^[0-9]+$/;

    if (!regex.test(data.valor)) {
      // Si el valor no coincide con la expresión regular, elimina el último carácter ingresado
      // Asegúrate de que data.valor no sea undefined antes de acceder a slice
      data.valor = data.valor.slice(0, -1);

    }
  }
}



const openEdit = () => {
    mode.value = 'EDIT';
    headerNamesRow.value = [];
    
    for (let key in listRowSelect.value[0]) {
        if (key == 'id') {
            
            idEditUnitTypes.value = listRowSelect.value[0][key]
            console.log("El id es el siguiente: ",idEditUnitTypes.value)
            continue;
        }
        else if(!(key ==conditionsUnitType[0].label || key ==conditionsUnitType[1].label)) continue
        headerNamesRow.value.push({
            label: key,
            type: typeof listRowSelect.value[0][key] == 'number' ? 'number' : 'text',
            data: listRowSelect.value[0][key],
            id: idEditUnitTypes,
            selecti: true
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
    for (let key in headerNames.value) {
        if (key == 'id') continue;
        
        else if(!(key ==conditionsUnitType[0].label || key ==conditionsUnitType[1].label)) {
            
            continue}
        headerNamesRow.value.push({
            label: key,
            type: typeof headerNames.value[key] == 'number' ? 'number' : 'text',
            data: ''
        });

    }
    console.log("headerNames ",headerNamesRow.value)
    console.log("headerNamesRow ",headerNamesRow.value[1])
    productDialog.value = true;
    

};

const openClone = () => {
    mode.value = 'CLONE';
    headerNamesRow.value = [];
    
    for (let key in headerNames.value) {
        if (key == 'id') continue;
        else if(!(key ==conditionsUnitType[0].label || key ==conditionsUnitType[1].label)) {
            
            continue}
        headerNamesRow.value.push({
            label: key,
            type: typeof headerNames.value[key] == 'number' ? 'number' : 'text',
            data: headerNames.value[key]
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
    for (let key in listRowSelect.value) {
        headerNamesRow.value.push({
            id: listRowSelect.value[key].id,
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
            if (item.selecti) {
                data.push(item.id);
                dropUnitTypes(item.id)
            }
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
    }
     else if (mode.value == 'NEW'){
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
  
        console.log("Hola este es el request",requestData)
        
        
        //newProduct(requestData)
        newUnitTypes(requestData)

    }
    else if (mode.value == 'CLONE'){
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
  
        console.log("Hola este es el requestClone",requestData)
        
        
        //newProduct(requestData)
        newUnitTypes(requestData)

    }
    else if (mode.value == 'EDIT'){
            let id = 0
            data = headerNamesRow.value.map((heade) => {
            const data = {};
            
            data[heade.label] = heade.data;
            dataTmp = data
            if (heade.selecti) 
            console.log(heade.id);
            id= heade.id
            return data;

        });
        
        
        requestData = data.reduce((result, currentObject) => {
        
        const [key] = Object.keys(currentObject);
        const value = currentObject[key];
        
        result[key] = value;

        return result;
        }, {});
  
        console.log("Hola este es el request",requestData)
        console.log("Hola este es el request",data)
        
        
        //newProduct(requestData)
        updateUnitTypes(requestData,id)

    }
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //const modDataToolbar = { data: data, mode: mode.value };
    modDataToolbar.value = { data: data, mode: mode.value };
    productDialog.value = false;
    deleteProducts.value = false;
    exportDialog.value = false;
    
};

//========================================================

const listRowSelect = ref([]);
const RowSelect = (data) => {
    listRowSelect.value = data;
    
};
let headerNames = ref([]);
const onHeaderNames = (data) => (
    headerNames.value = data

    );
const dataMod = ref({});
const onModDataToolbar = (data) => {
    dataMod.value = data;
};

watch(listRowSelect, RowSelect);
onMounted(() => {
      console.log('Rowww'+listRowSelect);
      // Lógica después de que el componente se haya desmontado
    });

</script>

<style lang="scss" scoped>

</style>