<template>
    <div class="card">

        

        <h2> Titulo: {{ fetchWorkCenter?.taskoftype.name || 'Cargando...' }} Departamento: {{ fetchWorkCenter?.name || 'Cargando...' }}</h2>
        <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6"></div>
        </div>
        <Message severity="error" variant="outlined" v-if="errorsMessageFlag">{{ errorsMessage }}</Message>

        <TabView class="tabview-custom">
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Trabajo avatar -->
                        <i class="pi pi-wrench" style="font-size: 2rem"></i>

                        <span class="font-bold white-space-nowrap">Trabajo</span>
                    </div>
                </template>

                <div class="card">
                    <Message closable v-if="flagIndividual">This activity is Individual</Message>
                    <div class="p-fluid formgrid grid">
                        <!-- Labores -->

                        <div class="field col-12 md:col-3">
                            <div class="flex align-items-center">
                                <label for="username" class="font-semibold w-3">Labores:</label>
                                <AutoComplete v-model="work" inputId="ac" :suggestions="works" @complete="searchBranches" field="name" dropdown />
                            </div>
                            <FrontEndErrors :errorsNew="errorsNew" name="work" />
                            <BackendErrors :name="errorResponseAPI?.errors?.work" />
                        </div>

                        <div class="field col-12 md:col-3">
                            <div class="flex align-items-center">
                                <label for="username" class="font-semibold w-6">Cantidad empleados:</label>
                                <InputNumber v-model="quantityEmployees" showButtons :disabled="flagIndividual" style="width: 6rem" :min="0" :max="99">
                                    <template #incrementbuttonicon>
                                        <span class="pi pi-plus" />
                                    </template>
                                    <template #decrementbuttonicon>
                                        <span class="pi pi-minus" />
                                    </template>
                                </InputNumber>
                            </div>
                            <FrontEndErrors :errorsNew="errorsNew" name="quantityEmployees" />
                            <BackendErrors :name="errorResponseAPI?.errors?.employee_qty" />
                        </div>

                        <!-- Precio total -->
                        <div class="field col-12 md:col-3">
                            <div class="p-inputgroup">
                                <span class="p-float-label border-round border-1">
                                    <span class="p-inputgroup font-bold ml-1">Precio total:</span>
                                    <span class="p-float-label">
                                        <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ totalTarif }}</label>
                                    </span>
                                    <span class="p-inputgroup-addon">$</span>
                                </span>
                            </div>
                            <FrontEndErrors :errorsNew="errorsNew" name="totalTarif" />
                            <BackendErrors :name="errorResponseAPI?.errors?.totalTarif" />
                        </div>

                        <!-- Precio unitario -->
                        <div class="field col-12 md:col-3">
                            <div class="p-inputgroup">
                                <span class="p-float-label border-round border-1">
                                    <span class="p-inputgroup font-bold ml-1">Precio unitario:</span>
                                    <span class="p-float-label">
                                        <label class="font-bold" inputId="locale-us" locale="en-US" for="weightunit">{{ unitTarif.toFixed(2) }}</label>
                                    </span>
                                    <span class="p-inputgroup-addon">$</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="unitTarif" />
                    <BackendErrors :name="errorResponseAPI?.errors?.unitTarif" />
                </div>

                <div class="card">
                    <div class="field col-12 md:col-6">
                        <div class="flex align-items-center">
                            <label for="username" class="font-semibold w-6">Cantidad:</label>
                            <InputNumber v-model="crop_lot_qtyV" showButtons style="width: 6rem" :min="0" :max="99">
                                <template #incrementbuttonicon>
                                    <span class="pi pi-plus" />
                                </template>
                                <template #decrementbuttonicon>
                                    <span class="pi pi-minus" />
                                </template>
                            </InputNumber>
                        </div>
                        <FrontEndErrors :errorsNew="errorsNew" name="crop_lot_qtyV" />
                        <BackendErrors :name="errorResponseAPI?.errors?.crop_lot_qty" />
                    </div>

                    <PickList v-model="dataPickList" :source="dataPickList[0]" :target="dataPickList[1]" listStyle="height:342px" dataKey="id" breakpoint="1400px">
                        <template #sourceheader>
                            <div class="flex gap-2">
                                <div class="w-full justify-content-center">Available: {{ dataPickList[0].length }}</div>
                                <div class="p-inputgroup">
                                    <InputText id="search" v-model="search" placeholder="Filter" size="small" />
                                </div>
                            </div>
                        </template>
                        <template #targetheader>
                            <div class="flex gap-2">
                                <div class="w-full justify-content-center">Selected: {{ dataPickList[1].length }}</div>
                                <div class="w-full justify-content-center">Max: {{ dataPickList[1].length }}</div>
                            </div>
                        </template>
                        <template #item="slotProps">
                            <div class="flex flex-wrap p-2 align-items-center gap-3">
                                <!-- Conditional rendering for image or icon -->
                                <div class="w-4rem flex-shrink-0 border-round">
                                    <img v-if="slotProps.item.photo" :src="slotProps.item.photo" :alt="slotProps.item.full_name" class="w-full border-round" />
                                    <i v-else class="pi pi-user" style="font-size: 2rem; color: gray"></i>
                                </div>
                                <div class="flex-1 flex flex-column gap-2">
                                    <span class="font-bold">{{ slotProps.item.full_name }}</span>
                                    <div class="flex align-items-center gap-2">
                                        <i class="pi pi-tag text-sm"></i>
                                        <span>{{ slotProps.item.document }}</span>
                                    </div>
                                </div>
                                <span class="font-bold">{{ slotProps.item.workCenter.code }}</span>
                            </div>
                        </template>
                    </PickList>

                    <!-- Display a message if PickList is empty -->
                    <div v-if="dataPickList[0].length === 0 && !loading" class="text-center">
                        <p>No available data</p>
                    </div>
                    <div v-if="loading" class="text-center">
                        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
                        <p>Loading data...</p>
                    </div>
                </div>
                <div class="p-fluid formgrid grid">
                    <div class="field col-12">
                        <label for="notas">Notas</label>
                        <Textarea id="address" rows="2" v-model="notesV" />
                    </div>
                    <FrontEndErrors :errorsNew="errorsNew" name="notesV" />
                    <BackendErrors :name="errorResponseAPI?.errors?.notesV" />
                </div>

                <div class="field col-12">
                    <Button 
                    class="flex-auto" 
                    type="button" 
                    label="Enviar" 
                    :disabled="isSubmitting" 
                    @click="actionRecordManager(state)" 
                />

                </div>
            </TabPanel>

            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Detalles avatar -->
                        <i class="pi pi-info-circle" style="font-size: 2rem"></i>
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png" shape="circle" /> -->
                        <span class="font-bold white-space-nowrap">Detalles</span>
                    </div>
                </template>
            </TabPanel>
            <TabPanel>
                <template #header>
                    <div class="flex align-items-center gap-2">
                        <!-- Resumen avatar-->
                        <i class="pi pi-bars" style="font-size: 2rem"></i>
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png" shape="circle" /> -->
                        <span class="font-bold white-space-nowrap">Resumen</span>
                        <Badge value="2" />
                    </div>
                </template>
            </TabPanel>
        </TabView>
        <Toast />
    </div>
