/** Sera étendue par les controller pour permettre l'échange de données et leur historisation */
export class ServiceStore {
  static instance;
  scope; // Scop transmis du service worker
  static _menus = {}; // La liste des menus
  static _categories = []; // Liste des catégories
  static _liens = [];
  static _articles = [];
  static _formulaires = [];

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
}