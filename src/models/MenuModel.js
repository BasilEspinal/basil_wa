export default class MenuModel {
    constructor(label, items) {
        this.label = label;
        this.items = items['subcategories']?.map((subCategory) => {
            return {
                label: subCategory,
                icon: 'pi pi-fw pi-home',
                to:
                    '/' +
                    subCategory
                        .replaceAll(' ', '_')
                        .toLowerCase()
                        .replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase())
            };
        });
    }

    static fromJson(data) {
        let items = [];
        for (let key in data) {
            items.push(new MenuModel(key, data[key]));
        }
        return items;
    }
}