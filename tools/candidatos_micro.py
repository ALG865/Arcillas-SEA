# Busca imágenes de MEB/MET de minerales de la arcilla con licencia libre
# (Wikimedia Commons) y descarga las figuras de artículos CC BY indicados,
# para revisarlas a mano antes de incorporarlas a la web. Rama auxiliar.
import json,re,time,os,urllib.request,urllib.parse,html,sys
UA={"User-Agent":"SEA-web-candidatos/1.0 (https://alg865.github.io/Arcillas-SEA/; sea@sea-arcillas.es)"}
OUT="candidatos"; os.makedirs(OUT+"/commons",exist_ok=True); os.makedirs(OUT+"/articulos",exist_ok=True)
def get(u,binary=False,tries=4):
    for k in range(tries):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read()
            return r if binary else r.decode("utf8","replace")
        except Exception as e:
            print("  reintento",k,u[:90],e); time.sleep(5*(k+1))
    return None
TERMS={"dickita":"dickite","nacrita":"nacrite","lizardita":"lizardite","crisotilo":"chrysotile","talco":"talc","pirofilita":"pyrophyllite","estevensita":"stevensite","moscovita":"muscovite","glauconita":"glauconite","rectorita":"rectorite","beidellita":"beidellite","hectorita":"hectorite","saponita":"saponite","vermiculita":"vermiculite","illita":"illite","clorita":"chlorite","corrensita":"corrensite","caolinita":"kaolinite","halloysita":"halloysite","sepiolita":"sepiolite","palygorskita":"palygorskite","montmorillonita":"montmorillonite","nontronita":"nontronite"}
LIC=re.compile(r"(?i)^(cc[ -]by(-sa)?[ -]?\d|cc0|public domain|pd)")
MIC=re.compile(r"(?i)(\bSEM\b|scanning electron|electron micro|\bTEM\b|micrograph|secondary electron|backscatter|FE-?SEM|HRTEM|microscopio electr)")
def api(**p):
    p.update(format="json"); time.sleep(1)
    t=get("https://commons.wikimedia.org/w/api.php?"+urllib.parse.urlencode(p))
    return json.loads(t) if t else {}
res=[]
for es,en in TERMS.items():
    titles=set()
    for q in [f"{en} SEM",f"{en} electron microscope",f"{en} micrograph",f"incategory:\"Scanning electron microscopic images of minerals\" {en}"]:
        d=api(action="query",list="search",srsearch=q,srnamespace=6,srlimit=50)
        for h in d.get("query",{}).get("search",[]): titles.add(h["title"])
    titles=list(titles)
    for i in range(0,len(titles),40):
        d=api(action="query",titles="|".join(titles[i:i+40]),prop="imageinfo",iiprop="url|extmetadata|size|mime",iiurlwidth=900)
        for pg in d.get("query",{}).get("pages",{}).values():
            ii=(pg.get("imageinfo") or [{}])[0]; md=ii.get("extmetadata",{})
            g=lambda k:re.sub("<[^>]+>","",html.unescape(md.get(k,{}).get("value") or "")).strip()
            txt=pg["title"]+" "+g("ImageDescription")+" "+g("Categories")
            if not MIC.search(txt) or en[:5].lower() not in txt.lower(): continue
            lic=g("LicenseShortName")
            if not LIC.search(lic): continue
            if "image/" not in ii.get("mime","image/"): continue
            fn=f"{es}--"+re.sub(r"[^A-Za-z0-9._-]","_",pg["title"][5:])[:80]+".jpg"
            b=get(ii.get("thumburl") or ii.get("url"),binary=True)
            if not b: continue
            open(f"{OUT}/commons/{fn}","wb").write(b)
            res.append(dict(m=es,archivo=fn,titulo=pg["title"],desc=g("ImageDescription")[:600],licencia=lic,autor=g("Artist")[:200],credito=g("Credit")[:200],url=ii.get("descriptionurl"),w=ii.get("width"),h=ii.get("height")))
    print(es,"commons:",sum(1 for r in res if r["m"]==es),flush=True)
json.dump(res,open(f"{OUT}/commons.json","w"),ensure_ascii=False,indent=1)
# ---------- figuras de artículos CC BY
ART=json.load(open("tools/candidatos_articulos.json"))
out=[]
for a in ART:
    doi=a["doi"]; slug=re.sub(r"[^A-Za-z0-9]","_",doi)[-60:]; os.makedirs(f"{OUT}/articulos/{slug}",exist_ok=True)
    landing=a.get("url") or "https://doi.org/"+doi
    h=get(landing)
    if not h: print("SIN HTML",doi); continue
    open(f"{OUT}/articulos/{slug}/pagina.html","w").write(h)
    urls=[]
    for m in re.finditer(r'(?:src|href|data-src|data-large)="([^"]+?\.(?:png|jpg|jpeg|gif|webp))"',h,re.I):
        u=html.unescape(m.group(1))
        if not re.search(r"(?i)(-g0\d+|-f\d+|fig|_HTML|figure|MediaObjects)",u): continue
        if re.search(r"(?i)(logo|icon|thumb|graphical|abstract|banner|cover)",u) and "MediaObjects" not in u: continue
        if u.startswith("//"): u="https:"+u
        if u.startswith("/"): u=urllib.parse.urljoin(landing if landing.startswith("http") else "https://doi.org/",u)
        if u not in urls: urls.append(u)
    n=0
    for u in urls[:40]:
        b=get(u,binary=True,tries=2)
        if not b or len(b)<15000: continue
        n+=1; ext=os.path.splitext(urllib.parse.urlparse(u).path)[1] or ".png"
        open(f"{OUT}/articulos/{slug}/fig{n:02d}{ext}","wb").write(b)
        out.append(dict(doi=doi,m=a["m"],archivo=f"articulos/{slug}/fig{n:02d}{ext}",url=u))
    print(doi,"figuras:",n,flush=True)
json.dump(out,open(f"{OUT}/articulos.json","w"),ensure_ascii=False,indent=1)
