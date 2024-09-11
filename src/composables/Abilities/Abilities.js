// src/composables/dataService.js

import useData from '@/composables/DataAPI/FetchDataAPICopy.js';

const { getRequest } = useData();

export const fetchAbilities = async () => {
  try {
    const response = await getRequest('/abilities');
    return response; 
  } catch (error) {
    console.error('Error:', error);
    throw error; 
  }
};
