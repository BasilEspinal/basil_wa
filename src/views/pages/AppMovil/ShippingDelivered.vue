<template>
    
        <div class="grid">

            <div class="mb-3 col-12 md:col-6 lg:col-6">
                            <div class="flex align-items-center">
                                
                                    <label for="request_qty_V" class="font-semibold w-6rem"> {{ t('appmovil.quantityRequested') }}</label>
                                    <!-- <InputNumber id="request_qty_V" v-model="request_qty_V" class="flex-auto" inputId="minmax" :min="0" :max="1000" /> -->
                                    <InputNumber v-model="request_qty_V" class="flex-auto" showButtons buttonLayout="horiontal" :min="0">
                                                <template #incrementbuttonicon>
                                                    <span class="pi pi-plus" />
                                                </template>
                                                <template #decrementbuttonicon>
                                                    <span class="pi pi-minus" />
                                                </template>
                                            </InputNumber>
                                </div>
                                <!-- <pre>{{request_qty_V}}</pre> -->
                                <FrontEndErrors :errorsNew="errorsNew" name="request_qty_V" />
                                <BackendErrors :name="errorResponseAPI?.errors?.request_qty" />
                                
                            </div>
                            
            

            <div class="mb-3 col-12 md:col-6 lg:col-6">
                <div class="flex align-items-center">
                            
                                <label for="username" class="font-semibold w-6rem">{{t('appmovil.vehicle_employee')}}</label>
                                <AutoComplete v-model="emplooyesV" inputId="ac" class="flex-auto" :suggestions="employees" @complete="searchEmployees" field="name" dropdown placeholder="Select Employees" />

                            <!--Pendiente-->
                            <FrontEndErrors :errorsNew="errorsNew" name="emplooyesV" />
                            <BackendErrors :name="errorResponseAPI?.errors?.employee_transport_id" />
                        </div>
                    </div>
                    




                    
                            <div class="mb-3 col-12 md:col-6 lg:col-6">
                        <div class="flex align-items-center">
                                
                                    <label for="username" class="font-semibold w-6rem">{{ t('appmovil.vehicle') }}</label>
                                    <AutoComplete v-model="vehiclesV" inputId="ac" class="flex-auto" :suggestions="vehicles" @complete="searchVehicles" field="name" dropdown placeholder="Select Vehicles" />
                                
                                <FrontEndErrors :errorsNew="errorsNew" name="vehiclesV" />
                                <BackendErrors :name="errorResponseAPI?.errors?.vehicle_id" />
                            </div>
                        </div>
                        


                        <div class="mb-3 col-12 md:col-6 lg:col-6">
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
                            <!-- <Button label="Save" class="w-full" @click="actionRecordManager" /> -->
                            <div class="mb-3 col-12 sm:col-12 md:col-12 lg:col-12">
                            <div class="flex align-items-center gap-4">
                                <Button 
                                label="Save" 
                                class="w-full" 
                                @click="actionRecordManager" 
                                :disabled="loading" 
                                />
                                <span v-if="loading" class="pi pi-spin pi-spinner"></span>
                            </div>
                            </div>

                        </div>
                    </div>
            </div>
</template>
  
  <script setup>
  
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

import { z } from 'zod';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import ability from '@/service/ability.js';
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import {computed} from 'vue';
const { t } = useI18n();
const toast = useToast();

