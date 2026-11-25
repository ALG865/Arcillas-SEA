/* Funciona sin conexión: guarda la web y las imágenes que se van viendo. */
var CACHE = "sea-v121";
var BASE = ["./","index.html","estilo.css","datos.js","aportaciones.js","tecnicas-nuevas.js","afines.js","geologia.js","geo-refs.js","otras.js","datos-interes.js","evolucion.js","destacados.js","centros.js","fotos.js","juntas.js","palmares.js","datos-mapa.js","datos-mundo.js","sea.js","sea-textos.js","glosario.js","docs.js","vendor-three.min.js","modelos3d.js","app.js","icono-192.png","logo-sea.png","logo-sea-negativo.png","noticias.js","publicaciones.js","manifest.webmanifest","img/lista.json","fuentes-tipo/instrument-sans-latin-400-normal.woff2","fuentes-tipo/instrument-sans-latin-500-normal.woff2","fuentes-tipo/instrument-sans-latin-600-normal.woff2"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(BASE).then(function () {
      return fetch("img/lista.json").then(function (r) { return r.json(); }).then(function (l) { return c.addAll(l); }).catch(function () {});
    });
  }));
  self.skipWaiting();
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  var url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  var esCodigo = /\.(html|js|css|json|webmanifest)$|\/$/.test(url.pathname);
  if (esCodigo) {
    // red primero, para recibir las actualizaciones; caché si no hay conexión
    e.respondWith(fetch(e.request, { cache: "no-cache" }).then(function (r) {
      var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copia); }); return r;
    }).catch(function () { return caches.match(e.request); }));
  } else {
    e.respondWith(caches.match(e.request).then(function (h) {
      return h || fetch(e.request).then(function (r) {
        if (r.ok) { var copia = r.clone(); caches.open(CACHE).then(function (c) { c.put(e.request, copia); }); }
        return r;
      });
    }));
  }
});
