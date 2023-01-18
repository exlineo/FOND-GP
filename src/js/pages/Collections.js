import { CustomPage } from "./DOM/Page.js";

export class CustomCollectionImages extends CustomPage {
    constructor(menu){
        super(menu);
        document.getElementById('contenu').className = 'collec-images';
    }
}

export class CustomCollectionMixte extends CustomPage {
    constructor(menu){
        super(menu);
        document.getElementById('contenu').className = 'collec-mixe';
    }
}