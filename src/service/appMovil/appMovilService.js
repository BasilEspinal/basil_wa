import useData from '@/composables/DataAPI/FetchDataAPICopy.js';
const { getRequest, postRequest } = useData();

const fetchWorkCenter = await JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
const fetchSupervisorId = sessionStorage.getItem('accesSessionEmployeeUuid');
const fetchFarmId = sessionStorage.getItem('accessSessionFarmId');
const fetchCompannyId = sessionStorage.getItem('accessSessionCompanyId');
const fetchSupervisorName = sessionStorage.getItem('accessSessionEmployeeName');
const fetchEmployeeId = await sessionStorage.getItem('accesSessionEmployeeUuid');
const fetchCompannyuuid = await sessionStorage.getItem('accessSessionFarm');;
let holiday = 'Normal';
let tasksPlaner = [];
let tipoActividad = [];

const error = (e) => ({ data: [], error: e, ok: false });

const appMovilService = {

    WORK_CENTER: fetchWorkCenter,
    SUPERVISO_ID: fetchSupervisorId,
    FARM_ID: fetchFarmId,
    COMPANY_ID: fetchCompannyId,
    TASK_OF_TYPE: fetchWorkCenter?.taskoftype_id,
    SUPERVISO_NAME: fetchSupervisorName,
    EMPLOYEE_ID: fetchEmployeeId,
    HOLIDAY: holiday,
    LOTES: [...tasksPlaner],
    TIPO_ACTIVIDAD: tipoActividad,

    initData: async () => {
        await getDataTasksplanner();
        await getHoliDay();
        await getTipoActividad();
    },

    getDonesWork: async () => {
        try {
            const { taskoftype_id } = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter'));
            const resp = await getRequest(`/lists/getDoneTypeTasksType?filter[tasks_of_type_id]=${taskoftype_id?.id}`);
            return resp;
        } catch (e) {
            return error(e);
        }
    },

    getTarif: async (tasksType) => {
        if (!tasksType) return;
        const listFilterType = ['Task', 'HoraExtra'];
        try {
            let Endpoint = '';
            if (tasksType && listFilterType.includes(tasksType)) {
                Endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter?.taskoftype_id?.id}&filter[work_type_day]=${holiday}&filter[farm_id]=${fetchFarmId}&filter[company_id]=${fetchCompannyId}&filter[packing_type_id]=${tasksPlaner?.packing_type.id}&filter[type_price]=${tasksType}`;
            }
            // /appmovil/donetarif  ?filter[tasks_of_type_id]=4 & filter[work_type_day]=Normal & filter[farm_id]=1 & filter[company_id]=1 & filter[work_type_tarif]=Individual & filter[done_of_type_id]=1
            const response = await getRequest(Endpoint);
            return response.data?.data[0]?.price_tarif ?? 0;
        } catch (e) {
            return 0;
        }
    },

    getDataTasksplanner: async () => {
        const response = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${fetchWorkCenter?.taskoftype_id.id}&filter[company_id]=${fetchCompannyId}&filter[farm_id]=${fetchFarmId}`);
        tasksPlaner = response.data.data[0];
        //console.log('aver: ', response.data.data[0].crop_lots);
        return response;
    },

    getUsers: async () => {
        try {
            const resp = await getRequest(`/appmovil/employees?filter[work_center_id]=${fetchWorkCenter.id}`)
            return resp;
        } catch (e) {
            return error(e);
        }
    },

    postDailyReport: async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor }) => {
        const dataPost = {
            transaction_date_send: tasksPlaner?.transaction_date ?? '',
            tasks_of_type_uuid: tasksPlaner?.tasks_of_type.uuid,
            crop_lot_code: loteCode ?? '',
            type_price_task: tasksTypeCode ?? '',
            task_qty: quantity && quantity + '',
            notes_small: notas ?? '',
            price_tarif_task: tarifXCautity + '',
            supervisory_employee_uuid: fetchSupervisorId,
            worker_employee_uuid: userId,
            planner_task_uuid: tasksPlaner?.uuid ?? '',
            customer_request_uuid: tasksPlaner?.customer_request.uuid,
            product_uuid: tasksPlaner?.product.uuid ?? '',
            product_type_uuid: tasksPlaner?.product_type.uuid ?? '',
            variant_uuid: tasksPlaner?.varieties.uuid ?? '',
            packing_type_uuid: tasksPlaner?.packing_type.uuid ?? '',
            device_name: 'Web',
            transdate_sync: null,
            calendar_uuid: null,
            done_of_type_uuid: labor ?? '',
            farm_uuid: fetchCompannyuuid
        };
        const restp = await postRequest('/transactions/tasks', dataPost);
        return restp;
    },

    getTipoActividad: async () => {
        const response = await getRequest(`/lists/activityTaskType`);
        tipoActividad = response;
        return tipoActividad;
    }

};

const getHoliDay = async () => {
    try {
        const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId}`);
        holiday = response.data.data.length === 0 ? 'Normal' : 'Festivo';
    } catch (e) {
        holiday = 'Normal';
    }
};

const getDataTasksplanner = async () => {
    try {
        const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId}`);
        holiday = response.data.data.length === 0 ? 'Normal' : 'Festivo';
    } catch (e) {
        holiday = 'Normal';
    }
};

const getTipoActividad = async () => {
    const response = await getRequest(`/lists/activityTaskType`);
    tipoActividad = response;
};

export default appMovilService;