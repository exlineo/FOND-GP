import { CustomPage } from "./DOM/Page";

export class CustomForm extends CustomPage {

    constructor(menu) {
        super(menu);
        document.getElementById('contenu').className = 'formulaire';
        // Créer les infos des catégories
        this.setCat(this.contenu.categories[0], this.cols[0]);
    };
}