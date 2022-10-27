import { QL } from './QL.js';
import { Menu } from '../pages/DOM/Menu.js';
import { ServiceStore } from './Service.js';
import { setENV } from '../../../config/env.js';

export class Graph extends QL {

    config; // La configuration récupérée dans le JSON
    params; // Sauvegarde des paramètres de la requête
    el; // Elément HTML du menu à lui envoyer
    SW; // Référence au servcie Worker
    s; // Référence au service de données

    constructor(el) {
        super();
        this.el = el;
        this.getMenus(); // Récupérer les menus depuis la base
        this.s = new ServiceStore(); // Stocker les données pour les partager
    }
    /** Récupérer les données des menus, catégories et articles */
    async getMenus() {
        fetch(setENV().graphurl, {
            method: 'POST',
            body: this.reqAll(),
            headers: this.headers()
        }).then(data => {
            return data.json();
        }).then(d => {
            // this.setCategories(d.data.categories.data);
            this.s.setMenus(d.data.menus.data);
            this.menu = new Menu();
            dispatchEvent(new CustomEvent('LOAD'));
        })
        .catch(console.error);
    };
    /** Faire une requête */
    getCategories() {
        fetch(setENV().graphurl, {
            method: 'POST',
            body: this.reqCategories(),
            headers: this.headers()
        }).then(data => {
            return data.json();
        }).then(d => {
            this.setCategories(d.data.categories.data);
            // Enregistrer les données
            // this.storeData('listeCategories', this.listeCategories);
        })
        .catch(console.error);
    };
    /** Récupérer les articles d'une page */
    getArticles(index) {
        if (this.listeCategories.length > 0) {
            return this.listeCategories.find(art => art.alias == index).Articles.items;
        } else {
            return false;
        };
    }
    /** Initialiser les valeurs des données et lancer le menu */
    setCategories(data) {
        for(let i of data){
            this.listeCategories.push(i.attributes);
        }
        console.log(this.listeCategories);
        this.menu = new Menu(this.listeCategories);
    }
    /** Paramétrer le service worker si on peut */
    setSW(scope) {
        this.SW = new ServiceStore(scope);
    }
}