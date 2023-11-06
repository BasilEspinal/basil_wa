<script setup>
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import TableService from '@/service/TableService';
import { ref, onBeforeMount, defineEmits, watch } from 'vue';

const columnas = ref([]);
const column = ref(null);
const headerNames = ref(null);

// Filtro
const filters = ref(null);
const loading = ref(null);
const tableData = ref(null);
const tableService = new TableService();
const selectedProduct = ref([]);
const emits = defineEmits([]);
//const dataMod = ref(props.dataMod);
const dt = ref();

const loadingData = () => {
    columnas.value = [];
    column.value = null;
    headerNames.value = null;
    tableData.value = null;
    selectedProduct.value = [];
    loading.value = true;
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
    };
    console.log("reloading data");
    fetchInfoAndUpdateValue();
};

/**
 * The `onBeforeMount` function is a lifecycle hook in Vue that is called right before the component is
 * mounted to the DOM. In this case, it is used to perform some initialization tasks before the
 * component is rendered.
 */
onBeforeMount(loadingData);

/**
 * The `initFilters` function is initializing the filters for each column in the table. It loops
 * through each element in the `columnas` array and sets the filter configuration for that column in
 * the `filters` object.
 */
const initFilters = () => {
    columnas.value.forEach((element) => {
        filters.value[element.field] = {
            operator: FilterOperator.AND,
            constraints: [
                {
                    value: null,
                    matchMode: FilterMatchMode.STARTS_WITH
                }
            ]
        };
    });
    loading.value = false;
};

/**
 * The `clearFilter` function is a helper function that is called when the "Limpiar" (Clear) button is
 * clicked. It resets the filters for each column in the table by calling the `initFilters` function.
 * This function sets the filter configuration for each column to its initial state, which is having a
 * `null` value and a `FilterMatchMode.STARTS_WITH` match mode.
 */
const clearFilter = () => {
    initFilters();
};

// eslint-disable-next-line no-unused-vars
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

// eslint-disable-next-line no-unused-vars
const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

/**
 * The `const props = defineProps({ ... })` statement is defining the props for the Table component.
 * @param pathApi the path to the API
 * @param title main component title
 * @param jsonDataPath the path to the JSON data
 */
const props = defineProps({
    pathApi: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: 'Tabla de registro de corte'
    },
    jsonDataPath: {
        type: String,
        default: 'data'
    },
    dataMod: {
        type: Object
    }
});

/**
 * The `fetchInfoAndUpdateValue` function is an asynchronous function that is responsible for fetching
 * data from an API and updating the `tableData` value, which is used to populate the table in the Table
 * component.
 */
async function fetchInfoAndUpdateValue() {
    try {
        let data = await tableService.getInfo(props.pathApi);
        const path = props.jsonDataPath.split('.');
        path.forEach((element) => {
            data = data[element];
        });
        tableData.value = data;
        console.log(data)
        let mappedArray1 = [];

        const types = ['string', 'number'];

        for (let key in data[0]) {
            if (types.includes(typeof data[0][key]))
                mappedArray1.push(key);
        }

        columnas.value = mappedArray1.map((item) => {
            return {
                field: item,
                header: item.replaceAll('_', ' ').toUpperCase(),
                position: mappedArray1.indexOf(item)
            };
        });

        column.value = columnas.value;
        headerNames.value = column.value.map((col) => col.field);
        initFilters();
        emits('HeaderNames', data[0]);
    } catch (error) {
        tableData.value = ref([]);
        headerNames.value = ref([]);
        loading.value = false;
        console.error('Error fetching cut data:', error);
    }
}

const onRowSelect = () => {
    emits('onRowSelect', selectedProduct.value);
};

const onSelectAllChange = () => {
    onRowSelect();
};

const exportData = (data) => {
    data.data ? exportTableToCSV(data.name) : exportExcel(data.name);
};

