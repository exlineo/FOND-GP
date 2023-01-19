import { CustomPage } from "./DOM/Page";
/** Affichage de la catégorie à gauche */
export class CustomCategorie extends CustomPage {
    constructor(menu){
        super(menu);
        console.log("Page Catégorie", menu, this.contenu.categories[0], this.contenu.articles);
        this.setCat(this.contenu.categories[0], this.cols[0]);
        this.setArticles(this.contenu.articles, this.cols[1]);
    }
}