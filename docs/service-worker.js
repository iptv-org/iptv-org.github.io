const m = [
  "/_app/immutable/chunks/0-2c3b3d68.js",
  "/_app/immutable/chunks/1-ff9c490e.js",
  "/_app/immutable/chunks/2-f837945d.js",
  "/_app/immutable/chunks/3-694c419c.js",
  "/_app/immutable/assets/HTMLPreview-0d24e5da.css",
  "/_app/immutable/chunks/HTMLPreview-8fcd572e.js",
  "/_app/immutable/chunks/_layout-da46b06b.js",
  "/_app/immutable/chunks/index-44df08c7.js",
  "/_app/immutable/chunks/singletons-b6a05648.js",
  "/_app/immutable/chunks/stores-500e7bc6.js",
  "/_app/immutable/start-37db626e.js",
  "/_app/immutable/components/error.svelte-a7192f92.js",
  "/_app/immutable/assets/_layout-6748d0a2.css",
  "/_app/immutable/modules/pages/_layout.js-9cbb603b.js",
  "/_app/immutable/components/pages/_layout.svelte-3df27be0.js",
  "/_app/immutable/assets/_page-dfa854c9.css",
  "/_app/immutable/components/pages/_page.svelte-8498c11e.js",
  "/_app/immutable/components/pages/channel/_page.svelte-68758a63.js"
], h = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
], o = "1678195849559", i = `cache_${o}`, p = m.concat(h), r = new Set(p);
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(i).then((s) => s.addAll(p)).then(() => {
      self.skipWaiting();
    }).catch(console.error)
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const t of s)
        t !== i && await caches.delete(t);
      self.clients.claim();
    }).catch(console.error)
  );
});
async function u(e) {
  const s = await caches.open(`offline_${o}`);
  try {
    const t = await fetch(e);
    return s.put(e, t.clone()), t;
  } catch (t) {
    const a = await s.match(e);
    if (a)
      return a;
    throw t;
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), t = s.protocol.startsWith("http"), a = s.hostname === self.location.hostname && s.port !== self.location.port, c = s.host === self.location.host, n = c && r.has(s.pathname), l = e.request.cache === "only-if-cached" && !n;
  t && c && !a && !l && e.respondWith(
    (async () => n && await caches.match(e.request) || u(e.request))()
  );
});
