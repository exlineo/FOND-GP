import { CustomDOM } from './DOM';
import { CustomRouter } from '../utils/Router';
import { ServiceStore } from '../../data/Service';

/** Gestion du menu, des interactions avec les données et les pages */
export class Menu extends CustomDOM {
    el; // Elément HTML du menu
    liens = []; // Liste des liens du menu
    router; // Gestion des routes
    mobile = false;

    constructor() {
        super();
        // Menus créés une fois que les données ont été chagée et stockées dans le service
        // this.setStructureMenus();
        this.burger.addEventListener('click', (e) => {
            this.toggleMobile();
        });
        addEventListener('MENUS', (ev) => {
            console.log('Menus event');
            this.setStructureMenus()
        });
    };
    /** Ecrire les menus dans le DOM */
    setStructureMenus() {
        // Créer les menus du site
        this.creeMenu(this.principalEl, ServiceStore._menus.principal.liens);
        this.creeMenu(this.mobileEl, ServiceStore._menus.principal.liens);
        this.creeMenu(this.piedEl, ServiceStore._menus.pied.liens);
        this.setLogo(this.principalEl);
        // Créer un router, il va initier le contenu
        this.router = new CustomRouter();
    };
    /** Animations */
    animationInit() {
        const s = document.querySelectorAll("#contenu > section");
        s[0].className = '';
        s[1].className = '';
    }
    /** Animer les contenus de la page */
    animationPage() {
        const s = document.querySelectorAll("#contenu > section");
        s[0].className = 'apparait-gauche';
        s[1].className = 'apparait-droite';
    }
    /** Ajouter le logo */
    setLogo(el){
        const img = this.setImg('./assets/images/Logo_fondsGP.png', {alt:"Logo du fonds de doatation Gérard Perrier"});
        const lien = document.createElement('a');
        lien.setAttribute('title', "Fonds de dotation Gérard Perrier, revenir à l'accueil");
        lien.className = 'logo';
        lien.href = '/';
        lien.appendChild(img);
        el.prepend(lien);
    }
}
