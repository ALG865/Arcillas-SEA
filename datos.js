/* Datos de «Los minerales de la arcilla» · SEA
   Valores de propiedades: rangos típicos aproximados de la bibliografía; dependen de cada muestra. */
window.IOC = "https://www.minersoc.org/wp-content/gallery/shimages/";

/* Imágenes de microscopio electrónico del archivo «Images of Clay».
   La carpeta img/sem/ la rellena el flujo de GitHub «Descargar imágenes». */
window.SEM = {
  caolinita:[
    {f:"45-Kao4_6-adjusted.jpg",a:"M. Roe"},
    {f:"47-kao-18.jpg",a:"Evelyne Delbos"},
    {f:"49-CADAM-kaolinite-TEM.jpg",a:"Ian Wilson",t:"TEM"},
    {f:"17-DICK_3.jpg",a:"M. Roe",m:{es:"Dickita",en:"Dickite"}}
  ],
  halloysita:[
    {f:"33-HALL_2-adjusted.jpg",a:"M. Roe"},
    {f:"25-halloysite-BYD.jpg",a:"Evelyne Delbos"},
    {f:"146-G490ps.jpg",a:"John Keeling y Peter Self (CSIRO)"}
  ],
  ilita:[
    {f:"38-ROTILL_5.jpg",a:"M. Roe"},
    {f:"42-illite_5000.jpg",a:"Evelyne Delbos"}
  ],
  montmorillonita:[
    {f:"72-volcanic-egg-BGR.jpg",a:"Stephan Kaufhold y Reiner Dohrmann (BGR)"},
    {f:"143-1359895-16.jpg",a:"Laura-Jane Strachan",m:{es:"Ca-montmorillonita",en:"Ca-montmorillonite"}},
    {f:"75-Steve-A.jpg",a:"Emilia García-Romero",m:{es:"Esmectita dioctaédrica",en:"Dioctahedral smectite"}},
    {f:"105-11.jpg",a:"Ana María Fernández Díaz",m:{es:"Esmectita dioctaédrica",en:"Dioctahedral smectite"}}
  ],
  beidellita:[{f:"100-1.jpg",a:"Adrian Biron",m:{es:"Beidellita sobre chamosita",en:"Beidellite on chamosite"}}],
  nontronita:[{f:"57-Non-15_04-NAu-1.jpg",a:"Laura-Jane Strachan y Evelyne Delbos"}],
  saponita:[{f:"94-Saponite-14_11-IOC-as-22.jpg",a:"Laura-Jane Strachan"}],
  hectorita:[{f:"91-Hectorite.jpg",a:"Evelyne Delbos"}],
  vermiculita:[{f:"99-Phalabora-BW.jpg",a:"Steve Hillier y David Riley (James Hutton Institute)",m:{es:"Vermiculita (hidrobiotita), Palabora",en:"Vermiculite (hydrobiotite), Phalaborwa"}}],
  clorita:[
    {f:"11-MULMS_6.jpg",a:"M. Roe",m:{es:"Clorita magnésica",en:"Mg-rich chlorite"}},
    {f:"10-SPR1_4.jpg",a:"M. Roe",m:{es:"Clorita férrica",en:"Fe-rich chlorite"}}
  ],
  sepiolita:[
    {f:"67-SEP4_2.jpg",a:"M. Roe"},
    {f:"121-291_05.jpg",a:"Andre Marx y Stephan Kaufhold (BGR)"}
  ],
  paligorskita:[
    {f:"114-9.jpg",a:"Ana María Fernández Díaz"},
    {f:"62-paly-597F.jpg",a:"Evelyne Delbos"},
    {f:"60-palygorskite-1.jpg",a:"Toshihiro Kogure"}
  ],
  interestratificados:[
    {f:"13-corrensite-2.jpg",a:"Evelyne Delbos",m:{es:"Corrensita (clorita/esmectita)",en:"Corrensite (chlorite/smectite)"}},
    {f:"141-996735-42.jpg",a:"Laura-Jane Strachan",m:{es:"Ilita/esmectita",en:"Illite/smectite"}},
    {f:"98-EDZ22.jpg",a:"Evelyne Delbos (Macaulay Institute)",m:{es:"Tosudita",en:"Tosudite"}}
  ],
  serpentina:[{f:"103-20.jpg",a:"Toshihiro Kogure",m:{es:"Crisotilo",en:"Chrysotile"}}]
};

