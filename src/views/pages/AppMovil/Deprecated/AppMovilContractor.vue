<template>
    
    <div class="card">
        <h2>{{ titulo }} Departamento: {{ fetchWorkCenter.name }}</h2>
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
                <!-- <h4>Trabajo diario de: {{ areawork }}</h4> -->
            </div>
            <!-- <div class="field col-12 md:col-6">
                <h4>
                    Empleado:
                    <span v-if="selectedEmployee && selectedEmployee.name">
                        {{ selectedEmployee.name }}
                    </span>
                    <span v-else> No selected employee </span>
                </h4>
            </div> -->
        </div>

        <TabView class="tabview-custom">
            <!-- <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        
                        <i class="pi pi-user" style="font-size: 2rem"></i>
                        <span class="font-bold white-space-nowrap">Empleados</span>
                    </div>
                </template>

                <div class="card flex justify-content-center">
                    <Listbox v-model="selectedEmployee" :options="availableAreaEmployees" optionLabel="name" filter class="w-full sm:w-64 md:w-96 lg:w-128 xl:w-1/2 2xl:w-2/3" listStyle="max-height:250px">
                        <template #option="slotProps">
                            <div class="flex align-items-center">
                                <img :alt="slotProps.option.name" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`flag flag-${slotProps.option.code.toLowerCase()} mr-2`" style="width: 18px" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Listbox>
                </div>
            </TabPanel>
             -->
            <TabPanel>
    <template #header>
        <div class="flex align-items-center gap-2">
            <!-- Trabajo avatar -->
            <i class="pi pi-wrench" style="font-size: 2rem"></i>

            <span class="font-bold white-space-nowrap">Trabajo</span>
        </div>
    </template>

    <div class="card">
         <!-- <pre>{{errorsNew}}</pre> 
         <pre>{{ work }}</pre> -->
        <div class="p-fluid formgrid grid">
            <!-- Labores -->
            <div class="field col-12 md:col-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-3">Labores:</label>
                    <AutoComplete
                        v-model="work"
                        inputId="ac"
                        :suggestions="works"
                        @complete="searchBranches"
                        field="name"
                        dropdown
                    />
                </div>
                <FrontEndErrors :errorsNew="errorsNew" name="work" />
                <BackendErrors :name="errorResponseAPI?.errors?.work"/>
            </div>

            <!-- Cantidad empleados -->
            <div class="field col-12 md:col-3">
                <div class="flex align-items-center">
                    <label for="username" class="font-semibold w-6">Cantidad empleados:</label>
                    <InputNumber
                        v-model="quantityEmployees"
                        showButtons
                        
                        style="width: 6rem"
                        :min="0"
                        :max="99">
                        <template #incrementbuttonicon>
                            <span class="pi pi-plus" />
                        </template>
                        <template #decrementbuttonicon>
                            <span class="pi pi-minus" />
                        </template>
                    </InputNumber>
                </div>
                <FrontEndErrors :errorsNew="errorsNew" name="quantityEmployees" />
                <BackendErrors :name="errorResponseAPI?.errors?.employee_qty"/>
            </div>

            <!-- Precio total -->
            <div class="field col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-float-label border-round border-1">
                        <span class="p-inputgroup font-bold ml-1">Precio total:</span>
                        <span class="p-float-label">
                            <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ totalTarif }}</label>
                        </span>
                        <span class="p-inputgroup-addon">$</span>
                    </span>
                </div>
                <FrontEndErrors :errorsNew="errorsNew" name="totalTarif" />
                <BackendErrors :name="errorResponseAPI?.errors?.totalTarif"/>
            </div>

            <!-- Precio unitario -->
            <div class="field col-12 md:col-3">
                <div class="p-inputgroup">
                    <span class="p-float-label border-round border-1">
                        <span class="p-inputgroup font-bold ml-1">Precio unitario:</span>
                        <span class="p-float-label">
                            <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ unitTarif.toFixed(2)}}</label>
                        </span>
                        <span class="p-inputgroup-addon">$</span>
                    </span>
                </div>
            </div>
        </div>
        <FrontEndErrors :errorsNew="errorsNew" name="unitTarif" />
        <BackendErrors :name="errorResponseAPI?.errors?.unitTarif"/>
    </div>

    <div class="card">
        <PickList 
            v-model="dataPickList" 
            :source="dataPickList[0]" 
            :target="dataPickList[1]" 
            listStyle="height:342px" 
            dataKey="id" 
            breakpoint="1400px"
        >
            <template #sourceheader>
                <div class="flex gap-2">
                    <div class="w-full justify-content-center">Available: {{ dataPickList[0].length }}</div>
                    <div class="p-inputgroup">
                        <InputText id="search" v-model="search" placeholder="Filter" size="small" />
                    </div>
                </div>    
            </template>
            <template #targetheader>
                <div class="flex gap-2">
                    <div class="w-full justify-content-center">Selected: {{ dataPickList[1].length }}</div>
                    <div class="w-full justify-content-center">Max: {{ dataPickList[1].length }}</div>
                    
                </div>   
                </template>
            <template #item="slotProps">
                <div class="flex flex-wrap p-2 align-items-center gap-3">
                    <!-- Conditional rendering for image or icon -->
                    <div class="w-4rem flex-shrink-0 border-round">
                        <img 
                            v-if="slotProps.item.photo" 
                            :src="slotProps.item.photo" 
                            :alt="slotProps.item.full_name" 
                            class="w-full border-round"
                        />
                        <i 
                            v-else 
                            class="pi pi-user" 
                            style="font-size: 2rem; color: gray;" 
                        ></i>
                    </div>
                    <div class="flex-1 flex flex-column gap-2">
                        <span class="font-bold">{{ slotProps.item.full_name }}</span>
                        <div class="flex align-items-center gap-2">
                            <i class="pi pi-tag text-sm"></i>
                            <span>{{ slotProps.item.document }}</span>
                        </div>
                    </div>
                    <span class="font-bold">{{ slotProps.item.workCenter.code }}</span>

                </div>
            </template>
        </PickList>

        <!-- Display a message if PickList is empty -->
        <div v-if="dataPickList[0].length === 0 && !loading" class="text-center">
            <p>No available data</p>
        </div>
        <div v-if="loading" class="text-center">
            <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
            <p>Loading data...</p>
        </div>
    </div>
    <div class="p-fluid formgrid grid">
        <div class="field col-12">
            <label for="notas">Notas</label>
            <Textarea id="address" rows="2" v-model="notesV" />
        </div>
        <FrontEndErrors :errorsNew="errorsNew" name="notesV" />
        <BackendErrors :name="errorResponseAPI?.errors?.notesV"/>
    </div>

    <div class="field col-12">
        
        <Button class="flex-auto" type="button" label="Enviar" @click="actionRecordManager(state)" />
    </div>
