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
        
         //return {base:'http://164.90.146.196:81', apiVer:`/api/v1`}
         return {base:'http://agroonline.co:81', apiVer:`/api/v1`}
    }
    return {
        APISettings,
        pathAPI
    };
}

useSettingsAPI.js

// import { computed, watchEffect } from 'vue';

// export default function useSettingsAPI(locale) {
//     const pathAPI = () => {
//         // Example: return { base: 'http://localhost:8000', apiVer: '/api/v1' };
//         return { base: 'http://agroonline.co:81', apiVer: '/api/v1' };
//     };

//     const APISettings = computed(() => {
//         return {
//             token: '',
//             baseURL: `${pathAPI().base}${pathAPI().apiVer}`,
//             headers: new Headers({
//                 Accept: 'application/json',
//                 'Accept-Language': locale.value // ← inject current language here
//             })
//         };
//     });

//     return {
//         APISettings,
//         pathAPI
//     };
// }