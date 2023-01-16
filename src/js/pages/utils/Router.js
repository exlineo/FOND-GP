
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

            let path = new URL(window.location.href).pathname;
            const h = path.split('/');
        });
        // Lancé à l'initialisation des menus (Graph)
        addEventListener('LOAD', ev => this.initRoute());
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
        let adr = {};
        ServiceStore._liens.forEach(l => {
            if(l.url.indexOf(h[1]) != -1){
                adr = l;
            }
        });
        // ServiceStore._menus.principal.forEach(l => {
        //     if (l.Lien.Url.indexOf(h[1]) != -1) {
        //         adr = l;
        //     } else if (l.enfants) {
        //         // return l.enfants.filter(e => e.Lien.Url.indexOf(h[1]) != -1)[0];
        //         l.enfants.forEach(e => {
        //             if (e.Lien.Url.indexOf(h[1]) != -1) {
        //                 adr = e;
        //             }
        //         }
        //         );
        //     }
        // });
        this.setPage(adr);
    }
    /** Retrouver la page dans les menus */
    getPage() {
        // Identifier l'adresse actuelle
        let path = new URL(window.location.href).pathname;
        const h = path.split('/');
        // for (let m in ServiceStore._menus) {
        //     console.log(m);
        // }
    }
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(page) {
        let tmp = 'categorie';
        // Identifier l'instance en lien avec la page
        this.instances.forEach(i => {
            if (page.template) {
                if (i.alias == page.template) tmp = i;
            }
        });
        console.log(page, page.style);
        // Récupérer le style de la page si présent
        const style = page.style;
        // Attribuer une catégorie si utile, sinon, rien
        const categorie = (Array.isArray(page.categories) && page.categories.length > 0) ?? page.categories[0];
        const articles = page.articles;
        this.instance = new tmp.classe(categorie, articles, page.url, style);
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