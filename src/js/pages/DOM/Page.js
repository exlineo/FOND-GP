import { CustomArticle } from "./Article";

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    contenu; // La catégorie avec toutes les données dynamiques dedans
    articles = []; // La liste des articles de la page
    alt = 0;

    constructor(contenu) {
        super();
        this.contenu = contenu;
    }
    /** Créer les articles de la page */
    setArticles(articles, cible=null) {
        const el = !cible ? this.cols[this.alterne()] : cible;
        if(Array.isArray(articles)) articles.forEach(a => el.appendChild(this.setArticle(a.attributes)));
    }
    /** Trier les articles */
    triArticles(paire) {
        let n = 0;
        if (!paire) n = 1;
        for (let a = 0; a < this.categorie.Articles.items.length; ++a) {
            if (a % n == 1) this.articles.push(this.categorie.Articles.items[a]);
        };
    }
    /** Alterner les articles entre les colonnes */
    alterne(){
        this.alt == 0 ? this.alt = 1 : this.alt = 0;
        return this.alt;
    }
    /** Afficher la liste des articles sélectionnés */
    // listeArticles(articles) {
    //     articles.forEach(a => {
    //         // Créer des articles complets ou juste l'intro en fonction de la mise en page
    //         this.categorie.MiseEnPage.type != 'CustomPortfolio' ? localTarget.appendChild(this.setArticle(a)) : localTarget.appendChild(this.setRef(a));
    //     })
    // }
    
}