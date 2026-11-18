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
    {f:"146-G490ps.jpg",a:"John Keeling y Peter Self (CSIRO)",t:"TEM"}
  ],
  illita:[
    {f:"38-ROTILL_5.jpg",a:"M. Roe"},
    {f:"42-illite_5000.jpg",a:"Evelyne Delbos"}
  ],
  montmorillonita:[
    {f:"143-1359895-16.jpg",a:"Laura-Jane Strachan",m:{es:"Ca-montmorillonita",en:"Ca-montmorillonite"}},
    {f:"72-volcanic-egg-BGR.jpg",a:"Stephan Kaufhold y Reiner Dohrmann (BGR)"},
    {f:"75-Steve-A.jpg",a:"Emilia García-Romero",m:{es:"Esmectita dioctaédrica",en:"Dioctahedral smectite"}},
    {f:"105-11.jpg",a:"Ana María Fernández Díaz",m:{es:"Esmectita dioctaédrica",en:"Dioctahedral smectite"}}
  ],
  beidellita:[{f:"100-1.jpg",a:"Adrian Biron",m:{es:"Beidellita sobre chamosita",en:"Beidellite on chamosite"}}],
  nontronita:[{f:"57-Non-15_04-NAu-1.jpg",a:"Laura-Jane Strachan y Evelyne Delbos"}],
  saponita:[{f:"94-Saponite-14_11-IOC-as-22.jpg",a:"Laura-Jane Strachan"}],
  hectorita:[{f:"91-Hectorite.jpg",a:"Evelyne Delbos"}],
  vermiculita:[{f:"99-Phalabora-BW.jpg",a:"Steve Hillier y David Riley (James Hutton Institute)",m:{es:"Vermiculita comercial con hidrobiotita, Palabora",en:"Commercial vermiculite with hydrobiotite, Phalaborwa"}}],
  clorita:[
    {f:"11-MULMS_6.jpg",a:"M. Roe",m:{es:"Clorita magnésica",en:"Mg-rich chlorite"}},
    {f:"10-SPR1_4.jpg",a:"M. Roe",m:{es:"Clorita férrica",en:"Fe-rich chlorite"}}
  ],
  sepiolita:[
    {f:"67-SEP4_2.jpg",a:"M. Roe"},
    {f:"121-291_05.jpg",a:"Andre Marx y Stephan Kaufhold (BGR)"}
  ],
  palygorskita:[
    {f:"114-9.jpg",a:"Ana María Fernández Díaz"},
    {f:"62-paly-597F.jpg",a:"Evelyne Delbos"},
    {f:"60-palygorskite-1.jpg",a:"Toshihiro Kogure"}
  ],
  interestratificados:[
    {f:"141-996735-42.jpg",a:"Laura-Jane Strachan",m:{es:"Interestratificado illita-esmectita",en:"Illite-smectite interstratification"}}
  ],
  corrensita:[{f:"13-corrensite-2.jpg",a:"Evelyne Delbos",m:{es:"Corrensita",en:"Corrensite"}}],
  tosudita:[{f:"98-EDZ22.jpg",a:"Evelyne Delbos (Macaulay Institute)",m:{es:"Tosudita",en:"Tosudite"}}],
  hidrobiotita:[{f:"99-Phalabora-BW.jpg",a:"Steve Hillier y David Riley (James Hutton Institute)",m:{es:"Vermiculita comercial con hidrobiotita, Palabora",en:"Commercial vermiculite with hydrobiotite, Phalaborwa"}}],
  crisotilo:[{f:"103-20.jpg",a:"Toshihiro Kogure",m:{es:"Crisotilo",en:"Chrysotile"}}]
};

/* Imágenes de la portada (en orden) */
window.HEROE = [["caolinita",0],["halloysita",1],["sepiolita",0],["montmorillonita",0],["palygorskita",2],["illita",1],["clorita",0]];

/* Grupos según la clasificación del Comité de Nomenclatura de la AIPEA (Guggenheim et al., 2006, tablas 2–4).
   x = carga neta de la lámina por fórmula unidad. Terminología: Glosario de la SEA (2023): capa = sheet, lámina = layer. */
window.GRUPOS = [
  {id:"1:1",es:"Serpentina-caolín (lámina 1:1, x ≈ 0)",en:"Serpentine-kaolin (1:1 layer, x ≈ 0)"},
  {id:"talco",es:"Talco-pirofilita (lámina 2:1, x ≈ 0)",en:"Talc-pyrophyllite (2:1 layer, x ≈ 0)"},
  {id:"esmectita",es:"Esmectitas (lámina 2:1, x ≈ 0,2–0,6)",en:"Smectites (2:1 layer, x ≈ 0.2–0.6)"},
  {id:"vermiculita",es:"Vermiculitas (lámina 2:1, x ≈ 0,6–0,9)",en:"Vermiculites (2:1 layer, x ≈ 0.6–0.9)"},
  {id:"illita",es:"Micas verdaderas y micas con déficit interlaminar (lámina 2:1)",en:"True micas and interlayer-deficient micas (2:1 layer)"},
  {id:"clorita",es:"Cloritas (lámina 2:1 con capa de hidróxido interlaminar)",en:"Chlorites (2:1 layer with interlayer hydroxide sheet)"},
  {id:"inter",es:"Interestratificados",en:"Interstratified minerals"},
  {id:"fibrosa",es:"Sepiolita-palygorskita (filosilicatos modulados, fibrosos)",en:"Sepiolite-palygorskite (modulated, fibrous phyllosilicates)"}
];

/* lam: tipo de estructura para el dibujo (inter puede ser una lista si las interláminas alternan);
   d: espaciado basal; den/fen: versión inglesa de d y de la fórmula cuando llevan texto;
   cic, se, hinch, plast: solo cuando hay datos bien establecidos (si faltan, no se muestran). */
