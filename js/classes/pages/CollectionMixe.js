import { CustomPage } from "./DOM/Page.js";

export class CustomCollectionsMixe extends CustomPage {
    cols; // Les cols de la mise en page

    constructor(cat, alias){
        super(cat, alias);
        this.target.classList.add('collec-mixe');
    }
}