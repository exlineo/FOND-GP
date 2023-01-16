import { Graph } from "./js/data/Graph";
import { Menu } from "./js/pages/DOM/Menu";

export class Init{

    graph; // Les infos du menu

    constructor(){
        this.graph = new Graph(document.querySelector('section.menu'));

        // Service worker pour gérer le cache
        // if ('serviceWorker' in navigator) {
        //     window.addEventListener('load', function() {
        //     navigator.serviceWorker.register('./data/sw.js').then((registration) => {
        //         console.log(' Service de cache initialisé : ', registration.scope);
        //         // this.graph.setSW(registration.scope);
        //     }, function(err) {
        //         console.log('Erreur dans la mise en place du gestionnaire de cache ', err);
        //     });
        //     });
        // }
    }
}

const menu = new Menu();
