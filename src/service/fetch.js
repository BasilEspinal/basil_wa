export async function useFetch(url, options = {}, auth = true) {
    if (!options['headers']) {
        options['headers'] = {};
    }
    options['headers']['Content-Type'] = 'application/json';
    options['headers']['Accept'] = 'application/json';
    options['headers']['Access-Control-Allow-Origin'] = '*';
    
     
      let token = document.head.querySelector('meta[name="csrf-token"]');
      //alert(token)
      /* 
      if (token) {
        options['headers']['X-CSRF-TOKEN'] = token.content;
      } else {
        console.log(options['headers'])
        console.log(options[token.content])
        console.info(
          "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
        );
      }
      */
    if (auth) {
        
        options['headers']['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessSessionToken');
        
    }
    

    let data = {};
    let error = null;
    try {
        let res = await fetch(url, options);
        if (res.ok) {
            data = res.json();
        } else {
            error = await res.text();
        }
    } catch (e) {
        error = e;
    }

    return { data, error };
}
