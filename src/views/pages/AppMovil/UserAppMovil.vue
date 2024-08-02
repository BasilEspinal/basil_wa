<script setup>
import { ref, onMounted, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import { number } from 'zod';
const { availableAreaEmployees, worksDay, task_type, crops_lots, dones_work, size, sizeOptions, data_planner, priceunit, plannertask, tasktarifs, areawork } = UseAppMovil();

const props = defineProps({
    dataUsers: { type: Array },
    Taridf: { type: Object},
    Lote: { type: Array }
});

const { t } = useI18n();

const select_tasks_type = ref(null);
const selected_crops_lots = ref(null);
const selected_dones_work = ref(null);
const selected_quanty = ref(null);
const PesoAprox = ref('4');
const Total = ref(null);
const Notas = ref(null);
const workView = ref(true);
const tarifa = ref(0);


const UpdateTotal = () => {
    Total.value = selected_quanty.value * priceunit.value;
};

const changeWorkView = (event) => {
    workView.value = !workView.value;
    event.stopPropagation();
};

watch(props, () => {
    if (props.Taridf){
        const { price_tarif } = props.Taridf.data[0];
        tarifa.value = parseInt(price_tarif) ?? 0;
    }
});

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
</script>

<template>
    <div>
        <Accordion>
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id" selectOnFocus>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="font-bold white-space-nowrap">{{ slotProps.first_name }}</span>
                    </span>
                    <Button class="col-12 md:col-2 mr-2" :label="t('appmovil.trabajos')" :disabled="workView" @click="changeWorkView" size="small" outlined />
                    <Button class="col-12 md:col-2 mr-2" :label="t('appmovil.detalles')" :disabled="!workView" @click="changeWorkView" size="small" severity="secondary" outlined />
                </template>
                <div v-if="workView">
                    <div class="grid p-fluid mt-3">
                        <div class="field col-12 md:col-4">
                            <span class="p-float-label">
                                <Dropdown v-model="select_tasks_type" :options="task_type" filter optionLabel="name" />
                                <label class="font-bold" for="task_type">{{ t('appmovil.tipoActividad') }}</label>
                            </span>
                        </div>
                        <div class="field col-12 md:col-4">
                            <span class="p-float-label">
                                <Dropdown v-model="selected_crops_lots" :options="Lote" filter optionLabel="code" />
                                <label class="font-bold" for="crops_lots">{{ t('appmovil.lote') }}</label>
                            </span>
                        </div>
                        <div class="field col-12 md:col-4" v-if="select_tasks_type?.name !== 'Task'">
                            <span class="p-float-label">
                                <Dropdown v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" />
                                <label class="font-bold" for="dones_work">{{ t('appmovil.labor') }}</label>
                            </span>
                        </div>
                        <div class="field col-12 md:col-4">
                            <span class="p-float-label">
                                <InputNumber v-model="selected_quanty" :update:modelValue="UpdateTotal" inputId="minmax" :min="1" :max="5" />
                                <label class="font-bold" for="quanty">{{ t('appmovil.cantidad') }}</label>
                            </span>
                        </div>
                        <div class="field col-12 md:col-4">
                            <div class="p-inputgroup">
                                <span class="p-float-label border-round border-1">
                                    <span class="p-inputgroup font-bold ml-1">{{ t('appmovil.pesoAproximado') }}:</span>
                                    <span class="p-float-label">
                                        <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ PesoAprox }}</label>
                                    </span>
                                    <span class="p-inputgroup-addon">Kg</span>
                                </span>
                            </div>
                        </div>
                        <div class="field col-12 md:col-4">
                            <div class="p-inputgroup">
                                <span class="p-float-label border-round border-1">
                                    <span class="p-inputgroup font-bold ml-1">{{ t('appmovil.precioUnitario') }}:</span>
                                    <span class="p-float-label">
                                        <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ tarifa }}</label>
                                    </span>
                                    <span class="p-inputgroup-addon">$</span>
                                </span>
                            </div>
                        </div>
                        <div class="field col-12 md:col-8">
                            <span class="p-float-label">
                                <Textarea inputId="textarea" rows="4" cols="40" v-model="Notas" />
                                <label for="textarea">{{ t('appmovil.notas') }}</label>
                            </span>
                        </div>
                        <div class="field col-12 md:col-4">
                            <div class="p-inputgroup border-round border-1">
                                <span class="p-float-label">
                                    <label class="font-bold" for="weightunit">{{ t('appmovil.total') }}: {{ selected_quanty * tarifa }}</label>
                                </span>
                                <span class="p-inputgroup-addon">$</span>
                            </div>
                            <Button class="mt-3" :label="t('appmovil.save')" icon="pi pi-check"></Button>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <div class="p-fluid formgrid grid">
                        <div class="field col-12">
                            <h4>{{ t('appmovil.supervisor') }}: {{ data_planner.nameSupervisor }}</h4>
                        </div>
                        <div class="field col-12 md:col-6 gap-1">
                            <pre><b>{{t('appmovil.loteDespacho')}}</b>: {{ data_planner.lot_dispatch }}</pre>
                            <pre><b>{{t('appmovil.variedad')}}:</b> {{ data_planner.product_variant }}</pre>
                            <pre>{{ t('appmovil.producto') }}:{{ data_planner.product_type }}</pre>
                        </div>
                        <div class="field col-12 md:col-6 gap-2">
                            <pre>{{ t('appmovil.empaque') }}: {{ data_planner.packing_type }}</pre>
                            <pre>{{ t('appmovil.fechaPlaneada') }}: {{ data_planner.planner_date }}</pre>
                            <pre>{{ t('appmovil.dialaboral') }}: {{ data_planner.day_type }}</pre>
                        </div>
                    </div>
                    <DataTable :value="worksDay">
                        <ColumnGroup type="header">
                            <Row>
                                <Column :header="t('appmovil.empleado')" :rowspan="3" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.trabajos')" :colspan="2" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.cantidad')" sortable field="lastYearProfit" />
                                <Column :header="t('appmovil.precio')" sortable field="thisYearProfit" />
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
                                <Column :footer="t('appmovil.total') + ' :'" :colspan="1" footerStyle="text-align:left" />
                                <Column :footer="quantities" />
                                <Column :footer="totalPrices" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>
