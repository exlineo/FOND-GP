import { CustomPage } from "./DOM/Page.js";

export class CustomBlog extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat, alias);

        // Créer les infos des catégories
        this.setCat(cat, 1);
    }
}