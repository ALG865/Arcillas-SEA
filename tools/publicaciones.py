"""Publicaciones recientes de los socios de la SEA (artículos en revistas, año actual y anterior) desde OpenAlex.
Lee tools/socios.json y escribe publicaciones.js. Se ejecuta en GitHub Actions."""
import json, urllib.request, urllib.parse, datetime, sys, unicodedata
MAIL="sea.arcillas.web@gmail.com"
import time
def get(url):
    sep="&" if "?" in url else "?"
    for intento in range(6):
        try:
            time.sleep(0.4)
            with urllib.request.urlopen(url+sep+"mailto="+MAIL, timeout=60) as r: return json.load(r)
        except Exception as e:
            print("   reintento", intento+1, e); time.sleep(5*(intento+1))
    return {"results":[],"meta":{}}
def norm(s): return unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower()
import re
CAMPOS={"Earth and Planetary Sciences","Materials Science","Chemistry","Chemical Engineering","Environmental Science","Engineering","Agricultural and Biological Sciences","Energy","Pharmacology, Toxicology and Pharmaceutics","Physics and Astronomy"}
socios=json.load(open("tools/socios.json",encoding="utf-8"))
desde=f"{datetime.date.today().year-1}-01-01"
obras={}
idsocio={}
for s in socios:
    res=get("https://api.openalex.org/authors?per-page=25&search="+urllib.parse.quote(s["buscar"]))["results"]
    claves=[norm(c) for c in s["centro"]]
    elegidos=[]
    print("\n==",s["n"])
    for a in res:
        inst=[i.get("display_name","") for i in (a.get("last_known_institutions") or [])]
        inst+= [af["institution"].get("display_name","") for af in (a.get("affiliations") or []) if af.get("institution")]
        txt=norm(" | ".join(inst))
        nom=norm(a["display_name"]).replace("-"," ")
        pn=nom.split()[0] if nom.split() else ""
        nomok=not s.get("nombre") or pn==s["nombre"] or (len(pn.rstrip("."))==1 and pn[0]==s["nombre"][0]) or s["nombre"] in nom.split()
        # Candidato por nombre y primer apellido; la afiliación se comprueba después, artículo por artículo
        ok=a.get("works_count",0)>0 and nomok and norm(s["apellido"]) in nom and bool(s.get("afil"))
        print(("  ✔ " if ok else "  · ")+a["id"].split("/")[-1], a["display_name"], a.get("works_count"), "|", "; ".join(dict.fromkeys(inst))[:160])
        if ok: elegidos.append(a["id"].split("/")[-1])
    if not elegidos: continue
    for e in elegidos: idsocio[e]=s["n"]
    cursor="*"
    while cursor:
        d=get("https://api.openalex.org/works?per-page=200&cursor="+cursor+"&filter="+urllib.parse.quote(f"author.id:{'|'.join(elegidos)},from_publication_date:{desde},type:article"))
        for w in d["results"]:
            # El socio debe firmar ESTE artículo con su centro del listado de la SEA
            claves_af=[norm(x).replace("-"," ") for x in s.get("afil",[])]
            firma=False
            for au in w.get("authorships",[]):
                if (au.get("author") or {}).get("id","").split("/")[-1] not in elegidos: continue
                t=norm(" | ".join([i.get("display_name","") for i in au.get("institutions",[])]+(au.get("raw_affiliation_strings") or []))).replace("-"," ")
                if any(c in t for c in claves_af): firma=True
            if not firma: continue
            # Tema: arcillas y minerales, geología, suelos, materiales (cementos incluidos), química y medio ambiente
            campo=(((w.get("primary_topic") or {}).get("field") or {}).get("display_name") or "")
            tema=re.search(r"clay|smectit|montmorillon|bentonit|kaolin|illit|sepiolit|palygorsk|attapulg|vermiculit|chlorit|halloysit|hectorit|saponit|stevensit|phyllosilic|mica|zeolit|layered double|hydrotalc|mineral|ceramic|brick|tile|soil|sediment|cement|concrete|geopolym|metakaol|pozzolan|mortar|nanocompos|adsorb",norm(w.get("title") or ""))
            if not tema and campo not in CAMPOS: continue
            src=((w.get("primary_location") or {}).get("source") or {})
            if src.get("type")!="journal": continue
            k=(w.get("doi") or w["id"]).lower()
            o=obras.setdefault(k,{"t":w.get("title") or "","a":[x["author"]["display_name"] for x in w.get("authorships",[])][:12],"ai":[(x["author"].get("id") or "").split("/")[-1] for x in w.get("authorships",[])][:12],
               "na":len(w.get("authorships",[])),"r":src.get("display_name",""),"y":w.get("publication_year"),"f":w.get("publication_date"),
               "doi":w.get("doi") or "","v":(w.get("biblio") or {}).get("volume") or "","n":(w.get("biblio") or {}).get("issue") or "",
               "p":"–".join(x for x in [(w.get("biblio") or {}).get("first_page"),(w.get("biblio") or {}).get("last_page")] if x) if (w.get("biblio") or {}).get("last_page")!=(w.get("biblio") or {}).get("first_page") else ((w.get("biblio") or {}).get("first_page") or ""),"s":[]})
            if s["n"] not in o["s"]: o["s"].append(s["n"])
        cursor=d["meta"].get("next_cursor")
for o in obras.values():
    o["a"]=[idsocio.get(i,n) for n,i in zip(o["a"],o.pop("ai"))]
lista=sorted(obras.values(),key=lambda o:o["f"] or "",reverse=True)
print("\nTotal:",len(lista))
for o in lista[:60]: print(" ",o["y"],"|",o["t"][:90],"|",o["r"][:40],"|",", ".join(o["s"]))
if not lista: sys.exit(0)
open("publicaciones.js","w",encoding="utf-8").write("/* Generado automáticamente desde OpenAlex por tools/publicaciones.py; no editar a mano. */\nwindow.PUBLICACIONES_SOCIOS="+json.dumps({"actualizado":datetime.date.today().isoformat(),"desde":desde[:4],"obras":lista},ensure_ascii=False)+";\n")
