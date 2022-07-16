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
        this.creeMenu(this.principalEl, this.triMenus(ServiceStore._menus.principal));
        this.creeMenu(this.piedEl, ServiceStore._menus.pied);
    };
    /** Etablir les événements de clic */
    setClickEvents() {
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
        // Créer la page du site
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
    /** Gestion des événements */
    setRoute(r){
        this.dispatchEvent(new CustomEvent('route', {detail:{route:r}}))
    }
    /** Animations */
    animationInit() {
        const s = document.querySelectorAll("#contenu > section");
        // console.log(s);
        // s[0].className = 'disparait-gauche';
        // s[1].className = 'disparait-droite';
        s[0].className = '';
        s[1].className = '';
    }
    animationPage() {
        const s = document.querySelectorAll("#contenu > section");
        s[0].className = 'apparait-gauche';
        s[1].className = 'apparait-droite';
    }
}
