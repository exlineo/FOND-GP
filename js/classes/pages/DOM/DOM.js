import { CustomPopup } from './Popup.js';
import { setENV } from '../../../../config/env.js';

export class CustomDOM extends CustomPopup {

    md;
    style; // Le style a appliquer à une page
    cols = []; // Ls colonnes à ajouter aux pages
    col = 1; // Déterminer la valeur de la colonne par défaut pour l'affichage des contenus
    categorie; // Catégorie de contenus à afficher dan une page
    mobileEl; // Référence HTML du menu mobile
    burger; // Bouton pour ouvrir le menu mobile
    msg; // Ecrire un message d'alerte
    enchasse; // Ecrire les contenus dans une div dans la page (pour les sous menus)

    constructor() {
        super();

        this.principalEl = document.querySelector('main>header>nav');
        this.piedEl = document.querySelector('main>footer>nav');
        this.burger = document.querySelector('button.burger');
        this.mobileEl = document.querySelector('nav#mobile');
        this.msg = document.querySelector('#msg');

        this.cols.push(document.querySelector('#contenu > section:nth-child(1)'));
        this.cols.push(document.querySelector('#contenu > section:nth-child(2)'));

        this.md = new showdown.Converter();
        this.md.setOption('simplifiedAutoLink', 'true');
        this.md.setOption('openLinksInNewWindow', 'true');
        // Afficher des informations lors d'une erreur
        addEventListener('MSG', (ev) => {
            // this.setPage(ev.detail.route);
            if(!document.body.querySelector('#msg')) this.setMsg(ev.detail);
        })
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
    /** Créer un lien */
    setLien(l){
        const a = document.createElement('a');
        l.Description ? a.setAttribute('alt', l.Description) : a.setAttribute('alt', l.Titre);
        a.setAttribute('title', l.Titre);
        if(l.Cible) a.target = l.Cible;
        a.href = l.Url;
        a.className = 'lien';
        a.textContent = l.Titre;
        return a;
    }
    /** Créer un bouton dans un formulaire */
    setFormBouton(type, text){
        const btn = document.createElement('input');
        btn.type = type;
        btn.value = text;
        return btn;
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
    /** Formulaires */
    setInput(champ) {
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
     * @param {HTMLElement} cible Element HTML dans lequel écrire le contenu
     */
    creeMenu(el, sm, cible = null) {
        const ul = document.createElement('ul');
        sm = this.triOrdreMenu(sm);
        sm.forEach(m => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = m.Lien.Titre;
            if (m.Lien.Cible) a.setAttribute('target', m.Lien.Cible);
            a.setAttribute('href', m.Lien.Url);
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.setContent(m, cible);
                this.toggleMobile();
            });
            li.appendChild(a);
            ul.appendChild(li);
            // Créer les sous menus
            if (m['enfants']) {
                this.creeMenu(li, m.enfants);
            }
        });
        el.appendChild(ul);
    }
    /** Créer les sous menus */
    triMenu(menu) {
        // Organiser les sous-menus
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
    /** Mettre les menus en ordre */
    triOrdreMenu(menu) {
        const ordre = menu.sort((a, b) => a.Ordre - b.Ordre);
        return ordre;
    }
    /** Créer un sous menu
     * @param m Sous menu à afficher
    */
    setSousMenu(menu) {
        const el = this.cols[this.col];
        el.innerHTML = '';
        const nav = document.createElement('nav');
        const div = document.createElement('div');
        nav.className = 'sous-menu';
        div.setAttribute('id', 'enchasse');
        el.appendChild(div);
        el.prepend(nav);

        this.creeMenu(nav, this.triMenu(menu), div);
        this.enchasse = div;
        this.setContent(menu[0], div);
    }
    /** Créer le contenu des pages en fonction des paramètres du menu
     * @param m Informations sur le lien cliqué (la page)
     * @param cible Savoir où la page doit écrire son contenu
     */
    setContent(m, cible = null) {
        const el = this.setCible(cible);
        
        console.log(m, el);
        const categorie = m.Categorie.data ? m.Categorie.data.attributes : null;
        el.innerHTML = '';
        if (m.Lien.Cible != 'blank') {
            if (m.Template.data?.attributes.Alias == 'categorie-integree') {
                this.setArticles(categorie.Articles.data, el);
            } else if (m.Template.data?.attributes.Alias == 'formulaire') {
                this.setForm(m.Formulaire.data.attributes, el);
            } else {
                dispatchEvent(new CustomEvent('ROUTE', { detail: { route: m } }))
                history.pushState({ key: m.Lien.Url }, '', m.Lien.Url);
            }
            if (categorie && categorie.Articles.data.length > 0) this.setStyle(m.Style.data?.attributes.Alias);
        } else {
            window.open(m.Lien.Url, '_blank');
        }
        // this.enchasse = null;
    }
    /** Renvoyer la cible pour l'écriture d'un contenu */
    setCible(cible=null){
        if(this.enchasse){
            return this.enchasse;
        }else if(cible){
            return cible;
        }else{
            return this.cols[this.col];
        }
    }
    /** Add style to article to animate it
     * @param toggle Booléen indiquant quelle animation déclencher
    */
    setAnimStyle(toggle) {
        if (toggle) return 'anim-gauche';
        return 'anim-droite';
    }
    /** LES SECTIONS */
    /** Ecrire le contenu sur la gauche de la colonne
     * @param cat Catégorie à décortiquer pour l'afficher
     * @param n Numéro de la colonne dans laquelle afficher la catégorie
    */
    setCat(cat, n) {
        this.col = n;
        const el = this.cols[n == 0 ? 1 : 0];
        el.innerHTML = '';
        this.cols[n].innerHTML = '';
        el.className = '';
        const art = this.setEl('article');
        art.classList.add('categorie'); // Affichage spécifique de l'article
        if (cat.Titre) art.appendChild(this.setText('h1', cat.Titre));

        if (cat.Media.data) art.appendChild(this.setFigure(cat.Media.data.attributes));
        if (cat.Description) art.appendChild(this.setHtml('div', cat.Description));

        el.appendChild(art);
    }
    /** Créer un formulaire à partir des données de la base
     * @param form Les données du formulaire à traiter
     * @param el Elément HTML dans lequel écrire le formulaire
    */
    setForm(form, el){
        const formEl = this.setEl('form');
        const titre = this.setText('h2', form.Titre);
        const descr = this.setHtml('p', form.Description);

        formEl.appendChild(titre);
        formEl.appendChild(descr);
        form.champ.forEach( c => {
            formEl.appendChild(this.setInput(c));
        });

        const field = document.createElement('fieldset');
        field.className = 'h c';
        field.appendChild(this.setFormBouton('reset', 'Annuler'))
        field.appendChild(this.setFormBouton('submit', 'Valider'))
        formEl.appendChild(field);
        
        el.appendChild(formEl);
    }
    /** Définir la mise en page avec un nombre de colonnes */
    setCol() {
        this.cols.push(this.setEl('section'));
        document.getElementById('contenu').appendChild(this.cols[this.cols.length - 1]);
    }
    /** Ajouter un style à une colonne d'article */
    setStyle(style = null) {
        style ? this.cols[this.col].className = style + ' blog' : this.cols[this.col].className = 'blog';
        this.cols[this.col == 0 ? 1 : 0].className = '';
    }
    /** Ercire un message d'alerte */
    setMsg(detail) {
        const div = this.setEl('div');
        div.id = 'msg';
        div.appendChild(this.setText('h5', detail.titre));
        div.appendChild(this.setText('p', detail.msg));
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 5000);
    }
    /** Caler les comportements du menu mobile */
    toggleMobile() {
        if (document.body.clientWidth < 981) {
            this.mobileEl.classList.toggle('ouvert');
        }else{
            this.mobileEl.classList.remove('ouvert');
        }
    }
}