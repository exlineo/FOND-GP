import { CustomBlog } from '../Blog';
import { CustomBlogAlterne } from '../BlogAlterne';
import { CustomCategorie } from '../Categorie';
import { CustomContact } from '../Contact';
import { CustomPortfolio } from '../Portfolio';
import { CustomCategorieMenuDroite, CustomCategorieMenuGauche } from '../CategorieMenu';
import { CustomCollectionImages, CustomCollectionMixte } from '../Collections';
import { CustomForm } from '../Formulaire';
import { CustomAnnuaire } from '../Annuaire';

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
        alias: 'categorieIntegree',
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