import MenuModel from "../models/MenuModel";
import menu from "../mocks/menu.json";
//import menuNested from "../mocks/menuNested.json";

export default class MenuService {
    async getMenu() {
        return MenuModel.fromJson(menu);

        //const res = await fetch('https://raw.githubusercontent.com/BasilEspinal/basil_wa/develop/src/service/dynamicColumns/menu.json');
        //return await res.json();

    }
}

