export default class MenuModel {
    constructor(label, items, icons) {
        this.label = label;
        this.icon = icons;
        this.items = items['subcategories']?.map((subCategory) => {
            if (subCategory.label) return {};
            let rut = '/components/GenericComponet/' + subCategory.Label;
            //.replaceAll(' ', '_')
            //.toLowerCase()
            //.replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
            //let pathApi = '?ruta=' + encodeURIComponent('https://basilespinal.github.io/api_v1/catalog_jack_2023.json');
            let pathApi = subCategory['url'] ? '?ruta=' + encodeURIComponent(subCategory.url) : '';
            let Url = subCategory['to'] ? subCategory['to'] : rut + pathApi;

            return {
                label: subCategory.Label,
                icon: subCategory.icon,
                to: Url
            };
        });
        this.to = !items['subcategories'] ? '/applayout' : '';
    }

    static fromJson(data) {
        let items = [];
        for (let key in data) {
            items.push(new MenuModel(key, data[key], data[key].icons));
        }
        return items;
    }
}
