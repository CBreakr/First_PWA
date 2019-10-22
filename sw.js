
const staticCacheName = "site-static-v1.0.0";
const dynamicCacheName = "site-dynamic-v1.0.0";

const fallback = "/pages/fallback.html";

// the http requests
/*
    the last one was within the material icon's own css file,
    as seen within the browser's network tab
*/
const assets = [
    "/",
    "/index.html",
    fallback,
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
    
    //remove the old caches
    evt.waitUntil(
        // we need to use Promise.all here so that we wait until
        // all of the promises complete
        caches.keys()
        .then(keys => {
            // each one will need to run asynchronously
            return Promise.all(
                keys
                .filter(key => key != staticCacheName && key != dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
        .catch(err => console.log("error removing old caches", err))
    );
});

// fetch event
self.addEventListener("fetch", evt => {
    // console.log("fetch intercepted", evt);
    evt.respondWith(
        caches.match(evt.request)
        .then(cacheResponse => {
            // if the cache response is empty
            // then go back to the initial fetch
            return cacheResponse 
            || fetch(evt.request)
            .then(res => { 
                // dynamic caching
                // this is useful for other pages 
                // besides the main page shell
                return caches.open(dynamicCacheName)
                .then(cache => {
                    // url and item (copy of it)
                    cache.put(evt.request.url, res.clone());
                    // return to the page
                    return res;
                });
            });
        })
        .catch(err => {
            console.log("error on cache match", err)
            // only return the fallback page if the request
            // was looking for a page, rather than an image
            if(evt.request.url.indexOf(".html") >= 0) {
                return caches.match(fallback);
            }
        })
    );
});