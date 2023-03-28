import { CustomPage } from "./DOM/Page";

export class CustomBlog extends CustomPage {
    constructor(menu){
        super(menu);
        // Créer les infos des catégories
        this.setCat(this.contenu.categories[0], this.cols[1]);
        this.setCat(this.contenu.articles, this.cols[0]);
    }
}