</TabPanel>

            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Detalles avatar -->
                        <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" /> -->
                        <span class="font-bold white-space-nowrap">Detalles</span>
                    </div>
                </template>

                <div>
                    <h4>Supervisor : {{ data_planner.nameSupervisor }}</h4>
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12 md:col-6">
                            <pre>Lote Despacho : {{ data_planner.lot_dispatch }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Fecha Planeada :{{ data_planner.planner_date }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Producto:{{ data_planner.product_type }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Variedad : {{ data_planner.product_variant }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Empaque:{{ data_planner.packing_type }}</pre>
                        </div>
                        <div class="field col-12 md:col-6">
                            <pre>Dia laboral : {{ data_planner.day_type }}</pre>
                        </div>
                    </div>
                </div>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Resumen avatar-->
                        <i class="pi pi-bars" style="font-size: 2rem"></i>
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" /> -->
                        <span class="font-bold white-space-nowrap">Resumen</span>
                        <Badge value="2" />
                    </div>
                </template>

                <DataTable :value="worksDay" tableStyle="min-width: 50rem">
                    <ColumnGroup type="header">
                        <Row>
                            <Column header="Empleado" :rowspan="3" />
                        </Row>
                        <Row>
                            <Column header="Trabajos" :colspan="2" />
                        </Row>
                        <Row>
                            <Column header="Cantidad" sortable field="lastYearProfit" />
                            <Column header="Precio" sortable field="thisYearProfit" />
                        </Row>
                    </ColumnGroup>
                    <Column field="employee" />

                    <Column field="quantity">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.quantity) }}
                        </template>
                    </Column>
                    <Column field="totalPrice">
                        <template #body="slotProps">
                            {{ formatCurrency(slotProps.data.totalPrice) }}
                        </template>
                    </Column>

                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="Totals:" :colspan="1" footerStyle="text-align:left" />
                            <Column :footer="quantities" />
                            <Column :footer="totalPrices" />
                        </Row>
                    </ColumnGroup>
                </DataTable>
            </TabPanel>
        </TabView>
        <Toast />
    </div>
    
</template>
    
    <script setup>
import { ref, computed, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
///Demo  App Movil
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import { z } from 'zod';

import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import { toTypedSchema } from '@vee-validate/zod';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import * as XLSX from 'xlsx';
import Summary from '@/components/Summary.vue';
import ActionButton from '@/components/ActionButton.vue';
import { useActions } from '@/composables/ActionButton.js';
import { useAppMovilService } from '@/service/appMovil/appMovilService_V3';
const {getDonesWork, HOLIDAY, initData, TASK_OF_TYPE, getUsers, getDataTasksplanner,getInfoEmployees,fetchWorkCenter,getTarifOfTasksDoneAppMob,getTarifOfWorks } = useAppMovilService();
// import { ProductService } from '@/service/ProductService'
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const supervisoryEmployee = sessionStorage.getItem('accesSessionEmployeeUuid');
//const crudService = CrudService(endpoint.value);
let endpoint = ref('/transactions/contractor/work'); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const toast = useToast();
const Works = ref([]);
const works = ref([]);
const titulo = ref('');


// Original dataPickList list
// const originalAvailablePickList = ref([
//     { document: "1000", code: "f230fh0g3", full_name: "Empleado Uno", description: "Area Corta", image: "bamboo-watch.jpg", price: 65, category: "Albaca Nufar", quantity: 24, inventoryStatus: "282-259", rating: 5 },
//     { document: "1001", code: "nvklal433", full_name: "Empleado Dos", description: "Area Corta", image: "black-watch.jpg", price: 72, category: "Albaca Nufar", quantity: 61, inventoryStatus: "INSTOCK", rating: 4 },
//     { document: "1002", code: "zz21cz3c1", full_name: "Empleado Tres", description: "Area Selección", image: "blue-band.jpg", price: 79, category: "Albaca Nufar", quantity: 2, inventoryStatus: "LOWSTOCK", rating: 3 },
//     { document: "1003", code: "244wgerg2", full_name: "Empleado Cuatro", description: "Product Description", image: "blue-t-shirt.jpg", price: 29, category: "Clothing", quantity: 25, inventoryStatus: "INSTOCK", rating: 5 },
//     { document: "1004", code: "h456wer53", full_name: "Empleado Cinco", description: "Contratista", image: "bracelet.jpg", price: 150, category: "DesHierba", quantity: 73, inventoryStatus: "INSTOCK", rating: 4 },
//     { document: "1005", code: "av2231fwg", full_name: "Empleado Seis", description: "Contratistas", image: "brown-purse.jpg", price: 120, category: "Accessories", quantity: 0, inventoryStatus: "OUTOFSTOCK", rating: 4 },
//     { document: "1006", code: "bib36pfvm", full_name: "Empleado Ocho", description: "Pre Frio", image: "chakra-bracelet.jpg", price: 320, category: "Accessories", quantity: 5, inventoryStatus: "LOWSTOCK", rating: 3 },
//     { document: "1007", code: "mbvjkgip5", full_name: "Empleado Nueve", description: "Agronomía", image: "galaxy-earrings.jpg", price: 340, category: "Accessories", quantity: 23, inventoryStatus: "INSTOCK", rating: 5 },
//     { document: "1008", code: "vbb124btr", full_name: "Empleado Diez", description: "Empaque", image: "game-controller.jpg", price: 990, category: "Electronics", quantity: 2, inventoryStatus: "LOWSTOCK", rating: 4 }
// ]);

const originalAvailablePickList = ref([]);

// Products structure: [availableProducts, selectedProducts]
const dataPickList = ref([originalAvailablePickList.value.slice(), []]);

// Search term
const search = ref('');

const totalTarif = ref(1000); // Total Tarif input from the user
const unitTarif = computed(() => {
    const length = dataPickList.value[1].length;
    return length > 0 ? totalTarif.value / length : 0; // Avoid division by zero
});
const maxEmployees = 20; // Maximum number of employees


watch(search, (newSearch) => {
    const searchTerm = newSearch.toLowerCase();

    // Filtrar la lista original basado en el término de búsqueda y elementos seleccionados
    dataPickList.value[0] = originalAvailablePickList.value.filter(
        (item) =>
            item.full_name.toLowerCase().includes(searchTerm) && // Coincide con la búsqueda
            !dataPickList.value[1].some((selected) => selected.id === item.id) // No está ya seleccionado
            // ||
        // element.description.toLowerCase().includes(searchTerm) ||
        // element.category.toLowerCase().includes(searchTerm)
    );
});



onMounted(async () => {
    await loadLazyData();
    titulo.value = `Título: ${TASK_OF_TYPE.name || 'Sin nombre'}`;
    
});



onBeforeMount(() => {
    readAll();
    // ProductService.getProductsSmall().then((data) => (dataPickList.value = [data, []]));

});
const readAll = async () => {
    // const respWorks = await InitialDataService.getBranches();
    // console.log('respWorks', respWorks);
    // if (!respWorks.ok) toast.add({ severity: 'error', detail: 'Error' + respWorks.error, life: 3000 });
    // Works.value = respWorks.data.data.map((work) => ({ id: work.uuid, name: work.name }));


    // const respWorks = process.env.NODE_ENV === 'development' ? { ok: true, data: { data: mockTestData } } : await InitialDataService.getBranches();

    // if (!respWorks.ok) {
    //     toast.add({ severity: 'error', detail: `Error: ${respWorks.error}`, life: 3000 });
    //     return;
    // }

    // Works.value = respWorks.data.data.map((work) => ({
    //     id: work.uuid,
    //     name: work.name
    // }));
    // works.value = [...Works.value];

    // loading.value = true; // Show loading indicator
    try {
        
        const response = await getUsers();;
        if (!response.ok) {
            toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
            return;
        }

        // Populate originalAvailablePickList
        originalAvailablePickList.value = response.data.data;
// console.log('originalAvailablePickList', originalAvailablePickList.value);
        // Update the dataPickList with the new data
        dataPickList.value[0] = [...originalAvailablePickList.value];
        dataPickList.value[1] = []; // Clear the target list
    } catch (error) {
        toast.add({ severity: 'error', detail: 'An error occurred while loading data.', life: 3000 });
    } finally {
        loading.value = false; // Hide loading indicator
    }

    try{
        const responseDonesWork = await getDonesWork();
        console.log('responseDonesWork', responseDonesWork);
        if (!responseDonesWork.ok) {
            toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
            return;
        }
        Works.value = responseDonesWork.data.data.map((element) => ({ id:element.id,uuid: element.uuid, name: element.name, work_type_tarif: element.work_type_tarif }));    
        console.log('Works', Works.value);
    
    }
    catch (error) {
        toast.add({ severity: 'error', detail: 'An error occurred while loading data.', life: 3000 });
    } finally {
        loading.value = false; // Hide loading indicator
    }

    
};
const mockTestData = [
    { uuid: 'bcae5809-faeb-4dad-ac08-274f2e1ff280', name: 'Labor 01', code: 'L01' },
    { uuid: '7f93c5c0-251f-456c-9c2c-4c38ab1f6e80', name: 'Labor 02', code: 'L02' }
];



const searchBranches = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            works.value = [...Works.value];
        } else {
            works.value = Works.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    initialValues: {
        work: null,
        quantityEmployees: 0,

        notesV: ''
    },
    validationSchema: toTypedSchema(
        z.object({
            work: z
                .object({
                    work_type_tarif: z.string().min(4),
                    name: z.string().min(4),
                    uuid: z.string().min(4)
                })
                .optional(),
            quantityEmployees: z.number().min(1).max(20).refine(val => val === dataPickList.value[1].length, {
                    message: "La cantidad de empleados debe coincidir con los seleccionados."
                }),

            notesV: z.string().min(4).max(100)
        })
    )
});

