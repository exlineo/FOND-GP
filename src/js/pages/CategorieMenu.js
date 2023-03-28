import { ServiceStore } from "../data/Service";
import { CustomPage } from "./DOM/Page";

/** Une page avec la catégorie à gauche, un sous menu à droite et les articles en dessous */
export class CustomCategorieMenuDroite extends CustomPage {
    constructor(menu){
        super(menu);
        console.log("Catégorie menu droite");
        document.getElementById('contenu').className = 'blog-menu-droite';
        this.setCat(this.contenu.categories[0], this.cols[0]);
        
        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[menu.sousmenu]) {
            this.setSousMenu(ServiceStore._menus[menu.sousmenu], this.cols[1]);
        };
    }
}
/** Une page avec la catégorie à droite, un sous menu à gauche et les articles en dessous */
export class CustomCategorieMenuGauche extends CustomPage {
    constructor(menu){
        super(menu);
        console.log("Catégorie menu gauche");
        document.getElementById('contenu').className = 'blog-menu-gauche';
        this.setCat(this.contenu.categories[0], this.cols[1]);

        // Ecriture des articles et du sous-menu
        if(ServiceStore._menus[menu.sousmenu]) {
            this.setSousMenu(ServiceStore._menus[menu.sousmenu], this.cols[0]);
        };
    }
}