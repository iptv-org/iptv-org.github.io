const build = [
  "/_app/start-4d4bbd8b.js",
  "/_app/pages/__layout.svelte-bbbb0830.js",
  "/_app/assets/pages/__layout.svelte-c7d2bc0e.css",
  "/_app/error.svelte-9550f281.js",
  "/_app/pages/index.svelte-a8f6902b.js",
  "/_app/assets/pages/index.svelte-fade4f59.css",
  "/_app/chunks/vendor-be4ac25a.js",
  "/_app/assets/vendor-eecf3eda.css",
  "/_app/chunks/store-92203636.js"
];
const files = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
];
const version = "1669100105277";
const ASSETS = `cache_${version}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(ASSETS).then((cache) => cache.addAll(to_cache)).then(() => {
    self.skipWaiting();
  }).catch(console.error));
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== ASSETS)
        await caches.delete(key);
    }
    self.clients.claim();
  }).catch(console.error));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline_${version}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isSameOrigin = url.host === self.location.host;
  const isStaticAsset = isSameOrigin && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && isSameOrigin && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
