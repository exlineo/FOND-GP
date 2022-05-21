import { ServiceStore } from "../data/Service.js";
import { CustomPage } from "./DOM/Page.js";

/** Une page avec la catégorie à gauche, un sous menu à droite et les articles en dessous */
export class CustomCategorieMenuDroite extends CustomPage {
    constructor(cat, alias){
        super(cat);
        document.getElementById('contenu').classList.add('blog-categorie');
        this.setCat(cat, this.cols[0]);
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias], 1);
        };
    }
}
/** Une page avec la catégorie à droite, un sous menu à gauche et les articles en dessous */
export class CustomCategorieMenuGauche extends CustomPage {
    constructor(cat, alias){
        super(cat);
        document.getElementById('contenu').classList.add('blog-categorie');
        this.setCat(cat, this.cols[1]);
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias], 0);
        };
    }
}