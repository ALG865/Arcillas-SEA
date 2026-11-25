"""Búsqueda amplia en OpenAlex de trabajos con participación de centros españoles por aplicación de las arcillas (1985-hoy).
Varias consultas por aplicación, 50 resultados cada una, ordenados por citas. Escribe tools/aportaciones-candidatos.json."""
import json, urllib.request, urllib.parse, time
Q={
"ceramica":["porcelain","stoneware","kaolin firing mullite","ceramic pigment clay","whiteware kaolin"],
"estructural":["brick clay","fired clay brick","roof tile clay","clay brick waste","earthen construction adobe"],
"azulejos":["ceramic tile clay","porcelain tile","ceramic tile body"],
"refractarios":["refractory clay","refractory kaolin","mullite kaolinite","pyrophyllite"],
"cemento":["metakaolin","calcined clay cement","limestone calcined clay","geopolymer kaolin","pozzolan clay"],
"papel":["kaolin paper coating","kaolin filler","kaolin quality brightness","kaolin deposit"],
"cargas":["organoclay polymer filler","sepiolite polymer","talc filler","kaolin rubber","clay paint rheology"],
"perforacion":["drilling fluid bentonite","drilling fluid sepiolite","bentonite rheology suspension","clay suspension rheology"],
"fundicion":["foundry bentonite","green sand bentonite","foundry sand clay"],
"pelets":["iron ore pellet bentonite","binder pelletizing bentonite"],
"ingenieria":["bentonite slurry","geosynthetic clay liner","compacted clay liner","expansive clay soil","clay barrier landfill"],
"barreras":["bentonite radioactive waste","bentonite repository","FEBEX bentonite","bentonite buffer","compacted bentonite swelling","bentonite concrete interaction","clay host rock radionuclide"],
"absorbentes":["sepiolite sorbent","sepiolite adsorption","palygorskite adsorption","bentonite absorbent","clay sorption organic"],
"agricultura":["clay pesticide formulation","clay herbicide","organoclay pesticide","clay soil fertility","clay fertilizer slow release"],
"pienso":["clay mycotoxin","bentonite aflatoxin","sepiolite feed","clay feed additive"],
"farmacia":["clay drug delivery","clay pharmaceutical","clay cosmetic","halloysite drug","montmorillonite drug","clay excipient","peloid","pelotherapy","clay health"],
"alimentos":["bentonite wine","bentonite protein stabilization","bleaching clay oil","sepiolite food"],
"agua":["clay heavy metal adsorption","clay pollutant removal","organoclay water","clay dye adsorption","clay emerging contaminants","clay arsenic"],
"catalisis":["pillared clay","clay catalyst","acid activated clay","layered double hydroxide catalyst","clay photocatalyst","kaolinite zeolite synthesis"],
"nanocompuestos":["clay nanocomposite","bionanocomposite clay","sepiolite nanocomposite","polymer montmorillonite","clay hybrid material","halloysite nanocomposite"],
"aislamiento":["vermiculite","exfoliated vermiculite","sepiolite insulation","clay thermal insulation"],
"litio":["lithium clay","lithium smectite","hectorite lithium"],
"azulmaya":["Maya blue","palygorskite indigo","clay archaeometry","archaeological ceramics clay","historic brick clay","clay heritage"],
}
out={}
for k,qs in Q.items():
    vistos={}
    for q in qs:
        url="https://api.openalex.org/works?per-page=50&sort=cited_by_count:desc&mailto=sea.arcillas.web@gmail.com&filter="+urllib.parse.quote(f"institutions.country_code:ES,from_publication_date:1985-01-01,title_and_abstract.search:{q}")
        try: d=json.load(urllib.request.urlopen(url,timeout=60))
        except Exception as e: print("ERR",k,q,e); continue
        for w in d["results"]:
            if not w.get("doi") or w["doi"] in vistos: continue
            src=((w.get("primary_location") or {}).get("source") or {}).get("display_name","") or ""
            au=[]
            for a in w.get("authorships",[])[:12]:
                es=any((i.get("country_code")=="ES") for i in a.get("institutions",[]))
                au.append(a["author"]["display_name"]+(" *" if es else ""))
            vistos[w["doi"]]={"t":w.get("title"),"y":w.get("publication_year"),"r":src,"c":w.get("cited_by_count"),"doi":w["doi"],"a":au,"q":q}
        time.sleep(0.2)
    out[k]=sorted(vistos.values(),key=lambda x:-(x["c"] or 0))
    print(k,len(out[k]))
json.dump(out,open("tools/aportaciones-candidatos.json","w"),ensure_ascii=False,indent=0)
