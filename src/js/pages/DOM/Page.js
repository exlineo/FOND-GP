import { CustomArticle } from "./Article";

/** Créer des pages à partir des données */
export class CustomPage extends CustomArticle {
    contenu; // La catégorie avec toutes les données dynamiques dedans
    articles = []; // La liste des articles de la page
    alt = 0;

    constructor(menu) {
        super();
        this.contenu = this.filtreContenu(menu);
        // if (this.contenu.articles && this.contenu.articles.length > 0)
        this.setStyle(menu.style);
    }
    /** Créer les articles de la page
     * @param articles Liste des articles à écrire
     * @param cible Elément HTML recevant les articles à écrire
    */
    setArticles(articles, cible = null) {
        const el = !cible ? this.cols[this.alterne()] : cible;
        articles.forEach(a => el.appendChild(this.setArticle(a)));
    }
    /** Trier les articles */
    triArticles() {
        const alterne = { gauche: [], droite: [] };
        for (let a = 0; a < this.contenu.articles.length; ++a) {
            a % 2 == 0 ? alterne.gauche.push(this.contenu.articles[a]) : alterne.droite.push(this.contenu.articles[a]);
        };
        return alterne;
    }
    /** Alterner les articles entre les colonnes */
    alterne() {
        this.alt == 0 ? this.alt = 1 : this.alt = 0;
        return this.alt;
    }
}