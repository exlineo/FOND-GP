import { ServiceStore } from './Service';

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

    el; // Elément HTML du menu à lui envoyer
    SW; // Référence au servcie Worker
    s; // Référence au service de données
    fire; // Application firebase

    constructor() {
        // this.el = el;
        // this.getMenus(); // Récupérer les menus depuis la base
        this.s = new ServiceStore(); // Stocker les données pour les partager
        this.fire = initializeApp(firebaseConfig); // Applucation firebase initialisée
        this.store = getFirestore(this.fire); // Accès à la base de données
        this.getFireLiens(); // Récupérer la liste des menus depuis Firebase
        addEventListener('DATA', ev => {
            const req = ev.detail.requete;
            switch (req.type){
                case 'form':
                    this.getFireForm();
            }
        });
    }
    /** Récupérer les données depuis firebase */
    async getFireMenus() {
        const liens = [];
        await getDocs(collection(this.store, 'menus'))
            .then(menus => {
                // Gérer parents et enfants des liens de menus
                ServiceStore._liens.forEach((l, i) => {
                    const enfants = ServiceStore._liens.filter(t => l.alias == t.parent);
                    if(!l.hasOwnProperty('enfant')) l.enfants = enfants;
                    if(!l.parent || l.parent.length == 0) liens.push(l);
                });
                // Gérer les menus récupérés
                menus.forEach(m => {
                    const menu = m.data();
                    menu.id = m.id;
                    menu.liens = [];
                    // Filtrer les liens pour les attribuer au menu
                    const tmp = liens.filter(l => {
                        if(l.menus.includes(menu.alias)) return l;
                    });
                    menu.liens = tmp.sort((a,b) => a.ordre - b.ordre);
                    // if (menu.liens.enfant) menu.liens.enfants.sort((a,b) => a.ordre > b.ordre);
                    ServiceStore._menus[menu.alias] = menu;
                });
                this.getFireCategories();
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
                // Récupérer la liste des menus lorsque les liens sont récupérés
                this.getFireMenus();
            })
            .catch(er => {
                console.log(er);
                dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
            })
    }
    /** Récupérer les catégories en général */
    async getFireCategories() {
        await getDocs(collection(this.store, 'categories'))
            .then(c => {
                c.forEach(l => {
                    const cat = l.data();
                    // Enregistrer aussi la liste des liens pour le router
                    ServiceStore._categories.push(cat);
                });
                // Récupérer la liste des menus lorsque les liens sont récupérés
                this.getFireArticles();
            })
            .catch(er => {
                console.log(er);
                dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
            })
    }
    /** Rcupérer les liens des menus (dans un second temps) */
    async getFireArticles() {
        await getDocs(collection(this.store, 'articles'))
            .then(art => {
                art.forEach(l => {
                    const a = l.data();
                    // Enregistrer aussi la liste des liens pour le router
                    ServiceStore._articles.push(a);
                });
                // Créer les menus une fois les données chargées
                dispatchEvent(new Event('MENUS'));
                this.getFireForm();
            })
            .catch(er => {
                console.log(er);
                dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
            })
    }
    /** Récupérer les données depuis firebase */
    async getFireForm() {
        await getDocs(collection(this.store, 'formulaires'))
        .then(formulaire => {
            formulaire.forEach(form => {
                const f = form.data();
                // Enregistrer aussi la liste des liens pour le router
                ServiceStore._formulaires.push(f);
            })
            console.log('Formulaires', ServiceStore._formulaires);
        })
        .catch(er => {
            console.log(er);
            dispatchEvent(new CustomEvent('MSG', { detail: { titre: 'Erreur de routage', msg: er } }))
        });
    }
    /** Paramétrer le service worker si on peut */
    setSW(scope) {
        this.SW = new ServiceStore(scope);
    };
}