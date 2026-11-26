"""ACTUALIZADOR DE LA WEB DE LA SEA
Lo lanza ACTUALIZAR-WEB.bat. Lee los Excel de la carpeta ENTRADA y actualiza la copia
de la web que hay en la carpeta «web». Después la sube al servidor (si config.ini lo indica)
o deja la lista de archivos que hay que subir.

Pasos (cada uno es independiente: si uno falla, los demás siguen):
  1. Fotos        ENTRADA/fotos/ + fotos.xlsx  -> web/fotos.js y web/img/fotos/
  2. Premios      ENTRADA/premios.xlsx         -> web/premios-datos.js
  3. Noticias     ENTRADA/noticias.xlsx        -> web/noticias.js (+ documentos)
  4. Publicaciones de los socios (OpenAlex)    -> web/publicaciones.js
  5. Trabajos destacados: citas y trabajos nuevos (OpenAlex)
  6. Publicar     (FTP o lista de archivos para subir a mano)
  7. Kit para Claude: zip con los datos de la web, siempre al día

Reglas para quien mantenga este programa:
  - Los datos de los socios (ENTRADA/socios.xlsx) NUNCA se suben al servidor.
  - El programa no borra nada de la web salvo lo que se haya borrado en los Excel.
  - Todo lo que hace queda escrito en ENTRADA/hecho/registro.txt."""
import configparser, datetime, hashlib, json, os, re, shutil, subprocess, sys, time, unicodedata, zipfile

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
WEB = os.path.join(RAIZ, "web")
ENT = os.path.join(RAIZ, "ENTRADA")
HECHO = os.path.join(ENT, "hecho")
HOY = datetime.date.today()
sys.path.insert(0, AQUI)

try:
    import openpyxl
    from openpyxl.worksheet.datavalidation import DataValidation
    from openpyxl.styles import Font, PatternFill, Alignment
    from PIL import Image
except ImportError:
    print("\nFaltan componentes. Ejecuta primero «INSTALAR (una sola vez).bat».")
    sys.exit(2)

try:
    from pillow_heif import register_heif_opener  # fotos HEIC de iPhone
    register_heif_opener()
except Exception:
    pass

import traductor

RESUMEN = []        # líneas del resumen final
PENDIENTE = False   # True si hay que completar algún Excel antes de publicar
REGISTRO = []


def log(*a):
    t = " ".join(str(x) for x in a)
    print(t, flush=True)
    REGISTRO.append(t)


def titulo(t):
    log("\n" + "=" * 66 + "\n " + t + "\n" + "=" * 66)


def norm(s):
    return unicodedata.normalize("NFKD", s or "").encode("ascii", "ignore").decode().lower()


def slug(s, n=50):
    s = re.sub(r"[^a-z0-9]+", "-", norm(s)).strip("-")
    return s[:n].rstrip("-") or "x"


def fecha_iso(v):
    if v is None or v == "":
        return ""
    if isinstance(v, (datetime.date, datetime.datetime)):
        return v.strftime("%Y-%m-%d")
    v = str(v).strip()
    if re.match(r"^\d{4}-\d{2}-\d{2}", v):
        return v[:10]
    m = re.match(r"^(\d{1,2})[/.\-](\d{1,2})[/.\-](\d{4})$", v)
    if m:
        return "%s-%02d-%02d" % (m.group(3), int(m.group(2)), int(m.group(1)))
    return None  # formato no reconocido


def txt(v):
    if v is None:
        return ""
    if isinstance(v, float) and v.is_integer():
        v = int(v)
    return str(v).strip()


# ---------- lectura y escritura de los ficheros de datos de la web ----------
def leer_js(nombre, var):
    """Lee web/<nombre> con la forma  window.VAR = <JSON>;"""
    p = os.path.join(WEB, nombre)
    if not os.path.exists(p):
        return None
    s = open(p, encoding="utf-8").read()
    i = s.index("=", s.index("window." + var)) + 1
    d, _ = json.JSONDecoder().raw_decode(s[i:].lstrip())
    return d


def escribir_js(nombre, var, datos, cabecera, extra=""):
    p = os.path.join(WEB, nombre)
    nuevo = "/* " + cabecera + " */\nwindow." + var + "=" + json.dumps(datos, ensure_ascii=False, indent=0) + ";\n" + extra
    viejo = open(p, encoding="utf-8").read() if os.path.exists(p) else ""
    if nuevo != viejo:
        open(p, "w", encoding="utf-8").write(nuevo)
        return True
    return False


def en(texto_es, texto_en):
    """Devuelve el inglés: el escrito a mano si existe; si no, la traducción automática."""
    if texto_en:
        return texto_en, False
    if not texto_es:
        return "", False
    t = traductor.traducir(texto_es)
    if t is None:
        return texto_es, False  # sin traductor: se muestra en español
    return t, True


# ---------- ayudas para Excel ----------
CAB = Font(bold=True, color="FFFFFF")
FONDO = PatternFill("solid", fgColor="1F3A5F")
AMARILLO = PatternFill("solid", fgColor="FFF2B3")


def hoja_nueva(ws, columnas, anchos):
    ws.append(columnas)
    for i, c in enumerate(ws[1]):
        c.font, c.fill = CAB, FONDO
        c.alignment = Alignment(wrap_text=True, vertical="center")
        ws.column_dimensions[c.column_letter].width = anchos[i]
    ws.freeze_panes = "A2"


def desplegable(ws, col, opciones, filas=2000):
    lista = '"' + ",".join(opciones) + '"'
    if len(lista) > 250:  # Excel no admite listas largas escritas en línea
        return
    dv = DataValidation(type="list", formula1=lista, allow_blank=True)
    ws.add_data_validation(dv)
    dv.add("%s2:%s%d" % (col, col, filas))


def filas(ws):
    """Filas del Excel como diccionarios {cabecera: valor}, con su número de fila."""
    cab = [txt(c.value) for c in ws[1]]
    out = []
    for r in range(2, ws.max_row + 1):
        vals = [ws.cell(r, i + 1).value for i in range(len(cab))]
        if all(v is None or txt(v) == "" for v in vals):
            continue
        out.append((r, dict(zip(cab, vals))))
    return out, cab


