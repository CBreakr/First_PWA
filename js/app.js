
console.log("app");

function registerServiceWorker(path){
    if("serviceWorker" in navigator){
        console.log("we have the right property", path);
        navigator.serviceWorker.register(path)
        .then(registration => {
            console.log("service worker registered", registration);
        })
        .catch(err => {
            console.log("service worker error", err);
        });
    }
}
