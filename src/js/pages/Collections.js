import { CustomPage } from "./DOM/Page.js";

export class CustomCollectionImages extends CustomPage {
    constructor(cat, alias, style=null){
        super(cat, alias);
        
        document.getElementById('contenu').className = 'collec-images';
    }
}

export class CustomCollectionMixte extends CustomPage {
    constructor(cat, alias, style){
        super(cat, alias);
        
        document.getElementById('contenu').className = 'collec-mixe';
    }
}