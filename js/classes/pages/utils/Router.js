export class Router {
    setRoute(){
        const url = new URL(window.location.href);
        console.log(url.pathname, Service.url);
    }
}