const [work] = defineField('work');
const [quantityEmployees] = defineField('quantityEmployees');
const [notesV] = defineField('notesV');


const state = ref('new');
const actionRecordManager = handleSubmitNew(async (values) => {
    const responseCRUD = ref();
    console.log('dataPickList', dataPickList.value[1]);
    console.log(values)
    const today = new Date();
    const data = {
        trans_dev: false,
        transaction_date_send: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
        calendar_uuid: null,
        tasks_of_type_uuid: TASK_OF_TYPE.uuid,
        supervisory_employee_uuid: supervisoryEmployee,
        type_price_task: 'WorkDone',
        done_of_type_uuid: values.work.uuid,
        work_type_tarif: values.work?.work_type_tarif || "No me llega nada", 
        
        // employee_qty: dataPickList.value[1].map((item) => (item.id)).length,
        employee_qty: values.quantityEmployees,
        
        //employees_ids:dataPickList.value[1].map((item) => ({ id: item.id })),
        employees_ids:dataPickList.value[1].map((item) => (item.id)),
        total_tarif_task:totalTarif.value,
        
        unitPrices: unitTarif.value,




        farm_uuid: farmDefault,
	    notes_small: "",
	    transdate_sync: null,
	    device_name: "Web"
    };
    console.log(JSON.stringify(data, null, 2));
    console.log(work.value)

    
    if (state.value === 'new') {
         responseCRUD.value = await crudService.create(data);
         loadLazyData();
        // console.log('data:', data);
    } else if (state.value === 'edit') {
        const { uuid } = listRowSelect.value[0];
        responseCRUD.value = await crudService.update(uuid, data);

    } else if (state.value === 'clone') {
        
        responseCRUD.value = await crudService.create(data);
    }
    else if (state.value === 'patch') {
        responseCRUD.value = await crudService.patch(uuid, data);
    }
 else {
        const { uuid } = listRowSelect.value[0];
    }

    console.log('responseCRUD', responseCRUD.value);
    // Mostrar notificación y cerrar el diálogo si la operación fue exitosa
    if (responseCRUD.value.ok) {
        console.log('Entreeeeeee')

    toast.add({
        severity: responseCRUD.value.ok ? 'success' : 'error',
        summary: state.value,
        detail: responseCRUD.value.ok ? 'Done' : responseCRUD.value.error,
        life: 3000
    });
    
    resetForm(); // Reset the form fields

// Reset selected employees
    dataPickList.value = [originalAvailablePickList.value.slice(), []];

    // Reset other variables
    totalTarif.value = 1000;
    works.value = [];
    work.value = null;
    quantityEmployees.value = 0;
    notesV.value = "";

    // Reload Data
    await loadLazyData();
    await readAll();

        formDialog.value = false;
        listRowSelect.value = [];
        selectedRegisters.value = [];
    }
    else {
        console.log('Error:', responseCRUD.value.error);
    }
});

