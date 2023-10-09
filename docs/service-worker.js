const s = /* @__PURE__ */ location.pathname.split("/").slice(0, -1).join("/"), h = [
  s + "/_app/immutable/entry/app.9b602d9d.js",
  s + "/_app/immutable/assets/0.039b7214.css",
  s + "/_app/immutable/nodes/0.1654e388.js",
  s + "/_app/immutable/nodes/1.681ee3dc.js",
  s + "/_app/immutable/assets/2.dfa854c9.css",
  s + "/_app/immutable/nodes/2.d7f1ad4d.js",
  s + "/_app/immutable/nodes/3.5f07a693.js",
  s + "/_app/immutable/assets/EditButton.0d24e5da.css",
  s + "/_app/immutable/chunks/EditButton.36510adc.js",
  s + "/_app/immutable/chunks/index.33dbc0d8.js",
  s + "/_app/immutable/chunks/singletons.8071cb2e.js",
  s + "/_app/immutable/chunks/stores.a09c62bd.js",
  s + "/_app/immutable/entry/start.d80b9438.js"
], d = [
  s + "/.nojekyll",
  s + "/favicon.png",
  s + "/logo_512.png",
  s + "/manifest.json"
], i = "1696824804235", l = `cache_${i}`, p = h.concat(d), m = new Set(p);
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
async function u(t) {
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
  const e = new URL(t.request.url), a = e.protocol.startsWith("http"), c = e.hostname === self.location.hostname && e.port !== self.location.port, n = e.host === self.location.host, o = n && m.has(e.pathname), r = t.request.cache === "only-if-cached" && !o;
  a && n && !c && !r && t.respondWith(
    (async () => o && await caches.match(t.request) || u(t.request))()
  );
});
