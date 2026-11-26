import urllib.request, urllib.parse, unicodedata, os, json
B="https://sea-arcillas.es/wp-content/uploads/"
names=["2018/04/04-An-Real-Soc-Esp-Fisica-Quimica-B-Química-1949-45-291-342.pdf",
"2018/04/05-An-Real-Soc-Esp-Fisica-Quimica-B-Química-1949-45-343-358.pdf",
"2018/04/08-An-Real-Soc-Esp-Fisica-Quimica-B-Química-1950-46-715-726.pdf",
"2018/04/10-Congrès-Géologique-International-Comptes-Rendus-19-Session-Alger-1952.-Comité-International-pour-lÉtude-des-Argiles-1953-18-85-101.pdf",
"2018/06/1972 preprints vol 2 reducido.pdf"]
extra=["https://sea-arcillas.es/publicaciones/1985.pdf","https://sea-arcillas.es/publicaciones/Kaolin symposium reducido.pdf","https://sea-arcillas.es/publicaciones/VIIreunionred.pdf"]
os.makedirs("out",exist_ok=True); log=[]
def intenta(urls,dest):
    for u in urls:
        try:
            r=urllib.request.urlopen(urllib.request.Request(u,headers={"User-Agent":"Mozilla/5.0"}),timeout=60); d=r.read()
            if d[:4]==b"%PDF": open(dest,"wb").write(d); return u,len(d)
        except Exception as e: log.append([u,str(e)[:80]])
    return None,0
cands=[]
for n in names:
    vs=[]
    for form in ("NFC","NFD"):
        s=unicodedata.normalize(form,n); vs.append(B+urllib.parse.quote(s))
    vs.append(B+urllib.parse.quote(unicodedata.normalize("NFKD",n).encode("ascii","ignore").decode()))
    vs.append(B+urllib.parse.quote(n.replace(" ","-")))
    cands.append((vs,"out/"+os.path.basename(unicodedata.normalize("NFKD",n).encode("ascii","ignore").decode()).replace(" ","-")))
for u in extra:
    base=u.rsplit("/",1)[0]+"/"; f=u.rsplit("/",1)[1]
    vs=[base+urllib.parse.quote(f), "https://www.sea-arcillas.es/publicaciones/"+urllib.parse.quote(f), B+"2018/06/"+urllib.parse.quote(f), B+"2018/06/"+urllib.parse.quote(f.replace(" ","-"))]
    cands.append((vs,"out/"+f.replace(" ","-")))
res=[]
for vs,dest in cands:
    u,n=intenta(vs,dest); res.append({"dest":dest,"ok":bool(u),"url":u,"bytes":n})
json.dump({"res":res,"log":log},open("out/resultado.json","w"),indent=1,ensure_ascii=False)
