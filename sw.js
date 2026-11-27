/* Funciona sin conexión: guarda la web y las imágenes que se van viendo. */
var CACHE = "sea-v130";
var BASE = ["./","index.html","1-FIJO/programa/estilo.css","2-ACTUALIZABLE/datos.js","3-AUTOMATICO/aportaciones.js","2-ACTUALIZABLE/tecnicas-nuevas.js","2-ACTUALIZABLE/afines.js","2-ACTUALIZABLE/geologia.js","3-AUTOMATICO/geo-refs.js","3-AUTOMATICO/otras.js","2-ACTUALIZABLE/datos-interes.js","2-ACTUALIZABLE/evolucion.js","2-ACTUALIZABLE/destacados.js","2-ACTUALIZABLE/ajustes-rankings.js","2-ACTUALIZABLE/centros.js","2-ACTUALIZABLE/fotos.js","2-ACTUALIZABLE/juntas.js","2-ACTUALIZABLE/palmares.js","2-ACTUALIZABLE/datos-mapa.js","2-ACTUALIZABLE/datos-mundo.js","2-ACTUALIZABLE/sea.js","2-ACTUALIZABLE/sea-textos.js","2-ACTUALIZABLE/glosario.js","2-ACTUALIZABLE/docs.js","1-FIJO/archivo-historico/archivo.js","1-FIJO/programa/vendor-three.min.js","1-FIJO/programa/modelos3d.js","1-FIJO/programa/app.js","icono-192.png","1-FIJO/programa/logo-sea.png","1-FIJO/programa/logo-sea-negativo.png","2-ACTUALIZABLE/noticias.js","3-AUTOMATICO/publicaciones.js","manifest.webmanifest","2-ACTUALIZABLE/lista-imagenes.json","1-FIJO/programa/fuentes-tipo/instrument-sans-latin-400-normal.woff2","1-FIJO/programa/fuentes-tipo/instrument-sans-latin-500-normal.woff2","1-FIJO/programa/fuentes-tipo/instrument-sans-latin-600-normal.woff2"];
self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return c.addAll(BASE).then(function () {
      return fetch("2-ACTUALIZABLE/lista-imagenes.json").then(function (r) { return r.json(); }).then(function (l) { return c.addAll(l); }).catch(function () {});
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
