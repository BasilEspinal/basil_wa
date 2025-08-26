// appMovilService_V3.js
import { ref, watch } from 'vue';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest, postRequest } = useData();

const fetchWorkCenter = ref(null);
const fetchSupervisorId = ref(null);
const fetchFarmId = ref(null);
const fetchCompannyId = ref(null);
const fetchCompannyuuid = ref(null);
const holiday = ref('Normal');
const tasksPlaner = ref({});
const tipoActividad = ref([]);
const counter = ref(0);

// Ensure reactivity is reset properly by nulling before re-assigning
const setSessionValue = (refVar, sessionKey, isJSON = false) => {
    refVar.value = null;
    const raw = sessionStorage.getItem(sessionKey);
    refVar.value = isJSON ? (raw ? JSON.parse(raw) : null) : raw;
};

const initializeAppMovilSession = () => {
    setSessionValue(fetchWorkCenter, 'accessSessionWorkCenter', true);
    setSessionValue(fetchSupervisorId, 'accesSessionEmployeeUuid');
    setSessionValue(fetchFarmId, 'accessSessionFarmId');
    setSessionValue(fetchCompannyId, 'accessSessionCompanyId');
    setSessionValue(fetchCompannyuuid, 'accessSessionFarm');

    console.log('[AppMovil] fetchWorkCenter', fetchWorkCenter.value);
    console.log('[AppMovil] fetchCompannyId', fetchCompannyId.value);
    console.log('[AppMovil] fetchFarmId', fetchFarmId.value);
};

const resetAppMovilService = () => {
    fetchWorkCenter.value = null;
    fetchSupervisorId.value = null;
    fetchFarmId.value = null;
    fetchCompannyId.value = null;
    fetchCompannyuuid.value = null;
    holiday.value = 'Normal';
    tasksPlaner.value = {};
    tipoActividad.value = [];
    counter.value = 0;
};