def poner(ws, fila, cab, columna, valor):
    ws.cell(fila, cab.index(columna) + 1).value = valor


def guardar(wb, ruta):
    while True:
        try:
            wb.save(ruta)
            return
        except PermissionError:
            input("\n  El Excel %s está abierto. Ciérralo y pulsa Intro..." % os.path.basename(ruta))


def abrir(ruta):
    try:
        os.startfile(ruta)  # solo en Windows
    except Exception:
        pass


# =====================================================================
# 1. FOTOS
# =====================================================================
TEMAS = [("reuniones", "Reuniones y asambleas"), ("premios", "Premios"), ("congresos", "AIPEA y congresos"),
         ("icc2017", "ICC Granada 2017"), ("historia", "Historia")]
EXT_FOTO = (".jpg", ".jpeg", ".png", ".webp", ".heic", ".tif", ".tiff")
COL_FOTOS = ["Miniatura", "Archivo", "Tema", "Año", "Pie de foto", "Personas (de izquierda a derecha)", "Fuente", "Pie en inglés"]


def fotos():
    global PENDIENTE
    titulo("1. Fotos")
    carpeta = os.path.join(ENT, "fotos")
    os.makedirs(carpeta, exist_ok=True)
    ruta = os.path.join(carpeta, "fotos.xlsx")
    if os.path.exists(ruta):
        wb = openpyxl.load_workbook(ruta)
        ws = wb.active
    else:
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Fotos"
        hoja_nueva(ws, COL_FOTOS, [18, 22, 22, 8, 60, 40, 24, 60])
        desplegable(ws, "C", [t[1] for t in TEMAS])
    datos, cab = filas(ws)
    en_excel = {norm(txt(d.get("Archivo"))) for _, d in datos}
    nuevas = sorted(f for f in os.listdir(carpeta) if f.lower().endswith(EXT_FOTO) and norm(f) not in en_excel)
    for f in nuevas:  # añadir una fila por foto nueva, con miniatura
        r = ws.max_row + 1
        ws.cell(r, 2).value = f
        ws.cell(r, 7).value = "Archivo de la SEA"
        try:
            im = Image.open(os.path.join(carpeta, f)).convert("RGB")
            im.thumbnail((120, 90))
            tmp = os.path.join(carpeta, ".miniaturas")
            os.makedirs(tmp, exist_ok=True)
            pm = os.path.join(tmp, f + ".png")
            im.save(pm)
            img = openpyxl.drawing.image.Image(pm)
            ws.add_image(img, "A%d" % r)
            ws.row_dimensions[r].height = 72
        except Exception as e:
            log("  No se pudo leer la foto", f, "->", e)
    if not os.path.exists(ruta) or nuevas:
        guardar(wb, ruta)
    datos, cab = filas(ws)
    if not datos:
        log("  No hay fotos nuevas.")
        return
    faltan = []
    temas = {norm(n): k for k, n in TEMAS}
    temas.update({k: k for k, n in TEMAS})
    for r, d in datos:
        f = txt(d.get("Archivo"))
        if not os.path.exists(os.path.join(carpeta, f)):
            faltan.append("Fila %d: no encuentro la foto «%s» en la carpeta" % (r, f))
        if norm(txt(d.get("Tema"))) not in temas:
            faltan.append("Fila %d (%s): falta el Tema (elígelo de la lista)" % (r, f))
        if not re.match(r"^(18|19|20)\d\d$", txt(d.get("Año"))):
            faltan.append("Fila %d (%s): falta el Año (cuatro cifras)" % (r, f))
        if not txt(d.get("Pie de foto")):
            faltan.append("Fila %d (%s): falta el Pie de foto" % (r, f))
    if faltan:
        PENDIENTE = True
        log("  Hay que completar el Excel de fotos antes de publicarlas:")
        for x in faltan:
            log("   - " + x)
        log("  Guarda el Excel y vuelve a hacer doble clic en ACTUALIZAR-WEB.")
        RESUMEN.append("Fotos: PENDIENTE de completar el Excel (%d avisos)" % len(faltan))
        abrir(ruta)
        return
    F = leer_js("fotos.js", "FOTOS_SEA") or []
    usados = {x["f"] for x in F}
    os.makedirs(os.path.join(WEB, "img", "fotos", "mini"), exist_ok=True)
    destino = os.path.join(HECHO, HOY.isoformat(), "fotos")
    os.makedirs(destino, exist_ok=True)
    n = 0
    for r, d in datos:
        f = txt(d.get("Archivo"))
        anio = int(txt(d.get("Año")))
        pie = txt(d.get("Pie de foto"))
        per = txt(d.get("Personas (de izquierda a derecha)"))
        if per:
            pie = pie.rstrip(".") + ". De izquierda a derecha: " + per.rstrip(".") + "."
        pie_en, auto = en(pie, txt(d.get("Pie en inglés")))
        if auto:
            poner(ws, r, cab, "Pie en inglés", pie_en)
        base = "%d-%s" % (anio, slug(txt(d.get("Pie de foto")), 40))
        nombre, k = base, 2
        while nombre in usados:
            nombre = "%s-%d" % (base, k); k += 1
        usados.add(nombre)
        im = Image.open(os.path.join(ENT, "fotos", f))
        try:
            from PIL import ImageOps
            im = ImageOps.exif_transpose(im)  # respeta la orientación del móvil
        except Exception:
            pass
        im = im.convert("RGB")
        g = im.copy(); g.thumbnail((1400, 1400)); g.save(os.path.join(WEB, "img", "fotos", nombre + ".webp"), "WEBP", quality=82)
        m = im.copy(); m.thumbnail((560, 560)); m.save(os.path.join(WEB, "img", "fotos", "mini", nombre + ".webp"), "WEBP", quality=78)
        F.insert(0, {"f": nombre, "g": temas[norm(txt(d.get("Tema")))], "y": anio, "es": pie, "en": pie_en, "src": txt(d.get("Fuente")) or "Archivo de la SEA"})
        shutil.move(os.path.join(ENT, "fotos", f), os.path.join(destino, f))
        n += 1
        log("  Publicada:", f, "->", nombre)
    escribir_js("fotos.js", "FOTOS_SEA", F, "Galería fotográfica de la SEA. Generado por el actualizador; las fotos nuevas se añaden desde ENTRADA/fotos.")
    guardar(wb, ruta)
    shutil.move(ruta, os.path.join(destino, "fotos-%s.xlsx" % datetime.datetime.now().strftime("%H%M%S")))
    shutil.rmtree(os.path.join(ENT, "fotos", ".miniaturas"), ignore_errors=True)
    lista_imagenes()
    RESUMEN.append("Fotos: %d publicadas" % n)


