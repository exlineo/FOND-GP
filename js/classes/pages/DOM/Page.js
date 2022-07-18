import { CustomArticle } from "./Article.js";

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
    setArticles(articles, el, n) {
        el.innerHTML = '';
        articles.forEach(a => el.appendChild(this.setArticle(a.attributes, n)));
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
        console.log(localTarget);
        articles.forEach(a => {
            // Créer des articles complets ou juste l'intro en fonction de la mise en page
            this.categorie.MiseEnPage.type != 'CustomPortfolio' ? localTarget.appendChild(this.setArticle(a)) : localTarget.appendChild(this.setRef(a));
        })
    }
    /** LES SECTIONS */
    /** Ecrire le contenu sur la gauche de la colonne */
    setCat(cat, el, ...attr) {
        el.innerHTML = '';
        const art = this.setEl('article');
        art.classList.add('categorie'); // Affichage spécifique de l'article
        if(cat.Titre) art.appendChild(this.setText('h1', cat.Titre));
        
        if(cat.Media.data) art.appendChild(this.setFigure(cat.Media.data.attributes.url));
        if(cat.Description) art.appendChild(this.setHtml('div', cat.Description));
        
        el.appendChild(art);
    }
    /** Définir la mise en page avec un nombre de colonnes */
    setCol(content) {
        this.cols.push(this.setEl('section'));
        document.getElementById('contenu').appendChild(this.cols[this.cols.length - 1]);
        // Créer les articles du blog
        this.listeArticles(this.cols[this.cols.length - 1], content);
    }
    /** Ajouter un style à une colonne d'article */
    setStyle(el, pasEl, style){
        style ? this.cols[el].className = style + ' blog' : this.cols[el].className = 'blog';
        this.cols[pasEl].className = '';
    }
}