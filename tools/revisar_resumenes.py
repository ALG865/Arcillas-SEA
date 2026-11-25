"""Lee los resúmenes en OpenAlex de los artículos excluidos y dice cuáles mencionan arcillas."""
import json, re, urllib.request, urllib.parse, time
MAIL="sea.arcillas.web@gmail.com"
def get(url):
    for i in range(5):
        try:
            time.sleep(0.3)
            with urllib.request.urlopen(url+"&mailto="+MAIL,timeout=60) as r: return json.load(r)
        except Exception as e: time.sleep(4*(i+1))
    return {"results":[]}
R=r"clay|smectit|montmorillon|bentonit|kaolin|illit|sepiolit|palygorsk|attapulg|vermiculit|chlorit|halloysit|hectorit|saponit|stevensit|kerolit|beidellit|nontronit|phyllosilic|pyrophyllit|talc\b|mica\b|micas\b|glauconit|celadonit|imogolit|layered double|hydrotalc|hydrocalumit|metakaol"
ex=[d for d in json.load(open("tools/pubs-excluidas.json")) if d.startswith("http")]
dois=[d.replace("https://doi.org/","") for d in ex]
for i in range(0,len(dois),40):
    r=get("https://api.openalex.org/works?per-page=50&select=doi,title,abstract_inverted_index,topics,concepts,keywords,primary_location&filter="+urllib.parse.quote("doi:"+"|".join(dois[i:i+40])))
    for w in r["results"]:
        inv=w.get("abstract_inverted_index") or {}
        pal=sorted(((p,k) for k,v in inv.items() for p in v)); txt=" ".join(k for p,k in pal)
        hits=re.findall(R,(txt+" "+(w.get("title") or "")).lower())
        tops="; ".join((t.get("display_name") or "")+"/"+((t.get("subfield") or {}).get("display_name") or "") for t in (w.get("topics") or [])[:3])
        con=", ".join(c["display_name"] for c in (w.get("concepts") or []) if c.get("score",0)>0.3)[:150]
        rev=((w.get("primary_location") or {}).get("source") or {}).get("display_name") or ""
        print("TEM |",(w.get("doi") or "").lower(),"|",rev,"|",tops,"|",con)
        print("RES |",len(hits),"|",(w.get("doi") or "").lower(),"|",", ".join(sorted(set(hits)))[:80],"|",(w.get("title") or "")[:80], "| sin resumen" if not inv else "")