def lista_imagenes():
    out = []
    for raiz, _, fs in os.walk(os.path.join(WEB, "img")):
        for f in sorted(fs):
            if f.endswith(".webp"):
                out.append(os.path.relpath(os.path.join(raiz, f), WEB).replace(os.sep, "/"))
    json.dump(sorted(out), open(os.path.join(WEB, "img", "lista.json"), "w"), indent=0)


# =====================================================================
# 2. PREMIOS
# =====================================================================
COL_CONV = ["Código (no cambiar)", "Premio", "Plazo", "Resumen", "Condiciones", "Documentos", "Enlace",
            "Premio (inglés)", "Resumen (inglés)", "Condiciones (inglés)"]
COL_PALM = ["Premio", "Año", "Ganador o ganadores", "Nota"]
COL_DIST = ["Año", "Persona", "Distinción"]
COL_HON = ["Año", "Nombre"]


def premios_crear_excel(ruta, P):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Convocatorias"
    hoja_nueva(ws, COL_CONV, [12, 40, 12, 60, 80, 45, 40, 40, 60, 80])
    for p in P["premios"]:
        docs = ", ".join(os.path.basename(x[1]) for x in p["es"].get("d", []))
        ws.append([p["id"], p["es"]["n"], p.get("abierto", ""), p["es"]["r"], p["es"]["t"], docs, p.get("url", ""),
                   p["en"]["n"], p["en"]["r"], p["en"]["t"]])
    ws2 = wb.create_sheet("Palmarés")
    hoja_nueva(ws2, COL_PALM, [55, 8, 60, 30])
    for g in P["palmares"]:
        for anio, quien in g["l"]:
            ws2.append([g["es"], anio, quien, ""])
    desplegable(ws2, "A", [g["es"][:40] for g in P["palmares"]])  # (si la lista es larga, Excel la omite)
    ws3 = wb.create_sheet("Distinciones")
    hoja_nueva(ws3, COL_DIST, [8, 45, 70])
    for d in P["distinciones"]:
        ws3.append([d["a"], d["n"], d["p"]])
    ws4 = wb.create_sheet("Socios de honor")
    hoja_nueva(ws4, COL_HON, [8, 50])
    for h in P["honor"]:
        ws4.append(list(h))
    guardar(wb, ruta)


def premios():
    titulo("2. Premios")
    ruta = os.path.join(ENT, "premios.xlsx")
    P = leer_js("premios-datos.js", "PREMIOS_DATOS")
    if not os.path.exists(ruta):
        if not P:
            log("  No existe ENTRADA/premios.xlsx ni premios-datos.js. Se omite.")
            return []
        premios_crear_excel(ruta, P)
        log("  Creado ENTRADA/premios.xlsx con los datos actuales de la web.")
    wb = openpyxl.load_workbook(ruta)
    avisos, cambios_en = [], False
    # --- Convocatorias
    ws = wb["Convocatorias"]
    datos, cab = filas(ws)
    previos = {p["id"]: p for p in (P or {}).get("premios", [])}
    conv = []
    for r, d in datos:
        nom = txt(d.get("Premio"))
        if not nom:
            continue
        cid = txt(d.get("Código (no cambiar)")) or slug(nom, 20)
        plazo = fecha_iso(d.get("Plazo"))
        if plazo is None:
            avisos.append("Convocatorias, fila %d: no entiendo la fecha del Plazo «%s»" % (r, txt(d.get("Plazo"))))
            plazo = ""
        docs = []
        for f in [x.strip() for x in re.split(r"[,;\n]", txt(d.get("Documentos"))) if x.strip()]:
            href = copiar_documento(f, avisos, "Convocatorias, fila %d" % r)
            if href:
                docs.append(href)
        res, cond = txt(d.get("Resumen")), txt(d.get("Condiciones"))
        nom_en, a1 = en(nom, txt(d.get("Premio (inglés)")))
        res_en, a2 = en(res, txt(d.get("Resumen (inglés)")))
        cond_en, a3 = en(cond, txt(d.get("Condiciones (inglés)")))
        for col, val, auto in [("Premio (inglés)", nom_en, a1), ("Resumen (inglés)", res_en, a2), ("Condiciones (inglés)", cond_en, a3)]:
            if auto:
                poner(ws, r, cab, col, val); cambios_en = True
        p = {"id": cid}
        if plazo:
            p["abierto"] = plazo
        p["es"] = {"n": nom, "r": res, "t": cond}
        p["en"] = {"n": nom_en, "r": res_en, "t": cond_en}
        if docs:
            p["es"]["d"] = [[etiqueta_doc(h, "es"), h] for h in docs]
            p["en"]["d"] = [[etiqueta_doc(h, "en"), h] for h in docs]
        p["url"] = txt(d.get("Enlace"))
        conv.append(p)
    # --- Palmarés
    grupos = {g["es"]: g for g in (P or {}).get("palmares", [])}
    pal = {}
    for r, d in filas(wb["Palmarés"])[0]:
        nom = txt(d.get("Premio"))
        anio = txt(d.get("Año"))
        quien = txt(d.get("Ganador o ganadores"))
        if not (nom and anio and quien):
            avisos.append("Palmarés, fila %d: faltan datos (premio, año o ganador)" % r)
            continue
        if txt(d.get("Nota")):
            quien += " (" + txt(d.get("Nota")) + ")"
        g = grupos.get(nom) or next((x for x in grupos.values() if norm(x["es"]).startswith(norm(nom)[:30])), None)
        if g is None:  # premio nuevo
            g = {"id": slug(nom, 20), "es": nom, "en": en(nom, "")[0], "l": []}
            grupos[nom] = g
        pal.setdefault(g["es"], {"id": g["id"], "es": g["es"], "en": g["en"], "l": []})["l"].append([anio, quien])
    palmares = []
    for nom in list(grupos):
        if nom in pal:
            g = pal[nom]
            g["l"].sort(key=lambda x: x[0], reverse=True)
            palmares.append(g)
    # --- Distinciones y socios de honor
    dist = [{"a": txt(d.get("Año")), "n": txt(d.get("Persona")), "p": txt(d.get("Distinción"))}
            for r, d in filas(wb["Distinciones"])[0] if txt(d.get("Persona"))]
    dist.sort(key=lambda x: x["a"])
    honor = [[txt(d.get("Año")), txt(d.get("Nombre"))] for r, d in filas(wb["Socios de honor"])[0] if txt(d.get("Nombre"))]
    honor.sort(key=lambda x: x[0])
    if cambios_en:
        guardar(wb, ruta)
    for a in avisos:
        log("  AVISO: " + a)
    # ganadores nuevos (para la noticia automática del fallo)
    antes = {(g["id"], a, q) for g in (P or {}).get("palmares", []) for a, q in g["l"]}
    nuevos = [(g, a, q) for g in palmares for a, q in g["l"] if (g["id"], a, q) not in antes]
    datos_js = {"premios": conv, "palmares": palmares, "distinciones": dist, "honor": honor}
    extra = ("if(window.SEA){SEA.premios=PREMIOS_DATOS.premios;SEA.distinciones=PREMIOS_DATOS.distinciones;SEA.honor=PREMIOS_DATOS.honor;}\n"
             "window.PALMARES=PREMIOS_DATOS.palmares;\n")
    cambio = escribir_js("premios-datos.js", "PREMIOS_DATOS", datos_js,
                         "Generado por el actualizador a partir de ENTRADA/premios.xlsx. No editar a mano: cambia el Excel.", extra)
    RESUMEN.append("Premios: " + ("actualizados" if cambio else "sin cambios") + (" (%d avisos)" % len(avisos) if avisos else ""))
    return conv, nuevos


