# Genera img/lista.json con todas las imágenes, para guardarlas sin conexión.
import os, json
base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = []
for raiz, _, fs in os.walk(os.path.join(base, "img")):
    for f in sorted(fs):
        if f.endswith(".webp"):
            out.append(os.path.relpath(os.path.join(raiz, f), base).replace(os.sep, "/"))
json.dump(sorted(out), open(os.path.join(base, "img", "lista.json"), "w"), indent=0)
print(len(out), "imágenes")