const tasks_of_type = ref([]);
const Tasks_of_type = ref([]);
const Tasks_of_type_filter = ref([]);
const employees = ref([]);
const Employees = ref([]);
const vehicles = ref([]);
const Vehicles = ref([]);
const dataStart = ref([]);
const crudService = CrudService('/appmovil/shippings/send_qty');
const dataPlanner = ref([]);
const lots = ref([]);
const Lots = ref([]);
const state = ref('new');

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
        vehiclesV: { name: '', id: null},
        request_qty_V: 0,
        farm: { name: '', id: '' },
        company: { name: '', id: '' }
    },
    validationSchema: toTypedSchema(
        z.object({
            // transaction_dateV: z.date(),
            request_qty_V:z.number().min(1),
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
                    id: z.number().optional()
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
    const respTasksOfType = await InitialDataService.getTaskOfType();
    if (!respTasksOfType.ok) toast.add({ severity: 'error', detail: 'Error' + respTasksOfType.error, life: 3000 });
    Tasks_of_type.value = respTasksOfType.data.data.map((task) => ({ id: task.uuid, name: task.name }));
    Tasks_of_type_filter.value = respTasksOfType.data.data.map((task) => task.name);

    // const respEmployees = await getRequest('/appmovil/employees?filter[work_center_id]=2');
    const respEmployees = await InitialDataService.getEmployeesWorkCenter(2);
    if (!respEmployees.ok) toast.add({ severity: 'error', detail: 'Error' + respEmployees.error, life: 3000 });
    Employees.value = respEmployees.data.data.map((employee) => ({ id: employee.uuid, name: employee.first_name }));
    employees.value = respEmployees.data.data.map((employee) => employee.name);

    // const respVehicles = await getRequest('/vehicles');
    const respVehicles = await InitialDataService.getVehicles();
    if (!respVehicles.ok) toast.add({ severity: 'error', detail: 'Error' + respVehicles.error, life: 3000 });
    Vehicles.value = respVehicles.data.data.map((vehicle) => ({ id: vehicle.id, name: vehicle.vehicle_type }));
    //console.log(Vehicles.value);

};

const loading = ref(false); // Tracks if the process is in progress

const actionRecordManager = handleSubmitNew(async (values) => {
  loading.value = true; // Block the button
  try {
    const responseCRUD = ref();
    const data = {
      trans_dev: false, // Boolean directly assigned
      tasks_of_type_id: dataPlanner.value.data.data[0].tasks_of_type.id, // Task type ID
      dispatch_number_lot: dataPlanner.value.data.data[0].customer_request.dispatch_number_lot, // Dispatch number
      transaction_date: getCurrentFormattedDate(), // Current date and time
      sent_qty: values.request_qty_V || '', // Sent quantity
      crop_lot_code: values.selected_crops_lots.code, // Crop lot code
      vehicle_id: values.vehiclesV ? values.vehiclesV.id : dataPlanner.value.data.data[0].vehicle.id, // Vehicle ID
      planner_task_id: dataPlanner.value.data.data[0].id, // Planner task ID
      farm_id: values.farm ? 1 : farmDefault, // Farm ID
      supervisory_employee_id: 2, // Supervisor employee ID
      employee_transport_id: 13, // Transport employee ID
      notes_small: notes.value, // Notes
    };

    console.log('data', data);
    console.log('JSON.stringify(data)', JSON.stringify(data, null, 2));

    if (state.value === 'new') {
      responseCRUD.value = await crudService.create(data);
    } else if (state.value === 'edit') {
      // Handle 'edit' state
    } else if (state.value === 'patch') {
      // Handle 'patch' state
    } else {
      // Handle other states
    }

    toast.add({
      severity: responseCRUD.value.ok ? 'success' : 'error',
      summary: 'Create',
      detail: responseCRUD.value.ok ? 'Creado' : responseCRUD.error,
      life: 3000,
    });

    if (responseCRUD.value.ok) {
      console.log('data', data);
      emit('update-grandparent-data');

    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    loading.value = false; // Unblock the button
  }
});

const emit = defineEmits(['update-grandparent-data']); // Define the event to emit



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

// const searchTaskOfType = (event) => {
//     setTimeout(() => {
//         if (!event.query.trim().length) {
//             tasks_of_type.value = [...Tasks_of_type.value];
//         } else {
//             tasks_of_type.value = Tasks_of_type.value.filter((fram) => {
//                 return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
//             });
//         }
//     }, 200);
// };
</script>
  
  <style scoped>
</style>
  