import { CustomPage } from "./DOM/Page.js";

export class CustomCollectionImages extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat, alias);
        
        this.setStyle(1, 0, style);
        document.getElementById('contenu').classList.add('collec-images');
    }
}

export class CustomCollectionMixte extends CustomPage {
    constructor(cat, alias, style){
        super(cat, alias);
        
        this.setStyle(1, 0, style);
        document.getElementById('contenu').classList.add('collec-mixe');
    }
}