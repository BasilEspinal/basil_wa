<script setup>
import { ref, onMounted } from 'vue';
import { useToast } from 'primevue/usetoast';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { postRequest, errorResponseAPI } = useData();
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import UseAppMovil from '@/composables/AppMovil/UseAppMovil.js';
import { useI18n } from 'vue-i18n';
const { task_type, dones_work } = UseAppMovil();
const endpoint = '/transactions/tasks';
const toast = useToast();

const selected_quanty = ref(null);
const Total = ref(null);
const select_tasks_type = ref(null);
const selected_crops_lots = ref(null);
const selected_dones_work = ref(null);
const supervisoId = ref('');
const workCenter = ref({});
const PesoAprox = ref('4');
const Notas = ref(null);

const { t } = useI18n();
onMounted(async () => {
    workCenter.value = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
    supervisoId.value = await sessionStorage.getItem('accesSessionEmployeeUuid');
});

function clearFiels() {
    selected_quanty.value = null;
    Total.value = null;
    select_tasks_type.value = null;
    supervisoId.value = null;
    Notas.value = null;
}

const props = defineProps({
    slotProps: { type: Object },
    tarifa: { type: Number },
    Lote: { type: Array },
    data: { type: Object }
});

async function sendDailyReport(dataUser) {
    const { data, tarifa } = props;
    const { taskoftype_id } = workCenter.value;
    const customerRequest = data?.customer_request != '' ? data.customer_request : '2c1392a8-2f4c-4d24-9dd4-ef865b0ff456';
    const dataPost = {
        transaction_date_send: data?.transaction_date ?? '',
        tasks_of_type_uuid: taskoftype_id.uuid,
        crop_lot_code: selected_crops_lots.value?.code ?? '',
        type_price_task: select_tasks_type.value?.code ?? '',
        task_qty: selected_quanty.value ?? 0,
        notes_small: Notas.value ?? '',
        price_tarif_task: selected_quanty.value * tarifa.value,
        supervisory_employee_uuid: supervisoId.value,
        worker_employee_uuid: dataUser.uuid,
        planner_task_uuid: data?.uuid ?? '',
        customer_request_uuid: customerRequest,
        product_uuid: data?.product.uuid ?? '',
        product_type_uuid: data?.product_type.uuid ?? '',
        variant_uuid: data?.varieties.uuid ?? '',
        packing_type_uuid: data?.packing_type.uuid ?? '',
        device_name: 'Web',
        transdate_sync: null,
        calendar_uuid: null
    };
    const restp = await postRequest(endpoint, dataPost);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    if (restp.ok) clearFiels();
}

const UpdateTotal = () => {
    const { tarifa } = props;
    Total.value = selected_quanty.value * tarifa.value;
};
</script>

<template>
    <div class="grid p-fluid mt-3">
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <Dropdown v-model="select_tasks_type" :options="task_type" filter optionLabel="name" />
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
        <div class="field col-12 md:col-4" v-if="select_tasks_type?.name !== 'Task'">
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
            <Button class="mt-3" :label="t('appmovil.save')" icon="pi pi-check" @click="sendDailyReport(slotProps)"></Button>
        </div>
    </div>
</template>
