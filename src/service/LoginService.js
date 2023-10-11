import { useFetch } from './fetch.js';

export default class LoginService {
    async login(user) {
        const options = {
            method: 'POST',
            body: JSON.stringify(user)
        };

        let { data, error } = await useFetch('http://localhost:3030/server/login', options, false);
        if (error) throw error;
        return data;
    }
}
