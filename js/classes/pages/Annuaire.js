import { CustomPage } from "./DOM/Page.js";

export class CustomAnnuaire extends CustomPage {

    constructor(cat, alias, style=null) {
        super(cat, alias);
        document.getElementById('contenu').classList.add('formulaire');
        
        this.setStyle(1, 0, style);
        this.setCat(cat, this.cols[0]);
    };
}