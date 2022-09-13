const build = [
  "/_app/start-70478e5d.js",
  "/_app/pages/__layout.svelte-9942e7aa.js",
  "/_app/assets/pages/__layout.svelte-fbdd0f87.css",
  "/_app/error.svelte-5666402b.js",
  "/_app/pages/index.svelte-f15d40fd.js",
  "/_app/assets/pages/index.svelte-7b0d7303.css",
  "/_app/chunks/index-21b643b4.js",
  "/_app/chunks/index-f9f1dab1.js",
  "/_app/chunks/store-6dad7639.js"
];
const files = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
];
const version = "1663098146513";
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
