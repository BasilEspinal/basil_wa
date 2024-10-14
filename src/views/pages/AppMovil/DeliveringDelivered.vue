<template>
    
    <div class="grid">

        <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                            
                                <label for="received_qty_V" class="font-semibold w-6rem"> {{ t('appmovil.quantityRequested') }}</label>
                                <!-- <InputNumber id="received_qty_V" v-model="received_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" /> -->
                                <InputNumber v-model="received_qty_V" class="flex-auto" showButtons buttonLayout="horiontal" :min="0">
                                            <template #incrementbuttonicon>
                                                <span class="pi pi-plus" />
                                            </template>
                                            <template #decrementbuttonicon>
                                                <span class="pi pi-minus" />
                                            </template>
                                        </InputNumber>
                            </div>
                            <!-- <pre>{{received_qty_V}}</pre> -->
                            <FrontEndErrors :errorsNew="errorsNew" name="received_qty_V" />
                            <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                            
                        </div>
                        
        

        <div class="mb-3 col-12 md:col-6 lg:col-4">
            <div class="flex align-items-center">
                        
                            <label for="username" class="font-semibold w-6rem">{{t('appmovil.vehicle_employee')}}</label>
                            <AutoComplete v-model="emplooyesV" inputId="ac" class="flex-auto" :suggestions="employees" @complete="searchEmployees" field="name" dropdown placeholder="Select Employees" />
                        <!--Pendiente-->
                        <FrontEndErrors :errorsNew="errorsNew" name="emplooyesV" />
                        <BackendErrors :name="errorResponseAPI?.errors?.employee_transport_id" />
                    </div>
                </div>
        
                <div class="mb-3 col-12 md:col-4 lg:col-4">
            <div class="flex align-items-center">
                        
                            <label for="username" class="font-semibold w-6rem">{{t('appmovil.voyage_number')}}</label>
                            <AutoComplete v-model="voyage_num_V" inputId="ac" class="flex-auto" :suggestions="shippingsDelivered" @complete="searchShippingsDelivered" field="name" dropdown placeholder='Select one' />
                        <!--Pendiente-->
                        <FrontEndErrors :errorsNew="errorsNew" name="voyage_num_V" />
                        <BackendErrors :name="errorResponseAPI?.errors?.voyage_num" />
                    </div>
                </div>
                
                





                        <div class="mb-3 col-12 md:col-4 lg:col-4">
                    <div class="flex align-items-center">
                            
                                <label for="username" class="font-semibold w-6rem">{{ t('appmovil.vehicle') }}</label>
                                <AutoComplete v-model="vehiclesV" inputId="ac" class="flex-auto" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown placeholder="Select Vehicles" />

                            <FrontEndErrors :errorsNew="errorsNew" name="vehiclesV" />
                            <BackendErrors :name="errorResponseAPI?.errors?.vehicle_id" />
                        </div>
                    </div>
                    


                    <div class="mb-3 col-12 md:col-4 lg:col-4">
                        <div class="flex align-items-center">
                                
                                <label class="font-semibold w-6rem" for="crops_lots">{{ t('appmovil.lote') }}</label>
                                <!-- <AutoComplete v-model="selected_crops_lots" inputId="ac" class="flex-auto" :suggestions="lots" @complete="searchLots" field="code" dropdown placeholder="Select lots" /> -->
                                <Dropdown v-model="selected_crops_lots" :options="batchs" filter optionLabel="code" class="flex-auto" />

                            <FrontEndErrors :errorsNew="errorsNew" name="selected_crops_lots" />
                            <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
                        
                        </div>


                    </div>

                    <div class="mb-3 col-12 md:col-12 lg:col-12">
                        <div class="flex align-items-center">
                                
                                <label class="font-semibold w-6rem" for="textarea">{{ t('appmovil.notas') }}</label>
                                <Textarea v-model="notes" class="flex-auto" inputId="textarea" rows="5" cols="30"  variant="filled"  />
                            
                                
                            </div>
                        </div>



                    <div class="mb-3 col-12 sm:col-12 md:col-12 lg:col-12">
                    <div class="flex align-items-center gap-4 ">
                        <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                        <Button label="Save" class="w-full" @click="actionRecordManager" />
                    </div>
                </div>
        </div>
</template>

<script setup>
import SearchManager from './SearchManager.js'
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import ability from '@/service/ability.js';
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import {computed} from 'vue';
import {useAppMovilService} from '@/service/appMovil/appMovilService.js';

const { t } = useI18n();
const toast = useToast();
const { getRequest, postRequest, putRequest, deleteRequest, patchRequest, errorResponseAPI } = useData();
const { getShippingsDelivered } = useAppMovilService();
// const tasks_of_type = ref([]);
// const Tasks_of_type = ref([]);
// const Tasks_of_type_filter = ref([]);
const employees = ref([]);
const Employees = ref([]);
const vehicles = ref([]);
const Vehicles = ref([]);
const dataStart = ref([]);
const crudService = CrudService('/appmovil/receivings/send_qty');
const dataPlanner = ref([]);
const lots = ref([]);
const Lots = ref([]);
const state = ref('patch');
const shippingsDelivered = ref([]);
const ShippingsDelivered = ref([]);

//const endpoint = ref('/appmovil/shippings/send_qty');
const farmDefault = sessionStorage.getItem('accessSessionFarm');

