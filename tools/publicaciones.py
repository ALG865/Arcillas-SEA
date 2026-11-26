"""Publicaciones recientes de los socios de la SEA (artículos en revistas de los últimos 24 meses) desde OpenAlex.
Lee tools/socios.json y escribe publicaciones.js. Se ejecuta en GitHub Actions."""
import json, urllib.request, urllib.parse, datetime, sys, unicodedata
MAIL="sea.arcillas.web@gmail.com"
import os
CLAVE=os.environ.get("OPENALEX_API_KEY","").strip()  # clave gratuita de OpenAlex (config.ini del actualizador)
import time
def get(url):
    sep="&" if "?" in url else "?"
    for intento in range(6):
        try:
            time.sleep(0.4)
            with urllib.request.urlopen(url+sep+"mailto="+MAIL+(("&api_key="+CLAVE) if CLAVE else ""), timeout=60) as r: return json.load(r)
        except Exception as e:
            print("   reintento", intento+1, e); time.sleep(5*(intento+1))
    return {"results":[],"meta":{}}
def norm(s): return unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower()
import re
ESTRICTO=r"clay|arcilla|smectit|montmorillon|bentonit|kaolin|caolin|illit|sepiolit|palygorsk|attapulg|vermiculit|chlorit|tosudit|halloysit|hectorit|saponit|stevensit|kerolit|beidellit|nontronit|phyllosilic|pyrophyllit|\btalc|\bmicas?\b|glauconit|celadonit|imogolit|aluminum silicate|layered double|hydrotalc|hydrocalumit|ldh|zeolit|geopolym|metakaol|calcined clay|\bcement|ceramic|porcelain|brick|\btiles?\b|metapelit"
try: EXCLUIDAS={x.lower() for x in json.load(open("tools/pubs-excluidas.json",encoding="utf-8"))}
except Exception: EXCLUIDAS=set()
try: INCLUIDAS={x.lower() for x in json.load(open("tools/pubs-incluidas.json",encoding="utf-8"))}
except Exception: INCLUIDAS=set()
CAMPOS={"Earth and Planetary Sciences","Materials Science","Chemistry","Chemical Engineering","Environmental Science","Engineering","Agricultural and Biological Sciences","Energy","Pharmacology, Toxicology and Pharmaceutics","Physics and Astronomy"}
socios=json.load(open("tools/socios.json",encoding="utf-8"))
# Los socios de honor extranjeros no cuentan como socios de número
try: HONOR=set(json.load(open("tools/socios-honor-excluidos.json",encoding="utf-8")))
except Exception: HONOR=set()
socios=[s for s in socios if s["n"] not in HONOR]
desde=(datetime.date.today()-datetime.timedelta(days=730)).isoformat()
# Identificadores de OpenAlex de cada socio: se buscan una vez y se guardan en tools/socios-openalex.json
CACHE="tools/socios-openalex.json"
refrescar="--refrescar" in sys.argv
try: cache={} if refrescar else json.load(open(CACHE,encoding="utf-8"))
except Exception: cache={}
porid={}
for s in socios:
    if s["n"] in cache:
        elegidos=cache[s["n"]]
    else:
        res=get("https://api.openalex.org/authors?per-page=25&search="+urllib.parse.quote(s["buscar"]))["results"]
        elegidos=[]
        print("\n==",s["n"])
        for a in res:
            inst=[i.get("display_name","") for i in (a.get("last_known_institutions") or [])]
            inst+= [af["institution"].get("display_name","") for af in (a.get("affiliations") or []) if af.get("institution")]
            nom=norm(a["display_name"]).replace("-"," ")
            pn=nom.split()[0] if nom.split() else ""
            nomok=not s.get("nombre") or pn==s["nombre"] or (len(pn.rstrip("."))==1 and pn[0]==s["nombre"][0]) or s["nombre"] in nom.split()
            # Candidato por nombre y primer apellido; la afiliación se comprueba después, artículo por artículo
            ok=a.get("works_count",0)>0 and nomok and norm(s["apellido"]) in nom and bool(s.get("afil"))
            print(("  ✔ " if ok else "  · ")+a["id"].split("/")[-1], a["display_name"], a.get("works_count"), "|", "; ".join(dict.fromkeys(inst))[:160])
            if ok: elegidos.append(a["id"].split("/")[-1])
        cache[s["n"]]=elegidos
    for e in elegidos: porid[e]=s
