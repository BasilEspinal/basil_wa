import MenuModel from "../models/MenuModel";
import menu from "../mocks/menu.json";

export default class MenuService {
    async getMenu() {
        console.info(menu)
        return MenuModel.fromJson(menu);

        //const res = await fetch('https://raw.githubusercontent.com/BasilEspinal/basil_wa/develop/src/service/dynamicColumns/menu.json');
        //return await res.json();

    }
}

