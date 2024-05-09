export default class AppMovilCortaService {
    constructor(fetchDataFunction) {
        this.fetchDataFunction = fetchDataFunction;
    }
    // planeacion para el dia,  corta, compañia, y finca
    
    // /appmovil/tasksplanner ? filter[tasks_of_type_id] = 4 & filter[company_id]=1 & filter[farm_id]=1
    async getPlannerTask(taskId,companyId,farmId) {
        return this.fetchDataFunction(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${taskId}&filter[company_id]=${companyId}&filter[farm_id]=${farmId}`);
    }

//    buscar empleados de un centro de trabajo  corta
    // /appmovil/employees ? filter[work_center_id] = 2
    async getEmployeesWorkCenter(workcenterId) {
        return this.fetchDataFunction(`/appmovil/employees?filter[work_center_id]=${workcenterId}`);
    }

    // buscar tarifas tarea corta y tipo de empaque icopor
    // /appmovil/taskstarif ? filter[tasks_of_type_id] = 4 & filter[packing_type_id]=1
    async getTasksTarif(taskId, packingTypeId) {
        return this.fetchDataFunction(`/appmovil/taskstarif?filter[tasks_of_type_id]=${taskId}&filter[packing_type_id]=${packingTypeId}`);
    }

    // calendarios festivos,  si no esta en este,  es dia normal
    // /appmovil/calendars ? filter[company_id] = 1 & filter[farm_id]=1
    async getCalendaries(workcenterId) {
        return this.fetchDataFunction(`/appmovil/employees?filter[work_center_id]=${workcenterId}`);
    }
}