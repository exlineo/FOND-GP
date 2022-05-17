/**
 * Sera étendue par les controller pour permettre l'échange de données et leur historisation
 */
export class ServiceStore {
  static instance;
  scope; // Scop transmis du service worker
  static _menus = {}; // La liste des menus
  static _listeCategories = []; // Liste des catégories

  constructor(scope){
    this.scope = scope;
  }
  // Créer un singleton pour les données
  static getInstance() {
    if (this.instance === undefined) {
      this.instance = new Context();
    }
    return this.instance;
  }
  /** Trier les données pour créer des menus */
  setMenus(data){
    const menus = {};
    data.forEach(d => {
      d = d.attributes;
      const m = d.Rattachement.data.attributes.Alias;
      if(!menus.hasOwnProperty(m)){
        menus[m] = [];
      }
      menus[m].push(d);
    });
    ServiceStore._menus = menus;
  }
  /** Récuperer un menu depuis son ID ou son Titre */
  getMenu(id){

  }
  /** Créer la lsite des catégories à partir des menus */
  setCategories(){

  }
}