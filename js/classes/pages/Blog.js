import { CustomPage } from "./DOM/Page.js";

export class CustomBlog extends CustomPage {

    cols; // Les colonnes pour la mise en page

    constructor(cat){
        super(cat);
        this.target.classList.add('blog');
        this.cols = [];
        // Créer les infos des catégories
        this.setCat();
    }
}