window.MINERALES = [
 /* ---------- Serpentina-caolín ---------- */
 {id:"caolinita",grupo:"1:1",lam:{t:"TO",oct:"di"},formula:"Al₂Si₂O₅(OH)₄",d:"7,1–7,2 Å",cic:[3,15],se:[10,30],hinch:0,plast:2,
  es:{n:"Caolinita",r:"La arcilla blanca de la porcelana y del papel.",
   t:"Lámina 1:1 formada por una capa tetraédrica y una capa octaédrica dioctaédrica de aluminio. Las láminas se unen entre sí por enlaces de hidrógeno, sin cationes ni agua en la interlámina: por eso no hincha y su carga es prácticamente nula. Al microscopio forma placas hexagonales apiladas en «librillos». Se forma por meteorización o por alteración hidrotermal de feldespatos y otros aluminosilicatos. Es polimorfa de la dickita y la nacrita."},
  en:{n:"Kaolinite",r:"The white clay of porcelain and paper.",
   t:"A 1:1 layer made of one tetrahedral sheet and one dioctahedral aluminium octahedral sheet. Layers are held together by hydrogen bonds, with no cations or water in the interlayer, so it does not swell and its charge is practically zero. Under the microscope it forms hexagonal plates stacked in “booklets”. It forms by weathering or by hydrothermal alteration of feldspars and other aluminosilicates. It is polymorphous with dickite and nacrite."},
  espana:["vimianzo","burela","poveda","arguisuelas","arino","tamame"]},
 {id:"dickita",grupo:"1:1",lam:{t:"TO",oct:"di"},formula:"Al₂Si₂O₅(OH)₄",d:"7,2 Å",hinch:0,
  es:{n:"Dickita",r:"La caolinita de las rocas más calientes.",
   t:"Tiene la misma lámina 1:1 y la misma composición que la caolinita, pero las láminas se apilan de otra manera: la posición vacante de la capa octaédrica alterna de una lámina a la siguiente, y la celda unidad contiene dos láminas. Se forma a temperaturas más altas que la caolinita, en la diagénesis de enterramiento profundo de areniscas y en la alteración hidrotermal, y suele dar cristales más gruesos y bien formados."},
  en:{n:"Dickite",r:"The kaolinite of hotter rocks.",
   t:"It has the same 1:1 layer and the same composition as kaolinite, but its layers are stacked differently: the vacant site of the octahedral sheet alternates from one layer to the next, and the unit cell contains two layers. It forms at higher temperatures than kaolinite, during deep burial diagenesis of sandstones and hydrothermal alteration, and usually gives thicker, well-formed crystals."}},
 {id:"nacrita",grupo:"1:1",lam:{t:"TO",oct:"di"},formula:"Al₂Si₂O₅(OH)₄",d:"7,2 Å",hinch:0,
  es:{n:"Nacrita",r:"El polimorfo más raro del caolín.",
   t:"Tercer polimorfo del caolín, junto a la caolinita y la dickita, con un apilamiento distinto de las láminas 1:1. Es el menos frecuente de los tres y aparece sobre todo en filones y en rocas con alteración hidrotermal. Su nombre alude a su brillo nacarado."},
  en:{n:"Nacrite",r:"The rarest kaolin polymorph.",
   t:"The third kaolin polymorph, alongside kaolinite and dickite, with a different stacking of the 1:1 layers. It is the least common of the three and occurs mainly in veins and in hydrothermally altered rocks. Its name refers to its pearly lustre."}},
 {id:"halloysita",grupo:"1:1",lam:{t:"TO",oct:"di",agua:true},formula:"Al₂Si₂O₅(OH)₄·2H₂O",d:"10 Å; 7 Å deshidratada",den:"10 Å; 7 Å dehydrated",cic:[5,40],se:[20,60],hinch:0,plast:2,
  es:{n:"Halloysita",r:"La lámina del caolín enrollada en nanotubos.",
   t:"Tiene la misma lámina 1:1 que la caolinita, pero en su forma hidratada, la halloysita(10 Å), lleva una monocapa de moléculas de agua en la interlámina, que pierde con facilidad y de forma irreversible: halloysita(7 Å). Las láminas se curvan y suelen enrollarse en tubos huecos de pocas decenas de nanómetros de diámetro, a veces en esferas. Sus nanotubos se estudian para liberar fármacos de forma controlada y reforzar polímeros."},
  en:{n:"Halloysite",r:"The kaolin layer rolled into nanotubes.",
   t:"It has the same 1:1 layer as kaolinite, but in its hydrated form, halloysite(10 Å), it carries a monolayer of water molecules in the interlayer, which it loses easily and irreversibly: halloysite(7 Å). The layers curve and usually roll into hollow tubes a few tens of nanometres across, sometimes into spheres. Its nanotubes are studied for controlled drug release and for reinforcing polymers."}},
 {id:"lizardita",grupo:"1:1",lam:{t:"TO",oct:"tri"},formula:"Mg₃Si₂O₅(OH)₄",d:"7,3 Å",hinch:0,
  es:{n:"Lizardita",r:"La serpentina más común, de lámina plana.",
   t:"Equivalente trioctaédrico de la caolinita: en la capa octaédrica el magnesio ocupa las tres posiciones. Es la serpentina más abundante. Se forma al hidratarse a baja temperatura las peridotitas del manto y de las ofiolitas (serpentinización), y da a las serpentinitas su color verde y su tacto suave. Debe su nombre a la península de Lizard, en Cornualles (Reino Unido)."},
  en:{n:"Lizardite",r:"The most common serpentine, with a flat layer.",
   t:"The trioctahedral equivalent of kaolinite: magnesium fills all three sites of the octahedral sheet. It is the most abundant serpentine. It forms when mantle and ophiolite peridotites are hydrated at low temperature (serpentinization), and gives serpentinites their green colour and smooth feel. It is named after the Lizard peninsula in Cornwall (UK)."}},
 {id:"crisotilo",grupo:"1:1",lam:{t:"rollo",oct:"tri"},formula:"Mg₃Si₂O₅(OH)₄",d:"7,3 Å",hinch:0,
  es:{n:"Crisotilo",r:"La serpentina enrollada en fibras: el amianto blanco.",
   t:"Tiene la misma composición que la lizardita, pero la capa octaédrica de magnesio es algo mayor que la tetraédrica y la lámina 1:1 se curva hasta enrollarse en fibrillas huecas de pocas decenas de nanómetros de diámetro. Haces de estas fibras forman el amianto blanco, muy usado en el siglo xx en fibrocemento y aislamientos. Por sus efectos sobre la salud está prohibido en España desde 2002 y en toda la Unión Europea desde 2005."},
  en:{n:"Chrysotile",r:"Serpentine rolled into fibres: white asbestos.",
   t:"It has the same composition as lizardite, but the magnesium octahedral sheet is slightly larger than the tetrahedral sheet and the 1:1 layer curves until it rolls into hollow fibrils a few tens of nanometres across. Bundles of these fibres make up white asbestos, widely used in the 20th century in asbestos cement and insulation. Because of its health effects it has been banned in Spain since 2002 and throughout the European Union since 2005."}},
 {id:"antigorita",grupo:"1:1",lam:{t:"onda",oct:"tri"},formula:"(Mg,Fe²⁺)₃Si₂O₅(OH)₄",fen:"(Mg,Fe²⁺)₃Si₂O₅(OH)₄",d:"7,2–7,3 Å",hinch:0,
  es:{n:"Antigorita",r:"La serpentina ondulada de las rocas más profundas.",
   t:"Serpentina en la que la lámina 1:1 no es plana ni se enrolla: se ondula y la capa tetraédrica se invierte periódicamente cada pocos nanómetros. Esta estructura modulada la hace estable a mayor temperatura y presión que la lizardita y el crisotilo; es la serpentina de las serpentinitas metamórficas y de las zonas de subducción."},
  en:{n:"Antigorite",r:"The wavy serpentine of deeper rocks.",
   t:"A serpentine in which the 1:1 layer is neither flat nor rolled: it undulates, and the tetrahedral sheet inverts periodically every few nanometres. This modulated structure makes it stable at higher temperature and pressure than lizardite and chrysotile; it is the serpentine of metamorphic serpentinites and subduction zones."}},
 {id:"berthierina",grupo:"1:1",lam:{t:"TO",oct:"tri"},formula:"(Fe²⁺,Fe³⁺,Al,Mg)₂₋₃(Si,Al)₂O₅(OH)₄",d:"7,0–7,1 Å",hinch:0,
  es:{n:"Berthierina",r:"La serpentina de hierro de las ooides ferruginosas.",
   t:"Serpentina con Fe²⁺ dominante en la capa octaédrica. Es frecuente en las ooides de las rocas sedimentarias ferruginosas (ironstones) y en sedimentos marinos y lacustres poco profundos. Se confundió durante mucho tiempo con la chamosita, nombre que hoy se reserva para la clorita de Fe²⁺: la berthierina da un espaciado de 7 Å y la chamosita, de 14 Å."},
  en:{n:"Berthierine",r:"The iron serpentine of ironstone ooids.",
   t:"A serpentine with Fe²⁺ dominant in the octahedral sheet. It is common in the ooids of ironstones and in shallow marine and lacustrine sediments. It was long confused with chamosite, a name now reserved for the Fe²⁺ chlorite: berthierine gives a 7 Å spacing and chamosite a 14 Å one."}},
 {id:"odinita",grupo:"1:1",lam:{t:"TO",oct:"tri"},formula:"(Fe³⁺,Mg,Al,Fe²⁺)₂,₅(Si,Al)₂O₅(OH)₄",fen:"(Fe³⁺,Mg,Al,Fe²⁺)₂.₅(Si,Al)₂O₅(OH)₄",d:"7,2 Å",hinch:0,
  es:{n:"Odinita",r:"La arcilla verde de los mares tropicales poco profundos.",
   t:"Mineral 1:1 rico en hierro, intermedio entre dioctaédrico y trioctaédrico: ocupa unas dos y media de las tres posiciones octaédricas. Se forma en el fondo de plataformas tropicales poco profundas, a menudo dentro de restos de organismos y pelotillas fecales, y da su color verde a la facies «verdina». Debe su nombre al geólogo francés Gilles S. Odin."},
  en:{n:"Odinite",r:"The green clay of shallow tropical seas.",
   t:"An iron-rich 1:1 mineral, intermediate between dioctahedral and trioctahedral: it fills about two and a half of the three octahedral sites. It forms on the floor of shallow tropical shelves, often inside organic remains and faecal pellets, and gives its green colour to the “verdine” facies. It is named after the French geologist Gilles S. Odin."}},

 /* ---------- Talco-pirofilita ---------- */
 {id:"talco",grupo:"talco",lam:{t:"TOT",oct:"tri",inter:"nada"},formula:"Mg₃Si₄O₁₀(OH)₂",d:"9,3–9,4 Å",hinch:0,
  es:{n:"Talco",r:"El mineral más blando: se raya con la uña.",
   t:"Lámina 2:1 trioctaédrica de magnesio sin carga: no necesita cationes en la interlámina y las láminas se unen solo por fuerzas de van der Waals. Por eso se exfolia con facilidad, tiene tacto graso y es el mineral de dureza 1 en la escala de Mohs. Se forma en rocas ultramáficas metamorfizadas y en dolomías silíceas. Se usa en cerámica, papel, plásticos, pinturas, cosmética y farmacia."},
  en:{n:"Talc",r:"The softest mineral: a fingernail scratches it.",
   t:"An uncharged trioctahedral magnesium 2:1 layer: it needs no interlayer cations, and the layers are held together only by van der Waals forces. That is why it cleaves easily, feels greasy and is the hardness-1 mineral on the Mohs scale. It forms in metamorphosed ultramafic rocks and siliceous dolomites. It is used in ceramics, paper, plastics, paints, cosmetics and pharmacy."}},
 {id:"pirofilita",grupo:"talco",lam:{t:"TOT",oct:"di",inter:"nada"},formula:"Al₂Si₄O₁₀(OH)₂",d:"9,2 Å",hinch:0,
  es:{n:"Pirofilita",r:"El «talco de aluminio».",
   t:"Equivalente dioctaédrico del talco: lámina 2:1 de aluminio sin carga y sin cationes en la interlámina. Se forma en metapelitas muy ricas en aluminio, metabauxitas y metacuarcitas, y por alteración hidrotermal de rocas volcánicas. Su nombre, del griego «fuego» y «hoja», recuerda que al calentarla se abre en hojas. Se usa en refractarios, cerámica y como carga mineral."},
  en:{n:"Pyrophyllite",r:"The “aluminium talc”.",
   t:"The dioctahedral equivalent of talc: an uncharged aluminium 2:1 layer with no interlayer cations. It forms in very aluminous metapelites, metabauxites and metaquartzites, and by hydrothermal alteration of volcanic rocks. Its name, from the Greek for “fire” and “leaf”, recalls that it opens into leaves when heated. It is used in refractories, ceramics and as a mineral filler."}},

 /* ---------- Esmectitas ---------- */
 {id:"montmorillonita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"(Na,Ca)₀,₃₃(Al,Mg)₂Si₄O₁₀(OH)₂·nH₂O",fen:"(Na,Ca)₀.₃₃(Al,Mg)₂Si₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[80,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Montmorillonita",r:"El mineral de la bentonita, la arcilla que hincha.",
   t:"Esmectita dioctaédrica cuya carga procede de la capa octaédrica (magnesio en lugar de aluminio). En la interlámina hay cationes de cambio (Na⁺, Ca²⁺) rodeados de agua; al entrar más agua las láminas se separan y la arcilla hincha. Tiene una gran superficie específica y una gran capacidad de intercambio catiónico. Es el componente principal de la bentonita, como la de Cabo de Gata (Almería)."},
  en:{n:"Montmorillonite",r:"The mineral of bentonite, the swelling clay.",
   t:"A dioctahedral smectite whose charge comes from the octahedral sheet (magnesium replacing aluminium). The interlayer holds exchangeable cations (Na⁺, Ca²⁺) surrounded by water; as more water enters, the layers move apart and the clay swells. It has a large specific surface area and a high cation exchange capacity. It is the main component of bentonite, such as that of Cabo de Gata (Almería)."},
  espana:["gata","cuevas"]},
 {id:"beidellita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"(Na,Ca₀,₅)₀,₃Al₂(Si,Al)₄O₁₀(OH)₂·nH₂O",fen:"(Na,Ca₀.₅)₀.₃Al₂(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Beidellita",r:"La esmectita alumínica con la carga en los tetraedros.",
   t:"Esmectita dioctaédrica de aluminio cuya carga procede principalmente de aluminio que sustituye al silicio en la capa tetraédrica. Se distingue de la montmorillonita con la prueba de Greene-Kelly: tras saturarla con litio y calentarla, la beidellita vuelve a hinchar y la montmorillonita no."},
  en:{n:"Beidellite",r:"The aluminous smectite with tetrahedral charge.",
   t:"An aluminium dioctahedral smectite whose charge comes mainly from aluminium replacing silicon in the tetrahedral sheet. It is told apart from montmorillonite with the Greene-Kelly test: after lithium saturation and heating, beidellite swells again and montmorillonite does not."}},
 {id:"nontronita",grupo:"esmectita",lam:{t:"TOT",oct:"di",inter:"agua"},formula:"Na₀,₃Fe³⁺₂(Si,Al)₄O₁₀(OH)₂·nH₂O",fen:"Na₀.₃Fe³⁺₂(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,110],se:[500,800],hinch:3,plast:3,
  es:{n:"Nontronita",r:"La esmectita verde, rica en hierro.",
   t:"Esmectita dioctaédrica en la que el hierro férrico ocupa el lugar del aluminio: equivale a una beidellita con todo el aluminio octaédrico sustituido por Fe³⁺. De color verde amarillento, se forma por alteración de rocas básicas y en fondos oceánicos hidrotermales. También se ha detectado en Marte."},
  en:{n:"Nontronite",r:"The green, iron-rich smectite.",
   t:"A dioctahedral smectite in which ferric iron takes the place of aluminium: it is equivalent to a beidellite with all octahedral aluminium replaced by Fe³⁺. Yellowish green, it forms by alteration of mafic rocks and on hydrothermal sea floors. It has also been detected on Mars."}},
 {id:"saponita",grupo:"esmectita",lam:{t:"TOT",oct:"tri",inter:"agua"},formula:"Ca₀,₂₅(Mg,Fe)₃(Si,Al)₄O₁₀(OH)₂·nH₂O",fen:"Ca₀.₂₅(Mg,Fe)₃(Si,Al)₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,120],se:[600,800],hinch:3,plast:4,
  es:{n:"Saponita",r:"La esmectita magnésica, jabonosa al tacto.",
   t:"Esmectita trioctaédrica: el magnesio ocupa las tres posiciones octaédricas. La carga procede de aluminio en la capa tetraédrica. Su nombre viene del latín sapo, «jabón», por su tacto. En España hay bentonitas saponíticas en la cuenca de Madrid, en La Sagra (Toledo)."},
  en:{n:"Saponite",r:"The magnesian smectite, soapy to the touch.",
   t:"A trioctahedral smectite: magnesium fills all three octahedral sites. The charge comes from aluminium in the tetrahedral sheet. Its name comes from the Latin sapo, “soap”, for its feel. In Spain there are saponitic bentonites in the Madrid Basin, at La Sagra (Toledo)."},
  espana:["toledosep"]},
 {id:"hectorita",grupo:"esmectita",lam:{t:"TOT",oct:"tri",inter:"agua"},formula:"Na₀,₃(Mg,Li)₃Si₄O₁₀(F,OH)₂·nH₂O",fen:"Na₀.₃(Mg,Li)₃Si₄O₁₀(F,OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",cic:[70,110],se:[600,800],hinch:3,plast:4,
  es:{n:"Hectorita",r:"La esmectita de litio, base de geles y cosméticos.",
   t:"Esmectita trioctaédrica cuya carga procede del litio que sustituye al magnesio en la capa octaédrica. Sus partículas son muy pequeñas y forman geles transparentes, por lo que se usa como espesante en cosmética y pinturas. Debe su nombre a Hector (California), donde se describió."},
  en:{n:"Hectorite",r:"The lithium smectite behind gels and cosmetics.",
   t:"A trioctahedral smectite whose charge comes from lithium replacing magnesium in the octahedral sheet. Its particles are very small and form clear gels, so it is used as a thickener in cosmetics and paints. It is named after Hector (California), where it was described."}},
 {id:"estevensita",grupo:"esmectita",lam:{t:"TOT",oct:"tri",inter:"agua"},formula:"(Na,Ca)ₓ(Mg,□)₃Si₄O₁₀(OH)₂·nH₂O",fen:"(Na,Ca)ₓ(Mg,□)₃Si₄O₁₀(OH)₂·nH₂O",d:"12–15 Å (17 Å con etilenglicol)",
  es:{n:"Estevensita",r:"La esmectita magnésica de los antiguos lagos de Madrid.",
   t:"Esmectita trioctaédrica de magnesio, sin aluminio y rica en silicio, cuya pequeña carga no procede de sustituciones sino de posiciones vacantes en la capa octaédrica. En la cuenca de Madrid se formó en lagos y zonas palustres del Mioceno, a menudo interestratificada con la kerolita, por ejemplo en Esquivias (Toledo). Al microscopio electrónico forma un panal de porosidad altísima."},
  en:{n:"Stevensite",r:"The magnesian smectite of Madrid’s ancient lakes.",
   t:"A trioctahedral magnesium smectite, aluminium-free and silicon-rich, whose small charge comes not from substitutions but from vacant sites in the octahedral sheet. In the Madrid Basin it formed in Miocene lakes and marshes, often interstratified with kerolite, for instance at Esquivias (Toledo). Under the electron microscope it forms a highly porous honeycomb."}},

 /* ---------- Vermiculitas ---------- */
 {id:"vermiculita",grupo:"vermiculita",lam:{t:"TOT",oct:"tri",inter:"Mg"},formula:"Mg₀,₇(Mg,Fe,Al)₃(Al,Si)₄O₁₀(OH)₂·4H₂O",fen:"Mg₀.₇(Mg,Fe,Al)₃(Al,Si)₄O₁₀(OH)₂·4H₂O",d:"14,4–15,6 Å",cic:[120,200],se:[400,700],hinch:2,plast:2,
  es:{n:"Vermiculita",r:"La que se expande como un gusano al calentarla.",
   t:"Lámina 2:1 con más carga que las esmectitas, compensada sobre todo por magnesio hidratado en la interlámina. Hincha menos que las esmectitas: saturada con magnesio y tratada con glicerol se queda en 14,5 Å, mientras que la esmectita llega a 17,7 Å. Calentada de golpe, el agua se convierte en vapor y las láminas se separan: el grano crece muchas veces su tamaño, retorciéndose como un gusano (vermis). La vermiculita exfoliada se usa como aislante y en jardinería."},
  en:{n:"Vermiculite",r:"The one that expands like a worm when heated.",
   t:"A 2:1 layer with more charge than smectites, balanced mainly by hydrated magnesium in the interlayer. It swells less than smectites: Mg-saturated and glycerol-solvated it stays at 14.5 Å, whereas smectite reaches 17.7 Å. When heated suddenly, the water turns to steam and the layers separate: the grain grows many times its size, twisting like a worm (vermis). Exfoliated vermiculite is used as an insulator and in gardening."}},

 /* ---------- Micas ---------- */
 {id:"moscovita",grupo:"illita",lam:{t:"TOT",oct:"di",inter:"K"},formula:"KAl₂(Si₃Al)O₁₀(OH)₂",d:"10,0 Å",hinch:0,
  es:{n:"Moscovita",r:"La mica blanca, pariente mayor de la illita.",
   t:"Mica verdadera dioctaédrica: lámina 2:1 de aluminio con carga cercana a 1, compensada por potasio no hidratado en la interlámina. En las arcillas aparece como partículas finas heredadas de granitos, gneises y esquistos, y también se forma a partir de la illita al aumentar la temperatura, en la diagénesis profunda y el metamorfismo de grado bajo. La moscovita de grano muy fino se llama tradicionalmente sericita."},
  en:{n:"Muscovite",r:"White mica, the elder relative of illite.",
   t:"A dioctahedral true mica: an aluminium 2:1 layer with a charge close to 1, balanced by non-hydrated potassium in the interlayer. In clays it occurs as fine particles inherited from granites, gneisses and schists, and it also forms from illite as temperature rises, in deep diagenesis and low-grade metamorphism. Very fine-grained muscovite is traditionally called sericite."}},
 {id:"illita",grupo:"illita",lam:{t:"TOT",oct:"di",inter:"K"},formula:"K₀,₆₅Al₂(Al₀,₆₅Si₃,₃₅)O₁₀(OH)₂",fen:"K₀.₆₅Al₂(Al₀.₆₅Si₃.₃₅)O₁₀(OH)₂",d:"10 Å",cic:[10,40],se:[50,100],hinch:0,plast:3,
  es:{n:"Illita",r:"La «mica de las arcillas», la más abundante en las lutitas.",
   t:"Mica con déficit interlaminar, dioctaédrica: lámina 2:1 parecida a la de la moscovita, pero con más silicio y menos potasio en la interlámina. El potasio, no hidratado, sujeta con fuerza las láminas, de modo que el agua no puede separarlas: no hincha. Es el mineral de la arcilla más abundante en las rocas sedimentarias; con el enterramiento, la esmectita se transforma en illita a través de interestratificados illita-esmectita."},
  en:{n:"Illite",r:"The “clay mica”, the most abundant in shales.",
   t:"A dioctahedral interlayer-deficient mica: a 2:1 layer similar to that of muscovite, but with more silicon and less potassium in the interlayer. The non-hydrated potassium holds the layers tightly, so water cannot separate them: it does not swell. It is the most abundant clay mineral in sedimentary rocks; with burial, smectite turns into illite through illite-smectite interstratifications."}},
 {id:"glauconita",grupo:"illita",lam:{t:"TOT",oct:"di",inter:"K"},formula:"K₀,₈(Fe³⁺,Mg,Al)₂(Si,Al)₄O₁₀(OH)₂",fen:"K₀.₈(Fe³⁺,Mg,Al)₂(Si,Al)₄O₁₀(OH)₂",d:"10,0–10,1 Å",hinch:0,
  es:{n:"Glauconita",r:"La mica verde que nace en el fondo del mar.",
   t:"Mica con déficit interlaminar, dioctaédrica y rica en hierro, de color verde. Se forma en el fondo marino de plataformas con sedimentación muy lenta, en granos que suelen reemplazar pelotillas fecales, conchas y fragmentos minerales. Indica un medio marino, sirve para datar sedimentos por el potasio que contiene (métodos K-Ar y Ar-Ar) y las «arenas verdes» que la contienen se usan como fertilizante potásico."},
  en:{n:"Glauconite",r:"The green mica born on the sea floor.",
   t:"A dioctahedral, iron-rich interlayer-deficient mica, green in colour. It forms on the floor of shelves with very slow sedimentation, in grains that often replace faecal pellets, shells and mineral fragments. It indicates a marine setting, it is used to date sediments through its potassium (K-Ar and Ar-Ar methods), and the “greensands” that contain it are used as a potassium fertiliser."}},

 /* ---------- Cloritas ---------- */
 {id:"clorita",grupo:"clorita",lam:{t:"TOT",oct:"tri",inter:"hidroxido"},formula:"(R²⁺₅Al)(Si₃Al)O₁₀(OH)₈; R²⁺ = Mg, Fe²⁺, Ni, Mn, Zn",d:"14,0–14,4 Å",cic:[10,40],se:[10,50],hinch:0,plast:2,
  es:{n:"Clorita",r:"Una lámina 2:1 más una capa de hidróxido en la interlámina.",
   t:"Nombre de grupo. En la interlámina hay una capa octaédrica de hidróxido de magnesio, hierro o aluminio, en lugar de cationes sueltos. Por eso no hincha y su espaciado de 14 Å resiste el calentamiento a 550 °C. Las especies trioctaédricas se nombran por el catión divalente dominante: clinocloro (Mg) y chamosita (Fe²⁺) son las comunes. Es verde, abundante en rocas metamórficas de grado bajo, en la diagénesis y en sedimentos de latitudes altas."},
  en:{n:"Chlorite",r:"A 2:1 layer plus a hydroxide sheet in the interlayer.",
   t:"A group name. The interlayer holds an octahedral sheet of magnesium, iron or aluminium hydroxide instead of loose cations. It therefore does not swell, and its 14 Å spacing survives heating to 550 °C. Trioctahedral species are named after the dominant divalent cation: clinochlore (Mg) and chamosite (Fe²⁺) are the common ones. It is green and abundant in low-grade metamorphic rocks, in diagenesis and in high-latitude sediments."}},
 {id:"sudoita",grupo:"clorita",lam:{t:"TOT",oct:"di",inter:"hidroxido"},formula:"Mg₂(Al,Fe³⁺)₃(Si₃Al)O₁₀(OH)₈",d:"14,1–14,2 Å",hinch:0,
  es:{n:"Sudoíta",r:"La clorita mitad dioctaédrica, mitad trioctaédrica.",
   t:"Clorita di,trioctaédrica: la lámina 2:1 es dioctaédrica y la capa de hidróxido interlaminar es trioctaédrica. Es rica en aluminio y magnesio y pobre en litio. Aparece en areniscas durante la diagénesis, en alteraciones hidrotermales y en el metamorfismo de grado bajo. Honra al mineralogista japonés Toshio Sudo."},
  en:{n:"Sudoite",r:"The half-dioctahedral, half-trioctahedral chlorite.",
   t:"A di,trioctahedral chlorite: the 2:1 layer is dioctahedral and the interlayer hydroxide sheet is trioctahedral. It is rich in aluminium and magnesium and poor in lithium. It occurs in sandstones during diagenesis, in hydrothermal alteration and in low-grade metamorphism. It honours the Japanese mineralogist Toshio Sudo."}},

 /* ---------- Interestratificados ---------- */
 {id:"rectorita",grupo:"inter",lam:{t:"TOT",oct:"di",inter:["K","agua"]},formula:"Láminas de tipo mica y de tipo esmectita alternas (1:1)",fen:"Alternating mica-like and smectite-like layers (1:1)",d:"22–25 Å según catión y humedad; ≈ 27 Å con etilenglicol",den:"22–25 Å depending on cation and humidity; ≈ 27 Å with ethylene glycol",hinch:2,
  es:{n:"Rectorita",r:"Una interlámina de mica, otra de esmectita, y así sucesivamente.",
   t:"Interestratificado regular de láminas dioctaédricas de tipo mica y de tipo esmectita en proporción 1:1: una interlámina con cationes no hidratados (Na⁺, K⁺), que no hincha, alterna con otra con cationes de cambio hidratados, que sí hincha. Esa alternancia perfecta da una superestructura de unos 22–25 Å, según el catión y la humedad, con una serie regular de reflexiones. Aparece en rocas sedimentarias, alteraciones hidrotermales y metamorfismo de grado muy bajo."},
  en:{n:"Rectorite",r:"One mica interlayer, one smectite interlayer, and so on.",
   t:"A regular 1:1 interstratification of dioctahedral mica-like and smectite-like layers: an interlayer with non-hydrated cations (Na⁺, K⁺), which does not swell, alternates with one holding hydrated exchangeable cations, which does. This perfect alternation gives a superstructure of about 22–25 Å, depending on cation and humidity, with a regular series of reflections. It occurs in sedimentary rocks, hydrothermal alteration and very low-grade metamorphism."}},
 {id:"corrensita",grupo:"inter",lam:{t:"TOT",oct:"tri",inter:["hidroxido","agua"]},formula:"Láminas de tipo clorita y de tipo esmectita (o vermiculita) alternas (1:1)",fen:"Alternating chlorite-like and smectite-like (or vermiculite-like) layers (1:1)",d:"≈ 29 Å; 31–32 Å con etilenglicol; ≈ 24 Å calentada",den:"≈ 29 Å; 31–32 Å with ethylene glycol; ≈ 24 Å heated",hinch:2,
  es:{n:"Corrensita",r:"Mitad clorita, mitad esmectita, en alternancia perfecta.",
   t:"Interestratificado regular 1:1 de láminas trioctaédricas de tipo clorita con láminas trioctaédricas de tipo esmectita (corrensita de baja carga) o de tipo vermiculita (corrensita de alta carga). Se forma a baja temperatura: en evaporitas y depósitos salinos, en la diagénesis de enterramiento, en sistemas hidrotermales y en el metamorfismo de grado bajo. Honra al mineralogista alemán Carl W. Correns."},
  en:{n:"Corrensite",r:"Half chlorite, half smectite, in perfect alternation.",
   t:"A regular 1:1 interstratification of trioctahedral chlorite-like layers with trioctahedral smectite-like layers (low-charge corrensite) or vermiculite-like layers (high-charge corrensite). It forms at low temperature: in evaporites and saline deposits, in burial diagenesis, in hydrothermal systems and in low-grade metamorphism. It honours the German mineralogist Carl W. Correns."}},
 {id:"tosudita",grupo:"inter",lam:{t:"TOT",oct:"di",inter:["hidroxido","agua"]},formula:"Láminas de tipo clorita y de tipo esmectita alternas (1:1), en promedio dioctaédricas",fen:"Alternating chlorite-like and smectite-like layers (1:1), dioctahedral on average",d:"≈ 29–30 Å; ≈ 31 Å con etilenglicol; ≈ 23–24 Å calentada",den:"≈ 29–30 Å; ≈ 31 Å with ethylene glycol; ≈ 23–24 Å heated",hinch:2,
  es:{n:"Tosudita",r:"La corrensita dioctaédrica.",
   t:"Interestratificado regular 1:1 de láminas de tipo clorita y de tipo esmectita que, en conjunto, es dioctaédrico. La clorita puede ser donbassita, sudoíta o cookeíta (esta última con litio). Se forma sobre todo por alteración hidrotermal de rocas volcánicas. Como la sudoíta, honra a Toshio Sudo: su nombre une las sílabas de Toshio y Sudo."},
  en:{n:"Tosudite",r:"The dioctahedral corrensite.",
   t:"A regular 1:1 interstratification of chlorite-like and smectite-like layers that is dioctahedral overall. The chlorite may be donbassite, sudoite or cookeite (the latter with lithium). It forms mainly by hydrothermal alteration of volcanic rocks. Like sudoite, it honours Toshio Sudo: its name joins the syllables of Toshio and Sudo."}},
 {id:"aliettita",grupo:"inter",lam:{t:"TOT",oct:"tri",inter:["nada","agua"]},formula:"Láminas de tipo talco y de tipo esmectita trioctaédrica alternas (1:1)",fen:"Alternating talc-like and trioctahedral smectite-like layers (1:1)",d:"24,8 Å; 27,1 Å con glicerol",den:"24.8 Å; 27.1 Å with glycerol",hinch:2,
  es:{n:"Aliettita",r:"Talco y esmectita, lámina a lámina.",
   t:"Interestratificado regular 1:1 de láminas de tipo talco y de tipo esmectita trioctaédrica: una interlámina vacía, como en el talco, alterna con otra hidratada e hinchable. Se ha descrito en serpentinitas alteradas, como las del valle del Taro (Italia). Honra al mineralogista italiano Andrea Alietti."},
  en:{n:"Aliettite",r:"Talc and smectite, layer by layer.",
   t:"A regular 1:1 interstratification of talc-like and trioctahedral smectite-like layers: an empty interlayer, as in talc, alternates with a hydrated, swelling one. It has been described in altered serpentinites, such as those of the Taro valley (Italy). It honours the Italian mineralogist Andrea Alietti."}},
 {id:"hidrobiotita",grupo:"inter",lam:{t:"TOT",oct:"tri",inter:["K","Mg"]},formula:"Láminas de tipo biotita y de tipo vermiculita alternas (1:1)",fen:"Alternating biotite-like and vermiculite-like layers (1:1)",d:"≈ 24–25 Å",hinch:1,
  es:{n:"Hidrobiotita",r:"La biotita a medio camino de convertirse en vermiculita.",
   t:"Interestratificado regular 1:1 de láminas de tipo biotita, con potasio, y de tipo vermiculita, con magnesio hidratado. Se forma al meteorizarse la biotita, que pierde potasio interlámina a interlámina. Gran parte de la «vermiculita» comercial, como la de Palabora (Sudáfrica), contiene hidrobiotita, que también se exfolia al calentarla."},
  en:{n:"Hydrobiotite",r:"Biotite halfway to becoming vermiculite.",
   t:"A regular 1:1 interstratification of biotite-like layers, with potassium, and vermiculite-like layers, with hydrated magnesium. It forms as biotite weathers, losing potassium one interlayer at a time. Much commercial “vermiculite”, such as that of Phalaborwa (South Africa), contains hydrobiotite, which also exfoliates on heating."}},
 {id:"interestratificados",grupo:"inter",lam:{t:"inter"},formula:"p. ej. illita-esmectita, clorita-esmectita, kerolita-estevensita",fen:"e.g. illite-smectite, chlorite-smectite, kerolite-stevensite",d:"Variable",
  es:{n:"Interestratificados irregulares",r:"Pilas que mezclan dos tipos de láminas sin un orden perfecto.",
   t:"Una misma partícula apila láminas de dos tipos, por ejemplo de illita y de esmectita, al azar o con un orden parcial. No son especies minerales: se describen por sus componentes, como «interestratificado irregular illita-esmectita». Son muy comunes y registran la historia de la roca: la proporción de láminas de illita en el illita-esmectita aumenta con la temperatura de enterramiento. En la cuenca de Madrid son característicos los interestratificados kerolita-estevensita."},
  en:{n:"Irregular interstratifications",r:"Stacks that mix two kinds of layers without perfect order.",
   t:"A single particle stacks two kinds of layers, for example illite and smectite, at random or with partial order. They are not mineral species: they are described by their components, as in “illite-smectite irregular interstratification”. They are very common and record the history of a rock: the proportion of illite layers in illite-smectite increases with burial temperature. Kerolite-stevensite interstratifications are characteristic of the Madrid Basin."}},

 /* ---------- Sepiolita-palygorskita ---------- */
 {id:"sepiolita",grupo:"fibrosa",lam:{t:"fibra",oct:"tri"},formula:"Mg₈Si₁₂O₃₀(OH)₄(OH₂)₄·8H₂O",d:"12,1 Å (110)",cic:[20,45],se:[200,400],hinch:0,plast:3,
  es:{n:"Sepiolita",r:"La arcilla en fibras; la mayor parte de la del mundo sale de Madrid.",
   t:"En lugar de láminas continuas tiene cintas 2:1: los tetraedros invierten su vértice de una cinta a la siguiente y la capa octaédrica queda cortada en listones, con ocho posiciones octaédricas por fórmula. Entre las cintas quedan canales a lo largo de la fibra donde entran agua y moléculas; de ahí su enorme capacidad de absorción. Es magnésica. La cuenca de Madrid alberga el mayor yacimiento de sepiolita del mundo y de ella sale la mayor parte de la producción mundial; se usa en absorbentes, alimentación animal y lodos de perforación."},
  en:{n:"Sepiolite",r:"The fibrous clay; most of the world’s supply comes from Madrid.",
   t:"Instead of continuous layers it has 2:1 ribbons: the tetrahedra invert their apices from one ribbon to the next, and the octahedral sheet is cut into strips, with eight octahedral sites per formula. Between the ribbons there are channels along the fibre where water and molecules enter; hence its enormous absorption capacity. It is magnesian. The Madrid Basin hosts the world’s largest sepiolite deposit and supplies most of the world’s production; it is used in absorbents, animal feed and drilling muds."},
  espana:["vicalvaro","toledosep","orera"]},
 {id:"palygorskita",grupo:"fibrosa",lam:{t:"fibra",oct:"di"},formula:"(Mg,Al)₅Si₈O₂₀(OH)₂(OH₂)₄·4H₂O",d:"10,5 Å (110)",cic:[20,50],se:[125,210],hinch:0,plast:3,
  es:{n:"Palygorskita",r:"La fibra del azul maya.",
   t:"Hermana de la sepiolita, con cintas más estrechas (cinco posiciones octaédricas por fórmula, frente a ocho) y canales más pequeños; contiene más aluminio. El nombre «atapulgita», muy usado en la industria, es un sinónimo desacreditado. Los mayas la mezclaron con índigo y la calentaron: el colorante entró en los canales y creó el azul maya, un pigmento que resiste siglos. En España hay yacimientos en Bercimuel (Segovia) y Torrejón el Rubio (Cáceres)."},
  en:{n:"Palygorskite",r:"The fibre behind Maya blue.",
   t:"Sepiolite’s sister, with narrower ribbons (five octahedral sites per formula, against eight) and smaller channels; it contains more aluminium. The name “attapulgite”, widely used in industry, is a discredited synonym. The Maya mixed it with indigo and heated it: the dye entered the channels and created Maya blue, a pigment that has lasted for centuries. In Spain there are deposits at Bercimuel (Segovia) and Torrejón el Rubio (Cáceres)."},
  espana:["bercimuel","torrejonrubio"]}
];

