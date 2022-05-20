import { CustomBlog } from '../Blog.js';
import { CustomBlogAlterne } from '../BlogAlterne.js';
import { CustomCategorie } from '../Categorie.js';
import { CustomEquipes } from '../Equipes.js';
import { CustomContact } from '../Contact.js';
import { CustomPortfolio } from '../Portfolio.js';
import { CustomCategorieMenu } from '../CategorieMenu.js';

import { ServiceStore } from '../../data/Service.js';
import { CustomCollectionImages } from '../CollectionImages.js';
import { CustomCollectionMixte } from '../CollectionMixte.js';

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
            alias: 'blog',
            classe: CustomBlog,
            instance: null
        }, {
            alias: 'blogAlterne',
            classe: CustomBlogAlterne,
            instance: null
        },{
            alias: 'categorie',
            classe: CustomCategorie,
            instance: null
        },{
            alias: 'categorieMenu',
            classe: CustomCategorieMenu,
            instance: null
        },{
            alias: 'collectionImages',
            classe: CustomCollectionImages,
            instance: null
        },{
            alias: 'collectionMixte',
            classe: CustomCollectionMixte,
            instance: null
        }, {
            alias: 'equipes',
            classe: CustomEquipes,
            instance: null
        }, {
            alias: 'contact',
            classe: CustomContact,
            instance: null
        }, {
            alias: 'portfolio',
            classe: CustomPortfolio,
            instance: null
    }];
    /** Créer la page avec les contenus
    * @param {Lien} lien Objet contenant toutes les informations du lien et de la page
    */
    setPage(page){
        console.log(page);
        this.instances.map(i => {
            if(i.alias == page.Template.data?.attributes.Alias | 'categorie') this.instance = new i.classe(page.Categorie.data.attributes, page.Lien.Alias);
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