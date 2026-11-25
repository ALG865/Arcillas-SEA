"""Consulta OpenAlex (solo lectura): resúmenes de los trabajos más citados de cada sección y trabajos más citados de cada socio.
Escribe tools/resumenes-destacados.json y tools/socios-top.json."""
import json, re, time, urllib.request, urllib.parse, unicodedata
MAIL="sea.arcillas.web@gmail.com"
def get(u):
    for i in range(5):
        try:
            time.sleep(0.25)
            with urllib.request.urlopen(u+("&" if "?" in u else "?")+"mailto="+MAIL,timeout=60) as r: return json.load(r)
        except Exception as e: print("reintento",e); time.sleep(3*(i+1))
    return {"results":[]}
def carga(f,v):
    t=open(f,encoding="utf-8").read(); m=re.search(r"window\."+v+r"\s*=\s*",t); return json.loads(t[m.end():].strip().rstrip(";"))
def resumen(w):
    inv=w.get("abstract_inverted_index") or {}
    return " ".join(k for p,k in sorted((p,k) for k,v in inv.items() for p in v))
out={}
for f,v in [("aportaciones.js","APORTES"),("geo-refs.js","GEO_REFS")]:
    for sec,L in carga(f,v).items():
        top=sorted([z for z in L if z.get("doi")],key=lambda z:-(z.get("c") or 0))[:3]
        for z in top:
            d=get("https://api.openalex.org/works/https://doi.org/"+urllib.parse.quote(z["doi"],safe="/()"))
            out.setdefault(sec,[]).append({"doi":z["doi"],"t":z["t"],"a":z["a"],"y":z["y"],"r":z["r"],"c":z.get("c"),
              "autores":[x["author"]["display_name"] for x in d.get("authorships",[])][:8],"anio":d.get("publication_year"),"citas":d.get("cited_by_count"),"resumen":resumen(d)[:2500]})
            print(sec,z["doi"],len(out[sec][-1]["resumen"]))
json.dump(out,open("tools/resumenes-destacados.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
def norm(s): return unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower()
socios=json.load(open("tools/socios.json",encoding="utf-8")); top={}
for s in socios:
    res=get("https://api.openalex.org/authors?per-page=15&search="+urllib.parse.quote(s["buscar"])).get("results",[])
    ids=[]
    for a in res:
        nom=norm(a["display_name"]).replace("-"," "); pn=nom.split()[0] if nom.split() else ""
        if norm(s["apellido"]) in nom and (not s.get("nombre") or pn==s["nombre"] or (len(pn.rstrip("."))==1 and pn[0]==s["nombre"][0]) or s["nombre"] in nom.split()): ids.append(a["id"].split("/")[-1])
    if not ids: continue
    d=get("https://api.openalex.org/works?per-page=8&sort=cited_by_count:desc&filter="+urllib.parse.quote("author.id:"+"|".join(ids[:10])))
    claves=[norm(x).replace("-"," ") for x in s.get("afil",[])]
    L=[]
    for w in d.get("results",[]):
        firma=any(((au.get("author") or {}).get("id") or "").split("/")[-1] in ids and any(c in norm(" | ".join([(i.get("display_name") or "") for i in (au.get("institutions") or [])]+(au.get("raw_affiliation_strings") or []))).replace("-"," ") for c in claves) for au in w.get("authorships",[]))
        L.append({"c":w.get("cited_by_count"),"y":w.get("publication_year"),"t":w.get("title"),"r":((w.get("primary_location") or {}).get("source") or {}).get("display_name"),"doi":w.get("doi"),"firma":firma})
    top[s["n"]]=L
    print(s["n"],[ (x["c"],x["firma"]) for x in L[:3]])
json.dump(top,open("tools/socios-top.json","w",encoding="utf-8"),ensure_ascii=False,indent=1)
