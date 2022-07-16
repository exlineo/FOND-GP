import { CustomBlog } from '../js/classes/pages/Blog.js';
import { CustomBlogAlterne } from '../js/classes/pages/BlogAlterne.js';
import { CustomCategorie } from '../js/classes/pages/Categorie.js';
import { CustomContact } from '../js/classes/pages/Contact.js';
import { CustomPortfolio } from '../js/classes/pages/Portfolio.js';
import { CustomCategorieMenuDroite, CustomCategorieMenuGauche } from '../js/classes/pages/CategorieMenu.js';
import { CustomCollectionImages, CustomCollectionMixte } from '../js/classes/pages/Collections.js';
import { CustomForm } from '../js/classes/pages/Formulaire.js';
import { CustomAnnuaire } from '../js/classes/pages/Annuaire.js';
/** Paramètres de connexion en réseau local */
const ENV = {
    resturl: '//localhost:8086/api/',
    graphurl : '//localhost:8086/graphql',
    servurl: '//localhost:8086',
    absurl:'//localhost'
}
/** Paramètres de connexion pour la production */
const PROD = {
    resturl: '//fgp.exlineo.com/api/',
    graphurl : '//fgp.exlineo.com/graphql',
    servurl: '//fgp.exlineo.com',
    absurl:'//www.exlineo.com/fgp'
}

export function setENV(){
    const env = window.location.href.indexOf('localhost') != -1 || window.location.href.indexOf('127.0.0.1') != -1 ? ENV : PROD;
    return env;
    // return PROD;
}
/** Tableau de correspondance des instances pour initialiser les templates */
export const INSTANCES = [
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
        alias: 'categorieMenuGauche',
        classe: CustomCategorieMenuGauche,
        instance: null
    },{
        alias: 'categorieMenuDroite',
        classe: CustomCategorieMenuDroite,
        instance: null
    },{
        alias: 'collectionImages',
        classe: CustomCollectionImages,
        instance: null
    },{
        alias: 'collectionMixte',
        classe: CustomCollectionMixte,
        instance: null
    },{
        alias: 'formulaire',
        classe: CustomForm,
        instance: null
    },{
        alias: 'annuaire',
        classe: CustomAnnuaire,
        instance: null
    },{
        alias: 'contact',
        classe: CustomContact,
        instance: null
    }, {
        alias: 'portfolio',
        classe: CustomPortfolio,
        instance: null
}];