/* «Los minerales de la arcilla» · Sociedad Española de Arcillas */
(function(){
"use strict";
var lang = "es";
try{ var g = localStorage.getItem("arcillas-lang"); if(g==="en"||g==="es") lang=g; }catch(e){}
if(/[?&]lang=en/.test(location.search)) lang="en";

var UI = {
 es:{titulo:"Los minerales de la arcilla",sea:"Sociedad Española de Arcillas",volver:"Volver",inicio:"Inicio",saber:"Saber más",cerrar:"Cerrar",
  sello:"Sociedad Española de Arcillas",lema:"Láminas de pocos nanómetros que se apilan, se hinchan con agua, se enrollan en tubos o forman fibras. Con ellas se hace porcelana, papel y medicamentos, se sellan residuos y se pintó el azul maya.",
  pila:"Toca la pila para separar sus capas",
  b:[["¿Qué es una arcilla?","Tamaño y mineral"],["Estructura","Construye las láminas"],["Minerales","Grupos y fichas"],["Propiedades","Intercambio, hinchamiento, superficie"],["Aplicaciones","De la porcelana al azul maya"],["Yacimientos","España y el mundo"],["Cómo se estudian","Rayos X y microscopios"],["La SEA","Historia y créditos"]],
  juego:"Juego: ¿qué arcilla es?",
  foto:"Imagen: ",ioc:"Archivo «Images of Clay» (MinSoc y CMS)",
  sinfoto:"Imagen de microscopio pendiente de descarga",
  ficha:{formula:"Fórmula ideal",d:"Espaciado basal",cic:"Capacidad de intercambio catiónico",se:"Superficie específica",hinch:"Hinchamiento",plast:"Plasticidad",grupo:"Grupo",micro:"Al microscopio electrónico",mano:"Muestras de mano",espana:"En España",estructura:"Su lámina",verMapa:"Ver en el mapa"},
  niveles:["nulo","bajo","medio","alto","muy alto"],
  cicU:"meq/100 g",seU:"m²/g",
  colIACT:"Colección del IACT",colPriv:"Colección privada",
  todos:"Todos",
  /* estructura */
  estTit:"Construye una arcilla",estIntro:"Los minerales de la arcilla se construyen con dos piezas: la capa tetraédrica (T), de silicio y oxígeno, y la capa octaédrica (O), de aluminio o magnesio con oxígeno e hidroxilos. Pulsa T y O para montar una lámina y elige qué hay entre las láminas.",
  paso1:"1 · Monta la lámina",paso2:"2 · ¿Qué hay entre las láminas?",paso3:"3 · Capa octaédrica",
  borrar:"Borrar",fibras:"Cintas invertidas (fibrosas)",
  di:"Dioctaédrica (2 de cada 3 huecos)",tri:"Trioctaédrica (3 de 3)",
  inter:{nada:"Nada",H:"Nada: puentes de hidrógeno",aguaH:"Una capa de agua",K:"Potasio (K⁺)",agua:"Cationes con agua (carga baja)",Mg:"Mg²⁺ y dos capas de agua (carga alta)",hidroxido:"Una lámina de hidróxido"},
  empieza:"Empieza pulsando T.",siguiente1:"Ahora añade una capa O.",siguiente2:"Tienes una lámina 1:1. Puedes añadir otra T para hacer una 2:1.",completa:"Lámina 2:1 completa.",
  noValida:"Esa combinación no forma un mineral de la arcilla. Prueba T, luego O y luego T.",
  hincha:"Hincha con agua",nohincha:"No hincha",hinchaPoco:"Hincha poco",carga:"Carga de la lámina",verFicha:"Ver ficha",
  leyT:"Tetraedros SiO₄",leyO:"Octaedros Al o Mg",leyVac:"Hueco vacío",leyK:"K⁺",leyCat:"Catión de cambio",leyH2O:"Agua",leyHid:"Lámina de hidróxido",
  sepi:"Sepiolita",pali:"Paligorskita",canal:"Canales con agua",
  /* propiedades */
  propTit:"Propiedades comparadas",propIntro:"Toca una propiedad para comparar. Los valores son rangos típicos aproximados: cambian mucho de una muestra a otra.",
  props:{cic:"Intercambio catiónico",se:"Superficie específica",hinch:"Hinchamiento",plast:"Plasticidad"},
  propTxt:{cic:"Cuántos cationes puede intercambiar la arcilla con el agua que la rodea (miliequivalentes por 100 g). Depende de la carga de la lámina y de si los cationes son accesibles.",
   se:"Superficie de un gramo de arcilla. En las esmectitas cuenta también la superficie entre láminas: un gramo puede tener tanta superficie como una pista de tenis grande.",
   hinch:"Cuánto aumenta de volumen al mojarse. Solo hinchan de verdad las esmectitas, sobre todo las sódicas, porque el agua entra entre sus láminas.",
   plast:"Capacidad de moldearse mojada sin romperse y mantener la forma. Es la propiedad de la que vive la alfarería."},
  aguaTit:"¿Qué pasa al añadir agua?",echarAgua:"Añadir agua",secar:"Secar",
  /* aplicaciones */
  aplTit:"Aplicaciones",aplIntro:"Las arcillas están en muchos objetos de casa, en la industria y en el patrimonio. Toca una tarjeta para saber más.",minerales:"Minerales",
  /* yacimientos */
  yacTit:"Yacimientos",yacIntro:"Principales yacimientos de minerales de la arcilla en España. Toca un punto.",
  leyMapa:{fibrosa:"Sepiolita y paligorskita",bentonita:"Bentonita (esmectitas)",caolin:"Caolín",pasado:"Explotado en el pasado"},
  mundo:"En el mundo",hoy:"En explotación",pasado:"Explotado en el pasado",
  /* estudio */
  estuTit:"Cómo se estudian",estuIntro:"Las partículas son demasiado pequeñas para el microscopio óptico. Se identifican con rayos X y se observan con microscopios electrónicos.",
  drxTit:"Difracción de rayos X: los tres tratamientos",drxIntro:"Elige un mineral y compara sus difractogramas: agregado orientado seco al aire, tras etilenglicol y tras calentar a 550 °C.",
  AO:"Seco al aire",EG:"Etilenglicol",C:"550 °C",mezcla:"Mezcla",grados:"°2θ (Cu Kα)",tecnicas:"Otras técnicas",
  /* sea */
  seaTit:"La Sociedad Española de Arcillas",seaIntro:"La SEA reúne a investigadores, docentes y empresas que trabajan con arcillas en España.",
  hist:"Historia",premios:"Premios",premiosL:["Premio Martín-Vivaldi","Premio José María Serratosa","Premios Jóvenes Investigadores","Premio SEA de Fotografía Científica"],
  red:"En red",redT:"Forma parte de la AIPEA (Association Internationale pour l’Étude des Argiles) y de la ECGA (European Clay Groups Association). Tiene más de un centenar de socios, y como socios colectivos a CIEMAT, Clariant, Sepiolsa y Tolsa.",
  sede:"Sede",sedeT:"Av. de las Palmeras, 4, 18100 Armilla (Granada).",web:"Web de la SEA",
  creditos:"Créditos",
  credT:["Imágenes de microscopio electrónico: «Image reproduced from the ‘Images of Clay Archive’ of the Mineralogical Society of Great Britain & Ireland and The Clay Minerals Society (https://www.minersoc.org/images-of-clay.html)». El autor de cada imagen figura en su leyenda.","Muestras de mano: colección del IACT (CSIC-UGR), colecciones privadas y Wikimedia Commons, con el autor y la licencia en cada leyenda.","Mapa y yacimientos: exposición «Minerales estratégicos» (IACT-CSIC).","Coordinación: Alberto López Galindo (IACT-CSIC)."],
  /* qué es */
  queTit:"¿Qué es una arcilla?",queIntro:"La palabra «arcilla» tiene dos significados, y conviene no confundirlos.",
  tam:"Arcilla como tamaño",tamT:"En sedimentología, arcilla es toda partícula menor de 2 micrómetros (0,002 mm), sea del mineral que sea. Puede haber «arcilla» de cuarzo o de calcita.",
  min:"Arcilla como mineral",minT:"En mineralogía, los minerales de la arcilla son filosilicatos (silicatos en láminas) hidratados, de grano muy fino. Dan plasticidad a la arcilla cuando está húmeda y la endurecen al secarla o cocerla.",
  def:"La AIPEA y la Clay Minerals Society definen la arcilla como un material natural formado sobre todo por minerales de grano fino, que suele ser plástico con la cantidad adecuada de agua y se endurece al secarse o cocerse.",
  escTit:"Del tamaño de la arena al de la arcilla",escIntro:"Mueve el control para cambiar el tamaño de la partícula.",
  clases:["Arena","Limo","Arcilla"],
  analog:"Si una partícula de arcilla de 2 µm fuera un grano de arroz de 5 mm, esta partícula mediría",
  irEst:"Ver cómo son por dentro",
  /* juego */
  jTit:"¿Qué arcilla es?",jIntro:"Ocho preguntas sobre lo que has visto.",empezar:"Empezar",otra:"Otra vez",sig:"Siguiente",
  pregImg:"¿Qué mineral aparece en esta imagen de microscopio?",bien:"¡Correcto!",mal:"No: es ",fin:"Has acertado {n} de {t}.",
  pie:"Sociedad Española de Arcillas · sea-arcillas.es · Funciona sin conexión una vez cargada."
 },
 en:{titulo:"Clay minerals",sea:"Spanish Clay Society",volver:"Back",inicio:"Home",saber:"Learn more",cerrar:"Close",
  sello:"Spanish Clay Society (SEA)",lema:"Layers a few nanometres thick that stack, swell with water, roll into tubes or form fibres. With them we make porcelain, paper and medicines, seal waste, and the Maya painted their blue.",
  pila:"Tap the stack to pull its sheets apart",
  b:[["What is clay?","Size and mineral"],["Structure","Build the layers"],["Minerals","Groups and cards"],["Properties","Exchange, swelling, surface"],["Uses","From porcelain to Maya blue"],["Deposits","Spain and the world"],["How we study them","X-rays and microscopes"],["The SEA","History and credits"]],
  juego:"Game: which clay is it?",
  foto:"Image: ",ioc:"“Images of Clay” archive (MinSoc and CMS)",
  sinfoto:"Microscope image waiting to be downloaded",
  ficha:{formula:"Ideal formula",d:"Basal spacing",cic:"Cation exchange capacity",se:"Specific surface area",hinch:"Swelling",plast:"Plasticity",grupo:"Group",micro:"Under the electron microscope",mano:"Hand specimens",espana:"In Spain",estructura:"Its layer",verMapa:"See on the map"},
  niveles:["none","low","medium","high","very high"],
  cicU:"meq/100 g",seU:"m²/g",
  colIACT:"IACT collection",colPriv:"Private collection",
  todos:"All",
  estTit:"Build a clay",estIntro:"Clay minerals are built from two pieces: the tetrahedral sheet (T), of silicon and oxygen, and the octahedral sheet (O), of aluminium or magnesium with oxygen and hydroxyls. Tap T and O to assemble a layer, then choose what sits between layers.",
  paso1:"1 · Build the layer",paso2:"2 · What is between the layers?",paso3:"3 · Octahedral sheet",
  borrar:"Clear",fibras:"Inverted ribbons (fibrous)",
  di:"Dioctahedral (2 of every 3 sites)",tri:"Trioctahedral (3 of 3)",
  inter:{nada:"Nothing",H:"Nothing: hydrogen bonds",aguaH:"One layer of water",K:"Potassium (K⁺)",agua:"Cations with water (low charge)",Mg:"Mg²⁺ and two water layers (high charge)",hidroxido:"A hydroxide sheet"},
  empieza:"Start by tapping T.",siguiente1:"Now add an O sheet.",siguiente2:"You have a 1:1 layer. You can add another T to make a 2:1 layer.",completa:"2:1 layer complete.",
  noValida:"That combination does not make a clay mineral. Try T, then O, then T.",
  hincha:"Swells with water",nohincha:"Does not swell",hinchaPoco:"Swells a little",carga:"Layer charge",verFicha:"See card",
  leyT:"SiO₄ tetrahedra",leyO:"Al or Mg octahedra",leyVac:"Empty site",leyK:"K⁺",leyCat:"Exchangeable cation",leyH2O:"Water",leyHid:"Hydroxide sheet",
  sepi:"Sepiolite",pali:"Palygorskite",canal:"Water-filled channels",
  propTit:"Properties compared",propIntro:"Tap a property to compare. Values are approximate typical ranges: they vary a lot from one sample to another.",
  props:{cic:"Cation exchange",se:"Specific surface",hinch:"Swelling",plast:"Plasticity"},
  propTxt:{cic:"How many cations the clay can swap with the surrounding water (milliequivalents per 100 g). It depends on the layer charge and on whether the cations can be reached.",
   se:"The surface area of one gram of clay. In smectites the surface between layers counts too: one gram can have as much surface as a large tennis court.",
   hinch:"How much its volume grows when wet. Only smectites really swell, especially sodium ones, because water enters between their layers.",
   plast:"The ability to be shaped when wet without breaking and to keep that shape. Pottery depends on it."},
  aguaTit:"What happens when water is added?",echarAgua:"Add water",secar:"Dry",
  aplTit:"Uses",aplIntro:"Clays are in many things at home, in industry and in our heritage. Tap a card to learn more.",minerales:"Minerals",
  yacTit:"Deposits",yacIntro:"Main clay-mineral deposits in Spain. Tap a point.",
  leyMapa:{fibrosa:"Sepiolite and palygorskite",bentonita:"Bentonite (smectites)",caolin:"Kaolin",pasado:"Mined in the past"},
  mundo:"Around the world",hoy:"Mined today",pasado:"Mined in the past",
  estuTit:"How we study them",estuIntro:"The particles are too small for a light microscope. They are identified with X-rays and observed with electron microscopes.",
  drxTit:"X-ray diffraction: the three treatments",drxIntro:"Choose a mineral and compare its diffractograms: oriented aggregate air-dried, after ethylene glycol and after heating to 550 °C.",
  AO:"Air-dried",EG:"Ethylene glycol",C:"550 °C",mezcla:"Mixture",grados:"°2θ (Cu Kα)",tecnicas:"Other techniques",
  seaTit:"The Spanish Clay Society",seaIntro:"The SEA brings together researchers, teachers and companies working with clays in Spain.",
  hist:"History",premios:"Awards",premiosL:["Martín-Vivaldi Award","José María Serratosa Award","Young Researchers Awards","SEA Scientific Photography Award"],
  red:"Networks",redT:"It is a member of AIPEA (Association Internationale pour l’Étude des Argiles) and of ECGA (European Clay Groups Association). It has more than a hundred members, and CIEMAT, Clariant, Sepiolsa and Tolsa as corporate members.",
  sede:"Address",sedeT:"Av. de las Palmeras, 4, 18100 Armilla (Granada), Spain.",web:"SEA website",
  creditos:"Credits",
  credT:["Electron microscope images: “Image reproduced from the ‘Images of Clay Archive’ of the Mineralogical Society of Great Britain & Ireland and The Clay Minerals Society (https://www.minersoc.org/images-of-clay.html)”. Each image’s author is given in its caption.","Hand specimens: IACT collection (CSIC-UGR), private collections and Wikimedia Commons, with author and licence in each caption.","Map and deposits: “Strategic minerals” exhibition (IACT-CSIC).","Coordination: Alberto López Galindo (IACT-CSIC)."],
  queTit:"What is clay?",queIntro:"The word “clay” has two meanings, and it helps not to mix them up.",
  tam:"Clay as a size",tamT:"In sedimentology, clay is any particle smaller than 2 micrometres (0.002 mm), whatever its mineral. There can be quartz or calcite “clay”.",
  min:"Clay as a mineral",minT:"In mineralogy, clay minerals are very fine-grained hydrous phyllosilicates (sheet silicates). They make clay plastic when wet and let it harden when dried or fired.",
  def:"AIPEA and the Clay Minerals Society define clay as a naturally occurring material composed mainly of fine-grained minerals, generally plastic with the right amount of water, which hardens when dried or fired.",
  escTit:"From sand size to clay size",escIntro:"Move the slider to change the particle size.",
  clases:["Sand","Silt","Clay"],
  analog:"If a 2 µm clay particle were a 5 mm grain of rice, this particle would measure",
  irEst:"See what they are like inside",
  jTit:"Which clay is it?",jIntro:"Eight questions about what you have seen.",empezar:"Start",otra:"Play again",sig:"Next",
  pregImg:"Which mineral is shown in this microscope image?",bien:"Correct!",mal:"No: it is ",fin:"You got {n} out of {t}.",
  pie:"Spanish Clay Society · sea-arcillas.es · Works offline once loaded."
 }
};
function U(k){ var o=UI[lang], p=k.split("."); for(var i=0;i<p.length;i++){ o=o&&o[p[i]]; } return o; }
function L(o){ return o ? (o[lang]!==undefined?o[lang]:o.es) : ""; }
function $(s,c){ return (c||document).querySelector(s); }
function $$(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function num(x){ return lang==="es" ? String(x).replace(/(\d)\.(\d)/g,"$1,$2") : String(x).replace(/(\d),(\d)/g,"$1.$2"); }
function minById(id){ for(var i=0;i<MINERALES.length;i++) if(MINERALES[i].id===id) return MINERALES[i]; return null; }
function grupoNombre(id){ for(var i=0;i<GRUPOS.length;i++) if(GRUPOS[i].id===id) return L(GRUPOS[i]); return ""; }

/* ---------- imágenes ---------- */
function semFile(f){ return f.replace(/\.(jpe?g|png|gif)$/i,".webp"); }
function semImgs(id){
  return (SEM[id]||[]).map(function(s){
    var mm = minById(id), nombre = s.m ? L(s.m) : (mm?L(mm).n:id);
    return {src:"img/sem/"+semFile(s.f), mini:"img/sem/mini/"+semFile(s.f), nombre:nombre, autor:s.a, tipo:s.t||"",
      cap:"<b>"+esc(nombre)+"</b>"+(s.t?" · "+s.t:"")+"<br>"+U("foto")+esc(s.a)+" · "+U("ioc")};
  });
}
function colTxt(c){ if(c==="del IACT") return U("colIACT"); if(c==="privada") return U("colPriv"); return c; }
function manoImgs(id){
  return (MANO[id]||[]).map(function(x){ var v=x[lang]||x.es;
    return {src:"img/mano/"+x.f, mini:"img/mano/mini/"+x.f, cap:"<b>"+esc(v.alt)+"</b>"+(v.cap?"<br>"+esc(v.cap):"")+"<br>"+esc(colTxt(v.col))};
  });
}
function figura(im,mini){
  return '<figure><img loading="lazy" src="'+(mini?im.mini:im.src)+'" alt="" onerror="quitaFig(this)"><figcaption>'+im.cap+'</figcaption></figure>';
}
function portadaImg(id){
  var s=semImgs(id); if(s.length) return {src:s[0].mini,sem:true};
  var m=manoImgs(id); if(m.length) return {src:m[0].mini,sem:false};
  return null;
}

/* ---------- dibujos de láminas ---------- */
var C = {T:"#7fa7c9",Tb:"#4f7ea6",O:"#8fbf8a",Ob:"#5c9457",vac:"#eef3ea",K:"#9b6fb0",cat:"#d1783f",agua:"#5aa9d6",hid:"#c9dfb4",hidb:"#86a96a",txt:"#3b2a1e"};
function capaT(y,w,arriba,n){ // tetraedros: base hacia fuera, vértice hacia la capa O
  var h=26, s="", paso=w/n;
  for(var i=0;i<n;i++){ var x0=i*paso, xm=x0+paso/2;
    if(arriba) s+='<polygon points="'+(x0+2)+','+y+' '+(x0+paso-2)+','+y+' '+xm+','+(y+h)+'" fill="'+C.T+'" stroke="'+C.Tb+'" stroke-width="1.5"/>';
    else s+='<polygon points="'+(x0+2)+','+(y+h)+' '+(x0+paso-2)+','+(y+h)+' '+xm+','+y+'" fill="'+C.T+'" stroke="'+C.Tb+'" stroke-width="1.5"/>';
  }
  return {s:s,h:h};
}
function capaO(y,w,oct,n,hid){
  var h=hid?24:32, s="", paso=w/n, r=Math.min(paso*0.48,h*0.62);
  s+='<rect x="0" y="'+y+'" width="'+w+'" height="'+h+'" rx="4" fill="'+(hid?C.hid:"#e7f2e4")+'" opacity=".55"/>';
  for(var i=0;i<n;i++){ var cx=i*paso+paso/2, cy=y+h/2, vacio=(oct==="di" && i%3===2 && !hid);
    s+='<polygon points="'+cx+','+(cy-r)+' '+(cx+r*0.9)+','+cy+' '+cx+','+(cy+r)+' '+(cx-r*0.9)+','+cy+'" fill="'+(vacio?C.vac:(hid?C.hid:C.O))+'" stroke="'+(hid?C.hidb:C.Ob)+'" stroke-width="1.5"'+(vacio?' stroke-dasharray="3 3"':'')+'/>';
  }
  return {s:s,h:h};
}
function interCapa(y,w,tipo){
  var s="",h=8,i,x;
  if(tipo==="H"||!tipo){ h=10; for(i=0;i<12;i++){ x=12+i*(w-24)/11; s+='<line x1="'+x+'" y1="'+(y+2)+'" x2="'+x+'" y2="'+(y+h-2)+'" stroke="#b9a48c" stroke-width="1.5" stroke-dasharray="2 2"/>'; } }
  else if(tipo==="nada"){ h=10; }
  else if(tipo==="K"){ h=20; for(i=0;i<6;i++){ x=w/12+i*w/6; s+='<circle cx="'+x+'" cy="'+(y+10)+'" r="7" fill="'+C.K+'"/>'; } }
  else if(tipo==="aguaH"){ h=24; for(i=0;i<14;i++){ x=10+i*(w-20)/13; s+='<circle cx="'+x+'" cy="'+(y+12)+'" r="4.5" fill="'+C.agua+'" opacity=".85"/>'; } }
  else if(tipo==="agua"||tipo==="Mg"){ h=tipo==="agua"?40:34;
    for(i=0;i<16;i++){ x=8+i*(w-16)/15; s+='<circle cx="'+x+'" cy="'+(y+9+(i%2)*2)+'" r="4" fill="'+C.agua+'" opacity=".85"/><circle cx="'+(x+6)+'" cy="'+(y+h-9-(i%2)*2)+'" r="4" fill="'+C.agua+'" opacity=".85"/>'; }
    var nc = tipo==="agua"?3:5; for(i=0;i<nc;i++){ x=w/(nc*2)+i*w/nc; s+='<circle cx="'+x+'" cy="'+(y+h/2)+'" r="7" fill="'+(tipo==="Mg"?"#7a8f3a":C.cat)+'" stroke="#fff" stroke-width="1.5"/>'; } }
  else if(tipo==="hidroxido"){ var o=capaO(y+4,w,"tri",9,true); s=o.s; h=o.h+8; }
  return {s:s,h:h};
}
/* cfg: {seq:"TO"|"TOT", oct:"di"|"tri", inter:...} ; dibuja dos láminas */
function svgLaminas(cfg,opt){
  opt=opt||{}; var w=opt.w||340, n=9, y=14, s="", d0=null, d1=null;
  var reps = opt.reps||2;
  for(var r=0;r<reps;r++){
    var top=y;
    if(r===0) d0=top;
    if(cfg.seq==="TO"||cfg.seq==="TOT"){ var t=capaT(y,w,true,n); s+=t.s; y+=t.h; }
    if(cfg.seq.length>=2){ var o=capaO(y,w,cfg.oct,n); s+=o.s; y+=o.h; }
    if(cfg.seq==="TOT"){ var t2=capaT(y,w,false,n); s+=t2.s; y+=t2.h; }
    if(r<reps-1){ var ic=interCapa(y,w,cfg.inter); s+=ic.s; y+=ic.h; d1=y; }
  }
  var H=y+14, flecha="";
  if(reps>1 && opt.d){ var x=w+14; flecha='<line x1="'+x+'" y1="'+d0+'" x2="'+x+'" y2="'+d1+'" stroke="'+C.txt+'" stroke-width="1.5" marker-start="url(#fl)" marker-end="url(#fl)"/><text x="'+(x+6)+'" y="'+((d0+d1)/2+5)+'" font-size="15" font-family="Georgia,serif" fill="'+C.txt+'">'+esc(opt.d)+'</text>'; }
  return '<svg viewBox="0 0 '+(w+(opt.d?90:0))+' '+H+'" role="img" aria-label="'+esc(opt.alt||"")+'"><defs><marker id="fl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="'+C.txt+'"/></marker></defs>'+s+flecha+'</svg>';
}
function svgFibra(tipo){
  var w=360,h=240,s="",bw=tipo==="pali"?44:62,bh=46,gap=tipo==="pali"?18:24,row,col;
  for(row=0;row<4;row++){
    var off=(row%2)*((bw+gap)/2), y=12+row*(bh+8);
    for(col=-1;col<6;col++){ var x=off+col*(bw+gap)+8;
      s+='<g><rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+(bh*0.28)+'" rx="2" fill="'+C.T+'" stroke="'+C.Tb+'"/><rect x="'+x+'" y="'+(y+bh*0.30)+'" width="'+bw+'" height="'+(bh*0.40)+'" rx="2" fill="'+C.O+'" stroke="'+C.Ob+'"/><rect x="'+x+'" y="'+(y+bh*0.72)+'" width="'+bw+'" height="'+(bh*0.28)+'" rx="2" fill="'+C.T+'" stroke="'+C.Tb+'"/></g>';
      var cx=x+bw+gap/2;
      s+='<rect x="'+(x+bw+3)+'" y="'+(y+6)+'" width="'+(gap-6)+'" height="'+(bh-12)+'" rx="5" fill="#d7ecf7"/><circle cx="'+cx+'" cy="'+(y+bh/2-6)+'" r="3.5" fill="'+C.agua+'"/><circle cx="'+cx+'" cy="'+(y+bh/2+6)+'" r="3.5" fill="'+C.agua+'"/>';
    }
  }
  return '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+esc(tipo==="pali"?U("pali"):U("sepi"))+'"><clipPath id="cf"><rect width="'+w+'" height="'+h+'" rx="10"/></clipPath><g clip-path="url(#cf)">'+s+'</g></svg>';
}
function svgInter(){
  var w=340,y=10,s="",seqs=[["TOT","K"],["TOT","agua"],["TOT","K"],["TOT",null]];
  for(var i=0;i<seqs.length;i++){
    var t=capaT(y,w,true,9); s+=t.s; y+=t.h; var o=capaO(y,w,"di",9); s+=o.s; y+=o.h; var t2=capaT(y,w,false,9); s+=t2.s; y+=t2.h;
    if(seqs[i][1]){ var ic=interCapa(y,w,seqs[i][1]); s+=ic.s; y+=ic.h; }
  }
  return '<svg viewBox="0 0 '+w+' '+(y+10)+'" role="img">'+s+'</svg>';
}
function dibujoMineral(m,opt){
  var l=m.lam; opt=opt||{};
  if(l.t==="fibra") return svgFibra(m.id==="paligorskita"?"pali":"sepi");
  if(l.t==="inter") return svgInter();
  var inter = l.inter || (l.agua?"aguaH":"H");
  return svgLaminas({seq:l.t,oct:l.oct,inter:inter},{d:opt.d,reps:2,alt:L(m).n});
}
function leyenda(tipos){
  var it={T:[C.T,U("leyT")],O:[C.O,U("leyO")],vac:[C.vac,U("leyVac")],K:[C.K,U("leyK")],cat:[C.cat,U("leyCat")],agua:[C.agua,U("leyH2O")],hid:[C.hid,U("leyHid")]};
  return '<div class="leyenda">'+tipos.map(function(k){return '<span><i style="background:'+it[k][0]+(k==="vac"?";border:1px dashed "+C.Ob:"")+'"></i>'+it[k][1]+'</span>';}).join("")+'</div>';
}

/* ---------- ficha ---------- */
var dlg;
function abrirDialogo(html){
  if(!dlg){ dlg=document.createElement("dialog"); document.body.appendChild(dlg);
    dlg.addEventListener("click",function(e){ if(e.target===dlg) dlg.close(); }); }
  dlg.innerHTML='<div class="ficha"><button class="cerrar" aria-label="'+U("cerrar")+'">×</button>'+html+'</div>';
  $(".cerrar",dlg).onclick=function(){dlg.close();};
  $$("[data-ir]",dlg).forEach(function(b){ b.onclick=function(){ dlg.close(); location.hash=b.getAttribute("data-ir"); }; });
  $$("[data-ficha]",dlg).forEach(function(b){ b.onclick=function(){ abrirFicha(b.getAttribute("data-ficha")); }; });
  if(dlg.showModal) dlg.showModal(); else dlg.setAttribute("open","");
  dlg.scrollTop=0;
}
function dTxt(m){ return lang==="en"?m.d.replace(/(\d),(\d)/g,"$1.$2").replace("con etilenglicol","with ethylene glycol").replace("hidratada","hydrated").replace("Variable","Variable").replace("p. ej.","e.g."):m.d; }
function rango(r,u){ return num(r[0])+"–"+num(r[1])+" "+u; }
function abrirFicha(id){
  var m=minById(id); if(!m) return; var t=L(m);
  var sem=semImgs(id), mano=manoImgs(id);
  var h='<span class="grupo" style="color:var(--terracota2);text-transform:uppercase;font-size:.8rem;letter-spacing:.06em">'+esc(grupoNombre(m.grupo))+'</span><h2>'+esc(t.n)+'</h2><p class="intro">'+esc(t.r)+'</p>';
  if(sem.length) h+='<h3>'+U("ficha.micro")+'</h3><div class="galeria">'+sem.map(function(x){return figura(x);}).join("")+'</div>';
  h+='<p>'+esc(t.t)+'</p>';
  h+='<div class="datos">'+
    '<div class="dato"><small>'+U("ficha.formula")+'</small><b>'+esc(lang==="en"?m.formula.replace("p. ej.","e.g.").replace(/ilita\/esmectita, clorita\/esmectita/,"illite/smectite, chlorite/smectite"):m.formula)+'</b></div>'+
    '<div class="dato"><small>'+U("ficha.d")+'</small><b>'+esc(dTxt(m))+'</b></div>'+
    '<div class="dato"><small>'+U("ficha.cic")+'</small><b>'+rango(m.cic,U("cicU"))+'</b></div>'+
    '<div class="dato"><small>'+U("ficha.se")+'</small><b>'+rango(m.se,U("seU"))+'</b></div>'+
    '<div class="dato"><small>'+U("ficha.hinch")+'</small><b>'+U("niveles")[m.hinch]+'</b></div>'+
    '<div class="dato"><small>'+U("ficha.plast")+'</small><b>'+U("niveles")[m.plast]+'</b></div></div>';
  h+='<h3>'+U("ficha.estructura")+'</h3><div class="mini-estructura">'+dibujoMineral(m,{d:(m.lam.t==="fibra"||m.lam.t==="inter")?null:num(m.d.split(" ")[0])+" Å"})+'</div>';
  if(m.espana&&m.espana.length){
    h+='<h3>'+U("ficha.espana")+'</h3><ul>'+m.espana.map(function(k){var p=MAPA.lugares[k]; return '<li>'+esc(L(p).n)+'</li>';}).join("")+'</ul><button class="boton sec" data-ir="#yacimientos">'+U("ficha.verMapa")+'</button>';
  }
  if(mano.length) h+='<h3>'+U("ficha.mano")+'</h3><div class="galeria">'+mano.map(function(x){return figura(x,true);}).join("")+'</div>';
  abrirDialogo(h);
}

/* ---------- pantallas ---------- */
var P = {};
var main;

P.inicio = function(){
  var b=U("b"), ids=["arcilla","estructura","minerales","propiedades","aplicaciones","yacimientos","estudio","sea"];
  var h='<section class="pantalla"><div class="portada"><div><span class="sello">'+U("sello")+'</span><h1>'+U("titulo")+'</h1><p class="intro">'+U("lema")+'</p>'+
   '<div class="pila" id="pila" role="button" tabindex="0" aria-label="'+U("pila")+'">'+pilaSVG()+'<div class="ayuda">'+U("pila")+'</div></div></div>'+
   '<div class="heroe" id="heroe"><div class="sinfoto">'+svgLaminas({seq:"TOT",oct:"di",inter:"agua"},{reps:3})+'</div></div></div>'+
   '<div class="botones">'+ids.map(function(id,i){ return '<button class="boton-grande" data-ir="#'+id+'"><span class="num">'+(i+1)+'</span><b>'+b[i][0]+'</b><span>'+b[i][1]+'</span></button>'; }).join("")+'</div>'+
   '<div class="juego-enlace"><button class="boton" data-ir="#juego">'+U("juego")+'</button></div></section>';
  main.innerHTML=h;
  var pila=$("#pila"); function tg(){ pila.classList.toggle("abierta"); }
  pila.onclick=tg; pila.onkeydown=function(e){ if(e.key==="Enter"||e.key===" "){e.preventDefault();tg();} };
  heroe();
};
function pilaSVG(){
  return '<svg viewBox="0 0 340 120" aria-hidden="true"><g class="lam lam1">'+capaT(6,340,true,10).s+'</g><g class="lam lam2">'+capaO(34,340,"di",10).s+'</g><g class="lam lam3">'+capaT(68,340,false,10).s+'</g>'+
   '</svg>';
}
var heroeTimer;
function heroe(){
  clearInterval(heroeTimer);
  var cont=$("#heroe"); if(!cont) return;
  var lista=HEROE.map(function(p){ return semImgs(p[0])[p[1]]; }).filter(Boolean), ok=[], i=0;
  lista.forEach(function(im){
    var img=new Image(); img.alt=""; img.onload=function(){
      if(!document.body.contains(cont)) return;
      ok.push({img:img,im:im}); cont.appendChild(img);
      if(ok.length===1){ var sf=$(".sinfoto",cont); if(sf) sf.remove(); mostrar(0); }
    }; img.src=im.src;
  });
  var pie=document.createElement("div"); pie.className="pie"; cont.appendChild(pie);
  function mostrar(k){ ok.forEach(function(o,j){ o.img.classList.toggle("ver",j===k); }); var o=ok[k]; if(o){ pie.innerHTML=o.im.cap; cont.appendChild(pie);} }
  heroeTimer=setInterval(function(){ if(ok.length>1){ i=(i+1)%ok.length; mostrar(i);} },5500);
}

P.arcilla = function(){
  var h='<section class="pantalla"><h2>'+U("queTit")+'</h2><p class="intro">'+U("queIntro")+'</p>'+
   '<div class="dos"><div class="caja"><h3>'+U("tam")+'</h3><p>'+U("tamT")+'</p></div><div class="caja"><h3>'+U("min")+'</h3><p>'+U("minT")+'</p></div></div>'+
   '<div class="caja"><p style="margin:0">'+U("def")+'</p></div>'+
   '<div class="caja escala"><h3>'+U("escTit")+'</h3><p>'+U("escIntro")+'</p><input type="range" id="esc" min="0" max="100" value="20" aria-label="'+U("escTit")+'">'+
   '<div class="regla"><span>2 mm</span><span>63 µm</span><span>2 µm</span><span>0,1 µm</span></div><div class="vista" id="vista"></div><p id="analog" style="margin-bottom:0"></p></div>'+
   '<p style="margin-top:1.2rem"><button class="boton" data-ir="#estructura">'+U("irEst")+' →</button></p></section>';
  main.innerHTML=h;
  var inp=$("#esc");
  function upd(){
    var v=+inp.value, logd=Math.log10(2000)-v/100*(Math.log10(2000)-Math.log10(0.1)), d=Math.pow(10,logd); // µm
    var clase = d>=63?0:(d>=2?1:2), col=["#c8902f","#b07c4f","#b4532a"][clase];
    var px=Math.max(4,Math.min(160,20+ (logd+1)/(Math.log10(2000)+1)*140));
    var txt = d>=1000? num((d/1000).toFixed(1))+" mm" : (d>=1? num(Math.round(d))+" µm" : num(d.toFixed(2))+" µm");
    $("#vista").innerHTML='<svg viewBox="0 0 400 180" style="width:100%;height:100%"><circle cx="160" cy="90" r="'+(px/2)+'" fill="'+col+'" opacity=".85"/><text x="270" y="80" font-family="Georgia,serif" font-size="26" fill="#3b2a1e">'+txt+'</text><text x="270" y="110" font-size="18" fill="'+col+'" font-weight="700">'+U("clases")[clase]+'</text></svg>';
    var escala=d*2500/1e6; // m
    var e = escala>=1? num(escala.toFixed(1))+" m" : (escala>=0.01? num((escala*100).toFixed(1))+" cm" : num((escala*1000).toFixed(1))+" mm");
    $("#analog").textContent=U("analog")+" "+e+".";
  }
  inp.oninput=upd; upd();
};

var est={seq:"",oct:"di",inter:null,fibra:null};
P.estructura = function(){
  var h='<section class="pantalla"><h2>'+U("estTit")+'</h2><p class="intro">'+U("estIntro")+'</p><div class="constructor"><div class="panel"><div class="lienzo" id="lienzo"></div>'+
   leyenda(["T","O","vac","K","cat","agua","hid"])+'</div><div class="panel"><div class="paso">'+U("paso1")+'</div><div class="controles">'+
   '<button class="ctl T" id="addT">+ T</button><button class="ctl O" id="addO">+ O</button><button class="ctl" id="borrar">↺ '+U("borrar")+'</button><button class="ctl" id="fibra">'+U("fibras")+'</button></div>'+
   '<p id="msg" class="nota"></p><div id="pasoInter"></div><div class="paso">'+U("paso3")+'</div><div class="controles"><button class="ctl" data-oct="di">'+U("di")+'</button><button class="ctl" data-oct="tri">'+U("tri")+'</button></div>'+
   '<div class="resultado" id="res"></div></div></div></section>';
  main.innerHTML=h;
  $("#addT").onclick=function(){ est.fibra=null; if(est.seq===""||est.seq==="TO"){ est.seq+="T"; } else { flash(U("noValida")); return; } if(est.seq==="TOT"&&(est.inter==="H"||est.inter==="aguaH"))est.inter=null; pintar(); };
  $("#addO").onclick=function(){ est.fibra=null; if(est.seq==="T"){ est.seq="TO"; est.inter="H"; } else { flash(U("noValida")); return; } pintar(); };
  $("#borrar").onclick=function(){ est={seq:"",oct:est.oct,inter:null,fibra:null}; pintar(); };
  $("#fibra").onclick=function(){ est.fibra=est.fibra==="sepi"?"pali":"sepi"; pintar(); };
  $$("[data-oct]").forEach(function(b){ b.onclick=function(){ est.oct=b.getAttribute("data-oct"); pintar(); }; });
  pintar();
};
function flash(t){ var m=$("#msg"); if(m){ m.textContent=t; m.style.color="var(--terracota2)"; } }
function resultadoEst(){
  var s=est.seq,o=est.oct,i=est.inter;
  if(est.fibra) return est.fibra==="sepi"?{id:"sepiolita",d:"12,1 Å",h:0}:{id:"paligorskita",d:"10,5 Å",h:0};
  if(s==="TO"&&i==="H") return o==="di"?{id:"caolinita",d:"7,2 Å",h:0,carga:"≈0",ej:{es:"Caolinita, dickita, nacrita",en:"Kaolinite, dickite, nacrite"}}:{id:"serpentina",d:"7,3 Å",h:0,carga:"≈0",n:{es:"Serpentina",en:"Serpentine"},ej:{es:"Lizardita, crisotilo, antigorita. No son arcillas en sentido estricto, pero comparten la lámina 1:1 con la caolinita.",en:"Lizardite, chrysotile, antigorite. Not clays in the strict sense, but they share the 1:1 layer with kaolinite."}};
  if(s==="TO"&&i==="aguaH") return o==="di"?{id:"halloysita",d:"10 Å",h:0,carga:"≈0",ej:{es:"Halloysita-10 Å; al perder el agua pasa a 7 Å",en:"Halloysite-10 Å; it drops to 7 Å when dehydrated"}}:{id:"serpentina",d:"7,3 Å",h:0,n:{es:"Serpentina",en:"Serpentine"},ej:{es:"Con magnesio no hay un equivalente hidratado común: queda la serpentina.",en:"With magnesium there is no common hydrated equivalent: serpentine remains."}};
  if(s==="TOT"){
    if(i==="nada") return {id:null,d:o==="di"?"9,2 Å":"9,3 Å",h:0,carga:"0",n:o==="di"?{es:"Pirofilita",en:"Pyrophyllite"}:{es:"Talco",en:"Talc"},ej:{es:"Lámina 2:1 sin carga: nada que sujetar ni intercambiar entre láminas.",en:"An uncharged 2:1 layer: nothing to hold or exchange between layers."}};
    if(i==="K") return o==="di"?{id:"ilita",d:"10 Å",h:0,carga:"0,6–0,9",ej:{es:"Ilita, moscovita, glauconita",en:"Illite, muscovite, glauconite"}}:{id:null,d:"10 Å",h:0,carga:"≈1",n:{es:"Micas trioctaédricas",en:"Trioctahedral micas"},ej:{es:"Biotita, flogopita",en:"Biotite, phlogopite"}};
    if(i==="agua") return o==="di"?{id:"montmorillonita",d:"12–15 Å",h:3,carga:"0,2–0,6",n:{es:"Esmectitas dioctaédricas",en:"Dioctahedral smectites"},ej:{es:"Montmorillonita, beidellita, nontronita",en:"Montmorillonite, beidellite, nontronite"}}:{id:"saponita",d:"12–15 Å",h:3,carga:"0,2–0,6",n:{es:"Esmectitas trioctaédricas",en:"Trioctahedral smectites"},ej:{es:"Saponita, hectorita",en:"Saponite, hectorite"}};
    if(i==="Mg") return {id:"vermiculita",d:"14,4 Å",h:1,carga:"0,6–0,9",ej:{es:"Casi siempre trioctaédrica",en:"Almost always trioctahedral"}};
    if(i==="hidroxido") return {id:"clorita",d:"14,2 Å",h:0,carga:"variable",ej:o==="di"?{es:"Donbassita (di) y sudoita (di-tri) son raras; casi todas son trioctaédricas",en:"Donbassite (di) and sudoite (di-tri) are rare; most are trioctahedral"}:{es:"Clinocloro, chamosita",en:"Clinochlore, chamosite"}};
  }
  return null;
}
function pintar(){
  var lz=$("#lienzo"); if(!lz) return;
  $$("[data-oct]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-oct")===est.oct); });
  $("#fibra").setAttribute("aria-pressed",!!est.fibra);
  var msg=$("#msg"); msg.style.color="";
  var pi=$("#pasoInter"), r=$("#res");
  if(est.fibra){ lz.innerHTML=svgFibra(est.fibra); msg.textContent=U("canal")+" · "+(est.fibra==="sepi"?U("sepi"):U("pali")); pi.innerHTML=""; }
  else if(!est.seq){ lz.innerHTML='<p class="nota" style="font-size:1.1rem">'+U("empieza")+'</p>'; msg.textContent=""; pi.innerHTML=""; }
  else {
    var reps = est.seq==="T"||est.seq==="TO"&&!est.inter?1:2;
    var res=resultadoEst();
    lz.innerHTML = svgLaminas({seq:est.seq,oct:est.oct,inter:est.inter||"nada"},{reps:est.seq==="T"?1:(est.inter?2:1),d:res?res.d:null});
    msg.textContent = est.seq==="T"?U("siguiente1"):(est.seq==="TO"?U("siguiente2"):U("completa"));
    var ops = est.seq==="TO"?["H","aguaH"]:(est.seq==="TOT"?["nada","K","agua","Mg","hidroxido"]:[]);
    pi.innerHTML = ops.length? '<div class="paso">'+U("paso2")+'</div><div class="controles">'+ops.map(function(k){return '<button class="ctl" data-inter="'+k+'" aria-pressed="'+(est.inter===k)+'">'+U("inter."+k)+'</button>';}).join("")+'</div>' : "";
    $$("[data-inter]",pi).forEach(function(b){ b.onclick=function(){ est.inter=b.getAttribute("data-inter"); pintar(); }; });
  }
  var rr=resultadoEst();
  if(!rr){ r.innerHTML=""; return; }
  var mm=rr.id?minById(rr.id):null, nombre = rr.n?L(rr.n):(mm?L(mm).n:"");
  var hin = rr.h>=2?U("hincha"):(rr.h===1?U("hinchaPoco"):U("nohincha"));
  var foto = rr.id? semImgs(rr.id)[0] : null;
  r.innerHTML='<h3>'+esc(nombre)+'</h3>'+(rr.ej?'<p style="margin:.1rem 0">'+esc(L(rr.ej))+'</p>':'')+
    '<div class="datos"><div class="dato"><small>'+U("ficha.d")+'</small><b class="grande">'+num(rr.d)+'</b></div><div class="dato"><small>'+U("ficha.hinch")+'</small><b>'+hin+'</b></div>'+(rr.carga?'<div class="dato"><small>'+U("carga")+'</small><b>'+num(rr.carga)+'</b></div>':'')+'</div>'+
    (foto?'<div class="galeria" style="grid-template-columns:1fr">'+figura(foto,true)+'</div>':'')+
    (mm?'<button class="boton" data-ficha="'+mm.id+'">'+U("verFicha")+'</button>':'');
  $$("[data-ficha]",r).forEach(function(b){ b.onclick=function(){ abrirFicha(b.getAttribute("data-ficha")); }; });
}

var filtroGrupo="";
P.minerales = function(){
  var h='<section class="pantalla"><h2>'+U("b")[2][0]+'</h2><div class="filtros"><button class="filtro" data-g="">'+U("todos")+'</button>'+GRUPOS.map(function(g){return '<button class="filtro" data-g="'+g.id+'">'+esc(L(g))+'</button>';}).join("")+'</div><div class="tarjetas" id="tj"></div></section>';
  main.innerHTML=h;
  function pinta(){
    $$(".filtro").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-g")===filtroGrupo); });
    $("#tj").innerHTML=MINERALES.filter(function(m){return !filtroGrupo||m.grupo===filtroGrupo;}).map(function(m){
      var im=portadaImg(m.id), t=L(m);
      return '<article class="tarjeta"><div class="foto">'+(im?'<img loading="lazy" src="'+im.src+'" alt="" onerror="this.replaceWith(dibujo(\''+m.id+'\'))">'+(im.sem?'<span class="marcaimg">SEM/TEM</span>':''):'<div style="padding:.5rem">'+dibujoMineral(m)+'</div>')+'</div>'+
        '<div class="cuerpo"><span class="grupo">'+esc(grupoNombre(m.grupo))+'</span><h3>'+esc(t.n)+'</h3><p>'+esc(t.r)+'</p><div class="etiquetas"><span class="etq">'+esc(dTxt(m))+'</span></div>'+
        '<button class="mas" data-ficha="'+m.id+'">'+U("saber")+'</button></div></article>';
    }).join("");
    $$("[data-ficha]",$("#tj")).forEach(function(b){ b.onclick=function(){ abrirFicha(b.getAttribute("data-ficha")); }; });
  }
  $$(".filtro").forEach(function(b){ b.onclick=function(){ filtroGrupo=b.getAttribute("data-g"); pinta(); }; });
  pinta();
};
window.quitaFig=function(img){ var f=img.closest('figure'), g=f&&f.parentNode; if(f) f.remove(); if(g&&g.classList.contains('galeria')&&!g.querySelector('figure')){ var h=g.previousElementSibling; if(h&&h.tagName==='H3') h.remove(); g.remove(); } };
window.dibujo=function(id){ var d=document.createElement("div"); d.style.padding=".5rem"; d.innerHTML=dibujoMineral(minById(id)); return d; };

var propSel="cic";
var PROP_MIN=["caolinita","halloysita","ilita","montmorillonita","saponita","vermiculita","clorita","sepiolita","paligorskita"];
P.propiedades = function(){
  var ks=["cic","se","hinch","plast"];
  var h='<section class="pantalla"><h2>'+U("propTit")+'</h2><p class="intro">'+U("propIntro")+'</p><div class="filtros">'+ks.map(function(k){return '<button class="filtro" data-p="'+k+'">'+U("props."+k)+'</button>';}).join("")+'</div>'+
   '<div class="caja"><p id="ptxt" style="margin-top:0"></p><div class="barras" id="barras"></div><p class="nota">'+(lang==="es"?"Toca el nombre de un mineral para ver su ficha.":"Tap a mineral’s name to see its card.")+'</p></div>'+
   '<div class="caja"><h3>'+U("aguaTit")+'</h3><div class="hinchamiento"><div><b>'+L(minById("caolinita")).n+'</b><div id="hk"></div></div><div><b>'+L(minById("montmorillonita")).n+'</b><div id="hm"></div></div></div><button class="boton" id="agua">'+U("echarAgua")+'</button></div></section>';
  main.innerHTML=h;
  function pinta(){
    $$("[data-p]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-p")===propSel); });
    $("#ptxt").textContent=U("propTxt."+propSel);
    var max = propSel==="cic"?200:(propSel==="se"?800:4);
    $("#barras").innerHTML=PROP_MIN.map(function(id){ var m=minById(id), a,b,val;
      if(propSel==="cic"||propSel==="se"){ a=m[propSel][0]; b=m[propSel][1]; val=num(a)+"–"+num(b); }
      else { a=0; b=m[propSel]; val=U("niveles")[b]; }
      var izq=a/max*100, an=Math.max(1.5,(b-a)/max*100);
      if(propSel!=="cic"&&propSel!=="se"){ izq=0; an=Math.max(1.5,b/max*100); }
      return '<div class="fila-barra"><button data-ficha="'+id+'">'+esc(L(m).n)+'</button><div class="pista"><div class="rango" style="left:'+izq+'%;width:'+an+'%"></div></div><div class="valor">'+val+(propSel==="cic"?" "+U("cicU"):(propSel==="se"?" "+U("seU"):""))+'</div></div>';
    }).join("");
    $$("[data-ficha]",$("#barras")).forEach(function(b){ b.onclick=function(){ abrirFicha(b.getAttribute("data-ficha")); }; });
  }
  $$("[data-p]").forEach(function(b){ b.onclick=function(){ propSel=b.getAttribute("data-p"); pinta(); }; });
  pinta();
  var mojado=false;
  function dib(){
    $("#hk").innerHTML=svgLaminas({seq:"TO",oct:"di",inter:"H"},{reps:3,w:300});
    $("#hm").innerHTML=svgLaminas({seq:"TOT",oct:"di",inter:mojado?"agua":"nada"},{reps:3,w:300});
    $("#agua").textContent=mojado?U("secar"):U("echarAgua");
  }
  $("#agua").onclick=function(){ mojado=!mojado; dib(); };
  dib();
};

