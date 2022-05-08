const build = [
  "/_app/start-0281ef27.js",
  "/_app/pages/__layout.svelte-8a4b19fb.js",
  "/_app/assets/pages/__layout.svelte-0f0f9924.css",
  "/_app/error.svelte-eafc136f.js",
  "/_app/pages/index.svelte-925f19ed.js",
  "/_app/assets/pages/index.svelte-fade4f59.css",
  "/_app/chunks/vendor-e06f8fa1.js",
  "/_app/assets/vendor-c8b32335.css",
  "/_app/chunks/store-93a026ed.js"
];
const files = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
];
const version = "1652029742872";
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
  const isSameOrigin = url.host === self.location.host;
  const isStaticAsset = isSameOrigin && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (!isHttp || !isSameOrigin || skipBecauseUncached)
    return;
  event.respondWith((async () => {
    let cachedAsset;
    if (isStaticAsset) {
      cachedAsset = await caches.match(event.request);
    }
    return cachedAsset || fetchAndCache(event.request);
  })());
});
