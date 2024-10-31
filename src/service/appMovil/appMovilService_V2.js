import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
export const AppMovilDataService_V2 = {
        async getInfoEmployees(planner_task_id) {
            try {
                const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=4&filter[farm_id]=1`);
                return response;
            }
            catch (error) {
                console.error('Error fetching employees:', error);
                return response;
            }
        },
        async getInfoEmployeesById(planner_task_id,employee_id) {
            try {
                const response = await getRequest(`/appmovil/summary/employees?filter[planner_task_id]=${planner_task_id}&filter[tasks_of_type_id]=4&filter[farm_id]=1&filter[worker_employee_id]=${employee_id}`);
                return response;
            }
            catch (error) {
                console.error('Error fetching employees:', error);
                return response;
            }
        },



};
