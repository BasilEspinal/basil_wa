<template>
    
        <div class="grid">
            

                    <div class="mb-3 col-12 md:col-6 lg:col-12">
                        <div class="mb-3">
                            <div class="flex align-items-center">
                                <label for="username" class="font-semibold w-3">{{t('appmovil.empleado')}}</label>
                                <AutoComplete v-model="emplooyesV" inputId="ac" class="flex-auto" :suggestions="employees" @complete="searchEmployees" field="name" dropdown placeholder="Select Employees" />
                            </div>
                            <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['emplooyesV'] }">
                                {{ errorsNew.emplooyesV }}
                            </small>

                            <!--Pendiente-->
                            <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                        </div>
                    </div>

                        <div class="mb-3 col-12 md:col-6 lg:col-12">
                            <div class="mb-3">
                                <div class="flex align-items-center">
                                    <label for="username" class="font-semibold w-3">{{ t('appmovil.vehicle') }}</label>
                                    <AutoComplete v-model="vehiclesV" inputId="ac" class="flex-auto" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown placeholder="Select Vehicles" />
                                </div> 

                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['vehiclesV'] }">
                                    {{ errorsNew['vehiclesV'] }}
                                </small>

                                <!--Pendiente-->
                                <BackendErrors :name="errorResponseAPI?.errors?.tasks_of_type_uuid" />
                            </div>
                        </div>

                        <div class="mb-3 col-12 md:col-6 lg:col-12">
                            <div class="mb-3">
                                <div class="flex align-items-center">
                                    <label for="request_qty_V" class="font-semibold w-3"> {{ t('appmovil.quantityRequested') }}</label>
                                    <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" />
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['request_qty_V'] }">
                                    {{ errorsNew.request_qty_V }}
                                </small>
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            </div>
                        </div>


                            <div class="mb-3 col-12 md:col-6 lg:col-12">
                                <div class="mb-3">
                                    <div class="flex align-items-center">
                                    <label class="font-semibold w-3" for="crops_lots">{{ t('appmovil.lote') }}</label>
                                    <!-- <AutoComplete v-model="selected_crops_lots" inputId="ac" class="flex-auto" :suggestions="lots" @complete="searchLots" field="code" dropdown placeholder="Select lots" /> -->
                                    <Dropdown v-model="selected_crops_lots" :options="batchs" filter optionLabel="code" class="flex-auto" />
                                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['selected_crops_lots'] }">
                                    {{ errorsNew.selected_crops_lots }}
                                </small>
                                
                                <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
                            </div>
                            </div>


                        </div>

                        <div class="mb-3 col-12 md:col-6 lg:col-12">
                                <div class="mb-3">
                                    <div class="flex align-items-center">
                                    <label class="font-semibold w-3" for="textarea">{{ t('appmovil.notas') }}</label>
                                    <Textarea  class="flex-auto" inputId="textarea" rows="4" cols="40" v-model="notes" />
                                
                                    </div>
                                </div>
                            </div>



                        <div class="mb-3 col-12 sm:col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center gap-4 ">
                            <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                            <Button label="Save" class="w-full" @click="createRecord" />
                        </div>
                    </div>
            </div>
</template>
  
  <script setup>
  import SearchManager from './SearchManager.js'
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const toast = useToast();
const { getRequest, postRequest, putRequest, deleteRequest, patchRequest, errorResponseAPI } = useData();
const tasks_of_type = ref([]);
const Tasks_of_type = ref([]);
const Tasks_of_type_filter = ref([]);
const employees = ref([]);
const Employees = ref([]);
const vehicles = ref([]);
const Vehicles = ref([]);
const dataStart = ref([]);
const dataPlanner = ref([]);
const dataPrueba = ref();
const lots = ref([]);
const Lots = ref([]);

const endpoint = ref('/appmovil/shippings/send_qty');
const farmDefault = sessionStorage.getItem('accessSessionFarm');

const props = defineProps({
    data: {
        type: Object,
        required: true
        
        
    },
    batchs: {
        type: Array,
    },
});

const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    initialValues: {
        transaction_dateV: '',
        product_typeV: { name: '', id: '' },
        emplooyesV: { name: '', id: '' },
        vehiclesV: { name: '', id: '' },
        request_qty_V: 0,
        farm: { name: '', id: '' },
        company: { name: '', id: '' }
    },
    validationSchema: toTypedSchema(
        z.object({
            // transaction_dateV: z.date(),
            task_of_typeV: z
                .object({
                    name: z.string().min(4),
                    id: z.string().min(4)
                })
                .optional(),
            emplooyesV: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional(),
                request_qty_V: z.number().min(1).max(1000),
            vehiclesV: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional(),
            selected_crops_lots: z.object({
                code: z.string().min(4),
                
            }),
            notes: z.string().optional(),


            farm: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional(),
            company: z
                .object({
                    name: z.string().optional(),
                    id: z.string().optional()
                })
                .optional()
        })
    )
});

