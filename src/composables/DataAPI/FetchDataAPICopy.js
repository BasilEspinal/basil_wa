import useSettingsAPI from '@/composables/DataAPI/settings_API';
export default function useData() {
    const { pathAPI, APISettings } = useSettingsAPI();
    let base = pathAPI().base;
    let api = pathAPI().apiVer;
    const token = sessionStorage.getItem('accessSessionToken');
    APISettings.headers.set('Content-Type', 'application/json');
    APISettings.headers.set('Access-Control-Allow-Origin', '*');
    APISettings.headers.set('Authorization', 'Bearer ' + token);

    async function getRequest(endPoint) {
        let responseData = { data: {}, error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        let resp;
        const requestOptions = {
            method: 'GET',
            headers: APISettings.headers
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            resp = await response.json();
            responseData.ok = response.ok;
            if (!response.ok) {
                throw new Error(`Error ${response.status} al obtener datos`);
            }
            responseData.data = resp;
        } catch (e) {
            console.error('Error en la solicitud GET:', e.message);
            responseData.error = resp.message ?? e.message; 
        }
        return responseData;
    }

    async function postRequest(endPoint, data) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}`;
        let resp;
        const requestOptions = {
            method: 'POST',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            resp = await response.json();
            responseData.ok = response.ok;
            if (!response.ok) {
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = resp;
        } catch (e) {
            console.error('Error en la solicitud POST:', e.message);
            responseData.error = resp.message ?? e.message; 
        }
        return responseData;
    }

    async function putRequest(endPoint,data, id) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        let resp;
        const requestOptions = {
            method: 'PUT',
            headers: APISettings.headers,
            body: JSON.stringify(data)
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            resp = await response.json();
            responseData.ok = response.ok;
            if (!response.ok) {
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = resp;
        } catch (e) {
            console.error('Error en la solicitud PUT:', e.message);
            responseData.error = resp.message ?? e.message; 
        }
        return responseData;
    }

    async function deleteRequest(endPoint,  id) {
        let responseData = { data: [], error: '', ok: false };
        let baseUrl = `${base}${api}${endPoint}/${id}`;
        let resp;
        const requestOptions = {
            method: 'DELETE',
            headers: APISettings.headers,
            body: JSON.stringify({})
        };
        try {
            const response = await fetch(baseUrl, requestOptions);
            resp = await response.json();
            responseData.ok = response.ok;
            if (!response.ok) {
                throw new Error(`Error ${response.status} al enviar datos.`);
            }
            responseData.data = resp;
        } catch (e) {
            console.error('Error en la solicitud DELETE:', e.message);
            responseData.error = resp.message ?? e.message; 
        }
        return responseData;
    }

    return {
        getRequest,
        postRequest,
        putRequest,
        deleteRequest
    };
}
