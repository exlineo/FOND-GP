import { CustomPage } from "./DOM/Page";

export class CustomBlogAlterne extends CustomPage {
    constructor(menu){
        super(menu);
        console.log("Page blog alterné", menu, this.contenu.categories[0]);
        // Créer les infos des catégories
        this.setMainCat(this.contenu.categories[0]);
        const alterne = this.triArticles();
        this.setArticles(alterne.gauche, this.cols[0]);
        this.setArticles(alterne.droite, this.cols[1]);
    }
}