watch(work, async () => {
    console.log('work', work.value.work_type_tarif);
    // console.log('work', work.value);
    // console.log('TaskOfTypeID',TASK_OF_TYPE.id)

    //const tarifOfWors = await getTarifOfWorks();
    //console.log('tarifOfWors', tarifOfWors.data.data.filter(item => item.done_type.name === work.value.name));
    const valueTarif = await getTarifOfTasksDoneAppMob(TASK_OF_TYPE.id,HOLIDAY,work.value.work_type_tarif,work.value.id)
    console.log('valueTarif', valueTarif.data.data[0].price_tarif);
    
    totalTarif.value = valueTarif.data.data[0].price_tarif;
    
});

watch(totalTarif, (newTotalTarif) => {
    // Update the unit price when the total price changes
    unitTarif.value = dataPickList.value[1].length > 0 ? newTotalTarif / dataPickList.value[1].length : 0;
});

const selectedCountry = ref();
const countries = ref([
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

const selectedEmployee = ref();
const availableAreaEmployees = ref([
    { name: 'Employee 1', code: 'AU', id: 1 },
    { name: 'Employee 2', code: 'BR', id: 2 },
    { name: 'Employee 3', code: 'CN', id: 3 },
    { name: 'Employee 4', code: 'EG', id: 4 },
    { name: 'Employee 5', code: 'FR', id: 5 },
    { name: 'Employee 6', code: 'DE', id: 6 },
    { name: 'Employee 7', code: 'IN', id: 7 },
    { name: 'Employee 8', code: 'JP', id: 8 },
    { name: 'Employee 9', code: 'ES', id: 9 },
    { name: 'Employee 10', code: 'US', id: 10 }
]);

const sales = ref([
    { product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54406, thisYearProfit: 43342 },
    { product: 'Black Watch', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 423132, thisYearProfit: 312122 },
    { product: 'Blue Band', lastYearSale: 38, thisYearSale: 5, lastYearProfit: 12321, thisYearProfit: 8500 },
    { product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 22, lastYearProfit: 745232, thisYearProfit: 65323 },
    { product: 'Brown Purse', lastYearSale: 17, thisYearSale: 79, lastYearProfit: 643242, thisYearProfit: 500332 },
    { product: 'Chakra Bracelet', lastYearSale: 52, thisYearSale: 65, lastYearProfit: 421132, thisYearProfit: 150005 },
    { product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 12, lastYearProfit: 131211, thisYearProfit: 100214 },
    { product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 66442, thisYearProfit: 53322 },
    { product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 765442, thisYearProfit: 296232 },
    { product: 'Gold Phone Case', lastYearSale: 75, thisYearSale: 54, lastYearProfit: 21212, thisYearProfit: 12533 }
]);

const worksDay = ref([
    { employee: 'Empleado 1', quantity: 54406, totalPrice: 43342 },
    { employee: 'Empleado 1', quantity: 54406, totalPrice: 43342 },
    { employee: 'Empleado 1', quantity: 54406, totalPrice: 43342 }
]);

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const lastYearTotal = computed(() => {
    let total = 0;
    for (let sale of sales.value) {
        total += sale.lastYearProfit;
    }

    return formatCurrency(total);
});

const quantities = computed(() => {
    let total = 0;
    for (let workDay of worksDay.value) {
        total += workDay.quantity;
    }

    return total;
});
const thisYearTotal = computed(() => {
    let total = 0;
    for (let sale of sales.value) {
        total += sale.thisYearProfit;
    }

    return formatCurrency(total);
});

const totalPrices = computed(() => {
    let total = 0;
    for (let workDay of worksDay.value) {
        total += workDay.totalPrice;
    }

    return formatCurrency(total);
});

const data_planner = ref({
    document: 'XXXXXX',
    planner_date: '2024-01-13',
    product_type: 'Albaca',
    product_variant: 'Nufar',
    packing_type: 'Icopor',
    lot_dispatch: '20822-5589',
    name_employee: 'Nombre del empleado',
    nameSupervisor: 'Nombre Supervisor',
    areawork: 'Corta',
    day_type: 'Festivo',
    day_price: 1500.0,
    total_packing: 500
});

const quanty = ref();
const pricetotal = ref();
const priceunit = ref(1850);
const selected_crops_lots = ref();
const crops_lots = [
    { name: 'L1', code: 'L1' },
    { name: 'L2', code: 'L2' },
    { name: 'L3', code: 'L3' }
];

const select_tasks_type = ref({ name: '', code: '' });

const task_type = [
    { name: 'Task', code: 'Task' },
    { name: 'HoraExtra', code: 'HoraExtra' },
    { name: 'Labor Contratista', code: 'Labor' }
];

const select_dones_work = ref();
const dones_work = [
    { name: 'ASEO', code: 'A01' },
    { name: 'CANASTILLA', code: 'A02' },
    { name: 'DESEMSEMILLADA', code: 'A03' },
    { name: 'DESHIERBA', code: 'A04' }
];

const areawork = ref('Corta');

const onSelectAllChangeItems = (event) => {
    selectedItems.value = event.checked ? items.value.map((item) => item.value) : [];
    selectAll.value = event.checked;
};
const onChange = (event) => {
    selectAll.value = event.value.length === items.value.length;
};

const selectedItems = ref();
const selectAll = ref(false);
const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));

