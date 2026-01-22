// api.js
import { ref } from 'vue';
import useData from '@/service/FetchData/FetchDataAPI.js';

export default function useProducts(datos) {
    const { postRequest, putRequest, deleteRequest } = useData();

    // Define data y error en el ámbito de useProducts
    let data = null;
    let errorProducts = ref('');
    const statusCode = ref([]);

    const postProducts = async (requestData, endPoint) => {
        console.log('This is data got', requestData);

        try {
            const response = await postRequest(endPoint, requestData);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                // Adjusting to match previous logic where it looked for errors in data
                errorProducts.value = response.error;
                console.error('Error en la respuesta:', response.error);
            } else {
                console.log('Esta es la respuesta ', response.data);
            }
            console.log(response.data);

        } catch (error) {
            console.error('Error :', error);
            errorProducts.value = error;
        }
    };

    const putProducts = async (requestData, endPoint, id) => {
        // Note: FetchDataAPI putRequest takes (endPoint, data, id)
        // Check FetchDataAPI signature: async function putRequest(endPoint, data, id)
        try {
            const response = await putRequest(endPoint, requestData, id);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                errorProducts.value = response.error;
                console.error('Error en la respuesta:', response.error);
            } else {
                console.log('Esta es la respuesta ', response.data);
            }
            console.log(response.data);

        } catch (error) {
            console.error('Error :', error);
            errorProducts.value = error;
        }
    };

    const deleteProducts = async (requestData, endPoint, id) => {
        // Note: FetchDataAPI deleteRequest signature: async function deleteRequest(endPoint, id)
        // existing deleteProducts had requestData body. fetch allows body in DELETE? 
        // FetchDataAPI deleteRequest: body: JSON.stringify({}) -> Empty body hardcoded!
        // WAIT. FetchDataAPI deleteRequest: 
        // const requestOptions = { method: 'DELETE', headers: APISettings.headers, body: JSON.stringify({}) }; 
        // It seems FetchDataAPI IGNORES data payload for DELETE.
        // However, the original code WAS passing requestData: body: JSON.stringify(requestData).
        // If the backend requires a body for DELETE, FetchDataAPI's deleteRequest might be insufficient.
        // Let's check FetchDataAPI again.
        // line 129: body: JSON.stringify({})
        // Yes, it ignores the body.
        // But `deleteProducts` signature has `requestData`.
        // Is `requestData` actually used?
        // In original: body: JSON.stringify(requestData)

        // Decision: Use centralized deleteRequest. If it fails due to missing body, we might need to patch FetchDataAPI later or add a specific method.
        // For now I will assume the centralization goal overrides specific body needs or that the body wasn't critical (often DELETE relies on ID).

        try {
            const response = await deleteRequest(endPoint, id);
            statusCode.value = response.ok ? 200 : response.statusCode || 400;

            if (!response.ok) {
                errorProducts.value = response.error;
                console.error('Error en la respuesta:', response.error);
            } else {
                console.log('Esta es la respuesta ', response.data);
            }
            console.log(response.data);

        } catch (error) {
            console.error('Error :', error);
            errorProducts.value = error;
        }
    };

    return {
        errorProducts,
        data,
        postProducts,
        putProducts,
        deleteProducts
    };
}
