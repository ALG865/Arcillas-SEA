import fs from 'fs';
import {feature} from 'topojson-client';
import {geoNaturalEarth1, geoPath} from 'd3-geo';
const topo=JSON.parse(fs.readFileSync('node_modules/world-atlas/land-110m.json'));
const land=feature(topo,topo.objects.land);
const W=1000,H=520;
const proj=geoNaturalEarth1().fitExtent([[5,5],[W-5,H-5]],{type:"Sphere"});
const path=geoPath(proj).digits(1);
const P=[
 // [id, tipo, lon, lat, es, en]
 ["cornualles","caolin",-4.8,50.4,"Caolín: Cornualles (Reino Unido)","Kaolin: Cornwall (UK)"],
 ["devon","caolin",-3.7,50.6,"Arcillas de bola (ball clays): Devon (Reino Unido)","Ball clays: Devon (UK)"],
 ["georgia","caolin",-82.9,32.9,"Caolín: Georgia (EE. UU.)","Kaolin: Georgia (USA)"],
 ["para","caolin",-48.0,-1.8,"Caolín: Pará (Brasil)","Kaolin: Pará (Brazil)"],
 ["charentes","caolin",-0.2,45.7,"Caolín: Charentes (Francia)","Kaolin: Charentes (France)"],
 ["sedlec","caolin",12.9,50.2,"Caolín: Sedlec, Karlovy Vary (Chequia)","Kaolin: Sedlec, Karlovy Vary (Czechia)"],
 ["westerwald","caolin",7.9,50.5,"Arcillas de bola: Westerwald (Alemania)","Ball clays: Westerwald (Germany)"],
 ["gaoling","caolin",117.4,29.4,"Caolín: Gaoling, Jingdezhen (China), que da nombre al mineral","Kaolin: Gaoling, Jingdezhen (China), which gave the mineral its name"],
 ["wyoming","bentonita",-108.0,44.5,"Bentonita sódica: Wyoming (EE. UU.)","Sodium bentonite: Wyoming (USA)"],
 ["milos","bentonita",24.4,36.7,"Bentonita: Milos (Grecia)","Bentonite: Milos (Greece)"],
 ["cerdena","bentonita",8.7,40.5,"Bentonita: Cerdeña (Italia)","Bentonite: Sardinia (Italy)"],
 ["anatolia","bentonita",32.9,39.9,"Bentonita: Anatolia (Turquía)","Bentonite: Anatolia (Turkey)"],
 ["kutch","bentonita",69.5,23.2,"Bentonita: Kutch, Gujarat (India)","Bentonite: Kutch, Gujarat (India)"],
 ["madrid","fibrosa",-3.6,40.4,"Sepiolita: cuenca de Madrid (España), el mayor yacimiento del mundo","Sepiolite: Madrid Basin (Spain), the world’s largest deposit"],
 ["eskisehir","fibrosa",30.5,39.8,"Sepiolita: Eskişehir (Turquía), la «espuma de mar»","Sepiolite: Eskişehir (Turkey), the “meerschaum”"],
 ["amboseli","fibrosa",37.3,-2.7,"Sepiolita: Amboseli (Kenia y Tanzania)","Sepiolite: Amboseli (Kenya and Tanzania)"],
 ["attapulgus","fibrosa",-84.5,30.75,"Palygorskita: Attapulgus, Georgia y norte de Florida (EE. UU.)","Palygorskite: Attapulgus, Georgia and northern Florida (USA)"],
 ["thies","fibrosa",-16.9,14.8,"Palygorskita: Thiès (Senegal)","Palygorskite: Thiès (Senegal)"],
 ["cherkasy","fibrosa",32.0,49.4,"Palygorskita: Cherkasy (Ucrania)","Palygorskite: Cherkasy (Ukraine)"],
 ["xuyi","fibrosa",118.5,33.0,"Palygorskita: Xuyi, Jiangsu y Anhui (China)","Palygorskite: Xuyi, Jiangsu and Anhui (China)"],
 ["dragon","halloysita",-112.1,39.95,"Halloysita: Dragon Mine, Utah (EE. UU.)","Halloysite: Dragon Mine, Utah (USA)"],
 ["matauri","halloysita",173.9,-35.0,"Halloysita: Matauri Bay (Nueva Zelanda)","Halloysite: Matauri Bay (New Zealand)"],
 ["dunino","halloysita",16.3,51.2,"Halloysita: Dunino (Polonia)","Halloysite: Dunino (Poland)"],
 ["balikesir","halloysita",27.9,39.6,"Halloysita: Balıkesir (Turquía)","Halloysite: Balıkesir (Turkey)"],
 ["palabora","otros",31.1,-24.0,"Vermiculita: Palabora (Sudáfrica)","Vermiculite: Phalaborwa (South Africa)"],
 ["libby","otros",-115.55,48.4,"Vermiculita: Libby, Montana (EE. UU.), cerrada","Vermiculite: Libby, Montana (USA), closed"],
 ["hector","otros",-116.4,34.8,"Hectorita: Hector, California (EE. UU.)","Hectorite: Hector, California (USA)"],
 ["trimouns","otros",1.8,42.8,"Talco: Trimouns, Pirineos (Francia)","Talc: Trimouns, Pyrenees (France)"],
 ["thacker","otros",-118.0,41.7,"Arcillas con litio: Thacker Pass, Nevada (EE. UU.)","Lithium clays: Thacker Pass, Nevada (USA)"]
];
const pts=P.map(p=>{const [x,y]=proj([p[2],p[3]]);return {id:p[0],t:p[1],xy:[+x.toFixed(1),+y.toFixed(1)],es:p[4],en:p[5]};});
const esf=path({type:"Sphere"});
fs.writeFileSync('/home/claude/arcillas-sea/datos-mundo.js','/* Mapa del mundo (Natural Earth 110m, proyección Natural Earth) y yacimientos de arcillas de referencia. Generado por tools/mundo.mjs. */\nwindow.MUNDO_MAPA='+JSON.stringify({W,H,esfera:esf,tierra:path(land),puntos:pts})+';\n');
console.log(fs.statSync('/home/claude/arcillas-sea/datos-mundo.js').size);
