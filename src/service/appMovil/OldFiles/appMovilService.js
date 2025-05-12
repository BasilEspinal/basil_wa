import { ref, computed } from 'vue';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

export function useAppMovilService() {
    const { getRequest, postRequest } = useData();

    // Estado reactivo
    const holiday = ref('Normal');
    const tasksPlaner = ref({});
    const tipoActividad = ref([]);
    const counter = ref(0);

    // Variables dinámicas
    let fetchWorkCenter = null;
    let fetchSupervisorId = null;
    let fetchFarmId = null;
    let fetchCompanyId = null;
    let fetchCompanyUuid = null;

    // Computed: valores actualizados dinámicamente
    const TASK_OF_TYPE = computed(() => fetchWorkCenter?.taskoftype || null);

    // Función de inicialización
    const initData = async () => {
        resetState();
        fetchWorkCenter = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
        fetchSupervisorId = sessionStorage.getItem('accesSessionEmployeeUuid');
        fetchFarmId = sessionStorage.getItem('accessSessionFarmId');
        fetchCompanyId = sessionStorage.getItem('accessSessionCompanyId');
        fetchCompanyUuid = sessionStorage.getItem('accessSessionFarm');

        await getDataTasksplanner();
        await getHoliDay();
        await getTipoActividad();

        counter.value++;
        console.log('InitData ejecutado, counter:', counter.value);
    };

    // const resetState = () => {
    //     holiday.value = 'Normal';
    //     tasksPlaner.value = {};
    //     tipoActividad.value = [];
    //     counter.value = 0;
    // };

    const resetState = () => {
        holiday.value = 'Normal';
        tasksPlaner.value = {};
        tipoActividad.value = [];
        counter.value = 0;
    };

    const getDataTasksplanner = async () => {
        const endpoint = `/appmovil/tasksplanner?filter[tasks_of_type_id]=${fetchWorkCenter?.taskoftype?.id}&filter[company_id]=${fetchCompanyId}&filter[farm_id]=${fetchFarmId}`;
        const response = await getRequest(endpoint);
        tasksPlaner.value = response.data?.data[0] || {};
        console.log('tasksPlanner inside getDataTaskPlaner', tasksPlaner.value);
        counter.value++;
        return { ...response, data: tasksPlaner.value };
    };

    const getHoliDay = async () => {
        try {
            const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompanyId}`);
            holiday.value = response.data?.data.length === 0 ? 'Normal' : 'Festivo';
            counter.value++;
        } catch {
            holiday.value = 'Normal';
        }
    };

    const getTipoActividad = async () => {
        const response = await getRequest(`/lists/activityTaskType`);
        tipoActividad.value = response.data?.data || [];
        counter.value++;
    };

    const getDonesWork = async () => {
        try {
            const taskoftype_id = fetchWorkCenter?.taskoftype?.id;
            const response = await getRequest(`/lists/getDoneTypeTasksType?filter[tasks_of_type_id]=${taskoftype_id}`);
            counter.value++;
            return response;
        } catch (e) {
            return { data: [], error: 'Error Get Dones Work', ok: false };
        }
    };

    const getTarif = async (tasksType) => {
        if (!tasksType) return;
        const listFilterType = ['Task', 'HoraExtra'];
        if (listFilterType.includes(tasksType)) {
            const endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter?.taskoftype?.id}&filter[work_type_day]=${holiday.value}&filter[farm_id]=${fetchFarmId}&filter[company_id]=${fetchCompanyId}&filter[packing_type_id]=${tasksPlaner.value?.packing_type?.id}&filter[type_price]=${tasksType}`;
            const response = await getRequest(endpoint);
            counter.value++;
            return response.data?.data[0]?.price_tarif ?? 0;
        }
    };

    const getUsers = async () => {
        const response = await getRequest(`/appmovil/employees?filter[work_center_id]=${fetchWorkCenter?.id}`);
        counter.value++;
        return response;
    };

    // const getShippingsDelivered = async () => {
    //     const response = await getRequest(`/transactions/shipping/shippings`);
    //     counter.value++;
    //     return response;
    // };
    const getShippingsDelivered = async () => {
        console.log('Ejecutando getShippingsDelivered');
        initData();
        try {
            // Ensure tasksPlaner is updated
            if (!tasksPlaner.value?.id) {
                await getDataTasksplanner();
            }

            // Use the updated tasksPlaner data
            const transDev = false;
            const plannerTaskId = tasksPlaner.value?.id || 'No hay'; // Fallback to 18 if not available
            const tasksOfTypeId = fetchWorkCenter?.taskoftype?.id || 'No hay'; // Fallback to 5 if not available
            const farmId = fetchFarmId || 1; // Fallback to 1 if not available

            console.log('plannerTaskId:', plannerTaskId);
            console.log('tasksOfTypeId:', tasksOfTypeId);
            console.log('farmId:', farmId);

            // Construct the endpoint dynamically
            const url = `/appmovil/shippings/voyage_num?trans_dev=false&tasks_of_type_id=${tasksOfTypeId}&planner_task_id=${plannerTaskId}&farm_id=${farmId}`;
            const response = await getRequest(url);

            counter.value++;
            console.log('Response from getShippingsDelivered:', response);
            return response;
        } catch (e) {
            console.error('Error in getShippingsDelivered:', e);
            return { data: [], error: 'Error Get Shippings Delivered', ok: false };
        }
    };

    const getInfoEmployees = async (planner_task_id, task_of_type) => {
        const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=${fetchFarmId}`);
        counter.value++;
        return response;
    };

    const getInfoEmployeesById = async (planner_task_id, task_of_type, employee_id) => {
        const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=${fetchFarmId}&filter[worker_employee_id]=${employee_id}`);
        counter.value++;
        return response;
    };

    const dataInfoUser = async () => {
        const response = await getRequest(`/appmovil/datastart`);
        counter.value++;
        return response;
    };

    const postDailyReport = async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor, packing_type }) => {
        const dataPost = {
            transaction_date_send: tasksPlaner.value?.transaction_date ?? '',
            tasks_of_type_uuid: tasksPlaner.value?.tasks_of_type?.uuid,
            crop_lot_code: loteCode ?? '',
            type_price_task: tasksTypeCode ?? '',
            task_qty: quantity && quantity + '',
            notes_small: notas ?? '',
            price_tarif_task: tarifXCautity + '',
            supervisory_employee_uuid: fetchSupervisorId,
            worker_employee_uuid: userId,
            planner_task_uuid: tasksPlaner.value?.uuid ?? '',
            packing_type_uuid: packing_type,
            farm_uuid: fetchCompanyUuid,
            device_name: 'Web'
        };
        return await postRequest('/transactions/tasks', dataPost);
    };

    return {
        HOLIDAY: holiday,
        TASK_OF_TYPE, // Ahora dinámico
        TASKS_PLANNER: tasksPlaner,
        TIPO_ACTIVIDAD: tipoActividad,
        initData,
        resetState,
        getDonesWork,
        getTarif,
        getDataTasksplanner,
        getHoliDay,
        getTipoActividad,
        getUsers,
        getShippingsDelivered,
        getInfoEmployees,
        getInfoEmployeesById,
        dataInfoUser,
        postDailyReport
    };
}
