import { ServiceStore } from "../data/Service";
import { CustomPage } from "./DOM/Page";

/** Une page avec la catégorie à gauche, un sous menu à droite et les articles en dessous */
export class CustomCategorieMenuDroite extends CustomPage {
    constructor(menu){
        super(menu);
        document.getElementById('contenu').className = 'blog-menu-droite';
        console.log("Page Catégorie", menu, this.contenu.categories[0], ServiceStore._menus[menu.sousmenu]);
        this.setCat(this.contenu.categories[0], 1);
        
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[menu.sousmenu]) {
            this.setSousMenu(ServiceStore._menus[menu.sousmenu]);
        };
    }
}
/** Une page avec la catégorie à droite, un sous menu à gauche et les articles en dessous */
export class CustomCategorieMenuGauche extends CustomPage {
    constructor(menu){
        super(menu);
        document.getElementById('contenu').className = 'blog-menu-gauche';
        console.log("Page Catégorie", menu, this.contenu.categories[0], ServiceStore._menus[menu.sousmenu]);
        this.setCat(this.contenu.categories[0], 0);

        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[menu.sousmenu]) {
            this.setSousMenu(ServiceStore._menus[menu.sousmenu]);
        };
    }
}