//////
const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();


const loading = ref(false);

const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

const filters = ref();
onBeforeMount(() => {
    initFilters();
});

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        //xxxx: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'work.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    await getAllResponseAPI(endpoint.value);
    loading.value = false;
    //data_planner.product_type.value = dataResponseAPI.data[0].product.name;
};

const listRowSelect = ref([]);
const selectedRegisters = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};
//Cut and paste this at the end
watch(listRowSelect, onRowSelect);
const onSelectAllChange = () => {
    onRowSelect();
};

const mode = ref();
const formDialog = ref(false);
const deleteDialog = ref(false);
const headerDialog = ref('');
const hideDialog = () => {
    formDialog.value = false;
    deleteDialog.value = false;
    recordsDelete.value = [];
    resetValues();
};
const resetValues = () => {};
const assignValues = (modex) => {
    if (modex === 'EDIT') {
    }
    if (modex === 'CLONE') {
    }
};
const openNew = () => {
    mode.value = 'NEW';
    resetValues();
    formDialog.value = true;
    headerDialog.value = 'New xxxxxxx record';
};
const openEdit = () => {
    mode.value = 'EDIT';
    formDialog.value = true;
    headerDialog.value = 'Edit a xxxxx record';
    assignValues(mode.value);
};
const openClone = () => {
    mode.value = 'CLONE';
    headerDialog.value = 'Clone a xxxx record';
    formDialog.value = true;
    assignValues(mode.value);
};
let recordsDelete = ref([]);
const openDelete = () => {
    mode.value = 'DELETE';
    headerDialog.value = 'Delete a xxxxx record';
    resetValues();
    deleteDialog.value = true;
};
const openExport = () => {
    mode.value = 'EXPORT';
    headerDialog.value = 'Export a xxxxx record';
    resetValues();
    formDialog.value = true;
};
</script>
    
    <style lang="scss" scoped>
</style>