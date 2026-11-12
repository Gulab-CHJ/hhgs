// // =====================================
// // HHGS SERVICE WORKER
// // =====================================

// const STATIC_CACHE =
//     "hhgs-static-v8";

// const IMAGE_CACHE =
//     "hhgs-images-v8";

// const PAGE_CACHE =
//     "hhgs-pages-v8";


// const PRECACHE_FILES = [

//     "/",

//     "/manifest.json",

//     "/images/hhgs-icon-192.png",

//     "/images/hhgs-icon-512.png",

//     "/css/style.css",

//     "/css/banner.css",

//     "/js/banner.js"

// ];


// // =====================================
// // INSTALL
// // =====================================

// self.addEventListener(
//     "install",
//     function (event) {

//         self.skipWaiting();

//         event.waitUntil(

//             caches
//                 .open(STATIC_CACHE)
//                 .then(function (cache) {

//                     return Promise.allSettled(

//                         PRECACHE_FILES.map(
//                             function (file) {

//                                 return cache.add(
//                                     file
//                                 );

//                             }
//                         )

//                     );

//                 })

//         );

//     }
// );


// // =====================================
// // ACTIVATE
// // =====================================

// self.addEventListener(
//     "activate",
//     function (event) {

//         const activeCaches = [

//             STATIC_CACHE,

//             IMAGE_CACHE,

//             PAGE_CACHE

//         ];

//         event.waitUntil(

//             caches
//                 .keys()
//                 .then(function (cacheNames) {

//                     return Promise.all(

//                         cacheNames.map(
//                             function (cacheName) {

//                                 if (
//                                     !activeCaches.includes(
//                                         cacheName
//                                     )
//                                 ) {

//                                     return caches.delete(
//                                         cacheName
//                                     );

//                                 }

//                             }
//                         )

//                     );

//                 })
//                 .then(function () {

//                     return self.clients.claim();

//                 })

//         );

//     }
// );


// // =====================================
// // FETCH
// // =====================================

// self.addEventListener(
//     "fetch",
//     function (event) {

//         const request =
//             event.request;

//         const requestURL =
//             new URL(request.url);


//         if (
//             request.method !== "GET"
//         ) {
//             return;
//         }


//         // Do not cache external websites

//         if (
//             requestURL.origin !==
//             self.location.origin
//         ) {
//             return;
//         }


//         // =================================
//         // PRODUCT AND WEBSITE IMAGES
//         // Cache First
//         // =================================

//         if (
//             request.destination === "image"
//         ) {

//             event.respondWith(

//                 caches
//                     .open(IMAGE_CACHE)
//                     .then(
//                         async function (cache) {

//                             const cachedImage =
//                                 await cache.match(
//                                     request
//                                 );

//                             if (cachedImage) {

//                                 return cachedImage;

//                             }

//                             try {

//                                 const response =
//                                     await fetch(
//                                         request
//                                     );

//                                 if (
//                                     response &&
//                                     response.ok
//                                 ) {

//                                     cache.put(
//                                         request,
//                                         response.clone()
//                                     );

//                                 }

//                                 return response;

//                             } catch (error) {

//                                 return new Response(
//                                     "",
//                                     {
//                                         status: 404
//                                     }
//                                 );

//                             }

//                         }
//                     )

//             );

//             return;
//         }


//         // =================================
//         // HTML PAGES
//         // Network First
//         // =================================

//         if (
//             request.mode === "navigate"
//         ) {

//             event.respondWith(

//                 caches
//                     .open(PAGE_CACHE)
//                     .then(
//                         async function (cache) {

//                             try {

//                                 const response =
//                                     await fetch(
//                                         request
//                                     );

//                                 if (
//                                     response &&
//                                     response.ok
//                                 ) {

//                                     cache.put(
//                                         request,
//                                         response.clone()
//                                     );

//                                 }

//                                 return response;

//                             } catch (error) {

//                                 const cachedPage =
//                                     await cache.match(
//                                         request
//                                     );

//                                 return (
//                                     cachedPage ||
//                                     caches.match("/")
//                                 );

//                             }

//                         }
//                     )

//             );

//             return;
//         }


//         // =================================
//         // CSS, JS AND OTHER FILES
//         // Stale While Revalidate
//         // =================================

//         event.respondWith(

//             caches
//                 .open(STATIC_CACHE)
//                 .then(
//                     async function (cache) {

//                         const cachedResponse =
//                             await cache.match(
//                                 request
//                             );

//                         const networkResponse =
//                             fetch(request)
//                                 .then(
//                                     function (response) {

//                                         if (
//                                             response &&
//                                             response.ok
//                                         ) {

//                                             cache.put(
//                                                 request,
//                                                 response.clone()
//                                             );

//                                         }

//                                         return response;

//                                     }
//                                 )
//                                 .catch(function () {

//                                     return null;

//                                 });