window.APLICACIONES = [
 {id:"ceramica",m:["caolinita","illita"],es:{n:"Cerámica y porcelana",t:"El caolín da blancura y la illita, plasticidad. Al cocer, la caolinita pierde su agua estructural hacia 550 °C y a más de 1000 °C forma mullita, que da resistencia a la porcelana."},en:{n:"Ceramics and porcelain",t:"Kaolin gives whiteness and illite plasticity. On firing, kaolinite loses its structural water at about 550 °C and above 1000 °C forms mullite, which gives porcelain its strength."}},
 {id:"papel",m:["caolinita"],es:{n:"Papel",t:"El caolín es carga y estucado: rellena los huecos entre fibras y da al papel brillo, blancura y una superficie lisa para imprimir."},en:{n:"Paper",t:"Kaolin is used as filler and coating: it fills the gaps between fibres and gives paper gloss, whiteness and a smooth printing surface."}},
 {id:"perforacion",m:["montmorillonita","sepiolita","palygorskita"],es:{n:"Lodos de perforación",t:"La bentonita sódica forma un lodo que enfría la broca, sube los detritos y sella las paredes del pozo. En aguas saladas o a alta temperatura se usan sepiolita y palygorskita, cuyas fibras no floculan."},en:{n:"Drilling muds",t:"Sodium bentonite forms a mud that cools the bit, carries cuttings up and seals the borehole walls. In salty water or at high temperature, sepiolite and palygorskite are used, as their fibres do not flocculate."}},
 {id:"fundicion",m:["montmorillonita"],es:{n:"Moldes de fundición",t:"La bentonita aglutina la arena de los moldes de fundición: mojada se moldea y aguanta el metal fundido."},en:{n:"Foundry moulds",t:"Bentonite binds the sand of foundry moulds: damp, it can be shaped and it withstands molten metal."}},
 {id:"farmacia",m:["caolinita","montmorillonita","hectorita","sepiolita"],es:{n:"Farmacia y cosmética",t:"Excipientes, antidiarreicos y protectores gástricos; mascarillas, cremas y maquillajes. La hectorita y la montmorillonita espesan geles; el caolín absorbe grasa."},en:{n:"Pharmacy and cosmetics",t:"Excipients, antidiarrhoeals and stomach protectors; face masks, creams and make-up. Hectorite and montmorillonite thicken gels; kaolin absorbs oil."}},
 {id:"pienso",m:["sepiolita","montmorillonita"],es:{n:"Alimentación animal",t:"La sepiolita y la bentonita se añaden a los piensos como aglomerantes y para captar micotoxinas en el aparato digestivo del animal."},en:{n:"Animal feed",t:"Sepiolite and bentonite are added to feed as binders and to trap mycotoxins in the animal’s gut."}},
 {id:"absorbentes",m:["sepiolita","montmorillonita","palygorskita"],es:{n:"Absorbentes y arena para gatos",t:"Sus canales y su gran superficie retienen líquidos y olores: lechos para mascotas, absorbentes industriales para derrames de aceite."},en:{n:"Absorbents and cat litter",t:"Their channels and large surface hold liquids and odours: pet litter, industrial absorbents for oil spills."}},
 {id:"barreras",m:["montmorillonita"],es:{n:"Barreras para residuos (FEBEX)",t:"La bentonita compactada hincha y sella. En el proyecto FEBEX se ensayó durante casi veinte años, a escala real, una barrera de bentonita de Almería para aislar residuos radiactivos de alta actividad. También se usa en láminas impermeables para vertederos."},en:{n:"Waste barriers (FEBEX)",t:"Compacted bentonite swells and seals. In the FEBEX project a barrier of bentonite from Almería was tested at full scale for almost twenty years to isolate high-level radioactive waste. It is also used in waterproof liners for landfills."}},
 {id:"vino",m:["montmorillonita"],es:{n:"Clarificación de vinos",t:"Las partículas de bentonita, con carga negativa, atraen las proteínas del vino y las arrastran al fondo, lo que evita que el vino se enturbie."},en:{n:"Wine fining",t:"Negatively charged bentonite particles attract wine proteins and drag them to the bottom, preventing haze."}},
 {id:"catalisis",m:["caolinita","montmorillonita"],es:{n:"Catálisis",t:"Del caolín se obtienen los catalizadores del craqueo del petróleo y zeolitas sintéticas. Las arcillas «pilareadas», con columnas de óxidos entre las láminas, son catalizadores porosos."},en:{n:"Catalysis",t:"Kaolin is the raw material for oil-cracking catalysts and synthetic zeolites. “Pillared” clays, with oxide pillars between the layers, are porous catalysts."}},
 {id:"nanocompuestos",m:["montmorillonita","halloysita","sepiolita"],es:{n:"Nanocompuestos",t:"Unos pocos por ciento de arcilla dispersa en un plástico lo hacen más rígido, menos inflamable y menos permeable a los gases. Los nanotubos de halloysita y las fibras de sepiolita se exploran para fármacos y biomateriales."},en:{n:"Nanocomposites",t:"A few per cent of clay dispersed in a plastic makes it stiffer, less flammable and less permeable to gases. Halloysite nanotubes and sepiolite fibres are being explored for drugs and biomaterials."}},
 {id:"azulmaya",m:["palygorskita"],es:{n:"Patrimonio: el azul maya",t:"Palygorskita e índigo calentados juntos: el colorante se aloja en los canales de la fibra y queda protegido. Murales y objetos mayas conservan este azul después de más de mil años."},en:{n:"Heritage: Maya blue",t:"Palygorskite and indigo heated together: the dye lodges in the fibre channels and is protected. Maya murals and objects keep this blue after more than a thousand years."}}
];

