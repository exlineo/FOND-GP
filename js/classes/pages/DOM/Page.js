import { CustomArticle } from "./Article.js";
import { setENV } from '../../../../config/env.js';
import { ServiceStore } from '../../data/Service.js';

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
        
        if(cat.Media.data) art.appendChild(this.setFigure(setENV().servurl + cat.Media.data.attributes.url));
        if(cat.Description) art.appendChild(this.setHtml('div', cat.Description));
        
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
    setSousMenu(menu, col, index=0){
        this.cols[col].innerHTML = '';
        const nav = document.createElement('nav');
        nav.className = 'sous-menu';
        // menu.forEach((m, i) => {
        //     console.log(m, i);
        //     if(!m.Parent.data){
        //         const li = document.createElement('li');
        //         const a = document.createElement('a');
        //         a.textContent = m.Lien.Titre;
        //         a.addEventListener('click', (e)=>{
        //             console.log(e.target, menu, col, i);
        //             this.setSousMenu(menu, col, i);
        //         });
        //         li.appendChild(a);
        //         ul.appendChild(li);
        //     }
        // });

        // nav.appendChild(ul);
        // // Ecrire les articles
        // const col2 = col == 1 ? 0 : 1;
        // const tmp = menu[index].Categorie.data?.attributes.Articles.data;
        // if(tmp) this.setArticles(tmp, this.cols[col]);
        console.log(this.triMenus(menu));
        this.creeMenu(nav, this.triMenus(menu));
        this.cols[col].prepend(nav);
    }
}