const [emplooyesV] = defineField('emplooyesV');
const [vehiclesV] = defineField('vehiclesV');
const [request_qty_V, request_qty_VProps] = defineField('request_qty_V');
const [selected_crops_lots] = defineField('selected_crops_lots');
const [notes] = defineField('notes');


onBeforeMount(async () => {
    readAll();
    console.log('data', props.data);
    dataStart.value = await getRequest(`/appmovil/datastart`);
    console.log(dataStart.value.data.data.employee.id);
    dataPlanner.value = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${dataStart.value.data.data.employee.workCenter.taskoftype_id.id}&filter[company_id]=${dataStart.value.data.data.company.id}&filter[farm_id]=${dataStart.value.data.data.farm.id}`);
    dataPrueba.value = {planner_task_id:dataPlanner.value.data.data[0].tasks_of_type.id};
    console.log(dataPlanner);
    lots.value.push(props.batchs)
    console.log(props.batchs)
    console.log(lots.value)
    

});

const readAll = async () => {
    const respTasksOfType = await getRequest('/task_of_types');
    if (!respTasksOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTasksOfType.error, life: 3000 });
    Tasks_of_type.value = respTasksOfType.data.data.map((task) => ({ id: task.uuid, name: task.name }));
    Tasks_of_type_filter.value = respTasksOfType.data.data.map((task) => task.name);

    const respEmployees = await getRequest('/appmovil/employees?filter[work_center_id]=2');
    if (!respEmployees.ok) toast.add({ severity: 'error', detail: 'Error' + respEmployees.error, life: 3000 });
    Employees.value = respEmployees.data.data.map((employee) => ({ id: employee.uuid, name: employee.first_name }));
    employees.value = respEmployees.data.data.map((employee) => employee.name);

    const respVehicles = await getRequest('/vehicles');
    if (!respVehicles.ok) toast.add({ severity: 'error', detail: 'Error' + respVehicles.error, life: 3000 });
    Vehicles.value = respVehicles.data.data.map((vehicle) => ({ id: vehicle.uuid, name: vehicle.vehicle_type }));
    console.log(Vehicles.value);

};

const createRecord = handleSubmitNew(async (values) => {
    const data = {
    trans_dev: false, // Valor booleano directamente asignado
    tasks_of_type_id: dataPlanner.value.data.data[0].tasks_of_type.id, // ID del tipo de tarea
    dispatch_number_lot: dataPlanner.value.data.data[0].customer_request.dispatch_number_lot, // Número de lote de despacho
    transaction_date: getCurrentFormattedDate(), // Fecha y hora de transacción
    sent_qty: values.request_qty_V? values.request_qty_V : '', // Cantidad enviada
    crop_lot_code: values.selected_crops_lots.code, // Código del lote de cultivo
    vehicle_id: values.vehiclesV? values.vehiclesV.id : dataPlanner.value.data.data[0].vehicle.id, // ID del vehículo
    planner_task_id: dataPlanner.value.data.data[0].id,
    farm_id: values.farm ? 1 : farmDefault,
    supervisory_employee_id: 2, // ID del empleado supervisor
    // supervisory_employee_id: values.emplooyesV.id ?values.emplooyesV.id:dataStart.value.data.data.employee.id, // ID del empleado supervisor
    employee_transport_id: 13, // ID del empleado encargado del transporte
    notes_small: notes.value, // Nota adicional
};

console.log('data', data);
    
    const restp = await postRequest(endpoint.value, data);
console.log('data', data);
    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    

    if (restp.ok) {
        
        console.log('data', data);
    }
});

const getCurrentFormattedDate = () => {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


const searchLots = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            lots.value = [...Lots.value];
        } else {
            lots.value = Lots.value.filter((fram) => {
                return fram.code.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchEmployees = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            employees.value = [...Employees.value];
        } else {
            employees.value = Employees.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const searchVehicles = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            vehicles.value = [...Vehicles.value];
        } else {
            vehicles.value = Vehicles.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};

const searchTaskOfType = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            tasks_of_type.value = [...Tasks_of_type.value];
        } else {
            tasks_of_type.value = Tasks_of_type.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
</script>
  
  <style scoped>
</style>
  