//                         return (
//                             cachedResponse ||
//                             networkResponse
//                         );

//                     }
//                 )

//         );

//     }
// );




// =====================================
// HHGS SERVICE WORKER v9
// AUTO UPDATE + CACHE MANAGEMENT
// =====================================

const STATIC_CACHE = "hhgs-static-v9";
const IMAGE_CACHE = "hhgs-images-v9";
const PAGE_CACHE = "hhgs-pages-v9";

const PRECACHE_FILES = [
    "/",
    "/manifest.json",
    "/images/hhgs-icon-192.png",
    "/images/hhgs-icon-512.png",
    "/css/style.css",
    "/css/banner.css",
    "/js/banner.js"
];

const ALL_CACHES = [
    STATIC_CACHE,
    IMAGE_CACHE,
    PAGE_CACHE
];


// =====================================
// INSTALL
// =====================================

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(STATIC_CACHE)
            .then(async cache => {

                await Promise.allSettled(
                    PRECACHE_FILES.map(file =>
                        cache.add(file)
                    )
                );

            })
            .then(() => self.skipWaiting())

    );

});


// =====================================
// ACTIVATE
// =====================================

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(cacheNames => {

                return Promise.all(

                    cacheNames.map(cacheName => {

                        // Delete only old HHGS caches

                        if (
                            cacheName.startsWith("hhgs-") &&
                            !ALL_CACHES.includes(cacheName)
                        ) {

                            return caches.delete(cacheName);

                        }

                    })

                );

            })

            .then(() => self.clients.claim())

            .then(async () => {

                const clients = await self.clients.matchAll({
                    type: "window",
                    includeUncontrolled: true
                });

                clients.forEach(client => {

                    client.postMessage({
                        type: "HHGS_SW_UPDATED"
                    });

                });

            })

    );

});


// =====================================
// PRIVATE PATH CHECK
// =====================================

function isPrivatePath(path) {

    return [
        "/admin",
        "/api",
        "/market/api",
        "/shopkeeper",
        "/login",
        "/logout",
        "/checkout",
        "/account"
    ].some(prefix =>
        path === prefix ||
        path.startsWith(prefix + "/")
    );

}


// =====================================
// FETCH
// =====================================

self.addEventListener("fetch", event => {

    const request = event.request;

    if (request.method !== "GET") return;

    const url = new URL(request.url);

    // Same origin only

    if (url.origin !== self.location.origin) return;

    // Do not cache private pages

    if (isPrivatePath(url.pathname)) return;


    // =================================
    // IMAGES - CACHE FIRST
    // =================================

    if (request.destination === "image") {

        event.respondWith(

            caches.open(IMAGE_CACHE)

                .then(async cache => {

                    const cached = await cache.match(request);

                    if (cached) return cached;

                    try {

                        const response = await fetch(request);

                        if (response.ok) {

                            await cache.put(
                                request,
                                response.clone()
                            );

                        }

                        return response;

                    } catch (error) {

                        return new Response("", {
                            status: 404
                        });

                    }

                })

        );

        return;
    }


    // =================================
    // HTML - NETWORK FIRST
    // =================================

    if (request.mode === "navigate") {

        event.respondWith(

            caches.open(PAGE_CACHE)

                .then(async cache => {

                    try {

                        const response = await fetch(request);

                        const cacheControl =
                            response.headers.get("Cache-Control") || "";

                        if (
                            response.ok &&
                            response.type === "basic" &&
                            !/private|no-store/i.test(cacheControl)
                        ) {

                            await cache.put(
                                request,
                                response.clone()
                            );

                        }

                        return response;

                    } catch (error) {

                        return (
                            await cache.match(request) ||
                            await cache.match("/")
                        ) || new Response(
                            "Internet connection unavailable",
                            {
                                status: 503,
                                headers: {
                                    "Content-Type": "text/plain"
                                }
                            }
                        );

                    }

                })

        );

        return;
    }


    // =================================
    // CSS + JAVASCRIPT - NETWORK FIRST
    // =================================

    const isStaticFile =
        request.destination === "style" ||
        request.destination === "script" ||
        request.destination === "font";

    if (isStaticFile) {

        event.respondWith(

            caches.open(STATIC_CACHE)

                .then(async cache => {

                    try {

                        // Bypass browser HTTP cache

                        const response = await fetch(request, {
                            cache: "no-store"
                        });

                        if (response.ok) {

                            await cache.put(
                                request,
                                response.clone()
                            );

                        }

                        return response;

                    } catch (error) {

                        const cached = await cache.match(request);

                        if (cached) return cached;

                        return new Response(
                            "File unavailable",
                            { status: 503 }
                        );

                    }

                })

        );

    }

});


// =====================================
// SERVICE WORKER UPDATE MESSAGE
// =====================================

self.addEventListener("message", event => {

    if (event.data === "SKIP_WAITING") {

        self.skipWaiting();

    }

});
