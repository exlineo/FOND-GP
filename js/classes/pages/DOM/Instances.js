import { CustomBlog } from '../Blog.js';
import { CustomBlogAlterne } from '../BlogAlterne.js';
import { CustomCategorie } from '../Categorie.js';
import { CustomContact } from '../Contact.js';
import { CustomPortfolio } from '../Portfolio.js';
import { CustomCategorieMenuDroite, CustomCategorieMenuGauche } from '../CategorieMenu.js';
import { CustomCollectionImages, CustomCollectionMixte } from '../Collections.js';
import { CustomForm } from '../Formulaire.js';
import { CustomAnnuaire } from '../Annuaire.js';

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