/* Imágenes de la portada (en orden) */
window.HEROE = [["caolinita",0],["halloysita",0],["sepiolita",0],["montmorillonita",0],["paligorskita",0],["vermiculita",0]];

window.GRUPOS = [
  {id:"1:1",es:"Caolinita-serpentina (1:1)",en:"Kaolinite-serpentine (1:1)"},
  {id:"ilita",es:"Ilita y micas (2:1)",en:"Illite and micas (2:1)"},
  {id:"esmectita",es:"Esmectitas (2:1)",en:"Smectites (2:1)"},
  {id:"vermiculita",es:"Vermiculita (2:1)",en:"Vermiculite (2:1)"},
  {id:"clorita",es:"Cloritas (2:1:1)",en:"Chlorites (2:1:1)"},
  {id:"fibrosa",es:"Sepiolita y paligorskita (fibrosas)",en:"Sepiolite and palygorskite (fibrous)"},
  {id:"inter",es:"Interestratificados",en:"Mixed-layer minerals"}
];

/* lam: tipo de estructura para el dibujo; d: espaciado basal (Å) */
window.MINERALES = [
 {id:"caolinita",grupo:"1:1",lam:{t:"TO",oct:"di"},formula:"Al₂Si₂O₅(OH)₄",d:"7,1–7,2 Å",cic:[3,15],se:[10,30],hinch:0,plast:2,
  es:{n:"Caolinita",r:"La arcilla blanca de la porcelana y del papel.",
   t:"Lámina 1:1 de una capa tetraédrica y otra octaédrica con aluminio. Las láminas se unen entre sí por puentes de hidrógeno, sin cationes ni agua entre ellas: por eso no hincha y su carga es casi nula. Al microscopio forma placas hexagonales apiladas en «librillos». Se forma por meteorización o alteración hidrotermal de feldespatos y otros aluminosilicatos. Sus polimorfos son la dickita y la nacrita."},
  en:{n:"Kaolinite",r:"The white clay of porcelain and paper.",
   t:"A 1:1 layer made of one tetrahedral sheet and one aluminium octahedral sheet. Layers are held together by hydrogen bonds, with no cations or water between them, so it does not swell and its layer charge is almost zero. Under the microscope it forms hexagonal plates stacked in “booklets”. It forms by weathering or hydrothermal alteration of feldspars and other aluminosilicates. Its polymorphs are dickite and nacrite."},
  espana:["vimianzo","burela","poveda","arguisuelas","arino","tamame"]},
 {id:"halloysita",grupo:"1:1",lam:{t:"TO",oct:"di",agua:true},formula:"Al₂Si₂O₅(OH)₄·2H₂O",d:"10 Å (hidratada) → 7 Å",cic:[5,40],se:[20,60],hinch:0,plast:2,
  es:{n:"Halloysita",r:"Caolinita enrollada en nanotubos.",
   t:"Misma composición que la caolinita, pero con una capa de agua entre láminas (10 Å) que pierde con facilidad y de forma irreversible (7 Å). Las láminas se curvan y suelen enrollarse en tubos huecos de pocas decenas de nanómetros de diámetro, también en esferas. Sus nanotubos se estudian para liberar fármacos de forma controlada y reforzar polímeros."},
  en:{n:"Halloysite",r:"Kaolinite rolled into nanotubes.",
   t:"Same composition as kaolinite but with a layer of water between layers (10 Å), which it loses easily and irreversibly (7 Å). The layers curve and usually roll into hollow tubes a few tens of nanometres across, sometimes into spheres. Its nanotubes are studied for controlled drug release and for reinforcing polymers."}},
 {id:"ilita",grupo:"ilita",lam:{t:"TOT",oct:"di",inter:"K"},formula:"K₀,₆₅Al₂(Al₀,₆₅Si₃,₃₅)O₁₀(OH)₂",d:"10 Å",cic:[10,40],se:[50,100],hinch:0,plast:3,
  es:{n:"Ilita",r:"La «mica de las arcillas», la más abundante en lutitas.",
   t:"Lámina 2:1 parecida a la moscovita, pero con menos potasio entre láminas y más agua. El potasio sujeta con fuerza las láminas, de modo que no se separan con el agua: no hincha. Es el mineral de la arcilla más abundante en las rocas sedimentarias; con el enterramiento, la esmectita se transforma en ilita pasando por interestratificados ilita/esmectita."},
  en:{n:"Illite",r:"The “clay mica”, most abundant in shales.",
   t:"A 2:1 layer similar to muscovite, but with less potassium between layers and more water. Potassium holds the layers tightly, so water cannot separate them: it does not swell. It is the most abundant clay mineral in sedimentary rocks; with burial, smectite turns into illite through mixed-layer illite/smectite."}},
 {id:"montmorillonita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"(Na,Ca)₀,₃₃(Al,Mg)₂Si₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[80,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Montmorillonita",r:"El mineral de la bentonita, la arcilla que hincha.",
   t:"Esmectita dioctaédrica con la carga en la capa octaédrica (Mg en lugar de Al). Entre sus láminas hay cationes intercambiables (Na⁺, Ca²⁺) rodeados de agua; al entrar más agua las láminas se separan y la arcilla hincha. Tiene gran superficie y gran capacidad de intercambio catiónico. Es el componente principal de la bentonita, como la de Cabo de Gata."},
  en:{n:"Montmorillonite",r:"The mineral of bentonite, the swelling clay.",
   t:"A dioctahedral smectite whose charge sits in the octahedral sheet (Mg replacing Al). Between its layers there are exchangeable cations (Na⁺, Ca²⁺) surrounded by water; as more water enters, the layers move apart and the clay swells. It has a large surface area and a high cation exchange capacity. It is the main component of bentonite, such as that of Cabo de Gata."},
  espana:["gata","cuevas"]},
 {id:"beidellita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"(Na,Ca₀,₅)₀,₃Al₂(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Beidellita",r:"La esmectita alumínica con la carga en los tetraedros.",
   t:"Esmectita dioctaédrica en la que la carga procede de aluminio que sustituye al silicio en la capa tetraédrica. Se distingue de la montmorillonita con la prueba de Greene-Kelly: tras saturarla con litio y calentarla, la beidellita vuelve a hinchar y la montmorillonita no."},
  en:{n:"Beidellite",r:"The aluminous smectite with tetrahedral charge.",
   t:"A dioctahedral smectite whose charge comes from aluminium replacing silicon in the tetrahedral sheet. It is told apart from montmorillonite with the Greene-Kelly test: after lithium saturation and heating, beidellite swells again and montmorillonite does not."}},
 {id:"nontronita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"Na₀,₃Fe³⁺₂(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,110],se:[500,800],hinch:3,plast:3,
  es:{n:"Nontronita",r:"La esmectita verde, rica en hierro.",
   t:"Esmectita dioctaédrica en la que el hierro férrico ocupa el lugar del aluminio. De color verde amarillento, se forma por alteración de rocas básicas y en fondos oceánicos hidrotermales. También se ha detectado en Marte."},
  en:{n:"Nontronite",r:"The green, iron-rich smectite.",
   t:"A dioctahedral smectite in which ferric iron takes the place of aluminium. Yellowish green, it forms by alteration of mafic rocks and on hydrothermal sea floors. It has also been detected on Mars."}},
 {id:"saponita",grupo:"esmectita",lam:{t:"TOT",oct:"tri",inter:"agua"},formula:"Ca₀,₂₅(Mg,Fe)₃(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Saponita",r:"La esmectita magnésica, jabonosa al tacto.",
   t:"Esmectita trioctaédrica: el magnesio ocupa las tres posiciones octaédricas. La carga procede de aluminio en los tetraedros. Su nombre viene del latín sapo, «jabón», por su tacto. En España hay bentonitas saponíticas en La Sagra (Toledo)."},
  en:{n:"Saponite",r:"The magnesian smectite, soapy to the touch.",
   t:"A trioctahedral smectite: magnesium fills all three octahedral sites. The charge comes from aluminium in the tetrahedra. Its name comes from the Latin sapo, “soap”, for its feel. In Spain there are saponitic bentonites in La Sagra (Toledo)."},
  espana:["toledosep"]},
 {id:"hectorita",grupo:"esmectita",lam:{t:"TOT",oct:"tri",inter:"agua"},formula:"Na₀,₃(Mg,Li)₃Si₄O₁₀(F,OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,110],se:[600,800],hinch:3,plast:4,
  es:{n:"Hectorita",r:"La esmectita de litio, base de geles y cosméticos.",
   t:"Esmectita trioctaédrica con litio que sustituye al magnesio. Sus partículas son muy pequeñas y forman geles transparentes, por lo que se usa como espesante en cosmética y pinturas. Debe su nombre a Hector (California), donde se describió."},
  en:{n:"Hectorite",r:"The lithium smectite behind gels and cosmetics.",
   t:"A trioctahedral smectite with lithium replacing magnesium. Its particles are very small and form clear gels, so it is used as a thickener in cosmetics and paints. It is named after Hector (California), where it was described."}},
 {id:"vermiculita",grupo:"vermiculita",lam:{t:"TOT",oct:"tri",inter:"Mg"},formula:"Mg₀,₇(Mg,Fe,Al)₃(Al,Si)₄O₁₀(OH)₂·4H₂O",d:"14–14,5 Å",cic:[120,200],se:[400,700],hinch:2,plast:2,
  es:{n:"Vermiculita",r:"La que se expande como un gusano al calentarla.",
   t:"Lámina 2:1 con más carga que las esmectitas, compensada por magnesio rodeado de dos capas de agua. Hincha poco con el agua y no se expande con etilenglicol, pero calentada de golpe a unos 900 °C el agua se convierte en vapor y las láminas se separan: el grano crece hasta veinte veces, retorciéndose como un gusano (vermis). La vermiculita exfoliada se usa como aislante y en jardinería."},
  en:{n:"Vermiculite",r:"The one that expands like a worm when heated.",
   t:"A 2:1 layer with more charge than smectites, balanced by magnesium surrounded by two layers of water. It swells little with water and does not expand with ethylene glycol, but when heated suddenly to about 900 °C the water turns to steam and the layers separate: the grain grows up to twenty times, twisting like a worm (vermis). Exfoliated vermiculite is used as an insulator and in gardening."}},
 {id:"clorita",grupo:"clorita",lam:{t:"TOT",oct:"tri",inter:"hidroxido"},formula:"(Mg,Fe)₅Al(AlSi₃)O₁₀(OH)₈",d:"14,1–14,3 Å",cic:[10,40],se:[10,50],hinch:0,plast:2,
  es:{n:"Clorita",r:"Una lámina 2:1 más una lámina de hidróxido.",
   t:"Entre las láminas 2:1 hay una lámina octaédrica de hidróxido de magnesio o aluminio, en lugar de cationes sueltos: es la estructura 2:1:1. Por eso no hincha y su espaciado de 14 Å resiste el calentamiento a 550 °C. Es verde, abundante en rocas metamórficas de grado bajo y en sedimentos de climas fríos."},
  en:{n:"Chlorite",r:"A 2:1 layer plus a hydroxide sheet.",
   t:"Between the 2:1 layers there is an octahedral sheet of magnesium or aluminium hydroxide instead of loose cations: this is the 2:1:1 structure. It therefore does not swell, and its 14 Å spacing survives heating to 550 °C. It is green and abundant in low-grade metamorphic rocks and in sediments of cold climates."}},
 {id:"sepiolita",grupo:"fibrosa",lam:{t:"fibra",oct:"tri"},formula:"Mg₄Si₆O₁₅(OH)₂·6H₂O",d:"12,1 Å (110)",cic:[20,45],se:[200,400],hinch:0,plast:3,
  es:{n:"Sepiolita",r:"La arcilla en fibras; España produce la mayor parte del mundo.",
   t:"En lugar de láminas continuas, tiene cintas 2:1 cuyos tetraedros se invierten cada seis, dejando canales a lo largo de la fibra donde entran agua y moléculas. De ahí su enorme capacidad de absorción. Es magnésica. España, con el distrito de Vicálvaro y Paracuellos (Madrid), produce cerca de dos tercios de la sepiolita mundial; se usa en absorbentes, alimentación animal y lodos de perforación."},
  en:{n:"Sepiolite",r:"The fibrous clay; Spain produces most of the world’s supply.",
   t:"Instead of continuous layers, it has 2:1 ribbons whose tetrahedra invert every six, leaving channels along the fibre where water and molecules enter. Hence its enormous absorption capacity. It is magnesian. Spain, with the Vicálvaro–Paracuellos district (Madrid), produces about two thirds of the world’s sepiolite; it is used in absorbents, animal feed and drilling muds."},
  espana:["vicalvaro","toledosep","orera"]},
 {id:"paligorskita",grupo:"fibrosa",lam:{t:"fibra",oct:"di"},formula:"(Mg,Al)₂Si₄O₁₀(OH)·4H₂O",d:"10,5 Å (110)",cic:[20,50],se:[125,210],hinch:0,plast:3,
  es:{n:"Paligorskita",r:"La fibra del azul maya. También llamada atapulgita.",
   t:"Hermana de la sepiolita, con cintas más estrechas (los tetraedros se invierten cada cuatro) y canales más pequeños; contiene más aluminio. Los mayas la mezclaron con índigo y la calentaron: el colorante entró en los canales y creó el azul maya, un pigmento que resiste siglos. En España hay yacimientos en Bercimuel (Segovia) y Torrejón el Rubio (Cáceres)."},
  en:{n:"Palygorskite",r:"The fibre behind Maya blue. Also called attapulgite.",
   t:"Sepiolite’s sister, with narrower ribbons (the tetrahedra invert every four) and smaller channels; it contains more aluminium. The Maya mixed it with indigo and heated it: the dye entered the channels and created Maya blue, a pigment that has lasted for centuries. In Spain there are deposits at Bercimuel (Segovia) and Torrejón el Rubio (Cáceres)."},
  espana:["bercimuel","torrejonrubio"]},
 {id:"interestratificados",grupo:"inter",lam:{t:"inter"},formula:"p. ej. ilita/esmectita, clorita/esmectita",d:"Variable",cic:[20,80],se:[100,500],hinch:1,plast:3,
  es:{n:"Interestratificados",r:"Pilas que mezclan dos tipos de láminas.",
   t:"Una misma partícula apila láminas de dos minerales distintos, por ejemplo ilita y esmectita, al azar o en alternancia regular. Si la alternancia es regular reciben nombre propio: corrensita (clorita/esmectita), rectorita (mica/esmectita) o tosudita. Registran la historia térmica de la roca: la proporción de ilita en el ilita/esmectita aumenta con la temperatura de enterramiento."},
  en:{n:"Mixed-layer minerals",r:"Stacks that mix two kinds of layers.",
   t:"A single particle stacks layers of two different minerals, for example illite and smectite, at random or in regular alternation. Regular ones have their own names: corrensite (chlorite/smectite), rectorite (mica/smectite) or tosudite. They record the thermal history of a rock: the illite proportion in illite/smectite increases with burial temperature."}}
];

