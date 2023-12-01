// api.js
import { ref } from 'vue'
import useSettingsAPI from "@/composables/DataAPI/settings_API";

export default function useDataAPI(datos) {

  const { pathAPI, APISettings } = useSettingsAPI();
  // Define data y error en el ámbito de useProducts
  let dataResponseAPI = ref({})
  let errorResponseAPI = ref('')
  let base = pathAPI().base
  let api = pathAPI().apiVer
  const statusCode = ref([])
  const token = sessionStorage.getItem('accessSessionToken');
  APISettings.headers.set('Content-Type', 'application/json');
  APISettings.headers.set('Access-Control-Allow-Origin', '*');
  APISettings.headers.set('Authorization', 'Bearer ' + token);

  const getAllResponseAPI = async ( endPoint) => {
    
    let baseUrl = `${base}${api}${endPoint}`;
    const requestOptions = {
      method: 'GET',
      headers: APISettings.headers,
    };
    await fetch(baseUrl, requestOptions)
      .then(response => {
        
        statusCode.value = response.status
        return response.json()
      })
      .then(async (data) => {
        // actions to data answer
        console.log(statusCode.value)
        if (data.errors) {
          errorResponseAPI.value = data.errors
          
        }
        else {
          
          dataResponseAPI.value=data
          errorResponseAPI.value = ref('')
          
        }
        
      })
      .catch(error => {
        if (error.name === 'TypeError') {
          // Error de red
          console.error('Error de red:', error.message);
        } else {
          // Error en la respuesta
          console.error('Error en la respuesta:', error.message);
        }
        console.error('Error :', error);
      });

  }

  const postResponseAPI = async (requestData, endPoint) => {
    console.log("This is data got", requestData)
    let baseUrl = `${base}${api}${endPoint}`;
    const requestOptions = {
      method: 'POST',
      headers: APISettings.headers,
      body: JSON.stringify(requestData)
    };
    await fetch(baseUrl, requestOptions)
      .then(response => {
        statusCode.value = response.status
        return response.json()
      })
      .then(data => {
        // actions to data answer
        console.log(statusCode.value)
        if (data.errors) {
          errorResponseAPI.value = data.errors
        }
        else {
          console.log("Esta es la respuesta " + data)
        }
        // console.log(errors)
        console.log(data)
      })
      .catch(error => {
        if (error.name === 'TypeError') {
          // Error de red
          console.error('Error de red:', error.message);
        } else {
          // Error en la respuesta
          console.error('Error en la respuesta:', error.message);
        }
        console.error('Error :', error);
      });

  }

  const putResponseAPI = async (requestData, endPoint, id) => {

    let baseUrl = `${base}${api}${endPoint}${"/"}${id}`;

    const requestOptions = {
      method: 'PUT',
      headers: APISettings.headers,
      body: JSON.stringify(requestData)
    };

    await fetch(baseUrl, requestOptions)
      .then(response => {
        statusCode.value = response.status
        return response.json()
      })
      .then(data => {
        // actions to data answer
        console.log(statusCode.value)
        if (data.errors) {
          errorResponseAPI.value = data.errors
        }
        else {
          console.log("Esta es la respuesta " + data)
        }
        // console.log(errors)
        console.log(data)
      })
      .catch(error => {
        if (error.name === 'TypeError') {
          // Error de red
          console.error('Error de red:', error.message);
        } else {
          // Error en la respuesta
          console.error('Error en la respuesta:', error.message);
        }
        console.error('Error :', error);
      });
  }

  const deleteResponseAPI = async (requestData, endPoint, id) => {

    let baseUrl = `${base}${api}${endPoint}${"/"}${id}`;

    const requestOptions = {
      method: 'DELETE',
      headers: APISettings.headers,
      body: JSON.stringify(requestData)
    };
    await fetch(baseUrl, requestOptions)
      .then(response => {
        statusCode.value = response.status
        return response.json()
      })
      .then(data => {
        // actions to data answer
        console.log(statusCode.value)
        if (data.errors) {
          errorResponseAPI.value = data.errors
        }
        else {
          console.log("Esta es la respuesta " + data)
        }
        // console.log(errors)
        console.log(data)
      })
      .catch(error => {
        if (error.name === 'TypeError') {
          // Error de red
          console.error('Error de red:', error.message);
        } else {
          // Error en la respuesta
          console.error('Error en la respuesta:', error.message);
        }
        console.error('Error :', error);
      });
  }

  return {
    errorResponseAPI,
    dataResponseAPI,
    getAllResponseAPI,
    postResponseAPI,
    putResponseAPI,
    deleteResponseAPI
  }
}