json.dump(cache,open(CACHE,"w",encoding="utf-8"),ensure_ascii=False,indent=0)
idsocio={k:v["n"] for k,v in porid.items()}
obras={}
ids=sorted(porid)
print("\nAutores en OpenAlex:",len(ids),"| desde",desde)
for i in range(0,len(ids),40):
    lote=ids[i:i+40]
    cursor="*"
    while cursor:
        d=get("https://api.openalex.org/works?per-page=200&cursor="+cursor+"&filter="+urllib.parse.quote(f"author.id:{'|'.join(lote)},from_publication_date:{desde},type:article"))
        for w in d["results"]:
            socios_w=[]
            for au in w.get("authorships",[]):
                aid=((au.get("author") or {}).get("id") or "").split("/")[-1]
                s=porid.get(aid)
                if not s: continue
                # El socio debe firmar ESTE artículo con su centro del listado de la SEA
                claves_af=[norm(x).replace("-"," ") for x in s.get("afil",[])]
                t=norm(" | ".join([(x.get("display_name") or "") for x in (au.get("institutions") or [])]+(au.get("raw_affiliation_strings") or []))).replace("-"," ")
                ciud=[norm(x) for x in s.get("ciudad",[])]; gen=set(norm(x) for x in s.get("generico",[]))
                if any(c in t and (c not in gen or any(x in t for x in ciud)) for c in claves_af) and s["n"] not in socios_w: socios_w.append(s["n"])
            if not socios_w: continue
            # Tema estricto: el título o el resumen deben tratar de arcillas, minerales de la arcilla o materiales hechos con ellas
            inv=w.get("abstract_inverted_index") or {}
            resumen=" ".join(k for p,k in sorted((p,k) for k,v in inv.items() for p in v))
            if not re.search(ESTRICTO,norm((w.get("title") or "")+" "+resumen)) and (w.get("doi") or "").lower() not in INCLUIDAS: continue
            if (w.get("doi") or w["id"]).lower() in EXCLUIDAS: continue
            src=((w.get("primary_location") or {}).get("source") or {})
            if src.get("type")!="journal": continue
            k=(w.get("doi") or w["id"]).lower()
            bib=w.get("biblio") or {}
            o=obras.setdefault(k,{"t":w.get("title") or "","a":[x["author"]["display_name"] for x in w.get("authorships",[])][:12],"ai":[(x["author"].get("id") or "").split("/")[-1] for x in w.get("authorships",[])][:12],
               "na":len(w.get("authorships",[])),"r":src.get("display_name",""),"y":w.get("publication_year"),"f":w.get("publication_date"),
               "doi":w.get("doi") or "","v":bib.get("volume") or "","n":bib.get("issue") or "",
               "p":"–".join(x for x in [bib.get("first_page"),bib.get("last_page")] if x) if bib.get("last_page")!=bib.get("first_page") else (bib.get("first_page") or ""),"s":[]})
            for n in socios_w:
                if n not in o["s"]: o["s"].append(n)
        cursor=d["meta"].get("next_cursor")
for o in obras.values():
    o["a"]=[idsocio.get(i,n) for n,i in zip(o["a"],o.pop("ai"))]
lista=sorted(obras.values(),key=lambda o:o["f"] or "",reverse=True)
print("\nTotal:",len(lista))
for o in lista[:60]: print(" ",o["y"],"|",o["t"][:90],"|",o["r"][:40],"|",", ".join(o["s"]))
if not lista: sys.exit(0)
try:
    prev=open("publicaciones.js",encoding="utf-8").read()
    n0=len(json.loads(prev[prev.index("=")+1:].strip().rstrip(";"))["obras"])
    if len(lista)<0.5*n0: print("Muchos menos artículos que la vez anterior (",len(lista),"frente a",n0,"): posible fallo de conexión; no se cambia publicaciones.js"); sys.exit(0)
except (FileNotFoundError,ValueError,KeyError): pass
open("publicaciones.js","w",encoding="utf-8").write("/* Generado automáticamente desde OpenAlex por tools/publicaciones.py; no editar a mano. */\nwindow.PUBLICACIONES_SOCIOS="+json.dumps({"actualizado":datetime.date.today().isoformat(),"desde":desde,"obras":lista},ensure_ascii=False)+";\n")
