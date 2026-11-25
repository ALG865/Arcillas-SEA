"""Actualiza los datos de la web de la SEA en este ordenador. Lo lanza actualizar-web.bat.
1. Noticias: lee la hoja de Google «SEA – Noticias y convocatorias de la web».
2. Publicaciones de los socios de los últimos 24 meses (OpenAlex).
3. Citas de los trabajos de referencia de aplicaciones y geología (OpenAlex).
Después basta con subir la carpeta completa de la web al servidor."""
import datetime, os, subprocess, sys, tempfile, urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOJA = "1-6BVU44HtjB2y2bO1ph0jT4Eu_6BfZHclCLoYWVdbN8"
os.chdir(RAIZ)
PY = sys.executable
resumen = []


def paso(titulo):
    print("\n" + "=" * 70 + "\n" + titulo + "\n" + "=" * 70, flush=True)


def tam(f):
    return os.path.getsize(f) if os.path.exists(f) else 0


def lanzar(args):
    env = dict(os.environ, PYTHONUTF8="1", PYTHONIOENCODING="utf-8")
    r = subprocess.run([PY] + args, cwd=RAIZ, capture_output=True, text=True, encoding="utf-8", errors="replace", env=env)
    salida = (r.stdout or "") + (r.stderr or "")
    lineas = [l for l in salida.splitlines() if l.strip()]
    print("\n".join(lineas[-15:]))
    return r.returncode == 0


# 1. Noticias
paso("1/3  Noticias (hoja de Google)")
antes = open("noticias.js", encoding="utf-8").read() if os.path.exists("noticias.js") else ""
try:
    url = "https://docs.google.com/spreadsheets/d/%s/gviz/tq?tqx=out:csv&headers=1" % HOJA
    with urllib.request.urlopen(url, timeout=60) as r:
        csv = r.read().decode("utf-8")
    if "titulo_es" not in csv.splitlines()[0].lower():
        raise ValueError("la hoja no tiene la columna titulo_es")
    tmp = os.path.join(tempfile.gettempdir(), "sea-noticias.csv")
    open(tmp, "w", encoding="utf-8").write(csv)
    lanzar(["tools/noticias.py", tmp])
    despues = open("noticias.js", encoding="utf-8").read()
    resumen.append("Noticias: " + ("actualizadas" if despues != antes else "sin cambios"))
except Exception as e:
    print("No se pudo leer la hoja de noticias:", e)
    print("Comprueba la conexión y que la hoja esté compartida con «cualquier persona con el enlace».")
    resumen.append("Noticias: NO se pudieron actualizar (se mantienen las anteriores)")

# 2. Publicaciones de los socios
paso("2/3  Publicaciones de los socios (últimos 24 meses). Tarda unos minutos.")
antes = tam("publicaciones.js")
ok = lanzar(["tools/publicaciones.py"])
resumen.append("Publicaciones de los socios: " + ("actualizadas" if ok and tam("publicaciones.js") else "NO se pudieron actualizar"))

# 3. Citas
paso("3/3  Citas de los trabajos de referencia")
ok = lanzar(["tools/citas.py"])
resumen.append("Citas de los trabajos de referencia: " + ("revisadas" if ok else "NO se pudieron revisar"))

hoy = datetime.datetime.now().strftime("%d/%m/%Y %H:%M")
open("ULTIMA-ACTUALIZACION.txt", "w", encoding="utf-8").write("Última actualización: " + hoy + "\n" + "\n".join(resumen) + "\n")
paso("RESUMEN")
print("\n".join(resumen))
print("\nYa puedes subir la carpeta completa de la web al servidor.")
