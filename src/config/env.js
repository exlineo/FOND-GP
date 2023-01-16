/** Paramètres de connexion en réseau local */
// const ENV = {
//     resturl: '//localhost:8086/api/',
//     graphurl : '//localhost:8086/graphql',
//     servurl: '//localhost:8086',
//     absurl:'//localhost'
// }
/** Paramètres de connexion pour la production */
const ENV = {
    resturl: '//fgp.exlineo.com/api/',
    graphurl : '//fgp.exlineo.com/graphql',
    servurl: '//fgp.exlineo.com',
    absurl:'//www.exlineo.com/fgp'
}
/** Paramètres de connexion pour la production */
const PROD = {
    resturl: 'http://fgp.exlineo.com/api/',
    graphurl : 'http://fgp.exlineo.com/graphql',
    servurl: 'http://fgp.exlineo.com',
    absurl:'//fonds-gp.exlineo.com/'
}

export function setENV(){
    const env = window.location.href.indexOf('localhost') != -1 || window.location.href.indexOf('127.0.0.1') != -1 ? ENV : PROD;
    return env;
    // return PROD;
}