window.MUNDO = [
 {m:"caolinita",es:"Caolín: Cornualles (Reino Unido), Georgia (EE. UU.), Pará (Brasil), Charentes (Francia)",en:"Kaolin: Cornwall (UK), Georgia (USA), Pará (Brazil), Charentes (France)"},
 {m:"montmorillonita",es:"Bentonita: Wyoming (EE. UU.), Milos (Grecia), Cerdeña (Italia), Anatolia (Turquía), Gujarat (India)",en:"Bentonite: Wyoming (USA), Milos (Greece), Sardinia (Italy), Anatolia (Turkey), Gujarat (India)"},
 {m:"sepiolita",es:"Sepiolita: cuenca de Madrid (España, el mayor yacimiento del mundo), Eskişehir (Turquía, la «espuma de mar» de las pipas), Amboseli (Kenia y Tanzania)",en:"Sepiolite: Madrid Basin (Spain, the world’s largest deposit), Eskişehir (Turkey, the “meerschaum” of pipes), Amboseli (Kenya and Tanzania)"},
 {m:"palygorskita",es:"Palygorskita (atapulgita): Georgia y Florida (EE. UU.), Senegal, Cherkasy (Ucrania), Jiangsu y Anhui (China)",en:"Palygorskite (attapulgite): Georgia and Florida (USA), Senegal, Cherkasy (Ukraine), Jiangsu and Anhui (China)"},
 {m:"halloysita",es:"Halloysita: Dragon Mine, Utah (EE. UU.), Matauri Bay (Nueva Zelanda), Dunino (Polonia), Balıkesir (Turquía)",en:"Halloysite: Dragon Mine, Utah (USA), Matauri Bay (New Zealand), Dunino (Poland), Balıkesir (Turkey)"},
 {m:"vermiculita",es:"Vermiculita: Palabora (Sudáfrica), Goiás (Brasil), Xinjiang (China); Libby, Montana (EE. UU., cerrada)",en:"Vermiculite: Phalaborwa (South Africa), Goiás (Brazil), Xinjiang (China); Libby, Montana (USA, closed)"},
 {m:"hectorita",es:"Hectorita: Hector, California (EE. UU.)",en:"Hectorite: Hector, California (USA)"}
];

