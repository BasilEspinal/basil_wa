import useData from '@/service/FetchData/FetchDataAPI.js';
const { getRequest, postRequest, putRequest, deleteRequest,errorResponseAPI } = useData();
export const InitialDataService = {
    
    sizeData(){
        
        return { label: 'Normal', value: 'normal' }
    },
    sizeOptions() {
    return [
        { label: 'Small', value: 'small', class: 'sm' },
        { label: 'Normal', value: 'normal' },
        { label: 'Large', value: 'large', class: 'lg' }
        ]
    },
        getSize() {
            return Promise.resolve(this.sizeData());
        },

        getSizeOptions() {
            return Promise.resolve(this.sizeOptions());
        },
    
        async getBranches() {
            try {
                const response = await getRequest('/farms');
                return response;
            } catch (error) {
                console.error('Error fetching branches:', error);
                return response;; 
            }
        },

        async getCompanies() {
            try {
                const response = await getRequest('/companies');
                return response;
            } catch (error) {
                console.error('Error fetching company:', error);
                return errorResponseAPI(error); 
            }
        },

        async getDatastart() {
            try {
                const response =  await getRequest(`/appmovil/datastart`);
                return response;
            } catch (error) {
                console.error('Error fetching company:', error);
                return errorResponseAPI(error); 
            }
        },

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    },

    async getTasksPlanner(value) {
        try {
            
            const employeeId = value?.data?.data?.employee?.workCenter?.taskoftype?.id;
            const companyId = value?.data?.data?.company?.id;
            const farmId = value?.data?.data?.farm?.id;

            const response = await getRequest(`/appmovil/tasksplanner?filter[tasks_of_type_id]=${employeeId}&filter[company_id]=${companyId}&filter[farm_id]=${farmId}`);
            return response;
        } catch (error) {
            console.error('Error fetching tasks planner:', error);
            return errorResponseAPI(error);
        }
    },



    async getVehicles() {
        try {
            const response =  await getRequest(`/vehicles`);
            return response;
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return errorResponseAPI(error); 
        }
    },


    async getWorkCenters() {
        try {
            const response =  await getRequest(`/work_centers`);
            return response;
        } catch (error) {
            console.error('Error fetching work centers:', error);
            return errorResponseAPI(error); 
        }
    },

    async getJobTypes() {
        try {
            const response =  await getRequest(`/job_types`);
            return response;
        } catch (error) {
            console.error('Error fetching job types:', error);
            return errorResponseAPI(error); 
        }
    },

    
    async getPaymentTypes() {
        try {
            const response =  await getRequest(`/payment_types`);
            return response;
        } catch (error) {
            console.error('Error fetching payment types:', error);
            return errorResponseAPI(error); 
        }
    },

    async getEmployeesWorkCenter(value) {

        try {
            const response =  await getRequest(`/appmovil/employees?filter[work_center_id]=${value}`);
            return response;
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            return errorResponseAPI(error); 
        }


    },
    async getDocumentsType() {
        try {
            const response =  await getRequest(`/lists/documentType`);
            return response;
        } catch (error) {
            console.error('Error fetching document types', error);
            return errorResponseAPI(error); 
        }
    },
    async getGenderTypes() {
        try {
            const response =  await getRequest(`/lists/genderType`);
            return response;
        } catch (error) {
            console.error('Error fetching gender)', error);
            return errorResponseAPI(error);
        }
    },

    async getTaskOfType() {
        try {
            const response =  await getRequest(`/task_of_types`);
            return response;
        } catch (error) {
            console.error('Error fetching task of types:', error);
            return errorResponseAPI(error); 
        }
    },

    async getDoneTypes() {
        try {
            const response =  await getRequest(`/done_types`);
            return response;
        } catch (error) {
            console.error('Error fetching task of types:', error);
            return errorResponseAPI(error); 
        }
    },


    async getTaskTypeTarif() {
        try {
            const response = await getRequest('/lists/TaskTypeTarif');

            return response;
            
        } catch (error) {
            console.error('Error fetching task type tarif:', error);
            return errorResponseAPI(error);
        }
    },

    async getPackingTypes() {
        try {
            const response = await getRequest('/packing_types');
           return response;
        } catch (error) {
            console.error('Error fetching packing types:', error);
            return errorResponseAPI(error);
        }
    },

    async getWorkTypeDay() {
        try {
            const response = await getRequest('/lists/workTypeDay');
            return response;
        } catch (error) {
            console.error('Error fetching work type day:', error);
            return errorResponseAPI(error);
        }
    },
    async getCalculateWorkType() {
        try {
            const response = await getRequest('/lists/calculateWorkType');
            return response;
        } catch (error) {
            console.error('Error fetching calculate work type:', error);
            return errorResponseAPI(error);
        }
    },

    async getWorkTypeTarif() {
        try {
            const response = await getRequest('/lists/workTypeTarif');
            return response;
        } catch (error) {
            console.error('Error fetching work type tarif:', error);
            return errorResponseAPI(error);
        }
    }




};