P.aplicaciones = function(){
  var h='<section class="pantalla"><h2>'+U("aplTit")+'</h2><p class="intro">'+U("aplIntro")+'</p><div class="tarjetas">'+APLICACIONES.map(function(a){
    var im=null; for(var i=0;i<a.m.length&&!im;i++){ var s=semImgs(a.m[i]); if(s.length) im=s[0]; }
    return '<article class="tarjeta"><div class="foto">'+(im?'<img loading="lazy" src="'+im.mini+'" alt="" onerror="this.parentNode.style.display=\'none\'">':'')+'</div><div class="cuerpo"><h3>'+esc(L(a).n)+'</h3><div class="etiquetas">'+a.m.map(function(id){return '<span class="etq">'+esc(L(minById(id)).n)+'</span>';}).join("")+'</div><button class="mas" data-apl="'+a.id+'">'+U("saber")+'</button></div></article>';
  }).join("")+'</div></section>';
  main.innerHTML=h;
  $$("[data-apl]").forEach(function(b){ b.onclick=function(){ var a=APLICACIONES.filter(function(x){return x.id===b.getAttribute("data-apl");})[0];
    abrirDialogo('<h2>'+esc(L(a).n)+'</h2><p class="intro">'+esc(L(a).t)+'</p><h3>'+U("minerales")+'</h3><div class="controles">'+a.m.map(function(id){return '<button class="boton sec" data-ficha="'+id+'">'+esc(L(minById(id)).n)+'</button>';}).join("")+'</div>'); }; });
};

