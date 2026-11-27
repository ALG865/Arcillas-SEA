"""Genera .htaccess y 404.html con las redirecciones de la web antigua (WordPress) a la nueva.
Uso: python3 tools/redirecciones.py ruta/media.json ruta/ficheros.json  (listas de la web antigua)"""
import json, os, re, sys, unicodedata, urllib.parse
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def norm(s):
    s = unicodedata.normalize("NFKD", urllib.parse.unquote(s)).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", re.sub(r"\.(pdf|docx?|zip)$", "", s))
# Páginas: dirección antigua -> sección nueva (es) ; las /en/ llevan ?lang=en
P = {
 "/clay-2027/": "reuniones", "/galeria/": "fotos", "/premios/": "premios", "/documentos/": "publicaciones",
 "/publicaciones/": "publicaciones", "/reuniones-cientificas/": "reuniones", "/inscripcion/": "socio",
 "/junta-directiva/": "junta", "/sobre-sea/historia/": "historia", "/sobre-sea/estatutos/": "estatutos",
 "/sobre-sea/contacto/": "sociedad", "/sobre-sea/": "sociedad", "/analisis-interlaboratorio/": "publicaciones",
 "/area-privada/": "semblanza/martin-vivaldi", "/hoja_inscripcion_sea-2022/": "socio", "/hoja_inscripcion_sea-2022_formulario-pdf/": "socio", "/biografias/": "semblanzas", "/category/biografias/": "semblanzas",
 "/premios/premio-sea-de-fotografia-cientifica/": "premios", "/premios/premios-martin-vivaldi-y-jose-maria-serratosa-2027/": "premios",
 "/premios/ayudas-para-la-participacion-activa-en-reuniones-cientificas/": "premios", "/premios/jovenes-investigadores/": "premios",
 "/premios/iniciacion-a-la-investigacion-en-arcillas/": "premios", "/premios/otros-premios-internacionales/": "premios",
 "/premios/premio-martin-vivaldi/": "premios", "/premios/premio-jose-maria-serratosa/": "premios",
 "/biografias/semblanza-de-juan-luis-martin-vivaldi/": "semblanza/martin-vivaldi", "/biografias/semblanza-de-jose-maria-serratosa/": "semblanza/serratosa",
 "/biografias/semblanza-de-emilio-galan-huertos/": "semblanza/galan", "/biografias/semblanza-jose-antonio-rausell-colom-1932-2018/": "semblanza/rausell",
 "/biografias/semblanza-fernando-veniale-1929-2018/": "semblanza/veniale", "/biografias/semblanza-dr-douglas-m-c-macewan-1917-2000/": "semblanza/macewan",
}
EN = {
 "/en/": "inicio", "/en/galery/": "fotos", "/en/awards/": "premios", "/en/publications/": "publicaciones",
 "/en/interlaboratory-analysis/": "publicaciones", "/en/scientific-meetings/": "reuniones", "/en/inscription/": "socio",
 "/en/about-sea/contact/": "sociedad", "/en/about-sea/statutes/": "estatutos", "/en/about-sea/history/": "historia",
 "/en/about-sea/": "sociedad", "/en/board-of-directors/": "junta", "/en/biographies/": "semblanzas", "/en/category/biographies/": "semblanzas",
 "/en/awards/martin-vivaldi-and-jose-maria-serratosa-awards-2027/": "premios", "/en/awards/martin-vivaldi-award/": "premios",
 "/en/awards/other-awards-and-distinctions/": "premios", "/en/awards/sea-prize-for-scientific-photography/": "premios",
 "/en/awards/young-researchers/": "premios", "/en/awards/initiation-in-clay-research/": "premios",
 "/en/biographies/juan-luis-martin-vivaldi-profile/": "semblanza/martin-vivaldi", "/en/biographies/jose-m-serratosa-1924-2012/": "semblanza/serratosa",
 "/en/biographies/prof-emilio-galan-huertos-1932-2018-profile/": "semblanza/galan", "/en/biographies/dr-jose-antonio-rausell-colom-1932-2018-profile/": "semblanza/rausell",
 "/en/biographies/prof-fernando-veniale-1929-2019-profile/": "semblanza/veniale", "/en/biographies/dr-douglas-m-c-macewan-1917-2000-profile/": "semblanza/macewan",
}
# Documentos: archivo antiguo -> archivo nuevo
nuevos = {}
for carpeta in ("1-FIJO/archivo-historico", "2-ACTUALIZABLE/documentos"):
    for f in os.listdir(os.path.join(BASE, carpeta)):
        if f.lower().endswith((".pdf", ".doc", ".docx")): nuevos[norm(f)] = carpeta + "/" + f
urls = set()
for fichero in sys.argv[1:]:
    for x in json.load(open(fichero)): urls.add(x["url"])
