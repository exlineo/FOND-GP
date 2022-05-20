import { ServiceStore } from "../data/Service.js";
import { CustomPage } from "./DOM/Page.js";

export class CustomCategorieMenu extends CustomPage {

    constructor(cat, alias){
        super(cat);
        document.getElementById('contenu').classList.add('blog-categorie');
        this.setCat(cat, this.cols[0]);
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias])
        };
    }
}