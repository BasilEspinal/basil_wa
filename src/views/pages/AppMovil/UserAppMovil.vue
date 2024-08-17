<script setup>
import { ref, onMounted, watch } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
const { worksDay, task_type, dones_work, data_planner, priceunit } = UseAppMovil();

const props = defineProps({
    dataUsers: { type: Array },
    Taridf: { type: Object },
    Lote: { type: Array },
    diaFestivo: { type: Boolean }
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
const supervisoName = ref('');
const editingRows = ref([]);
const editable = ref(true);
const estilo = ref({
    table: { style: `min-width: 25remP; background-color: var(--surface-300);` },
    column: { bodycell: ({ state }) => ({ style: state['d_editing'] ? `padding-top: 0.2rem; padding-bottom: 0.2rem;` : `background-color: var(--surface-200);` }) }
});

onMounted(async () => {
    supervisoName.value = await sessionStorage.getItem('accessSessionEmployeeName');
    console.log('name ', sessionStorage.getItem('accessSessionEmployeeName'));
});

const UpdateTotal = () => {
    Total.value = selected_quanty.value * priceunit.value;
};

const changeWorkView = (event) => {
    workView.value = !workView.value;
    event.stopPropagation();
};

watch(props, () => {
    if (props.Taridf) {
        const { price_tarif } = props.Taridf.data[0];
        tarifa.value = parseInt(price_tarif) ?? 0;
    }
});

const onRowEditSave = (event) => {
    let { newData, index } = event;
    worksDay.value[index] = newData;
};
</script>

<template>
    <div>
        <Accordion>
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id" selectOnFocus>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <Avatar style="min-width: 2rem" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="responsive-text font-bold white-space-nowrap overflow-hidden w-full">{{ slotProps.first_name }}</span>
                        <Button class="w-8rem" :label="t('appmovil.trabajos')" :disabled="workView" @click="changeWorkView" size="small" outlined />
                        <Button class="w-8rem" :label="t('appmovil.detalles')" :disabled="!workView" @click="changeWorkView" size="small" severity="secondary" outlined />
                    </span>
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
                <div v-else class="p-fluid">
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
                            <pre class="m-1"><b>{{ t('appmovil.dialaboral') }}:</b> {{ diaFestivo? t('appmovil.diaFestivo') : t('appmovil.diaNormal')}}</pre>
                        </div>
                    </div>
                    <DataTable v-model:editingRows="editingRows" size="small" :value="worksDay" editMode="row" dataKey="id" @row-edit-save="onRowEditSave" :pt="estilo">
                        <ColumnGroup type="header">
                            <Row>
                                <Column v-if="editable" :rowspan="3" style="background-color: var(--surface-300)" />
                                <Column :header="t('appmovil.empleado')" :rowspan="3" style="background-color: var(--surface-300)" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.trabajos')" :colspan="3" style="background-color: var(--surface-300)" />
                            </Row>
                            <Row>
                                <Column :header="t('appmovil.cantidad')" sortable field="lastYearProfit" style="background-color: var(--surface-300)" />
                                <Column :header="t('appmovil.precio')" sortable field="thisYearProfit" style="background-color: var(--surface-300)" />
                                <Column :header="t('appmovil.notas')" sortable field="thisYearProfit" style="background-color: var(--surface-300)" />
                            </Row>
                        </ColumnGroup>
                        <Column v-if="editable" :rowEditor="editable" style="width: 4%; min-width: 4rem" bodyStyle="text-align:center" />
                        <Column field="employee" header="employee" style="background-color: var(--surface-200)">
                            <template #body="{ data, field }">
                                {{ data[field] }}
                            </template>
                        </Column>
                        <Column field="quantity" header="quantity">
                            <template #editor="{ data, field }">
                                <InputNumber v-model="data[field]" size="small" />
                            </template>
                        </Column>
                        <Column field="totalPrice" header="totalPrice">
                            <template #body="{ data, field }">
                                {{ data[field] }}
                            </template>
                        </Column>
                        <Column field="nota" header="nota">
                            <template #editor="{ data, field }">
                                <InputText v-model="data[field]" size="small" />
                            </template>
                        </Column>
                        <ColumnGroup type="footer">
                            <Row>
                                <Column :footer="t('appmovil.total') + ' :'" :colspan="2" footerStyle="text-align:left" />
                                <Column :footer="quantities" style="background-color: var(--surface-300)" />
                                <Column :footer="totalPrices" :colspan="2" style="background-color: var(--surface-300)" />
                            </Row>
                        </ColumnGroup>
                    </DataTable>
                </div>
            </AccordionTab>
        </Accordion>
    </div>
</template>

<style lang="scss" scoped>
.responsive-text {
    text-overflow: ellipsis;
}

.datalles-bacg {
    background-color: var(--surface-200);
    border-radius: 5px;
}
.datalles-header {
    background-color: var(--surface-300);
    border-radius: 5px 5px 0 0;
    margin-bottom: -1px;
}
</style>
