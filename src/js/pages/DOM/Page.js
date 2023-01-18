import { CustomArticle } from "./Article";

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    contenu; // La catégorie avec toutes les données dynamiques dedans
    articles = []; // La liste des articles de la page
    alt = 0;

    constructor(menu) {
        super();
        this.contenu = this.filtreContenu(menu);
        if (this.contenu.articles && this.contenu.articles.length > 0) this.setStyle(menu.style);
    }
    /** Créer les articles de la page */
    setArticles(articles, cible=null) {
        const el = !cible ? this.cols[this.alterne()] : cible;
        console.log("articles à lister", articles);
        this.contenu.articles.forEach(a => el.appendChild(this.setArticle(a)));
    }
    /** Trier les articles */
    triArticles(paire) {
        let n = 0;
        if (!paire) n = 1;
        for (let a = 0; a < this.contenu.articles.length; ++a) {
            if (a % n == 1) this.articles.push(this.contenu.articles.items[a]);
        };
    }
    /** Alterner les articles entre les colonnes */
    alterne(){
        this.alt == 0 ? this.alt = 1 : this.alt = 0;
        return this.alt;
    }    
}