// appMovilService.js
import { ref, watch } from 'vue';
import useData from '@/service/FetchData/FetchDataAPI.js';

const { getRequest, postRequest, errorResponseAPI } = useData();

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
    const error = (e, checks = null, steps = []) => ({ data: [], error: e, ok: false, checks, steps });

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
        const companyUuid = sessionStorage.getItem('accessSessionCompany');
        const farmUuid = sessionStorage.getItem('accessSessionFarm');
        const companyName = sessionStorage.getItem('accessSessionCompanyName');
        const farmName = sessionStorage.getItem('accessSessionFarmName');
        const tasksOfTypedId = fetchWorkCenter.value?.taskoftype?.id;

        // --- SESSION PRESENCE CHECKS ---
        const baseChecks = {
            workCenter: !!fetchWorkCenter.value,
            company: !!companyUuid,
            farm: !!farmUuid,
            date: true
        };

        // Check if names are missing (the "---" issue)
        const needsSessionRefresh = !companyName || !farmName;

        if (!tasksOfTypedId || !companyUuid || !farmUuid || needsSessionRefresh) {
            return error(
                'Sesión incompleta o desactualizada.',
                baseChecks,
                [
                    { title: 'Cerrar Sesión', desc: 'Presione el botón de salir en el menú superior.' },
                    { title: 'Volver a Ingresar', desc: 'Ingrese sus credenciales nuevamente para sincronizar su empresa y finca.' }
                ]
            );
        }

        // Broaden search: Filter ONLY by task type to see all potential plannings
        const endpoint = `/appmovil/tasksplanner?filter[tasks_of_type_id]=${tasksOfTypedId}`;
        const response = await getRequest(endpoint);

        if (!response.ok || !Array.isArray(response.data?.data) || response.data.data.length === 0) {
            return error(
                `Sin planeación para "${fetchWorkCenter.value.taskoftype.name}"`,
                { ...baseChecks, workCenter: false },
                [
                    { title: 'Verificar en Web', desc: 'Vaya al módulo de Planeación Diaria en la plataforma web.' },
                    { title: 'Crear Planeación', desc: `Asegúrese de que exista una planeación para el centro de trabajo "${fetchWorkCenter.value.name}".` }
                ]
            );
        }

        console.log('Total plannings found for this type:', response.data.data.length);

        // --- UNIT MATCH CHECKS (Company & Farm) ---
        const plannersForMyUnit = response.data.data.filter(p =>
            p.company?.uuid === companyUuid && p.farm?.uuid === farmUuid
        );

        if (plannersForMyUnit.length === 0) {
            const firstFound = response.data.data[0];
            const companyMatch = firstFound.company?.uuid === companyUuid;
            const farmMatch = firstFound.farm?.uuid === farmUuid;

            const detailedChecks = {
                ...baseChecks,
                company: companyMatch,
                farm: farmMatch
            };

            const foundUnit = `${firstFound.company?.name || '---'} / ${firstFound.farm?.name || '---'}`;
            const myUnit = `${companyName} / ${farmName}`;

            return error(
                'Conflicto de Ubicación Detectado',
                detailedChecks,
                [
                    { title: 'Verificar Ubicación en Web', desc: `La planeación encontrada pertenece a "${foundUnit}", pero usted está en "${myUnit}".` },
                    { title: 'Corregir en Web', desc: 'Mueva la planeación a la finca correcta o cambie su finca de trabajo en la web.' }
                ]
            );
        }

        // --- DATE & STATUS CHECKS ---
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const today = `${year}-${month}-${day}`;

        const validPlanner = plannersForMyUnit.find(planner => {
            const isToday = planner.transaction_date === today;
            const statusName = planner.status?.name?.toUpperCase();
            return isToday && statusName === 'EN PROGRESO';
        });

        if (!validPlanner) {
            const todayPlanner = plannersForMyUnit.find(p => p.transaction_date === today);
            if (!todayPlanner) {
                const dates = plannersForMyUnit.map(p => p.transaction_date).join(', ');
                return error(
                    `Fecha Incorrecta (${today})`,
                    { ...baseChecks, date: false },
                    [
                        { title: 'Verificar Fecha en Web', desc: `Se encontraron planeaciones para: [${dates}], pero ninguna para hoy.` },
                        { title: 'Actualizar Fecha', desc: 'Cambie la fecha de la planeación en la web al día de hoy.' }
                    ]
                );
            }
            // Use the specific instruction requested by the user
            return error(
                `Planeación Inactiva (${todayPlanner.status?.name})`,
                baseChecks,
                [
                    { title: 'Activar Planeación', desc: 'Vaya a la web y cambie el estado de la planeación a "En progreso".' },
                    { title: 'Refrescar App', desc: 'Una vez activada, regrese a esta pantalla para continuar.' }
                ]
            );
        }

        tasksPlaner.value = validPlanner;
        counter.value++;
        return { ...response, data: validPlanner };
    };

    const getHoliDay = async () => {
        try {
            const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId.value}`);
            if (!response.ok) throw new Error(response.error || 'Failed to fetch holiday');
            holiday.value = response.data.data.length === 0 ? 'Normal' : 'Festivo';
            counter.value++;
        } catch (e) {
            console.error('Error Get Holiday:', e);
            holiday.value = 'Normal'; // Fallback safe default, but logged
            return error('Error Get Holiday: ' + e.message);
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

    const getTarif = async (tasksType) => {
        console.log("Debug tarif", tasksType);
        console.log(typeof tasksType);

        if (!tasksType) return 0;

        const listFilterType = ['Task', 'HoraExtra'];
        if (!listFilterType.includes(tasksType)) return 0;

        // Extrae con seguridad
        const tasks_of_type_id = fetchWorkCenter.value?.taskoftype?.id ?? '';
        const work_type_day = holiday.value ?? '';
        const farm_id = fetchFarmId.value ?? '';
        const company_id = fetchCompannyId.value ?? '';
        const packing_type_id = tasksPlaner.value?.packing_type?.id ?? '';

        try {
            const params = new URLSearchParams({
                'filter[tasks_of_type_id]': String(tasks_of_type_id),
                'filter[work_type_day]': String(work_type_day),
                'filter[farm_id]': String(farm_id),
                'filter[company_id]': String(company_id),
                'filter[packing_type_id]': String(packing_type_id),
                'filter[type_price]': String(tasksType),
            });

            const endpoint = `/appmovil/taskstarif?${params}`;
            console.log('getTarif endpoint', endpoint, {
                tasks_of_type_id, work_type_day, farm_id, company_id, packing_type_id
            });

            const response = await getRequest(endpoint);

            if (!response.ok) {
                console.error('Error fetching tarif:', response.error);
                return 0; // Return 0 on error, NOT A RANDOM NUMBER
            }

            counter.value++;
            return Number(response.data?.data?.[0]?.price_tarif) || 0;
        } catch (e) {
            console.error('getTarif unexpected error:', e);
            return 0; // Return 0 on exception
        }
    };


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


    const getPlannerTask = async (taskId, companyId, farmId) => {
        return await getRequest(
            `/appmovil/tasksplanner?filter[tasks_of_type_id]=${taskId}&filter[company_id]=${companyId}&filter[farm_id]=${farmId}`
        );
    };

    const getEmployeesWorkCenterById = async (workcenterId) => {
        return await getRequest(`/appmovil/employees?filter[work_center_id]=${workcenterId}`);
    };

    const getTasksTarif = async (taskId, packingTypeId) => {
        return await getRequest(
            `/appmovil/taskstarif?filter[tasks_of_type_id]=${taskId}&filter[packing_type_id]=${packingTypeId}`
        );
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
        error,
        errorResponseAPI, // Exposed for UI validation
        // Merged from AppMovilCorta
        getPlannerTask,
        getEmployeesWorkCenterById,
        getTasksTarif
    };
}

initializeAppMovilSession();
