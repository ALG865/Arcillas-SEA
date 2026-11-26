import urllib.request, urllib.parse, unicodedata, os, json
B="https://sea-arcillas.es/wp-content/uploads/"
names=["2018/02/2016-SEA-Libro-de-resúmenes_XXIV-SEA2016.pdf","2018/02/cartel-premio-TFM-2026.pdf"]
os.makedirs("out2",exist_ok=True); res=[]
for n in names:
    ok=None
    for form in ("NFC","NFD"):
        u=B+urllib.parse.quote(unicodedata.normalize(form,n))
        try:
            d=urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"}),timeout=90).read()
            if d[:4]==b"%PDF":
                dest="out2/"+unicodedata.normalize("NFKD",os.path.basename(n)).encode("ascii","ignore").decode(); open(dest,"wb").write(d); ok=[u,len(d)]; break
        except Exception as e: res.append([u,str(e)[:60]])
    res.append([n,ok])
json.dump(res,open("out2/r.json","w"),ensure_ascii=False,indent=1)
