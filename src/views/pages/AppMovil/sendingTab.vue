<script setup >
import { ref, computed, watch,onMounted } from 'vue';

import { useI18n } from 'vue-i18n';
import { AppMovilDataService_V2 } from '@/service/appMovil/appMovilService_V2';
import { useAppMovilService } from '../../../service/appMovil/appMovilService_V3';

import { useToast } from 'primevue/usetoast';

const { t } = useI18n();
const toast = useToast();
const errorSummary = ref(false);
const summary = ref();
const totalTaskQtyTask = ref(0);
const totalTaskTotal = ref(0);
const totalTaskQtyHoraExtra = ref(0);
const totalHoraExtraTotal = ref(0);
const totalTaskQtyLabor = ref(0);
const totalLaborTotal = ref(0);
const totalTaskQtyJournal = ref(0);
const totalJournalTotal = ref(0);
const { SUPERVISOR_NAME,getInfoEmployeesById } = useAppMovilService();
const supervisorName = ref('');

onMounted(async () => {
    supervisorName.value = SUPERVISOR_NAME;
    
});


const getDataEmployeesInfo = async (employee_id) => {
    const response = await getInfoEmployeesById(props.data.id, props.data.tasks_of_type.id, employee_id);
    if (!response.ok) {
        toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
        errorSummary.value = true;
    }
    summary.value = response.data.data;
};

const calculations = async () => {
    totalTaskQtyTask.value = computed(() => {
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
const props = defineProps({
    dataUsers: { type: Array },
    Lote: { type: Array },
    data: { type: Object },
    id: { type: String },
    supervisor: { type: String }
});
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};

const currentEmployeeId = ref(props.id);
watch(
    async () => props.id,
    async (newId) => {
        currentEmployeeId.value = newId;
        await getDataEmployeesInfo(props.id);
        await calculations();
    }
);
</script>
<template>
    <div>
        <!-- <pre>Temporal: Id del empleado {{ props.id }}</pre> -->
        <div class="card">
            <Panel :header="t('appmovil.information')" toggleable>
                <div class="datalles-bacg p-fluid formgrid grid mb-3">
                    <div class="datalles-header w-full">
                        <h5 class="col-12 m-3">{{ t('appmovil.supervisor') }}: {{ supervisorName?supervisorName: 'No supervisor' }}</h5>
                    </div>

                    <div class="col-12 md:col-6">
                        <Divider class="m-0" />

                        <p class="m-1">
                            <b>{{ t('appmovil.loteDespacho') }}</b
                            >: {{ props.data.customer_request.dispatch_number_lot }}
                        </p>
                        <Divider class="m-0" />
                        <p class="m-1">
                            <b>{{ t('appmovil.variedad') }}:</b> {{ props.data.varieties.name }}
                        </p>
                        <Divider class="m-0" />
                        <p class="m-1">
                            <b>{{ t('appmovil.producto') }}:</b> {{ props.data.product.name }}
                        </p>
                    </div>
                    <Divider layout="vertical" class="m-0" />
                    <div class="col-12 md:col-6">
                        <Divider class="m-0" />
                        <p class="m-1">
                            <b>{{ t('appmovil.empaque') }}:</b> {{ props.data.packing_type.name }}
                        </p>
                        <Divider class="m-0" />
                        <p class="m-1">
                            <b>{{ t('appmovil.fechaPlaneada') }}:</b> {{ props.data.transaction_date }}
                        </p>
                        <Divider class="m-0" />
                        <p class="m-1">
                            <b>{{ t('appmovil.dialaboral') }}:</b> {{ HOLIDAY === 'Festivo' ? t('appmovil.diaFestivo') : t('appmovil.diaNormal') }}
                        </p>
                    </div>
                </div>
            </Panel>
        </div>

        <DataTable :value="summary" tableStyle="min-width: 50rem">
            <ColumnGroup type="header">
                <Row>
                    <Column header="Employees" :rowspan="3" />
                    <Column header="Type price task" :rowspan="3" />
                    <Column header="Type Day Tarif" :rowspan="3" />

                    <!-- <Column header="Cortar" :colspan="4" /> -->
                </Row>
                <Row>
                    <Column header="Task" :colspan="2" />

                    <!-- <Column header="Labor" :colspan="2" />
                                    <Column header="Journal" :colspan="2" /> -->
                    <Column header="Hora Extra" :colspan="2" />
                    <Column header="" :colspan="2" />
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
    </div>
</template>
<style scoped>
.responsive-text {
    text-overflow: ellipsis;
}

.datalles-bacg {
    border-radius: 5px;
}
.datalles-header {
    background-color: var(--surface-50);
    border-radius: 5px 5px 0 0;
    margin-bottom: -1px;
}
</style>