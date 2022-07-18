
import { ServiceStore } from '../../data/Service.js';
import { INSTANCES } from '../DOM/Instances.js';

export class CustomRouter {
    ancre;
    page = {}; // Page en cours (lien + contenu)
    // Liste des templates instanciables
    instances = INSTANCES;
    constructor(){
        addEventListener('route', (ev)=>{
            this.setPage(ev.detail.route);
        })
        this.initRoute(); // Initialiser la page au démarrage
    }
    /** La route lorsqu'on arrive sur la page */
    initRoute(){
        // Identifier l'adresse actuelle
        let path = new URL(window.location.href).pathname;
        if(path == '/index.html') path = '/';
        // Récupérer le menu en lien avec le chemin
        const adr = ServiceStore._menus.principal.filter(l => l.Lien.Url == path);
        // Créer une page par défaut
        this.setPage(adr[0]);
    }
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(page){
        let tmp = 'categorie';
        this.instances.forEach(i => {
            if(i.alias == page.Template.data?.attributes.Alias) tmp = i;
        });
        const style = page.Style.data ? page.Style.data.attributes.Alias : null;
        this.instance = new tmp.classe(page.Categorie.data.attributes, page.Lien.Alias, style);
    }
    /** Retrouver une classe en fonction du nom du template et inscrire l'instance dedans
     */
    findClasse(t) {
        return this.instance.map(c => {
            if(!t) t = 'CustomCategorie';
            if (c.alias == t) {
                c.instance = new c.classe(this.page, this.alias);
                // return c;
            }
        });
    }
    /** Identifier si un hash est présent dans l'adresse > la page a été actualisée */
    getAncre(){
        this.ancre = (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : 'exlineo';
        // this.setEvents();
    }
}