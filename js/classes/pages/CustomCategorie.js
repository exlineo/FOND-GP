import { CustomPage } from "./DOM/Page.js";

export class CustomCategorie extends CustomPage {
    cols; // Les cols de la mise en page

    constructor(cat, alias){
        super(cat, alias);
        this.target.classList.add('blog-categorie');
        this.cols = [];
    }
    /** Créer deux colonnes */
    
}