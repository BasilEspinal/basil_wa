export default function useSettingsAPI(locale) {
    const pathAPI = () => {
        // return { base: 'http://agroonline.co:81', apiVer: '/api/v1' };
        return { base: 'http://164.90.146.196:81', apiVer: '/api/v1' };
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
