<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import { useAppMovilService } from '../../../service/appMovil/appMovilService';
import { useToast } from 'primevue/usetoast';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import ItemUserAppMovil from './ItemUserAppMovil.vue';
//////////////
const { worksDay, data_planner } = UseAppMovil();
import { AppMovilDataService_V2 } from '@/service/appMovil/appMovilService_V2';
const errorSummary = ref(false);
const summary = ref();
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
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const totalTaskQtyTask = ref(0);
const totalTaskTotal = ref(0);
const totalTaskQtyHoraExtra = ref(0);
const totalHoraExtraTotal = ref(0);
const totalTaskQtyLabor = ref(0);
const totalLaborTotal = ref(0);
const totalTaskQtyJournal = ref(0);
const totalJournalTotal = ref(0);

const getDataEmployeesInfo = async (employee_id) => {
    const response = await AppMovilDataService_V2.getInfoEmployeesById(props.data.id, employee_id);
    if (!response.ok) {
        toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });

        errorSummary.value = true;
    }
    summary.value = response.data.data;
    console.log('pruea');

    // const lastYearTotal = computed(() => {
    //     let total = 0;
    //     for(let sale of sales.value) {
    //         total += sale.lastYearProfit;
    //     }

    //     return formatCurrency(total);
    // });

    // const thisYearTotal = computed(() => {
    //     let total = 0;
    //     for(let sale of sales.value) {
    //         total += sale.thisYearProfit;
    //     }

    //     return formatCurrency(total);
    // });
    console.log('uuuu');
    totalTaskQtyTask.value = computed(() => {
        console.log('aaaa');
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_task) || 0;
        }
        return total;
    });

    totalTaskTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_task) || 0;
        }
        return total;
    });

    totalTaskQtyHoraExtra.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_hora_extra) || 0;
        }
        return total;
    });

    totalHoraExtraTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_hora_extra) || 0;
        }
        return total;
    });

    totalTaskQtyLabor.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_labor) || 0;
        }
        return total;
    });

    totalLaborTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_labor) || 0;
        }
        return total;
    });

    totalTaskQtyJournal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.task_qty_journal) || 0;
        }
        return total;
    });

    totalJournalTotal.value = computed(() => {
        let total = 0;
        for (let item of summary.value) {
            total += parseFloat(item.total_journal) || 0;
        }
        console.log(total);
        return total;
    });
};

////////////////////////////////////////////////////////////

const props = defineProps({
    dataUsers: { type: Array },
    Lote: { type: Array },
    data: { type: Object }
});

const toast = useToast();
const { t } = useI18n();
const { SUPERVISO_NAME, getTipoActividad, HOLIDAY, dataInfoUser } = useAppMovilService();
const workView = ref(true);
const supervisoName = ref('');
const editingRows = ref([]);
const editable = ref(true);
const tipoActividad = ref(null);
const estilo = ref({
    table: { style: `min-width: 25remP; background-color: var(--surface-300);` },
    column: { bodycell: ({ state }) => ({ style: state['d_editing'] ? `padding-top: 0.2rem; padding-bottom: 0.2rem;` : `background-color: var(--surface-200);` }) }
});

onMounted(async () => {
    supervisoName.value = SUPERVISO_NAME;
    TipoActividad();
});

onBeforeMount(async () => {});

const TipoActividad = async () => {
    const response = await getTipoActividad();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    tipoActividad.value = response?.data;
};

const changeWorkView = async () => {
    workView.value = !workView.value;

    // event.stopPropagation();
    
    await getDataEmployeesInfo(127);


};

const onTabChange = async (id, event) => {
    
    if (event.index === 1) { 
        await getDataEmployeesInfo(id);
    }
};


const onRowEditSave = (event) => {
    let { newData, index } = event;
    worksDay.value[index] = newData;
};
</script>

