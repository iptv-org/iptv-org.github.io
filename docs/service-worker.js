const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), h = [
  s + "/_app/immutable/entry/app.7582c659.js",
  s + "/_app/immutable/assets/0.86fc99df.css",
  s + "/_app/immutable/nodes/0.73226839.js",
  s + "/_app/immutable/nodes/1.ba1fb5e3.js",
  s + "/_app/immutable/assets/2.dfa854c9.css",
  s + "/_app/immutable/nodes/2.6e6804fa.js",
  s + "/_app/immutable/nodes/3.5e7f212a.js",
  s + "/_app/immutable/assets/EditButton.0d24e5da.css",
  s + "/_app/immutable/chunks/EditButton.5524866c.js",
  s + "/_app/immutable/chunks/index.a38b3e2d.js",
  s + "/_app/immutable/chunks/singletons.56387a19.js",
  s + "/_app/immutable/chunks/stores.69824a18.js",
  s + "/_app/immutable/entry/start.d055ab84.js"
], m = [
  s + "/.nojekyll",
  s + "/favicon.png",
  s + "/logo_512.png",
  s + "/manifest.json"
], i = "1696472885059", l = `cache_${i}`, p = h.concat(m), u = new Set(p);
self.addEventListener("install", (t) => {
  t.waitUntil(
    caches.open(l).then((e) => e.addAll(p)).then(() => {
      self.skipWaiting();
    }).catch(console.error)
  );
});
self.addEventListener("activate", (t) => {
  t.waitUntil(
    caches.keys().then(async (e) => {
      for (const a of e)
        a !== l && await caches.delete(a);
      self.clients.claim();
    }).catch(console.error)
  );
});
async function d(t) {
  const e = await caches.open(`offline_${i}`);
  try {
    const a = await fetch(t);
    return e.put(t, a.clone()), a;
  } catch (a) {
    const c = await e.match(t);
    if (c)
      return c;
    throw a;
  }
}
self.addEventListener("fetch", (t) => {
  if (t.request.method !== "GET" || t.request.headers.has("range"))
    return;
  const e = new URL(t.request.url), a = e.protocol.startsWith("http"), c = e.hostname === self.location.hostname && e.port !== self.location.port, n = e.host === self.location.host, o = n && u.has(e.pathname), r = t.request.cache === "only-if-cached" && !o;
  a && n && !c && !r && t.respondWith(
    (async () => o && await caches.match(t.request) || d(t.request))()
  );
});