def etiqueta_doc(href, idioma):
    """Texto del enlace de descarga, a partir del nombre del archivo."""
    base = os.path.splitext(os.path.basename(href))[0]
    ext = os.path.splitext(href)[1].lower()
    tipo = {".pdf": "PDF", ".doc": "Word", ".docx": "Word", ".xlsx": "Excel", ".xls": "Excel"}.get(ext, ext[1:].upper())
    b = norm(base)
    if "bases" in b or "rules" in b:
        n = "Bases" if idioma == "es" else "Rules"
    elif "formulario" in b or "form" in b or "solicitud" in b or "inscripcion" in b:
        n = "Formulario de inscripción" if idioma == "es" else "Application form"
    else:
        n = base.replace("-", " ").replace("_", " ")
    return "%s (%s)" % (n, tipo)


def copiar_documento(nombre, avisos, donde):
    """Copia ENTRADA/documentos/<nombre> a web/docs/ y devuelve su ruta en la web."""
    o = os.path.join(ENT, "documentos", nombre)
    d = os.path.join(WEB, "docs", nombre)
    if os.path.exists(o):
        os.makedirs(os.path.dirname(d), exist_ok=True)
        if not os.path.exists(d) or open(o, "rb").read() != open(d, "rb").read():
            shutil.copy2(o, d)
        return "docs/" + nombre
    if os.path.exists(d):  # ya estaba en la web
        return "docs/" + nombre
    avisos.append("%s: no encuentro el documento «%s» en ENTRADA/documentos" % (donde, nombre))
    return None


# =====================================================================
# 3. NOTICIAS
# =====================================================================
TIPOS = [("noticia", "Noticia"), ("convocatoria", "Convocatoria"), ("evento", "Evento")]
COL_NOT = ["Tipo", "Fecha", "Plazo", "Título", "Texto", "Texto ampliado (opcional)", "Enlace", "Documentos", "Imagen",
           "Título (inglés)", "Texto (inglés)", "Texto ampliado (inglés)", "Código (automático)"]


def noticias_crear_excel(ruta, N):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Noticias"
    hoja_nueva(ws, COL_NOT, [14, 12, 12, 50, 70, 50, 40, 40, 35, 50, 70, 50, 30])
    desplegable(ws, "A", [t[1] for t in TIPOS])
    for n in N:
        if n.get("auto"):
            continue
        docs = ", ".join(os.path.basename(x[0]) for x in n.get("d", [])) or (os.path.basename(n["doc"]) if n.get("doc") else "")
        ws.append([dict(TIPOS)[n["tipo"]], n["fecha"], n.get("plazo", ""), n["es"]["n"], n["es"]["t"], n["es"].get("l", ""),
                   n.get("url", ""), docs, n.get("img", ""), n["en"]["n"], n["en"]["t"], n["en"].get("l", ""), n.get("id", "")])
    guardar(wb, ruta)


