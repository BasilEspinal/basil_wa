<script setup>
import { ref, computed, watch, provide, onBeforeMount, onMounted } from 'vue';
import useDataAPI from '@/service/FetchData/FetchDataAPI.js';
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
import { useAppMovilService } from '@/service/appMovil/appMovilService';
const { initializeAppMovilSession, getDonesWork, HOLIDAY, initData, TASK_OF_TYPE, getUsers, getDataTasksplanner, getInfoEmployees, fetchWorkCenter, getTarifOfTasksDoneAppMob, getTarifOfWorks } = useAppMovilService();
// import { ProductService } from '@/service/ProductService'
const farmDefault = sessionStorage.getItem('accessSessionFarm');
const supervisoryEmployee = sessionStorage.getItem('accesSessionEmployeeUuid');
//const crudService = CrudService(endpoint.value);

const props = defineProps({
    editData: {
        type: Object,
        default: null
    },
    mode: {
        type: String,
        default: 'new'
    }
});
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

const totalTarif = ref(0); // Total Tarif input from the user
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
    // toast.add({
    //     severity: 'info',
    //     summary: 'Contractor register information',
    //     detail: 'Please enter the information based on the worker.',
    //     life: 3000
    // });
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
        // Logic moved to watcher to prevent race conditions with Edit mode
        if (!props.editData?.uuid) {
             // Just ensure original is set, but don't force reset here as watcher handles it
             // dataPickList.value[0] = [...originalAvailablePickList.value]; 
        }
    } catch (error) {
        toast.add({ severity: 'error', detail: 'An error occurred while loading data. in try', life: 3000 });
    } finally {
        loading.value = false; // Hide loading indicator
    }

    try {
        
        const responseDonesWork = await getDonesWork();
        
        if (!responseDonesWork.ok) {
            toast.add({ severity: 'error', detail: 'Error: ' + response.error, life: 3000 });
            return;
        }
        Works.value = responseDonesWork.data.data.map((element) => ({ id: element.id, uuid: element.uuid, name: element.name, work_type_tarif: element.work_type_tarif }));
        
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
                    work_type_tarif: z.string().optional(),
                    name: z.string().optional(),
                    uuid: z.string().optional(),
                    id: z.union([z.string(), z.number()]).optional()
                })
                .nullable()
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

const [work, workProps] = defineField('work');
const [quantityEmployees] = defineField('quantityEmployees');
const [crop_lot_qtyV] = defineField('crop_lot_qtyV');
const [notesV] = defineField('notesV');

watch(flagIndividual, (newVal) => {
    if (newVal) {
        quantityEmployees.value = 1;
    }
    // If false (Group), we do NOT force a value, allowing the edit data to persist
});

