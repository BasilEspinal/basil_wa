export default function useSettingsAPI() {
    const APISettings = {
        token: '',
        baseURL: '',
        headers: new Headers({
            Accept: 'application/json'
        })
    };
    function pathAPI() {
        //return {base:'http://agroonline_backend.test', apiVer:`/api/v1`}
        //return { base: 'http://alirio.test', apiVer: `/api/v1` };
<<<<<<< HEAD
         return {base:'http://164.90.146.196:81', apiVer:`/api/v1`}
=======
     return {base:'http://164.90.146.196:81', apiVer:`/api/v1`}
>>>>>>> 1223448d8baa2313b4e16aae2f1eda370c64a13f
    }
    return {
        APISettings,
        pathAPI
    };
}
