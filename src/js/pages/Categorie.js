import { CustomPage } from "./DOM/Page";
/** Affichage de la catégorie à gauche */
export class CustomCategorie extends CustomPage {
    constructor(cat, articles, style=null){
        super(cat);
        this.setCat(cat, 1);
        this.setArticles(articles, 0);
    }
}