window.APLICACIONES = [
 {id:"ceramica",m:["caolinita","ilita"],es:{n:"Cerámica y porcelana",t:"El caolín da blancura y la ilita, plasticidad. Al cocer, la caolinita pierde su agua estructural hacia 550 °C y a más de 1000 °C forma mullita, que da resistencia a la porcelana."},en:{n:"Ceramics and porcelain",t:"Kaolin gives whiteness and illite plasticity. On firing, kaolinite loses its structural water at about 550 °C and above 1000 °C forms mullite, which gives porcelain its strength."}},
 {id:"papel",m:["caolinita"],es:{n:"Papel",t:"El caolín es carga y estucado: rellena los huecos entre fibras y da al papel brillo, blancura y una superficie lisa para imprimir."},en:{n:"Paper",t:"Kaolin is used as filler and coating: it fills the gaps between fibres and gives paper gloss, whiteness and a smooth printing surface."}},
 {id:"perforacion",m:["montmorillonita","sepiolita","paligorskita"],es:{n:"Lodos de perforación",t:"La bentonita sódica forma un lodo que enfría la broca, sube los detritos y sella las paredes del pozo. En aguas saladas o a alta temperatura se usan sepiolita y paligorskita, cuyas fibras no floculan."},en:{n:"Drilling muds",t:"Sodium bentonite forms a mud that cools the bit, carries cuttings up and seals the borehole walls. In salty water or at high temperature, sepiolite and palygorskite are used, as their fibres do not flocculate."}},
 {id:"fundicion",m:["montmorillonita"],es:{n:"Moldes de fundición",t:"La bentonita aglutina la arena de los moldes de fundición: mojada se moldea y aguanta el metal fundido."},en:{n:"Foundry moulds",t:"Bentonite binds the sand of foundry moulds: damp, it can be shaped and it withstands molten metal."}},
 {id:"farmacia",m:["caolinita","montmorillonita","hectorita","sepiolita"],es:{n:"Farmacia y cosmética",t:"Excipientes, antidiarreicos y protectores gástricos; mascarillas, cremas y maquillajes. La hectorita y la montmorillonita espesan geles; el caolín absorbe grasa."},en:{n:"Pharmacy and cosmetics",t:"Excipients, antidiarrhoeals and stomach protectors; face masks, creams and make-up. Hectorite and montmorillonite thicken gels; kaolin absorbs oil."}},
 {id:"pienso",m:["sepiolita","montmorillonita"],es:{n:"Alimentación animal",t:"La sepiolita y la bentonita se añaden a los piensos como aglomerantes y para captar micotoxinas en el aparato digestivo del animal."},en:{n:"Animal feed",t:"Sepiolite and bentonite are added to feed as binders and to trap mycotoxins in the animal’s gut."}},
 {id:"absorbentes",m:["sepiolita","montmorillonita","paligorskita"],es:{n:"Absorbentes y arena para gatos",t:"Sus canales y su gran superficie retienen líquidos y olores: lechos para mascotas, absorbentes industriales para derrames de aceite."},en:{n:"Absorbents and cat litter",t:"Their channels and large surface hold liquids and odours: pet litter, industrial absorbents for oil spills."}},
 {id:"barreras",m:["montmorillonita"],es:{n:"Barreras para residuos (FEBEX)",t:"La bentonita compactada hincha y sella. En el proyecto FEBEX se ensayó durante casi veinte años, a escala real, una barrera de bentonita de Almería para aislar residuos radiactivos de alta actividad. También se usa en láminas impermeables para vertederos."},en:{n:"Waste barriers (FEBEX)",t:"Compacted bentonite swells and seals. In the FEBEX project a barrier of bentonite from Almería was tested at full scale for almost twenty years to isolate high-level radioactive waste. It is also used in waterproof liners for landfills."}},
 {id:"vino",m:["montmorillonita"],es:{n:"Clarificación de vinos",t:"Las partículas de bentonita, con carga negativa, atraen las proteínas del vino y las arrastran al fondo, lo que evita que el vino se enturbie."},en:{n:"Wine fining",t:"Negatively charged bentonite particles attract wine proteins and drag them to the bottom, preventing haze."}},
 {id:"catalisis",m:["caolinita","montmorillonita"],es:{n:"Catálisis",t:"Del caolín se obtienen los catalizadores del craqueo del petróleo y zeolitas sintéticas. Las arcillas «pilareadas», con columnas de óxidos entre las láminas, son catalizadores porosos."},en:{n:"Catalysis",t:"Kaolin is the raw material for oil-cracking catalysts and synthetic zeolites. “Pillared” clays, with oxide pillars between the layers, are porous catalysts."}},
 {id:"nanocompuestos",m:["montmorillonita","halloysita","sepiolita"],es:{n:"Nanocompuestos",t:"Unos pocos por ciento de arcilla dispersa en un plástico lo hacen más rígido, menos inflamable y menos permeable a los gases. Los nanotubos de halloysita y las fibras de sepiolita se exploran para fármacos y biomateriales."},en:{n:"Nanocomposites",t:"A few per cent of clay dispersed in a plastic makes it stiffer, less flammable and less permeable to gases. Halloysite nanotubes and sepiolite fibres are being explored for drugs and biomaterials."}},
 {id:"azulmaya",m:["paligorskita"],es:{n:"Patrimonio: el azul maya",t:"Paligorskita e índigo calentados juntos: el colorante se aloja en los canales de la fibra y queda protegido. Murales y objetos mayas conservan este azul después de más de mil años."},en:{n:"Heritage: Maya blue",t:"Palygorskite and indigo heated together: the dye lodges in the fibre channels and is protected. Maya murals and objects keep this blue after more than a thousand years."}}
];

