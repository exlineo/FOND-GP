import { CustomPopup } from './Popup';
import { ServiceStore } from '../../data/Service';

export class CustomDOM extends CustomPopup {

    // md;
    style; // Le style a appliquer à une page
    cols = []; // Les colonnes à ajouter aux pages
    col = 1; // Déterminer la valeur de la colonne par défaut pour l'affichage des contenus
    contenu; // L'élement HTML qui contient le contenu du site
    head; // Entete d'une page
    categorie; // Catégorie de contenus à afficher dan une page
    mobileEl; // Référence HTML du menu mobile
    burger; // Bouton pour ouvrir le menu mobile
    msg; // Ecrire un message d'alerte
    enchasse; // Ecrire les contenus dans une div dans la page (pour les sous menus)
    store; // Lien vers le service store

    constructor() {
        super();

        this.principalEl = document.querySelector('main>header>nav');
        this.piedEl = document.querySelector('main>footer>nav');
        this.burger = document.querySelector('button.burger');
        this.mobileEl = document.querySelector('nav#mobile');
        this.msg = document.querySelector('#msg');

        this.contenu = document.getElementById('contenu');
        this.head = document.querySelector('main > header > section');
        this.cols.push(document.querySelector('#contenu > section:nth-child(1)'));
        this.cols.push(document.querySelector('#contenu > section:nth-child(2)'));

        this.store = new ServiceStore();

        // this.md = new showdown.Converter();
        // this.md.setOption('simplifiedAutoLink', 'true');
        // this.md.setOption('openLinksInNewWindow', 'true');
        // Afficher des informations lors d'une erreur
        addEventListener('MSG', (ev) => {
            ev.stopImmediatePropagation();
            // this.setPage(ev.detail.route);
            if (!document.body.querySelector('#msg')) this.setMsg(ev.detail);
        });
    }
    /** Réinitialiser le contenu des pages pour éviter les doublons */
    initEl() {
        this.cols.forEach(c => c.innerHTML = '');
        this.head.innerHTML = '';
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
        // if (html) e.innerHTML = this.md.makeHtml(html);
        if (html) e.innerHTML = html;
        if (attr) {
            this.setAttr(e, ...attr);
        };
        return e;
    }
    /** Créer une image avec arrière plan */
    setFigure(media) {
        const div = document.createElement('div');
        div.className = 'figure';
        if (media.url) {
            const fig = document.createElement('figure');
            this.setAttr(fig, { name: 'style', value: `background-image:url(${media.url})` });
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
    setLien(l) {
        const a = document.createElement('a');
        l.description ? a.setAttribute('alt', l.description) : a.setAttribute('alt', l.titre);
        a.setAttribute('title', l.titre);
        if (l.cible) a.target = l.cible;
        a.href = l.url;
        a.className = 'lien';
        a.textContent = l.titre;
        return a;
    }
    /** Créer un bouton dans un formulaire */
    setFormBouton(type, text) {
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
        const input = document.createElement(champ.type);
        input.setAttribute('placeholder', champ.infos);
        input.setAttribute('name', champ.titre);

        const label = this.setLabel(champ.titre);

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
     * @param {HTMLElement} smEl Element HTML dans lequel écrire le contenu
     */
    creeMenu(el, sm, smEl = null) {
        const ul = document.createElement('ul');
        sm.forEach(m => {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.textContent = m.titre;
            // Eviter des liens sur les menus qui ont des enfants, ça complique l'affichage
            if (m.enfants.length == 0) {
                a.setAttribute('href', m.url);
                if (m.cible) a.setAttribute('target', m.cible);
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    this.setContent(m, smEl);
                });
            };

            li.appendChild(a);
            ul.appendChild(li);
            // Créer les sous menus
            if (m.enfants) {
                this.creeMenu(li, m.enfants.sort((a, b) => a.ordre - b.ordre));
            }
        });
        el.appendChild(ul);
    }
    /** Créer un sous menu
     * @param m Sous menu à afficher
    */
    setSousMenu(menu, el) {
        // const el = this.cols[this.col];
        el.innerHTML = '';
        const nav = document.createElement('nav');
        const div = document.createElement('div');

        nav.className = 'sous-menu';
        div.setAttribute('id', 'enchasse');
        el.appendChild(div);
        el.prepend(nav);

        this.creeMenu(nav, menu.liens, div);
        this.enchasse = div;
        this.setContent(menu.liens[0], div);
    }
    /** Créer le contenu des pages en fonction des paramètres du menu
     * @param m Informations sur le lien cliqué (la page)
     * @param cible Savoir où la page doit écrire son contenu
     */
    setContent(m, cibleEl = null) {
        const el = this.setCible(cibleEl);
        el.innerHTML = '';
        if (m.cible != '_blank') {
            if (m.template == 'categorieIntegree') {
                // Appel de Page pour écrire les articles
                this.setArticles(this.filtreContenu(m).articles, el);
            } else if (m.template == 'formulaire') {
                // C'est un formulaire qu'il faut écrire
                this.setForm(m.formulaire, el);
            } else {
                // Changement d'adresse
                dispatchEvent(new CustomEvent('ROUTE', { detail: { route: m } }))
                history.pushState({ key: m.url }, '', m.url);
            }
        } else {
            window.open(m.url, '_blank');
        }
        if(m.style && m.style.length > 0 && cibleEl){
            cibleEl.className = m.style;
        }
    }
    /** Récupérer le contenu à partir d'un lien de menu */
    filtreContenu(menu) {
        console.log("Flitre contenu", menu);
        let articles = []; // récupérer une liste d'articles à afficher
        let categories = []; // Récupérer la liste des catégories à afficher
        console.log(ServiceStore._articles);
        // Récupérer les articles du menu s'il y en a
        if (menu.articles && menu.articles.length > 0) {
            menu.articles.forEach(art => {
                articles = [articles, ...ServiceStore._articles.filter(a => a.alias == art)].flat();
            });
            // articles = [articles, ...ServiceStore._articles.filter(a => a.categories.includes(menu.articles[0]))].flat();
        }
        // Récupérer les articles des catégories s'il y en a
        if (menu.categories) {
            menu.categories.forEach(cat => {
                articles = [articles, ...ServiceStore._articles.filter(a => a.categories.includes(cat))].flat();
                categories = ServiceStore._categories.filter(a => a.alias == cat);
            });
        };
        return { categories, articles };
    }
    /** Renvoyer l'élément HTML pour l'écriture d'un contenu */
    setCible(cible = null) {
        if (this.enchasse) {
            // A l'intérieur d'une page
            return this.enchasse;
        } else if (cible) {
            // Un endroit spécifique
            return cible;
        } else {
            // Ouvrir le menu juste pour le menu principal
            this.toggleMobile();
            // La colonne gauche ou droite
            return this.cols[this.col];
        }
    }
    /** Animer un article
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
    setCat(cat, el) {
        // this.col = n;
        // const el = this.cols[n == 0 ? 1 : 0];
        el.className = '';
        this.initEl();
        const art = this.setEl('article');
        art.classList.add('categorie'); // Affichage spécifique de l'article
        if (cat.titre) art.appendChild(this.setText('h1', cat.titre));

        if (cat.media != null) art.appendChild(this.setFigure(cat.media));
        if (cat.description) art.appendChild(this.setHtml('div', cat.description));

        el.appendChild(art);
    }
    setMainCat(cat) {
        this.initEl();
        if (cat.titre) this.head.appendChild(this.setText('h1', cat.titre));
        if (cat.description) this.head.appendChild(this.setHtml('div', cat.description));
    }
    /** Créer un formulaire à partir des données de la base
     * @param form Les données du formulaire à traiter
     * @param el Elément HTML dans lequel écrire le formulaire
    */
    setForm(f, el) {
        const form = ServiceStore._formulaires.find(fo => fo.alias == f);
        const formEl = this.setEl('form');
        const titre = this.setText('h2', form.titre);
        const descr = this.setHtml('p', form.description);

        formEl.appendChild(titre);
        formEl.appendChild(descr);
        form.champs.forEach(c => {
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
    /** Initaliser le contenu des colonnes */
    initCols() {
        this.cols.forEach(c => {
            c.innerHTML = '';
            c.style.background = '';
        })
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
        } else {
            this.mobileEl.classList.remove('ouvert');
        }
    }
}