function tipoLugar(k){
  if(["vicalvaro","toledosep","orera","bercimuel","torrejonrubio"].indexOf(k)>=0) return "fibrosa";
  if(["gata","cuevas"].indexOf(k)>=0) return "bentonita";
  return "caolin";
}
var COL_L={fibrosa:"#c8902f",bentonita:"#b4532a",caolin:"#ffffff"};
function mineralesLugar(k){ return MINERALES.filter(function(m){ return m.espana&&m.espana.indexOf(k)>=0; }); }
P.yacimientos = function(){
  var M=MAPA, pts="";
  Object.keys(M.lugares).forEach(function(k){ var p=M.lugares[k], t=tipoLugar(k), pas=p.estado==="pasado";
    pts+='<g class="punto" data-l="'+k+'" tabindex="0" role="button" aria-label="'+esc(L(p).n)+'"><circle cx="'+p.xy[0]+'" cy="'+p.xy[1]+'" r="15" fill="'+(pas?"#f7f1e6":COL_L[t])+'" stroke="'+(t==="caolin"?"#6b5444":COL_L[t])+'" stroke-width="'+(pas?4:2.5)+'"/></g>';
  });
  var svg='<svg viewBox="0 0 '+M.W+' '+M.H+'" role="img" aria-label="'+U("yacTit")+'">'+(M.vecinos||[]).map(function(d){return '<path d="'+d+'" fill="#efe9de" stroke="#d9cdb8"/>';}).join("")+
    '<path d="'+M.peninsula+'" fill="#e6d8c0" stroke="#b49c7c" stroke-width="2"/>'+M.islas.map(function(d){return '<path d="'+d+'" fill="#e6d8c0" stroke="#b49c7c" stroke-width="2"/>';}).join("")+pts+'</svg>';
  var ley=U("leyMapa");
  var h='<section class="pantalla"><h2>'+U("yacTit")+'</h2><p class="intro">'+U("yacIntro")+'</p><div class="mapa"><div class="panel">'+svg+
   '<div class="leyenda"><span><i style="background:#c8902f;border-radius:50%"></i>'+ley.fibrosa+'</span><span><i style="background:#b4532a;border-radius:50%"></i>'+ley.bentonita+'</span><span><i style="background:#fff;border:2px solid #6b5444;border-radius:50%"></i>'+ley.caolin+'</span><span><i style="background:#f7f1e6;border:3px solid #b4532a;border-radius:50%"></i>'+ley.pasado+'</span></div></div>'+
   '<div class="panel" id="info"></div></div><div class="caja"><h3>'+U("mundo")+'</h3><ul class="lista-mundo">'+MUNDO.map(function(x){return '<li>'+esc(L(x))+'</li>';}).join("")+'</ul></div></section>';
  main.innerHTML=h;
  function ver(k){ var p=M.lugares[k];
    $$(".punto").forEach(function(g){ g.classList.toggle("activo",g.getAttribute("data-l")===k); });
    var ms=mineralesLugar(k);
    $("#info").innerHTML='<span class="grupo" style="color:var(--terracota2);font-size:.8rem;text-transform:uppercase;letter-spacing:.06em">'+(p.estado==="pasado"?U("pasado"):U("hoy"))+'</span><h3>'+esc(L(p).n)+'</h3><p>'+esc(L(p).t)+'</p>'+(ms.length?'<div class="controles">'+ms.map(function(m){return '<button class="boton sec" data-ficha="'+m.id+'">'+esc(L(m).n)+'</button>';}).join("")+'</div>':'');
    $$("[data-ficha]",$("#info")).forEach(function(b){ b.onclick=function(){ abrirFicha(b.getAttribute("data-ficha")); }; });
  }
  $$(".punto").forEach(function(g){ g.onclick=function(){ ver(g.getAttribute("data-l")); }; g.onkeydown=function(e){ if(e.key==="Enter"){ ver(g.getAttribute("data-l")); } }; });
  ver("vicalvaro");
};

