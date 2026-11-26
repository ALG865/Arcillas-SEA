import re,glob,urllib.parse,concurrent.futures,urllib.request,ssl
U=set()
for f in glob.glob("2-ACTUALIZABLE/*.js")+glob.glob("3-AUTOMATICO/*.js")+glob.glob("1-FIJO/programa/*.js")+["index.html"]:
    if f.startswith("vendor"): continue
    for u in re.findall(r'https?://[^\s"\'<>)\\]+',open(f,encoding="utf8").read()):
        u=u.rstrip(".,;")
        if "alg865.github.io" in u or "+" in u: continue
        U.add(u)
def mira(u):
    if "doi.org/10." in u:
        import json as J
        d=u.split("doi.org/",1)[1]
        try:
            r=J.load(urllib.request.urlopen("https://doi.org/api/handles/"+urllib.parse.quote(d),timeout=25))
            return u,(200 if r.get("responseCode")==1 else "DOI-no-existe")
        except Exception as e: return u,"DOI-"+type(e).__name__
    for m in ("HEAD","GET"):
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,method=m,headers={"User-Agent":"Mozilla/5.0 (link check)"}),timeout=25)
            return u,r.status
        except urllib.error.HTTPError as e:
            if m=="GET": return u,e.code
        except Exception as e:
            if m=="GET": return u,type(e).__name__
with concurrent.futures.ThreadPoolExecutor(16) as ex:
    res=list(ex.map(mira,sorted(U)))
mal=[r for r in res if r[1]!=200]
print("TOTAL",len(res),"PROBLEMAS",len(mal))
for u,s in mal: print(s,u)
