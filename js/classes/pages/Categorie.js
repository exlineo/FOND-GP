import { CustomPage } from "./DOM/Page.js";
/** Affichage de la catégorie à gauche */
export class CustomCategorie extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat);
        this.setCat(cat, this.cols[0]);
        console.log(cat);
        
        this.setStyle(1, 0, style);
        this.setArticles(cat.Articles.data, this.cols[1], 1);
    }
}