watch(work, () => {
    // Only trigger logic if work is actually selected
    if (work.value && work.value.work_type_tarif) {
        if (work.value.work_type_tarif == 'Individual') {
            flagIndividual.value = true;
            quantityEmployees.value = 1;
        } else {
            flagIndividual.value = false;
        }
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
    totalTarif.value = 0;
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

// const state = ref('new'); // Use props.mode instead
const errorsMessage = ref('');
const errorsMessageFlag = ref(false);
const actionRecordManager = handleSubmitNew(async (values) => {
    isSubmitting.value = true; // 🚫 Bloquear botón al inicio

    const responseCRUD = ref();
    try {
        const today = new Date();
        if (!values.work?.uuid && !values.work?.id) {
    toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Debes seleccionar una labor válida',
        life: 3000
        
    });
    return;
}
       const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        const data = {
            trans_dev: false,
            transaction_date_send: formattedDate,
            transaction_date: formattedDate,
            calendar_uuid: null,
            // tasks_of_type_uuid: TASK_OF_TYPE.uuid,
            tasks_of_type_uuid: taskOfType.value?.uuid,
            supervisory_employee_uuid: supervisoryEmployee,
            type_price_task: 'WorkDone',
            done_of_type_uuid: values.work?.uuid || null,
            //done_of_type_uuid: values.work.uuid,
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

       // Valida antes de enviar:
        if (!taskOfType.value?.uuid) {
        toast.add({ severity:'error', summary:'Error', detail:'No hay tasks_of_type disponible aún', life:4000 });
        return;
        }     

        if (props.mode === 'new') {
            responseCRUD.value = await crudService.create(data);
            loadLazyData();
        } else if (props.mode === 'edit') {
            const uuid = props.editData?.uuid;
            if (!uuid) throw new Error('No UUID found for update');
            responseCRUD.value = await crudService.update(uuid, data);
        } else if (props.mode === 'clone') {
            responseCRUD.value = await crudService.create(data);
        } else if (props.mode === 'patch') {
            responseCRUD.value = await crudService.patch(uuid, data);
        }

        if (responseCRUD.value.ok) {
            toast.add({
                severity: 'success',
                summary: props.mode === 'edit' ? 'Updated' : 'Created',
                detail: 'Done',
                life: 3000
            });

            await resetAll();
            resetForm();
            await initializeComponent();

            // formDialog.value = false; // Managed by parent
            listRowSelect.value = [];
            selectedRegisters.value = [];
            return responseCRUD.value; // Return response so parent knows it succeeded
            listRowSelect.value = [];
            selectedRegisters.value = [];
        } else {
            throw new Error(responseCRUD.value.error);
        }
    } catch (error) {
        
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

// Removed duplicate watch - now handled by watch([work, taskOfTypeId]) below



// watch(totalTarif, (newTotalTarif) => {
//     // Update the unit price when the total price changes
//     unitTarif.value = dataPickList.value[1].length > 0 ? newTotalTarif / dataPickList.value[1].length : 0;
// });

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

const taskOfType    = computed(() => fetchWorkCenter.value?.taskoftype ?? null);
const taskOfTypeId = computed(() => fetchWorkCenter.value?.taskoftype?.id ?? null);

// watch([work, taskOfTypeId], async ([w, toId]) => {
//   // No sigas si falta algo
//   if (!w || !w.work_type_tarif || !w.id || !toId) return;

//   try {
//     const resp = await getTarifOfTasksDoneAppMob(
//       toId,
//       HOLIDAY.value,
//       w.work_type_tarif,
//       w.id
//     );
//     totalTarif.value = resp?.data?.data?.[0]?.price_tarif ?? 0;
//   } catch (e) {
//     
//     totalTarif.value = 0;
//   }
// });



watch([work, taskOfTypeId], async ([w, toId]) => {
  // More robust validation
  if (!w || !w.work_type_tarif || !w.id || !toId || !HOLIDAY.value) {
    // Only reset to 0 if we're NOT in edit mode with existing data
    if (props.mode !== 'edit' || !totalTarif.value) {
      totalTarif.value = 0;
    }
    return;
  }

  // Skip fetch if in edit mode and we already have a price loaded from editData
  if (props.mode === 'edit' && totalTarif.value > 0) {
    return;
  }

  try {
    const resp = await getTarifOfTasksDoneAppMob(
      toId,
      HOLIDAY.value,
      w.work_type_tarif,
      w.id
    );
    // Safe access: check if data exists and is an array with items
    if (resp?.ok && Array.isArray(resp?.data?.data) && resp.data.data.length > 0) {
        totalTarif.value = resp.data.data[0].price_tarif;
    } else {
        // Only reset to 0 if not in edit mode
        if (props.mode !== 'edit') {
          totalTarif.value = 0;
        }
    }
  } catch (e) {
    // Silently handle error - don't reset if in edit mode with existing value
    if (props.mode !== 'edit' || !totalTarif.value) {
      totalTarif.value = 0;
    }
  }
});


watch(work, () => {
  if (work.value?.work_type_tarif === 'Individual') {
    flagIndividual.value = true;
    quantityEmployees.value = 1;
  } else {
    flagIndividual.value = false;
  }
});


// Start: Edit Mode Logic (Correct Placement)
// Start: Edit Mode Logic (Correct Placement)
const fetchedDetails = ref(null);

watch([() => props.editData, Works, originalAvailablePickList], async ([newDataRaw, currentWorks, currentUsers]) => {
    if (newDataRaw?.uuid) {
        loading.value = true;
        
        // Reset cache if moving to a different record
        if (fetchedDetails.value?.uuid !== newDataRaw.uuid) {
             fetchedDetails.value = null;
        }

        try {
            let newData;
            
            // Use cached details if available to prevent redundant calls and race conditions
            if (fetchedDetails.value) {
                newData = fetchedDetails.value;
            } else {
                 // Fetch full data with 'employees' relation included
                const response = await crudService.getById(newDataRaw.uuid, { include: 'employees' });
                
                if (!response.ok) {
                    toast.add({ severity: 'error', detail: 'Error loading details: ' + response.error, life: 3000 });
                    return;
                }
                newData = response.data.data || response.data;
                fetchedDetails.value = newData; // Cache the successful response
            }
            
            // Merge logic: Start with editData (prop), then overwrite with NON-NULL fetched data
            const finalData = { ...newDataRaw }; // Clone prop details
            
            // Only overwrite if fetched has value
            for (const key in newData) {
                if (newData[key] !== null && newData[key] !== undefined) {
                    // Defensive check for array fields to prevent overwriting with empty arrays if we already have data
                    if ((key === 'employees' || key === 'employees_detail') && Array.isArray(newData[key]) && newData[key].length === 0) {
                         // Check if we have existing data for this key
                         if (Array.isArray(finalData[key]) && finalData[key].length > 0) {
                             continue;
                         }
                    }
                    finalData[key] = newData[key];
                }
            }

            // 1. Set simple fields 
            // Note: Verify field names against API response.
            crop_lot_qtyV.value = finalData.crop_lot_qty ?? 1;
            
            notesV.value = finalData.notes_small || finalData.notes || '';
            
            quantityEmployees.value = finalData.employee_qty ?? 0;
            
            totalTarif.value = Number(finalData.total_tarif_task) || 0; 

            // 2. Set Work
            if (currentWorks.length > 0) {
                // Check multiple possible keys from both sources
                const doneTypeUuid = finalData.doneType?.uuid || finalData.done_of_type_uuid;
                const doneTypeId = finalData.doneType?.id || finalData.done_of_type_id; 

                // Use loose matching (String comparison)
                const foundWork = currentWorks.find(w => 
                    (doneTypeUuid && String(w.uuid) === String(doneTypeUuid)) || 
                    (doneTypeId && String(w.id) === String(doneTypeId))
                );
                
                if (foundWork) {
                    work.value = foundWork;
                } else {
                    // Fallback: Inject the work item from the transaction details if available
                    if (finalData.doneType) {
                        const workToInject = { ...finalData.doneType };
                        
                        // Ensure it has both ID and UUID - prioritize UUID from multiple sources
                        if (!workToInject.uuid) {
                            workToInject.uuid = finalData.done_of_type_uuid || finalData.doneType.uuid;
                        }
                        if (!workToInject.id) {
                            workToInject.id = finalData.done_of_type_id || finalData.doneType.id;
                        }

                        // Only inject if we have at least a UUID (required by backend)
                        if (workToInject.uuid) {
                            Works.value.push(workToInject);
                            works.value = [...Works.value]; 
                            work.value = workToInject;
                        } else {
                            console.warn('Could not inject work: missing UUID', finalData);
                        }
                    }
                }
            }

            // 3. Set PickList
            const sourceEmployees = finalData.employees_detail && Array.isArray(finalData.employees_detail) && finalData.employees_detail.length > 0 
                                      ? finalData.employees_detail 
                                      : (finalData.employees && Array.isArray(finalData.employees) ? finalData.employees : []);

            if (sourceEmployees.length > 0) {
                 // Inject missing employees from source into currentUsers to ensure they can be selected
                 const existingIds = new Set(currentUsers.map(u => String(u.id)));
                 sourceEmployees.forEach(emp => {
                     if (!existingIds.has(String(emp.id))) {
                         // Add minimum required fields
                         currentUsers.unshift({
                             id: emp.id,
                             uuid: emp.uuid,
                             full_name: emp.full_name || emp.name,
                             document: emp.document,
                             photo: emp.photo,
                             workCenter: emp.workCenter // Preserve if available
                         });
                         existingIds.add(String(emp.id)); // Prevent duplicates if multiple
                     }
                 });
            }

            if (currentUsers.length > 0) {
                const processEmployees = (ids, fieldType) => {
                     // Normalize target IDs to strings for robust comparison
                     const selectedIds = new Set(ids.map(id => String(id)));
                     
                     const available = [];
                     const selected = [];
                     
                     currentUsers.forEach(user => {
                         const userVal = fieldType === 'uuid' ? user.uuid : user.id;
                         // Normalize candidate ID to string and check
                         if (selectedIds.has(String(userVal))) {
                             selected.push(user);
                         } else {
                             available.push(user);
                         }
                     });
                     
                     // Direct assignment to dataPickList (Vue reactivity handles the array content)
                     dataPickList.value = [available, selected];
                     
                     // Force quantity update to match selected employees
                     quantityEmployees.value = selected.length;
                };

                // Check for 'employees' array (objects) or 'employees_ids' (ids)
                // Priority: employees_detail (full objects) > employees (full objects) > employees_ids (ids)
                if (finalData.employees_detail && Array.isArray(finalData.employees_detail) && finalData.employees_detail.length > 0) {
                     processEmployees(finalData.employees_detail.map(e => e.id), 'id');
                } else if (finalData.employees && Array.isArray(finalData.employees) && finalData.employees.length > 0) {
                     processEmployees(finalData.employees.map(e => e.id), 'id');
                } else if (finalData.employees_ids && Array.isArray(finalData.employees_ids) && finalData.employees_ids.length > 0) {
                     processEmployees(finalData.employees_ids, 'id');
                } else {
                     // Fallback: if no valid list found, reset to all available
                     // Ensure we show something rather than nothing if in edit mode and fetch failed to find employees
                     dataPickList.value = [[...currentUsers], []];
                     quantityEmployees.value = 0;
                }
            }
        } catch (error) {
            toast.add({ severity: 'error', detail: 'Failed to fetch details', life: 3000 });
        } finally {
            loading.value = false;
        }

    } else {
       // If no editData, or just clearing
        fetchedDetails.value = null; // Clear cache
        
        // Ensure "New" mode starts clean
        if (originalAvailablePickList.value.length > 0) {
            dataPickList.value = [[...originalAvailablePickList.value], []];
        } else {
             dataPickList.value = [[], []];
        }
        quantityEmployees.value = 0;
        work.value = null;
        totalTarif.value = 0;
        flagIndividual.value = false;
        titulo.value = TASK_OF_TYPE?.name ? `Título: ${TASK_OF_TYPE.name}` : 'Título: Sin nombre';
    }
}, { immediate: true });


defineExpose({
    actionRecordManager
});
</script>

<template>
    <div class="card mb-4 bg-primary-reverse border-round-xl shadow-2">
        <div class="flex align-items-center justify-content-between p-3">
            <div class="flex align-items-center gap-3">
                <div class="bg-primary-50 p-3 border-round-circle">
                    <i class="pi pi-mobile text-primary text-3xl"></i>
                </div>
                <div>
                    <h1 class="m-0 text-3xl font-bold tracking-tight">{{ $t('menu.contractorCapture') }}</h1>
                    <p class="m-0 text-600 font-medium mt-1">
                        Titulo: {{ fetchWorkCenter?.taskoftype.name || 'Cargando...' }} | Departamento: {{ fetchWorkCenter?.name || 'Cargando...' }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
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
                                <AutoComplete v-model="work" v-bind="workProps" inputId="ac" :suggestions="works" @complete="searchBranches" field="name" dropdown />
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
                            <label for="username" class="font-semibold w-6">Cantidad Lotes:</label>
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
                                <span class="font-bold">{{ slotProps.item.workCenter?.code ?? '' }}</span>
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

<style lang="scss" scoped></style>
