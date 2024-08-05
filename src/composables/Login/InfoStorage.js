// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
  try {
    const response = await getRequest('/appmovil/datastart');
    console.log('xxxxxxxxxxxxx',response.data.data.company.uuid)
    const farm = response.data.data.farm.uuid;
    const company = response.data.data.company.uuid;
    const employeeName = response.data.data.employee.first_name+' '+response.data.data.employee.lasts_names;
    const employeeUuid = response.data.data.employee.uuid;
    localStorage.setItem('accesSessionFarms', farm);
    sessionStorage.setItem('accessSessionFarm', farm);
    sessionStorage.setItem('accessSessionCompany', company);
    localStorage.setItem('accesSessionCompanys', company);
    localStorage.setItem('accesSessionEmployeeName', employeeName);
    sessionStorage.setItem('accessSessionEmployeeName', employeeName);
    localStorage.setItem('accesSessionEmployeeUuid', employeeUuid);
    sessionStorage.setItem('accesSessionEmployeeUuid', employeeUuid);
    
    return response; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};
