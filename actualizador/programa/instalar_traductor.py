"""Descarga el modelo de traducción español → inglés de Argos Translate (una sola vez)."""
import io, json, os, sys, urllib.request, zipfile
AQUI = os.path.dirname(os.path.abspath(__file__))
DEST = os.path.join(AQUI, "modelo-es-en")
sys.path.insert(0, AQUI)
import traductor
if traductor.disponible():
    print("    El traductor ya estaba instalado.")
    sys.exit(0)
indice = "https://raw.githubusercontent.com/argosopentech/argospm-index/main/index.json"
try:
    pk = [p for p in json.load(urllib.request.urlopen(indice, timeout=60)) if p["from_code"] == "es" and p["to_code"] == "en"]
    url = pk[0]["links"][0]
except Exception:
    url = "https://argos-net.com/v1/translate-es_en-1_9.argosmodel"
print("    Descargando", url)
datos = urllib.request.urlopen(url, timeout=600).read()
os.makedirs(DEST, exist_ok=True)
zipfile.ZipFile(io.BytesIO(datos)).extractall(DEST)
if not traductor.disponible():
    print("    No se pudo instalar el traductor.")
    sys.exit(1)
print("    Prueba:", traductor.traducir("La Sociedad Española de Arcillas celebra su Reunión Científica en Granada."))
