import { CustomPage } from "./DOM/Page";

export class CustomPageArticle extends CustomPage {
    constructor(menu){
        super(menu);
        // Créer les infos des catégories
        this.cols[1].style.backgroundImage = `url(${this.contenu.articles[0].mediaIntro.url})`;
        // this.setCat(this.contenu.categories[0], this.cols[1]);
        this.cols[0].innerHTML = '';
        // this.cols[0].this.setArticleText(this.contenu.articles[0]);
        const a = this.contenu.articles[0];
        let article = this.setEl('article');
        let obj = {}; // Objet d'initialisation
        const intro = this.setEl('div');
        if (a.titre) { obj.titre = this.setText('h2', a.titre) };
        if (a.intro) { intro.appendChild(this.setHtml('div', a.intro)); };
        if (a.contenu) { obj.contenu = this.setHtml('div', a.contenu) };
        
        obj.intro = intro;
        // if(a.Liens) { a.Liens.forEach(l => obj[l.Alias] = this.setLien(l))};

        for (let i in obj) {
            article.appendChild(obj[i]);
        }
        const trait = document.createElement('hr');
        article.appendChild(trait);
        // Vérifier la présence de mailto
        this.sendMail(article);
        this.cols[0].appendChild(article);
    }
}