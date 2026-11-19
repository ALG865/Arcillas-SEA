"""Candidatos para la página de geología y para trabajos pioneros (OpenAlex, participación española).
Escribe tools/geologia-candidatos.json. Se ejecuta en GitHub Actions."""
import json, urllib.request, urllib.parse, time, re
G={
"paleoclima":["clay minerals paleoclimate","clay mineral assemblages provenance","clay minerals palaeoenvironment"],
"diagenesis":["illite crystallinity","Kubler index","illitization diagenesis","smectite illite transformation","very low-grade metamorphism phyllosilicates","diagenesis clay minerals"],
"datacion":["K-Ar illite dating","illite Ar-Ar age"],
"fallas":["fault gouge clay","clay minerals fault zone"],
"alteracion":["hydrothermal alteration clay minerals","bentonite genesis","kaolin deposit genesis","sepiolite genesis","palygorskite genesis"],
"suelos":["soil clay mineralogy","weathering clay minerals"],
"geoarqueologia":["archaeological ceramics clay provenance","archaeometry clay"],
"marte":["Mars clay minerals","phyllosilicates Mars"]}
src=open("tools/aportaciones.py",encoding="utf-8").read()
Q=eval(src[src.index("Q={")+2:src.index("\nout={}")])
def get(q,orden,extra):
    url="https://api.openalex.org/works?per-page=50&sort="+orden+"&mailto=sea.arcillas.web@gmail.com&filter="+urllib.parse.quote(f"institutions.country_code:ES,title_and_abstract.search:{q}"+extra)
    try: return json.load(urllib.request.urlopen(url,timeout=60))["results"]
    except Exception as e: print("ERR",q,e); return []
def reg(w):
    src=((w.get("primary_location") or {}).get("source") or {}).get("display_name","") or ""
    au=[]
    for a in w.get("authorships",[])[:12]:
        es=any((i.get("country_code")=="ES") for i in a.get("institutions",[]))
        au.append(a["author"]["display_name"]+(" *" if es else ""))
    return {"t":w.get("title"),"y":w.get("publication_year"),"r":src,"c":w.get("cited_by_count"),"doi":w.get("doi"),"a":au}
out={"geologia":{},"pioneros_geologia":{},"pioneros_aplicaciones":{}}
for k,qs in G.items():
    v={}; p={}
    for q in qs:
        for w in get(q,"cited_by_count:desc",",from_publication_date:1970-01-01"):
            if w.get("doi"): v.setdefault(w["doi"],reg(w))
        for w in get(q,"publication_date","" if False else ",to_publication_date:1999-12-31,cited_by_count:>9"):
            if w.get("doi"): p.setdefault(w["doi"],reg(w))
        time.sleep(0.2)
    out["geologia"][k]=sorted(v.values(),key=lambda x:-(x["c"] or 0))
    out["pioneros_geologia"][k]=sorted(p.values(),key=lambda x:(x["y"] or 0))
    print(k,len(v),len(p))
for k,qs in Q.items():
    p={}
    for q in qs:
        for w in get(q,"publication_date",",to_publication_date:1999-12-31,cited_by_count:>9"):
            if w.get("doi"): p.setdefault(w["doi"],reg(w))
        time.sleep(0.2)
    out["pioneros_aplicaciones"][k]=sorted(p.values(),key=lambda x:(x["y"] or 0))
    print("pion",k,len(p))
json.dump(out,open("tools/geologia-candidatos.json","w"),ensure_ascii=False,indent=0)
