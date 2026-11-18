"""Descarga el contenido de sea-arcillas.es mediante la API de WordPress, sus PDF e imágenes,
y las estructuras CIF de AMCSD. Se ejecuta en GitHub Actions dentro de la rama datos-fuentes."""
import json, os, re, time, urllib.request, urllib.parse, glob
UA = {"User-Agent": "Mozilla/5.0 (compatible; SEA-web-divulgacion)"}
def get(url, timeout=90):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout)
def guarda(url, dst, maxmb=40):
    if os.path.exists(dst): return True
    try:
        r = get(url, 180); n = int(r.headers.get("Content-Length") or 0)
        if n and n > maxmb * 2**20: print("GRANDE", n >> 20, "MB", url); return False
        data = r.read()
        if len(data) > maxmb * 2**20: print("GRANDE", len(data) >> 20, "MB", url); return False
        open(dst, "wb").write(data); return True
    except Exception as e:
        print("FALTA", url, e); return False

# 1. WordPress: páginas, entradas, categorías, medios
B = "https://sea-arcillas.es/wp-json/wp/v2/"
for tipo in ["pages", "posts", "categories", "tags", "media", "menu-items"]:
    todo, p = [], 1
    while True:
        try:
            r = get(f"{B}{tipo}?per_page=100&page={p}")
            lote = json.load(r)
        except Exception as e:
            print("fin", tipo, p, e); break
        if not isinstance(lote, list) or not lote: break
        todo += lote; p += 1; time.sleep(0.5)
        if p > 60: break
    json.dump(todo, open(f"bajado/sea/json/{tipo}.json", "w"), ensure_ascii=False)
    print(tipo, len(todo))
# portada y menú (HTML)
for nombre, url in [("portada.html", "https://sea-arcillas.es/"), ("en.html", "https://sea-arcillas.es/en/")]:
    guarda(url, f"bajado/sea/{nombre}")

# 2. Enlaces a PDF e imágenes en todo el contenido
urls = set()
for f in glob.glob("bajado/sea/json/*.json") + glob.glob("bajado/sea/*.html"):
    s = open(f, encoding="utf-8", errors="ignore").read()
    for u in re.findall(r'https?:\\?/\\?/(?:www\.)?sea-arcillas\.es[^"\'\s<>)]+', s):
        u = u.replace("\\/", "/")
        if re.search(r'\.(pdf|jpe?g|png|webp|gif)$', u, re.I): urls.add(u)
try:
    for m in json.load(open("bajado/sea/json/media.json")):
        if m.get("source_url"): urls.add(m["source_url"])
except Exception: pass
lista = []
for u in sorted(urls):
    ext = u.rsplit(".", 1)[1].lower()
    carpeta = "pdf" if ext == "pdf" else "img"
    # en imágenes, evitar miniaturas -150x150 etc. si existe el original
    if carpeta == "img" and re.search(r'-\d+x\d+\.\w+$', u): continue
    nombre = urllib.parse.unquote(u.split("/wp-content/uploads/")[-1]).replace("/", "__")
    ok = guarda(u, f"bajado/sea/{carpeta}/{nombre}", 40 if carpeta == "pdf" else 15)
    lista.append({"url": u, "fichero": f"{carpeta}/{nombre}", "ok": ok})
    time.sleep(0.3)
json.dump(lista, open("bajado/sea/ficheros.json", "w"), ensure_ascii=False, indent=0)
print("ficheros", len(lista), "ok", sum(x["ok"] for x in lista))

# 3. CIF de AMCSD
for f in glob.glob("bajado/amcsd_*.html"):
    s = open(f, encoding="latin-1").read()
    ids = sorted(set(re.findall(r'download\.php\?id=(\d+)\.cif&(?:amp;)?down=cif', s)))
    m = f.split("amcsd_")[1][:-5]
    for i in ids[:12]:
        guarda(f"https://rruff.geo.arizona.edu/AMS/download.php?id={i}.cif&down=cif", f"bajado/cif/{m}_{i}.cif", 5)
        time.sleep(0.4)
print("cif", len(glob.glob("bajado/cif/*.cif")))
