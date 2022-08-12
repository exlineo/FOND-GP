/**
 * Sera étendue par les controller pour permettre l'échange de données et leur historisation
 */
export class ServiceStore {
  static instance;
  scope; // Scop transmis du service worker
  static _menus = {}; // La liste des menus
  static _listeCategories = []; // Liste des catégories

  constructor(scope) {
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
  setMenus(data) {
    const menus = {};
    data.forEach(t => {
      let d = t.attributes;
      d.id = t.id;
      let m = '/';
      try{
        m = d.Rattachement.data.attributes.Alias;
      }catch(er){
        dispatchEvent(new CustomEvent('MSG', { detail: { titre:'Erreur de routage', msg: er } }))
      }
      if (!menus.hasOwnProperty(m)) {
        menus[m] = [];
      }
      menus[m].push(d);
    });
    ServiceStore._menus = menus;
  }
  /** Créer les sous menus */
  // triMenus(menu) {
  //   menu.forEach(m => {
  //     if (m.Parent.data) {
  //       const parent = menu[m.Parent.data.id - 1];
  //       if (!parent['enfants']) parent['enfants'] = [];
  //       parent.enfants.push(m);
  //     };
  //   });
  //   menu.sort(()=>{

  //   })
  // }
}