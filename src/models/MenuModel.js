export default class MenuModel {
    constructor(label, items) {
        this.label = label;
        this.items = items['subcategories']?.map((subCategory) => {
            let rut =
                '/components/GenericComponet/' +
                subCategory
                    .replaceAll(' ', '_')
                    .toLowerCase()
                    .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
            let pathApi = '?ruta=' + encodeURIComponent('https://basilespinal.github.io/api_v1/catalog_jack_2023.json');
            return {
                label: subCategory,
                icon: 'pi pi-fw pi-home',
                to: rut + pathApi
            };
        });
    }

    static fromJson(data) {
        let items = [];
        for (let key in data) {
            items.push(new MenuModel(key, data[key]));
        }
        console.log('ruta', items);
        return items;
    }
}
