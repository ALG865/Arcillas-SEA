"""Actualiza el número de citas (OpenAlex) de los trabajos de referencia de la web:
aportaciones.js (aplicaciones), geo-refs.js (geología) y otras.js (otras contribuciones españolas).
Solo cambia el campo de citas; no añade ni quita trabajos. Uso: python tools/citas.py"""
import json, os, re, time, urllib.request, urllib.parse

MAIL = "sea.arcillas.web@gmail.com"
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FICHEROS = [("aportaciones.js", "APORTES"), ("geo-refs.js", "GEO_REFS"), ("otras.js", "OTRAS_ES")]


def get(url):
    for intento in range(5):
        try:
            time.sleep(0.3)
            with urllib.request.urlopen(url + "&mailto=" + MAIL, timeout=60) as r:
                return json.load(r)
        except Exception as e:
            print("   reintento", intento + 1, e)
            time.sleep(4 * (intento + 1))
    return {"results": []}


def citas_por_doi(dois):
    out = {}
    dois = sorted(set(d.lower() for d in dois if d))
    for i in range(0, len(dois), 40):
        lote = dois[i:i + 40]
        filtro = "doi:" + "|".join("https://doi.org/" + d for d in lote)
        d = get("https://api.openalex.org/works?per-page=50&select=doi,cited_by_count&filter=" + urllib.parse.quote(filtro, safe=":|/"))
        for w in d.get("results", []):
            doi = (w.get("doi") or "").lower().replace("https://doi.org/", "")
            if doi:
                out[doi] = w.get("cited_by_count") or 0
    return out


def main():
    total_cambios = 0
    for nombre, var in FICHEROS:
        ruta = os.path.join(RAIZ, nombre)
        if not os.path.exists(ruta):
            print("  (no está", nombre + ")")
            continue
        txt = open(ruta, encoding="utf-8").read()
        m = re.search(r"window\." + var + r"\s*=\s*", txt)
        if not m:
            print("  formato no reconocido en", nombre)
            continue
        cab = txt[:m.end()]
        datos = json.loads(txt[m.end():].strip().rstrip(";"))
        items = [z for sec in datos.values() for z in sec]
        nuevas = citas_por_doi([z.get("doi", "") for z in items])
        cambios = 0
        for z in items:
            c = nuevas.get((z.get("doi") or "").lower())
            if c is not None and c > z.get("c", 0):
                z["c"] = c
                cambios += 1
        open(ruta, "w", encoding="utf-8").write(cab + json.dumps(datos, ensure_ascii=False) + ";\n")
        print("  %s: %d trabajos, %d con citas actualizadas" % (nombre, len(items), cambios))
        total_cambios += cambios
    return total_cambios


if __name__ == "__main__":
    main()
