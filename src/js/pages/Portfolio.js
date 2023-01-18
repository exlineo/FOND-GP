import { CustomPage } from "./DOM/Page";

export class CustomPortfolio extends CustomPage {

    popup; // Popup Html à écrire
    limites = {debut:0,nb:4,ecart:0};

    constructor(menu){
        super(menu);
        document.getElementById('contenu').className = 'portfolio';
        // this.setMur();
    }
    /** Afficher les images des références */
    setMur(){
        // Trier les items en décroissance sur l'année
        this.contenu.articles.sort((a, b) => a - b);
    };
    /** Créer un article */
    setImage(a){
        let div = document.createElement('div');

        let img = new Image();
        if(a.imageA) img.src = a.imageA;
        div.appendChild(img);
        return div;
    }
}