def noticias(conv, nuevos_ganadores):
    titulo("3. Noticias")
    ruta = os.path.join(ENT, "noticias.xlsx")
    previas = leer_js("noticias.js", "NOTICIAS") or []
    if not os.path.exists(ruta):
        noticias_crear_excel(ruta, previas)
        log("  Creado ENTRADA/noticias.xlsx con las noticias actuales de la web.")
    wb = openpyxl.load_workbook(ruta)
    ws = wb.active
    datos, cab = filas(ws)
    avisos, out, cambios_en = [], [], False
    tipos = {norm(v): k for k, v in TIPOS}
    for r, d in datos:
        t = txt(d.get("Título"))
        if not t:
            avisos.append("Fila %d: falta el Título" % r); continue
        tipo = tipos.get(norm(txt(d.get("Tipo"))), None)
        if not tipo:
            avisos.append("Fila %d (%s): elige el Tipo de la lista (Noticia, Convocatoria o Evento)" % (r, t)); continue
        fecha, plazo = fecha_iso(d.get("Fecha")), fecha_iso(d.get("Plazo"))
        if not fecha:
            avisos.append("Fila %d (%s): falta la Fecha o no la entiendo (usa 17/01/2027)" % (r, t)); continue
        if tipo == "convocatoria" and not plazo:
            avisos.append("Fila %d (%s): una convocatoria necesita Plazo" % (r, t)); continue
        tx, larga = txt(d.get("Texto")), txt(d.get("Texto ampliado (opcional)"))
        t_en, a1 = en(t, txt(d.get("Título (inglés)")))
        tx_en, a2 = en(tx, txt(d.get("Texto (inglés)")))
        l_en, a3 = en(larga, txt(d.get("Texto ampliado (inglés)")))
        for col, val, auto in [("Título (inglés)", t_en, a1), ("Texto (inglés)", tx_en, a2), ("Texto ampliado (inglés)", l_en, a3)]:
            if auto:
                poner(ws, r, cab, col, val); cambios_en = True
        nid = txt(d.get("Código (automático)"))
        if not nid:
            nid = fecha + "-" + slug(t, 40)
            if "Código (automático)" in cab:
                poner(ws, r, cab, "Código (automático)", nid); cambios_en = True
        n = {"tipo": tipo, "fecha": fecha, "plazo": plazo or "", "id": nid,
             "es": {"n": t, "t": tx}, "en": {"n": t_en, "t": tx_en}, "url": txt(d.get("Enlace")), "img": ""}
        if larga:
            n["es"]["l"], n["en"]["l"] = larga, l_en
        docs = []
        for f in [x.strip() for x in re.split(r"[,;\n]", txt(d.get("Documentos"))) if x.strip()]:
            h = copiar_documento(f, avisos, "Fila %d" % r)
            if h:
                docs.append([h, etiqueta_doc(h, "es"), etiqueta_doc(h, "en")])
        if docs:
            n["d"] = docs
        img = txt(d.get("Imagen"))
        if img:
            n["img"] = imagen_noticia(img, n["id"], avisos, r)
        out.append(n)
    # Noticias automáticas: convocatorias abiertas de la hoja de premios
    titulos = {norm(x["es"]["n"]) for x in out}
    for p in conv:
        if p.get("abierto") and p["abierto"] >= HOY.isoformat() and not any(norm(p["es"]["n"]) in x for x in titulos):
            out.append({"tipo": "convocatoria", "fecha": HOY.isoformat(), "plazo": p["abierto"], "id": "conv-" + p["id"], "auto": 1,
                        "es": {"n": p["es"]["n"], "t": p["es"]["r"]}, "en": {"n": p["en"]["n"], "t": p["en"]["r"]},
                        "url": "#premios", "img": ""})
            # se conserva la fecha de la primera vez que se publicó
            ant = next((x for x in previas if x.get("id") == "conv-" + p["id"]), None)
            if ant:
                out[-1]["fecha"] = ant["fecha"]
    # Noticias automáticas: fallos de premios añadidos al palmarés
    for x in previas:
        if x.get("auto") == 2:
            out.append(x)  # las de ejecuciones anteriores se mantienen
    for g, anio, quien in nuevos_ganadores:
        if int(re.sub(r"\D", "", anio)[:4] or 0) < HOY.year - 1:
            continue  # completar años antiguos del palmarés no es noticia
        t_es = "%s %s: %s" % (g["es"].split(" (")[0], anio, quien)
        out.append({"tipo": "noticia", "fecha": HOY.isoformat(), "plazo": "", "id": HOY.isoformat() + "-" + slug(t_es, 40), "auto": 2,
                    "es": {"n": t_es, "t": "Ganador o ganadores: %s." % quien},
                    "en": {"n": "%s %s: %s" % (g["en"].split(" (")[0], anio, quien), "t": "Winner(s): %s." % quien},
                    "url": "#premios", "img": ""})
    if cambios_en:
        guardar(wb, ruta)
    for a in avisos:
        log("  AVISO: " + a)
    out.sort(key=lambda x: x["fecha"], reverse=True)
    cambio = escribir_js("noticias.js", "NOTICIAS", out, "Generado por el actualizador a partir de ENTRADA/noticias.xlsx. No editar a mano: cambia el Excel.")
    log("  %d noticias en la web." % len(out))
    RESUMEN.append("Noticias: " + ("actualizadas" if cambio else "sin cambios") + (" (%d avisos)" % len(avisos) if avisos else ""))


def imagen_noticia(img, nid, avisos, r):
    if img.startswith("img/"):
        return img  # imagen que ya está en la web
    o = os.path.join(ENT, "documentos", img)
    if not os.path.exists(o):
        o = os.path.join(ENT, "fotos", img)
    if not os.path.exists(o):
        avisos.append("Fila %d: no encuentro la imagen «%s» en ENTRADA/documentos" % (r, img))
        return ""
    destino = "img/noticias/%s.webp" % nid
    os.makedirs(os.path.join(WEB, "img", "noticias"), exist_ok=True)
    im = Image.open(o).convert("RGB")
    im.thumbnail((1200, 1200))
    im.save(os.path.join(WEB, destino), "WEBP", quality=82)
    lista_imagenes()
    return destino


# =====================================================================
# 4. PUBLICACIONES DE LOS SOCIOS
# =====================================================================
COL_SOC = ["Nombre completo", "Centro", "ORCID", "Identificadores OpenAlex (automático)", "Datos internos (no tocar)"]


