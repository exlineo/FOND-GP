import { CustomPage } from "./DOM/Page";

export class CustomAnnuaire extends CustomPage {

    constructor(menu) {
        super(menu);
        document.getElementById('contenu').className = 'formulaire';
        
        this.setCat(this.contenu.categories[0], this.cols[0]);
    };
}