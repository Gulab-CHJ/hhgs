// =====================================
// HHGS HOME PAGE SERVICE WORKER
// File: public/service-worker.js
// =====================================

const CACHE_NAME = "hhgs-home-v1";

const STATIC_FILES = [
    "/",
    "/manifest.json",
    "/images/hhgs-icon-192.png",
    "/images/hhgs-icon-512.png"
];


// =====================================
// INSTALL
// =====================================

self.addEventListener(
    "install",
    function (event) {

        self.skipWaiting();

        event.waitUntil(

            caches
                .open(CACHE_NAME)
                .then(function (cache) {

                    return cache.addAll(
                        STATIC_FILES
                    );

                })
                .catch(function (error) {

                    console.log(
                        "Cache install failed:",
                        error
                    );

                })

        );

    }
);


// =====================================
// ACTIVATE
// =====================================

self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches
                .keys()
                .then(function (cacheNames) {

                    return Promise.all(

                        cacheNames.map(
                            function (cacheName) {

                                if (
                                    cacheName !== CACHE_NAME &&
                                    cacheName.startsWith(
                                        "hhgs-home-"
                                    )
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                            }
                        )

                    );

                })
                .then(function () {

                    return self.clients.claim();

                })

        );

    }
);


// =====================================
// FETCH
// =====================================

self.addEventListener(
    "fetch",
    function (event) {

        if (
            event.request.method !== "GET"
        ) {
            return;
        }

        event.respondWith(

            fetch(event.request)
                .then(function (response) {

                    const responseCopy =
                        response.clone();

                    caches
                        .open(CACHE_NAME)
                        .then(function (cache) {

                            cache.put(
                                event.request,
                                responseCopy
                            );

                        });

                    return response;

                })
                .catch(function () {

                    return caches.match(
                        event.request
                    );

                })

        );

    }
);