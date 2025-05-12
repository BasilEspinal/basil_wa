export default function useSettingsAPI(locale) {
    const pathAPI = () => {
        return { base: 'http://agroonline.co:81', apiVer: '/api/v1' };
    };

    const APISettings = {
        token: '',
        baseURL: '',
        headers: new Headers({
            Accept: 'application/json',
            'Accept-Language': locale //
        })
    };

    return {
        APISettings,
        pathAPI
    };
}

// import { useI18n } from 'vue-i18n';
// export default function useSettingsAPI() {
//     const { locale } = useI18n();
//     const APISettings = {
//         token: '',
//         baseURL: '',
//         headers: new Headers({
//             Accept: 'application/json',
//             'Accept-Language': locale.value,
//         })
//     };
//     function pathAPI() {
//         //return {base:'http://agroonline_backend.test', apiVer:`/api/v1`}

//          //return {base:'http://164.90.146.196:81', apiVer:`/api/v1`}
//          return {base:'http://agroonline.co:81', apiVer:`/api/v1`}
//     }
//     return {
//         APISettings,
//         pathAPI
//     };
// }

///useSettingsAPI.js
