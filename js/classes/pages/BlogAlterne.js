import { CustomPage } from "./DOM/Page.js";

export class CustomBlogAlterne extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat, alias);
        document.getElementById('contenu').className = 'blog';
        
        // Créer les infos des catégories
        this.setCat(cat, 0);
    }
}