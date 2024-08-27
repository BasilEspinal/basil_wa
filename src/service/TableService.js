import { useFetch } from './fetch.js';
export default class TableService {
    /*async getInfo(url) {
        const res = await fetch(url);
        return await res.json();
    }*/
    async getInfo(url) {
        const options = {
            method: 'GET',
            //body: JSON.stringify(user)
        };

        let { data, error } = await useFetch(url, options, true);
        
        if (error) throw error;
        
        return data;
    }
}
