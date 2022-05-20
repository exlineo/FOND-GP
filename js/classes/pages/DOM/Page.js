import { CustomArticle } from "./Article.js";
import { ENV } from '../../../../config/env.js';

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    contenu; // La catégorie avec toutes les données dynamiques dedans
    articles = []; // La liste des articles de la page
    style; // Le style a appliquer à une page
    cols = []; // Ls colonnes à ajouter aux pages

    constructor(contenu) {
        super();
        this.contenu = contenu;
        this.cols.push(document.querySelector('#contenu > section:nth-child(1)'));
        this.cols.push(document.querySelector('#contenu > section:nth-child(2)'));
    }
    /** Créer les articles de la page */
    setArticles(articles, el) {
        el.innerHTML = '';
        articles.forEach(a => el.appendChild(this.setArticle(a.attributes)));
    }
    /** Trier les articles */
    triArticles(paire) {
        let n = 0;
        if (!paire) n = 1;
        for (let a = 0; a < this.categorie.Articles.items.length; ++a) {
            if (a % n == 1) this.articles.push(this.categorie.Articles.items[a]);
        };
    }
    /** Afficher la liste des articles sélectionnés */
    listeArticles(articles) {
        articles.forEach(a => {
            // Créer des articles complets ou juste l'intro en fonction de la mise en page
            this.categorie.MiseEnPage.type != 'CustomPortfolio' ? localTarget.appendChild(this.setArticle(a)) : localTarget.appendChild(this.setRef(a));
        })
    }
    /** LES SECTIONS */
    /** Ecrire le contenu sur la gauche de la colonne */
    setCat(cat, el, ...attr) {
        el.innerHTML = '';
        const art = this.setEl('article', attr);
        art.classList.add('categorie');
        if(cat.Titre) art.appendChild(this.setText('h1', cat.Titre));
        
        if(cat.Media.data) art.appendChild(this.setFigure(ENV.servurl + cat.Media.data.attributes.url));
        if (cat.Description) art.appendChild(this.setHtml('div', cat.Description));
        
        el.appendChild(art);
    }
    /** Définir la mise en page avec un nombre de colonnes */
    setCol(content) {
        this.cols.push(this.setEl('section'));
        this.target.appendChild(this.cols[this.cols.length - 1]);
        // Créer les articles du blog
        // this.setContent(this.cols[this.cols.length-1], content);
        this.listeArticles(this.cols[this.cols.length - 1], content);
    }
    /** Créer un sous menu */
    setSousMenu(menu, index=0){
        console.log(menu);
        this.cols[1].innerHTML = '';
        const nav = document.createElement('nav');
        const ul = document.createElement('ul');
        nav.className = 'sous-menu';
        menu.forEach((m, i) => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.textContent = m.Lien.Titre;
            a.addEventListener('click', (e, i)=>{
                console.log(e.target);
                this.setSousMenu(menu, i);
            });
            li.appendChild(a);
            ul.appendChild(li);
        });

        nav.appendChild(ul);
        // Ecrire les articles
        this.setArticles(menu[index].Categorie.data?.attributes.Articles.data, this.cols[1]);

        this.cols[1].prepend(nav);
        // this.setArticles(cat.Articles.data, this.cols[1]);
    }
}