window.MUNDO = [
 {m:"caolinita",es:"Caolín: Cornualles (Reino Unido), Georgia (EE. UU.), Pará (Brasil), Charentes (Francia)",en:"Kaolin: Cornwall (UK), Georgia (USA), Pará (Brazil), Charentes (France)"},
 {m:"montmorillonita",es:"Bentonita: Wyoming (EE. UU.), Milos (Grecia), Cerdeña (Italia), Anatolia (Turquía), Gujarat (India)",en:"Bentonite: Wyoming (USA), Milos (Greece), Sardinia (Italy), Anatolia (Turkey), Gujarat (India)"},
 {m:"sepiolita",es:"Sepiolita: Madrid y Toledo (España), Eskişehir (Turquía, la «espuma de mar» de las pipas), Amboseli (Kenia y Tanzania)",en:"Sepiolite: Madrid and Toledo (Spain), Eskişehir (Turkey, the “meerschaum” of pipes), Amboseli (Kenya and Tanzania)"},
 {m:"paligorskita",es:"Paligorskita (atapulgita): Georgia y Florida (EE. UU.), Senegal, Cherkasy (Ucrania), Jiangsu y Anhui (China)",en:"Palygorskite (attapulgite): Georgia and Florida (USA), Senegal, Cherkasy (Ukraine), Jiangsu and Anhui (China)"},
 {m:"halloysita",es:"Halloysita: Dragon Mine, Utah (EE. UU.), Matauri Bay (Nueva Zelanda), Dunino (Polonia), Balıkesir (Turquía)",en:"Halloysite: Dragon Mine, Utah (USA), Matauri Bay (New Zealand), Dunino (Poland), Balıkesir (Turkey)"},
 {m:"vermiculita",es:"Vermiculita: Palabora (Sudáfrica), Goiás (Brasil), Xinjiang (China); Libby, Montana (EE. UU., cerrada)",en:"Vermiculite: Phalaborwa (South Africa), Goiás (Brazil), Xinjiang (China); Libby, Montana (USA, closed)"},
 {m:"hectorita",es:"Hectorita: Hector, California (EE. UU.)",en:"Hectorite: Hector, California (USA)"}
];

