import { CustomPage } from "./DOM/Page.js";

export class CustomBlog extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat, alias);
        document.getElementById('contenu').classList.add('blog');

        this.setStyle(0, 1, style);
        // Créer les infos des catégories
        this.setCat(cat, this.cols[1]);
        this.setArticles(cat.Articles.data, this.cols[0], 0);
    }
}