<script setup>
import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import { CrudService } from '@/service/CRUD/CrudService';
import { ref, onMounted, watch,computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useAppMovilService } from '../../../service/appMovil/appMovilService_V3';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

// const { errorResponseAPI } = useData();

import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const toast = useToast();
const { error,getTarif, getDonesWork, postDailyReport, WORK_CENTER, SUPERVISO_ID, LOTES } = useAppMovilService();
//const selected_quanty = ref(null);
const Total = ref(null);
//const select_tasks_type = ref(null);
//const selected_crops_lots = ref(null);
//const selected_dones_work = ref(null);
const supervisoId = ref('');
const workCenter = ref({});
const PesoAprox = ref('4');
//const Notas = ref(null);
const dones_work = ref(null);
const tarifa = ref(null);
const laborActive = ref(false);
const lotes = ref({});
const packings_type = ref([]);
const Packings_type = ref([]);


const props = defineProps({
    slotProps: { type: Object },
    Lote: { type: Array },
    data: { type: Object },
    idUs: { type: String },
    tipoActividad: { type: Array }
});


const isHoraExtra = ref(false)
// Initialize select_tasks_type first
const select_tasks_type = ref({ code: '', label: '', subActivity: null, enPoint: null }); // Default empty object

// Define the validation schema
const validationSchema = computed(() => {
   

    return z.object({
        selected_crops_lots: z.object({
            code: z.string().min(1, 'Code is required'),
        }),
        select_tasks_type: z.object({
            code: z.string().min(1, 'Task code is required'),
            label: z.string().min(1, 'Task label is required!'),
            subActivity: z.any().optional().nullable(),
            enPoint: z.any().optional().nullable(),
        }),
        selected_quanty: z
            .number()
            .min(1, 'Quantity must be at least 1')
            .max(1000, 'Quantity must be less than or equal to 1000'),
        Notas: z.string().optional(),
        selected_dones_work: z
        .object({
            name: z.string().optional(),
            id: z.number().optional(),
            uuid: z.string().optional(),
            work_type_tarif: z.string().optional(),
            code: z.string().optional(),
        })
        .refine(
            (val) => {
                if (isHoraExtra.value) {
                    // If `isHoraExtra` is true, name and id must be valid
                    return (
                        val.name?.length >= 2 &&
                        typeof val.id === 'number' &&
                        val.id > 0
                    );
                }
                // If `isHoraExtra` is false, no validation required
                return true;
            },
            {
                message: isHoraExtra.value
                    ? 'Name must be at least 2 characters and ID must be greater than 0 for HoraExtra'
                    : '',
            }
        ),
        packing_typeV: z.object({
            name: z.string().min(1, 'Packing type name is required'),
            uuid: z.string().min(1, 'Packing type ID is required'),
        }),
    });
});


// Use the computed schema
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm,
} = useForm({
    initialValues: {
        selected_crops_lots: { code: '' },
        select_tasks_type: { code: '', label: '', subActivity: null, enPoint: null },
        selected_quanty: 1,
        Notas: '',
        selected_dones_work: { id: 0, name: '', uuid: '', work_type_tarif: '', code: '' },
        packing_typeV: { name: '', uuid: '' },
    },
    validationSchema: toTypedSchema(validationSchema.value),
});

// Initialize other fields after defining the validation schema
const [selected_crops_lots] = defineField('selected_crops_lots');
const [selected_quanty] = defineField('selected_quanty');
const [Notas] = defineField('Notas');
const [selected_dones_work] = defineField('selected_dones_work');
const [packing_typeV] = defineField('packing_typeV');
const [select_tasks_type_field] = defineField('select_tasks_type'); // This links the form field with the schema

watch(select_tasks_type,()=>{
    //select_tasks_type_field.value=select_tasks_type.value;
    if (select_tasks_type.value.label ==='HoraExtra'){
        isHoraExtra.value=true
    }
    else{
        isHoraExtra.value= false
    }
    resetForm()
})

const crudService = CrudService('/packing_types');
const errorResponseAPI = crudService.getErrorResponse();
const { t } = useI18n();

//const packing_typeV = ref({uuid: props.data.packing_type.uuid, name: props.data.packing_type.name});
const emit = defineEmits(['update-data']); // Define the event to emit

onMounted(async () => {
    workCenter.value = WORK_CENTER;
    supervisoId.value = SUPERVISO_ID;
    lotes.value = LOTES;

    const respPackingsType = await crudService.getAll();
    //console.log("respPackingsType", respPackingsType);
    if (!respPackingsType.ok) toast.add({ severity: 'error', detail: 'Error' + respPackingsType.error, life: 3000 });
    Packings_type.value = respPackingsType.data.data.map((packing) => ({ uuid: packing.uuid, name: packing.name }));

});

const clearFields = async ()=> {
    selected_quanty.value = null;
    Total.value = null;
    select_tasks_type.value = null;
    Notas.value = null;
}


const getLabor = async () => {
    const response = await getDonesWork();
    
    if (!response.ok) toast.add({ severity: 'error', detail: 'Error' + response.error, life: 3000 });
    dones_work.value = response.data?.data ?? [];
};

