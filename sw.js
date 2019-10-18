
const staticCacheName = "site-static";

// the http requests
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.js",
    "/css/styles.css",
    "/css/materialize.css",
    "/images/dish.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", evt => {
    console.log("service worker has been installed");
    // we can add assets
    // useful for things which change rarely
    caches.open(staticCacheName)
    .then(cache => {
        cache.addAll(assets);
    })
    .catch(err => {
        console.log("error opening the cache", err);
    });
});

self.addEventListener("activate", evt => {
    console.log("service worker activated");
    // what do we do here?
});

// fetch event
self.addEventListener("fetch", evt => {
    console.log("fetch intercepted", evt);
});