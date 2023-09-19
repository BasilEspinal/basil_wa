
<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import CutService from '@/service/CutService';
import { ref, onBeforeMount, defineComponent } from 'vue';

let counterNames;
let columnsD = ref([])

const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);
const filters1 = ref(null);
// Filtro 
const filtersCut = ref(null);

const loading1 = ref(null);
const loading2 = ref(null);
const loadingCut = ref(null);

const products = ref(null);

const cut = ref(null);

const expandedRows = ref([]);


const cutService = new CutService();
const customerService = new CustomerService();
const productService = new ProductService();

onBeforeMount(() => {
    productService.getProductsWithOrdersSmall().then((data) => (products.value = data));
    customerService.getCustomersLarge().then((data) => {
        customer1.value = data;
        loading1.value = false;
        customer1.value.forEach((customer) => (
            customer.date = new Date(customer.date)

        ));
        console.log(customer1.value[1])
    });
    customerService.getCustomersLarge().then((data) => (customer2.value = data));
    customerService.getCustomersMedium().then((data) => (customer3.value = data));
    customerService.getCustomersMedium().then((data) => (customer3.value = data));

     //cutService.getCutInfo('http://localhost:8050/api/v1/cutcontrols').then((data) => {
       // cut.value = data;

   
   // });
    
    fetchCutInfoAndUpdateCutValue();
    console.log('Hello this is tha fucking headerNames')
    console.log(columnsD)
    loading2.value = false;
    initFilters1();
    initFiltersCut();
});



const initFilters1 = () => {
    filters1.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};

const initFiltersCut = () => {
    filtersCut.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        cortador: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //lote: { value: null, matchMode: FilterMatchMode.IN },
        lote: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        empaque: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        fecharegistro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        //fecharegistro: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        product: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        qtyempaque: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        qtybolsa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        peso_bolsa: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        total_peso: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },

        //status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        //activity: { value: [0, 50], matchMode: FilterMatchMode.BETWEEN },
        //verified: { value: null, matchMode: FilterMatchMode.EQUALS }
    };
};



const clearFilter1 = () => {
    initFilters1();
};
//////////////////////////////////////////
const clearFilterCut = () => {
    initFiltersCut();
};
//////////////////////////////////////////


const expandAll = () => {
    expandedRows.value = products.value.filter((p) => p.id);
};



const collapseAll = () => {
    expandedRows.value = null;
};

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};


async function fetchCutInfoAndUpdateCutValue() {
  try {
    const data = await cutService.getCutInfo('http://localhost:8000/api/v1/cutcontrols');
    console.log('Hello this is fetchaaa')
    cut.value = data;
    console.log('Búsqueda del cut');
    console.log(data);
    console.log(cut.value);
   
    const mappedArray = data.map((item) => {
    const keys = Object.keys(item);
    return {
        field: keys.join(', '),
        header: keys.join(', ') // Join keys into a comma-separated string
        
    };

    });

    const columnNames = mappedArray[0]
    console.log('mappedArray')
    console.log(mappedArray)
    console.log('columnNames')
    console.log(columnNames)
    console.log(columnNames.length)
    // Split the comma-separated strings into arrays of keys
    const fieldKeys = columnNames.field.split(', ');
    const headerKeys = columnNames.header.split(', ');

    // Create an array of objects based on the keys
     columnsD = fieldKeys.map((field, index) => ({
        field,
        header: headerKeys[index]
    }));

    console.log('columnsD')
    console.log(columnsD)

    console.log('columns')
    console.log(columns)

  

  } catch (error) {
    console.error('Error fetching cut data:', error);
  }
}


//Array of name of columns

const columns = [
    { field: 'id', header: 'id', position:0 },
    { field: 'fecharegistro',header:'Fecha de registro', position:1 },
    { field: 'cortador', header:'cortador',position:2 },
    { field: 'lote',  header:'lote',position:3 },
    { field: 'empaque', header: 'Empaque', position:4 },
    { field: 'product', header: 'Producto', position:5 },
    { field: 'qtyempaque', header: 'Cantidad de empaque', position:6 },
    { field: 'qtybolsa', header: 'Cantidad de bolsas', position:7 },
    { field: 'peso_bolsa', header: 'Peso de bolsa(gr)',  position:8 },
    { field: 'total_peso', header: 'Total peso (kg)',  position:9 },
    { field: 'created_at', header: 'created_at', position:10 },
    { field: 'updated_at', header: 'updated_at',  position:11 },

];


// Initialize with an array of all field values, this has to be ref().
const column = ref(columns.map((col) => col));
const headerNames = ref(columns.map((col) => col.field)) 


const onColumnsChange = (column) => {
  
  column.sort((a, b) => a.position - b.position);
  
};
///********************************************


</script>

<template>
   

{{ column }}
   
    <h5>Tabla de registro de corte</h5>


    <div class="col-12 md:col-12">
        <div class="card">
            <h5>¿Cuales columnas quieres ver?</h5>
                <MultiSelect 
                v-model="column" 
                :options="columns" 
                optionLabel="field" 
                placeholder="Seleccione columnas" 
                :filter="true" 
                display="chip" 
                class="w-full md:w-50rem"
                @change="onColumnsChange(column)"
                >
                    <template #value="slotProps" >
                        <div
                        class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" 
                        v-for="option of slotProps.value" 
                        :key="option.header" 
                        >
                        
                            <!--<div>{{ stateColumns[option] }}</div>-->
                            <div>{{ option.field }}</div>
                        </div>
                    </template>
            
            
                    <template #option="slotProps" >
                        <div class="flex align-items-center" >
                            
                            <!--<span :class="'mr-2 flag flag-' + slotProps.option.field.toLowerCase()" style="width: 18px; height: 12px" />-->
                            <!--<span :class=" slotProps.option.header.toLowerCase()" style="width: 18px; height: 12px" />-->
                            
                            <div>{{ slotProps.option.header }}</div>
                        </div>
                    </template>


                </MultiSelect>

        </div>
    </div>


    <DataTable :value="cut" 
    :paginator="true" class="p-datatable-gridlines" 
    :rows="10" dataKey="id" 
    :rowHover="true"
        v-model:filters="filtersCut" 
        filterDisplay="menu" 
        :loading="loadingCut" 
        :filters="filtersCut"
        responsiveLayout="scroll" ref="dt"
        :globalFilterFields="headerNames">
        <template #header>
            <div class="flex justify-content-between flex-column sm:flex-row">
                <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2"
                    @click="clearFilterCut()" />
                <span class="p-input-icon-left mb-2">
                    <i class="pi pi-search" />
                    <InputText v-model="filtersCut['global'].value" placeholder="Buscar" style="width: 100%" />
                </span>
            </div>
        </template>
        <template #empty> No se encontraron datos. </template>
        <template #loading> Cargando los datos por favor espere. </template>

        <Column v-for="col of column" 
        :key="col.field" 
        :field="col.field" 
        :header="col.header"
        :enable="col.enabled" 
        style="min-width: 1rem"
        >
            <template #body="{ data }" >
                
                {{ data[col.field] }}
            </template>
            <template #filter="{ filterModel }">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Buscar por nombre" />
            </template>

        </Column>
    
    </DataTable>

</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
