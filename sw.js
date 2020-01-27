const version = "1.0",
    preCache = "PRECACHE-" + version,
    cacheList = [
        "/",
        "assets/bird.png",
        "assets/cloud.png",
        "assets/ground.png",
        "assets/pipe.png",
        "vendor/libs/class.js"
    ];

/*  Service Worker Event Handlers */

self.addEventListener("install", event => {

    console.log("Installing the service worker!");

    self.skipWaiting();

    caches.open(preCache)
        .then(cache => {

            cache.addAll(cacheList);

        });

});

self.addEventListener("activate", function (event) {

    console.log("Activating the service worker!");

});

self.addEventListener("fetch", function (event) {

    event.respondWith(
        caches.match(event.request)
        .then(function (response) {

            if (response) {
                return response;
            }

            return fetch(event.request);
        })
    );

});