/* DRX: picos [d (Å), intensidad relativa] en agregado orientado (AO), etilenglicol (EG) y calentado a 550 °C */
window.DRX = {
 caolinita:{AO:[[7.16,100],[3.58,70]],EG:[[7.16,100],[3.58,70]],C:[],
  es:"El pico de 7,2 Å no cambia con etilenglicol y desaparece a 550 °C: la caolinita pierde sus OH y se vuelve amorfa (metacaolín).",en:"The 7.2 Å peak does not change with ethylene glycol and disappears at 550 °C: kaolinite loses its OH groups and becomes amorphous (metakaolin)."},
 ilita:{AO:[[10.0,100],[5.0,35],[3.33,60]],EG:[[10.0,100],[5.0,35],[3.33,60]],C:[[10.0,110],[5.0,35],[3.33,60]],
  es:"Los picos a 10, 5 y 3,33 Å no se mueven con ningún tratamiento: el potasio mantiene las láminas juntas.",en:"The peaks at 10, 5 and 3.33 Å do not move with any treatment: potassium keeps the layers together."},
 montmorillonita:{AO:[[14.5,100]],EG:[[17.0,110],[8.5,15],[5.6,12]],C:[[9.8,80]],
  es:"Firma de la esmectita: hacia 14–15 Å en seco, se desplaza a 17 Å con etilenglicol (las láminas se abren) y colapsa a unos 10 Å al calentarla.",en:"The smectite signature: about 14–15 Å when air-dried, it shifts to 17 Å with ethylene glycol (the layers open) and collapses to about 10 Å on heating."},
 vermiculita:{AO:[[14.4,100],[7.2,20],[4.8,15]],EG:[[14.4,100],[7.2,20],[4.8,15]],C:[[10.0,80]],
  es:"Igual que la esmectita a 14 Å, pero no se expande con etilenglicol; a 550 °C colapsa a 10 Å.",en:"Like smectite at 14 Å, but it does not expand with ethylene glycol; at 550 °C it collapses to 10 Å."},
 clorita:{AO:[[14.2,70],[7.1,100],[4.73,45],[3.55,70]],EG:[[14.2,70],[7.1,100],[4.73,45],[3.55,70]],C:[[13.9,130],[7.1,25],[4.73,10],[3.55,15]],
  es:"Picos a 14, 7, 4,7 y 3,5 Å. A 550 °C el de 14 Å se refuerza y los demás se debilitan; así se distingue de la caolinita, que también da 7 Å.",en:"Peaks at 14, 7, 4.7 and 3.5 Å. At 550 °C the 14 Å peak gets stronger and the others weaken; that is how it is told apart from kaolinite, which also gives 7 Å."},
 sepiolita:{AO:[[12.1,100],[4.5,15],[3.35,12]],EG:[[12.1,100],[4.5,15],[3.35,12]],C:[[10.4,55]],
  es:"Pico intenso a 12,1 Å que no cambia con etilenglicol. Al calentarla pierde el agua de los canales y la estructura se pliega (≈10,4 Å).",en:"A strong 12.1 Å peak that does not change with ethylene glycol. On heating it loses the channel water and the structure folds (≈10.4 Å)."},
 paligorskita:{AO:[[10.5,100],[6.4,30],[4.47,25]],EG:[[10.5,100],[6.4,30],[4.47,25]],C:[[9.2,50]],
  es:"Pico a 10,5 Å que no cambia con etilenglicol y se desplaza hacia 9,2 Å al plegarse la estructura con el calor.",en:"A peak at 10.5 Å that does not change with ethylene glycol and moves to about 9.2 Å as the structure folds with heat."}
};

