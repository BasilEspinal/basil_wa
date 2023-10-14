export default class MenuModel {
    constructor(label, items) {
        this.label = label;
        this.items = items['subcategories']?.map((subCategory) => {
            //subCategory.label.map()
  
            let rut =
                '/components/GenericComponet/' +
                subCategory;
                    //.replaceAll(' ', '_')
                    //.toLowerCase()
                    //.replace(/[-_][a-z0-9]/g, (group) => group.slice(-1).toUpperCase());
            
            let pathApi = '?ruta=' + encodeURIComponent('https://basilespinal.github.io/api_v1/catalog_jack_2023.json');
            

            return {
                
                label: subCategory.label,
                icon: items['icons'],
                to: rut+pathApi
            };
        
        });
          
        //alert(this.items)
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
