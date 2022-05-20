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
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = m.Lien.Titre;
            if (m.Lien.Cible) a.setAttribute('target', m.Lien.Cible);
            a.setAttribute('href', m.Lien.Url);
            a.addEventListener('click', (e) => {
                if (m.Lien.Cible != '_blank') {
                    e.preventDefault();
                    if (m.Template.data?.attributes) {
                        // this.animationInit();
                        this.router.setPage(m);
                        history.pushState({ key: m.Lien.Url }, '', m.Lien.Url);
                        // this.animationPage();
                    }
                }
            });
            li.appendChild(a);
            ul.appendChild(li);
            // Créer les sous menus
            if (m['enfants']) {
                this.creeMenu(li, m.enfants)
            }
        });
        el.appendChild(ul);
    }
    /** Créer les sous menus */
    triMenus(menu) {
        menu.forEach((m, i) => {
            if (m.Parent.data) {
                const parent = menu[m.Parent.data.id - 1];
                if (!parent['enfants']) parent['enfants'] = [];
                parent.enfants.push(m);
                delete menu[i];
            };
        });
        return menu;
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