</template>
    
    <script setup>
import { ref, computed, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/composables/DataAPI/FetchDataAPI.js';
import { FilterMatchMode, FilterOperator } from 'primevue/api';
///Demo  App Movil
import { CrudService } from '@/service/CRUD/CrudService';
import { InitialDataService } from '@/service/InitialData';
import { z } from 'zod';
import Message from 'primevue/message';

import BackendErrors from '@/layout/composables/Errors/BackendErrors.vue';
import FrontEndErrors from '@/layout/composables/Errors/FrontendErrors.vue';
import { toTypedSchema } from '@vee-validate/zod';
// import { saveAs } from 'file-saver/dist/FileSaver';
import { useToast } from 'primevue/usetoast';
import { useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { useAppMovilService } from '@/service/appMovil/appMovilService_V3';
const { initializeAppMovilSession,getDonesWork, HOLIDAY, initData, TASK_OF_TYPE, getUsers, getDataTasksplanner, getInfoEmployees, fetchWorkCenter, getTarifOfTasksDoneAppMob, getTarifOfWorks } = useAppMovilService();
// import { ProductService } from '@/service/ProductService'
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const supervisoryEmployee = sessionStorage.getItem('accesSessionEmployeeUuid');
//const crudService = CrudService(endpoint.value);
let endpoint = ref('/transactions/contractor/work'); //replace endpoint with your endpoint
const crudService = CrudService(endpoint.value);
const toast = useToast();
const Works = ref([]);
const works = ref([]);
const titulo = ref('');

const originalAvailablePickList = ref([]);

const dataPickList = ref([originalAvailablePickList.value.slice(), []]);
const isSubmitting = ref(false);
// Search term
const search = ref('');

const totalTarif = ref(1000); // Total Tarif input from the user
const unitTarif = computed(() => {
    const length = dataPickList.value[1].length;
    return length > 0 ? totalTarif.value / length : 0; // Avoid division by zero
});
const maxEmployees = 20; // Maximum number of employees

watch(search, (newSearch) => {
    const searchTerm = newSearch.toLowerCase();

    // Filtrar la lista original basado en el término de búsqueda y elementos seleccionados
    dataPickList.value[0] = originalAvailablePickList.value.filter(
        (item) =>
            item.full_name.toLowerCase().includes(searchTerm) && // Coincide con la búsqueda
            !dataPickList.value[1].some((selected) => selected.id === item.id) // No está ya seleccionado
    );
});

const initializeComponent = async () => {
    if (!fetchWorkCenter.value) {
    toast.add({ severity: 'warn', detail: 'Work center no disponible aún.', life: 5000 });
    return;
}
    await loadLazyData();
    if (TASK_OF_TYPE?.name) {
    titulo.value = `Título: ${TASK_OF_TYPE.name}`;
} else {
    titulo.value = 'Título: Sin nombre';
}

    flagIndividual.value = false;
    await readAll(); // Also refresh the lists and PickList data
    toast.add({
        severity: 'info',
        summary: 'Contractor register information',
        detail: 'Please enter the information based on the worker.',
        life: 3000
    });
};


onMounted(initializeComponent);

const readAll = async () => {
    try {
        const response = await getUsers();
        if (!response.ok) {
            toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
            return;
        }

        // Populate originalAvailablePickList
        originalAvailablePickList.value = response.data.data;

        // Update the dataPickList with the new data
        dataPickList.value[0] = [...originalAvailablePickList.value];
        dataPickList.value[1] = []; // Clear the target list
    } catch (error) {
        toast.add({ severity: 'error', detail: 'An error occurred while loading data. in try', life: 3000 });
    } finally {
        loading.value = false; // Hide loading indicator
    }

    try {
        console.log("Holaaa")
        const responseDonesWork = await getDonesWork();
        console.log('responseDonesWork', responseDonesWork);
        if (!responseDonesWork.ok) {
            toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
            return;
        }
        Works.value = responseDonesWork.data.data.map((element) => ({ id: element.id, uuid: element.uuid, name: element.name, work_type_tarif: element.work_type_tarif }));
        console.log('Works', Works.value);
    } catch (error) {
        toast.add({ severity: 'error', detail: 'An error occurred while loading data in catch.', life: 3000 });
    } finally {
        loading.value = false; // Hide loading indicator
        
    }
};

const searchBranches = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            works.value = [...Works.value];
        } else {
            works.value = Works.value.filter((fram) => {
                return fram.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 200);
};
const flagIndividual = ref(false);
const {
    handleSubmit: handleSubmitNew,
    errors: errorsNew,
    defineField,
    resetForm
} = useForm({
    initialValues: {
        work: null,
        quantityEmployees: 0,
        crop_lot_qtyV: 1,
        notesV: ''
    },
    validationSchema: toTypedSchema(
        z.object({
            work: z
                .object({
                    work_type_tarif: z.string().min(4),
                    name: z.string().min(4),
                    uuid: z.string().min(4)
                })
                .optional(),
            crop_lot_qtyV: z
                .number()
                .min(1)
                .superRefine((val, ctx) => {
                    if (val < 1) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'La cantidad de lotes debe ser mayor a 0.'
                        });
                    }
                }),
            quantityEmployees: z
                .number()
                .min(1)
                .max(20)
                .superRefine((val, ctx) => {
                    if (!flagIndividual.value && val < 2) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: 'Debe haber al menos 2 empleados si es una actividad individual.'
                        });
                    }
                })
                .refine((val) => val === dataPickList.value[1].length, {
                    message: 'La cantidad de empleados debe coincidir con los seleccionados.'
                }),

            notesV: z.string().optional()
        })
    )
});

