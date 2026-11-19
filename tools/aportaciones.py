"""Busca en OpenAlex los trabajos más citados con participación de centros españoles para cada aplicación de las arcillas (1985-hoy).
Escribe tools/aportaciones-candidatos.json para su revisión manual. Se ejecuta en GitHub Actions."""
import json, urllib.request, urllib.parse
Q={"ceramica":"porcelain OR stoneware OR (ceramic AND kaolin)","estructural":"brick AND clay","azulejos":"ceramic tile AND clay","refractarios":"refractory AND clay",
 "cemento":"metakaolin OR calcined clay cement","papel":"kaolin AND paper","perforacion":"drilling fluid AND (sepiolite OR bentonite OR palygorskite)",
 "barreras":"bentonite AND (radioactive waste OR repository OR buffer)","absorbentes":"sepiolite AND (sorbent OR adsorbent OR absorbent)",
 "agricultura":"clay AND (pesticide OR herbicide) AND formulation","pienso":"clay AND mycotoxin","farmacia":"clay AND (pharmaceutical OR drug delivery OR cosmetic)",
 "alimentos":"bentonite AND (wine OR bleaching)","agua":"clay AND adsorption AND (heavy metal OR pollutant)","catalisis":"pillared clay OR clay catalyst",
 "nanocompuestos":"clay AND (nanocomposite OR bionanocomposite)","aislamiento":"vermiculite","azulmaya":"Maya blue","ingenieria":"bentonite AND (geosynthetic OR slurry OR liner)",
 "sepiolita":"sepiolite","organoarcillas":"organoclay","peloides":"peloid OR pelotherapy","patrimonio":"clay AND (archaeometry OR heritage OR archaeological ceramics)"}
out={}
for k,q in Q.items():
    url="https://api.openalex.org/works?per-page=12&sort=cited_by_count:desc&mailto=sea.arcillas.web@gmail.com&filter="+urllib.parse.quote(f"institutions.country_code:ES,from_publication_date:1985-01-01,title_and_abstract.search:{q}")
    try:
        d=json.load(urllib.request.urlopen(url,timeout=60))
    except Exception as e:
        out[k]={"error":str(e)}; continue
    L=[]
    for w in d["results"]:
        src=((w.get("primary_location") or {}).get("source") or {}).get("display_name","")
        au=[]
        for a in w.get("authorships",[])[:10]:
            es=any((i.get("country_code")=="ES") for i in a.get("institutions",[]))
            au.append(a["author"]["display_name"]+(" *" if es else ""))
        L.append({"t":w.get("title"),"y":w.get("publication_year"),"r":src,"c":w.get("cited_by_count"),"doi":w.get("doi"),"a":au})
    out[k]=L
    print("==",k,d["meta"]["count"]); [print("  ",x["y"],x["c"],"|",(x["t"] or "")[:90],"|",x["r"][:30],"|",", ".join(x["a"][:5])) for x in L]
json.dump(out,open("tools/aportaciones-candidatos.json","w"),ensure_ascii=False,indent=0)