<template>
    <div>
        <Toast />
        <Accordion>
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id">
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <Avatar style="min-width: 2rem" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <h3>
                            <span class="responsive-text font-bold white-space-nowrap overflow-hidden w-full">{{ slotProps.first_name }}</span>
                        </h3>
                        
                        <!-- <Button class="w-8rem" :label="t('appmovil.trabajos')" :disabled="workView" @click="changeWorkView(slotProps.id)" size="small" outlined />
                        <Button class="w-8rem" :label="t('appmovil.detalles')" :disabled="!workView" @click="changeWorkView(slotProps.id)" size="small" severity="secondary" outlined /> -->
                    </span>
                </template>
                <TabView @tab-change="onTabChange(slotProps.id, $event)">
                    
                    <TabPanel :header="t('appmovil.trabajos')">
                        <pre>{{slotProps.id}}</pre>
                        <ItemUserAppMovil :slotProps="slotProps" :idUs="slotProps.id" :tipoActividad="tipoActividad" :Lote="Lote" :data="data" />
                    </TabPanel>
                    <TabPanel :header="t('appmovil.detalles')">
                        <div class="datalles-bacg p-fluid formgrid grid mb-3">
                        <div class="datalles-header w-full">
                            <h5 class="col-12 m-3">{{ t('appmovil.supervisor') }}: {{ supervisoName }}</h5>
                        </div>
                        <div class="col-12 md:col-6">
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{t('appmovil.loteDespacho')}}</b>: {{ data_planner.lot_dispatch }}</pre>
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{t('appmovil.variedad')}}:</b> {{ data_planner.product_variant }}</pre>
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{ t('appmovil.producto') }}:</b> {{ data_planner.product_type }}</pre>
                        </div>
                        <Divider layout="vertical" class="m-0" />
                        <div class="col-12 md:col-6">
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{ t('appmovil.empaque') }}:</b> {{ data_planner.packing_type }}</pre>
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{ t('appmovil.fechaPlaneada') }}:</b> {{ data_planner.planner_date }}</pre>
                            <Divider class="m-0" />
                            <pre class="m-1"><b>{{ t('appmovil.dialaboral') }}:</b> {{ HOLIDAY === 'Festivo'? t('appmovil.diaFestivo') : t('appmovil.diaNormal')}}</pre>
                        </div>
                    </div>

                    <DataTable :value="summary" tableStyle="min-width: 50rem">
                        <ColumnGroup type="header">
                            <Row>
                                <Column header="Employees" :rowspan="3" />
                                <Column header="Type price task" :rowspan="3" />
                                <Column header="Type Day Tarif" :rowspan="3" />

                                <Column header="Cortar" :colspan="4" />
                            </Row>
                            <Row>
                                <Column header="Task" :colspan="2" />
                                <!-- <Column header="Labor" :colspan="2" />
                                    <Column header="Journal" :colspan="2" /> -->
                                <Column header="Hora Extra" :colspan="2" />
                            </Row>
                            <Row>
                                <Column header="Quantity" sortable field="task_qty_task" />
                                <Column header="Total" sortable field="total_task" />

                                <!-- <Column header="Quantity" sortable field="task_qty_labor"/>
                                    <Column header="Total" sortable field="total_labor"/>

                                    <Column header="Quantity" sortable field="task_qty_journal"/>
                                    <Column header="Total" sortable field="total_journal"/> -->

                                <Column header="Type price task" :rowspan="3" />
                                <Column header="Type Day Tarif" :rowspan="3" />

                                <Column header="Quantity" sortable field="task_qty_hora_extra" />
                                <Column header="Total" sortable field="total_hora_extra" />
                            </Row>
                        </ColumnGroup>
                        <Column field="employee.full_name" />
                        <Column field="type_price_task" />
                        <Column field="type_day_tarif" />

                        <Column field="task_qty_task">
                            <template #body="slotProps">
                                {{ slotProps.data.task_qty_task }}
                            </template>
                        </Column>

                        <Column field="total_task">
                            <template #body="slotProps">
                                {{ formatCurrency(slotProps.data.total_task) }}
                            </template>
                        </Column>
                        <!-- 
                            <Column field="task_qty_labor">
                                <template #body="slotProps">
                                    {{slotProps.data.task_qty_labor}}
                                </template>
                            </Column>

                            <Column field="total_labor">
                                <template #body="slotProps">
                                    {{formatCurrency(slotProps.data.total_labor)}}
                                </template>
                            </Column>

                            <Column field="task_qty_journal">
                                <template #body="slotProps">
                                    {{slotProps.data.task_qty_journal}}
                                </template>
                            </Column>

                            <Column field="total_journal">
                                <template #body="slotProps">
                                    {{formatCurrency(slotProps.data.total_journal)}}
                                </template>
                            </Column>

                            
                    -->
                        <Column field="price_task" />
                        <Column field="price_hora_extra" />
                        <Column field="task_qty_hora_extra">
                            <template #body="slotProps">
                                {{ slotProps.data.task_qty_hora_extra ? slotProps.data.task_qty_hora_extra : 'Null' }}
                            </template>
                        </Column>

                        <Column field="total_hora_extra">
                            <template #body="slotProps">
                                {{ slotProps.data.total_hora_extra ? formatCurrency(slotProps.data.total_hora_extra) : 'Null' }}
                            </template>
                        </Column>

                        <ColumnGroup type="footer">
                            <Row>
                                <Column footer="Totals:" :colspan="3" footerStyle="text-align:right" />
                                <Column :footer="totalTaskQtyTask" />
                                <Column :footer="totalTaskTotal" />
                                <!-- <Column :footer="totalTaskQtyLabor" />
                <Column :footer="totalLaborTotal" />
                <Column :footer="totalTaskQtyJournal" />
                <Column :footer="totalJournalTotal" /> -->
                                <Column footerStyle="text-align:right" />
                                <Column footerStyle="text-align:right" />
                                <Column :footer="totalTaskQtyHoraExtra" />

                                <Column :footer="totalHoraExtraTotal" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                    </TabPanel>

                </TabView>

            </AccordionTab>
        </Accordion>
    </div>
</template>

<style lang="scss" scoped>
.responsive-text {
    text-overflow: ellipsis;
}

.datalles-bacg {
    background-color: var(--surface-300);
    border-radius: 5px;
}
.datalles-header {
    background-color: var(--surface-300);
    border-radius: 5px 5px 0 0;
    margin-bottom: -1px;
}
</style>
