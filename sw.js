
const staticCacheName = "site-static";

// the http requests
/*
    the last one was within the material icon's own css file,
    as seen within the browser's network tab
*/
const assets = [
    "/",
    "/index.html",
    "/js/app.js",
    "/js/ui.js",
    "/js/materialize.js",
    "/css/styles.css",
    "/css/materialize.css",
    "/images/dish.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v48/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];


self.addEventListener("install", evt => {
    console.log("service worker is being installed");
    
    // make sure the event doesn't close until this promise finishes
    evt.waitUntil(
        // we can add assets
        // useful for things which change rarely
        caches.open(staticCacheName)
        .then(cache => {
            console.log("caching shell assets")
            cache.addAll(assets);
        })
        .catch(err => {
            console.log("error opening the cache", err);
        })
    );
});

self.addEventListener("activate", evt => {
    console.log("service worker activated");
    // what do we do here?
});

// fetch event
self.addEventListener("fetch", evt => {
    // console.log("fetch intercepted", evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheResponse => {
            // if the cache response is empty
            // then go back to the initial fetch
            return cacheResponse || fetch(evt.request);
        })
        .catch(err => console.log("error on cache match", err))
    );
});