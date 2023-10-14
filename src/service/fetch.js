export async function useFetch(url, options = {}, auth = true) {
    if (!options['headers']) {
        options['headers'] = {};
    }
    options['headers']['Content-Type'] = 'application/json';
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
