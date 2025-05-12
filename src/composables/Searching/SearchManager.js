export default class SearchManager {
    constructor(dataMap) {
        this.dataMap = dataMap; // Object where keys are data names and values are the data arrays
    }

    search(query, dataName) {
        const data = this.dataMap[dataName];
        if (!query.trim().length) {
            return [...data];
        } else {
            return data.filter((item) => item.name.toLowerCase().startsWith(query.toLowerCase()));
        }
    }
}
