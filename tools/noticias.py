"""Convierte la hoja «SEA – Noticias y convocatorias de la web» (CSV) en noticias.js.
Uso: python3 tools/noticias.py hoja.csv"""
import csv, json, sys, os, re
f = sys.argv[1]
def fecha_iso(v):
    v = (v or "").strip()
    if re.match(r"^\d{4}-\d{2}-\d{2}$", v): return v
    m = re.match(r"^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})", v)
    if m: return "%s-%02d-%02d" % (m.group(3), int(m.group(2)), int(m.group(1)))
    m = re.match(r"^(\d{4})[/.-](\d{1,2})[/.-](\d{1,2})", v)
    if m: return "%s-%02d-%02d" % (m.group(1), int(m.group(2)), int(m.group(3)))
    return ""
filas = list(csv.DictReader(open(f, encoding="utf-8")))
out = []
for r in filas:
    r = {(k or "").strip().lower(): (v or "").strip() for k, v in r.items()}
    if r.get("publicar", "").lower() not in ("sí", "si", "s", "yes", "x", "1"): continue
    if not r.get("titulo_es"): continue
    fecha = fecha_iso(r.get("fecha", ""))
    if not fecha: continue
    out.append({"tipo": (r.get("tipo") or "noticia").lower(), "fecha": fecha, "plazo": fecha_iso(r.get("plazo", "")),
                "es": {"n": r["titulo_es"], "t": r.get("texto_es", "")},
                "en": {"n": r.get("titulo_en") or r["titulo_es"], "t": r.get("texto_en") or r.get("texto_es", "")},
                "url": r.get("enlace", ""), "img": r.get("imagen", "")})
# Noticias redactadas fuera de la hoja: se añaden y, si tienen el mismo título que una de la hoja, la sustituyen
base0 = os.path.dirname(os.path.abspath(__file__))
try: fijas = json.load(open(os.path.join(base0, "noticias-fijas.json"), encoding="utf-8"))
except Exception: fijas = []
tit = {x["es"]["n"].strip().lower() for x in fijas}
out = [x for x in out if x["es"]["n"].strip().lower() not in tit] + fijas
out.sort(key=lambda x: x["fecha"], reverse=True)
if not out:
    print("La hoja no tiene filas publicables; no se cambia noticias.js"); sys.exit(0)
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
open(os.path.join(base, "noticias.js"), "w", encoding="utf-8").write(
    "/* Generado a partir de la hoja de noticias de la SEA. No editar a mano. */\nwindow.NOTICIAS=" + json.dumps(out, ensure_ascii=False, indent=0) + ";\n")
print(len(out), "noticias")
