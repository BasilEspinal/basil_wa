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

    const getTarif = async (tasksType) => {
        if (!tasksType) return 0;
        const listFilterType = ['Task', 'HoraExtra'];
        try {
            if (!listFilterType.includes(tasksType)) return 0;
            const endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype?.id}&filter[work_type_day]=${holiday.value}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}&filter[packing_type_id]=${tasksPlaner.value?.packing_type.id}&filter[type_price]=${tasksType}`;
            const response = await getRequest(endpoint);
            counter.value++;
            return response.data?.data[0]?.price_tarif ?? 0;
        } catch (e) {
            return 0;
        }
    };

    const postDailyReport = async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor, packing_type }) => {
        const dataPost = {
            transaction_date_send: tasksPlaner.value?.transaction_date ?? '',
            tasks_of_type_uuid: tasksPlaner.value?.tasks_of_type.uuid,
            crop_lot_code: loteCode ?? '',
            type_price_task: tasksTypeCode ?? '',
            task_qty: quantity + '',
            notes_small: notas ?? '',
            price_tarif_task: tarifXCautity + '',
            supervisory_employee_uuid: fetchSupervisorId.value,
            worker_employee_uuid: userId,
            planner_task_uuid: tasksPlaner.value?.uuid ?? '',
            customer_request_uuid: tasksPlaner.value?.customer_request.uuid,
            product_uuid: tasksPlaner.value?.product.uuid ?? '',
            product_type_uuid: tasksPlaner.value?.product_type.uuid ?? '',
            variant_uuid: tasksPlaner.value?.varieties.uuid ?? '',
            packing_type_uuid: packing_type,
            device_name: 'Web',
            transdate_sync: null,
            calendar_uuid: null,
            done_of_type_uuid: labor ?? '',
            farm_uuid: fetchCompannyuuid.value
        };
        const restp = await postRequest('/transactions/tasks', dataPost);
        return restp;
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
