const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), h = [
  s + "/_app/immutable/entry/app.70c4c452.js",
  s + "/_app/immutable/assets/0.abdbdac9.css",
  s + "/_app/immutable/nodes/0.5ae73821.js",
  s + "/_app/immutable/nodes/1.8e8ad9b1.js",
  s + "/_app/immutable/assets/2.dfa854c9.css",
  s + "/_app/immutable/nodes/2.dfaa40b7.js",
  s + "/_app/immutable/nodes/3.cc7ef865.js",
  s + "/_app/immutable/assets/HTMLPreview.0d24e5da.css",
  s + "/_app/immutable/chunks/HTMLPreview.47874c98.js",
  s + "/_app/immutable/chunks/index.a38b3e2d.js",
  s + "/_app/immutable/chunks/singletons.d3f61ab1.js",
  s + "/_app/immutable/chunks/stores.d306f65a.js",
  s + "/_app/immutable/entry/start.faf4cd9b.js"
], m = [
  s + "/.nojekyll",
  s + "/favicon.png",
  s + "/logo_512.png",
  s + "/manifest.json"
], i = "1695055356819", l = `cache_${i}`, r = h.concat(m), d = new Set(r);
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(l).then((t) => t.addAll(r)).then(() => {
      self.skipWaiting();
    }).catch(console.error)
  );
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (t) => {
      for (const a of t)
        a !== l && await caches.delete(a);
      self.clients.claim();
    }).catch(console.error)
  );
});
async function u(e) {
  const t = await caches.open(`offline_${i}`);
  try {
    const a = await fetch(e);
    return t.put(e, a.clone()), a;
  } catch (a) {
    const c = await t.match(e);
    if (c)
      return c;
    throw a;
  }
}
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const t = new URL(e.request.url), a = t.protocol.startsWith("http"), c = t.hostname === self.location.hostname && t.port !== self.location.port, n = t.host === self.location.host, o = n && d.has(t.pathname), p = e.request.cache === "only-if-cached" && !o;
  a && n && !c && !p && e.respondWith(
    (async () => o && await caches.match(e.request) || u(e.request))()
  );
});
