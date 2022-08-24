
import { ServiceStore } from '../../data/Service.js';
import { INSTANCES } from '../DOM/Instances.js';

export class CustomRouter {
    ancre;
    page = {}; // Page en cours (lien + contenu)
    // Liste des templates instanciables
    instances = INSTANCES;
    constructor() {
        // Lancé par les menus
        addEventListener('ROUTE', (ev) => {
            this.setPage(ev.detail.route);

            let path = new URL(window.location.href).pathname;
            const h = path.split('/');
            console.log(h);
        });
        // Lancé à l'initialisation des menus (Graph.js)
        addEventListener('LOAD', ev => {
            console.log("Loader initié");
            this.initRoute();
        });
        // Initialisé lors d'un chagement de route (pour détecter les historiques)
        addEventListener('popstate', ev => {
            this.initRoute();
            console.log("Changement dans l'historique", ev.state);
        });
    };
    /** La route lorsqu'on arrive sur la page */
    initRoute() {
        this.getPage();
        // Identifier l'adresse actuelle
        let path = new URL(window.location.href).pathname;
        const h = path.split('/');
        console.log(h);
        let adr = {};
        ServiceStore._menus.principal.forEach(l => {
            if (l.Lien.Url.indexOf(h[1]) != -1) {
                adr = l;
            } else if (l.enfants) {
                // return l.enfants.filter(e => e.Lien.Url.indexOf(h[1]) != -1)[0];
                l.enfants.forEach(e => {
                    // console.log(e);
                    if (e.Lien.Url.indexOf(h[1]) != -1) {
                        adr = e;
                    }
                }
                );
            }
        });
        this.setPage(adr);
    }
    /** Retrouver la page dans les menus */
    getPage() {
        // Identifier l'adresse actuelle
        let path = new URL(window.location.href).pathname;
        const h = path.split('/');
        console.log(h);

        for (let m in ServiceStore._menus) {
            console.log(m);
        }
    }
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(page) {
        let tmp = 'categorie';
        console.log(page);
        // Identifier l'instance en lien avec la page
        this.instances.forEach(i => {
            if (page.Template) {
                if (i.alias == page.Template.data?.attributes.Alias) tmp = i;
            }
        });
        // Récupérer le style de la page si présent
        const style = page.Style.data ? page.Style.data.attributes.Alias : null;
        // Attribuer une catégorie si utile, sinon, rien
        const categorie = page.Categorie.data ? page.Categorie.data.attributes : null;
        this.instance = new tmp.classe(categorie, page.Lien.Alias, style);
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