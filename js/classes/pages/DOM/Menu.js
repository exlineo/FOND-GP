import { CustomDOM } from './DOM.js';
import { CustomRouter } from '../utils/Router.js';
import { ServiceStore } from '../../data/Service.js';

/** Gestion du menu, des interactions avec les données et les pages */
export class Menu extends CustomDOM {
    el; // Elément HTML du menu
    liens = []; // Liste des liens du menu
    categorie; // Catégorie de contenus à afficher dan une page
    menuMobile; // Référence HTML du menu mobile
    router; // Gestion des routes

    constructor() {
        super();
        this.principalEl = document.querySelector('main>header>nav');
        this.piedEl = document.querySelector('main>footer>nav');
        this.check = document.querySelector('input.menu-toggler');
        this.menuMobile = document.querySelector('section.mobile ul');
        this.router = new CustomRouter();
        // Menus créés une fois que les données ont été chagée et stockées dans le service
        this.setStructureMenus();
    };
    /** Ecrire les menus dans le DOM */
    setStructureMenus() {
        this.creeMenu(this.principalEl, ServiceStore._menus.principal);
        this.creeMenu(this.piedEl, ServiceStore._menus.pied);
        // Créer la page par défaut
        this.router.setPage(ServiceStore._menus.principal[0]);
    };
    /** Etablir les événements de clic */
    setEvents() {
        this.liens.forEach(l => {
            l.addEventListener('click', (e) => {
                this.check.checked = false; // On décheck la checkbox
                if (l.dataset.index) this.router.ancre = l.dataset.index;
                // Fermer le menu mobile si besoin
                this.ouvreMenuMobile()
                this.router.setPage();
            })
        });
        this.setMobile();
        this.router.setPage();
    };
    /** Caler les comportement du menu mobile */
    setMobile() {
        document.querySelector('.burger').addEventListener('click', (e) => {
            this.ouvreMenuMobile();
        })
    }
    /** Automatiser l'ouerture et la fermeture du menu mobile */
    ouvreMenuMobile() {
        this.menuMobile.classList.toggle('ouvert');
    }
    /**
     * Ecrire un menu ou un sous menu
     * @param {HTMLElement} menu Elment HTML dans lequel écrire le menu
     * @param {Array<Menu>} sm Liste des liens à afficher dans le menu
     */
    creeMenu(el, sm) {
        const ul = document.createElement('ul');
        sm.forEach(m => {
            if (!m.Parent.data) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.textContent = m.Lien.Titre;
                if (m.Lien.Cible) a.setAttribute('target', m.Lien.Cible);
                a.setAttribute('href', m.Lien.Url);
                a.addEventListener('click', (e) => {
                    if (m.Lien.Cible != '_blank') {
                        e.preventDefault();
                        this.router.setPage(m);
                        history.pushState({ key: m.Lien.Url }, '', m.Lien.Url);
                    }
                });
                li.appendChild(a);
                ul.appendChild(li);
            }
        });
        el.appendChild(ul);
    }
    /** Créer les sous menus */
    creeSousMenu(){

    }
}