def socios_a_json():
    """Convierte ENTRADA/socios.xlsx en web/tools/socios.json (privado: nunca se sube)."""
    ruta = os.path.join(ENT, "socios.xlsx")
    if not os.path.exists(ruta):
        log("  No existe ENTRADA/socios.xlsx. Se omiten las publicaciones de los socios.")
        return None
    wb = openpyxl.load_workbook(ruta)
    ws = wb["Socios"] if "Socios" in wb.sheetnames else wb.active
    datos, cab = filas(ws)
    socios, cache = [], {}
    for r, d in datos:
        nom = txt(d.get("Nombre completo"))
        if not nom:
            continue
        interno = txt(d.get("Datos internos (no tocar)"))
        try:
            s = json.loads(interno) if interno else None
        except Exception:
            s = None
        if not s or s.get("n") != nom:
            partes = nom.split()
            centro = norm(txt(d.get("Centro")))
            s = {"n": nom, "buscar": " ".join(partes[:2]), "apellido": norm(partes[1] if len(partes) > 1 else partes[0]),
                 "completo": nom, "nombre": norm(partes[0]), "centro": [w for w in re.split(r"\W+", centro) if len(w) > 3][:3],
                 "afil": [centro] if centro else [], "ciudad": [], "generico": []}
        socios.append(s)
        ids = [x.strip() for x in re.split(r"[,; ]+", txt(d.get("Identificadores OpenAlex (automático)"))) if x.strip()]
        orcid = txt(d.get("ORCID"))
        if not ids and orcid:
            ids = openalex_por_orcid(orcid)
        if ids:
            cache[nom] = ids
    honor_ext = []
    if "Socios de honor extranjeros" in wb.sheetnames:
        honor_ext = [txt(c.value) for c in wb["Socios de honor extranjeros"]["A"][1:] if txt(c.value)]
    excl = []
    if "Excluir artículos" in wb.sheetnames:
        excl = [txt(c.value).lower().replace("https://doi.org/", "") for c in wb["Excluir artículos"]["A"][1:] if txt(c.value)]
    incl = []
    if "Añadir artículos" in wb.sheetnames:
        incl = [txt(c.value).lower().replace("https://doi.org/", "") for c in wb["Añadir artículos"]["A"][1:] if txt(c.value)]
    T = os.path.join(WEB, "tools")
    os.makedirs(T, exist_ok=True)
    json.dump(socios, open(os.path.join(T, "socios.json"), "w", encoding="utf-8"), ensure_ascii=False)
    json.dump(honor_ext, open(os.path.join(T, "socios-honor-excluidos.json"), "w", encoding="utf-8"), ensure_ascii=False)
    json.dump(excl, open(os.path.join(T, "pubs-excluidas.json"), "w", encoding="utf-8"), ensure_ascii=False)
    json.dump(incl, open(os.path.join(T, "pubs-incluidas.json"), "w", encoding="utf-8"), ensure_ascii=False)
    # Identificadores conocidos: se completan con los del Excel; los nuevos que encuentre se escriben en el Excel
    pc = os.path.join(T, "socios-openalex.json")
    try:
        prev = json.load(open(pc, encoding="utf-8"))
    except Exception:
        prev = {}
    prev = {k: v for k, v in prev.items() if k in {s["n"] for s in socios}}  # las bajas desaparecen
    prev.update(cache)
    json.dump(prev, open(pc, "w", encoding="utf-8"), ensure_ascii=False, indent=0)
    return ruta


def openalex_por_orcid(orcid):
    import urllib.request
    o = re.sub(r".*(\d{4}-\d{4}-\d{4}-\d{3}[\dX]).*", r"\1", orcid)
    try:
        u = "https://api.openalex.org/authors?filter=orcid:%s&mailto=sea@sea-arcillas.es" % o
        d = json.load(urllib.request.urlopen(u, timeout=30))
        return [a["id"].split("/")[-1] for a in d.get("results", [])]
    except Exception:
        return []


def socios_guardar_ids(ruta):
    """Escribe en socios.xlsx los identificadores de OpenAlex encontrados, para no buscarlos otra vez."""
    try:
        cache = json.load(open(os.path.join(WEB, "tools", "socios-openalex.json"), encoding="utf-8"))
        socios = {s["n"]: s for s in json.load(open(os.path.join(WEB, "tools", "socios.json"), encoding="utf-8"))}
    except Exception:
        return
    wb = openpyxl.load_workbook(ruta)
    ws = wb["Socios"] if "Socios" in wb.sheetnames else wb.active
    datos, cab = filas(ws)
    for r, d in datos:
        nom = txt(d.get("Nombre completo"))
        if nom in cache and not txt(d.get("Identificadores OpenAlex (automático)")):
            poner(ws, r, cab, "Identificadores OpenAlex (automático)", ", ".join(cache[nom]))
        if nom in socios and not txt(d.get("Datos internos (no tocar)")):
            poner(ws, r, cab, "Datos internos (no tocar)", json.dumps(socios[nom], ensure_ascii=False))
    guardar(wb, ruta)


def lanzar(script, *args):
    env = dict(os.environ, PYTHONUTF8="1", PYTHONIOENCODING="utf-8")
    r = subprocess.run([sys.executable, os.path.join("tools", script)] + list(args), cwd=WEB,
                       capture_output=True, text=True, encoding="utf-8", errors="replace", env=env)
    lineas = [l for l in ((r.stdout or "") + (r.stderr or "")).splitlines() if l.strip()]
    for l in lineas[-6:]:
        log("   " + l)
    return r.returncode == 0


def publicaciones():
    titulo("4. Publicaciones de los socios (OpenAlex). Tarda unos minutos.")
    ruta = socios_a_json()
    if not ruta:
        RESUMEN.append("Publicaciones de los socios: omitidas (falta socios.xlsx)")
        return
    ok = lanzar("publicaciones.py")
    socios_guardar_ids(ruta)
    RESUMEN.append("Publicaciones de los socios: " + ("actualizadas" if ok else "NO se pudieron actualizar (se mantienen las anteriores)"))


# =====================================================================
# 5. TRABAJOS DESTACADOS (aplicaciones y geología)
# =====================================================================
def destacados():
    titulo("5. Trabajos destacados: citas y trabajos nuevos")
    ok = lanzar("citas.py")
    nuevos = buscar_destacados()
    RESUMEN.append("Trabajos destacados: citas " + ("revisadas" if ok else "NO revisadas") +
                   ("; %d trabajos nuevos" % nuevos if nuevos else ""))


