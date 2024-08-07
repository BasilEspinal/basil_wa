// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
  try {
    const response = await getRequest('/appmovil/datastart');
    const farm = response.data.data.farm.uuid;
    const farmId = response.data.data.farm.id;
    const company = response.data.data.company.uuid;
    const companyID = response.data.data.company.id;
    const employeeName = response.data.data.employee.first_name+' '+response.data.data.employee.lasts_names;
    const employeeUuid = response.data.data.employee.uuid;
    const emailUser = response.data.data.user_email;
    const workCenter = response.data.data.employee.workCenter;
    console.log('workCenter', workCenter);
    sessionStorage.setItem('accessSessionEmail', emailUser);
    localStorage.setItem('accesSessionEmail', emailUser);
    localStorage.setItem('accesSessionFarms', farm);
    sessionStorage.setItem('accessSessionFarm', farm);
    localStorage.setItem('accessSessionFarmId', farmId);
    sessionStorage.setItem('accessSessionFarmId', farmId);
    sessionStorage.setItem('accessSessionCompany', company);
    localStorage.setItem('accesSessionCompany', company);
    localStorage.setItem('accessSessionCompanyId', companyID);
    sessionStorage.setItem('accessSessionCompanyId', companyID);
    localStorage.setItem('accesSessionEmployeeName', employeeName);
    sessionStorage.setItem('accessSessionEmployeeName', employeeName);
    localStorage.setItem('accesSessionEmployeeUuid', employeeUuid);
    sessionStorage.setItem('accesSessionEmployeeUuid', employeeUuid);
    localStorage.setItem('accessSessionWorkCenter', JSON.stringify(workCenter));
    sessionStorage.setItem('accessSessionWorkCenter', JSON.stringify(workCenter));
    
    
    return response; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};
