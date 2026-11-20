/* Versión de prueba del panel: todo se guarda en este navegador (localStorage). */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  function lee(k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } }
  function guarda(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function h(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function aviso(t, err) { var a = $("#aviso"), e = $("#error"); a.classList.add("oculto"); e.classList.add("oculto"); var x = err ? e : a; x.textContent = t; x.classList.remove("oculto"); scrollTo(0, 0); }
  var N = lee("sea-demo-noticias", null) || (window.NOTICIAS || []).slice();
  var S = lee("sea-demo-socios", null);

  function hoy() { return new Date().toISOString().slice(0, 10); }
  function verPag(p) {
    ["noticias", "socios", "auto"].forEach(function (k) { $("#p-" + k).classList.toggle("oculto", k !== p); document.querySelector('nav a[data-p="' + k + '"]').classList.toggle("activo", k === p); });
  }
  function entrar() { $("#entrada").classList.add("oculto"); $("#panel").classList.remove("oculto"); verPag((location.hash || "#noticias").slice(1)); pintaN(); cargaSocios(); }
  if (sessionStorage.getItem("sea-demo-dentro")) entrar();
  $("#fentrar").onsubmit = function (e) { e.preventDefault(); if ($("#fentrar input").value !== "SEA") { $("#mal").classList.remove("oculto"); return; } sessionStorage.setItem("sea-demo-dentro", "1"); entrar(); };
  $("#salir").onclick = function (e) { e.preventDefault(); sessionStorage.removeItem("sea-demo-dentro"); location.reload(); };
  $("#reiniciar").onclick = function (e) { e.preventDefault(); if (!confirm("¿Borrar todos los cambios de la prueba?")) return; localStorage.removeItem("sea-demo-noticias"); localStorage.removeItem("sea-demo-socios"); location.reload(); };
  window.onhashchange = function () { verPag(location.hash.slice(1) || "noticias"); };

  /* Noticias */
  var F = $("#fnot");
  function limpia() { F.reset(); F.i.value = ""; F.fecha.value = hoy(); $("#lquitar").classList.add("oculto"); $("#tn").textContent = "Nueva noticia, convocatoria o congreso"; $("#bpub").textContent = "Publicar"; }
  function pintaN() {
    var t = "<tr><th>Fecha</th><th>Tipo</th><th>Título</th><th></th></tr>";
    N.forEach(function (n, i) { t += "<tr><td>" + h(n.fecha) + "</td><td>" + h(n.tipo) + "</td><td>" + h(n.es.n) + '</td><td><a href="#" data-ed="' + i + '">Modificar</a> <button class="claro" data-bo="' + i + '">Borrar</button></td></tr>'; });
    $("#lnot").innerHTML = t;
  }
  limpia();
  function leeFichero(f) { return new Promise(function (ok, mal) { var r = new FileReader(); r.onload = function () { ok(r.result); }; r.onerror = mal; r.readAsDataURL(f); }); }
  F.onsubmit = async function (e) {
    e.preventDefault();
    var les = F.lar.value.trim();
    var n = { tipo: F.tipo.value, fecha: F.fecha.value, plazo: F.plazo.value, es: { n: F.ten.value.trim(), t: F.tex.value.trim(), l: les },
      en: { n: F.tin.value.trim() || F.ten.value.trim(), t: F.txi.value.trim() || F.tex.value.trim(), l: F.lai.value.trim() || les }, url: F.url.value.trim(), img: "", doc: "" };
    var prev = F.i.value !== "" ? N[+F.i.value] : null;
    if (prev && !F.quitar.checked) { n.img = prev.img || ""; n.doc = prev.doc || ""; }
    var f = F.adj.files[0];
    if (f) { if (f.size > 3 * 1048576) return aviso("En la prueba el fichero no puede pasar de 3 MB (en el panel real, 15 MB).", true);
      var d = await leeFichero(f); if (/pdf$/i.test(f.name)) n.doc = d; else n.img = d; }
    if (prev) N[+F.i.value] = n; else N.push(n);
    N.sort(function (a, b) { return a.fecha < b.fecha ? 1 : -1; });
    try { localStorage.setItem("sea-demo-noticias", JSON.stringify(N)); } catch (err) { return aviso("El navegador no tiene espacio para guardar el fichero en la prueba; prueba con uno más pequeño.", true); }
    pintaN(); limpia();
    aviso("Noticia guardada y publicada. Pulsa «Ver la web» para verla en Noticias y en la portada.");
  };
  $("#lnot").onclick = function (e) {
    var ed = e.target.getAttribute("data-ed"), bo = e.target.getAttribute("data-bo");
    if (ed !== null) {
      e.preventDefault(); var n = N[+ed]; F.i.value = ed; F.tipo.value = n.tipo; F.fecha.value = n.fecha; F.plazo.value = n.plazo || "";
      F.ten.value = n.es.n; F.tex.value = n.es.t; F.lar.value = n.es.l || ""; F.lai.value = (n.en.l && n.en.l !== n.es.l) ? n.en.l : ""; F.url.value = n.url || "";
      $("#lquitar").classList.toggle("oculto", !(n.img || n.doc)); F.tin.value = n.en.n !== n.es.n ? n.en.n : ""; F.txi.value = n.en.t !== n.es.t ? n.en.t : "";
      $("#tn").textContent = "Modificar noticia"; $("#bpub").textContent = "Guardar cambios"; scrollTo(0, 0);
    }
    if (bo !== null && confirm("¿Borrar esta noticia?")) { N.splice(+bo, 1); guarda("sea-demo-noticias", N); pintaN(); aviso("Noticia borrada."); }
  };

  /* Trabajos propuestos (ejemplos de la prueba real) */
  var PR = [
    { s: "Catálisis", y: 2001, t: "A study of the surface acidity of acid-treated montmorillonite clay catalysts", c: 155, socio: 1 },
    { s: "Absorbentes", y: 2010, t: "Removal of dyes from wastewaters by adsorption on sepiolite and Pansil", c: 71, socio: 1 },
    { s: "Azulejos", y: 2006, t: "An empirical study of lean production in the ceramic tile industry in Spain", c: 241 },
    { s: "Agricultura", y: 2020, t: "Optimization and validation of a QuEChERS-based method for the simultaneous environmental monitoring of 218 pesticide residues in clay loam soil", c: 144 }
  ];
  function pintaP() {
    $("#nprop").textContent = PR.length + " trabajos pendientes";
    $("#lprop").innerHTML = PR.length ? "<tr><th>Sección</th><th>Trabajo</th><th>Citas</th><th></th></tr>" + PR.map(function (x, i) {
      return "<tr><td>" + h(x.s) + "</td><td>" + "(" + x.y + ") " + h(x.t) + (x.socio ? "<br><small>Autor socio de la SEA</small>" : "") + "</td><td>" + x.c +
        '</td><td style="white-space:nowrap"><button data-ac="' + i + '">Aceptar</button> <button class="claro" data-de="' + i + '">Descartar</button></td></tr>';
    }).join("") : "";
  }
  $("#lprop").onclick = function (e) {
    var ac = e.target.getAttribute("data-ac"), de = e.target.getAttribute("data-de");
    if (ac !== null) { PR.splice(+ac, 1); aviso("Trabajo aceptado y publicado en su sección (en la prueba no se añade a la web)."); }
    else if (de !== null) { PR.splice(+de, 1); aviso("Trabajo descartado; no se volverá a proponer."); } else return;
    pintaP();
  };
  pintaP();

  /* Socios */
  function pintaS() {
    $("#nsoc").textContent = S.length;
    $("#lsoc").innerHTML = "<tr><th>Nombre</th><th>Centro</th></tr>" + S.map(function (s) { return "<tr><td>" + h(s.n) + "</td><td>" + h((s.centro || []).join(", ")) + "</td></tr>"; }).join("");
  }
  function cargaSocios() { if (S) return pintaS(); fetch("socios.json").then(function (r) { return r.json(); }).then(function (d) { S = d; pintaS(); }).catch(function () { S = []; pintaS(); }); }
  function norma(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim(); }
  function filasCSV(txt) {
    var l = txt.replace(/^﻿/, "").split(/\r\n|\r|\n/).filter(function (x) { return x.trim(); });
    var sep = l[0].indexOf("\t") >= 0 ? "\t" : (l[0].split(";").length >= l[0].split(",").length ? ";" : ",");
    return l.map(function (x) { return x.split(sep).map(function (c) { return c.replace(/^"|"$/g, "").trim(); }); });
  }
  /* Lectura mínima de un .xlsx (zip) con DecompressionStream */
  async function filasXLSX(buf) {
    var dv = new DataView(buf), u8 = new Uint8Array(buf), fich = {}, p = 0;
    var eocd = u8.length - 22; while (eocd > 0 && dv.getUint32(eocd, true) !== 0x06054b50) eocd--;
    var n = dv.getUint16(eocd + 10, true); p = dv.getUint32(eocd + 16, true);
    for (var k = 0; k < n; k++) {
      var met = dv.getUint16(p + 10, true), tam = dv.getUint32(p + 20, true), ln = dv.getUint16(p + 28, true), le = dv.getUint16(p + 30, true), lc = dv.getUint16(p + 32, true), off = dv.getUint32(p + 42, true);
      var nom = new TextDecoder().decode(u8.slice(p + 46, p + 46 + ln)); p += 46 + ln + le + lc;
      if (!/sharedStrings|sheet1\.xml$/.test(nom)) continue;
      var ini = off + 30 + dv.getUint16(off + 26, true) + dv.getUint16(off + 28, true), datos = u8.slice(ini, ini + tam);
      fich[nom] = met === 0 ? new TextDecoder().decode(datos) : await new Response(new Blob([datos]).stream().pipeThrough(new DecompressionStream("deflate-raw"))).text();
    }
    var X = function (s) { return new DOMParser().parseFromString(s, "application/xml"); }, comp = [];
    if (fich["xl/sharedStrings.xml"]) Array.from(X(fich["xl/sharedStrings.xml"]).getElementsByTagName("si")).forEach(function (si) { comp.push(Array.from(si.getElementsByTagName("t")).map(function (t) { return t.textContent; }).join("")); });
    var filas = [];
    Array.from(X(fich["xl/worksheets/sheet1.xml"]).getElementsByTagName("row")).forEach(function (r) {
      var f = [];
      Array.from(r.getElementsByTagName("c")).forEach(function (c) {
        var col = 0; (c.getAttribute("r").match(/^[A-Z]+/)[0]).split("").forEach(function (l) { col = col * 26 + l.charCodeAt(0) - 64; });
        var v = c.getElementsByTagName("v")[0], t = c.getAttribute("t");
        f[col - 1] = (t === "s" ? comp[+v.textContent] : t === "inlineStr" ? c.textContent : (v ? v.textContent : "")).trim();
      });
      for (var i = 0; i < f.length; i++) if (f[i] == null) f[i] = "";
      if (f.length) filas.push(f);
    });
    return filas;
  }
  function deFilas(filas) {
    var cab = filas[0].map(norma), col = { nombre: null, ape: null, centro: null };
    cab.forEach(function (c, i) {
      if (col.ape === null && c.indexOf("apellido") >= 0) col.ape = i;
      else if (col.nombre === null && (c.indexOf("nombre") >= 0 || c === "name" || c.indexOf("socio") >= 0)) col.nombre = i;
      else if (col.centro === null && /centro|instituc|universidad|organismo|empresa|afiliac/.test(c)) col.centro = i;
    });
    if (col.nombre !== null || col.ape !== null) filas = filas.slice(1); else col.nombre = 0;
    var ant = {}; (S || []).forEach(function (s) { ant[norma(s.n)] = s; });
    var res = [], vistos = {};
    filas.forEach(function (f) {
      var nom = (f[col.nombre] || "").trim(), ape = col.ape !== null ? (f[col.ape] || "").trim() : "";
      if (!ape && nom.indexOf(",") >= 0) { var q = nom.split(","); ape = q[0].trim(); nom = q.slice(1).join(",").trim(); }
      if (!ape) { var w = nom.split(/\s+/); if (w.length < 2) return; var k = w.length >= 3 ? 2 : 1; ape = w.slice(-k).join(" "); nom = w.slice(0, -k).join(" "); }
      var n = (nom + " " + ape).trim(), c = norma(n); if (!n || vistos[c]) return; vistos[c] = 1;
      var centro = col.centro !== null ? (f[col.centro] || "").trim() : "";
      res.push(ant[c] ? ant[c] : { n: n, centro: centro ? [centro] : [] });
    });
    return res;
  }
  $("#fsoc").onsubmit = async function (e) {
    e.preventDefault(); var f = this.querySelector("input").files[0]; if (!f) return;
    try {
      var filas = /\.xlsx$/i.test(f.name) ? await filasXLSX(await f.arrayBuffer()) : filasCSV(await f.text());
      var nuevo = deFilas(filas);
      if (nuevo.length < 5) return aviso("No se reconocieron nombres en el fichero. La primera fila debe tener los títulos de las columnas (Nombre, Apellidos, Centro).", true);
      var na = (S || []).map(function (s) { return norma(s.n); }), nn = nuevo.map(function (s) { return norma(s.n); });
      var alta = nn.filter(function (x) { return na.indexOf(x) < 0; }).length, baja = na.filter(function (x) { return nn.indexOf(x) < 0; }).length;
      S = nuevo; guarda("sea-demo-socios", S); pintaS(); this.reset();
      aviso("Listado cargado: " + S.length + " socios (" + alta + " nuevos, " + baja + " ya no están). En el panel real, sus publicaciones se actualizarían solas.");
    } catch (err) { aviso("No se pudo leer el fichero. Prueba a guardarlo como .xlsx o .csv.", true); }
  };
})();
