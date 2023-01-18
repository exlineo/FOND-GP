import { CustomPage } from "./DOM/Page";

export class CustomBlog extends CustomPage {
    constructor(menu){
        super(menu);
        console.log("Page blog", menu);
        // Créer les infos des catégories
        this.setCat(this.contenu.categories[0], 1);
    }
}