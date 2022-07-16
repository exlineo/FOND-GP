import { CustomPage } from "./DOM/Page.js";
/** Affichage de la catégorie à gauche */
export class CustomCategorie extends CustomPage {
    constructor(cat){
        super(cat);
        document.getElementById('contenu').classList.add('blog-categorie');
        this.setCat(cat, this.cols[0]);
        this.setArticles(cat.Articles.data, this.cols[1]);
    }
}