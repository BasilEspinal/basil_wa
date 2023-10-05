export default class TableService {
    async getInfo(url) {
        const res = await fetch(url);
        return await res.json();
    }
}
