const ENV = {
    // dataurl : 'https://claveau2022.herokuapp.com/api/',
    resturl: '//localhost:8086/api/',
    graphurl : '//localhost:8086/graphql',
    servurl: '//localhost:8086',
    absurl:'//localhost'
}

const PROD = {
    // dataurl : 'https://claveau2022.herokuapp.com/api/',
    resturl: '//fgp.exlineo.com/api/',
    graphurl : '//fgp.exlineo.com/graphql',
    servurl: '//fgp.exlineo.com',
    absurl:'//www.exlineo.com/fgp'
}

export function setENV(){
    const env = window.location.href.indexOf('localhost') ? ENV : PROD;
    return env;
}