D = {}
for u in sorted(urls):
    path = urllib.parse.urlparse(u).path
    if not re.search(r"\.(pdf|docx?)$", path, re.I): continue
    k = norm(os.path.basename(path))
    hit = nuevos.get(k) or next((v for kk, v in nuevos.items() if kk.startswith(k) or k.startswith(kk)), None)
    D[urllib.parse.unquote(path)] = hit
EXTRA = {"/wp-content/uploads/2022/04/XXVII-Reunión-de-la-SEA_Madrid-2021_Libro-de-resúmenes-SEA-2021.pdf": "1-FIJO/archivo-historico/Libro-de-resumenes-SEA-2021.pdf",
 "/wp-content/uploads/2022/05/hoja_inscripcion_SEA-2022_formulario-pdf.pdf": "2-ACTUALIZABLE/documentos/Ficha-inscripcion-SEA.pdf",
 "/wp-content/uploads/2022/05/hoja_inscripcion_SEA-2022.doc": "2-ACTUALIZABLE/documentos/Ficha-inscripcion-SEA.pdf",
 "/wp-content/uploads/2018/01/sea_hoja_inscripcion.pdf": "2-ACTUALIZABLE/documentos/Ficha-inscripcion-SEA.pdf",
 "/wp-content/uploads/2018/01/sea_hoja_inscripcion-1.doc": "2-ACTUALIZABLE/documentos/Ficha-inscripcion-SEA.pdf"}
for k, v in EXTRA.items():
    if os.path.exists(os.path.join(BASE, v)): D[k] = v
docs = {k: v for k, v in D.items() if v}
# .htaccess (Apache, mod_rewrite)
L = ["# Redirecciones de la web antigua de la SEA (WordPress) a la nueva. Generado por tools/redirecciones.py.",
     "# No hace falta tocarlo. Si el servidor no es Apache, sirve igualmente 404.html.",
     "ErrorDocument 404 /404.html", "<IfModule mod_rewrite.c>", "RewriteEngine On",
     "# Enlaces cortos antiguos (?p=123, ?page_id=45)", "RewriteCond %{QUERY_STRING} ^(p|page_id)=\\d+", "RewriteRule ^$ /? [R=301,L]"]
def rx(p): return "^" + re.escape(p.strip("/")).replace("\\-", "-").replace("\\/", "/") + "/?$"
for p, h in sorted(P.items(), key=lambda x: -len(x[0])): L.append(f"RewriteRule {rx(p)} /#{h} [R=301,NE,L]")
for p, h in sorted(EN.items(), key=lambda x: -len(x[0])): L.append(f"RewriteRule {rx(p)} /?lang=en#{h} [R=301,NE,L]")
for p, v in sorted(docs.items()): L.append(f"RewriteRule {rx(p)} /{v} [R=301,L]")
L += ["# Cualquier otra página o archivo antiguo", "RewriteRule ^en/ /?lang=en [R=301,L]",
      "RewriteRule ^wp-content/.*\\.(pdf|docx?)$ /#publicaciones [R=301,NE,L]", "RewriteRule ^wp-(content|admin|includes|login)  / [R=301,L]",
      "RewriteRule ^(biografias|category|premios|sobre-sea)/ /#inicio [R=301,NE,L]", "</IfModule>"]
open(os.path.join(BASE, ".htaccess"), "w").write("\n".join(L) + "\n")
# 404.html: misma tabla en JavaScript (para servidores sin .htaccess)
tabla = {p: "/#" + h for p, h in P.items()}
tabla.update({p: "/?lang=en#" + h for p, h in EN.items()})
tabla.update({p: "/" + v for p, v in docs.items()})
html = """<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Sociedad Española de Arcillas</title>
<meta name="robots" content="noindex"><meta name="viewport" content="width=device-width,initial-scale=1">
<script>
var T=%s;
(function(){ var p=decodeURIComponent(location.pathname), b="";
 if(p.indexOf("/Arcillas-SEA/")===0){ b="/Arcillas-SEA"; p=p.slice(b.length); } /* copia de prueba en GitHub */
 if(p.slice(-1)!=="/"&&!/\\.[a-z]+$/i.test(p)) p+="/";
 var d=T[p]||(/^\\/en\\//.test(p)?"/?lang=en":/\\.(pdf|docx?)$/i.test(p)?"/#publicaciones":"/");
 location.replace(b+d); })();
</script></head><body style="font-family:sans-serif;padding:2rem">
<p>Esta página ha cambiado de dirección. <a href="/">Ir a la web de la Sociedad Española de Arcillas</a>.</p>
<p lang="en">This page has moved. <a href="/?lang=en">Go to the Spanish Clay Society website</a>.</p></body></html>
""" % json.dumps(tabla, ensure_ascii=False, indent=0)
open(os.path.join(BASE, "404.html"), "w").write(html)
print("páginas", len(P) + len(EN), "documentos", len(docs), "sin equivalente", len(D) - len(docs))
for k, v in D.items():
    if not v: print("  sin equivalente:", k)
