import { CustomPage } from "./DOM/Page.js";

export class CustomAnnuaire extends CustomPage {

    constructor(cat, alias, style=null) {
        super(cat, alias);
        document.getElementById('contenu').className = 'formulaire';
        
        this.setCat(cat, 0);
    };
}