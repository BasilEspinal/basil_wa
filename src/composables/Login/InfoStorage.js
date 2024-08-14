// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
    try {
        const response = await getRequest('/appmovil/datastart');
        console.log('response :', response);
        const { farm, company, employee, user_email } = response.data.data;
        const employeeName = employee.first_name + ' ' + employee.lasts_names;
        //const farm = response.data.data.farm.uuid;
        //const farmId = response.data.data.farm.id;
        //const company = response.data.data.company.uuid;
        //const companyID = response.data.data.company.id;
        //const employeeUuid = response.data.data.employee.uuid;
        //const emailUser = response.data.data.user_email;
        //const workCenter = response.data.data.employee.workCenter;
        console.log('employeeName', employeeName);
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