const sendDailyReport = handleSubmitNew(async (values) => { 
    // const data = {
    //     loteCode: selected_crops_lots.value?.code,
    //     tasksTypeCode: select_tasks_type.value?.code,
    //     quantity: selected_quanty.value,
    //     notas: Notas.value,
    //     tarifXCautity: selected_quanty.value * tarifa.value,
    //     userId: props.slotProps.uuid,
    //     labor: selected_dones_work.value?.uuid,
    //     packing_type:packing_typeV.value?.uuid
    // };

    const data = {
    loteCode: values.selected_crops_lots?.code,
    tasksTypeCode: values.select_tasks_type?.code,
    quantity: values.selected_quanty,
    notas: values.Notas,
    tarifXCautity: values.selected_quanty * tarifa.value,
    userId: props.slotProps.uuid,
    labor: values.selected_dones_work?.uuid,
    packing_type: values.packing_typeV?.uuid
    };
console.log(data)

    console.log("data", data);
    const restp = await postDailyReport(data);
    console.log(restp)
    
    
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 10000 });
    //if (restp.ok) await clearFields();
    if (restp.ok) {
        emit('update-grandparent-data');
    }

});


const UpdateTotal = () => {
    Total.value = selected_quanty.value * tarifa.value;
};

const updateTaskTarif = async () => {
    
    tarifa.value = await getTarif(select_tasks_type.value.code);
    // console.log("tarifa", tarifa.value);
    tarifa.value === 0 ? toast.add({ severity: 'error', summary: 'Tarifa', detail: 'NO existe tarifa definida', life: 3000 }) : '';
    laborActive.value = select_tasks_type.value?.label !== 'Task' && select_tasks_type.value?.name !== '' && select_tasks_type.value !== null;
    if (laborActive.value) {
    
        getLabor();}
};


watch(select_tasks_type, () => {
    updateTaskTarif();
});

const searchPackingType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            packings_type.value = [...Packings_type.value];
        } else {
            packings_type.value = Packings_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

</script>

<template>
    <!-- <pre>{{ errorsNew }}</pre>
    <pre>isHoraExtra: {{isHoraExtra}}</pre> -->
    <div class="grid p-fluid mt-3">
        
        <div class="field col-12 md:col-4">
            
            
            <!-- <pre>{{ selected_dones_work }}</pre> -->
            <span class="p-float-label">
                <Dropdown v-model="select_tasks_type" :options="tipoActividad" filter optionLabel="label" />
                <label class="font-bold" for="task_type">{{ t('appmovil.tipoActividad') }}</label>
                <!-- <pre>{{ select_tasks_type.code }}</pre>
                <pre>{{select_tasks_type_field}}</pre> -->
            </span>
            <FrontEndErrors :errorsNew="errorsNew" name="select_tasks_type" />
            <BackendErrors :name="errorResponseAPI?.errors?.planner_task_uuid" />
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <Dropdown v-model="selected_crops_lots" :options="Lote" filter optionLabel="code" />
                <label class="font-bold" for="crops_lots">{{ t('appmovil.lote') }}</label>
                <!-- <pre>{{ selected_crops_lots }}</pre> -->
            </span>
            <FrontEndErrors :errorsNew="errorsNew" name="selected_crops_lots" />
            <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
        </div>

        <div class="field col-12 md:col-4" v-if="laborActive">
            <span class="p-float-label">
                <Dropdown v-model="selected_dones_work" :options="dones_work" filter optionLabel="name" />
                <label class="font-bold" for="dones_work">{{ t('appmovil.labor') }}</label>
                <!-- <pre>{{ selected_dones_work }}</pre> -->
                
            </span>
            <FrontEndErrors :errorsNew="errorsNew" name="selected_dones_work" />
            
            <!--Modificar acá-->
            <BackendErrors :name="errorResponseAPI?.errors?.done_of_type_uuid" />
        </div>
        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <InputNumber v-model="selected_quanty" :update:modelValue="UpdateTotal" inputId="minmax" :min="1" :max="10" />
                <label class="font-bold" for="quanty">{{ t('appmovil.cantidad') }}</label>
                <!-- <pre>{{ selected_quanty }}</pre> -->
            </span>
            <FrontEndErrors :errorsNew="errorsNew" name="selected_quanty" />
            <BackendErrors :name="errorResponseAPI?.errors?.task_qty" />
        </div>

        <div class="field col-12 md:col-4">
            <span class="p-float-label">
                <!-- <Dropdown v-model="packing_typeV" :options="Lote" filter optionLabel="code" /> -->
                <AutoComplete v-model="packing_typeV" class="flex-auto" inputId="ac" :suggestions="packings_type" @complete="searchPackingType" field="name" dropdown />
                <label class="font-bold" for="crops_lots">{{ t('appmovil.empaque') }}</label>
                <!-- <pre>{{ packing_typeV }}</pre> -->
            </span>

            <FrontEndErrors :errorsNew="errorsNew" name="packing_typeV" />
            <!--Modificar acá-->
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
            <FrontEndErrors :errorsNew="errorsNew" name="packing_typeV" />
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
            <Button class="mt-3" :label="t('appmovil.save')" icon="pi pi-check" @click="sendDailyReport"></Button>
        </div>
    </div>
</template>
