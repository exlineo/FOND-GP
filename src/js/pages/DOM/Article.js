import { CustomDOM } from "./DOM";

export class CustomArticle extends CustomDOM {
    alias;

    constructor() {
        super();
    };
    /** Récupérer la liste des articles en fonction des catégories */
    /** Créer un article */
    setArticle(a) {
        let article = this.setEl('article');
        let obj = {}; // Objet d'initialisation
        const intro = this.setEl('div');
        if (a.mediaIntro && a.mediaIntro.url) {
            intro.className = 'intro';
            intro.appendChild(this.setFigure(a.mediaIntro));
        };
        if (a.titre) { obj.titre = this.setText('h2', a.titre) };
        if (a.intro) { intro.appendChild(this.setHtml('div', a.intro)); };
        if (a.mediaContenu && a.mediaContenu.url) { obj.imageA = this.setFigure(a.mediaContenu) };
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
        return article;
    };
    /** Créer un article ouvert avec une popup (pour les références) (un cartel avec une image) */
    setRef(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });
        article.className = this.setAnimStyle(this.cols[this.col]);

        let div = this.setEl('div');

        if (a.imageA) article.appendChild(this.setFigure(a.imageA));
        if (a.titre) div.appendChild(this.setText('h2', a.titre));
        if (a.accroche) div.appendChild(this.setText('h3', a.accroche));
        if (a.annee) div.appendChild(this.setLabel(a.annee));
        div.appendChild(this.setPopup(a));

        article.appendChild(div);
        // Vérifier la présence de mailto
        this.sendMail(article);
        return article;
    };
    /** Ouvrir une popup et écrire l'article cliqué dedans */
    setArticlePopup(a) {
        let article = this.setEl('article');
        this.setAttr(article, { name: 'id', value: a.alias });

        let obj = {}; // Objet d'initialisation

        let div = document.createElement('div');
        if (a.titre) { obj.titre = this.setText('h2', a.titre) };
        if (a.accroche) { obj.accroche = this.setText('h3', a.accroche) };
        if (a.imageI) { obj.imageI = this.setFigure(a.imageI) };
        if (a.intro) { obj.intro = this.setText('p', a.intro) };
        if (a.contenu) { obj.contenu = this.setHtml('div', a.contenu) };
        if (a.imageC) { obj.imageC = this.setImg(a.imageC) };
        if (a.lien) { obj.lien = this.setBouton(a.lien) };

        for (let i in obj) {
            div.appendChild(obj[i]);
        }

        if (a.imageA) article.appendChild(this.setFigure(a.imageA));
        article.appendChild(div);
        article.addEventListener('click', (e) => {
            e.preventDefault();
        });
        // Vérifier la présence de mailto
        this.sendMail(article);
        return article;
    }
    /** Envoyer un email en le cachant */
    sendMail(html) {
        let as = html.getElementsByTagName('a');
        for(let a of as){
            if (a.href.indexOf('mailto') != -1 && a.href.indexOf('@') != -1) {
                const at = a.href.indexOf('@');
                let href = a.href.substring(7, at)+'[@]'+a.href.substring(at+1, a.href.length);
                a.textContent = href;
                a.setAttribute('data-href', window.btoa(a.href));
                a.removeAttribute('href');
                a.addEventListener('click', (ev)=> {
                    ev.preventDefault();
                    window.open(window.atob(ev.target.dataset.href));
                });
            }
        };
    }
    
}