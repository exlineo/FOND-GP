import { ServiceStore } from "../data/Service";
import { CustomPage } from "./DOM/Page";

/** Une page avec la catégorie à gauche, un sous menu à droite et les articles en dessous */
export class CustomCategorieMenuDroite extends CustomPage {
    constructor(cat, articles, alias, style=null){
        super(cat);
        document.getElementById('contenu').className = 'blog-menu-droite';
        this.setCat(cat, 1);
        
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias]);
        };
    }
}
/** Une page avec la catégorie à droite, un sous menu à gauche et les articles en dessous */
export class CustomCategorieMenuGauche extends CustomPage {
    constructor(cat, articles, alias, style){
        super(cat);
        document.getElementById('contenu').className = 'blog-menu-gauche';
        this.setCat(cat, 0);

        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[alias]) {
            this.setSousMenu(ServiceStore._menus[alias]);
        };
    }
}