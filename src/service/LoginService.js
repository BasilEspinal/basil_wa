import { useFetch } from './fetch.js';

export default class LoginService {
    async login(user) {
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        };

        let { data, error } = await useFetch('http://164.90.146.196:81/api/v1/login', options, false);
        if (error) throw error;
        return data;
    }
}
