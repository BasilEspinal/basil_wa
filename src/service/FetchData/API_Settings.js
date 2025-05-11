export default function useSettingsAPI(locale) {
    const APISettings = {
        token: '',
        baseURL: '',
        headers: new Headers({
            Accept: 'application/json',
            'Accept-Language': 'es' // ✅ Use locale passed in
        })
    };
    function pathAPI() {
        // return {base:'http://agroonline_backend.test', apiVer:`/api/v1`}
        
        return {base:'http://164.90.146.196:81', apiVer:`/api/v1`}
    }
    return {
        APISettings,
        pathAPI
    };
}