/* DRX: picos [d (Å), intensidad relativa] en agregado orientado (AO), etilenglicol (EG) y calentado a 550 °C */
window.DRX = {
 caolinita:{AO:[[7.16,100],[3.58,70]],EG:[[7.16,100],[3.58,70]],C:[],
  es:"El pico de 7,2 Å no cambia con etilenglicol y desaparece a 550 °C: la caolinita pierde sus OH y se vuelve amorfa (metacaolín).",en:"The 7.2 Å peak does not change with ethylene glycol and disappears at 550 °C: kaolinite loses its OH groups and becomes amorphous (metakaolin)."},
 illita:{AO:[[10.0,100],[5.0,35],[3.33,60]],EG:[[10.0,100],[5.0,35],[3.33,60]],C:[[10.0,110],[5.0,35],[3.33,60]],
  es:"Los picos a 10, 5 y 3,33 Å no se mueven con ningún tratamiento: el potasio mantiene las láminas juntas.",en:"The peaks at 10, 5 and 3.33 Å do not move with any treatment: potassium keeps the layers together."},
 montmorillonita:{AO:[[14.5,100]],EG:[[17.0,110],[8.5,15],[5.6,12]],C:[[9.8,80]],
  es:"Firma de la esmectita: hacia 14–15 Å en seco, se desplaza a 17 Å con etilenglicol (las láminas se abren) y colapsa a unos 10 Å al calentarla.",en:"The smectite signature: about 14–15 Å when air-dried, it shifts to 17 Å with ethylene glycol (the layers open) and collapses to about 10 Å on heating."},
 vermiculita:{AO:[[14.4,100],[7.2,20],[4.8,15]],EG:[[14.4,100],[7.2,20],[4.8,15]],C:[[10.0,80]],
  es:"Igual que la esmectita a 14 Å, pero no se expande con etilenglicol; a 550 °C colapsa a 10 Å.",en:"Like smectite at 14 Å, but it does not expand with ethylene glycol; at 550 °C it collapses to 10 Å."},
 clorita:{AO:[[14.2,70],[7.1,100],[4.73,45],[3.55,70]],EG:[[14.2,70],[7.1,100],[4.73,45],[3.55,70]],C:[[13.9,130],[7.1,25],[4.73,10],[3.55,15]],
  es:"Picos a 14, 7, 4,7 y 3,5 Å. A 550 °C el de 14 Å se refuerza y los demás se debilitan; así se distingue de la caolinita, que también da 7 Å.",en:"Peaks at 14, 7, 4.7 and 3.5 Å. At 550 °C the 14 Å peak gets stronger and the others weaken; that is how it is told apart from kaolinite, which also gives 7 Å."},
 sepiolita:{AO:[[12.1,100],[4.5,15],[3.35,12]],EG:[[12.1,100],[4.5,15],[3.35,12]],C:[[10.4,55]],
  es:"Pico intenso a 12,1 Å que no cambia con etilenglicol. Al calentarla pierde el agua de los canales y la estructura se pliega (≈10,4 Å).",en:"A strong 12.1 Å peak that does not change with ethylene glycol. On heating it loses the channel water and the structure folds (≈10.4 Å)."},
 palygorskita:{AO:[[10.5,100],[6.4,30],[4.47,25]],EG:[[10.5,100],[6.4,30],[4.47,25]],C:[[9.2,50]],
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

/* Para especialistas: clasificación según el Comité de Nomenclatura de la AIPEA
   (Guggenheim et al., 2006, Clays and Clay Minerals 54, 761–772) y Glosario de la SEA (2023).
   x = carga neta de la lámina por fórmula unidad, como número positivo. */
(function(){
 var SC={es:"Serpentina-caolín",en:"Serpentine-kaolin"}, DI={es:"Dioctaédrico",en:"Dioctahedral"}, TRI={es:"Trioctaédrico",en:"Trioctahedral"},
     NADA={es:"Ninguno o solo H₂O",en:"None or H₂O only"}, NINGUNO={es:"Ninguno",en:"None"},
     ESM={es:"Esmectita",en:"Smectite"}, HID={es:"Cationes de cambio hidratados",en:"Hydrated exchangeable cations"},
     DEF={es:"Mica con déficit interlaminar",en:"Interlayer-deficient mica"}, NOHID={es:"Cationes monovalentes o divalentes no hidratados",en:"Non-hydrated monovalent or divalent cations"},
     CLO={es:"Clorita",en:"Chlorite"}, CAPAH={es:"Capa de hidróxido",en:"Hydroxide sheet"}, VAR={es:"Variable",en:"Variable"},
     REG={es:"Interestratificado regular",en:"Regular interstratification"}, ALT={es:"Alterna de una interlámina a la siguiente",en:"Alternates from one interlayer to the next"},
     MOD={es:"2:1 modulada",en:"Modulated 2:1"}, SP={es:"Sepiolita-palygorskita",en:"Sepiolite-palygorskite"},
     KAOL={es:"Caolinita, dickita y nacrita tienen la misma lámina 1:1 y difieren en la posición del hueco octaédrico de una lámina a otra y en el apilamiento. La AIPEA (Guggenheim et al., 1997) recomendó conservar los tres nombres como especies. Los términos «kandita» y «septeclorita» no están aceptados.",en:"Kaolinite, dickite and nacrite share the same 1:1 layer and differ in the position of the octahedral vacancy from layer to layer and in stacking. AIPEA (Guggenheim et al., 1997) recommended retaining all three names as species. The terms “kandite” and “septechlorite” are not approved."},
     SERP={es:"Subgrupo trioctaédrico (serpentina) del grupo serpentina-caolín. Especies planas: lizardita, berthierina, amesita, cronstedtita, nepouita, kellyíta, fraipontita y brindleyíta.",en:"Trioctahedral (serpentine) subgroup of the serpentine-kaolin group. Planar species: lizardite, berthierine, amesite, cronstedtite, nepouite, kellyite, fraipontite and brindleyite."};
 window.ESPECIALISTAS = {
 caolinita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:DI,inter:NADA,nota:KAOL},
 dickita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:DI,inter:NADA,nota:KAOL},
 nacrita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:DI,inter:NADA,nota:KAOL},
 halloysita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:DI,inter:{es:"H₂O",en:"H₂O"},nota:{es:"Se escribe halloysita(10 Å) o halloysita(7 Å) según el agua interlaminar; el término «endellita» está desechado. La halloysita plana está en la tabla de filosilicatos planos; la tubular o esferoidal, entre los filosilicatos no planos de estructura enrollada.",en:"Written halloysite(10 Å) or halloysite(7 Å) depending on interlayer water; the term “endellite” is discarded. Planar halloysite belongs with the planar phyllosilicates; tubular or spheroidal halloysite, with the non-planar rolled structures."}},
 lizardita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:TRI,inter:NADA,nota:SERP},
 crisotilo:{lam:"1:1",x:"≈ 0",grupo:SC,oct:TRI,inter:NINGUNO,nota:{es:"Filosilicato no plano de estructura enrollada, de afinidad tradicional serpentina (tabla 3 de la AIPEA). La pecoraíta es un clinocrisotilo rico en Ni.",en:"A non-planar phyllosilicate with a rolled structure, traditionally affiliated with serpentine (AIPEA Table 3). Pecoraite is a Ni-rich clinochrysotile."}},
 antigorita:{lam:{es:"1:1 modulada",en:"Modulated 1:1"},x:"≈ 0",grupo:SC,oct:TRI,inter:NINGUNO,nota:{es:"Filosilicato no plano modulado: la capa tetraédrica se invierte y forma bandas (tabla 3 de la AIPEA). En el mismo grupo modulado 1:1 está la bementita.",en:"A modulated non-planar phyllosilicate: the tetrahedral sheet inverts, forming strips (AIPEA Table 3). Bementite belongs to the same modulated 1:1 group."}},
 berthierina:{lam:"1:1",x:"≈ 0",grupo:SC,oct:TRI,inter:NADA,nota:{es:"Serpentina con Fe²⁺ dominante; puede contener Fe³⁺, Mg y Al. A veces se llamó chamosita, nombre que la AIPEA reserva para la clorita con Fe²⁺ dominante.",en:"A serpentine with dominant Fe²⁺; it may contain Fe³⁺, Mg and Al. It was sometimes called chamosite, a name AIPEA reserves for the chlorite with dominant Fe²⁺."}},
 odinita:{lam:"1:1",x:"≈ 0",grupo:SC,oct:{es:"Di,trioctaédrico",en:"Di,trioctahedral"},inter:NADA,nota:{es:"Única especie di,trioctaédrica del grupo serpentina-caolín en la clasificación de la AIPEA.",en:"The only di,trioctahedral species of the serpentine-kaolin group in the AIPEA classification."}},
 talco:{lam:"2:1",x:"≈ 0",grupo:{es:"Talco-pirofilita",en:"Talc-pyrophyllite"},oct:TRI,inter:NINGUNO,nota:{es:"Subgrupo trioctaédrico: talco, willemseíta (talco rico en Ni), kerolita y pimelita. Según el Glosario de la SEA, la kerolita es una variedad de talco con H₂O interlaminar y apilamiento turboestrático, y no debe usarse como nombre de mineral en sentido estricto. «Lámina tipo talco» es una denominación inapropiada para la lámina 2:1. Politipo dominante: talco-1A (antes 1Tc).",en:"Trioctahedral subgroup: talc, willemseite (Ni-rich talc), kerolite and pimelite. According to the SEA Glossary, kerolite is a variety of talc with interlayer H₂O and turbostratic stacking, and should not be used as a mineral name in the strict sense. “Talc-type layer” is an inappropriate term for the 2:1 layer. Dominant polytype: talc-1A (formerly 1Tc)."}},
 pirofilita:{lam:"2:1",x:"≈ 0",grupo:{es:"Talco-pirofilita",en:"Talc-pyrophyllite"},oct:DI,inter:NINGUNO,nota:{es:"Subgrupo dioctaédrico: pirofilita y ferripirofilita. El apilamiento no lo fija un catión interlaminar, sino la repulsión Si–Si a través de la interlámina vacía. Politipo dominante: 1A (antes 1Tc).",en:"Dioctahedral subgroup: pyrophyllite and ferripyrophyllite. Stacking is not controlled by an interlayer cation but by Si–Si repulsion across the empty interlayer. Dominant polytype: 1A (formerly 1Tc)."}},
 montmorillonita:{lam:"2:1",x:"0,2–0,6",grupo:ESM,oct:DI,inter:HID,nota:{es:"Las esmectitas dioctaédricas se nombran por el catión trivalente octaédrico dominante: montmorillonita y beidellita (Al), nontronita (Fe³⁺) y volkonskoíta (Cr). Montmorillonita y beidellita se distinguen por la posición de la carga: octaédrica en la primera, tetraédrica en la segunda. El término «esmectita» sustituyó en 1976 al antiguo nombre de grupo «montmorillonita-saponita».",en:"Dioctahedral smectites are named after the dominant trivalent octahedral cation: montmorillonite and beidellite (Al), nontronite (Fe³⁺) and volkonskoite (Cr). Montmorillonite and beidellite differ in where the charge sits: octahedral in the former, tetrahedral in the latter. The term “smectite” replaced the old group name “montmorillonite-saponite” in 1976."}},
 beidellita:{lam:"2:1",x:"0,2–0,6",grupo:ESM,oct:DI,inter:HID,nota:{es:"Hay una serie entre la beidellita y la nontronita al sustituirse el Al octaédrico por Fe³⁺. El término «montmorillonita tipo beidellita» está obsoleto.",en:"There is a series between beidellite and nontronite as octahedral Al is replaced by Fe³⁺. The term “beidellite-type montmorillonite” is obsolete."}},
 nontronita:{lam:"2:1",x:"0,2–0,6",grupo:ESM,oct:DI,inter:HID,nota:{es:"Equivale a una beidellita con todo el Al octaédrico sustituido por Fe³⁺. En la serie de la montmorillonita se dice «montmorillonita rica en Fe³⁺» mientras el Fe³⁺ no supere al Al. «Hidroferripirofilita» es un sinónimo desechado.",en:"Equivalent to a beidellite with all octahedral Al replaced by Fe³⁺. In the montmorillonite series, “Fe³⁺-rich montmorillonite” is used while Fe³⁺ does not exceed Al. “Hydroferripyrophyllite” is a discarded synonym."}},
 saponita:{lam:"2:1",x:"0,2–0,6",grupo:ESM,oct:TRI,inter:HID,nota:{es:"Esmectitas trioctaédricas: saponita, hectorita, sauconita (Zn), estevensita y swinefordita.",en:"Trioctahedral smectites: saponite, hectorite, sauconite (Zn), stevensite and swinefordite."}},
 hectorita:{lam:"2:1",x:"0,2–0,6",grupo:ESM,oct:TRI,inter:HID,nota:{es:"Un material sintético parecido debe llamarse «sintético similar a la hectorita», nunca hectorita: el término arcilla y los nombres de mineral implican origen natural.",en:"A similar synthetic material should be called “synthetic hectorite-like”, never hectorite: the term clay and mineral names imply natural origin."}},
 estevensita:{lam:"2:1",x:{es:"Baja (por vacantes octaédricas)",en:"Low (from octahedral vacancies)"},grupo:ESM,oct:TRI,inter:HID,nota:{es:"Especie mal definida: la falta de Al, algunas vacantes octaédricas y los altos contenidos de Si y Mg son sus rasgos característicos (Glosario de la SEA).",en:"A poorly defined species: lack of Al, some octahedral vacancies and high Si and Mg contents are its characteristic features (SEA Glossary)."}},
 vermiculita:{lam:"2:1",x:"0,6–0,9",grupo:{es:"Vermiculita",en:"Vermiculite"},oct:{es:"Trioctaédrico (también dioctaédrico)",en:"Trioctahedral (also dioctahedral)"},inter:HID,nota:{es:"El límite con la esmectita está en 0,6 de carga por fórmula unidad. Para distinguirlas se recomienda saturar con Mg y solvatar con glicerol (14,5 Å la vermiculita, 17,7 Å la esmectita), y usar también etilenglicol y varios cationes.",en:"The boundary with smectite is a charge of 0.6 per formula unit. To tell them apart, Mg saturation and glycerol solvation are recommended (14.5 Å for vermiculite, 17.7 Å for smectite), also using ethylene glycol and several cations."}},
 moscovita:{lam:"2:1",x:"0,85–1,0",grupo:{es:"Mica verdadera (flexible)",en:"True (flexible) mica"},oct:DI,inter:{es:"Cationes monovalentes no hidratados (≥ 50 %)",en:"Non-hydrated monovalent cations (≥ 50%)"},nota:{es:"Micas verdaderas dioctaédricas: moscovita, celadonita y paragonita; trioctaédricas: annita, flogopita, lepidolita y aspidolita. «Sericita» no es un nombre de especie. La clasificación detallada de las micas es la de Rieder et al. (1998).",en:"Dioctahedral true micas: muscovite, celadonite and paragonite; trioctahedral: annite, phlogopite, lepidolite and aspidolite. “Sericite” is not a species name. The detailed classification of micas is that of Rieder et al. (1998)."}},
 illita:{lam:"2:1",x:"0,6–0,85",grupo:DEF,oct:DI,inter:NOHID,nota:{es:"Bailey et al. (1984): no hinchable y con lámina 2:1 dioctaédrica; Rieder et al. (1998) la definen como nombre de serie. El material con un componente hinchable se llama «illítico». En el mismo subgrupo están la glauconita y la brammallita; la wonesita es la única trioctaédrica. «Hidromica» es un término obsoleto. Los índices de «cristalinidad» deben citarse por su autor (índice de Kübler).",en:"Bailey et al. (1984): non-swelling, with a dioctahedral 2:1 layer; Rieder et al. (1998) define it as a series name. Material with a swelling component is called “illitic”. Glauconite and brammallite belong to the same subgroup; wonesite is the only trioctahedral one. “Hydromica” is obsolete. “Crystallinity” indices should be named after their author (Kübler index)."}},
 glauconita:{lam:"2:1",x:"0,6–0,85",grupo:DEF,oct:DI,inter:NOHID,nota:{es:"Mica con déficit interlaminar dioctaédrica rica en Fe (Rieder et al., 1998). Si tiene componentes hinchables, el material se describe como «interestratificado al azar glauconita-esmectita».",en:"A dioctahedral, Fe-rich interlayer-deficient mica (Rieder et al., 1998). If it has swelling components, the material is described as a “randomly interstratified glauconite-smectite”."}},
 clorita:{lam:{es:"2:1 con capa de hidróxido interlaminar",en:"2:1 with interlayer hydroxide sheet"},x:VAR,grupo:CLO,oct:{es:"Trioctaédrico (también di-, di,tri-)",en:"Trioctahedral (also di-, di,tri-)"},inter:CAPAH,nota:{es:"Los antiguos términos «2:1:1» y «2:2» están en desuso. Las cloritas trioctaédricas se nombran por el catión divalente dominante: clinocloro (Mg), chamosita (Fe²⁺), nimita (Ni), pennantita (Mn) y baileycloro (Zn); no deben usarse otros nombres de especie. «Capa brucítica» es un uso inapropiado: dígase capa trioctaédrica.",en:"The old terms “2:1:1” and “2:2” are obsolete. Trioctahedral chlorites are named after the dominant divalent cation: clinochlore (Mg), chamosite (Fe²⁺), nimite (Ni), pennantite (Mn) and baileychlore (Zn); no other species names should be used. “Brucite sheet” is inappropriate: say trioctahedral sheet."}},
 sudoita:{lam:{es:"2:1 con capa de hidróxido interlaminar",en:"2:1 with interlayer hydroxide sheet"},x:VAR,grupo:CLO,oct:{es:"Di,trioctaédrico",en:"Di,trioctahedral"},inter:CAPAH,nota:{es:"Para nombrar el subgrupo se indica primero el carácter de la lámina 2:1 y después el de la interlámina. Cloritas di,trioctaédricas: sudoíta (pobre en Li, rica en Al y Mg) y cookeíta (rica en Li y Al). La única dioctaédrica es la donbassita. No se conocen cloritas tri,dioctaédricas.",en:"The subgroup name gives the character of the 2:1 layer first and then that of the interlayer. Di,trioctahedral chlorites: sudoite (Li-poor, Al- and Mg-rich) and cookeite (Li- and Al-rich). The only dioctahedral one is donbassite. No tri,dioctahedral chlorites are known."}},
 rectorita:{lam:"2:1",x:VAR,grupo:REG,oct:{es:"Dioctaédrico-dioctaédrico",en:"Dioctahedral-dioctahedral"},inter:ALT,nota:{es:"Mica dioctaédrica y esmectita dioctaédrica 1:1; no se exige precisar la especie de esmectita, y el catión de la interlámina de tipo mica puede indicarse con adjetivos (rica en Na, rica en K). «Allevardita» se usó en la literatura antigua, pero rectorita tiene prioridad. Si la alternancia no es bastante regular, se dice «de tipo rectorita».",en:"Dioctahedral mica and dioctahedral smectite, 1:1; the smectite species need not be specified, and the cation of the mica-like interlayer may be given with adjectives (Na-rich, K-rich). “Allevardite” was used in the older literature, but rectorite has priority. If the alternation is not regular enough, the term “rectorite-like” is used."}},
 corrensita:{lam:"2:1",x:VAR,grupo:REG,oct:{es:"Trioctaédrico-trioctaédrico",en:"Trioctahedral-trioctahedral"},inter:ALT,nota:{es:"Con esmectita trioctaédrica, «corrensita de baja carga»; con vermiculita trioctaédrica, «corrensita de alta carga» (Bailey, 1981). Los interestratificados con láminas imperfectas («clorita hinchable») no merecen nombre propio.",en:"With trioctahedral smectite, “low-charge corrensite”; with trioctahedral vermiculite, “high-charge corrensite” (Bailey, 1981). Interstratifications with imperfect layers (“swelling chlorite”) do not merit names."}},
 tosudita:{lam:"2:1",x:VAR,grupo:REG,oct:{es:"Dioctaédrico en promedio",en:"Dioctahedral on average"},inter:ALT,nota:{es:"Dioctaédrico en promedio: población octaédrica total entre 6,0 y 7,0 sobre O₂₀(OH)₁₀ y d(060) de 1,49 a 1,506 Å. Combinaciones posibles: clorita di,dioctaédrica (donbassita) con esmectita di- o trioctaédrica, y clorita di,trioctaédrica (sudoíta, cookeíta) con esmectita dioctaédrica.",en:"Dioctahedral on average: total octahedral population between 6.0 and 7.0 on the basis of O₂₀(OH)₁₀ and d(060) of 1.49–1.506 Å. Possible combinations: di,dioctahedral chlorite (donbassite) with di- or trioctahedral smectite, and di,trioctahedral chlorite (sudoite, cookeite) with dioctahedral smectite."}},
 aliettita:{lam:"2:1",x:VAR,grupo:REG,oct:{es:"Trioctaédrico-trioctaédrico",en:"Trioctahedral-trioctahedral"},inter:ALT,nota:{es:"Talco y esmectita trioctaédrica 1:1. Bailey (1981) recomendó decir «esmectita trioctaédrica» en lugar de «saponita» en la definición. Datos de referencia: d(001) 24,80 Å sin tratar, 27,10 Å con glicerol y 9,34 Å a 600 °C.",en:"Talc and trioctahedral smectite, 1:1. Bailey (1981) recommended “trioctahedral smectite” rather than “saponite” in the definition. Reference data: d(001) 24.80 Å untreated, 27.10 Å with glycerol and 9.34 Å at 600 °C."}},
 hidrobiotita:{lam:"2:1",x:VAR,grupo:REG,oct:{es:"Trioctaédrico-trioctaédrico",en:"Trioctahedral-trioctahedral"},inter:ALT,nota:{es:"Biotita y vermiculita 1:1 (Brindley et al., 1983). El prefijo «hidro-» no es adecuado para nombres de minerales de la arcilla, pero la hidrobiotita se mantiene por ser un nombre anterior.",en:"Biotite and vermiculite, 1:1 (Brindley et al., 1983). The prefix “hydro-” is not suitable for clay mineral names, but hydrobiotite is kept because it was named earlier."}},
 interestratificados:{lam:{es:"1:1 y 2:1",en:"1:1 and 2:1"},x:VAR,grupo:{es:"Interestratificados (regulares e irregulares)",en:"Interstratifications (regular and irregular)"},oct:{es:"Di- o trioctaédrico",en:"Di- or trioctahedral"},inter:VAR,nota:{es:"Solo reciben nombre de especie las alternancias regulares bien documentadas: al menos diez órdenes 00l de la superestructura y coeficiente de variación de los d(00l) menor de 0,75. Especies de la tabla 4 de la AIPEA: brinrobertsita (pirofilita-esmectita), aliettita (talco-esmectita), kulkeíta (talco-clorita), rectorita (mica-esmectita), hidrobiotita (biotita-vermiculita), corrensita de baja y de alta carga (clorita-esmectita, clorita-vermiculita), tosudita (clorita-esmectita, dioctaédrica en promedio) y dozyíta (serpentina-clorita, láminas 1:1 y 2:1). Los demás se describen por sus componentes, p. ej. «interestratificado irregular mica-esmectita». «Tarasovita» no es una especie válida. Se prefiere «interestratificado» a «capas mixtas».",en:"Only well-documented regular alternations receive species names: at least ten 00l orders of the superstructure and a coefficient of variation of the d(00l) values below 0.75. Species in AIPEA Table 4: brinrobertsite (pyrophyllite-smectite), aliettite (talc-smectite), kulkeite (talc-chlorite), rectorite (mica-smectite), hydrobiotite (biotite-vermiculite), low- and high-charge corrensite (chlorite-smectite, chlorite-vermiculite), tosudite (chlorite-smectite, dioctahedral on average) and dozyite (serpentine-chlorite, 1:1 and 2:1 layers). Others are described by their components, e.g. “mica-smectite irregular interstratification”. “Tarasovite” is not a valid species. “Interstratification” is preferred to “mixed layer”."}},
 sepiolita:{lam:MOD,x:"—",grupo:SP,oct:{es:"Capa octaédrica en listones (8 posiciones)",en:"Octahedral sheet in strips (8 sites)"},inter:{es:"Canales con agua zeolítica",en:"Channels with zeolitic water"},nota:{es:"Filosilicato modulado no plano: los vértices de los tetraedros apuntan alternativamente hacia uno y otro lado y la capa octaédrica es discontinua, en listones (tabla 3 de la AIPEA). Del mismo grupo son la loughlinita y la falcondoíta. «Hormita» y «palysepiola» son sinónimos no válidos.",en:"A modulated non-planar phyllosilicate: tetrahedral apices point alternately to one side and the other, and the octahedral sheet is discontinuous, in strips (AIPEA Table 3). Loughlinite and falcondoite belong to the same group. “Hormite” and “palysepiole” are invalid synonyms."}},
 palygorskita:{lam:MOD,x:"—",grupo:SP,oct:{es:"Capa octaédrica en listones (5 posiciones)",en:"Octahedral sheet in strips (5 sites)"},inter:{es:"Canales con agua zeolítica",en:"Channels with zeolitic water"},nota:{es:"Filosilicato modulado con listones más estrechos que la sepiolita. «Atapulgita» es un sinónimo desacreditado de palygorskita. La yofortierita es la especie análoga con Mn.",en:"A modulated phyllosilicate with narrower strips than sepiolite. “Attapulgite” is a discredited synonym of palygorskite. Yofortierite is the analogous Mn species."}}
 };
})();