var drxSel="montmorillonita", drxOn={AO:true,EG:true,C:true};
var DRX_COL={AO:"#3b2a1e",EG:"#4f7ea6",C:"#b4532a"};
function dosTheta(d){ return 2*Math.asin(1.5406/(2*d))*180/Math.PI; }
function picosMezcla(t){ var out=[]; ["caolinita","ilita","montmorillonita","clorita"].forEach(function(id){ var f={caolinita:.6,ilita:.5,montmorillonita:.8,clorita:.5}[id]; DRX[id][t].forEach(function(p){ out.push([p[0],p[1]*f]); }); }); return out; }
function svgDRX(){
  var W=640,H=380,x0=50,x1=620,y0=340,lo=2,hi=32;
  function X(t){ return x0+(t-lo)/(hi-lo)*(x1-x0); }
  var s='<line x1="'+x0+'" y1="'+y0+'" x2="'+x1+'" y2="'+y0+'" stroke="#3b2a1e"/>';
  for(var t=lo;t<=hi;t+=2){ s+='<line x1="'+X(t)+'" y1="'+y0+'" x2="'+X(t)+'" y2="'+(y0+5)+'" stroke="#3b2a1e"/><text x="'+X(t)+'" y="'+(y0+20)+'" font-size="12" text-anchor="middle" fill="#6b5444">'+t+'</text>'; }
  s+='<text x="'+((x0+x1)/2)+'" y="'+(y0+36)+'" font-size="13" text-anchor="middle" fill="#3b2a1e">'+U("grados")+'</text>';
  var orden=["AO","EG","C"], desp={AO:0,EG:100,C:200};
  orden.forEach(function(k){
    if(!drxOn[k]) return;
    var picos = drxSel==="mezcla"?picosMezcla(k):DRX[drxSel][k], base=y0-8-desp[k], path="";
    var anchoBase = (drxSel==="montmorillonita"||drxSel==="mezcla")?0.55:0.3;
    for(var px=x0;px<=x1;px+=1.5){ var tt=lo+(px-x0)/(x1-x0)*(hi-lo), yv=0;
      picos.forEach(function(p){ var c=dosTheta(p[0]), wd=(p[0]>11&&p[0]<18&&anchoBase>0.4)?0.8:anchoBase; yv+=p[1]*Math.exp(-Math.pow((tt-c)/wd,2)); });
      yv+= 6*Math.exp(-(tt-lo)/3); // fondo a bajo ángulo
      path+=(px===x0?"M":"L")+px.toFixed(1)+","+(base-yv*0.75).toFixed(1);
    }
    s+='<path d="'+path+'" fill="none" stroke="'+DRX_COL[k]+'" stroke-width="2"/><text x="'+(x1-4)+'" y="'+(base-8)+'" font-size="12" text-anchor="end" fill="'+DRX_COL[k]+'" font-weight="700">'+U(k)+'</text>';
    var puestos=[]; picos.slice().sort(function(a,b){return b[1]-a[1];}).forEach(function(p){ var c=dosTheta(p[0]); if((p[1]>=45||drxSel!=="mezcla"&&p[1]>=30)&&puestos.every(function(q){return Math.abs(q-c)>1.2;})){ puestos.push(c); s+='<text x="'+X(c)+'" y="'+(base-p[1]*0.75-6)+'" font-size="11" text-anchor="middle" fill="'+DRX_COL[k]+'">'+num(p[0])+' Å</text>'; } });
  });
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+U("drxTit")+'">'+s+'</svg>';
}
P.estudio = function(){
  var lista=Object.keys(DRX).concat(["mezcla"]);
  var h='<section class="pantalla"><h2>'+U("estuTit")+'</h2><p class="intro">'+U("estuIntro")+'</p><div class="caja"><h3>'+U("drxTit")+'</h3><p>'+U("drxIntro")+'</p><div class="filtros">'+lista.map(function(id){return '<button class="filtro" data-drx="'+id+'">'+(id==="mezcla"?U("mezcla"):esc(L(minById(id)).n))+'</button>';}).join("")+'</div>'+
   '<div class="drx"><div id="graf"></div><div><div class="tratamiento">'+["AO","EG","C"].map(function(k){return '<button class="trat" data-t="'+k+'" style="border-color:'+DRX_COL[k]+';color:'+DRX_COL[k]+'">'+U(k)+'</button>';}).join("")+'</div><p id="drxTxt"></p></div></div></div>'+
   '<h3 style="margin-top:1.4rem">'+U("tecnicas")+'</h3><div class="tarjetas">'+TECNICAS.filter(function(t){return t.id!=="drx";}).map(function(t){ var im=t.id==="sem"?semImgs("halloysita")[0]:(t.id==="tem"?semImgs("caolinita")[2]:null);
     return '<article class="tarjeta">'+(im?'<div class="foto"><img loading="lazy" src="'+im.mini+'" alt="" onerror="this.parentNode.remove()"></div>':'')+'<div class="cuerpo"><h3>'+esc(L(t).n)+'</h3><p>'+esc(L(t).t)+'</p></div></article>'; }).join("")+'</div>'+
   '<p style="margin-top:1.2rem"><button class="boton" data-ir="#juego">'+U("juego")+' →</button></p></section>';
  main.innerHTML=h;
  function pinta(){
    $$("[data-drx]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-drx")===drxSel); });
    $$("[data-t]").forEach(function(b){ b.setAttribute("aria-pressed",!!drxOn[b.getAttribute("data-t")]); });
    $("#graf").innerHTML=svgDRX();
    $("#drxTxt").textContent = drxSel==="mezcla" ? (lang==="es"?"En una muestra real se mezclan varios minerales. Compara: el pico de 17 Å con etilenglicol delata la esmectita; a 550 °C desaparece el pico de 7 Å de la caolinita y queda el de 14 Å de la clorita; el de 10 Å de la ilita no se mueve.":"Real samples mix several minerals. Compare: the 17 Å peak with ethylene glycol gives the smectite away; at 550 °C kaolinite’s 7 Å peak disappears and chlorite’s 14 Å peak remains; illite’s 10 Å peak does not move.") : L(DRX[drxSel]);
  }
  $$("[data-drx]").forEach(function(b){ b.onclick=function(){ drxSel=b.getAttribute("data-drx"); pinta(); }; });
  $$("[data-t]").forEach(function(b){ b.onclick=function(){ var k=b.getAttribute("data-t"); drxOn[k]=!drxOn[k]; pinta(); }; });
  pinta();
};

