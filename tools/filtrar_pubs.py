"""Revisa los artículos ya publicados en publicaciones.js: vuelve a pedir cada uno a OpenAlex por su DOI y
se queda solo con los que firma algún socio con su centro del listado y tratan de arcillas, minerales, geología, materiales, etc."""
import json, re, urllib.request, urllib.parse, time, unicodedata, datetime
MAIL="sea.arcillas.web@gmail.com"
def norm(s): return unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower().replace("-"," ")
def get(url):
    for i in range(6):
        try:
            time.sleep(0.3)
            with urllib.request.urlopen(url+"&mailto="+MAIL,timeout=60) as r: return json.load(r)
        except Exception as e: print("reintento",i+1,e); time.sleep(5*(i+1))
    return {"results":[]}
CAMPOS={"Earth and Planetary Sciences","Materials Science","Chemistry","Chemical Engineering","Environmental Science","Engineering","Agricultural and Biological Sciences","Energy","Pharmacology, Toxicology and Pharmaceutics","Physics and Astronomy"}
TEMA=r"clay|smectit|montmorillon|bentonit|kaolin|illit|sepiolit|palygorsk|attapulg|vermiculit|chlorit|halloysit|hectorit|saponit|stevensit|phyllosilic|mica|zeolit|layered double|hydrotalc|mineral|ceramic|brick|tile|soil|sediment|cement|concrete|geopolym|metakaol|pozzolan|mortar|nanocompos|adsorb"
txt=open("publicaciones.js",encoding="utf-8").read()
D=json.loads(re.search(r"=\s*(\{.*\})\s*;?\s*$",txt,re.S).group(1))
socios={s["n"]:s for s in json.load(open("tools/socios.json",encoding="utf-8"))}
obras=D["obras"]; dois=[o["doi"].replace("https://doi.org/","") for o in obras if o.get("doi")]
W={}
for i in range(0,len(dois),40):
    r=get("https://api.openalex.org/works?per-page=50&filter="+urllib.parse.quote("doi:"+"|".join(dois[i:i+40])))
    for w in r["results"]: W[(w.get("doi") or "").lower()]=w
print("recuperados",len(W),"de",len(dois))
quedan=[]
for o in obras:
    w=W.get((o.get("doi") or "").lower())
    if not w: continue
    ok=[]
    for sn in o.get("s",[]):
        s=socios.get(sn)
        if not s or not s.get("afil"): continue
        claves=[norm(x) for x in s["afil"]]; ap=norm(s["apellido"]); nom=s.get("nombre","")
        for au in w.get("authorships",[]):
            nm=norm((au.get("author") or {}).get("display_name") or ""); pn=nm.split()[0] if nm.split() else ""
            if ap not in nm or not (pn==nom or (len(pn.rstrip("."))==1 and nom and pn[0]==nom[0]) or nom in nm.split()): continue
            t=norm(" | ".join([(i.get("display_name") or "") for i in (au.get("institutions") or [])]+(au.get("raw_affiliation_strings") or [])))
            ciud=[norm(x) for x in s.get("ciudad",[])]; gen=set(norm(x) for x in s.get("generico",[]))
            hit=[c for c in claves if c in t and (c not in gen or any(x in t for x in ciud))]
            if hit: ok.append(sn); print('DENTRO |',sn,'|',hit[0],'|',o.get('t','')[:100]); break
    campo=(((w.get("primary_topic") or {}).get("field") or {}).get("display_name") or "")
    tema=re.search(TEMA,norm(o.get("t","")))
    if ok and (tema or campo in CAMPOS):
        o["s"]=ok; quedan.append(o)
    else: print("FUERA |",", ".join(o.get("s",[])),"|",campo,"|",o.get("t","")[:90])
print("Quedan",len(quedan),"de",len(obras))
D["obras"]=quedan; D["actualizado"]=datetime.date.today().isoformat()
import os
if not os.environ.get("SOLO_VER"): open("publicaciones.js","w",encoding="utf-8").write("/* Generado automáticamente desde OpenAlex por tools/publicaciones.py; no editar a mano. */\nwindow.PUBLICACIONES_SOCIOS="+json.dumps(D,ensure_ascii=False)+";\n")
