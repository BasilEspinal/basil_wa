<script setup>
import { ref, onMounted, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAppMovilService } from '../../../service/appMovil/appMovilService';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { errorResponseAPI } = useData();
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import { useI18n } from 'vue-i18n';

const toast = useToast();
const { getTarif, getDonesWork, postDailyReport, WORK_CENTER, SUPERVISO_ID, LOTES } = useAppMovilService();
const selected_quanty = ref(null);
const Total = ref(null);
const select_tasks_type = ref(null);
const selected_crops_lots = ref(null);
const selected_dones_work = ref(null);
const supervisoId = ref('');
const workCenter = ref({});
const PesoAprox = ref('4');
const Notas = ref(null);
const dones_work = ref(null);
const tarifa = ref(null);
const laborActive = ref(false);
const lotes = ref({});

const { t } = useI18n();
onMounted(async () => {
    workCenter.value = WORK_CENTER;
    supervisoId.value = SUPERVISO_ID;
    lotes.value = LOTES;
});

function clearFiels() {
    selected_quanty.value = null;
    Total.value = null;
    select_tasks_type.value = null;
    Notas.value = null;
}

const props = defineProps({
    slotProps: { type: Object },
    Lote: { type: Array },
    data: { type: Object },
    idUs: { type: String },
    tipoActividad: { type: Array }
});

const getLabor = async () => {
    const response = await getDonesWork();
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dones_work.value = response.data?.data ?? [];
};

async function sendDailyReport() {
    const restp = await postDailyReport({
        loteCode: selected_crops_lots.value?.code,
        tasksTypeCode: select_tasks_type.value?.code,
        quantity: selected_quanty.value,
        notas: Notas.value,
        tarifXCautity: selected_quanty.value * tarifa.value,
        userId: props.slotProps.uuid,
        labor: selected_dones_work.value?.uuid
    });
    
    
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    //if (restp.ok) 
    //clearFiels();
}

const UpdateTotal = () => {
    Total.value = selected_quanty.value * tarifa.value;
};

const updateTaskTarif = async () => {
    console.log('select_tasks_type', select_tasks_type.value);
    tarifa.value = await getTarif(select_tasks_type.value.code);
    console.log(tarifa.value);
    tarifa.value === 0 ? toast.add({ severity: 'error', summary: 'Tarifa', detail: 'NO existe tarifa definida', life: 3000 }) : '';
    laborActive.value = select_tasks_type.value?.label !== 'Task' && select_tasks_type.value?.name !== '' && select_tasks_type.value !== null;
    if (laborActive.value) getLabor();
};

watch(select_tasks_type, () => {
    updateTaskTarif();
});
</script>

<template>
    <div class="grid p-fluid mt-3">
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <Dropdown v-model="select_tasks_type" :options="tipoActividad" filter optionLabel="label" />
                <label class="font-bold" for="task_type">{{ t('appmovil.tipoActividad') }}</label>
            </span>
            <BackendErrors :name="errorResponseAPI?.errors?.planner_task_uuid" />
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <Dropdown v-model="selected_crops_lots" :options="Lote" filter optionLabel="code" />
                <label class="font-bold" for="crops_lots">{{ t('appmovil.lote') }}</label>
            </span>
            <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
        </div>

        <div class="field col-12 md:col-4" v-if="laborActive">
            <span class="p-float-label">
                <Dropdown v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" />
                <label class="font-bold" for="dones_work">{{ t('appmovil.labor') }}</label>
            </span>
            <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber v-model="selected_quanty" :update:modelValue="UpdateTotal" inputId="minmax" :min="1" :max="5" />
                <label class="font-bold" for="quanty">{{ t('appmovil.cantidad') }}</label>
            </span>
            <BackendErrors :name="errorResponseAPI?.errors?.task_qty" />
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
            <BackendErrors :name="errorResponseAPI?.errors?.price_tarif_task" />
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
            <BackendErrors :name="errorResponseAPI?.errors?.price_tarif_task" />
            <Button class="mt-3" :label="t('appmovil.save')" icon="pi pi-check" @click="sendDailyReport()"></Button>
        </div>
    </div>
</template>
