import { ref } from 'vue';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest, postRequest } = useData();
const fetchWorkCenter = ref(JSON.parse(sessionStorage.getItem('accessSessionWorkCenter')));
const fetchSupervisorId = ref(sessionStorage.getItem('accesSessionEmployeeUuid'));
const fetchFarmId = ref(sessionStorage.getItem('accessSessionFarmId'));
const fetchCompannyId = ref(sessionStorage.getItem('accessSessionCompanyId'));
const fetchSupervisorName = ref(sessionStorage.getItem('accessSessionEmployeeName'));
const fetchEmployeeId = ref(sessionStorage.getItem('accesSessionEmployeeUuid'));
const fetchCompannyuuid = ref(sessionStorage.getItem('accessSessionFarm'));
const holiday = ref('Normal');
const tasksPlaner = ref({});
const tipoActividad = ref([]);

export function useAppMovilService() {

    const error = (e) => ({ data: [], error: e, ok: false });

    const initData = async () => {
        await getDataTasksplanner();
        await getHoliDay();
        await getTipoActividad();
    };

    const getDonesWork = async () => {
        try {
            const { taskoftype_id } = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
            const resp = await getRequest(`/lists/getDoneTypeTasksType?filter[tasks_of_type_id]=${taskoftype_id?.id}`);
            return resp;
        } catch (e) {
            return error(e);
        }
    };

    const getTarif = async (tasksType) => {
        if (!tasksType) return;
        const listFilterType = ['Task', 'HoraExtra'];
        try {
            let Endpoint = '';
            if (tasksType && listFilterType.includes(tasksType)) {
                Endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype_id?.id}&filter[work_type_day]=${holiday.value}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}&filter[packing_type_id]=${tasksPlaner.value?.packing_type.id}&filter[type_price]=${tasksType}`;
            }
            const response = await getRequest(Endpoint);
            return response.data?.data[0]?.price_tarif ?? 0;
        } catch (e) {
            console.error('Error:', e);
            return 0;
        }
    };

    const getDataTasksplanner = async () => {
        const response = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype_id.id}&filter[company_id]=${fetchCompannyId.value}&filter[farm_id]=${fetchFarmId.value}`);
        tasksPlaner.value = response.data.data[0];
        return { ...response, data: response.data.data[0] };
    };

    const getUsers = async () => {
        try {
            const resp = await getRequest(`/appmovil/employees?filter[work_center_id]=${fetchWorkCenter.value.id}`);
            return resp;
        } catch (e) {
            return error(e);
        }
    };

    const postDailyReport = async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor }) => {
        const dataPost = {
            transaction_date_send: tasksPlaner.value?.transaction_date ?? '',
            tasks_of_type_uuid: tasksPlaner.value?.tasks_of_type.uuid,
            crop_lot_code: loteCode ?? '',
            type_price_task: tasksTypeCode ?? '',
            task_qty: quantity && quantity + '',
            notes_small: notas ?? '',
            price_tarif_task: tarifXCautity + '',
            supervisory_employee_uuid: fetchSupervisorId.value,
            worker_employee_uuid: userId,
            planner_task_uuid: tasksPlaner.value?.uuid ?? '',
            customer_request_uuid: tasksPlaner.value?.customer_request.uuid,
            product_uuid: tasksPlaner.value?.product.uuid ?? '',
            product_type_uuid: tasksPlaner.value?.product_type.uuid ?? '',
            variant_uuid: tasksPlaner.value?.varieties.uuid ?? '',
            packing_type_uuid: tasksPlaner.value?.packing_type.uuid ?? '',
            device_name: 'Web',
            transdate_sync: null,
            calendar_uuid: null,
            done_of_type_uuid: labor ?? '',
            farm_uuid: fetchCompannyuuid.value
        };
        const restp = await postRequest('/transactions/tasks', dataPost);
        return restp;
    };

    const getTipoActividad = async () => {
        const response = await getRequest(`/lists/activityTaskType`);
        tipoActividad.value = { ...response, data: response.data?.data };
        return tipoActividad.value;
    };

    const getHoliDay = async () => {
        try {
            const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId.value}`);
            holiday.value = response.data.data.length === 0 ? 'Normal' : 'Festivo';
        } catch (e) {
            holiday.value = 'Normal';
        }
    };

    // Exposing the reactive state and methods
    return {
        WORK_CENTER: fetchWorkCenter,
        SUPERVISO_ID: fetchSupervisorId,
        FARM_ID: fetchFarmId,
        COMPANY_ID: fetchCompannyId,
        TASK_OF_TYPE: fetchWorkCenter.value?.taskoftype_id,
        SUPERVISO_NAME: fetchSupervisorName,
        EMPLOYEE_ID: fetchEmployeeId,
        HOLIDAY: holiday,
        LOTES: tasksPlaner,
        TIPO_ACTIVIDAD: tipoActividad,
        initData,
        getDonesWork,
        getTarif,
        getDataTasksplanner,
        getUsers,
        postDailyReport,
        getTipoActividad,
        getHoliDay
    };
}
