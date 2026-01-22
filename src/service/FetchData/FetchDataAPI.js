// Objetivo: Crear un hook para realizar peticiones a la API
import useSettingsAPI from '@/service/FetchData/API_Settings';
import ability from '@/service/ability.js';
import { AbilityBuilder } from '@casl/ability';
import { ref } from 'vue';
export default function useData(locale = 'en') {
    const { pathAPI, APISettings } = useSettingsAPI(locale);
    const token = ref();
    let errorResponseAPI = ref('Error no filled');
    let base = pathAPI().base;
    let api = pathAPI().apiVer;

    // Datos reactivos para compatibilidad con la interfaz antigua
    let dataResponseAPI = ref({});
    let dataResponseListAPI = ref({});
    let dataResponsePermissionsAPI = ref({});
    let statusCode = ref(0);

    token.value = sessionStorage.getItem('accessSessionToken');

    const initializeToken = () => {
        token.value = sessionStorage.getItem('accessSessionToken');
        if (token.value) {
            APISettings.headers.set('Authorization', 'Bearer ' + token.value);
        }
    };

    initializeToken();
    APISettings.headers.set('Content-Type', 'application/json');
    APISettings.headers.set('Access-Control-Allow-Origin', '*');
    APISettings.headers.set('Accept-Language', 'es');
    // APISettings.headers.set('Authorization', 'Bearer ' + token.value);

    async function getRequest(endPoint) {
        initializeToken();

        let responseData = { data: {}, error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        const requestOptions = {
            method: 'GET',
            headers: APISettings.headers
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                responseData.error = response.statusText;
                throw new Error(`Error ${response.status} al obtener datos`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud GET:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function postRequest(endPoint, data) {
        initializeToken();
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        const requestOptions = {
            method: 'POST',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            console.log('requestOptions:', requestOptions.headers);
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                responseData.error = response.statusText;

                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);

                console.error(`Error ${response.status}: ${errorBody}`);
                console.log('response', typeof errorBodyObject, errorBodyObject);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;

                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function putRequest(endPoint, data, id) {
        initializeToken();
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'PUT',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            console.log('Response status:', response.status);
            console.log('Response headers:', [...response.headers]);

            responseData.ok = response.ok;
            if (!response.ok) {
                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function deleteRequest(endPoint, id) {
        initializeToken();
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'DELETE',
            headers: APISettings.headers,
            body: JSON.stringify({})
        };

        try {
            const response = await fetch(baseUrl, requestOptions);

            responseData.ok = response.ok;

            // Maneja las respuestas con contenido o sin contenido
            if (response.status === 204) {
                responseData.data = null; // No hay contenido, data queda como null
            } else {
                responseData.data = await response.json(); // Solo intenta parsear si hay contenido
            }

            if (!response.ok) {
                responseData.error = response.statusText;
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error += ' ' + e.message;
        }
        return responseData;
    }

    async function patchRequest(endPoint, data, id) {
        initializeToken();
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        const requestOptions = {
            method: 'PATCH',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            responseData.ok = response.ok;
            if (!response.ok) {
                const errorBody = await response.text();
                const errorBodyObject = JSON.parse(errorBody);

                console.error(`Error ${response.status}: ${errorBody}`);
                console.log('response', typeof errorBodyObject, errorBodyObject);
                responseData.error += ` ${errorBody}`;
                errorResponseAPI.value = errorBodyObject;

                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = await response.json();
        } catch (e) {
            console.error('Error en la solicitud PATCH:', e.message);
            responseData.error += ' ' + e.message;
            console.log(e);
        }
        return responseData;
    }

    // Método para obtener permisos/abilities e integrar con CASL
    async function getAllResponsePermissionsAPI(endPoint) {
        const response = await getRequest(endPoint);
        if (response.ok && response.data) {
            try {
                const { can, rules } = new AbilityBuilder();
                can(response.data);
                ability.update(rules);
                dataResponsePermissionsAPI.value = response.data;
            } catch (e) {
                console.error('Error actualizando abilities:', e.message);
                response.error = 'Error al procesar permisos: ' + e.message;
            }
        }
        return response;
    }

    // Método para obtener listas (alias de getRequest para compatibilidad)
    async function getAllResponseListAPI(endPoint) {
        const response = await getRequest(endPoint);
        if (response.ok) {
            dataResponseListAPI.value = response.data;
        }
        return response;
    }

    // Método legacy para obtener datos (con compatibilidad)
    async function getAllResponseAPI(endPoint) {
        const response = await getRequest(endPoint);
        if (response.ok) {
            dataResponseAPI.value = response.data;
        }
        statusCode.value = response.ok ? 200 : 400;
        return response;
    }

    // Métodos legacy POST/PUT/DELETE que llenan las refs
    async function postResponseAPI(requestData, endPoint) {
        const response = await postRequest(endPoint, requestData);
        if (response.ok) {
            dataResponseAPI.value = response.data;
        }
        statusCode.value = response.ok ? 200 : 400;
        return response;
    }

    async function putResponseAPI(requestData, endPoint, id) {
        const response = await putRequest(endPoint, requestData, id);
        if (response.ok) {
            dataResponseAPI.value = response.data;
        }
        statusCode.value = response.ok ? 200 : 400;
        return response;
    }

    async function deleteResponseAPI(requestData, endPoint, id) {
        const response = await deleteRequest(endPoint, id);
        if (response.ok) {
            dataResponseAPI.value = response.data;
        }
        statusCode.value = response.ok ? 200 : 400;
        return response;
    }

    function resetDataAPI() {
        dataResponseAPI.value = {};
        dataResponseListAPI.value = {};
        dataResponsePermissionsAPI.value = {};
        statusCode.value = 0;
        errorResponseAPI.value = 'Error no filled';
        token.value = null;
    }

    return {

        getRequest,
        postRequest,
        putRequest,
        deleteRequest,
        patchRequest,
        getAllResponsePermissionsAPI,
        getAllResponseListAPI,
        getAllResponseAPI,
        postResponseAPI,
        putResponseAPI,
        deleteResponseAPI,
        errorResponseAPI,
        dataResponseAPI,
        dataResponseListAPI,
        dataResponsePermissionsAPI,
        dataResponsePermissionsAPI,
        statusCode,
        resetDataAPI
    };
}
