import { CustomPopup } from './Popup.js';
import { setENV } from '../../../../config/env.js';

export class CustomDOM extends CustomPopup {

    md;
    style; // Le style a appliquer à une page
    cols = []; // Ls colonnes à ajouter aux pages
    col=1; // Déterminer la valeur de la colonne par défaut pour l'affichage des contenus

    constructor() {
        super();
        
        this.cols.push(document.querySelector('#contenu > section:nth-child(1)'));
        this.cols.push(document.querySelector('#contenu > section:nth-child(2)'));

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
    setLabel(infos) {
        let label = document.createElement('label');
        label.textContent = infos;
        return infos;
    }
    /** Ecrire les attributs sur la balise */
    setAttr(e, ...attr) {
        attr.forEach(
            a => {
                if (e) e.setAttribute(a.name, a.value);
            }
        )
    }

    /** Formulaires */
    setInput(champ){
        const field = document.createElement('fieldset');
        const input = document.createElement(champ.Type);
        input.setAttribute('placeholder', champ.Infos);
        input.setAttribute('name', champ.Titre);

        const label = this.setLabel(champ.Titre);

        field.appendChild(label);
        field.appendChild(input);
        return field;
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
    creeMenu(el, sm) {
        const ul = document.createElement('ul');
        sm.forEach(m => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = m.Lien.Titre;
            if (m.Lien.Cible) a.setAttribute('target', m.Lien.Cible);
            a.setAttribute('href', m.Lien.Url);
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.setContent(m);
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
    setSousMenu(menu) {
        const el = this.cols[this.col];
        el.innerHTML = '';
        const nav = document.createElement('nav');
        const div = document.createElement('div');
        nav.className = 'sous-menu';
        el.appendChild(div);
        el.prepend(nav);

        this.creeMenu(nav, this.triMenus(menu), div);
        // this.setContent(menu[0], div);
    }
    /** Créer le contenu des pages en fonction des paramètres du menu */
    setContent(m, cible=null){
        const el = cible ? cible : this.cols[this.col];
        if (m.Lien.Cible != 'blank') {
            if (m.Template.data?.attributes.Alias == 'categorie-integree') {
                this.setArticles(m.Categorie.data.attributes.Articles.data, el);
            } else if (m.Template.data?.attributes.Alias == 'formulaire') {
                this.setForm(m.Categorie.data.attributes.Formulaire.data, el);
            } else {
                this.setRoute(m);
                history.pushState({ key: m.Lien.Url }, '', m.Lien.Url);
            }
            this.setStyle(m.Style.data?.attributes.Alias);
        }else {
            window.open(m.Lien.Url, '_blank');
        }
    }
    /** Add style to article to animate it */
    setAnimStyle(toggle) {
        if (toggle) return 'anim-gauche';
        return 'anim-droite';
    }
    /** Indiquer une route en utilisant un événement */
    setRoute(r){
        dispatchEvent(new CustomEvent('route', {detail:{route:r}}))
    }
    /** LES SECTIONS */
    /** Ecrire le contenu sur la gauche de la colonne */
    setCat(cat, n) {
        this.col = n;
        const el = this.cols[n == 0 ? 1 : 0];
        el.innerHTML = '';
        this.cols[n].innerHTML = '';
        const art = this.setEl('article');
        art.classList.add('categorie'); // Affichage spécifique de l'article
        if(cat.Titre) art.appendChild(this.setText('h1', cat.Titre));
        
        if(cat.Media.data) art.appendChild(this.setFigure(cat.Media.data.attributes));
        if(cat.Description) art.appendChild(this.setHtml('div', cat.Description));
        
        el.appendChild(art);
    }
    /** Définir la mise en page avec un nombre de colonnes */
    setCol() {
        this.cols.push(this.setEl('section'));
        document.getElementById('contenu').appendChild(this.cols[this.cols.length - 1]);
    }
    /** Ajouter un style à une colonne d'article */
    setStyle(style=null){
        style ? this.cols[this.col].className = style + ' blog' : this.cols[this.col].className = 'blog';
        this.cols[this.col == 0 ? 1 : 0].className = '';
        // this.cols[0].className = this.cols[0].className + ' apparait-gauche';
        // this.cols[1].className = this.cols[1].className + ' apparait-droite';
    }
    /** Caler les comportement du menu mobile */
    toggleMobile(){
        if(document.body.clientWidth < 981) this.mobileEl.classList.toggle('ouvert');
    }
}