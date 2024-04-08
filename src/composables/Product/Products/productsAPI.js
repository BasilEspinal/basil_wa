// api.js
import { ref } from 'vue'
import  useSettingsAPI from "@/composables/settings_API";

export default function useProducts(datos) {

  const { pathAPI, APISettings } = useSettingsAPI();
  // Define data y error en el ámbito de useProducts
  let data = null;
  let errorProducts = ref('')
  let base = pathAPI().base
  let api = pathAPI().apiVer
  const statusCode = ref([])
  const token = sessionStorage.getItem('accessSessionToken');
  APISettings.headers.set('Content-Type', 'application/json');
  APISettings.headers.set('Access-Control-Allow-Origin', '*');
  APISettings.headers.set('Authorization', 'Bearer ' + token);

  const postProducts = async (requestData, endPoint) => {
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
          errorProducts.value = data.errors
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

  const putProducts = async (requestData, endPoint, id) => {

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
          errorProducts.value = data.errors
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

  const deleteProducts = async (requestData, endPoint, id) => {

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
          errorProducts.value = data.errors
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
    errorProducts,
    data,
    postProducts,
    putProducts,
    deleteProducts
  }
}
