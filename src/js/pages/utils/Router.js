
import { ServiceStore } from '../../data/Service';
import { INSTANCES } from '../DOM/Instances';

export class CustomRouter {
    ancre;
    page = {}; // Page en cours (lien + contenu)
    // Liste des templates instanciables
    instances = INSTANCES;
    constructor() {
        // Lancé par les menus
        addEventListener('ROUTE', (ev) => {
            this.setPage(ev.detail.route);
            // let path = new URL(window.location.href).pathname;
            // const h = path.split('/');
        });
        // Lancé à l'initialisation des menus (Graph)
        // Initialisé lors d'un chagement de route (pour détecter les historiques)
        addEventListener('popstate', ev => this.initRoute());
        // Lancer le routage au chargement du site pour afficher la page en cours ou celle d'accueil
        this.initRoute();
    };
    /** La route lorsqu'on arrive sur la page */
    initRoute() {
        // Identifier l'adresse actuelle
        let path = new URL(window.location.href).pathname;
        const h = path.split('/');
        let adr = {};
        let menu;
        ServiceStore._liens.forEach(l => {
            if(path.includes(l.alias)) menu = l;
        });
        if(!menu) menu = ServiceStore._liens.find(l => l.alias == 'accueil');
        this.setPage(menu);
    }
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(menu) {
        let tmp = 'categorie';
        // Identifier l'instance en lien avec la page
        this.instances.forEach(i => {
            if (menu.template) {
                if (i.alias == menu.template) tmp = i;
            }
        });
        // On instancie une page en fonction du template du menu et on on y injecte le menu
        this.instance = new tmp.classe(menu);
    }
    /** Retrouver une classe en fonction du nom du template et inscrire l'instance dedans
     */
    findClasse(t) {
        return this.instance.map(c => {
            if (!t) t = 'CustomCategorie';
            if (c.alias == t) {
                c.instance = new c.classe(this.page, this.alias);
                // return c;
            }
        });
    }
    /** Identifier si un hash est présent dans l'adresse > la page a été actualisée */
    getAncre() {
        this.ancre = (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : 'exlineo';
        // this.setEvents();
    }
}