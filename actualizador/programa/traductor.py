"""Traducción automática español → inglés sin internet ni cuenta.
Usa el modelo de Argos Translate (es→en), que INSTALAR descarga una sola vez
en la carpeta programa/modelo-es-en. Funciona con ctranslate2 y sentencepiece.
Si el modelo no está instalado, devuelve None y el programa deja el texto en español.

Glosario: programa/glosario.txt, una línea por término:  español = inglés
Los términos del glosario se protegen antes de traducir y se ponen en inglés después."""
import os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
MODELO = os.path.join(AQUI, "modelo-es-en")
_trad = None
_sp = None
_glos = None


def _buscar_modelo():
    # El paquete .argosmodel descomprimido contiene una carpeta con "model" y "sentencepiece.model"
    for raiz, dirs, fs in os.walk(MODELO):
        if "sentencepiece.model" in fs and os.path.isdir(os.path.join(raiz, "model")):
            return raiz
    return None


def disponible():
    return _buscar_modelo() is not None


def _cargar():
    global _trad, _sp
    if _trad is not None:
        return True
    base = _buscar_modelo()
    if not base:
        return False
    try:
        import ctranslate2, sentencepiece
    except ImportError:
        return False
    _trad = ctranslate2.Translator(os.path.join(base, "model"), device="cpu")
    _sp = sentencepiece.SentencePieceProcessor(model_file=os.path.join(base, "sentencepiece.model"))
    return True


def _glosario():
    global _glos
    if _glos is None:
        _glos = []
        f = os.path.join(AQUI, "glosario.txt")
        if os.path.exists(f):
            for l in open(f, encoding="utf-8"):
                l = l.strip()
                if l and not l.startswith("#") and "=" in l:
                    es, en = [x.strip() for x in l.split("=", 1)]
                    _glos.append((es, en))
        _glos.sort(key=lambda x: -len(x[0]))  # primero los términos más largos
    return _glos


def _frases(texto):
    return [f for f in re.split(r"(?<=[.!?…])\s+(?=[A-ZÁÉÍÓÚÑ¿¡«\"(0-9])", texto) if f.strip()]


def traducir(texto):
    """Devuelve la traducción al inglés, o None si no hay traductor instalado."""
    texto = (texto or "").strip()
    if not texto:
        return ""
    if not _cargar():
        return None
    # Proteger términos del glosario con marcas que el traductor no toca
    marcas = {}
    def proteger(t):
        for i, (es, en) in enumerate(_glosario()):
            patron = re.compile(r"(?<![\wÁÉÍÓÚáéíóúñÑ])" + re.escape(es) + r"(?![\wÁÉÍÓÚáéíóúñÑ])", re.I)
            if patron.search(t):
                clave = "ZQ%dQZ" % i
                marcas[clave] = en
                t = patron.sub(clave, t)
        return t
    salida = []
    for parrafo in texto.split("\n"):
        if not parrafo.strip():
            salida.append(""); continue
        frases = _frases(proteger(parrafo))
        tok = [_sp.encode(f, out_type=str) for f in frases]
        res = _trad.translate_batch(tok, beam_size=4, max_decoding_length=400)
        trad = [_sp.decode(r.hypotheses[0]) for r in res]
        salida.append(" ".join(t.replace("▁", " ").strip() for t in trad))
    out = "\n".join(salida)
    for clave, en in marcas.items():
        out = re.sub(re.escape(clave), en, out, flags=re.I)
    return re.sub(r" {2,}", " ", out).strip()
