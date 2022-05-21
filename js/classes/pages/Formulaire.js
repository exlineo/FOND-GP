import { CustomPage } from "./DOM/Page.js";

export class CustomForm extends CustomPage {

    constructor(cat, alias) {
        super(cat, alias);
        this.target.classList.add('formulaire');
        // Créer les infos des catégories
        this.setCat();
    };
}