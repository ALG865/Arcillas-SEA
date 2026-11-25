import json,urllib.request,urllib.parse
q=urllib.parse.quote("Polymer-salt intercalation complexes in layer silicates")
with urllib.request.urlopen("https://api.openalex.org/works?filter=title.search:"+q+"&mailto=sea.arcillas.web@gmail.com",timeout=30) as r: d=json.load(r)
for w in d["results"][:5]: print("DOI",w.get("doi"),"|",w.get("title"),"|",w.get("publication_year"),"|",(w.get("primary_location") or {}).get("source",{}) and w["primary_location"]["source"].get("display_name"),"|",w.get("cited_by_count"))
