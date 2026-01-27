// src/composables/dataService.js

import useData from '@/service/FetchData/FetchDataAPI.js';

const { getRequest } = useData();

export const fetchAbilities = async () => {
    try {
        const response = await getRequest('/abilities');
        return response;
    } catch (error) {
        
        throw error;
    }
};
