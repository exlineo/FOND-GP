import { CustomPage } from "./DOM/Page";

export class CustomForm extends CustomPage {

    constructor(cat, alias, style=null) {
        super(cat, alias);
        document.getElementById('contenu').className = 'formulaire';
        
        // Créer les infos des catégories
        this.setCat(cat, 0);
    };
}