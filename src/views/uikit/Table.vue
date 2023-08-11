
<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import CustomerService from '@/service/CustomerService';
import ProductService from '@/service/ProductService';
import CutService from '@/service/CutService';
import { ref, onBeforeMount, defineComponent } from 'vue';

var idCheck = ref(false)
console.log("Rehola")
console.log(idCheck.value)

var idDate = ref(true)
var idCutter = ref(null)
var idLote = ref(null)
var idBin = ref(null)
var idProductName = ref(null)
var idBagQuantity = ref(null)
var idBagWeight = ref(null)
var idTotalWeight = ref(null)
idCheck = false
idDate = true
idCutter = false
idLote = false
idBin = false
idProductName = false
idBagQuantity = false
idBagWeight = false
idTotalWeight = false
/////////////////////////////////////////////


const customer1 = ref(null);
const customer2 = ref(null);
const customer3 = ref(null);

const filters1 = ref(null);
// Filtro 
const filtersCut = ref(null);

const loading1 = ref(null);
const loading2 = ref(null);
const loadingCut = ref(null);

const idFrozen = ref(false);

const products = ref(null);

const cut = ref(null);

const expandedRows = ref([]);

const statuses = ref(['unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal']);

const representatives = ref([
    { name: 'Amy Elsner', image: 'amyelsner.png' },
    { name: 'Anna Fali', image: 'annafali.png' },
    { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
    { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
    { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
    { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
    { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
    { name: 'Onyama Limba', image: 'onyamalimba.png' },
    { name: 'Stephen Shaw', image: 'stephenshaw.png' },
    { name: 'XuXue Feng', image: 'xuxuefeng.png' }
]);
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

    cutService.getCutInfo().then((data) => {
        cut.value = data;
        console.log('Búsqueda del cut')
        console.log(data)
        console.log(cut)
        console.log(cut.value)
        /*
        console.log(cut.value[1])
        console.log(typeof cut.value[1].empaque)
        console.log(typeof cut.value[1].created_at)
        */
    });

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
const calculateCustomerTotal = (name) => {
    let total = 0;
    if (customer3.value) {
        for (let customer of customer3.value) {
            if (customer.representative.name === name) {
                total++;
            }
        }
    }

    return total;
};
//////////////////////////////////////////////
//////Related to enable columns in table//////
//////////////////////////////////////////////
let statusesTable = [];
let statusesHashTable = ref({});
statusesHashTable.value['idEnabled'] = true;
statusesHashTable.value['dateEnabled'] = true;
statusesHashTable.value['cutterEnabled'] = true;
statusesHashTable.value['batchEnabled'] = true;
statusesHashTable.value['packageEnabled'] = true;
statusesHashTable.value['quantityBagEnabled'] = true;
statusesHashTable.value['bagWeightEnabled'] = true;
statusesHashTable.value['totalWeightEnabled'] = true;


console.log('----------------------------------');
console.log('Status of hashtable')
console.log(statusesHashTable.value['idEnabled']);
statusesHashTable.value['idEnabled'] = false;
console.log(statusesHashTable.value['idEnabled']);
console.log('----------------------------------');

const onClickEnableColumns = () => {
    console.log('Modifying columns')

    if (statusesHashTable.value['idEnabled'] == true) {
        statusesHashTable.value['idEnabled'] = false;
    }
    else {
        statusesHashTable.value['idEnabled'] = true;
    }

    return statusesHashTable.value['idEnabled'];
}
///**********************************
//ID
const idEnabled = ref(null);
idEnabled.value = true;
statusesTable.push(idEnabled.value)

console.log('Statuses');
console.log(statusesTable.length);
const onClickEnableId = () => {
    console.log('Modifying id')
    if (idEnabled.value == true) {
        idEnabled.value = false;
    }
    else {
        idEnabled.value = true;
    }

    return idEnabled;
}
///**********************************
//DATE
const dateEnabled = ref(null)
dateEnabled.value = true;
const onClickEnableDate = () => {
    console.log('Modifying date')
    if (dateEnabled.value == true) {
        dateEnabled.value = false;
    }
    else {
        dateEnabled.value = true;
    }

    return dateEnabled;
}
///**********************************
//Cutter
const cutterEnabled = ref(null)
cutterEnabled.value = true;
const onClickEnableCutter = () => {
    console.log('Modifying cutter')
    if (cutterEnabled.value == true) {
        cutterEnabled.value = false;
    }
    else {
        cutterEnabled.value = true;
    }

    return cutterEnabled;
}
///**********************************
//Batch
const batchEnabled = ref(null);
batchEnabled.value = true;
const onClickEnableBatch = () => {
    console.log('Modifying Batch')
    if (batchEnabled.value == true) {
        batchEnabled.value = false;
    }
    else {
        batchEnabled.value = true;
    }

    return batchEnabled;
}
///**********************************
//Package
const packageEnabled = ref(null);
packageEnabled.value = true;
const onClickEnablePackage = () => {
    console.log('Modifying Package')
    if (packageEnabled.value == true) {
        packageEnabled.value = false;
    }
    else {
        packageEnabled.value = true;
    }

    return packageEnabled;
}

///**********************************
//Product
const productEnabled = ref(null);
productEnabled.value = true;

const onClickEnableProduct = () => {
    console.log('Modifying product')
    if (productEnabled.value == true) {
        productEnabled.value = false;
    }
    else {
        productEnabled.value = true;
    }

    return productEnabled;
}



///**********************************
//quantityBagEnabled
const BagQuantityEnabled = ref(null);
BagQuantityEnabled.value = true;

const onClickEnableBagQty = () => {
    console.log('Modifying Bag quantity')
    if (BagQuantityEnabled.value == true) {
        BagQuantityEnabled.value = false;
    }
    else {
        BagQuantityEnabled.value = true;
    }

    return BagQuantityEnabled;
}
///**********************************
//bagWeightEnabled
const bagWeightEnabled = ref(null);
bagWeightEnabled.value = true;

const onClickEnableBagWeight = () => {
    console.log('Modifying Bag Weight')
    if (bagWeightEnabled.value == true) {
        bagWeightEnabled.value = false;
    }
    else {
        bagWeightEnabled.value = true;
    }

    return bagWeightEnabled
}
///**********************************
//totalWeightEnabled
const totalWeightEnabled = ref(null);
totalWeightEnabled.value = true;

const onClickEnableTotalWeight = () => {
    console.log('Modifying Total Weight')
    if (totalWeightEnabled.value == true) {
        totalWeightEnabled.value = false;
    }
    else {
        totalWeightEnabled.value = true;
    }

    return totalWeightEnabled;
}

const exportCSV = () => {
    dt.exportCSV()

}
const checked1 = ref(true);
const checked2 = ref(true);
const checked3 = ref(true);
const checked4 = ref(true);
const checked5 = ref(true);
const checked6 = ref(true);
const checked7 = ref(true);
const checked8 = ref(true);
const checked9 = ref(true);

///********************************************
// Array for cut process columns
console.log("Array for cut process columns");


//Array of name of columns
const columns = [
    { field: 'id', header: 'id',function: onClickEnableId, enabled: true },
    { field: 'fecharegistro', header: 'Fecha de registro', function: onClickEnableDate, enabled: true },
    { field: 'cortador', header: 'Cortador',funtcion: onClickEnableCutter, enabled: true },
    { field: 'lote', header: 'Lote',function: onClickEnableBatch, enabled: true },
    { field: 'empaque', header: 'Empaque', function: onClickEnablePackage, enabled: true },
    { field: 'product', header: 'Producto', function: onClickEnableProduct, enabled: true },
    { field: 'qtyempaque', header: 'Cantidad de empaque', function: '', enabled: true },
    { field: 'qtybolsa', header: 'Cantidad de bolsas', function: onClickEnableBagQty, enabled: true },
    { field: 'peso_bolsa', header: 'Peso de bolsa(gr)', function: onClickEnableBagWeight, enabled: true },
    { field: 'total_peso', header: 'Total peso (kg)', function: onClickEnableTotalWeight, enabled: true },
    { field: 'created_at', header: 'created_at', function: '', enabled: true },
    { field: 'updated_at', header: 'updated_at', function: '', enabled: true },

];

// Initialize with an array of all field values, this has to be ref().
const column = ref(columns.map((col) => col)); 
const stateColumns = [idEnabled,dateEnabled, cutterEnabled, batchEnabled, packageEnabled, productEnabled,true, BagQuantityEnabled,bagWeightEnabled,totalWeightEnabled,true,true]

const stateColumn =ref(stateColumns.map((col) => col));


const onColumnsChange = (newColumn) => {
  
   
}

///********************************************

const multiselectValues = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);
const multiselectValue = ref(null);
</script>

<template>
    
    <h5>Tabla de registro de corte</h5>


    <div class="col-12 md:col-12">
        <div class="card">
            <h6 class="centered-heading">¿Cuales columnas quieres ver?</h6>

            <Checkbox v-model="checked1" id="id" binary class="mr-2" checked @change="onClickEnableId"></Checkbox>
            <!--<input type="checkbox" id="id" value="id" binary class="mr-2" checked @change="onClickEnableId">-->
            <label for="idColumn">id </label>

            <Checkbox v-model="checked2" id="date" binary class="mr-2" checked @change="onClickEnableDate"></Checkbox>
            <!--<input type="checkbox" id="date" value="date" checked @change="onClickEnableDate">-->
            <label for="date">Fecha</label>

            <Checkbox v-model="checked3" id="cutter" binary class="mr-2" checked @change="onClickEnableCutter"></Checkbox>
            <!--<input type="checkbox" id="cutter" value="cutter" checked @change="onClickEnableCutter">-->
            <label for="cutter">Cortador</label>

            <Checkbox v-model="checked4" id="batch" binary class="mr-2" checked @change="onClickEnableBatch"></Checkbox>
            <!--<input type="checkbox" id="batch" value="batch" checked @change="onClickEnableBatch">-->
            <label for="batch">Lote</label>

            <Checkbox v-model="checked5" id="package" binary class="mr-2" checked @change="onClickEnablePackage"></Checkbox>
            <!--<input type="checkbox" id="package" value="package" checked @change="onClickEnablePackage">-->
            <label for="package">Package</label>

            <Checkbox v-model="checked6" id="productName" binary class="mr-2" checked @change="onClickEnableProduct"></Checkbox>
            <!--<input type="checkbox" id="productName" value="productName" checked @change="onClickEnableProduct">-->
            <label for="productName">Nombre del producto</label>

            <Checkbox v-model="checked7" id="bagQuantity" binary class="mr-2" checked @change="onClickEnableBagQty"></Checkbox>
            <!--<input type="checkbox" id="bagQuantity" value="bagQuantity" checked @change="onClickEnableBagQty">-->
            <label for="bagQuantity">Cantidad de bolsas</label>

            <Checkbox v-model="checked8" id="bagWeight" binary class="mr-2" checked @change="onClickEnableBagWeight"></Checkbox>
            <!--<input type="checkbox" id="bagWeight" value="bagWeight" checked @change="onClickEnableBagWeight">-->
            <label for="bagWeight">Peso de bolsas</label>

            <Checkbox v-model="checked9" id="checkbox" binary class="mr-2" checked @change="onClickEnableTotalWeight"></Checkbox>
            <!--<input type="checkbox" id="totalWeight" value="totalWeight" checked @change="onClickEnableTotalWeight">-->
            <label for="totalWeight">Peso total</label>
<h3>El valor de column es </h3>
<h3>{{ column }}</h3>

<h3>El valor de columns es </h3>
<h3>{{ columns }}</h3>
<h3>El valor de idEnabled es </h3>
<h3>{{ idEnabled }}</h3>


            <h5>Seleccione las columnas que quiere ver</h5>


                <MultiSelect 
                v-model="column" 
                :options="columns" 
                optionLabel="field" 
                placeholder="Seleccione columnas" 
                :filter="true" 
                display="chip" 
                class="w-full md:w-50rem"
                @change="onColumnsChange"
                
                >
                    <template #value="slotProps"  >
                        <div
                        
                        class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-4" 
                        v-for="option of slotProps.value" 
                        :key="option.header" 
                        
                        >
                            <div>{{ stateColumns[option] }}</div>
                            <div>{{ option.field }}</div>
                        </div>
                        <!--
                        <template v-if="!slotProps.value || slotProps.value.length === 0" > 
                            <div class="p-1">Seleccione columnas.</div>
                        </template>
                        -->
                    </template>
                    <template>
                        
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
        :globalFilterFields="['id', 'fecharegistro', 'cortador', 'lote', 'empaque', 'product', 'qtyempaque', 'qtybolsa', 'peso_bolsa', 'total_peso']">
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
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>

    
        <Column v-for="col of column" 
        :key="col.field" 
        :field="col.field" 
        :header="col.header"
        :enable="col.enabled" 
        style="min-width: 12rem"
        
        >
            <template #body="{ data }" >
                {{ data[col.field] }}
            </template>
            <template #filter="{ filterModel }">
                <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name" />
            </template>

        </Column>
    
    
    </DataTable>


    <DataTable :value="cut" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id" :rowHover="true"
        v-model:filters="filtersCut" filterDisplay="menu" :loading="loadingCut" :filters="filtersCut"
        responsiveLayout="scroll" ref="dt"
        :globalFilterFields="['id', 'fecharegistro', 'cortador', 'lote', 'empaque', 'product', 'qtyempaque', 'qtybolsa', 'peso_bolsa', 'total_peso']">
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
        <template #empty> No customers found. </template>
        <template #loading> Loading customers data. Please wait. </template>


        <div v-if="idEnabled">
            <Column field="id" header="ID" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.id }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>

        <div v-if="dateEnabled">
            <Column field="fecharegistro" header="Fecha" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.fecharegistro }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>

        <div v-if="cutterEnabled">
            <Column field="cortador" header="Cortador" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.cortador }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Buscar cortador" />
                </template>
            </Column>
        </div>

        <div v-if="batchEnabled">
            <Column field="lote" header="Lote" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.lote }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>
        <div v-if="packageEnabled">
            <Column field="empaque" header="Empaque" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.empaque }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>
        <div v-if="productEnabled">
            <Column field="product" header="Nombre de producto" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.product }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>
        <div v-if="BagQuantityEnabled">
            <Column field="Cantidad de bolsas" header="Cantidad de bolsas" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.qtybolsa }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>
        <div v-if="bagWeightEnabled">
            <Column field="peso_bolsa" header="Peso de bolsas (gr)" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.peso_bolsa }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>
        <div v-if="totalWeightEnabled">
            <Column field="total_peso" header="Total peso (kg)" style="min-width: 12rem">
                <template #body="{ data }">

                    {{ data.total_peso }}
                </template>
                <template #filter="{ filterModel }">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                        placeholder="Search by name" />
                </template>
            </Column>
        </div>

    </DataTable>
    <div class="btn-text-right">
        <h4>¿Desea exportar?</h4>
    </div>
    <div class="btn-text-right">
        <Button type="button" icon="pi pi-download" label="Exportar a excel"
            class=" p-btn-text-right p-button-outlined mb-3" @click="exportCSV($event)" />
    </div>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Registro</h5>
                <DataTable :value="customer1" :paginator="true" class="p-datatable-gridlines" :rows="10" dataKey="id"
                    :rowHover="true" v-model:filters="filters1" filterDisplay="menu" :loading="loading1" :filters="filters1"
                    responsiveLayout="scroll"
                    :globalFilterFields="['name', 'country.name', 'representative.name', 'balance', 'status']">
                    <template #header>
                        <div class="flex justify-content-between flex-column sm:flex-row">
                            <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2"
                                @click="clearFilter1()" />
                            <span class="p-input-icon-left mb-2">
                                <i class="pi pi-search" />
                                <InputText v-model="filters1['global'].value" placeholder="Buscar" style="width: 100%" />
                            </span>
                        </div>
                    </template>
                    <template #empty> No customers found. </template>
                    <template #loading> Loading customers data. Please wait. </template>

                    <Column field="Name" header="ID" style="min-width: 12rem">
                        <template #body="{ data }">

                            {{ data.name }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by name" />
                        </template>
                    </Column>

                    <Column header="No lote" filterField="country.name" style="min-width: 12rem">
                        <template #body="{ data }">
                            <img src="/demo/images/flag/flag_placeholder.png" :alt="data.country.name"
                                :class="'flag flag-' + data.country.code" width="30" />
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.country.name
                            }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <InputText type="text" v-model="filterModel.value" class="p-column-filter"
                                placeholder="Search by country" />
                        </template>
                        <template #filterclear="{ filterCallback }">
                            <Button type="button" icon="pi pi-times" @click="filterCallback()"
                                class="p-button-secondary"></Button>
                        </template>
                        <template #filterapply="{ filterCallback }">
                            <Button type="button" icon="pi pi-check" @click="filterCallback()"
                                class="p-button-success"></Button>
                        </template>
                    </Column>

                    <Column header="Codigo cortador" filterField="representative" :showFilterMatchModes="false"
                        :filterMenuStyle="{ width: '14rem' }" style="min-width: 14rem">
                        <template #body="{ data }">
                            <img :alt="data.representative.name" :src="'demo/images/avatar/' + data.representative.image"
                                width="32" style="vertical-align: middle" />
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{
                                data.representative.name }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <div class="mb-3 text-bold">Agent Picker</div>
                            <MultiSelect v-model="filterModel.value" :options="representatives" optionLabel="name"
                                placeholder="Any" class="p-column-filter">
                                <template #option="slotProps">
                                    <div class="p-multiselect-representative-option">
                                        <img :alt="slotProps.option.name"
                                            :src="'demo/images/avatar/' + slotProps.option.image" width="32"
                                            style="vertical-align: middle" />
                                        <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{
                                            slotProps.option.name }}</span>
                                    </div>
                                </template>
                            </MultiSelect>
                        </template>
                    </Column>

                    <Column header="Fecha" filterField="date" dataType="date" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatDate(data.date) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                        </template>
                    </Column>

                    <Column header="Tipo de empaque" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column header="Nombre de producto" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.id) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column header="Cantidad de empaque" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column header="Cantidad de bolsas" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column header="Peso Bolsa (gr)" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column header="Total Peso Kilos" filterField="balance" dataType="numeric" style="min-width: 10rem">
                        <template #body="{ data }">
                            {{ formatCurrency(data.balance) }}
                        </template>
                        <template #filter="{ filterModel }">
                            <InputNumber v-model="filterModel.value" mode="currency" currency="USD" locale="en-US" />
                        </template>
                    </Column>

                    <Column field="Status" header="Status" :filterMenuStyle="{ width: '14rem' }" style="min-width: 12rem">
                        <template #body="{ data }">
                            <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
                        </template>
                        <template #filter="{ filterModel }">
                            <Dropdown v-model="filterModel.value" :options="statuses" placeholder="Any"
                                class="p-column-filter" :showClear="true">
                                <template #value="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.value" v-if="slotProps.value">{{
                                        slotProps.value }}</span>
                                    <span v-else>{{ slotProps.placeholder }}</span>
                                </template>
                                <template #option="slotProps">
                                    <span :class="'customer-badge status-' + slotProps.option">{{ slotProps.option }}</span>
                                </template>
                            </Dropdown>
                        </template>
                    </Column>


                    <Column field="Cantidad de empaque" header="Activity" :showFilterMatchModes="false"
                        style="min-width: 12rem">
                        <template #body="{ data }">
                            <ProgressBar :value="data.activity" :showValue="false" style="height: 0.5rem"></ProgressBar>
                        </template>
                        <template #filter="{ filterModel }">
                            <Slider v-model="filterModel.value" :range="true" class="m-3"></Slider>
                            <div class="flex align-items-center justify-content-between px-2">
                                <span>{{ filterModel.value ? filterModel.value[0] : 0 }}</span>
                                <span>{{ filterModel.value ? filterModel.value[1] : 100 }}</span>
                            </div>
                        </template>
                    </Column>

                    <Column field="Cantidad de bolsas" header="Verified" dataType="boolean" bodyClass="text-center"
                        style="min-width: 8rem">
                        <template #body="{ data }">
                            <i class="pi"
                                :class="{ 'text-green-500 pi-check-circle': data.verified, 'text-pink-500 pi-times-circle': !data.verified }"></i>
                        </template>
                        <template #filter="{ filterModel }">
                            <TriStateCheckbox v-model="filterModel.value" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <!---->
        <div class="col-12">
            <div class="card">
                <h5>Frozen Columns</h5>
                <ToggleButton v-model="idFrozen" onIcon="pi pi-lock" offIcon="pi pi-lock-open" onLabel="Unfreeze Id"
                    offLabel="Freeze Id" style="width: 10rem" />

                <DataTable :value="customer2" :scrollable="true" scrollHeight="400px" :loading="loading2"
                    scrollDirection="both" class="mt-3">
                    <Column field="name" header="Name" :style="{ width: '150px' }" frozen></Column>
                    <Column field="id" header="Id" :style="{ width: '100px' }" :frozen="idFrozen"></Column>
                    <Column field="country.name" header="Country" :style="{ width: '200px' }">
                        <template #body="{ data }">
                            <img src="/demo/images/flag/flag_placeholder.png" :class="'flag flag-' + data.country.code"
                                width="30" />
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{ data.country.name
                            }}</span>
                        </template>
                    </Column>
                    <Column field="date" header="Date" :style="{ width: '200px' }"></Column>
                    <Column field="company" header="Company" :style="{ width: '200px' }"></Column>
                    <Column field="status" header="Status" :style="{ width: '200px' }">
                        <template #body="{ data }">
                            <span :class="'customer-badge status-' + data.status">{{ data.status }}</span>
                        </template>
                    </Column>
                    <Column field="activity" header="Activity" :style="{ width: '200px' }"></Column>
                    <Column field="representative.name" header="Representative" :style="{ width: '200px' }">
                        <template #body="{ data }">
                            <img :alt="data.representative.name" :src="'demo/images/avatar/' + data.representative.image"
                                width="32" style="vertical-align: middle" />
                            <span style="margin-left: 0.5em; vertical-align: middle" class="image-text">{{
                                data.representative.name }}</span>
                        </template>
                    </Column>
                    <Column field="balance" header="Balance" :style="{ width: '150px' }" frozen alignFrozen="right">
                        <template #body="{ data }">
                            <span class="text-bold">{{ formatCurrency(data.balance) }}</span>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <h5>Row Expand</h5>
                <DataTable :value="products" v-model:expandedRows="expandedRows" dataKey="id" responsiveLayout="scroll">
                    <template #header>
                        <div>
                            <Button icon="pi pi-plus" label="Expand All" @click="expandAll" class="mr-2 mb-2" />
                            <Button icon="pi pi-minus" label="Collapse All" @click="collapseAll" class="mb-2" />
                        </div>
                    </template>
                    <Column :expander="true" headerStyle="min-width: 3rem" />
                    <Column field="name" header="Name" :sortable="true">
                        <template #body="slotProps">
                            {{ slotProps.data.name }}
                        </template>
                    </Column>
                    <Column header="Image">
                        <template #body="slotProps">
                            <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.image"
                                class="shadow-2" width="100" />
                        </template>
                    </Column>
                    <Column field="price" header="Price" :sortable="true">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.price) }}
                        </template>
                    </Column>
                    <Column field="category" header="Category" :sortable="true">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.category) }}
                        </template>
                    </Column>
                    <Column field="rating" header="Reviews" :sortable="true">
                        <template #body="slotProps">
                            <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false" />
                        </template>
                    </Column>
                    <Column field="inventoryStatus" header="Status" :sortable="true">
                        <template #body="slotProps">
                            <span
                                :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">{{
                                    slotProps.data.inventoryStatus }}</span>
                        </template>
                    </Column>
                    <template #expansion="slotProps">
                        <div class="p-3">
                            <h5>Orders for {{ slotProps.data.name }}</h5>
                            <DataTable :value="slotProps.data.orders" responsiveLayout="scroll">
                                <Column field="id" header="Id" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.id }}
                                    </template>
                                </Column>
                                <Column field="customer" header="Customer" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.customer }}
                                    </template>
                                </Column>
                                <Column field="date" header="Date" :sortable="true">
                                    <template #body="slotProps">
                                        {{ slotProps.data.date }}
                                    </template>
                                </Column>
                                <Column field="amount" header="Amount" :sortable="true">
                                    <template #body="slotProps">
                                        {{ formatCurrency(slotProps.data.amount) }}
                                    </template>
                                </Column>
                                <Column field="status" header="Status" :sortable="true">
                                    <template #body="slotProps">
                                        <span
                                            :class="'order-badge order-' + (slotProps.data.status ? slotProps.data.status.toLowerCase() : '')">{{
                                                slotProps.data.status }}</span>
                                    </template>
                                </Column>
                                <Column headerStyle="width:4rem">
                                    <template #body>
                                        <Button icon="pi pi-search" />
                                    </template>
                                </Column>
                            </DataTable>
                        </div>
                    </template>
                </DataTable>
            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <h5>Subheader Grouping</h5>
                <DataTable :value="customer3" rowGroupMode="subheader" groupRowsBy="representative.name" sortMode="single"
                    sortField="representative.name" :sortOrder="1" scrollable scrollHeight="400px">
                    <Column field="representative.name" header="Representative"></Column>
                    <Column field="name" header="Name" style="min-width: 200px"></Column>
                    <Column field="country" header="Country" style="min-width: 200px">
                        <template #body="slotProps">
                            <img src="/demo/images/flag/flag_placeholder.png"
                                :class="'flag flag-' + slotProps.data.country.code" width="30" />
                            <span class="image-text ml-2">{{ slotProps.data.country.name }}</span>
                        </template>
                    </Column>
                    <Column field="company" header="Company" style="min-width: 200px"></Column>
                    <Column field="status" header="Status" style="min-width: 200px">
                        <template #body="slotProps">
                            <span :class="'customer-badge status-' + slotProps.data.status">{{ slotProps.data.status
                            }}</span>
                        </template>
                    </Column>
                    <Column field="date" header="Date" style="min-width: 200px"></Column>
                    <template #groupheader="slotProps">
                        <img :alt="slotProps.data.representative.name"
                            :src="'demo/images/avatar/' + slotProps.data.representative.image" width="32"
                            style="vertical-align: middle" />
                        <span class="image-text font-bold ml-2">{{ slotProps.data.representative.name }}</span>
                    </template>
                    <template #groupfooter="slotProps">
                        <td style="text-align: right" class="text-bold pr-6">Total Customers: {{
                            calculateCustomerTotal(slotProps.data.representative.name) }}</td>
                    </template>
                </DataTable>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
::v-deep(.p-datatable-frozen-tbody) {
    font-weight: bold;
}

::v-deep(.p-datatable-scrollable .p-frozen-column) {
    font-weight: bold;
}
</style>
