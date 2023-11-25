// api.js
import { APISettings } from "../settings_API";
import { ref } from 'vue'
export default function useUnitTypes(datos) {
  // Define data y error en el ámbito de useProducts
  let data = null;
  let error = null;
  let dataUnitTypes = null;
  let errorUnitTypes = ref('')
  //let base = `http://agroonline_end.test`;  //local
  let base = 'http://164.90.146.196:81';
  let api = `/api/v1`
  const statusCode = ref([])

  const postUnitTypes = async (requestData,endPoint) => {
    //if (!requestOptions.headers) {
     // requestOptions.headers = {};
    //}
    //let dataUnitTypes = null;
    //let errorUnitTypes = ref('')
    
    const options = {};
; 
    console.log("This is data got",requestData)
    //const endPoint = "/products"
    let baseUrl = `${base}${api}${endPoint}`;
    const token = sessionStorage.getItem('accessSessionToken');
    APISettings.headers.set('Content-Type', 'application/json');
    APISettings.headers.set('Access-Control-Allow-Origin', '*');
    APISettings.headers.set('Authorization', 'Bearer ' + token);

    
    const requestOptions = {
      method: 'POST',
      headers: APISettings.headers,
      body: JSON.stringify(requestData)
    };
    await fetch(baseUrl, requestOptions)
    .then(response =>{ 
      statusCode.value=response.status
      return response.json()
  })
    .then(data => {
      // actions to data answer
      console.log(statusCode.value)
      if (data.errors){
        errorUnitTypes.value=data.errors    
      }
      else{
        console.log("Esta es la respuesta "+data)
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
  /*
    try {
      const response = await fetch(baseUrl, requestOptions);
      
      if (!response.ok) {
        const responseDataError = await response.json();
        const keys = Object.keys(responseDataError);
        console.log("Lista de errores")
        console.log(responseDataError)
        keys.forEach(key => {
          
          console.log(`[${key}]:`, responseDataError[key]);
        });
        
        
        // Asigna el error en lugar de retornarlo
        errorUnitTypes = responseDataError;
        return errorUnitTypes

      } else {
        const responseData = await response.json();
        // Puedes realizar acciones adicionales con la respuesta aquí
        dataUnitTypes = responseData.value;
        errorUnitTypes = null;
        return dataUnitTypes
        
      }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        // Asigna el error en lugar de retornarlo
        errorUnitTypes = error;
        return errorUnitTypes
    }*/
  }
  
  const putUnitTypes = async (requestData,endPoint,id) => {
    let data = null;
    let error = null;
    const options = {};
    ; 
        //console.log("This is data got for put",requestData)

        let baseUrl = `${base}${api}${endPoint}${"/"}${id}`;
        const token = sessionStorage.getItem('accessSessionToken');
        APISettings.headers.set('Content-Type', 'application/json');
        APISettings.headers.set('Access-Control-Allow-Origin', '*');
        APISettings.headers.set('Authorization', 'Bearer ' + token);
    
      
        const requestOptions = {
          method: 'PUT',
          headers: APISettings.headers,
          body: JSON.stringify(requestData)
        };
        try {
          const response = await fetch(baseUrl, requestOptions);
          
          if (!response.ok) {
            const responseDataError = await response.json();
            const keys = Object.keys(responseDataError);
            console.log("Lista de errores")
            keys.forEach(key => {
              
              console.log(`[${key}]:`, responseDataError[key]);
            });
            
            
            // Asigna el error en lugar de retornarlo
            error = responseDataError;
          } else {
            const responseData = await response.json();
            // Puedes realizar acciones adicionales con la respuesta aquí
            data = responseData;
            error = null;
            
          }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Asigna el error en lugar de retornarlo
            error = error;
        }    

    
  }

  const deleteUnitTypes = async (requestData,endPoint,id) => {
    let data = null;
    let error = null;
    const options = {};
    ; 
        

        let baseUrl = `${base}${api}${endPoint}${"/"}${id}`;
        const token = sessionStorage.getItem('accessSessionToken');
        APISettings.headers.set('Content-Type', 'application/json');
        APISettings.headers.set('Access-Control-Allow-Origin', '*');
        APISettings.headers.set('Authorization', 'Bearer ' + token);
    
      
        const requestOptions = {
          method: 'DELETE',
          headers: APISettings.headers,
          body: JSON.stringify(requestData)
        };
        try {
          const response = await fetch(baseUrl, requestOptions);
          
          if (!response.ok) {
            const responseDataError = await response.json();
            const keys = Object.keys(responseDataError);
            console.log("Lista de errores")
            keys.forEach(key => {
              
              console.log(`[${key}]:`, responseDataError[key]);
            });
            
            
            // Asigna el error en lugar de retornarlo
            error = responseDataError;
          } else {
            const responseData = await response.json();
            // Puedes realizar acciones adicionales con la respuesta aquí
            data = responseData;
            error = null;
            
          }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            // Asigna el error en lugar de retornarlo
            error = error;
        }    

    
  }


  return {
    dataUnitTypes,
    errorUnitTypes,
    data,
    error,
    postUnitTypes,
    putUnitTypes,
    deleteUnitTypes
  }
}