P.sea = function(){
  var h='<section class="pantalla"><h2>'+U("seaTit")+'</h2><p class="intro">'+U("seaIntro")+'</p><div class="dos"><div class="caja"><h3>'+U("hist")+'</h3><div class="linea">'+HITOS.map(function(x){return '<div class="hito"><b>'+x.a+'</b>'+esc(L(x))+'</div>';}).join("")+'</div></div>'+
   '<div><div class="caja"><h3>'+U("premios")+'</h3><ul>'+U("premiosL").map(function(p){return '<li>'+p+'</li>';}).join("")+'</ul></div><div class="caja"><h3>'+U("red")+'</h3><p>'+U("redT")+'</p></div><div class="caja"><h3>'+U("sede")+'</h3><p>'+U("sedeT")+'</p><p><a href="https://www.sea-arcillas.es" target="_blank" rel="noopener">'+U("web")+' ↗</a></p></div></div></div>'+
   '<div class="caja"><h3>'+U("creditos")+'</h3>'+U("credT").map(function(p){return '<p>'+esc(p)+'</p>';}).join("")+'</div></section>';
  main.innerHTML=h;
};

/* ---------- juego ---------- */
var PREG = [
 {es:"¿Qué mineral tiene una lámina 1:1 y no hincha?",en:"Which mineral has a 1:1 layer and does not swell?",ok:"caolinita",mal:["montmorillonita","vermiculita","ilita"]},
 {es:"¿Cuál se desplaza a 17 Å con etilenglicol?",en:"Which one shifts to 17 Å with ethylene glycol?",ok:"montmorillonita",mal:["clorita","ilita","caolinita"]},
 {es:"¿Qué mineral forma nanotubos?",en:"Which mineral forms nanotubes?",ok:"halloysita",mal:["caolinita","saponita","clorita"]},
 {es:"¿Con qué mineral se hizo el azul maya?",en:"Which mineral was used to make Maya blue?",ok:"paligorskita",mal:["sepiolita","caolinita","nontronita"]},
 {es:"España produce cerca de dos tercios de la producción mundial de…",en:"Spain produces about two thirds of the world’s…",ok:"sepiolita",mal:["caolinita","vermiculita","halloysita"]},
 {es:"¿Qué mineral tiene potasio entre sus láminas?",en:"Which mineral has potassium between its layers?",ok:"ilita",mal:["clorita","saponita","halloysita"]},
 {es:"¿Cuál tiene una lámina de hidróxido entre las láminas 2:1?",en:"Which one has a hydroxide sheet between its 2:1 layers?",ok:"clorita",mal:["vermiculita","ilita","montmorillonita"]},
 {es:"¿Qué mineral se expande como un gusano al calentarlo de golpe?",en:"Which mineral expands like a worm when suddenly heated?",ok:"vermiculita",mal:["sepiolita","ilita","caolinita"]},
 {es:"¿Qué esmectita es verde y rica en hierro?",en:"Which smectite is green and iron-rich?",ok:"nontronita",mal:["saponita","hectorita","beidellita"]},
 {es:"¿Qué bentonita se ensayó en el proyecto FEBEX para aislar residuos radiactivos?",en:"Which bentonite was tested in the FEBEX project to isolate radioactive waste?",okTxt:{es:"La de Almería",en:"The one from Almería"},malTxt:[{es:"La de Wyoming",en:"The one from Wyoming"},{es:"La de Milos",en:"The one from Milos"},{es:"La de Cerdeña",en:"The one from Sardinia"}]}
];
function baraja(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
var IMG_OK=[];
function probarImagenes(cb){
  var cand=[]; Object.keys(SEM).forEach(function(id){ if(minById(id)&&["beidellita","hectorita","interestratificados"].indexOf(id)<0){ var s=semImgs(id); s.forEach(function(x,i){ if(!(SEM[id][i].m)) cand.push({id:id,im:x}); }); } });
  var pend=cand.length, ok=[]; if(!pend){ cb(ok); return; }
  cand.forEach(function(c){ var im=new Image(); im.onload=function(){ ok.push(c); if(--pend===0) cb(ok); }; im.onerror=function(){ if(--pend===0) cb(ok); }; im.src=c.im.mini; });
}
P.juego = function(){
  main.innerHTML='<section class="pantalla"><div class="juego"><h2>'+U("jTit")+'</h2><p class="intro" style="margin:0 auto">'+U("jIntro")+'</p><p><button class="boton" id="emp">'+U("empezar")+'</button></p><div id="zona"></div></div></section>';
  $("#emp").onclick=function(){ $("#emp").disabled=true; probarImagenes(function(ok){ IMG_OK=ok; partida(); }); };
};
function partida(){
  var preguntas=[], usados={};
  baraja(IMG_OK).forEach(function(c){ if(preguntas.length<4&&!usados[c.id]){ usados[c.id]=1;
    var otros=baraja(MINERALES.filter(function(m){return m.id!==c.id&&m.id!=="interestratificados";})).slice(0,3).map(function(m){return m.id;});
    preguntas.push({img:c.im,ok:c.id,mal:otros}); } });
  baraja(PREG).slice(0,8-preguntas.length).forEach(function(p){ preguntas.push(p); });
  preguntas=baraja(preguntas);
  var k=0, aciertos=0, z=$("#zona"); $("#emp").style.display="none";
  function nom(id){ return L(minById(id)).n; }
  function una(){
    if(k>=preguntas.length){ z.innerHTML='<p class="pregunta">'+U("fin").replace("{n}",aciertos).replace("{t}",preguntas.length)+'</p><button class="boton" id="otra">'+U("otra")+'</button>'; $("#otra").onclick=partida; return; }
    var p=preguntas[k], ops, okLabel;
    if(p.okTxt){ okLabel=L(p.okTxt); ops=baraja([okLabel].concat(p.malTxt.map(L))); }
    else { okLabel=nom(p.ok); ops=baraja([p.ok].concat(p.mal)).map(nom); }
    z.innerHTML='<p class="marcador">'+(k+1)+' / '+preguntas.length+'</p>'+(p.img?'<div class="imagen"><img src="'+p.img.src+'" alt=""></div><p class="pregunta">'+U("pregImg")+'</p>':'<p class="pregunta">'+esc(L(p))+'</p>')+
      '<div class="opciones">'+ops.map(function(o){return '<button class="opcion">'+esc(o)+'</button>';}).join("")+'</div><p id="fb"></p>';
    $$(".opcion",z).forEach(function(b){ b.onclick=function(){
      var bien=b.textContent===okLabel; if(bien) aciertos++;
      $$(".opcion",z).forEach(function(x){ x.disabled=true; if(x.textContent===okLabel) x.classList.add("bien"); });
      if(!bien) b.classList.add("mal");
      $("#fb").innerHTML=(bien?U("bien"):U("mal")+esc(okLabel)+".")+(p.img?'<br><small>'+p.img.cap+'</small>':'')+'<br><button class="boton" id="sig" style="margin-top:.6rem">'+U("sig")+'</button>';
      $("#sig").onclick=function(){ k++; una(); };
    }; });
  }
  una();
}

/* ---------- arranque ---------- */
function ir(){
  var id=(location.hash||"#inicio").slice(1).split("?")[0]; if(!P[id]) id="inicio";
  if(dlg&&dlg.open) dlg.close();
  clearInterval(heroeTimer);
  P[id]();
  $("#volver").classList.toggle("oculto",id==="inicio");
  $$("[data-ir]",main).forEach(function(b){ b.onclick=function(){ location.hash=b.getAttribute("data-ir"); }; });
  window.scrollTo(0,0);
  document.title = U("titulo")+" · "+U("sea");
}
function textosFijos(){
  document.documentElement.lang=lang;
  $("#marca").innerHTML=U("titulo")+'<small>'+U("sea")+'</small>';
  $("#volver").setAttribute("aria-label",U("volver")); $("#volver").title=U("volver");
  $$(".idiomas button").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-lang")===lang); });
  $("#pie").textContent=U("pie");
}
document.addEventListener("DOMContentLoaded",function(){
  main=$("main");
  $("#marca").onclick=function(){ location.hash="#inicio"; };
  $("#volver").onclick=function(){ if(history.length>1) history.back(); else location.hash="#inicio"; };
  $$(".idiomas button").forEach(function(b){ b.onclick=function(){ lang=b.getAttribute("data-lang"); try{localStorage.setItem("arcillas-lang",lang);}catch(e){} textosFijos(); ir(); }; });
  window.addEventListener("hashchange",ir);
  textosFijos(); ir();
  if("serviceWorker" in navigator && location.protocol==="https:") navigator.serviceWorker.register("sw.js").catch(function(){});
});
})();
