<template>
    <div class="card">
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
                <h4>Trabajo diario de: {{ areawork }}</h4>
            </div>
            <div class="field col-12 md:col-6">
                <h4>
                    Empleado:
                    <span v-if="selectedEmployee && selectedEmployee.name">
                        {{ selectedEmployee.name }}
                    </span>
                    <span v-else> No selected employee </span>
                </h4>
            </div>
        </div>

        <TabView class="tabview-custom">
    

            <TabPanel>
                 <hr>
            {{ plannertask }}
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Empleado avatar-->
                        <i class="pi pi-user" style="font-size: 2rem"></i>
                        <!-- <span class="font-bold white-space-nowrap">Empleados</span> -->
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
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Trabajo avatar -->
                        <i class="pi pi-wrench" style="font-size: 2rem"></i>

                        <span class="font-bold white-space-nowrap">Trabajo</span>
                    </div>
                </template>

                <div class="col-12">
                    <div class="card">
                        <!-- <p>Empleado : {{ data_planner.name_employee }}</p> -->

                        <div class="p-fluid formgrid grid">
                            <div class="field col-12 md:col-6">
                                <label id="tasktype" for="tasktype">Tipo Actividad</label>
                                <Dropdown v-model="select_tasks_type" :options="task_type" filter  id="tasktype" optionLabel="name" placeholder="Select Task" class="w-full md:w-20rem" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="crops_lots">Lote</label>
                                <Dropdown v-model="selected_crops_lots" :options="crops_lots" filter optionLabel="name" placeholder="Select Lots" class="w-full md:w-20rem" />
                            </div>
                            <div v-if="select_tasks_type.name !== 'Task'" class="field col-12 md:col-6">
                                <label for="dones_work">Labor</label>
                                <Dropdown v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" placeholder="Select Labor" class="w-full md:w-20rem" />
                            </div>
                            <div class="field col-12 md:col-6">
                                <label for="quanty">Quanty</label>
                                <InputNumber v-model="quanty" inputId="minmax" :min="1" :max="5" />
                            </div>

                            <div class="field col-12 md:col-6">
                                <label for="weightunit">Peso Aproximado</label>
                                <p>
                                    <label for="weightunit">4.0 Kg</label>
                                </p>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="priceunit">Precio Unitario</label>
                                <p>
                                    <label for="peso">{{ priceunit }}</label>
                                </p>
                            </div>
                            <div class="field col-12 md:col-3">
                                <label for="priceunit">Precio Total</label>
                                <p>
                                    <label for="peso">{{ quanty * priceunit }}</label>
                                </p>
                            </div>
                            <div class="field col-12">
                                <label for="notas">Notas</label>
                                <Textarea id="address" rows="2" />
                            </div>
                        </div>

                        <div class="field col-12">
                            <Button label="Enviar" icon="pi pi-check" />
                        </div>
                    </div>
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
    </div>
</template>

<script setup>
import { ref, computed, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import AppMovilCortaService from '@/service/AppMovilCorta.js';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';

let endpoint = ref('/planner_tasks'); //replace endpoint with your endpoint

const { availableAreaEmployees, worksDay, task_type, crops_lots, dones_work, size, sizeOptions, data_planner,
    priceunit, plannertask, tasktarifs,areawork } = UseAppMovil();
    
const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI,
        postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
        useDataAPI();

const quanty = ref();
const pricetotal = ref();

const selected_crops_lots = ref();
const selectedEmployee = ref();
const select_tasks_type = ref({ name: '', code: '' });
const select_dones_work = ref();

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


onMounted(async () => {
    const appmovilcortaService = new AppMovilCortaService(getAllResponseAPI);
    plannertask.value = await appmovilcortaService.getPlannerTask(4,1,1);
    workcenters.value = await appmovilcortaService.getEmployeesWorkCenter(2);
    tasktarifs.value = await appmovilcortaService.getTasksTarif(4, 1);
    // await loadLazyData();
});




</script>

<style lang="scss" scoped></style>