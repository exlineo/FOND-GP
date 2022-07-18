import { ServiceStore } from "../data/Service.js";
import { CustomPage } from "./DOM/Page.js";

/** Une page avec la catégorie à gauche, un sous menu à droite et les articles en dessous */
export class CustomCategorieMenuDroite extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat);
        document.getElementById('contenu').classList.add('blog-menu-droite');
        this.setCat(cat, this.cols[0]);

        this.setStyle(1, 0, style);
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias], 1);
        };
    }
}
/** Une page avec la catégorie à droite, un sous menu à gauche et les articles en dessous */
export class CustomCategorieMenuGauche extends CustomPage {
    constructor(cat, alias, style){
        super(cat);
        document.getElementById('contenu').classList.add('blog-menu-gauche');
        this.setCat(cat, this.cols[1]);

        this.setStyle(0, 1, style);
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias], 0);
        };
    }
}