const [work] = defineField('work');
const [quantityEmployees] = defineField('quantityEmployees');
const [crop_lot_qtyV] = defineField('crop_lot_qtyV');
const [notesV] = defineField('notesV');

watch(flagIndividual, () => {
    quantityEmployees.value = flagIndividual.value ? 1 : 1; // Ensure default value
});

watch(work, () => {
    console.log('work', work);
    console.log('work.value', work.value);
    if (work.value.work_type_tarif == 'Individual') {
        flagIndividual.value = true;
        quantityEmployees.value = 1;
    } else {
        flagIndividual.value = false;
    }
});

const resetAll = async () => {
    // Reset form fields and validation errors
    resetForm({
        values: {
            work: null,
            quantityEmployees: 2,
            crop_lot_qtyV: 1,
            notesV: ''
        }
    });

    // Reset flags and state
    flagIndividual.value = false;
    totalTarif.value = 1000;
    works.value = [];
    dataPickList.value = [originalAvailablePickList.value.slice(), []];

    // Refresh data and title
    await loadLazyData();
    await readAll();
    if (TASK_OF_TYPE?.name) {
    titulo.value = `Título: ${TASK_OF_TYPE.name}`;
} else {
    titulo.value = 'Título: Sin nombre';
}

};

const state = ref('new');
const errorsMessage = ref('');
const errorsMessageFlag = ref(false);
const actionRecordManager = handleSubmitNew(async (values) => {
    isSubmitting.value = true; // 🚫 Bloquear botón al inicio

    const responseCRUD = ref();
    try {
        const today = new Date();
        const data = {
            trans_dev: false,
            transaction_date_send: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
            calendar_uuid: null,
            tasks_of_type_uuid: TASK_OF_TYPE.uuid,
            supervisory_employee_uuid: supervisoryEmployee,
            type_price_task: 'WorkDone',
            done_of_type_uuid: values.work.uuid,
            work_type_tarif: values.work?.work_type_tarif || 'No me llega nada en work type tarif',
            employee_qty: values.quantityEmployees,
            crop_lot_qty: values.crop_lot_qtyV,
            employees_ids: dataPickList.value[1].map((item) => item.id),
            total_tarif_task: totalTarif.value,
            unitPrices: unitTarif.value,
            farm_uuid: farmDefault,
            notes_small: '',
            transdate_sync: null,
            device_name: 'Web'
        };

        if (state.value === 'new') {
            responseCRUD.value = await crudService.create(data);
            loadLazyData();
        } else if (state.value === 'edit') {
            const { uuid } = listRowSelect.value[0];
            responseCRUD.value = await crudService.update(uuid, data);
        } else if (state.value === 'clone') {
            responseCRUD.value = await crudService.create(data);
        } else if (state.value === 'patch') {
            responseCRUD.value = await crudService.patch(uuid, data);
        }

        if (responseCRUD.value.ok) {
            toast.add({
                severity: 'success',
                summary: state.value,
                detail: 'Done',
                life: 3000
            });

            await resetAll();
            resetForm();
            await initializeComponent();

            formDialog.value = false;
            listRowSelect.value = [];
            selectedRegisters.value = [];
        } else {
            throw new Error(responseCRUD.value.error);
        }
    } catch (error) {
        console.error('Error:', error);
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Something went wrong.',
            life: 30000
        });
        errorsMessage.value = error.message;
        errorsMessageFlag.value = true;
    } finally {
        isSubmitting.value = false; // ✅ Reactivar el botón cuando termina todo
    }
});

