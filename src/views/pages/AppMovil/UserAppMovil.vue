<script setup>
import { ref, onMounted,onBeforeMount } from 'vue';
import InputNumber from 'primevue/inputnumber';
import { useI18n } from 'vue-i18n';
import { useAppMovilService } from '../../../service/appMovil/appMovilService';
import { useToast } from 'primevue/usetoast';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import ItemUserAppMovil from './ItemUserAppMovil.vue';

const { worksDay, data_planner } = UseAppMovil();


const props = defineProps({
    dataUsers: { type: Array },
    Lote: { type: Array },
    data: { type: Object }
});

const toast = useToast();
const { t } = useI18n();
const { SUPERVISO_NAME, getTipoActividad, HOLIDAY,dataInfoUser } = useAppMovilService();
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

const TipoActividad = async () => {
    const response = await getTipoActividad();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    tipoActividad.value = response?.data;
};

const changeWorkView = (event) => {
    workView.value = !workView.value;
    event.stopPropagation();
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
            <AccordionTab v-for="slotProps in dataUsers" :key="slotProps.id" selectOnFocus>
                <template #header>
                    <span class="flex align-items-center gap-2 w-full">
                        <Avatar style="min-width: 2rem" image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
                        <span class="responsive-text font-bold white-space-nowrap overflow-hidden w-full">{{ slotProps.first_name }}</span>
                        <Button class="w-8rem" :label="t('appmovil.trabajos')" :disabled="workView" @click="changeWorkView" size="small" outlined />
                        <Button class="w-8rem" :label="t('appmovil.detalles')" :disabled="!workView" @click="changeWorkView" size="small" severity="secondary" outlined />
                    </span>
                </template>
                <div v-if="workView" :key="slotProps.id">
                    <ItemUserAppMovil :slotProps="slotProps" :idUs="slotProps.id" :tipoActividad="tipoActividad" :Lote="Lote" :data="data" />
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
                            <pre class="m-1"><b>{{ t('appmovil.dialaboral') }}:</b> {{ HOLIDAY === 'Festivo'? t('appmovil.diaFestivo') : t('appmovil.diaNormal')}}</pre>
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