def buscar_destacados():
    """Busca trabajos de socios con más de 50 citas y de temática de arcillas, los asigna a una
    aplicación o tema geológico por sus palabras clave y los añade si están entre los 10 más citados."""
    import urllib.request, urllib.parse
    T = os.path.join(WEB, "tools")
    try:
        cache = json.load(open(os.path.join(T, "socios-openalex.json"), encoding="utf-8"))
        src = open(os.path.join(T, "aportaciones.py"), encoding="utf-8").read()
        Q = eval(src[src.index("Q={") + 2:src.index("\nout={}")])
        src = open(os.path.join(T, "geologia.py"), encoding="utf-8").read()
        G = eval(src[src.index("G={") + 2:src.index("}\n", src.index("G={")) + 1])
        G.pop("clasicos", None)
        ESTRICTO = re.search(r'ESTRICTO=r"([^"]+)"', open(os.path.join(T, "publicaciones.py"), encoding="utf-8").read()).group(1)
    except Exception as e:
        log("  No se pudo preparar la búsqueda de trabajos nuevos:", e)
        return 0
    excl = set()
    ruta = os.path.join(ENT, "socios.xlsx")
    if os.path.exists(ruta):
        wb = openpyxl.load_workbook(ruta, read_only=True)
        if "Excluir destacados" in wb.sheetnames:
            excl = {txt(c[0].value).lower().replace("https://doi.org/", "") for c in wb["Excluir destacados"].iter_rows(min_row=2) if c[0].value}
    ficheros = [("aportaciones.js", "APORTES", Q), ("geo-refs.js", "GEO_REFS", G)]
    listas = {f: leer_js(f, v) for f, v, _ in ficheros}
    ya = {x.get("doi", "").lower() for f in listas for k in listas[f] for x in listas[f][k]}
    otras = leer_js("otras.js", "OTRAS_ES") or {}
    ya |= {x.get("doi", "").lower() for k in otras for x in otras[k]}
    ids = sorted({i for v in cache.values() for i in v})
    obras = {}
    for i in range(0, len(ids), 40):
        filtro = "author.id:" + "|".join(ids[i:i + 40]) + ",cited_by_count:>50,type:article|review"
        cursor = "*"
        while cursor:
            u = ("https://api.openalex.org/works?per-page=200&cursor=%s&mailto=sea@sea-arcillas.es&select=doi,title,publication_year,cited_by_count,"
                 "authorships,primary_location,abstract_inverted_index&filter=%s") % (cursor, urllib.parse.quote(filtro, safe=":,|>"))
            try:
                d = json.load(urllib.request.urlopen(u, timeout=60)); time.sleep(0.3)
            except Exception as e:
                log("  OpenAlex no responde:", e); return 0
            for w in d.get("results", []):
                if w.get("doi"):
                    obras[w["doi"].lower().replace("https://doi.org/", "")] = w
            cursor = d.get("meta", {}).get("next_cursor")
    def texto(w):
        ab = w.get("abstract_inverted_index") or {}
        return norm((w.get("title") or "") + " " + " ".join(k for _, k in sorted((i, k) for k, v in ab.items() for i in v)))
    def clasificar(t, temas):
        mejor, puntos = None, 0
        for k, frases in temas.items():
            n = sum(1 for f in frases if all(p in t for p in norm(f).split()))
            if n > puntos:
                mejor, puntos = k, n
        return mejor
    nuevos = 0
    for doi, w in sorted(obras.items(), key=lambda x: -x[1]["cited_by_count"]):
        if doi in ya or doi in excl:
            continue
        t = texto(w)
        if not re.search(ESTRICTO, t):
            continue
        for f, var, temas in ficheros:
            k = clasificar(t, temas)
            if not k:
                continue
            L = listas[f].setdefault(k, [])
            normales = sorted([x for x in L if not x.get("p")], key=lambda x: -x.get("c", 0))
            if len(normales) >= 10 and normales[9].get("c", 0) >= w["cited_by_count"]:
                break
            au = [a["author"]["display_name"] for a in w["authorships"]]
            item = {"a": ", ".join(au[:3]) + (" y otros" if len(au) > 3 else ""), "y": w["publication_year"], "t": w["title"],
                    "r": ((w.get("primary_location") or {}).get("source") or {}).get("display_name", ""), "c": w["cited_by_count"], "doi": doi}
            L.append(item)
            if len(normales) >= 10:
                L.remove(normales[9])
                log("  Sale de %s: %s" % (k, normales[9]["t"][:80]))
            log("  Nuevo en %s: %s (%d citas)" % (k, w["title"][:80], w["cited_by_count"]))
            ya.add(doi); nuevos += 1
            break
    for f, var, _ in ficheros:
        for k in listas[f]:
            listas[f][k].sort(key=lambda x: (-1 if x.get("p") else 0, -x.get("c", 0)))
        if nuevos:
            cab = open(os.path.join(WEB, f), encoding="utf-8").read().split("\n")[0].strip("/* ").rstrip(" */")
            escribir_js(f, var, listas[f], cab)
    return nuevos


# =====================================================================
# 6. PUBLICAR
# =====================================================================
NO_SUBIR = ("tools/", ".github/", ".git/", "README", ".gitignore")


def huella():
    h = {}
    for raiz, dirs, fs in os.walk(WEB):
        dirs[:] = [d for d in dirs if d not in (".git", ".github", "tools", "__pycache__")]
        for f in fs:
            p = os.path.join(raiz, f)
            rel = os.path.relpath(p, WEB).replace(os.sep, "/")
            if rel.startswith(NO_SUBIR):
                continue
            st = os.stat(p)
            h[rel] = (st.st_size, int(st.st_mtime))
    return h


def nueva_version_cache():
    p = os.path.join(WEB, "sw.js")
    s = open(p, encoding="utf-8").read()
    s2 = re.sub(r'sea-v(\d+)', lambda m: "sea-v%d" % (int(m.group(1)) + 1), s, count=1)
    open(p, "w", encoding="utf-8").write(s2)


