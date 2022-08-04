import { CustomPage } from "./DOM/Page.js";
/** Affichage de la catégorie à gauche */
export class CustomCategorie extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat);
        this.setCat(cat, 1);
        this.setArticles(cat.Articles.data);
    }
}