// api.js
import { APISettings } from "../settings_API";
export default function useProducts(datos) {
  // Define data y error en el ámbito de useProducts
  let data = null;
  let error = null;
  //let base = `http://agroonline_end.test`;  //local
  let base = 'http://164.90.146.196:81';
  let api = `/api/v1`


  const postProducts = async (requestData,endPoint) => {
    //if (!requestOptions.headers) {
     // requestOptions.headers = {};
    //}
    
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
  



  // Retorna data, error y la función postProducts
  return {
    data,
    error,
    postProducts 
  }
}