def publicar(antes):
    titulo("6. Publicar")
    despues = huella()
    cambiados = sorted(k for k in despues if antes.get(k) != despues[k])
    borrados = sorted(k for k in antes if k not in despues)
    if not cambiados and not borrados:
        log("  No hay cambios que publicar.")
        RESUMEN.append("Publicar: no había cambios")
        return
    nueva_version_cache()  # para que los navegadores carguen la versión nueva
    cambiados = sorted(set(cambiados) | {"sw.js"})
    cfg = configparser.ConfigParser()
    cfg.read(os.path.join(RAIZ, "config.ini"), encoding="utf-8")
    modo = cfg.get("publicar", "modo", fallback="manual").strip().lower()
    lista = os.path.join(RAIZ, "ARCHIVOS-PARA-SUBIR.txt")
    # La lista se acumula hasta que se suben los archivos (por FTP o a mano, borrando después este archivo)
    previos = []
    if os.path.exists(lista):
        previos = [l.strip() for l in open(lista, encoding="utf-8") if l.strip() and not l.startswith(("Archivos", "Cuando"))
                   and os.path.exists(os.path.join(WEB, l.strip()))]
    cambiados = sorted(set(cambiados) | set(previos))
    with open(lista, "w", encoding="utf-8") as f:
        f.write("Archivos de la carpeta «web» que hay que subir al servidor, sustituyendo los antiguos (%s):\n\n" % datetime.datetime.now().strftime("%d/%m/%Y %H:%M"))
        f.write("\n".join(cambiados) + "\n")
        f.write("\nCuando los hayas subido, borra este archivo.\n")
    if modo == "ftp":
        try:
            subir_ftp(cfg, cambiados)
            os.remove(lista)
            RESUMEN.append("Publicar: %d archivos subidos al servidor" % len(cambiados))
            return
        except Exception as e:
            log("  ERROR al subir por FTP:", e)
            log("  Revisa los datos de config.ini o sube a mano los archivos de ARCHIVOS-PARA-SUBIR.txt")
    RESUMEN.append("Publicar: %d archivos cambiados. Súbelos al servidor (lista en ARCHIVOS-PARA-SUBIR.txt)" % len(cambiados))
    abrir(lista)


def subir_ftp(cfg, archivos):
    import ftplib
    host = cfg.get("publicar", "servidor")
    usuario = cfg.get("publicar", "usuario")
    clave = cfg.get("publicar", "contrasena")
    carpeta = cfg.get("publicar", "carpeta_remota", fallback="/").rstrip("/") or "/"
    seguro = cfg.getboolean("publicar", "ftps", fallback=True)
    ftp = ftplib.FTP_TLS(host, timeout=60) if seguro else ftplib.FTP(host, timeout=60)
    ftp.login(usuario, clave)
    if seguro:
        ftp.prot_p()
    for rel in archivos:
        partes = rel.split("/")
        ftp.cwd(carpeta)
        for p in partes[:-1]:
            try:
                ftp.cwd(p)
            except ftplib.error_perm:
                ftp.mkd(p); ftp.cwd(p)
        with open(os.path.join(WEB, rel), "rb") as fh:
            ftp.storbinary("STOR " + partes[-1], fh)
        log("  Subido:", rel)
    ftp.quit()


# =====================================================================
# 7. KIT PARA CLAUDE
# =====================================================================
def kit_claude():
    """Zip pequeño con los datos y textos de la web (sin imágenes ni PDF), siempre al día."""
    d = os.path.join(RAIZ, "para-Claude")
    os.makedirs(d, exist_ok=True)
    z = os.path.join(d, "web-SEA-datos.zip")
    with zipfile.ZipFile(z, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(os.listdir(WEB)):
            p = os.path.join(WEB, f)
            if os.path.isfile(p) and f.endswith((".js", ".html", ".css", ".json", ".webmanifest", ".txt", ".xml")) and f != "vendor-three.min.js":
                zf.write(p, f)
        lj = os.path.join(WEB, "img", "lista.json")
        if os.path.exists(lj):
            zf.write(lj, "img/lista.json")
        for x in ("noticias.xlsx", "premios.xlsx"):  # nunca socios.xlsx (datos personales)
            if os.path.exists(os.path.join(ENT, x)):
                zf.write(os.path.join(ENT, x), "ENTRADA/" + x)
    ins = os.path.join(WEB, "INSTRUCCIONES-PARA-CLAUDE.md")
    if os.path.exists(ins):
        shutil.copy2(ins, os.path.join(d, "INSTRUCCIONES-PARA-CLAUDE.md"))
    log("\n  Kit para Claude actualizado en la carpeta «para-Claude».")


# =====================================================================
def main():
    if not os.path.isdir(WEB) or not os.path.exists(os.path.join(WEB, "index.html")):
        print("\nNo encuentro la carpeta «web» con la web de la SEA junto a este programa.")
        print("Copia en ella todos los archivos de la web (debe contener index.html).")
        return 1
    os.makedirs(HECHO, exist_ok=True)
    for c in ("fotos", "documentos"):
        os.makedirs(os.path.join(ENT, c), exist_ok=True)
    if not traductor.disponible():
        log("Aviso: el traductor no está instalado; los textos nuevos saldrán en español en la versión inglesa.")
    antes = huella()
    solo_local = "--sin-internet" in sys.argv
    for paso in (fotos,):
        try: paso()
        except Exception as e: log("  ERROR en", paso.__name__, ":", e); RESUMEN.append(paso.__name__ + ": ERROR (" + str(e) + ")")
    conv, nuevos = [], []
    try: conv, nuevos = premios() or ([], [])
    except Exception as e: log("  ERROR en premios:", e); RESUMEN.append("Premios: ERROR (" + str(e) + ")")
    try: noticias(conv, nuevos)
    except Exception as e: log("  ERROR en noticias:", e); RESUMEN.append("Noticias: ERROR (" + str(e) + ")")
    if not solo_local:
        for paso in (publicaciones, destacados):
            try: paso()
            except Exception as e: log("  ERROR en", paso.__name__, ":", e); RESUMEN.append(paso.__name__ + ": ERROR (" + str(e) + ")")
    if PENDIENTE:
        RESUMEN.append("NO se ha publicado nada: completa el Excel indicado y vuelve a hacer doble clic.")
    else:
        try: publicar(antes)
        except Exception as e: log("  ERROR al publicar:", e); RESUMEN.append("Publicar: ERROR (" + str(e) + ")")
    try: kit_claude()
    except Exception as e: log("  ERROR en el kit para Claude:", e)
    titulo("RESUMEN")
    for l in RESUMEN:
        log("  - " + l)
    with open(os.path.join(HECHO, "registro.txt"), "a", encoding="utf-8") as f:
        f.write("\n\n##### " + datetime.datetime.now().strftime("%d/%m/%Y %H:%M") + "\n" + "\n".join(REGISTRO))
    return 0


if __name__ == "__main__":
    sys.exit(main())
