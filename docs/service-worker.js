const m = [
  "/_app/immutable/chunks/0-2c3b3d68.js",
  "/_app/immutable/chunks/1-ff9c490e.js",
  "/_app/immutable/chunks/2-94a1d0f6.js",
  "/_app/immutable/chunks/3-7868a6f4.js",
  "/_app/immutable/assets/HTMLPreview-0d24e5da.css",
  "/_app/immutable/chunks/HTMLPreview-958abe03.js",
  "/_app/immutable/chunks/_layout-da46b06b.js",
  "/_app/immutable/chunks/index-44df08c7.js",
  "/_app/immutable/chunks/singletons-b6a05648.js",
  "/_app/immutable/chunks/stores-500e7bc6.js",
  "/_app/immutable/start-62a28b67.js",
  "/_app/immutable/components/error.svelte-a7192f92.js",
  "/_app/immutable/assets/_layout-6748d0a2.css",
  "/_app/immutable/modules/pages/_layout.js-9cbb603b.js",
  "/_app/immutable/components/pages/_layout.svelte-3df27be0.js",
  "/_app/immutable/assets/_page-dfa854c9.css",
  "/_app/immutable/components/pages/_page.svelte-fc44449c.js",
  "/_app/immutable/components/pages/channel/_page.svelte-a827bf54.js"
], h = [
  "/.nojekyll",
  "/favicon.png",
  "/logo_512.png",
  "/manifest.json"
], o = "1683156712798", i = `cache_${o}`, p = m.concat(h), r = new Set(p);
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
      for (const a of s)
        a !== i && await caches.delete(a);
      self.clients.claim();
    }).catch(console.error)
  );
});
async function u(e) {
  const s = await caches.open(`offline_${o}`);
  try {
    const a = await fetch(e);
    return s.put(e, a.clone()), a;
  } catch (a) {
    const t = await s.match(e);
    if (t)
      return t;
    throw a;
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.protocol.startsWith("http"), t = s.hostname === self.location.hostname && s.port !== self.location.port, c = s.host === self.location.host, n = c && r.has(s.pathname), l = e.request.cache === "only-if-cached" && !n;
  a && c && !t && !l && e.respondWith(
    (async () => n && await caches.match(e.request) || u(e.request))()
  );
});