watch(work, async () => {
    const valueTarif = await getTarifOfTasksDoneAppMob(TASK_OF_TYPE.id, HOLIDAY.value, work.value.work_type_tarif, work.value.id);
    totalTarif.value = valueTarif.data.data[0].price_tarif;
});

watch(totalTarif, (newTotalTarif) => {
    // Update the unit price when the total price changes
    unitTarif.value = dataPickList.value[1].length > 0 ? newTotalTarif / dataPickList.value[1].length : 0;
});

const data_planner = ref({
    document: 'XXXXXX',
    planner_date: '2024-01-13',
    product_type: 'Albaca',
    product_variant: 'Nufar',
    packing_type: 'Icopor',
    lot_dispatch: '20822-5589',
    name_employee: 'Nombre del empleado',
    nameSupervisor: 'Nombre Supervisor',
    areawork: 'Corta',
    day_type: 'Festivo',
    day_price: 1500.0,
    total_packing: 500
});

const selectedItems = ref();
const selectAll = ref(false);
const items = ref(Array.from({ length: 100000 }, (_, i) => ({ label: `Item #${i}`, value: i })));

//////
const { getAllResponseAPI, getAllResponseListAPI, totalRecordsResponseAPI, currentPageResponseAPI, linksResponseAPI, postResponseAPI, putResponseAPI, deleteResponseAPI, errorResponseAPI, dataResponseAPI, dataResponseListAPI, statusCode } =
    useDataAPI();

const loading = ref(false);

const size = ref({ label: 'Normal', value: 'normal' });
const sizeOptions = ref([
    { label: 'Small', value: 'small', class: 'sm' },
    { label: 'Normal', value: 'normal' },
    { label: 'Large', value: 'large', class: 'lg' }
]);

const filters = ref();
onBeforeMount(() => {
    initFilters();
    initializeAppMovilSession();
});

const clearFilter = () => {
    initFilters();
};
const initFilters = () => {
    filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS }
        //xxxx: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'status.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // 'work.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // created_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        // updated_at: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    };
};

const loadLazyData = async (event) => {
    //lazyParams.value = { ...lazyParams.value, first: event?.first || first.value };

    await getAllResponseAPI(endpoint.value);
    loading.value = false;
    //data_planner.product_type.value = dataResponseAPI.data[0].product.name;
};

const listRowSelect = ref([]);
const selectedRegisters = ref([]);
const onRowSelect = (data) => {
    listRowSelect.value = data;
    //assignValues(mode.value)
};
//Cut and paste this at the end
watch(listRowSelect, onRowSelect);

const formDialog = ref(false);

const resetValues = () => {};
</script>
    
    <style lang="scss" scoped>
</style>