window.TECNICAS = [
 {id:"drx",es:{n:"Difracción de rayos X",t:"La técnica básica. Se depositan las partículas menores de 2 µm sobre un vidrio para que se orienten (agregado orientado) y se miden tres veces: secas al aire, tras etilenglicol y tras calentar a 550 °C. Cómo se mueve el pico basal identifica el grupo."},en:{n:"X-ray diffraction",t:"The basic technique. Particles smaller than 2 µm are settled on a glass slide so they lie flat (oriented aggregate) and measured three times: air-dried, after ethylene glycol and after heating to 550 °C. How the basal peak moves identifies the group."}},
 {id:"sem",es:{n:"Microscopio electrónico de barrido (SEM)",t:"Barre la superficie con un haz de electrones y muestra la forma y el relieve de las partículas: librillos de caolinita, tubos de halloysita, fibras de sepiolita, el aspecto de panal de las esmectitas. Con un detector de rayos X da también la composición."},en:{n:"Scanning electron microscope (SEM)",t:"It scans the surface with an electron beam and shows the shape and relief of particles: kaolinite booklets, halloysite tubes, sepiolite fibres, the honeycomb look of smectites. With an X-ray detector it also gives the composition."}},
 {id:"tem",es:{n:"Microscopio electrónico de transmisión (TEM)",t:"Los electrones atraviesan la muestra. Permite ver partículas aisladas de nanómetros, las propias láminas en imágenes de alta resolución y su difracción de electrones."},en:{n:"Transmission electron microscope (TEM)",t:"Electrons pass through the sample. It shows isolated nanometre-sized particles, the layers themselves in high-resolution images and their electron diffraction."}},
 {id:"ir",es:{n:"Espectroscopia infrarroja",t:"Mide las vibraciones de los enlaces, sobre todo de los grupos OH entre 3700 y 3400 cm⁻¹. La caolinita, por ejemplo, tiene bandas características hacia 3695 y 3620 cm⁻¹, y la posición de las bandas OH indica qué cationes hay en la capa octaédrica."},en:{n:"Infrared spectroscopy",t:"It measures bond vibrations, especially OH groups between 3700 and 3400 cm⁻¹. Kaolinite, for example, has characteristic bands near 3695 and 3620 cm⁻¹, and the position of the OH bands shows which cations sit in the octahedral sheet."}},
 {id:"termico",es:{n:"Análisis térmico",t:"Se calienta la muestra y se registra la pérdida de peso y el calor. Las esmectitas pierden el agua entre láminas por debajo de 200 °C; la caolinita pierde sus OH hacia 500–600 °C; la sepiolita, el agua de sus canales en varias etapas."},en:{n:"Thermal analysis",t:"The sample is heated while weight loss and heat flow are recorded. Smectites lose interlayer water below 200 °C; kaolinite loses its OH at about 500–600 °C; sepiolite loses its channel water in several steps."}}
];

