let base = `http://164.90.146.196:81`; 
let api = `/api/v1`; 
let baseUrl = `${base}${api}${Endpoint}`;
let headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
};

/**
 * Method for request api graphql
 *
 * @return Object or Array with the answer of API
 * @param data data with request
 * @param schema can is null is schema for request
 */
export const post = async ({ data = {}, route = "" }) => {
  if (data.toLocaleString() == "[object Object]") {
    headers["Content-Type"] = "application/json";
    data = JSON.stringify(data);
  } else {
    delete headers["Content-Type"];
  }

  let token = sessionStorage.getItem('accessSessionToken');
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(`${baseUrl}${route}`, {
      method: "POST",
      body: data,
      headers: headers,
      // mode: 'no-cors',
      // credentials: 'same-origin', // include, *same-origin, omit
    });
    let responseJson = await response.json();

    if (response.ok) {
      if (responseJson.code === 401) {
        // sessionStorage.removeItem("token");
        // sessionStorage.removeItem("roles");
        // sessionStorage.removeItem("user");
        // sessionStorage.removeItem("permissions");
        // window.$routerVueGlobal.push({ name: "login" });
        return responseJson;
      }

      return responseJson;
    } else {
      let responseJson = response.json();

      return responseJson;
    }
  } catch (error) {
    return error;
  }
};

export const get = async ({ route = "" }) => {
  let token = sessionStorage.getItem('accessSessionToken');
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(`${baseUrl}${route}`, {
      method: "GET",
      headers: headers,
      // mode: 'no-cors',
      // credentials: 'same-origin', // include, *same-origin, omit
    });
    if (response.ok) {
      let responseJson = await response.json();

      if (responseJson.code === 401) {
        // localStorage.removeItem("token");
        // localStorage.removeItem("roles");
        // localStorage.removeItem("user");
        // localStorage.removeItem("permissions");
        // window.$routerVueGlobal.push({ name: "login" });
        console.log("Denegado: ", responseJson, window.$routerVueGlobal);

        return responseJson;
      }
      return responseJson;
    } else {
      let responseJson = response.json();
      console.log("Success Errror: " + responseJson);
      return responseJson;
    }
  } catch (error) {
    console.log("error");

    return error;
  }
};

export const postFile = async ({ data = {}, route = "" }) => {
  if (data.toLocaleString() == "[object Object]") {
    headers["Content-Type"] = "application/json";

    data = JSON.stringify(data);
  } else {
    delete headers["Content-Type"];
  }

  let token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    let response = await fetch(`${baseUrl}${route}`, {
      method: "POST",
      body: data,
      headers: headers,
      // mode: 'no-cors',
      // credentials: 'same-origin', // include, *same-origin, omit
    });
    let responseBlob = await response.blob();

    return responseBlob;
  } catch (error) {
    return error;
  }
};

export default baseUrl;
export const basePath = base;
