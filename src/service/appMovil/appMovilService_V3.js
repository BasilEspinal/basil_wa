import { ref } from 'vue';
import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest, postRequest } = useData();
const fetchWorkCenter = ref(JSON.parse(sessionStorage.getItem('accessSessionWorkCenter')));
const fetchSupervisorId = ref(sessionStorage.getItem('accesSessionEmployeeUuid'));
const fetchFarmId = ref(sessionStorage.getItem('accessSessionFarmId'));
const fetchCompannyId = ref(sessionStorage.getItem('accessSessionCompanyId'));
const fetchCompannyuuid = ref(sessionStorage.getItem('accessSessionFarm'));
const holiday = ref('Normal');
const tasksPlaner = ref({});
const tipoActividad = ref([]);
const counter = ref(0);

export function useAppMovilService() {

    const error = (e) => ({ data: [], error: e, ok: false });
    
    const initData = async () => {
        await getDataTasksplanner();
        await getHoliDay();
        await getTipoActividad();
        counter.value++;
        console.log('counter', counter.value);
    };
    const dataInfoUser = async (uuid) => {
        try {
            const response = await getRequest(`/appmovil/datastart`);
            console.log('Ejecutando dataInfo User');
            return response;
            counter.value++;
            console.log('counter', counter.value);
            
        }
        catch (e) {
            return error('Error dataInfo User:', e);
        }
    }

    const getTarifOfTasksDoneAppMob = async (task_of_type_id,work_type_day,work_type_tarif,done_of_type_id) => {
        try {
            const response = await getRequest(`/appmovil/donetarif?filter[tasks_of_type_id]=${task_of_type_id}&filter[work_type_day]=${work_type_day}&filter[work_type_tarif]=${work_type_tarif}&filter[done_of_type_id]=${done_of_type_id}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}`);
            
            counter.value++;
            console.log('counter', counter.value);
            return response;
        } catch (e) {
            return error('Error Get Tarif Of Tasks Done AppMob:', e);
        }
    };

    const getTarifOfWorks = async ()=>{
        try {
            const response = await getRequest(`/tarif_of_works`);
            counter.value++;
            console.log('counter', counter.value);
            return response;
        } catch (e) {
            return error('Error Get Tarif Of Works:', e);
        }
    }

    const getDonesWork = async () => {
        try {
            
            const  taskoftype_id  = JSON.parse(sessionStorage.getItem('accessSessionWorkCenter')).taskoftype.id
            
            const resp = await getRequest(`/lists/getDoneTypeTasksType?filter[tasks_of_type_id]=${taskoftype_id}`);
            console.log('ejeuctando getDonesWork');
            counter.value++;
            console.log('counter', counter.value);
            return resp;
        } catch (e) {
            return error('Error Get Dones Work:', e);
        }
    };

    const getTarif = async (tasksType) => {
        if (!tasksType) return;
        const listFilterType = ['Task', 'HoraExtra'];
        try {
            let Endpoint = '';
            if (tasksType && listFilterType.includes(tasksType)) {
                Endpoint = `/appmovil/taskstarif?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype?.id}&filter[work_type_day]=${holiday.value}&filter[farm_id]=${fetchFarmId.value}&filter[company_id]=${fetchCompannyId.value}&filter[packing_type_id]=${tasksPlaner.value?.packing_type.id}&filter[type_price]=${tasksType}`;
            }              // /appmovil/taskstarif?filter[tasks_of_type_id]=4                                       &filter[work_type_day]=Normal         &filter[farm_id]= 1                   &filter[company_id]=1                       &filter[packing_type_id]=1                                    &filter[type_price]=Task
            const response = await getRequest(Endpoint);
            counter.value++;
            console.log('counter', counter.value);


            return response.data?.data[0]?.price_tarif ?? 0;
        } catch (e) {
            console.error('Error get tarif ', e);
            return 0;
        }
    };

    const getDataTasksplanner = async () => {
        console.log('Ejecutando getDataTasksplanner');
        const fetchWorkCenter = ref(JSON.parse(sessionStorage.getItem('accessSessionWorkCenter')));
        const endpoint=ref((`/appmovil/tasksplanner?filter[tasks_of_type_id]=${fetchWorkCenter.value?.taskoftype.id}&filter[company_id]=${fetchCompannyId.value}&filter[farm_id]=${fetchFarmId.value}`));
        const response = await getRequest(endpoint.value);
        tasksPlaner.value = response.data.data[0];
        counter.value++;
        console.log('counter', counter.value);
        return { ...response, data: response.data.data[0] };
        
    };

    const getUsers = async () => {
        try {
            console.log('Ejecutando getUsers');
            const resp = await getRequest(`/appmovil/employees?filter[work_center_id]=${fetchWorkCenter.value.id}`);
            counter.value++;
            console.log('counter', counter.value);
            return resp;

        } catch (e) {
            return error('Error Get Users:', e);
        }
    };

    const postDailyReport = async ({ loteCode, tasksTypeCode, quantity, notas, tarifXCautity, userId, labor,packing_type }) => {
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
            // packing_type_uuid: tasksPlaner.value?.packing_type.uuid ?? '',
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

    const getTipoActividad = async () => {
        console.log('Ejecutando getTipoActividad');
        const response = await getRequest(`/lists/activityTaskType`);
        tipoActividad.value = { ...response, data: response.data?.data };
        counter.value++;
        console.log('counter', counter.value);
        return tipoActividad.value;
    };

    const getHoliDay = async () => {
        console.log('Ejecutando getHoliDay');
        try {
            const response = await getRequest(`/appmovil/calendars?filter[company_id]=${fetchCompannyId.value}`);
            holiday.value = response.data.data.length === 0 ? 'Normal' : 'Festivo';
            counter.value++;
            console.log('counter', counter.value);
        } catch (e) {
            holiday.value = 'Normal';
            return error('Error Get Holiday:', e);
        }
    };

    const getShippingsDelivered = async () => {
        console.log('Ejecutando getShippingsDelivered');
        try {
            const response = await getRequest(`/transactions/shipping/shippings`);
            console.log(response)
            counter.value++;
            console.log('counter', counter.value);
            return response;
        } catch (e) {
            return error('Error Get Shippings Delivered:', e);
        }
    };

    const getInfoEmployees=async (planner_task_id,task_of_type) => {
        
        try {
            
            const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=1`);
            console.log('Ejecutando getInfoEmployees');
            counter.value++;
            console.log('counter', counter.value);
            return response;
        }
        catch (error) {
            console.error('Error fetching employees:', error);
            return response;
        }
    };
    const getInfoEmployeesById= async(planner_task_id,task_of_type,employee_id)=> {
        try {
            console.log('Ejecutando getInfoEmployeesById');
            // console.log('planner_task_id',planner_task_id);
            // console.log('employee_id',employee_id);
            const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=${task_of_type}&filter[farm_id]=1&filter[worker_employee_id]=${employee_id}`);
            counter.value++;
            console.log('counter', counter.value);
            return response;
        }
        catch (error) {
            console.error('Error fetching employees:', error);
            return response;
        }
    };

    // Exposing the reactive state and methods
    return {
        // WORK_CENTER: fetchWorkCenter,
        // SUPERVISO_ID: fetchSupervisorId,
        // FARM_ID: fetchFarmId,
        // COMPANY_ID: fetchCompannyId,
        TASK_OF_TYPE: fetchWorkCenter.value?.taskoftype,
        fetchWorkCenter,
        // SUPERVISOR_NAME: fetchSupervisorName,
        // EMPLOYEE_ID: fetchEmployeeId,
        HOLIDAY: holiday,
        //LOTES: tasksPlaner,
        // TIPO_ACTIVIDAD: tipoActividad,
        initData,
        getDonesWork,
        getTarif,
        getDataTasksplanner,
        getUsers,
        postDailyReport,
        getTipoActividad,
        getHoliDay,
        getShippingsDelivered,
        dataInfoUser,
        getInfoEmployees,
        getInfoEmployeesById,
        getTarifOfTasksDoneAppMob,
        getTarifOfWorks,
        error
    };
}