window.HITOS = [
 {a:"1959",es:"Se funda en mayo el Grupo Español de Minerales de la Arcilla (GEMA), filial de la Sociedad Española de Ciencia del Suelo.",en:"The Spanish Clay Minerals Group (GEMA) is founded in May as a branch of the Spanish Soil Science Society."},
 {a:"1969",es:"En su reunión del 13 y 14 de mayo se decide crear la Sociedad Española de Arcillas. Primer presidente: J. L. Martín-Vivaldi.",en:"At its meeting of 13–14 May, the Spanish Clay Society is created. First president: J. L. Martín-Vivaldi."},
 {a:"1970",es:"Primera reunión Euroclay, en Madrid.",en:"First Euroclay meeting, in Madrid."},
 {a:"1972",es:"IV International Clay Conference, en Madrid.",en:"4th International Clay Conference, in Madrid."},
 {a:"1988",es:"Se crea el Premio Martín-Vivaldi.",en:"The Martín-Vivaldi Award is created."},
 {a:"2009",es:"50 aniversario.",en:"50th anniversary."},
 {a:"2017",es:"16.ª International Clay Conference en Granada, con más de 700 participantes.",en:"16th International Clay Conference in Granada, with more than 700 participants."},
 {a:"2027",es:"CLAY 2027, en Madrid.",en:"CLAY 2027, in Madrid."}
];
