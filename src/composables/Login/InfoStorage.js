// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchInfoDataLogged = async () => {
  try {
    const response = await getRequest('/appmovil/datastart');
    console.log('xxxxxxxxxxxxx',response)
    const farm = response.farm_uuid;
    const company = response.company_uuid;
    const employeeName = response.Employee.first_name+' '+response.Employee.lasts_names;
    const employeeUuid = response.Employee.uuid;
    sessionStorage.setItem('accessSessionFarm', farm);
    sessionStorage.setItem('accessSessionCompany', company);
    localStorage.setItem('accesSessionUsers', user);
    localStorage.setItem('accesSessionFarms', farm);
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
