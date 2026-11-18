"""Convierte la hoja «SEA – Noticias y convocatorias de la web» (CSV) en noticias.js.
Uso: python3 tools/noticias.py hoja.csv"""
import csv, json, sys, os, re
f = sys.argv[1]
filas = list(csv.DictReader(open(f, encoding="utf-8")))
out = []
for r in filas:
    r = {(k or "").strip().lower(): (v or "").strip() for k, v in r.items()}
    if r.get("publicar", "").lower() not in ("sí", "si", "s", "yes", "x", "1"): continue
    if not r.get("titulo_es"): continue
    fecha = r.get("fecha", "")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", fecha): continue
    out.append({"tipo": (r.get("tipo") or "noticia").lower(), "fecha": fecha, "plazo": r.get("plazo", ""),
                "es": {"n": r["titulo_es"], "t": r.get("texto_es", "")},
                "en": {"n": r.get("titulo_en") or r["titulo_es"], "t": r.get("texto_en") or r.get("texto_es", "")},
                "url": r.get("enlace", ""), "img": r.get("imagen", "")})
out.sort(key=lambda x: x["fecha"], reverse=True)
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
open(os.path.join(base, "noticias.js"), "w", encoding="utf-8").write(
    "/* Generado a partir de la hoja de noticias de la SEA. No editar a mano. */\nwindow.NOTICIAS=" + json.dumps(out, ensure_ascii=False, indent=0) + ";\n")
print(len(out), "noticias")