const props = defineProps({
    data: { type: Object },
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
    received_qty_V: 0,
    selected_crops_lots: { code: '' },
    notes: '',
    voyage_num_V: { name: '', id: '' }
    
    // farm: { name: '', id: '' },
    // company: { name: '', id: '' }
},
validationSchema: toTypedSchema(
    z.object({
        // transaction_dateV: z.date(),
        received_qty_V:z.number().min(1),
        // task_of_typeV: z
        //     .object({
        //         name: z.string().min(4),
        //         id: z.string().min(4)
        //     })
        //     .optional(),
        emplooyesV: z
            .object({
                name: z.string().optional(),
                //id: z.string().optional()
                id: z.number().optional()
            })
            .optional(),
            
        vehiclesV: z
            .object({
                name: z.string().optional(),
                id: z.number().optional()
            })
            .optional(),
        selected_crops_lots: z.object({
            code: z.string().min(4),
            
        }),
        notes: z.string().optional(),
        voyage_num_V: z.object({
                name: z.number().optional(),
                id: z.number().optional()
            })

        //farm: z
        //     .object({
        //         name: z.string().optional(),
        //         id: z.string().optional()
        //     })
        //     .optional(),
        // company: z
        //     .object({
        //         name: z.string().optional(),
        //         id: z.string().optional()
        //     })
        //     .optional()
    })
)
});

const [emplooyesV] = defineField('emplooyesV');
const [vehiclesV] = defineField('vehiclesV');
const [received_qty_V, received_qty_VProps] = defineField('received_qty_V');
const [selected_crops_lots] = defineField('selected_crops_lots');
const [notes] = defineField('notes');
const [voyage_num_V] = defineField('voyage_num_V');


onBeforeMount(async () => {
readAll();

dataStart.value= await InitialDataService.getDatastart();
dataPlanner.value = await InitialDataService.getTasksPlanner(dataStart.value);
    
vehiclesV.value = {
    name: dataPlanner.value.data.data[0].vehicle.vehicle_type,  
    id: dataPlanner.value.data.data[0].vehicle.id       
};

lots.value.push(props.batchs)



});

const readAll = async () => {
// const respTasksOfType = await getRequest('/task_of_types');

// const respEmployees = await getRequest('/appmovil/employees?filter[work_center_id]=2');
const respEmployees = await InitialDataService.getEmployeesWorkCenter(2);
if (!respEmployees.ok) toast.add({ severity: 'error', detail: 'Error' + respEmployees.error, life: 3000 });
Employees.value = respEmployees.data.data.map((employee) => ({ id: employee.id, name: employee.first_name }));
employees.value = respEmployees.data.data.map((employee) => employee.name);

// const respVehicles = await getRequest('/vehicles');
const respVehicles = await InitialDataService.getVehicles();
if (!respVehicles.ok) toast.add({ severity: 'error', detail: 'Error' + respVehicles.error, life: 3000 });
Vehicles.value = respVehicles.data.data.map((vehicle) => ({ id: vehicle.id, name: vehicle.vehicle_type }));

const respShippingsDelivered = await getShippingsDelivered();
if (!respShippingsDelivered.ok) toast.add({ severity: 'error', detail: 'Error' + respShippingsDelivered.error, life: 3000 });
ShippingsDelivered.value = respShippingsDelivered.data.data.map((shipping) => ({ id: shipping.id, name: shipping.id }));


};


const actionRecordManager = handleSubmitNew(async (values) => {
const responseCRUD = ref();
const data = {
trans_dev: false, // Valor booleano directamente asignado
received_qty: values.received_qty_V,
employee_transport_id: values.emplooyesV.id ,
crop_lot_code: values.selected_crops_lots.code, // Código del lote de cultivo
vehicle_id: values.vehiclesV? values.vehiclesV.id : dataPlanner.value.data.data[0].vehicle.id, // ID del vehículo
notes_small: notes.value, // Nota adicional
voyage_num: values.voyage_num_V.id, // Número de viaje


// planner_task_id: dataPlanner.value.data.data[0].id,
// farm_id: values.farm ? 1 : farmDefault,
// supervisory_employee_id: 2, // ID del empleado supervisor
//tasks_of_type_id: dataPlanner.value.data.data[0].tasks_of_type.id, // ID del tipo de tarea
// supervisory_employee_id: values.emplooyesV.id ?values.emplooyesV.id:dataStart.value.data.data.employee.id, // ID del empleado supervisor
//dispatch_number_lot: dataPlanner.value.data.data[0].customer_request.dispatch_number_lot, // Número de lote de despacho
};

console.log('data', data);

if (state.value === 'new') {

} else if (state.value === 'edit') {


} else if (state.value === 'patch') {
responseCRUD.value = await crudService.patch('',data);
} 
else if (state.value === 'delete') {
} else {

}    
toast.add({ severity: responseCRUD.value.ok ? 'success' : 'error', summary: 'Create', detail: responseCRUD.value.ok ? 'Creado' : responseCRUD.error, life: 3000 });

if (responseCRUD.value.ok) {    
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
const searchShippingsDelivered = (event) => {
setTimeout(() => {
    if (!event.query.trim().length) {
        shippingsDelivered.value = [...ShippingsDelivered.value];
    } else {
        shippingsDelivered.value = ShippingsDelivered.value.filter((fram) => {
            return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
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

// const searchTaskOfType = (event) => {
// setTimeout(() => {
//     if (!event.query.trim().length) {
//         tasks_of_type.value = [...Tasks_of_type.value];
//     } else {
//         tasks_of_type.value = Tasks_of_type.value.filter((fram) => {
//             return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
//         });
//     }
// }, 200);
// };
</script>

<style scoped>
</style>
