
self.addEventListener("install", evt => {
    console.log("service worker has been installed");
    // we can add assets
    // useful for things which change rarely
});

self.addEventListener("activate", evt => {
    console.log("service worker activated");
    // what do we do here?
});
