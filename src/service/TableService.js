export default class TableService {
    async getCutInfo(url) {
        const res = await fetch(url);
        const d = await res.json();
        return d.data;
    }
}
