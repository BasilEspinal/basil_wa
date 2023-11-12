export async function useFetch(Endpoint, options = {}, auth = true) {
    if (!options['headers']) {
        options['headers'] = {};
    }
    options['headers']['Content-Type'] = 'application/json';
    options['headers']['Accept'] = 'application/json';
    options['headers']['Access-Control-Allow-Origin'] = '*';

    let base = `http://164.90.146.196:81`; // remote
    //let base = `http://agroonline_end.test`;  //local
    let api = `/api/v1`; 
    let baseUrl = `${base}${api}${Endpoint}`;
    console.info("Funcion Fetch : "+baseUrl) 
    
   
//   let token = sessionStorage.getItem('accessSessionToken');

//   if (token) {
//     // headers["Authorization"] = `Bearer ${token}`;
//     options['headers']['Authorization'] = 'Bearer ' + {token}
//   }
    
    if (auth) {
        
        options['headers']['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessSessionToken');
        
    }
    

    let data = {};
    let error = null;
    try {
        
        let res = await fetch(baseUrl, options);
        
        if (res.ok) {

            data = await res.json();
            
        } else {
            error = await res.json();
        }
    } catch (e) {
        //error = e;
        //alert("Error, por favor contacte al proveedor")
    }

    return { data, error };
}
