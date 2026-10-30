
const CACHE_NAME = "gs-market-shopkeeper-v1";

self.addEventListener("install", event => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(
        (async () => {
            await self.clients.claim();
        })()
    );
});

// Dashboard और API को हमेशा network से लोड करें।
self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    // Login, orders और sales को cache नहीं करना है।
    if (
        url.pathname.startsWith("/shopkeeper/api/") ||
        url.pathname.startsWith("/shopkeeper/login")
    ) {
        return;
    }
});
