import { CustomBlog } from '../Blog.js';
import { CustomBlogAlterne } from '../BlogAlterne.js';
import { CustomCategorie } from '../CustomCategorie.js';
import { CustomColonnesTriples } from '../ColonnesTriples.js';
import { CustomContact } from '../Contact.js';
import { CustomPortfolio } from '../Portfolio.js';
import { CustomCategorieMenu } from '../CustomCategorieMenu.js';

import { ServiceStore } from '../../data/Service.js';

export class CustomRouter {
    ancre;
    page = {}; // Page en cours (lien + contenu)
    // Liste des templates instanciables
    instances = [
        {
            alias: '',
            classe: CustomCategorie,
            instance: null
        },
        {
            alias: 'CustomBlog',
            classe: CustomBlog,
            instance: null
        },{
            alias: 'CustomCategorie',
            classe: CustomCategorie,
            instance: null
        },{
            alias: 'CustomCategorieMenu',
            classe: CustomCategorieMenu,
            instance: null
        }, {
            alias: 'CustomBlogAlterne',
            classe: CustomBlogAlterne,
            instance: null
        }, {
            alias: 'CustomTriples',
            classe: CustomColonnesTriples,
            instance: null
        }, {
            alias: 'CustomContact',
            classe: CustomContact,
            instance: null
        }, {
            alias: 'CustomPortfolio',
            classe: CustomPortfolio,
            instance: null
    }];
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(page){
        this.instances.map(i => {
            if(!page.Template.data) page.Template.data.attributes.Titre = 'CustomCategorie';
            if(i.alias == page.Template.data.attributes.Titre) this.instance = new i.classe(page.Categorie.data.attributes, page.Lien.Alias);
        });
    }
    /** Retrouver une classe en fonction du nom du template et inscrire l'instance dedans
     */
    findClasse(t) {
        return this.instance.map(c => {
            if(!t) t = 'CustomCategorie';
            if (c.alias == t) {
                c.instance = new c.classe(this.page, this.alias);
                // return c;
            }
        });
    }
    /** Identifier si un hash est présent dans l'adresse > la page a été actualisée */
    getAncre(){
        this.ancre = (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : 'exlineo';
        this.setEvents();
    }
}