watch(
    () => props.dataMod,
    () => {
        switch (props.dataMod.mode) {
            case 'NEW':
                break;
            case 'EDIT':
                break;
            case 'CLONE':
                break;
            case 'DELETE':
                break;
            case 'EXPORT':
                exportData(props.dataMod.data);
                break;
            default:
                return;
        }
    }
);

watch(
    () => props.pathApi,
    (x, y) => {
        console.log(x, y);
        loadingData();
    },
    { immediate: true }
);

const exportExcel = (name) => {
    const uri = 'data:application/vnd.ms-excel;base64,';
    const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    const base64 = (s) => window.btoa(unescape(encodeURIComponent(s)));

    const format = (s, c) => s.replace(/{(\w+)}/g, (m, p) => c[p]);

    const htmls = document.getElementById('tblData').innerHTML;

    const ctx = {
        worksheet: 'Worksheet',
        table: htmls
    };

    const link = document.createElement('a');
    link.download = name;
    link.href = uri + base64(format(template, ctx));
    link.click();
};

function downloadCSV(csv, name) {
    const csvFile = new Blob([csv], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = name;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

function exportTableToCSV(name) {
    let csv = [];
    const rows = document.querySelectorAll('table tr');

    for (let i = 0; i < rows.length; i++) {
        let row = [],
            cols = rows[i].querySelectorAll('td, th');

        for (let j = 0; j < cols.length; j++) row.push(cols[j].innerText);

        csv.push(row.join(','));
    }

    downloadCSV(csv.join('\n'), name);
}

/**
 * The `onColumnsChange` function is a callback function that is called when the selected columns in
 * the MultiSelect component are changed. It takes the updated `column` array as a parameter.
 */
const onColumnsChange = (column) => {
    column.sort((a, b) => a.position - b.position);
};
</script>
<template>
    <div class="col-12 md:col-12">
        <div class="card">
            <h4 v-text="props.title"></h4>
            <div class="card">
                <h5>¿Cuales columnas quieres ver?</h5>
                <MultiSelect v-model="column" :options="columnas" optionLabel="field" placeholder="Seleccione columnas" :filter="true" display="chip" class="w-full md:w-50rem" @change="onColumnsChange(column)">
                    <template #value="slotProps">
                        <div class="inline-flex align-items-center py-1 px-2 bg-primary text-primary border-round mr-2" v-for="option of slotProps.value" :key="option.header">
                            <div>{{ option.header }}</div>
                        </div>
                    </template>

                    <template #option="slotProps">
                        <div class="flex align-items-center">
                            <div>{{ slotProps.option.header }}</div>
                        </div>
                    </template>
                </MultiSelect>
            </div>
            <DataTable
                id="tblData"
                v-model:selection="selectedProduct"
                :value="tableData"
                :paginator="true"
                class="p-datatable-gridlines"
                :rows="10"
                dataKey="id"
                :rowHover="true"
                v-model:filters="filters"
                filterDisplay="menu"
                :loading="loading"
                :filters="filters"
                responsiveLayout="scroll"
                :ref="dt"
                :globalFilterFields="headerNames"
                @row-select="onRowSelect"
                @row-unselect="onRowSelect"
                @select-all-change="onSelectAllChange"
            >
                <template #header>
                    <div class="flex justify-content-between flex-column sm:flex-row">
                        <Button type="button" icon="pi pi-filter-slash" label="Limpiar" class="p-button-outlined mb-2" @click="clearFilter()" />
                        <span class="p-input-icon-left mb-2">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Buscar" style="width: 100%" />
                        </span>
                    </div>
                </template>
                <template #empty> No se encontraron datos. </template>
                <template #loading> Cargando los datos por favor espere. </template>

                <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>

                <Column id="col" v-for="col of column" :key="col.field" :field="col.field" :header="col.header" :enable="col.enabled" :filterField="col.field" style="min-width: 1rem">
                    <template #body="{ data }">
                        {{ data[col.field] }}
                    </template>
                    <template #filter="{ filterModel }">
                        <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Buscar por nombre" />
                    </template>
                </Column>
            </DataTable>
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