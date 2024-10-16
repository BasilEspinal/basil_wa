// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
    try {
        const response = await getRequest('/appmovil/datastart');
        console.log('response :', response);
        const { farm, company, employee, user_email } = response.data.data;
        const employeeName = employee.full_name; 
        sessionStorage.setItem('accessSessionEmail', user_email);
        sessionStorage.setItem('accessSessionEmail', user_email);
        localStorage.setItem('accesSessionEmail', user_email);
        localStorage.setItem('accesSessionFarms', farm.uuid);
        sessionStorage.setItem('accessSessionFarm', farm.uuid);
        localStorage.setItem('accessSessionFarmId', farm.id);
        sessionStorage.setItem('accessSessionFarmId', farm.id);
        sessionStorage.setItem('accessSessionCompany', company.uuid);
        localStorage.setItem('accesSessionCompany', company.uuid);
        localStorage.setItem('accessSessionCompanyId', company.id);
        sessionStorage.setItem('accessSessionCompanyId', company.id);
        localStorage.setItem('accesSessionEmployeeName', employeeName);
        sessionStorage.setItem('accessSessionEmployeeName', employeeName);
        localStorage.setItem('accesSessionEmployeeUuid', employee.uuid);
        sessionStorage.setItem('accesSessionEmployeeUuid', employee.uuid);
        localStorage.setItem('accessSessionWorkCenter', JSON.stringify(employee.workCenter));
        sessionStorage.setItem('accessSessionWorkCenter', JSON.stringify(employee.workCenter));

        return response;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
