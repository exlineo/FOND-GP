// import { QL } from './QL';
import { Menu } from '../pages/DOM/Menu';
import { ServiceStore } from './Service';
import { setENV } from '../../config/env';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDx8uS8KJHXoWBke62q_8FlteLALJr1aD0",
    authDomain: "fonds-gp.firebaseapp.com",
    projectId: "fonds-gp",
    storageBucket: "fonds-gp.appspot.com",
    messagingSenderId: "759511926345",
    appId: "1:759511926345:web:8bc26184c2132788906198"
};

export class Graph {

    config; // La configuration récupérée dans le JSON
    params; // Sauvegarde des paramètres de la requête
    el; // Elément HTML du menu à lui envoyer
    SW; // Référence au servcie Worker
    s; // Référence au service de données
    fire; // Application firebase

    constructor() {
        super();
        // this.el = el;
        // this.getMenus(); // Récupérer les menus depuis la base
        this.s = new ServiceStore(); // Stocker les données pour les partager
        this.fire = initializeApp(firebaseConfig); // Applucation firebase initialisée
        this.store = getFirestore(this.fire); // Accès à la base de données
        this.getFireLiens(); // Récupérer la liste des menus depuis Firebase
    }
    /** Récupérer les données depuis firebase */
    async getFireMenus() {
        await getDocs(collection(this.store, 'menus'))
            .then(menus => {
                // Gérer parents et enfants des liens de menus
                ServiceStore._liens.forEach((l, i) => {
                    if(l.parent && l.parent.length > 0){
                        const l_tmp = ServiceStore._liens.filter(t => t.alias == l.parent)[0];
                        if(l_tmp){
                            if(!l_tmp.hasOwnProperty('enfants')) l_tmp.enfants = [];
                            l_tmp.enfants.push(l);
                            ServiceStore._liens.splice(i, 1);
                        }
                    }
                });
                // Gérer les menus récupérés
                menus.forEach(m => {
                    const menu = m.data();
                    menu.id = m.id;
                    menu.liens = [];
                    // Filtrer les liens pour les attribuer au menu
                    const tmp = ServiceStore._liens.filter(l => l.menus.includes(menu.alias));                    
                    // console.log(tmp.sort((a,b) => a.ordre - b.ordre));
                    menu.liens = tmp.sort((a,b) => a.ordre - b.ordre);
                    if (menu.liens.enfant) menu.liens.enfants.sort((a,b) => a.ordre > b.ordre)
                    ServiceStore._menus[menu.alias] = menu;
                });
                console.log("Menus", ServiceStore._menus);
                dispatchEvent(new Event('MENUS'));
                console.log(dispatchEvent(new Event('MENUS')));
            })
            .catch(er => {
                console.log(er);
                dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
            })
    }
    /** Rcupérer les liens des menus (dans un second temps) */
    async getFireLiens() {
        await getDocs(collection(this.store, 'liens'))
            .then(liens => {
                liens.forEach(l => {
                    const lien = l.data();
                    // Enregistrer aussi la liste des liens pour le router
                    ServiceStore._liens.push(lien);
                });
                // Classification du tableau par ordre
                ServiceStore._liens = ServiceStore._liens.sort((a,b) => a.ordre - b.ordre);
                
                console.log(ServiceStore._liens);
                // Récupérer la liste des menus lorsque les liens sont récupérés
                this.getFireMenus();
            })
            .catch(er => {
                console.log(er);
                dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
            })
    }
    /** Faire une requête */
    getCategories() {
        fetch(setENV().graphurl, {
            method: 'POST',
            body: this.reqCategories(),
            headers: this.headers()
        })
            .then(data => data.json())
            .then(d => {
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
        for (let i of data) {
            this.listeCategories.push(i.attributes);
        }
        console.log(this.listeCategories);
        this.menu = new Menu(this.listeCategories);
    }
    /** Paramétrer le service worker si on peut */
    setSW(scope) {
        this.SW = new ServiceStore(scope);
    };
    triMenu(lien) {
        // Organiser les sous-menus
        menu.forEach((m, i) => {
            if (m) {
                const parent = menu.filter(s => s.alias == m.parent)[0];
                if (!parent.hasOwnProperty('enfants')) parent['enfants'] = [];
                parent.enfants.push(m);
                delete menu[i];
            };
        });
        return menu;
    }
}