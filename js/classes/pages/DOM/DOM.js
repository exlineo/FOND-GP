import { CustomPopup } from './Popup.js';
import { setENV } from '../../../../config/env.js';

export class CustomDOM extends CustomPopup {
    constructor() {
        super();
        this.md = new showdown.Converter();
        this.md.setOption('simplifiedAutoLink', 'true');
        this.md.setOption('openLinksInNewWindow', 'true');
    }
    /** Créer un élément HTML : el = le nom de l'élément, target = l'id de l'élément cible, ...attr = la liste des éléments */
    setEl(el, ...attr) {
        let e = document.createElement(el);
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Ecrire un élément contenant du texte */
    setText(el, text = null, ...attr) {
        let e = document.createElement(el);
        if (text) e.textContent = text;
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Ecrire un élément contenant du HTML */
    setHtml(el, html = null, ...attr) {
        let e = document.createElement(el);
        if (html) e.innerHTML = this.md.makeHtml(html);
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Créer une image avec arrière plan */
    setFigure(media) {
        const div = document.createElement('div');
        if (media.url) {
            const fig = document.createElement('figure');
            this.setAttr(fig, { name: 'style', value: `background-image:url(${setENV().servurl + media.url})` });
            div.appendChild(fig);
        };
        if (media.caption) {
            const legende = document.createElement('legend');
            legende.textContent = media.caption;
            div.appendChild(legende);
        }
        return div;
    }
    /** Créer une image */
    setImg(src, ...attr) {
        let img = document.createElement('img');
        if (src) img.src = src;
        if (attr) {
            this.setAttr(img, ...attr);
        };
        return img;
    }
    /** Créer un bouton avec un lien */
    setBouton(lien, target = '_blank') {
        let bouton = document.createElement('button');
        bouton.textContent = 'En savoir plus';
        bouton.addEventListener('click', (e) => {
            window.open(lien, target);
        });
        return bouton;
    }
    /** Créer un bouton avec un lien */
    setPopup(lien) {
        let bouton = document.createElement('button');
        bouton.textContent = 'En savoir plus';
        bouton.addEventListener('click', (e) => {
            this.creePopup(lien);
        })
        return bouton;
    }
    /** Ecrire un label avec l'année sur un article */
    setLabel(annee) {
        let label = document.createElement('label');
        label.textContent = annee;
        return label;
    }
    /** Ecrire les attributs sur la balise */
    setAttr(e, ...attr) {
        attr.forEach(
            a => {
                if (e) e.setAttribute(a.name, a.value);
            }
        )
    }
    /** Gérer un scroll d'un élément sur un clic de menu */
    setScroll(el, x, y) {
        el.scrollBy({
            top: x,
            left: y,
            behavior: 'smooth'
        });
    }
    /**
     * Ecrire un menu ou un sous menu
     * @param {HTMLElement} el Elment HTML dans lequel écrire le menu
     * @param {Array<Menu>} sm Liste des liens à afficher dans le menu
     */
    creeMenu(el, sm, cible = null) {
        const ul = document.createElement('ul');
        sm.forEach(m => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = m.Lien.Titre;
            if (m.Lien.Cible) a.setAttribute('target', m.Lien.Cible);
            a.setAttribute('href', m.Lien.Url);
            a.addEventListener('click', (e) => {
                e.preventDefault();
                if (m.Lien.Cible != '_blank') {
                    if (m.Template.data?.attributes.Alias == 'categorie-integree') {
                        this.setArticles(m.Categorie.data.attributes.Articles.data, cible);
                    } else {
                        this.router.setPage(m);
                        history.pushState({ key: m.Lien.Url }, '', m.Lien.Url);
                    }
                }
                this.toggleMobile();
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
                const parent = menu.filter(s => s.id == m.Parent.data?.id)[0];
                if (!parent.hasOwnProperty('enfants')) parent['enfants'] = [];
                parent.enfants.push(m);
                delete menu[i];
            };
        });
        return menu;
    }
    /** Créer un sous menu */
    setSousMenu(menu, col) {
        this.cols[col].innerHTML = '';
        const nav = document.createElement('nav');
        const div = document.createElement('div');
        nav.className = 'sous-menu';
        this.cols[col].appendChild(div);
        this.creeMenu(nav, this.triMenus(menu), div);
        this.cols[col].prepend(nav);
        this.setArticles(menu[0].Categorie.data.attributes.Articles.data, div);
    }
    /** Add style to article to animate it */
    setAnimStyle(toggle) {
        if (toggle) return 'anim-gauche';
        return 'anim-droite';
    }
}