export function useAppMovilService() {
    const error = (e) => ({ data: [], error: e, ok: false });

    const refreshSessionState = async () => {
        await Promise.resolve().then(() => initializeAppMovilSession());
    };

    const initData = async () => {
        await refreshSessionState();
        await getDataTasksplanner();
        await getHoliDay();
        await getTipoActividad();
        counter.value++;
    };

    const getDataTasksplanner = async () => {
        if (!fetchWorkCenter.value?.taskoftype?.id || !fetchCompannyId.value || !fetchFarmId.value) {
            console.log('fetchWorkCenter.value?.taskoftype?.id', fetchWorkCenter.value?.taskoftype?.id);
            console.log('fetchCompannyId.value', fetchCompannyId.value);
            console.log('fetchFarmId.value', fetchFarmId.value);
            return error('Faltan datos para construir el endpoint');
        }

        const endpoint = `/appmovil/tasksplanner?filter[tasks_of_type_id]=${fetchWorkCenter.value.taskoftype.id}&filter[company_id]=${fetchCompannyId.value}&filter[farm_id]=${fetchFarmId.value}`;
        const response = await getRequest(endpoint);

        if (!response.ok || !Array.isArray(response.data?.data) || response.data.data.length === 0) {
            return error('No hay planner asignado');
        }

        console.log('responseGetDataTasksplanner', response);

        tasksPlaner.value = response.data.data[0];
        counter.value++;
        return { ...response, data: response.data.data[0] };
    };

    const getHoliDay = async () => {
        try {
            const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId.value}`);
            holiday.value = response.data.data.length === 0 ? 'Normal' : 'Festivo';
            counter.value++;
        } catch (e) {
            holiday.value = 'Normal';
            return error('Error Get Holiday:', e);
        }
    };

    const getTipoActividad = async () => {
        const response = await getRequest(`/lists/activityTaskType`);
        tipoActividad.value = { ...response, data: response.data?.data };
        counter.value++;
        return tipoActividad.value;
    };

    const getUsers = async () => {
        try {
            const resp = await getRequest(`/appmovil/employees?filter[work_center_id]=${fetchWorkCenter.value?.id}`);
            counter.value++;
            return resp;
        } catch (e) {
            return error('Error Get Users:', e);
        }
    };

    const getInfoEmployees = async (planner_task_id, task_of_type) => {
        try {
            const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=${fetchFarmId.value}`);
            counter.value++;
            return response;
        } catch (e) {
            return error('Error Get Info Employees:', e);
        }
    };

    const getDonesWork = async () => {
        try {
            const taskoftype_id = fetchWorkCenter?.value.taskoftype?.id;
            //const taskoftype_id  = TASK_OF_TYPE()
            console.log('taskoftype_id', taskoftype_id);
            const response = await getRequest(`/lists/getDoneTypeTasksType?filter[tasks_of_type_id]=${taskoftype_id}`);
            console.log('responseGetDonesWork', response);
            counter.value++;
            return response;
        } catch (e) {
            return { data: [], error: 'Error Get Dones Work', ok: false };
        }
    };

    const getInfoEmployeesById = async (planner_task_id, task_of_type, employee_id) => {
        try {
            const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=${fetchFarmId.value}&filter[worker_employee_id]=${employee_id}`);
            counter.value++;
            return response;
        } catch (e) {
            return error('Error Get Info Employees by ID:', e);
        }
    };

    const getShippingsDelivered = async () => {
        try {
            const response = await getRequest(`/transactions/shipping/shippings`);
            counter.value++;
            return response;
        } catch (e) {
            return error('Error Get Shippings Delivered:', e);
        }
    };

    const dataInfoUser = async () => {
        try {
            const response = await getRequest(`/appmovil/datastart`);
            counter.value++;
            return response;
        } catch (e) {
            return error('Error Data Info User:', e);
        }
    };

    const getTarifOfTasksDoneAppMob = async (task_of_type_id, work_type_day, work_type_tarif, done_of_type_id) => {
        try {
            const response = await getRequest(
                `/appmovil/donetarif?filter[tasks_of_type_id]=${task_of_type_id}&filter[work_type_day]=${work_type_day}&filter[work_type_tarif]=${work_type_tarif}&filter[done_of_type_id]=${done_of_type_id}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}`
            );
            counter.value++;
            console.log('responseGetTarifOfTasksDoneAppMob', response);
            return response;
        } catch (e) {
            return error('Error Tarif Tasks Done:', e);
        }
    };

    const getTarifOfWorks = async () => {
        try {
            const response = await getRequest(`/tarif_of_works`);
            counter.value++;
            return response;
        } catch (e) {
            return error('Error Tarif Works:', e);
        }
    };

    // const getTarif = async (tasksType) => {
    //     console.log("Debug tarif", tasksType);
    //     console.log(typeof tasksType);
        
    //     if (!tasksType) return 0;
    //     const listFilterType = ['Task', 'HoraExtra'];
    //     try {
    //         if (!listFilterType.includes(tasksType)) return 0;
    //         const endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype?.id}&filter[work_type_day]=${holiday.value}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}&filter[packing_type_id]=${tasksPlaner.value?.packing_type.id}&filter[type_price]=${tasksType}`;
    //         console.log('getTarif endpoint', endpoint);
    //         const response = await getRequest(endpoint);
    //         counter.value++;
    //         return response.data?.data[0]?.price_tarif ?? 0;
    //     } catch (e) {
    //         return 55;
    //     }
    // };


    const getTarif = async (tasksType) => {
  console.log("Debug tarif", tasksType);
  console.log(typeof tasksType);

  if (!tasksType) return 0;

  const listFilterType = ['Task', 'HoraExtra'];
  if (!listFilterType.includes(tasksType)) return 0;

  // Extrae con seguridad
  const tasks_of_type_id = fetchWorkCenter.value?.taskoftype?.id ?? '';
  const work_type_day   = holiday.value ?? '';
  const farm_id         = fetchFarmId.value ?? '';
  const company_id      = fetchCompannyId.value ?? '';
  const packing_type_id = tasksPlaner.value?.packing_type?.id ?? '';

  try {
    const params = new URLSearchParams({
      'filter[tasks_of_type_id]': String(tasks_of_type_id),
      'filter[work_type_day]':   String(work_type_day),
      'filter[farm_id]':         String(farm_id),
      'filter[company_id]':      String(company_id),
      'filter[packing_type_id]': String(packing_type_id),
      'filter[type_price]':      String(tasksType),
    });

    const endpoint = `/appmovil/taskstarif?${params}`;
    console.log('getTarif endpoint', endpoint, {
      tasks_of_type_id, work_type_day, farm_id, company_id, packing_type_id
    });

    const response = await getRequest(endpoint);
    counter.value++;
    return Number(response.data?.data?.[0]?.price_tarif) || 0;
  } catch (e) {
    console.error('getTarif error:', e); // <- para ver exactamente qué explota
    return 55;
  }
};


    // const postDailyReport = async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor, packing_type }) => {
    //     console.log(tasksPlaner.value);
    //     const dataPost = {
    //         transaction_date_send: tasksPlaner.value?.transaction_date ?? '',
    //         tasks_of_type_uuid: tasksPlaner.value?.tasks_of_type.uuid,
    //         crop_lot_code: loteCode ?? '',
    //         type_price_task: tasksTypeCode ?? '',
    //         task_qty: quantity + '',
    //         notes_small: notas ?? '',
    //         price_tarif_task: tarifXCautity + '',
    //         supervisory_employee_uuid: fetchSupervisorId.value,
    //         worker_employee_uuid: userId,
    //         planner_task_uuid: tasksPlaner.value?.uuid ?? '',
    //         customer_request_uuid: tasksPlaner.value?.customer_request.uuid,
    //         product_uuid: tasksPlaner.value?.product.uuid ?? '',
    //         product_type_uuid: tasksPlaner.value?.product_type.uuid ?? '',
    //         variant_uuid: tasksPlaner.value?.varieties.uuid ?? '',
    //         packing_type_uuid: packing_type,
    //         device_name: 'Web',
    //         transdate_sync: null,
    //         calendar_uuid: null,
    //         done_of_type_uuid: labor ?? '',
    //         farm_uuid: fetchCompannyuuid.value
    //     };
    //     const restp = await postRequest('/transactions/tasks', dataPost);
    //     return restp;
    // };

const postDailyReport = async ({
  loteCode,
  tasksTypeCode,
  quantity,
  notas,
  tarifXCautity,
  userId,
  labor,
  packing_type,
}) => {
  const tp = tasksPlaner.value ?? {};

  // Validaciones mínimas requeridas para el backend
  const required = {
    tasks_of_type_uuid: tp?.tasks_of_type?.uuid,
    planner_task_uuid: tp?.uuid,
    customer_request_uuid: tp?.customer_request?.uuid,
  };

  for (const [key, val] of Object.entries(required)) {
    if (!val) {
      const msg = `Falta ${key.replace(/_/g, ' ')} en tasksPlaner`;
      console.error(msg, tp);
      return error(msg);
    }
  }

  const dataPost = {
    transaction_date_send: tp?.transaction_date ?? '',
    tasks_of_type_uuid: required.tasks_of_type_uuid,
    crop_lot_code: loteCode ?? '',
    type_price_task: tasksTypeCode ?? '',
    task_qty: String(quantity ?? ''),
    notes_small: notas ?? '',
    price_tarif_task: String(tarifXCautity ?? ''),
    supervisory_employee_uuid: fetchSupervisorId.value ?? '',
    worker_employee_uuid: userId,
    planner_task_uuid: required.planner_task_uuid,
    customer_request_uuid: required.customer_request_uuid,
    product_uuid: tp?.product?.uuid ?? '',
    product_type_uuid: tp?.product_type?.uuid ?? '',
    variant_uuid: tp?.varieties?.uuid ?? '',
    // Usa el que te pasan; si no, toma el del planner (si existe)
    packing_type_uuid: packing_type ?? tp?.packing_type?.uuid ?? '',
    device_name: 'Web',
    transdate_sync: null,
    calendar_uuid: null,
    done_of_type_uuid: labor ?? '',
    // Ojo con este nombre: viene de 'accessSessionFarm'. Si realmente es el FARM UUID, está bien.
    farm_uuid: fetchCompannyuuid.value ?? ''
  };

  // (opcional) Log para depurar qué se va a enviar
  console.log('postDailyReport payload', dataPost);

  try {
    const resp = await postRequest('/transactions/tasks', dataPost);
    counter.value++;
    return resp;
  } catch (e) {
    return error('Error al enviar DailyReport: ' + (e?.message || e));
  }
};


    return {
        get TASK_OF_TYPE() {
            return fetchWorkCenter.value?.taskoftype;
        },
        fetchWorkCenter,
        HOLIDAY: holiday,
        initData,
        getDataTasksplanner,
        getHoliDay,
        getTipoActividad,
        getUsers,
        initializeAppMovilSession,
        refreshSessionState,
        resetAppMovilService,
        getInfoEmployees,
        getInfoEmployeesById,
        getShippingsDelivered,
        dataInfoUser,
        getTarifOfTasksDoneAppMob,
        getTarifOfWorks,
        getTarif,
        getDonesWork,
        postDailyReport,
        error
    };
}

initializeAppMovilSession();