/* Historias para el público general */
window.HISTORIAS = [
 {id:"sepiolita",img:["sepiolita",0],m:["sepiolita"],
  es:{n:"Madrid, capital mundial de la sepiolita",r:"Bajo la cuenca de Madrid está el mayor yacimiento de sepiolita del mundo.",
   t:["La sepiolita es una arcilla rara: hay muy pocos yacimientos explotables en el planeta. La mayor parte de la producción mundial sale de los depósitos sedimentarios de los alrededores de Madrid, en Vicálvaro y en La Sagra (Toledo).","Se formó en el Mioceno, hace más de diez millones de años, en lagos someros y salinos, ricos en magnesio, que ocupaban el centro de la península.","Sus fibras huecas absorben agua, olores y aceites. Por eso está en la arena para gatos, en absorbentes industriales, en piensos y en lodos de perforación. La de Turquía, más compacta, se talla desde hace siglos para hacer pipas de «espuma de mar»."]},
  en:{n:"Madrid, world capital of sepiolite",r:"Beneath the Madrid Basin lies the world’s largest sepiolite deposit.",
   t:["Sepiolite is a rare clay: there are very few workable deposits on the planet. Most of the world’s production comes from the sedimentary deposits around Madrid, at Vicálvaro and La Sagra (Toledo).","It formed in the Miocene, more than ten million years ago, in shallow, salty, magnesium-rich lakes in the centre of the peninsula.","Its hollow fibres absorb water, odours and oil. That is why it is in cat litter, industrial absorbents, animal feed and drilling muds. Turkish sepiolite, more compact, has been carved for centuries into “meerschaum” pipes."]}},
 {id:"azulmaya",img:["palygorskita",2],m:["palygorskita"],
  es:{n:"El secreto del azul maya",r:"Un pigmento que ha resistido más de mil años de selva tropical.",
   t:["Los mayas pintaron murales, cerámicas y esculturas con un azul turquesa que no se ha degradado con la luz, el calor ni la humedad.","Su secreto es una arcilla fibrosa, la palygorskita, mezclada con índigo, el colorante de una planta, y calentada. Las moléculas de índigo se alojan en la entrada de los canales de la fibra y quedan protegidas.","Hoy el azul maya inspira nuevos pigmentos híbridos, mitad arcilla y mitad molécula orgánica, muy estudiados también en España."]},
  en:{n:"The secret of Maya blue",r:"A pigment that has withstood more than a thousand years of tropical forest.",
   t:["The Maya painted murals, pottery and sculpture with a turquoise blue that has not faded with light, heat or humidity.","Its secret is a fibrous clay, palygorskite, mixed with indigo, a plant dye, and heated. The indigo molecules lodge at the mouths of the fibre’s channels and are protected.","Today Maya blue inspires new hybrid pigments, half clay and half organic molecule, also widely studied in Spain."]}},
 {id:"marte",img:["nontronita",0],m:["nontronita","saponita","montmorillonita"],
  es:{n:"Arcillas en Marte",r:"Las arcillas son la prueba de que en Marte hubo agua durante mucho tiempo.",
   t:["Las esmectitas solo se forman cuando el agua altera las rocas durante largo tiempo. Por eso los geólogos planetarios las buscan desde la órbita.","El rover Curiosity lleva un pequeño difractómetro de rayos X, CheMin, y ha encontrado esmectitas en lutitas de un antiguo lago del cráter Gale de unos 3600 millones de años.","Perseverance ha confirmado en el cráter Jezero arcillas esmectíticas ricas en hierro y magnesio junto a carbonatos, y ha guardado muestras para traerlas a la Tierra."]},
  en:{n:"Clays on Mars",r:"Clays prove that water persisted on Mars for a long time.",
   t:["Smectites only form when water alters rocks for a long time. That is why planetary geologists look for them from orbit.","The Curiosity rover carries a small X-ray diffractometer, CheMin, and has found smectites in mudstones from an ancient lake in Gale crater, about 3.6 billion years old.","Perseverance has confirmed iron- and magnesium-rich smectite clays alongside carbonates in Jezero crater, and has stored samples to be brought back to Earth."]}},
 {id:"vida",img:["montmorillonita",0],m:["montmorillonita"],
  es:{n:"¿Nació la vida sobre una arcilla?",r:"La montmorillonita ayuda a formar cadenas de ARN y vesículas en el laboratorio.",
   t:["Para que surgiera la vida, moléculas sencillas tuvieron que unirse en cadenas largas y quedar encerradas en compartimentos.","En el laboratorio, la superficie de la montmorillonita favorece la unión de nucleótidos en cadenas cortas de ARN y acelera la formación de vesículas de ácidos grasos, que pueden atrapar esas cadenas en su interior.","No sabemos cómo empezó la vida, pero las arcillas están entre los candidatos a haber sido su primer soporte."]},
  en:{n:"Did life begin on a clay?",r:"In the laboratory, montmorillonite helps form RNA chains and vesicles.",
   t:["For life to arise, simple molecules had to join into long chains and be enclosed in compartments.","In the laboratory, the montmorillonite surface helps nucleotides link into short RNA chains and speeds up the formation of fatty-acid vesicles, which can trap those chains inside.","We do not know how life began, but clays are among the candidates for its first support."]}},
 {id:"residuos",img:["montmorillonita",3],m:["montmorillonita"],
  es:{n:"Una barrera de arcilla para miles de años",r:"La bentonita compactada hincha, sella y retiene: por eso protege los residuos radiactivos.",
   t:["Los residuos radiactivos de alta actividad deben quedar aislados durante miles de años. Los diseños de almacenamiento profundo los rodean de bentonita compactada.","Al mojarse, la bentonita hincha, rellena las grietas, frena el agua y retiene muchos elementos en sus láminas.","En el experimento FEBEX, en el laboratorio subterráneo de Grimsel (Suiza), se ensayó a escala real durante casi veinte años una barrera de bentonita de Almería, con una participación destacada de investigadores españoles del CIEMAT."]},
  en:{n:"A clay barrier for thousands of years",r:"Compacted bentonite swells, seals and retains: that is why it protects radioactive waste.",
   t:["High-level radioactive waste must remain isolated for thousands of years. Deep repository designs surround it with compacted bentonite.","When wet, bentonite swells, fills cracks, slows water and holds many elements in its layers.","In the FEBEX experiment, at the Grimsel underground laboratory (Switzerland), a barrier of bentonite from Almería was tested at full scale for almost twenty years, with a leading role for Spanish researchers from CIEMAT."]}},
 {id:"casa",img:["caolinita",1],m:["caolinita","montmorillonita","sepiolita","hectorita"],
  es:{n:"Las arcillas de tu casa",r:"Las usas cada día sin saberlo.",
   t:["El papel de una revista brilla gracias al caolín. La taza del desayuno es caolín cocido. La pasta de dientes, el maquillaje y algunas cremas llevan arcillas que espesan o absorben.","El vino se clarifica con bentonita, la arena del gato es sepiolita o bentonita, y la pintura de las paredes no gotea gracias a arcillas espesantes.","Incluso algunos medicamentos contra la diarrea y protectores de estómago son arcillas."]},
  en:{n:"The clays in your home",r:"You use them every day without knowing.",
   t:["Magazine paper shines thanks to kaolin. Your breakfast mug is fired kaolin. Toothpaste, make-up and some creams contain clays that thicken or absorb.","Wine is fined with bentonite, cat litter is sepiolite or bentonite, and wall paint does not drip thanks to thickening clays.","Even some medicines for diarrhoea and stomach protectors are clays."]}}
];

