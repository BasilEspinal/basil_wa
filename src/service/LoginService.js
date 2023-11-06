import { useFetch } from './fetch.js';

export default class LoginService {
    async login(user) {
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        };

        let { data, error } = await useFetch('/login', options, false);
        if (error) throw error;
        return data;
    }
}
