"""Publicaciones recientes de los socios de la SEA (artículos en revistas, últimos 3 años) desde OpenAlex.
Lee tools/socios.json y escribe publicaciones.js. Se ejecuta en GitHub Actions."""
import json, urllib.request, urllib.parse, datetime, sys, unicodedata
MAIL="sea.arcillas.web@gmail.com"
def get(url):
    sep="&" if "?" in url else "?"
    with urllib.request.urlopen(url+sep+"mailto="+MAIL, timeout=60) as r: return json.load(r)
def norm(s): return unicodedata.normalize("NFKD",s or "").encode("ascii","ignore").decode().lower()
socios=json.load(open("tools/socios.json",encoding="utf-8"))
desde=f"{datetime.date.today().year-3}-01-01"
obras={}
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
        ok=a.get("works_count",0)>0 and ((norm(s["apellido"]) in nom and any(c in txt for c in claves)) or (s.get("completo") and norm(s["completo"]) in nom))
        print(("  ✔ " if ok else "  · ")+a["id"].split("/")[-1], a["display_name"], a.get("works_count"), "|", "; ".join(dict.fromkeys(inst))[:160])
        if ok: elegidos.append(a["id"].split("/")[-1])
    if not elegidos: continue
    cursor="*"
    while cursor:
        d=get("https://api.openalex.org/works?per-page=200&cursor="+cursor+"&filter="+urllib.parse.quote(f"author.id:{'|'.join(elegidos)},from_publication_date:{desde},type:article"))
        for w in d["results"]:
            src=((w.get("primary_location") or {}).get("source") or {})
            if src.get("type")!="journal": continue
            k=(w.get("doi") or w["id"]).lower()
            o=obras.setdefault(k,{"t":w.get("title") or "","a":[x["author"]["display_name"] for x in w.get("authorships",[])][:12],
               "na":len(w.get("authorships",[])),"r":src.get("display_name",""),"y":w.get("publication_year"),"f":w.get("publication_date"),
               "doi":w.get("doi") or "","v":(w.get("biblio") or {}).get("volume") or "","n":(w.get("biblio") or {}).get("issue") or "",
               "p":"–".join(x for x in [(w.get("biblio") or {}).get("first_page"),(w.get("biblio") or {}).get("last_page")] if x) if (w.get("biblio") or {}).get("last_page")!=(w.get("biblio") or {}).get("first_page") else ((w.get("biblio") or {}).get("first_page") or ""),"s":[]})
            if s["n"] not in o["s"]: o["s"].append(s["n"])
        cursor=d["meta"].get("next_cursor")
lista=sorted(obras.values(),key=lambda o:o["f"] or "",reverse=True)
print("\nTotal:",len(lista))
for o in lista[:60]: print(" ",o["y"],"|",o["t"][:90],"|",o["r"][:40],"|",", ".join(o["s"]))
if not lista: sys.exit(0)
open("publicaciones.js","w",encoding="utf-8").write("/* Generado automáticamente desde OpenAlex por tools/publicaciones.py; no editar a mano. */\nwindow.PUBLICACIONES_SOCIOS="+json.dumps({"actualizado":datetime.date.today().isoformat(),"desde":desde[:4],"obras":lista},ensure_ascii=False)+";\n")