/* Clasificación completa de la AIPEA (Guggenheim et al., 2006, tablas 2, 3 y 4), en la terminología del Glosario de la SEA.
   Cada especie: [nombre ES, nombre EN, id de ficha si existe]. */
(function(){
 function L2(es,en){ return {es:es,en:en}; }
 var TRI=L2("Trioctaédrico","Trioctahedral"), DI=L2("Dioctaédrico","Dioctahedral"), DT=L2("Di,trioctaédrico","Di,trioctahedral"), TD=L2("Tri,dioctaédrico","Tri,dioctahedral");
 window.CLASIF_PLANOS = [
  {lam:"1:1",inter:L2("Ninguno o solo H₂O (x ≈ 0)","None or H₂O only (x ≈ 0)"),g:L2("Serpentina-caolín","Serpentine-kaolin"),sp:[
    [TRI,[["lizardita","lizardite","lizardita"],["berthierina","berthierine","berthierina"],["amesita","amesite"],["cronstedtita","cronstedtite"],["nepouita","nepouite"],["kellyíta","kellyite"],["fraipontita","fraipontite"],["brindleyíta","brindleyite"]]],
    [DI,[["caolinita","kaolinite","caolinita"],["dickita","dickite","dickita"],["nacrita","nacrite","nacrita"],["halloysita (plana)","halloysite (planar)","halloysita"]]],
    [DT,[["odinita","odinite","odinita"]]]]},
  {lam:"2:1",inter:L2("Ninguno (x ≈ 0)","None (x ≈ 0)"),g:L2("Talco-pirofilita","Talc-pyrophyllite"),sp:[
    [TRI,[["talco","talc","talco"],["willemseíta","willemseite"],["kerolita","kerolite"],["pimelita","pimelite"]]],
    [DI,[["pirofilita","pyrophyllite","pirofilita"],["ferripirofilita","ferripyrophyllite"]]]]},
  {lam:"2:1",inter:L2("Cationes de cambio hidratados (x ≈ 0,2–0,6)","Hydrated exchangeable cations (x ≈ 0.2–0.6)"),g:L2("Esmectita","Smectite"),sp:[
    [TRI,[["saponita","saponite","saponita"],["hectorita","hectorite","hectorita"],["sauconita","sauconite"],["estevensita","stevensite","estevensita"],["swinefordita","swinefordite"]]],
    [DI,[["montmorillonita","montmorillonite","montmorillonita"],["beidellita","beidellite","beidellita"],["nontronita","nontronite","nontronita"],["volkonskoíta","volkonskoite"]]]]},
  {lam:"2:1",inter:L2("Cationes de cambio hidratados (x ≈ 0,6–0,9)","Hydrated exchangeable cations (x ≈ 0.6–0.9)"),g:L2("Vermiculita","Vermiculite"),sp:[
    [TRI,[["vermiculita trioctaédrica","trioctahedral vermiculite","vermiculita"]]],
    [DI,[["vermiculita dioctaédrica","dioctahedral vermiculite"]]]]},
  {lam:"2:1",inter:L2("Cationes monovalentes no hidratados (≥ 50 % monovalentes; x ≈ 0,85–1,0 en las dioctaédricas)","Non-hydrated monovalent cations (≥ 50% monovalent; x ≈ 0.85–1.0 for dioctahedral)"),g:L2("Mica verdadera (flexible)","True (flexible) mica"),sp:[
    [TRI,[["annita","annite"],["flogopita","phlogopite"],["lepidolita","lepidolite"],["aspidolita","aspidolite"]]],
    [DI,[["moscovita","muscovite","moscovita"],["celadonita","celadonite"],["paragonita","paragonite"]]]]},
  {lam:"2:1",inter:L2("Cationes mono- o divalentes no hidratados (x ≈ 0,6–0,85)","Non-hydrated mono- or divalent cations (x ≈ 0.6–0.85)"),g:L2("Mica con déficit interlaminar","Interlayer-deficient mica"),sp:[
    [TRI,[["wonesita (carga que puede ser < 0,6, excepción)","wonesite (charge may be < 0.6, an exception)"]]],
    [DI,[["illita","illite","illita"],["glauconita","glauconite","glauconita"],["brammallita","brammallite"]]]]},
  {lam:"2:1",inter:L2("Cationes divalentes no hidratados (≥ 50 % divalentes; x ≈ 1,8–2,0)","Non-hydrated divalent cations (≥ 50% divalent; x ≈ 1.8–2.0)"),g:L2("Mica frágil","Brittle mica"),sp:[
    [TRI,[["clintonita","clintonite"],["kinoshitalita","kinoshitalite"],["bityíta","bityite"],["anandita","anandite"]]],
    [DI,[["margarita","margarite"],["chernykhita","chernykhite"]]]]},
  {lam:"2:1",inter:L2("Capa de hidróxido (x variable)","Hydroxide sheet (x variable)"),g:L2("Clorita","Chlorite"),sp:[
    [TRI,[["clinocloro","clinochlore","clorita"],["chamosita","chamosite","clorita"],["pennantita","pennantite"],["nimita","nimite"],["baileycloro","baileychlore"]]],
    [DI,[["donbassita","donbassite"]]],
    [DT,[["cookeíta","cookeite"],["sudoíta","sudoite","sudoita"]]],
    [TD,[["ninguna conocida","none known"]]]]},
  {lam:"2:1",inter:L2("Interestratificado regular (x variable)","Regularly interstratified (x variable)"),g:L2("Variable","Variable"),sp:[
    [TRI,[["corrensita","corrensite","corrensita"],["aliettita","aliettite","aliettita"],["hidrobiotita","hydrobiotite","hidrobiotita"],["kulkeíta","kulkeite"]]],
    [DI,[["rectorita","rectorite","rectorita"],["tosudita","tosudite","tosudita"],["brinrobertsita","brinrobertsite"]]]]},
  {lam:"1:1 y 2:1",lamen:"1:1 and 2:1",inter:L2("Interestratificado regular (x variable)","Regularly interstratified (x variable)"),g:L2("Variable","Variable"),sp:[
    [TRI,[["dozyíta","dozyite"]]]]}
 ];
 window.CLASIF_NOPLANOS = [
  {lam:"1:1",tipo:L2("Modulada: capa tetraédrica en bandas (7 Å)","Modulated: tetrahedral sheet in strips (7 Å)"),af:L2("Serpentina","Serpentine"),sp:[["antigorita","antigorite","antigorita"],["bementita","bementite"]]},
  {lam:"1:1",tipo:L2("Modulada: capa tetraédrica en islas (7 Å)","Modulated: tetrahedral sheet in islands (7 Å)"),af:L2("Serpentina","Serpentine"),sp:[["greenalita","greenalite"],["cariopilita","caryopilite"],["pirosmalitas, friedelita y otras","pyrosmalites, friedelite and others"]]},
  {lam:"2:1",tipo:L2("Modulada: capa tetraédrica en bandas (9,5 y 12,5 Å)","Modulated: tetrahedral sheet in strips (9.5 and 12.5 Å)"),af:L2("Talco; mica","Talc; mica"),sp:[["minnesotaíta","minnesotaite"],["ganofilita","ganophyllite"],["eggletonita","eggletonite"]]},
  {lam:"2:1",tipo:L2("Modulada: capa tetraédrica en islas (9,6–12,5 Å) y otras","Modulated: tetrahedral sheet in islands (9.6–12.5 Å) and others"),af:L2("Mica o compleja (islas); ninguna (bannisterita); clorita (gonyerita)","Mica or complex (islands); none (bannisterite); chlorite (gonyerite)"),sp:[["estilpnomelana","stilpnomelane"],["zussmanita","zussmanite"],["parsettensita","parsettensite"],["bannisterita","bannisterite"],["gonyerita","gonyerite"]]},
  {lam:"2:1",tipo:L2("Modulada: capa octaédrica en listones (12,7–13,4 Å)","Modulated: octahedral sheet in strips (12.7–13.4 Å)"),af:L2("Piribol","Pyribole"),sp:[["sepiolita","sepiolite","sepiolita"],["loughlinita","loughlinite"],["falcondoíta","falcondoite"],["palygorskita","palygorskite","palygorskita"],["yofortierita","yofortierite"]]},
  {lam:"1:1",tipo:L2("Enrollada o esferoidal","Rolled or spheroidal"),af:L2("Serpentina; caolín","Serpentine; kaolin"),sp:[["crisotilo","chrysotile","crisotilo"],["pecoraíta","pecoraite"],["halloysita (no plana)","halloysite (non-planar)","halloysita"]]}
 ];
})();
