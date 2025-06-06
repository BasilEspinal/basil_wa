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
import { computed } from 'vue';
import { useAppMovilService } from '@/service/appMovil/OldFiles/appMovilService.js';

const { t } = useI18n();
const toast = useToast();
const emit = defineEmits(['update-grandparent-data']); // Define the event to emit
//const { getRequest, postRequest, putRequest, deleteRequest, patchRequest, errorResponseAPI } = useData();
const { getShippingsDelivered, getDataTasksplanner } = useAppMovilService();
const errorsReceived = ref({
    visible: false,
    title: '',
    message: '',
    severity: 'error',
    life: 3000 // Duration in milliseconds
});

const showDialog = (title, message, severity = 'error', life = 3000) => {
    errorsReceived.value = {
        visible: true,
        title,
        message,
        severity,
        life
    };

    // Auto-close the dialog after the specified duration
    setTimeout(() => {
        errorsReceived.value.visible = false;
    }, life);
};

const closeDialog = () => {
    errorsReceived.value.visible = false;
};

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
const taskOfType = ref();

const props = defineProps({
    data: { type: Object },
    batchs: {
        type: Array
    }
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
            received_qty_V: z.number().min(1),
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
                code: z.string().min(4)
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

    dataStart.value = await InitialDataService.getDatastart();
    dataPlanner.value = await InitialDataService.getTasksPlanner(dataStart.value);

    vehiclesV.value = {
        name: dataPlanner.value.data.data[0].vehicle.vehicle_type,
        id: dataPlanner.value.data.data[0].vehicle.id
    };

    lots.value.push(props.batchs);
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
    console.log('respShippingsDelivered', respShippingsDelivered);
    if (!respShippingsDelivered.ok) toast.add({ severity: 'error', detail: 'Error' + respShippingsDelivered.error, life: 3000 });
    ShippingsDelivered.value = respShippingsDelivered.data.data.map((shipping) => ({ id: shipping.id, name: shipping.voyage_num }));

    const respPlanning = await getDataTasksplanner();
    console.log('respPlanning', respPlanning.data.id);
    if (!respPlanning.ok) toast.add({ severity: 'error', detail: 'Error' + respPlanning.error, life: 3000 });
    dataPlanner.value = respPlanning.data.id;
    console.log('dataPlanner', dataPlanner.value);
};

const loading = ref(false);

const actionRecordManager = handleSubmitNew(async (values) => {
    const accessSessionWorkCenter = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
    console.log('Parsed object:', accessSessionWorkCenter);
    console.log('Parsed object task:', accessSessionWorkCenter?.taskoftype?.id);

    loading.value = true; // Block the button
    try {
        const responseCRUD = ref();
        const data = {
            trans_dev: false,
            received_qty: values.received_qty_V,
            tasks_of_type_id: accessSessionWorkCenter?.taskoftype?.id,
            planner_of_tasks_id: dataPlanner.value,
            employee_transport_id: values.emplooyesV.id,
            crop_lot_code: values.selected_crops_lots.code,
            vehicle_id: values.vehiclesV ? values.vehiclesV.id : dataPlanner.value.data.data[0].vehicle.id,
            notes_small: notes.value,
            voyage_num: values.voyage_num_V.name
        };

        console.log('data', data);

        if (state.value === 'new') {
            // Handle 'new' state
        } else if (state.value === 'edit') {
            // Handle 'edit' state
        } else if (state.value === 'patch') {
            responseCRUD.value = await crudService.patch('', data);
            console.log('Response from patch:', responseCRUD.value);
            if (responseCRUD.value.ok) {
                showDialog('Success', 'Record updated successfully!', 'success', 3000);
            } else {
                showDialog('Error', responseCRUD.value.error || 'Failed to update record', 'error', 5000);
            }
        } else if (state.value === 'delete') {
            // Handle 'delete' state
        } else {
            // Handle other states
        }
        toast.add({
            severity: responseCRUD.value.ok ? 'success' : 'error',
            summary: 'Create',
            detail: responseCRUD.value.ok ? 'Creado' : responseCRUD.value.error,
            life: 3000
        });

        if (responseCRUD.value.ok) {
            console.log('data', data);
            emit('update-grandparent-data');
        }
    } catch (error) {
        console.error('Error in actionRecordManager:', error);
        showDialog('Error', error.message || 'An unexpected error occurred.', 'error');
    } finally {
        loading.value = false; // Unblock the button
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

<template>
    <div class="grid">
        <Dialog v-model:visible="errorsReceived.visible" :header="errorsReceived.title" modal :style="{ width: '50vw' }" :class="{ 'p-dialog-error': errorsReceived.severity === 'error', 'p-dialog-success': errorsReceived.severity === 'success' }">
            <div class="flex align-items-center gap-3">
                <i class="pi" :class="{ 'pi-times-circle text-red-500': errorsReceived.severity === 'error', 'pi-check-circle text-green-500': errorsReceived.severity === 'success' }" style="font-size: 2rem"></i>
                <span>{{ errorsReceived.message }}</span>
            </div>
        </Dialog>
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
                <label for="username" class="font-semibold w-6rem">{{ t('appmovil.vehicle_employee') }}</label>
                <AutoComplete v-model="emplooyesV" inputId="ac" class="flex-auto" :suggestions="employees" @complete="searchEmployees" field="name" dropdown placeholder="Select Employees" />
                <!--Pendiente-->
                <FrontEndErrors :errorsNew="errorsNew" name="emplooyesV" />
                <BackendErrors :name="errorResponseAPI?.errors?.employee_transport_id" />
            </div>
        </div>

        <div class="mb-3 col-12 md:col-4 lg:col-4">
            <div class="flex align-items-center">
                <label for="username" class="font-semibold w-6rem">{{ t('appmovil.voyage_number') }}</label>
                <AutoComplete v-model="voyage_num_V" inputId="ac" class="flex-auto" :suggestions="shippingsDelivered" @complete="searchShippingsDelivered" @click="readAll" field="name" dropdown placeholder="Select one" />
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
                <Textarea v-model="notes" class="flex-auto" inputId="textarea" rows="5" cols="30" variant="filled" />
            </div>
        </div>

        <div class="mb-3 col-12 sm:col-12 md:col-12 lg:col-12">
            <div class="flex align-items-center gap-4">
                <!-- <Button label="Cancel" severity="secondary" outlined class="w-full" /> -->
                <!-- <Button label="Save" class="w-full" @click="actionRecordManager" /> -->
                <div class="mb-3 col-12 sm:col-12 md:col-12 lg:col-12">
                    <div class="flex align-items-center gap-4">
                        <Button label="Save" class="w-full" @click="actionRecordManager" :disabled="loading" />
                        <span v-if="loading" class="pi pi-spin pi-spinner"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
