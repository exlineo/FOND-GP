import { CustomPage } from "./DOM/Page";

export class CustomContact extends CustomPage {

    map;

    constructor(menu) {
        super(menu);
        document.getElementById('contenu').className = 'blog';
        // Créer les infos des catégories
        this.setCat(this.contenu.categories[0], 0);
        this.setArticles(this.contenu.articles, 1);
        // this.setMap();
    };
    /** Crér une carte à partir de Leaflet */
    setMap() {
        if (!this.map) {
            let carte = document.createElement('div');
            carte.setAttribute('id', 'map');
            this.cols[0].appendChild(carte);
            // Ajout de la carte au conteneur
            this.map = L.map('map').setView([43.296156, -0.374778], 17);
            let tiles = location.protocol !== 'https:' ? '//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png' : 'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png';
            let stamenToner = L.tileLayer(tiles, {
                attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
                subdomains: 'abcd',
                maxZoom: 20,
                minZoom: 0,
                label: 'Toner'
            });
            let marker = L.marker([43.296156, -0.374778]).addTo(this.map);
            this.map.addLayer(stamenToner);
        }
    }
}