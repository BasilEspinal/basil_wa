// src/composables/dataService.js

import useData from '@/service/FetchData/FetchDataAPI.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
    try {
        const response = await getRequest('/appmovil/datastart');
        
        
        const meta = response.data.meta;
        const { farm, company, employee, user_email } = response.data.data;
        const employeeName = employee.full_name;
        sessionStorage.setItem('accessSessionEmail', user_email);
        sessionStorage.setItem('accessSessionEmail', user_email);
        localStorage.setItem('accesSessionEmail', user_email);
        localStorage.setItem('accesSessionFarms', farm.uuid);
        sessionStorage.setItem('accessSessionFarm', farm.uuid);
        localStorage.setItem('accessSessionFarmId', farm.id);
        sessionStorage.setItem('accessSessionFarmId', farm.id);
        localStorage.setItem('accessSessionFarmName', farm.name);
        sessionStorage.setItem('accessSessionFarmName', farm.name);

        sessionStorage.setItem('accessSessionCompany', company.uuid);
        localStorage.setItem('accesSessionCompany', company.uuid);
        localStorage.setItem('accessSessionCompanyId', company.id);
        sessionStorage.setItem('accessSessionCompanyId', company.id);
        localStorage.setItem('accessSessionCompanyName', company.name);
        sessionStorage.setItem('accessSessionCompanyName', company.name);
        localStorage.setItem('accesSessionEmployeeName', employeeName);
        sessionStorage.setItem('accessSessionEmployeeName', employeeName);
        localStorage.setItem('accesSessionEmployeeUuid', employee.uuid);
        sessionStorage.setItem('accesSessionEmployeeUuid', employee.uuid);
        localStorage.setItem('accessSessionWorkCenter', JSON.stringify(employee.workCenter));
        sessionStorage.setItem('accessSessionWorkCenter', JSON.stringify(employee.workCenter));
        // localStorage.setItem('accessSessionDate', meta.server_date_answer);
        sessionStorage.setItem('accessSessionDate', meta.server_date_answer);

        return response;
    } catch (error) {
        
        throw error;
    }
};
