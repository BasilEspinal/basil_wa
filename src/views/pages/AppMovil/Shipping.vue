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
                                    <Dropdown v-model="selected_crops_lots" :options="Lote" filter optionLabel="code" class="flex-auto" />
                                    <small id="username-help" :class="{ 'p-invalid text-red-700': errorsNew['selected_crops_lots'] }">
                                    {{ errorsNew.selected_crops_lots }}
                                </small>
                                
                                <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_code" />
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
import { ref, watch, provide, onBeforeMount, onMounted } from 'vue';
import BackendErrors from '@/views/Errors/BackendErrors.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
import { z } from 'zod';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { getRequest, postRequest, putRequest, deleteRequest, patchRequest, errorResponseAPI } = useData();
const tasks_of_type = ref([]);
const Tasks_of_type = ref([]);
const searchManager = ref(null); // Instance of SearchManager
const Tasks_of_type_filter = ref([]);
const employees = ref([]);
const Employees = ref([]);
const vehicles = ref([]);
const Vehicles = ref([]);
const dataStart = ref([]);
const dataPlanner = ref([]);
const dataPrueba = ref();
const selected_crops_lots = ref(null);
const props = defineProps({
    data: {
        type: Object,
        required: true
        
        
    },
    batchs: {
        type: Object,
        required: true
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
            transaction_dateV: z.date(),
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
                id: z.string().min(4)
            }),


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
const [transaction_dateV] = defineField('transaction_dateV');
const [task_of_typeV] = defineField('task_of_typeV');
const [emplooyesV] = defineField('emplooyesV');
const [vehiclesV] = defineField('vehiclesV');
const [request_qty_V, request_qty_VProps] = defineField('request_qty_V');


onBeforeMount(async () => {
    readAll();
    console.log('data', props.data);
    dataStart.value = await getRequest(`/appmovil/datastart`);
    console.log(dataStart.value);
    dataPlanner.value = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${dataStart.value.data.data.employee.workCenter.taskoftype_id.id}&filter[company_id]=${dataStart.value.data.data.company.id}&filter[farm_id]=${dataStart.value.data.data.farm.id}`);
    console.log(dataPlanner.value);
    dataPrueba.value = {planner_task_id:dataPlanner.value.data.data[0].task_of_type.id};
    console.log(dataPrueba.value);
    console.log(props.batch)

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


};

const createRecord = handleSubmitNew(async (values) => {
    const data = {
        order_number_customer: values.order_number_customerV,
        invoice_number_customer: values.invoice_number_customerV,
        customer_name: values.customer_nameV,
        request_date: formatTransactionDateTime(values.request_dateV).formattedDate,
        delivery_datetime: formatTransactionDateTime(values.delivery_datetimeV).formattedDateTime,
        place_of_delivery: values.place_of_deliveryV,
        dispatch_number_lot: values.dispatch_number_lotV,
        request_qty: values.request_qty_V,
        packing_name_customer: values.packing_name_customerV,
        outlet_temperature: parseFloat(values.outlet_temperatureV).toFixed(2),
        product_uuid: values.productV ? values.productV.id : '',
        product_type_uuid: values.product_typeV ? values.product_typeV.id : '',
        variant_uuid: values.variantV ? values.variantV.id : '',
        packing_type_uuid: values.packing_typeV ? values.packing_typeV.id : '',

        packing_qty_dispatch: values.packing_qty_dispatchV ? values.packing_qty_dispatchV.id : '',
        packing_type_dispatch_uuid: values.packing_type_dispatchV ? values.packing_type_dispatchV.id : '',
        // packing_type_dispatch_uuid: "8b57a8ef-c0c7-4bee-8e75-6db8ffe44b48",
        packing_dispatch_weight: values.packing_dispatch_weightV ? values.packing_dispatch_weightV.id : '',
        unit_type_dispatch_uuid: values.unit_type_dispatch_V ? values.unit_type_dispatch_V.id : '',
        // unit_type_dispatch_uuid: "0d8695c0-0d1b-4827-ab53-d18ed2d7d2ca",
        company_uuid: values.company ? values.company.id : companyDefault,
        farm_uuid: values.farm ? values.farm.id : farmDefault,
        employee_uuid: values.employeeV ? values.employeeV.id : employeeUuidDefault.value
    };
    prueba.value = data;
    const restp = await postRequest(endpoint.value, data);

    toast.add({ severity: restp.ok ? 'success' : 'error', summary: 'Create', detail: restp.ok ? 'Creado' : restp.error, life: 3000 });
    loadingData();

    if (restp.ok) {
        formDialogNew.value = false;
        console.log('data', data);
    }
});

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
  