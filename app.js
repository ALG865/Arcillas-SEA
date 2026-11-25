/* Sociedad Española de Arcillas · web */
(function(){
"use strict";
var lang="es";
try{ var g=localStorage.getItem("sea-lang"); if(g==="en"||g==="es") lang=g; }catch(e){}
if(/[?&]lang=en/.test(location.search)) lang="en";
if(/[?&]lang=es/.test(location.search)) lang="es";

/* ---------------- textos de la interfaz ---------------- */
var UI={
es:{
 sea:"Sociedad Española de Arcillas", corto:"SEA", arcillas:"Las arcillas", sociedad:"La Sociedad", hazte:"Hazte socio", menu:"Menú", cerrar:"Cerrar", inicio:"Inicio",
 nav:{ arcillas:[["que-es","¿Qué es una arcilla?"],["minerales","Minerales"],["estructura","Estructura en 3D"],["propiedades","Propiedades"],["modificadas","Arcillas modificadas"],["aplicaciones","Aplicaciones"],["yacimientos","Yacimientos"],["geologia","Las arcillas y la geología"],["estudio","Cómo se estudian"],["evolucion","Historia de su estudio"],["afines","Materiales afines"],["aprende","Aprende con arcillas"],["cuestionario","¿Cuánto sabes de arcillas?"]],
   sociedad:[["noticias","Noticias y convocatorias"],["sociedad","Quiénes somos"],["junta","Junta directiva"],["premios","Premios y ayudas"],["reuniones","Reuniones científicas"],["publicaciones","Publicaciones"],["glosario","Glosario"],["semblanzas","Semblanzas"],["estatutos","Estatutos"],["pubsocios","Publicaciones científicas recientes de los socios"],["fotos","Galería fotográfica"],["centros","Dónde se investiga"]] },
 heroeT:"Arcillas: pequeñas partículas, grandes respuestas", heroeE:"Están en el suelo que nos alimenta, en los medicamentos, en los materiales del futuro y en la memoria geológica de la Tierra y de Marte. Desempeñan un papel clave en la ciencia, la industria y la geología: estudiarlas es entender el planeta y transformar el mundo en que vivimos.",
 explorar:"Explorar las arcillas", conocer:"Conocer la SEA",
 lamTit:"Una lámina, dos capas", lamTxt:"Casi todos los minerales de la arcilla están hechos de dos piezas: una capa de tetraedros de silicio y oxígeno, en azul, y una capa de octaedros de aluminio o magnesio, en verde. Según cómo se apilan y qué queda entre las láminas, hinchan, intercambian cationes o se convierten en fibras.", girar:"Arrastra para girar el modelo", verEstructura:"Construir una lámina",
 histTit:"Historias de arcilla", histE:"Del centro de la península a Marte, pasando por los murales mayas.",
 indiceTit:"Explorar", indice:{ evolucion:"De la cerámica a la nanociencia: técnicas y descubrimientos", geologia:"Paleoclima, diagénesis, datación, fallas, suelos y Marte", modificadas:"Organoarcillas, pilareadas, activadas, híbridos y geopolímeros", afines:"Arcillas aniónicas (LDH) y zeolitas", "que-es":"Arcilla como tamaño y como mineral", estructura:"Modelos 3D de las láminas", minerales:"Clasificación de la AIPEA y fichas de cada mineral", propiedades:"Intercambio, hinchamiento y superficie", aplicaciones:"De la porcelana a las barreras de residuos", yacimientos:"España y el mundo", estudio:"Difracción de rayos X, infrarrojo, análisis térmico y microscopía", aprende:"Experimentos sencillos para casa y para clase" },
 convTit:"Convocatorias y citas", plazo:"Plazo hasta el", verBases:"Ver las bases",
 clayTit:"CLAY 2027 en Madrid", clayTxt:"La conferencia internacional de arcillas de la AIPEA se celebra en Madrid del 20 al 26 de junio de 2027, organizada con la SEA.", clayWeb:"Web del congreso",
 galTit:"Galería", galE:"Imágenes de microscopio electrónico cedidas por socios de la SEA y del archivo «Images of Clay».", verGaleria:"Ver toda la galería",
 sobreSEA:"La Sociedad Española de Arcillas reúne desde 1969 a quienes investigan, enseñan y trabajan con arcillas en España.",
 imagen:"Imagen", ioc:"Archivo «Images of Clay» (Mineralogical Society y The Clay Minerals Society)", seaArch:"Archivo de imágenes de la Sociedad Española de Arcillas",
 todos:"Todos", fuentes:{sea:"Archivo de la SEA",ioc:"Images of Clay",libre:"Otras fuentes con licencia libre"},
 ficha:{formula:"Fórmula ideal",comp:"Composición",d:"Espaciado basal",cic:"Capacidad de intercambio catiónico",se:"Superficie específica",hinch:"Hinchamiento",plast:"Plasticidad",micro:"Al microscopio electrónico",mano:"Muestras de mano",espana:"En España",estructura:"Su lámina",verMapa:"Ver en el mapa",modelo:"Modelo 3D"},
 esp:{tit:"Datos de interés",lam:"Tipo de lámina",x:"Carga de la lámina (x, por fórmula unidad)",grupo:"Grupo",oct:"Carácter octaédrico",inter:"Material interlaminar",fuente:"Clasificación del Comité de Nomenclatura de la AIPEA (Guggenheim et al., 2006, Clays and Clay Minerals 54, 761–772)."},
 niveles:["nulo","bajo","medio","alto","muy alto"], nivelesF:["nula","baja","media","alta","muy alta"], cicU:"meq/100 g", seU:"m²/g",
 colIACT:"Colección del IACT", colPriv:"Colección privada",
 tablaCols:["<span class=\"solo-lector\">Imagen</span>","Mineral","Espaciado basal","En pocas palabras"],
 queE:"La palabra «arcilla» tiene dos significados, y conviene no confundirlos.",
 tam:"Arcilla como tamaño", tamT:"En sedimentología, según la escala granulométrica de Wentworth, la fracción arcilla está formada por las partículas menores de 1/256 mm (unos 4 µm); en edafología y en el estudio de los minerales de la arcilla se toma como límite 2 µm. Es un criterio de tamaño, no de composición: en esa fracción puede haber cuarzo, feldespatos, carbonatos u óxidos, y a su vez los minerales de la arcilla pueden formar partículas mayores.",
 min:"Arcilla como mineral", minT:"<p>Según la AIPEA y la Clay Minerals Society (<a href='https://doi.org/10.1346/CCMN.1995.0430213' target='_blank' rel='noopener'>Guggenheim y Martin, 1995</a>, definición vigente, recogida en el <a href='https://doi.org/10.1346/CCMN.2006.0540610' target='_blank' rel='noopener'>resumen de recomendaciones de 2006</a>), los minerales de la arcilla son los filosilicatos, y otros minerales, que dan plasticidad a la arcilla y se endurecen al secarse o cocerse, sea cual sea su tamaño u origen. Su estructura combina capas de tetraedros de silicio (T) y de octaedros de aluminio, magnesio o hierro (O), unidas en láminas 1:1, como en la caolinita, o 2:1, como en el talco, las esmectitas, la illita, las vermiculitas o las cloritas. Las sustituciones de unos cationes por otros crean una carga laminar negativa, compensada por cationes, agua o hidróxidos en el espacio interlaminar; esa carga y el tipo de lámina definen los grupos de la clasificación de la AIPEA.</p>",
 def:"La AIPEA y la Clay Minerals Society definen la arcilla como un material natural formado sobre todo por minerales de grano fino, generalmente plástico con la cantidad adecuada de agua, que se endurece al secarse o cocerse.",
 escTit:"Del grano de arena a la partícula de arcilla", escE:"Mueve el control para cambiar el tamaño de la partícula.", clases:["Arena","Limo","Arcilla"],
 analog:"Si una partícula de arcilla de 2 µm fuera un grano de arroz de 5 mm, esta partícula mediría",
 estE:"Gira los modelos y cambia de mineral para ver cómo se ordenan tetraedros y octaedros en cada lámina.",
 m3dTit:"Modelos en 3D", m3dNota:"Modelos idealizados con poliedros regulares (Si–O 1,62 Å; O–O 3,05 Å); no son estructuras refinadas. Los iones y las moléculas de agua no están a escala y su número es orientativo; los espaciados son valores típicos.", perfil:"De perfil", planta:"En planta", oblicua:"Oblicua",
 nombres3d:{caolinita:"Caolinita",talco:"Talco",pirofilita:"Pirofilita",illita:"Illita",montmorillonita:"Montmorillonita",vermiculita:"Vermiculita",clorita:"Clorita",sepiolita:"Sepiolita",palygorskita:"Palygorskita",pilareada:"Arcilla pilareada",organoarcilla:"Organoarcilla",ldh:"LDH (hidrotalcita)"},
 conTit:"Construye una lámina", conE:"Pulsa T y O para montar la lámina y elige qué hay entre las láminas.",
 paso1:"1. Monta la lámina", paso2:"2. ¿Qué hay entre las láminas?", paso3:"3. Capa octaédrica", borrar:"Borrar", fibras:"Cintas invertidas (fibrosas)",
 di:"Dioctaédrica: 2 de cada 3 huecos", tri:"Trioctaédrica: 3 de 3",
 inter:{nada:"Nada",H:"Nada: puentes de hidrógeno",aguaH:"Una capa de agua",K:"Potasio (K⁺)",agua:"Cationes con agua (carga baja)",Mg:"Mg²⁺ con dos capas de agua (carga alta)",hidroxido:"Una capa de hidróxido"},
 empieza:"Empieza pulsando T.", sig1:"Ahora añade una capa O.", sig2:"Tienes una lámina 1:1. Puedes añadir otra T para hacer una 2:1.", completa:"Lámina 2:1 completa.", noValida:"Esa combinación no forma un mineral de la arcilla. Prueba T, luego O y luego T.",
 hincha:"Hincha con agua", nohincha:"No hincha", hinchaPoco:"Hincha poco", carga:"Carga de la lámina", verFicha:"Ver la ficha",
 ley:{T:"Tetraedros SiO₄",TAl:"Tetraedros de Si, con algo de Al",O:"Octaedros de Al o Mg",vac:"Posición octaédrica vacante",K:"K⁺ no hidratado",NaK:"Na⁺ o K⁺ no hidratados",cat:"Catión de cambio hidratado",agua:"Agua",hid:"Capa de hidróxido",Mg:"Mg²⁺ hidratado",H:"Enlaces de hidrógeno entre láminas",pilar:"Pilares de óxido de aluminio",N:"Cabeza de amonio (N)",Cc:"Cadena de carbono",an:"Anión interlaminar (CO₃²⁻, Cl⁻…)",Oldh:"Octaedros de Mg y Al (carga positiva)"},
 sepi:"Sepiolita", pali:"Palygorskita", canal:"Canales con agua a lo largo de la fibra",
 propE:"Toca una propiedad para comparar. Son rangos típicos aproximados: cambian mucho de una muestra a otra.",
 props:{cic:"Intercambio catiónico",se:"Superficie específica",hinch:"Hinchamiento",plast:"Plasticidad"},
 propTxt:{cic:"Cuántos cationes puede intercambiar la arcilla con el agua que la rodea, en miliequivalentes por 100 g. Depende de la carga de la lámina y de si los cationes son accesibles.",se:"Superficie de un gramo de arcilla. En las esmectitas cuenta también la superficie entre láminas: un gramo puede tener la superficie de una pista de tenis grande.",hinch:"Cuánto aumenta de volumen al mojarse. Solo hinchan de verdad las esmectitas, sobre todo las sódicas, porque el agua entra entre sus láminas.",plast:"Capacidad de moldearse mojada sin romperse y de mantener la forma. De ella vive la alfarería."},
 aguaTit:"¿Qué pasa al añadir agua?", echarAgua:"Añadir agua", secar:"Secar",
 aplE:"Las arcillas están en muchos objetos de casa, en la industria y en el patrimonio.", aportT:"Trabajos pioneros y otros altamente citados de socios de la SEA", otrasT:"Otras contribuciones españolas destacadas", otrasI:"Trabajos de grupos españoles con más de 200 citas en la bibliografía internacional.", aportI:"En las últimas décadas, numerosos socios de la SEA, actuales o anteriores, han firmado trabajos de referencia en estas aplicaciones. Bajo cada una se recogen algunos de sus trabajos pioneros en su campo o altamente citados en la bibliografía internacional.", minerales:"Minerales",
 yacE:"Principales yacimientos de minerales de la arcilla en España. Toca un punto.", leyMapa:{fibrosa:"Sepiolita y palygorskita",bentonita:"Bentonita (esmectitas)",caolin:"Caolín",pasado:"Explotado en el pasado"}, mundo:"En el mundo", hoy:"En explotación", pasado:"Explotado en el pasado",
 estuE:"Las partículas son demasiado pequeñas para el microscopio óptico. Se identifican con rayos X y se observan con microscopios electrónicos.",
 drxTit:"Difracción de rayos X: los tres tratamientos", drxE:"Elige un mineral y compara el agregado orientado seco al aire, tras etilenglicol y tras calentar a 550 °C. Pasa el dedo o el ratón por el gráfico para leer el espaciado.",
 AO:"Seco al aire", EG:"Etilenglicol", C:"550 °C", mezcla:"Mezcla", grados:"°2θ (Cu Kα)", tecnicas:"Otras técnicas",
 marte:"El rover Curiosity lleva un difractómetro de rayos X, CheMin, con el que ha identificado esmectitas en Marte.",
 galPag:"Imágenes de microscopio electrónico. Toca una imagen para verla grande.",
 jE:"Ocho preguntas sobre lo que has visto.", empezar:"Empezar", otra:"Jugar otra vez", sig:"Siguiente", pregImg:"¿Qué mineral aparece en esta imagen de microscopio?", bien:"¡Correcto!", mal:"No: es ", fin:"Has acertado {n} de {t}.",
 socE:"La Sociedad Española de Arcillas reúne desde 1969 a quienes investigan, enseñan y trabajan con arcillas en España.",
 fines:"Fines", campos:"Campos de actividad", enRed:"En red", hist:"Historia", hitos:"Hitos", sede:"Sede", contacto:"Contacto",
 juntaE:"Junta directiva de la Sociedad Española de Arcillas.", relInt:"Relaciones internacionales",
 premiosE:"La SEA impulsa a quienes empiezan a investigar en arcillas con premios y ayudas.", abierto:"Convocatoria abierta", ultima:"Última convocatoria", distinciones:"Socios de la SEA con distinciones internacionales", honor:"Socios de honor",
 reunE:"La SEA organiza reuniones científicas nacionales y ha llevado a España algunos de los grandes congresos internacionales de arcillas.", nac:"Reuniones y jornadas de la SEA", int:"Congresos internacionales organizados o apoyados por la SEA",
 pubE:"Glosario, libros de resúmenes, guías de campo e informes de actividad.", glosarioPub:"Glosario", resumenes:"Libros de resúmenes", libros:"Libros y conferencias", cursos:"Cursos y seminarios", guias:"Guías de campo y simposios", actividades:"Informes de actividad (en inglés)", interlab:"Análisis interlaboratorio",
 gloE:"Términos de las arcillas y los minerales de la arcilla, del Glosario SEA (2023), traducción y adaptación del glosario de la Clay Minerals Society coordinada por Manuel Pozo Rodríguez.", buscar:"Buscar un término", sinRes:"No hay términos que coincidan. Prueba con otra palabra.", gloPdf:"Descargar el glosario completo (PDF)", gloPend:"El glosario se está incorporando. Mientras tanto puedes descargarlo en PDF.",
 sembE:"Personas que construyeron la ciencia de las arcillas en España y fuera de ella.",
 socioTit:"Hazte socio", socioE:"Pueden asociarse investigadores, docentes, estudiantes, empresas e instituciones interesados en las arcillas.", socioPasos:["Descarga la ficha de inscripción.","Rellénala y envíala a la secretaría de la SEA.","La junta directiva te dará la bienvenida."], fichaWord:"Ficha en Word", fichaPdf:"Ficha en PDF",
 estatutosE:"Estatutos de la Sociedad Española de Arcillas.",
 pie:"Funciona sin conexión una vez cargada.", creditos:"Créditos",
 credT:"Imágenes de microscopio: archivo de imágenes de la SEA (cedidas por sus autores) y «Images of Clay» de la Mineralogical Society y The Clay Minerals Society. Muestras de mano: IACT, colecciones privadas y Wikimedia Commons. Tipografía Instrument Sans (SIL Open Font License).",
 otrasHist:"Otras historias", notE:"Noticias de la Sociedad, convocatorias de premios y ayudas y próximas citas.", tipos:{noticia:"Noticia",convocatoria:"Convocatoria",evento:"Cita"}, abiertaHasta:"Abierta hasta el", cerrada:"Cerrada", masInfo:"Más información", accJunta:"Acceso para la Junta Directiva", leerMas:"Leer más", verDoc:"Descargar documento (PDF)", volverNot:"Volver a las noticias", verNoticias:"Ver todas las noticias", proximas:"Abiertas y próximas", anteriores:"Anteriores"
},
en:{
 sea:"Spanish Clay Society", corto:"SEA", arcillas:"Clays", sociedad:"The Society", hazte:"Join", menu:"Menu", cerrar:"Close", inicio:"Home",
 nav:{ arcillas:[["que-es","What is clay?"],["minerales","Minerals"],["estructura","Structure in 3D"],["propiedades","Properties"],["modificadas","Modified clays"],["aplicaciones","Uses"],["yacimientos","Deposits"],["geologia","Clays and geology"],["estudio","How we study them"],["evolucion","History of clay science"],["afines","Related materials"],["aprende","Learn with clays"],["cuestionario","How much do you know about clays?"]],
   sociedad:[["noticias","News and calls"],["sociedad","About us"],["junta","Board"],["premios","Awards and grants"],["reuniones","Scientific meetings"],["publicaciones","Publications"],["glosario","Glossary"],["semblanzas","Profiles"],["estatutos","Statutes"],["pubsocios","Recent scientific publications by members"],["fotos","Photo gallery"],["centros","Where clays are studied"]] },
 heroeT:"Clays: tiny particles, big answers", heroeE:"They are in the soil that feeds us, in medicines, in the materials of the future and in the geological memory of Earth and Mars. They play a key role in science, industry and geology: studying them means understanding the planet and transforming the world we live in.",
 explorar:"Explore clays", conocer:"About the SEA",
 lamTit:"One layer, two sheets", lamTxt:"Almost every clay mineral is built from two pieces: a sheet of silicon–oxygen tetrahedra, in blue, and a sheet of aluminium or magnesium octahedra, in green. How they stack, and what sits between the layers, decides whether they swell, exchange cations or become fibres.", girar:"Drag to rotate the model", verEstructura:"Build a layer",
 histTit:"Clay stories", histE:"From the heart of Spain to Mars, by way of Maya murals.",
 indiceTit:"Explore", indice:{ evolucion:"From pottery to nanoscience: techniques and discoveries", geologia:"Palaeoclimate, diagenesis, dating, faults, soils and Mars", modificadas:"Organoclays, pillared, activated, hybrids and geopolymers", afines:"Anionic clays (LDH) and zeolites", "que-es":"Clay as a size and as a mineral", estructura:"3D models of the layers", minerales:"AIPEA classification and mineral cards", propiedades:"Exchange, swelling and surface", aplicaciones:"From porcelain to waste barriers", yacimientos:"Spain and the world", estudio:"X-ray diffraction, infrared, thermal analysis and microscopy", aprende:"Simple experiments for home and the classroom" },
 convTit:"Calls and events", plazo:"Deadline", verBases:"Read the rules",
 clayTit:"CLAY 2027 in Madrid", clayTxt:"AIPEA’s International Clay Conference takes place in Madrid on 20–26 June 2027, organised with the SEA.", clayWeb:"Conference website",
 galTit:"Gallery", galE:"Electron microscope images contributed by SEA members and from the “Images of Clay” archive.", verGaleria:"See the whole gallery",
 sobreSEA:"Since 1969 the Spanish Clay Society has brought together those who research, teach and work with clays in Spain.",
 imagen:"Image", ioc:"“Images of Clay” archive (Mineralogical Society and The Clay Minerals Society)", seaArch:"Image archive of the Spanish Clay Society",
 todos:"All", fuentes:{sea:"SEA archive",ioc:"Images of Clay",libre:"Other openly licensed sources"},
 ficha:{formula:"Ideal formula",comp:"Composition",d:"Basal spacing",cic:"Cation exchange capacity",se:"Specific surface area",hinch:"Swelling",plast:"Plasticity",micro:"Under the electron microscope",mano:"Hand specimens",espana:"In Spain",estructura:"Its layer",verMapa:"See on the map",modelo:"3D model"},
 esp:{tit:"Key facts",lam:"Layer type",x:"Layer charge (x, per formula unit)",grupo:"Group",oct:"Octahedral character",inter:"Interlayer material",fuente:"Classification of the AIPEA Nomenclature Committee (Guggenheim et al., 2006, Clays and Clay Minerals 54, 761–772)."},
 niveles:["none","low","medium","high","very high"], nivelesF:["none","low","medium","high","very high"], cicU:"meq/100 g", seU:"m²/g",
 colIACT:"IACT collection", colPriv:"Private collection",
 tablaCols:["<span class=\"solo-lector\">Image</span>","Mineral","Basal spacing","In a few words"],
 queE:"The word “clay” has two meanings, and it helps not to mix them up.",
 tam:"Clay as a size", tamT:"In sedimentology, on the Wentworth grain-size scale, the clay fraction is made of particles smaller than 1/256 mm (about 4 µm); soil science and clay mineralogy use a 2 µm limit. It is a size criterion, not a compositional one: the fraction may contain quartz, feldspars, carbonates or oxides, and clay minerals may in turn form larger particles.",
 min:"Clay as a mineral", minT:"<p>According to AIPEA and the Clay Minerals Society (<a href='https://doi.org/10.1346/CCMN.1995.0430213' target='_blank' rel='noopener'>Guggenheim and Martin, 1995</a>, the current definition, restated in the <a href='https://doi.org/10.1346/CCMN.2006.0540610' target='_blank' rel='noopener'>2006 summary of recommendations</a>), clay minerals are phyllosilicates, and other minerals, that make clay plastic and harden on drying or firing, whatever their size or origin. Their structure combines sheets of silicon tetrahedra (T) and of aluminium, magnesium or iron octahedra (O), joined in 1:1 layers, as in kaolinite, or 2:1 layers, as in talc, smectites, illite, vermiculites or chlorites. Substitutions of one cation for another create a negative layer charge, balanced by cations, water or hydroxides in the interlayer space; that charge and the layer type define the groups of the AIPEA classification.</p>",
 def:"AIPEA and the Clay Minerals Society define clay as a naturally occurring material composed mainly of fine-grained minerals, generally plastic at appropriate water contents, which hardens when dried or fired.",
 escTit:"From a sand grain to a clay particle", escE:"Move the slider to change the particle size.", clases:["Sand","Silt","Clay"],
 analog:"If a 2 µm clay particle were a 5 mm grain of rice, this particle would measure",
 estE:"Rotate the models and switch minerals to see how tetrahedra and octahedra are arranged in each layer.",
 m3dTit:"3D models", m3dNota:"Idealised models built with regular polyhedra (Si–O 1.62 Å; O–O 3.05 Å); not refined structures. Ions and water molecules are not to scale and their number is only indicative; spacings are typical values.", perfil:"Side view", planta:"Top view", oblicua:"Oblique",
 nombres3d:{caolinita:"Kaolinite",talco:"Talc",pirofilita:"Pyrophyllite",illita:"Illite",montmorillonita:"Montmorillonite",vermiculita:"Vermiculite",clorita:"Chlorite",sepiolita:"Sepiolite",palygorskita:"Palygorskite",pilareada:"Pillared clay",organoarcilla:"Organoclay",ldh:"LDH (hydrotalcite)"},
 conTit:"Build a layer", conE:"Tap T and O to build the layer and choose what sits between layers.",
 paso1:"1. Build the layer", paso2:"2. What is between the layers?", paso3:"3. Octahedral sheet", borrar:"Clear", fibras:"Inverted ribbons (fibrous)",
 di:"Dioctahedral: 2 of every 3 sites", tri:"Trioctahedral: 3 of 3",
 inter:{nada:"Nothing",H:"Nothing: hydrogen bonds",aguaH:"One layer of water",K:"Potassium (K⁺)",agua:"Cations with water (low charge)",Mg:"Mg²⁺ with two water layers (high charge)",hidroxido:"A hydroxide sheet"},
 empieza:"Start by tapping T.", sig1:"Now add an O sheet.", sig2:"You have a 1:1 layer. Add another T to make a 2:1 layer.", completa:"2:1 layer complete.", noValida:"That combination does not make a clay mineral. Try T, then O, then T.",
 hincha:"Swells with water", nohincha:"Does not swell", hinchaPoco:"Swells a little", carga:"Layer charge", verFicha:"See the card",
 ley:{T:"SiO₄ tetrahedra",TAl:"Si tetrahedra, with some Al",O:"Al or Mg octahedra",vac:"Vacant octahedral site",K:"Non-hydrated K⁺",NaK:"Non-hydrated Na⁺ or K⁺",cat:"Hydrated exchangeable cation",agua:"Water",hid:"Hydroxide sheet",Mg:"Hydrated Mg²⁺",H:"Hydrogen bonds between layers",pilar:"Aluminium oxide pillars",N:"Ammonium head (N)",Cc:"Carbon chain",an:"Interlayer anion (CO₃²⁻, Cl⁻…)",Oldh:"Mg and Al octahedra (positive charge)"},
 sepi:"Sepiolite", pali:"Palygorskite", canal:"Water-filled channels along the fibre",
 propE:"Tap a property to compare. These are approximate typical ranges: they vary a lot from one sample to another.",
 props:{cic:"Cation exchange",se:"Specific surface",hinch:"Swelling",plast:"Plasticity"},
 propTxt:{cic:"How many cations the clay can swap with the surrounding water, in milliequivalents per 100 g. It depends on the layer charge and on whether the cations can be reached.",se:"The surface area of one gram of clay. In smectites the surface between layers counts too: one gram can have the area of a large tennis court.",hinch:"How much its volume grows when wet. Only smectites really swell, especially sodium ones, because water enters between their layers.",plast:"The ability to be shaped when wet without breaking and to keep that shape. Pottery depends on it."},
 aguaTit:"What happens when water is added?", echarAgua:"Add water", secar:"Dry",
 aplE:"Clays are in many things at home, in industry and in our heritage.", aportT:"Pioneering and other highly cited papers by SEA members", otrasT:"Other notable Spanish contributions", otrasI:"Papers by Spanish groups with more than 200 citations in the international literature.", aportI:"In recent decades, many current and former SEA members have authored reference works in these applications. Each one lists some of their pioneering or highly cited papers in the international literature.", minerales:"Minerals",
 yacE:"Main clay-mineral deposits in Spain. Tap a point.", leyMapa:{fibrosa:"Sepiolite and palygorskite",bentonita:"Bentonite (smectites)",caolin:"Kaolin",pasado:"Mined in the past"}, mundo:"Around the world", hoy:"Mined today", pasado:"Mined in the past",
 estuE:"The particles are too small for a light microscope. They are identified with X-rays and observed with electron microscopes.",
 drxTit:"X-ray diffraction: the three treatments", drxE:"Choose a mineral and compare the oriented aggregate air-dried, after ethylene glycol and after heating to 550 °C. Move your finger or mouse over the plot to read the spacing.",
 AO:"Air-dried", EG:"Ethylene glycol", C:"550 °C", mezcla:"Mixture", grados:"°2θ (Cu Kα)", tecnicas:"Other techniques",
 marte:"The Curiosity rover carries an X-ray diffractometer, CheMin, with which it has identified smectites on Mars.",
 galPag:"Electron microscope images. Tap an image to see it full size.",
 jE:"Eight questions about what you have seen.", empezar:"Start", otra:"Play again", sig:"Next", pregImg:"Which mineral is shown in this microscope image?", bien:"Correct!", mal:"No: it is ", fin:"You got {n} out of {t}.",
 socE:"Since 1969 the Spanish Clay Society has brought together those who research, teach and work with clays in Spain.",
 fines:"Aims", campos:"Fields of activity", enRed:"Networks", hist:"History", hitos:"Milestones", sede:"Address", contacto:"Contact",
 juntaE:"Board of the Spanish Clay Society.", relInt:"International relations",
 premiosE:"The SEA supports those starting out in clay research with awards and grants.", abierto:"Open call", ultima:"Latest call", distinciones:"SEA members with international distinctions", honor:"Honorary members",
 reunE:"The SEA organises national scientific meetings and has brought some of the major international clay conferences to Spain.", nac:"SEA meetings and scientific days", int:"International conferences organised or supported by the SEA",
 pubE:"Glossary, books of abstracts, field guides and activity reports.", glosarioPub:"Glossary", resumenes:"Books of abstracts", libros:"Books and lectures", cursos:"Courses and seminars", guias:"Field guides and symposia", actividades:"Activity reports", interlab:"Interlaboratory analysis",
 gloE:"Terms used for clays and clay minerals, from the SEA Glossary (2023), a Spanish translation and adaptation of the Clay Minerals Society glossary coordinated by Manuel Pozo Rodríguez. Definitions are in Spanish.", buscar:"Search a term", sinRes:"No terms match. Try another word.", gloPdf:"Download the full glossary (PDF)", gloPend:"The glossary is being added. Meanwhile you can download it as a PDF.",
 sembE:"People who built clay science in Spain and beyond.",
 socioTit:"Join the SEA", socioE:"Researchers, teachers, students, companies and institutions interested in clays are welcome to join.", socioPasos:["Download the membership form.","Fill it in and send it to the SEA secretary.","The board will welcome you."], fichaWord:"Form (Word)", fichaPdf:"Form (PDF)",
 estatutosE:"Statutes of the Spanish Clay Society (official text, in Spanish).",
 pie:"Works offline once loaded.", creditos:"Credits",
 credT:"Microscope images: SEA image archive (contributed by their authors) and “Images of Clay” of the Mineralogical Society and The Clay Minerals Society. Hand specimens: IACT, private collections and Wikimedia Commons. Typeface Instrument Sans (SIL Open Font License).",
 otrasHist:"More stories", notE:"Society news, calls for awards and grants, and upcoming events.", tipos:{noticia:"News",convocatoria:"Call",evento:"Event"}, abiertaHasta:"Open until", cerrada:"Closed", masInfo:"More information", accJunta:"Board access", leerMas:"Read more", verDoc:"Download document (PDF)", volverNot:"Back to news", verNoticias:"See all news", proximas:"Open and upcoming", anteriores:"Earlier"
}};
function U(k){ var o=UI[lang],p=k.split("."); for(var i=0;i<p.length;i++) o=o&&o[p[i]]; return o; }
function L(o){ if(o==null) return ""; if(typeof o==="string") return o; return o[lang]!==undefined?o[lang]:o.es; }
function $(s,c){ return (c||document).querySelector(s); }
function $$(s,c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }
function esc(s){ return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function num(x){ return lang==="es"?String(x).replace(/(\d)\.(\d)/g,"$1,$2"):String(x).replace(/(\d),(\d)/g,"$1.$2"); }
function minById(id){ for(var i=0;i<MINERALES.length;i++) if(MINERALES[i].id===id) return MINERALES[i]; return null; }
function grupoNombre(id){ for(var i=0;i<GRUPOS.length;i++) if(GRUPOS[i].id===id) return L(GRUPOS[i]); return ""; }
function dTxt(m){ if(lang==="en"&&m.den) return m.den; return lang==="en"?num(m.d).replace("al deshidratarse","when dehydrated").replace("con etilenglicol","with ethylene glycol"):m.d; }
function fechaTxt(iso){ var d=new Date(iso+"T12:00:00"); return d.toLocaleDateString(lang==="es"?"es-ES":"en-GB",{day:"numeric",month:"long",year:"numeric"}); }
function hoyISO(){ return new Date().toISOString().slice(0,10); }

/* ---------------- imágenes ---------------- */
function semFile(f){ return f.replace(/\.(jpe?g|png|gif)$/i,".webp"); }
function seaSlug(p){ return p.replace(/\.(jpe?g|png|gif|webp)$/i,"").replace(/[\/]/g,"-"); }
function seaImg(p,mini){ return "img/sea/"+(mini?"mini/":"")+seaSlug(p)+".webp"; }
function imgIOC(id){
  return (SEM[id]||[]).map(function(s){ var mm=minById(id), nombre=s.m?L(s.m):(mm?L(mm).n:id);
    return {src:"img/sem/"+semFile(s.f),mini:"img/sem/mini/"+semFile(s.f),nombre:nombre,m:id,fuente:"ioc",autor:s.a,
      cap:"<b>"+esc(nombre)+"</b>"+(s.t?" ("+s.t+")":"")+". "+U("imagen")+": "+esc(s.a)+". "+U("ioc")+"."}; });
}
function imgSEA(id){
  return GALERIA_SEA.filter(function(g){ return !id||g.m===id; }).map(function(g){
    return {src:seaImg(g.f),mini:seaImg(g.f,true),nombre:L(minById(g.m)).n,m:g.m,fuente:"sea",autor:"Emilia García-Romero",
      cap:"<b>"+esc(L(g))+"</b> "+U("imagen")+": Emilia García-Romero (UCM-IGEO). "+U("seaArch")+"."}; });
}
function imgLibre(id){
  var L2=window.MICRO_LIBRE||{}, ids=id?[id]:Object.keys(L2), out=[];
  ids.forEach(function(k){ (L2[k]||[]).forEach(function(s){ var mm=minById(k), nombre=mm?L(mm).n:k;
    out.push({src:"img/micro/"+s.f+".webp",mini:"img/micro/mini/"+s.f+".webp",nombre:nombre,m:k,fuente:"libre",autor:L(s.c),
      cap:"<b>"+esc(nombre)+"</b> ("+s.t+")"+(s.d?": "+esc(L(s.d)):"")+". "+U("imagen")+": <a href=\""+s.u+"\" target=\"_blank\" rel=\"noopener\">"+esc(L(s.c))+"</a>."}); }); });
  return out;
}
function imgMicro(id){ return imgSEA(id).concat(imgIOC(id)).concat(imgLibre(id)); }
function propia(c){ return c==="del IACT"||c==="privada"||/Llorens/.test(c||""); }
function colTxt(c){ if(c==="del IACT") return U("colIACT"); if(c==="privada") return U("colPriv"); return c; }
function imgMano(id){
  return (MANO[id]||[]).map(function(x){ var v=x[lang]||x.es;
    return {src:"img/mano/"+x.f,mini:"img/mano/mini/"+x.f,nombre:v.alt,cap:"<b>"+esc(v.alt)+"</b>"+(v.cap?". "+esc(v.cap):"")+"."+(propia(v.col)?"":" "+esc(colTxt(v.col))+".")}; });
}
function primeraImg(id){ var a=imgMicro(id); if(a.length) return a[0]; var b=imgMano(id); return b[0]||null; }
function fig(im,opt){ opt=opt||{};
  return '<figure><button type="button" data-ver="'+esc(im.src)+'" data-cap="'+esc(im.cap)+'" aria-label="'+esc(im.nombre||"")+'"><img loading="lazy" src="'+(opt.grande?im.src:im.mini)+'" alt="'+esc(im.nombre||"")+'" onerror="quitaFig(this)"></button>'+(opt.sinpie?'':'<figcaption>'+im.cap+'</figcaption>')+'</figure>';
}
window.quitaFig=function(img){ var f=img.closest("figure"); if(f) f.remove(); };
var visor;
function verImagen(src,cap){
  if(!visor){ visor=document.createElement("dialog"); document.body.appendChild(visor); visor.addEventListener("click",function(e){ if(e.target===visor||e.target.classList.contains("cerrar")) visor.close(); }); }
  visor.innerHTML='<button class="cerrar" aria-label="'+U("cerrar")+'">×</button><figure><img src="'+esc(src)+'" alt=""><figcaption>'+cap+'</figcaption></figure>';
  if(visor.showModal) visor.showModal(); else visor.setAttribute("open","");
}

/* ---------------- dibujos 2D de láminas ---------------- */
var C={pilar:"#e0c060",N:"#3d5fb0",Cc:"#4a4a4a",an:"#c0504d",T:"#6f97bd",Tb:"#4b7398",O:"#7fae7a",Ob:"#57864f",vac:"#eef3ea",K:"#9b6fb0",cat:"#d1783f",agua:"#5aa9d6",hid:"#c9dfb4",hidb:"#86a96a",txt:"#26201b",Mg:"#7a8f3a"};
function capaT(y,w,arriba,n){ var h=26,s="",p=w/n; for(var i=0;i<n;i++){ var x0=i*p,xm=x0+p/2;
  s+=arriba?'<polygon points="'+(x0+2)+','+y+' '+(x0+p-2)+','+y+' '+xm+','+(y+h)+'" fill="'+C.T+'" stroke="'+C.Tb+'" stroke-width="1.5"/>':'<polygon points="'+(x0+2)+','+(y+h)+' '+(x0+p-2)+','+(y+h)+' '+xm+','+y+'" fill="'+C.T+'" stroke="'+C.Tb+'" stroke-width="1.5"/>'; } return {s:s,h:h}; }
function capaO(y,w,oct,n,hid){ var h=hid?24:32,s="",p=w/n,r=Math.min(p*.48,h*.62);
  for(var i=0;i<n;i++){ var cx=i*p+p/2,cy=y+h/2,v=(oct==="di"&&i%3===2&&!hid);
    s+='<polygon points="'+cx+','+(cy-r)+' '+(cx+r*.9)+','+cy+' '+cx+','+(cy+r)+' '+(cx-r*.9)+','+cy+'" fill="'+(v?C.vac:(hid?C.hid:C.O))+'" stroke="'+(hid?C.hidb:C.Ob)+'" stroke-width="1.5"'+(v?' stroke-dasharray="3 3"':'')+'/>'; } return {s:s,h:h}; }
function interCapa(y,w,t){ var s="",h=8,i,x;
  if(t==="H"||!t){ h=10; for(i=0;i<12;i++){ x=12+i*(w-24)/11; s+='<line x1="'+x+'" y1="'+(y+2)+'" x2="'+x+'" y2="'+(y+h-2)+'" stroke="#b9a48c" stroke-width="1.5" stroke-dasharray="2 2"/>'; } }
  else if(t==="nada"){ h=10; }
  else if(t==="K"){ h=20; for(i=0;i<6;i++){ x=w/12+i*w/6; s+='<circle cx="'+x+'" cy="'+(y+10)+'" r="7" fill="'+C.K+'"/>'; } }
  else if(t==="aguaH"){ h=24; for(i=0;i<14;i++){ x=10+i*(w-20)/13; s+='<circle cx="'+x+'" cy="'+(y+12)+'" r="4.5" fill="'+C.agua+'" opacity=".85"/>'; } }
  else if(t==="agua"||t==="Mg"){ h=t==="agua"?40:34; for(i=0;i<16;i++){ x=8+i*(w-16)/15; s+='<circle cx="'+x+'" cy="'+(y+9+(i%2)*2)+'" r="4" fill="'+C.agua+'" opacity=".85"/><circle cx="'+(x+6)+'" cy="'+(y+h-9-(i%2)*2)+'" r="4" fill="'+C.agua+'" opacity=".85"/>'; }
    var nc=t==="agua"?3:5; for(i=0;i<nc;i++){ x=w/(nc*2)+i*w/nc; s+='<circle cx="'+x+'" cy="'+(y+h/2)+'" r="7" fill="'+(t==="Mg"?C.Mg:C.cat)+'" stroke="#fff" stroke-width="1.5"/>'; } }
  else if(t==="hidroxido"){ var o=capaO(y+4,w,"tri",9,true); s=o.s; h=o.h+8; }
  return {s:s,h:h}; }
function svgLaminas(cfg,opt){ opt=opt||{}; var w=opt.w||340,n=9,y=14,s="",d0=null,d1=null,reps=opt.reps||2;
  for(var r=0;r<reps;r++){ if(r===0) d0=y;
    if(cfg.seq==="T"||cfg.seq==="TO"||cfg.seq==="TOT"){ var t=capaT(y,w,true,n); s+=t.s; y+=t.h; }
    if(cfg.seq.length>=2){ var o=capaO(y,w,cfg.oct,n); s+=o.s; y+=o.h; }
    if(cfg.seq==="TOT"){ var t2=capaT(y,w,false,n); s+=t2.s; y+=t2.h; }
    if(r<reps-1){ var ic=interCapa(y,w,Array.isArray(cfg.inter)?cfg.inter[r%cfg.inter.length]:cfg.inter); s+=ic.s; y+=ic.h; d1=y; } }
  var H=y+14,fl="";
  if(reps>1&&opt.d){ var x=w+14; fl='<line x1="'+x+'" y1="'+d0+'" x2="'+x+'" y2="'+d1+'" stroke="'+C.txt+'" stroke-width="1.5" marker-start="url(#fl)" marker-end="url(#fl)"/><text x="'+(x+6)+'" y="'+((d0+d1)/2+5)+'" font-size="15" font-family="Instrument Sans,Arial,sans-serif" fill="'+C.txt+'">'+esc(opt.d)+'</text>'; }
  return '<svg viewBox="0 0 '+(w+(opt.d?90:0))+' '+H+'" '+(opt.alt?'role="img" aria-label="'+esc((lang==="es"?"Esquema de la estructura de ":"Structure diagram of ")+opt.alt)+'"':'aria-hidden="true"')+'><defs><marker id="fl" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="'+C.txt+'"/></marker></defs>'+s+fl+'</svg>'; }
function svgFibra(tipo){ var w=360,h=240,s="",bw=tipo==="pali"?44:62,bh=46,gap=tipo==="pali"?18:24;
  for(var row=0;row<4;row++){ var off=(row%2)*((bw+gap)/2),y=12+row*(bh+8);
    for(var col=-1;col<6;col++){ var x=off+col*(bw+gap)+8;
      s+='<rect x="'+x+'" y="'+y+'" width="'+bw+'" height="'+(bh*.28)+'" rx="2" fill="'+C.T+'" stroke="'+C.Tb+'"/><rect x="'+x+'" y="'+(y+bh*.3)+'" width="'+bw+'" height="'+(bh*.4)+'" rx="2" fill="'+C.O+'" stroke="'+C.Ob+'"/><rect x="'+x+'" y="'+(y+bh*.72)+'" width="'+bw+'" height="'+(bh*.28)+'" rx="2" fill="'+C.T+'" stroke="'+C.Tb+'"/>';
      var cx=x+bw+gap/2; s+='<rect x="'+(x+bw+3)+'" y="'+(y+6)+'" width="'+(gap-6)+'" height="'+(bh-12)+'" rx="5" fill="#d7ecf7"/><circle cx="'+cx+'" cy="'+(y+bh/2-6)+'" r="3.5" fill="'+C.agua+'"/><circle cx="'+cx+'" cy="'+(y+bh/2+6)+'" r="3.5" fill="'+C.agua+'"/>'; } }
  return '<svg viewBox="0 0 '+w+' '+h+'" role="img" aria-label="'+(lang==="es"?"Esquema de cintas y canales de un mineral fibroso":"Diagram of ribbons and channels in a fibrous mineral")+'"><clipPath id="cf"><rect width="'+w+'" height="'+h+'" rx="6"/></clipPath><g clip-path="url(#cf)">'+s+'</g></svg>'; }
function svgInter(){ var w=340,y=10,s="",q=[["K"],["agua"],["K"],[null]];
  for(var i=0;i<q.length;i++){ var t=capaT(y,w,true,9); s+=t.s; y+=t.h; var o=capaO(y,w,"di",9); s+=o.s; y+=o.h; var t2=capaT(y,w,false,9); s+=t2.s; y+=t2.h; if(q[i][0]){ var ic=interCapa(y,w,q[i][0]); s+=ic.s; y+=ic.h; } }
  return '<svg viewBox="0 0 '+w+' '+(y+10)+'" role="img" aria-label="'+(lang==="es"?"Esquema de un interestratificado de láminas de illita y esmectita":"Diagram of an interstratification of illite and smectite layers")+'">'+s+'</svg>'; }
function dibujoMineral(m,opt){ var l=m.lam; opt=opt||{};
  if(l.t==="fibra") return svgFibra(m.id==="palygorskita"?"pali":"sepi");
  if(l.t==="inter") return svgInter();
  if(l.t==="rollo") return svgRollo();
  if(l.t==="onda") return svgOnda();
  return svgLaminas({seq:l.t,oct:l.oct,inter:l.inter||(l.agua?"aguaH":"H")},{d:opt.d,reps:Array.isArray(l.inter)?3:2,alt:L(m).n}); }
/* Crisotilo: lámina 1:1 enrollada (capa octaédrica por fuera). Antigorita: lámina ondulada cuya capa tetraédrica cambia de lado. */
function svgRollo(){ var cx=170,cy=125,s="",i,a,r,pts=[],pts2=[];
  for(i=0;i<=420;i++){ a=i/420*Math.PI*2*2.6; r=18+a*5.6; pts.push((cx+r*Math.cos(a)).toFixed(1)+","+(cy+r*Math.sin(a)).toFixed(1)); r+=6; pts2.push((cx+r*Math.cos(a)).toFixed(1)+","+(cy+r*Math.sin(a)).toFixed(1)); }
  s+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="'+C.T+'" stroke-width="7" stroke-linecap="round"/><polyline points="'+pts2.join(" ")+'" fill="none" stroke="'+C.O+'" stroke-width="7" stroke-linecap="round"/>';
  return '<svg viewBox="0 0 340 250" role="img" aria-label="'+(lang==="es"?"Esquema de una lámina 1:1 enrollada, con la capa octaédrica por fuera":"Diagram of a rolled 1:1 layer, with the octahedral sheet outside")+'">'+s+'</svg>'; }
function svgOnda(){ var w=340,s="",i,x,y,n=170,A=16,P=170,pO=[],segT=["",""];
  for(i=0;i<=n;i++){ x=i*w/n; y=70+A*Math.sin(x/P*2*Math.PI); pO.push(x.toFixed(1)+","+y.toFixed(1)); }
  s+='<polyline points="'+pO.join(" ")+'" fill="none" stroke="'+C.O+'" stroke-width="16"/>';
  for(i=0;i<20;i++){ x=8+i*(w-16)/19; y=70+A*Math.sin(x/P*2*Math.PI); var arriba=(Math.floor(x/(P/2))%2===0), dy=arriba?-17:17;
    s+='<polygon points="'+(x-7)+','+(y+dy*1.5)+' '+(x+7)+','+(y+dy*1.5)+' '+x+','+(y+dy*0.55)+'" fill="'+C.T+'" stroke="'+C.Tb+'" stroke-width="1.2"/>'; }
  return '<svg viewBox="0 0 '+w+' 140" role="img" aria-label="'+(lang==="es"?"Esquema de una lámina ondulada":"Diagram of a wavy layer")+'">'+s+'</svg>'; }
/* Leyenda propia de cada mineral: solo los elementos que aparecen en sus dibujos 2D y 3D */
function clavesLeyenda(m){ var l=m.lam, k=["T","O"];
  if(l.t==="inter") return ["T","O","vac","K","cat","agua"];
  if(l.t==="fibra") return ["T","O","agua"];
  if(l.t==="rollo"||l.t==="onda") return k;
  if(l.oct==="di") k.push("vac");
  if(l.t==="TO"&&!l.agua) k.push("H");
  if(l.agua) k.push("agua");
  (Array.isArray(l.inter)?l.inter:[l.inter]).forEach(function(i){
    if(i==="K"&&k.indexOf("K")<0&&k.indexOf("NaK")<0) k.push(m.id==="rectorita"?"NaK":"K");
    if(i==="agua"){ if(k.indexOf("cat")<0) k.push("cat"); if(k.indexOf("agua")<0) k.push("agua"); }
    if(i==="Mg"){ if(k.indexOf("Mg")<0) k.push("Mg"); if(k.indexOf("agua")<0) k.push("agua"); }
    if(i==="hidroxido"&&k.indexOf("hid")<0) k.push("hid"); });
  return k; }
/* Texto de los octaedros según el mineral (catión octaédrico dominante) */
var OCT_LEY={caolinita:"Al",dickita:"Al",nacrita:"Al",halloysita:"Al",pirofilita:"Al",illita:"Al",moscovita:"Al",beidellita:"Al",rectorita:"Al",
 montmorillonita:"AlMg",nontronita:"Fe3",glauconita:"FeAlMg",talco:"Mg",lizardita:"Mg",crisotilo:"Mg",saponita:"Mg",estevensita:"Mg",hectorita:"MgLi",vermiculita:"Mg",sepiolita:"Mg",corrensita:"MgFe",clorita:"MgFe",palygorskita:"MgAl"};
var OCT_TXT={es:{Al:"Octaedros de Al",AlMg:"Octaedros de Al (con algo de Mg)",Fe3:"Octaedros de Fe³⁺",FeAlMg:"Octaedros de Fe³⁺, Al y Mg",Mg:"Octaedros de Mg",MgLi:"Octaedros de Mg (con algo de Li)",MgFe:"Octaedros de Mg y Fe²⁺",MgAl:"Octaedros de Mg y Al"},
 en:{Al:"Al octahedra",AlMg:"Al octahedra (with some Mg)",Fe3:"Fe³⁺ octahedra",FeAlMg:"Fe³⁺, Al and Mg octahedra",Mg:"Mg octahedra",MgLi:"Mg octahedra (with some Li)",MgFe:"Mg and Fe²⁺ octahedra",MgAl:"Mg and Al octahedra"}};
var TET_AL={interestratificados:1,beidellita:1,saponita:1,vermiculita:1,moscovita:1,illita:1,glauconita:1,clorita:1,rectorita:1,corrensita:1};
function leyenda(t,m){ var it={T:C.T,O:C.O,vac:C.vac,K:C.K,NaK:C.K,cat:C.cat,agua:C.agua,hid:C.hid,Mg:C.Mg,H:"#b9a48c",pilar:C.pilar,N:C.N,Cc:C.Cc,an:C.an,Oldh:C.O};
  function txt(k){ if(k==="T"&&m&&TET_AL[m.id]) return U("ley.TAl"); if(k==="O"&&m){ var c=OCT_LEY[m.id]||(m.lam&&m.lam.oct==="tri"?"Mg":"Al"); return OCT_TXT[lang==="en"?"en":"es"][c]; } return U("ley."+k); }
  return '<div class="leyenda">'+t.map(function(k){ return '<span><i style="background:'+it[k]+(k==="vac"?";border:1px dashed "+C.Ob:"")+'"></i>'+txt(k)+'</span>'; }).join("")+'</div>'; }

/* ---------------- 3D ---------------- */
var visores=[];
function crear3D(cont,id,opt){
  if(!cont) return null;
  function plano(){ cont.innerHTML='<div class="sin3d">'+dibujoMineral(minById(id)||minById("caolinita"))+'</div>'; return null; }
  if(!window.Visor3D||!window.THREE) return plano();
  var v; try{ v=window.Visor3D(cont,opt||{}); }catch(e){ v=null; }
  if(!v) return plano();
  v.poner(id,3); visores.push(v); return v;
}
function limpiar3D(){ visores.forEach(function(v){ try{ v.destruir(); }catch(e){} }); visores=[]; }

/* ---------------- estructura de página ---------------- */
var main;
function cabezaPagina(titulo,entrada,miga){
  return '<div class="cabeza-pagina envoltorio">'+(miga?'<div class="miga"><a href="#'+miga[0]+'">'+esc(miga[1])+'</a></div>':'')+'<h1>'+titulo+'</h1>'+(entrada?'<p class="entrada">'+entrada+'</p>':'')+'</div>';
}
function migaArcillas(){ return ["inicio",U("arcillas")]; }
function migaSEA(){ return ["sociedad",U("sociedad")]; }
var P={};

/* ---- inicio ---- */
var HEROE_IMG=[["sea","2018/02/3montmorillonita.jpg"],["ioc","caolinita",0],["sea","2018/02/14palygorskita.jpg"],["ioc","sepiolita",0],["ioc","halloysita",1],["sea","2018/02/24caolinita.jpg"]];
function imgHistoria(s){ var a=imgIOC(s.img[0])[s.img[1]]; return a||primeraImg(s.m[0]); }
P.inicio=function(){
  var N=window.NOTICIAS||[], vig=N.filter(vigente).sort(function(a,b){ return (a.plazo||a.fecha)<(b.plazo||b.fecha)?-1:1; }), ult=N.filter(function(n){ return !vigente(n)&&n.fecha>=haceDias(365); }).slice(0,Math.max(0,3-vig.length)), port=vig.concat(ult).slice(0,3);
  var h='<section class="heroe"><div class="fotos" id="fotos"></div><div class="envoltorio"><h1>'+U("heroeT")+'</h1><p class="entrada">'+U("heroeE")+'</p><div class="acciones"><a class="boton" href="#sociedad">'+U("conocer")+'</a><a class="boton claro" href="#minerales">'+U("explorar")+'</a></div><form class="buscador-portada" role="search" onsubmit="event.preventDefault();var v=this.q.value.trim();if(v)location.hash=\'buscar/\'+encodeURIComponent(v);"><label class="solo-lector" for="qportada">'+(lang==="es"?"Buscar en la web":"Search the website")+'</label><input id="qportada" name="q" type="search" placeholder="'+(lang==="es"?"Buscar en la web: caolinita, peloide…":"Search the website: kaolinite, peloid…")+'"><button type="submit">'+(lang==="es"?"Buscar":"Search")+'</button></form></div><div class="placa" id="placa"></div></section>'+
   '<div class="estratos"></div>'+
   (clayPendiente()?'<section class="aviso-clay"><div class="envoltorio"><div><span class="fecha">'+(lang==="es"?"Madrid, 20–26 de junio de 2027":"Madrid, 20–26 June 2027")+'</span><h2>'+(lang==="es"?"La SEA organiza CLAY 2027":"The SEA hosts CLAY 2027")+'</h2><p>'+(lang==="es"?"Primer congreso de la nueva serie CLAY de la AIPEA, que une las International Clay Conferences y Euroclay. Facultad de Biología de la Universidad Autónoma de Madrid, campus de Cantoblanco.":"The first conference of AIPEA’s new CLAY series, which merges the International Clay Conferences and Euroclay. Faculty of Biology, Autonomous University of Madrid, Cantoblanco campus.")+'</p><p class="cuenta"><b>'+diasClay()+'</b> '+(lang==="es"?"días para empezar":"days to go")+'</p></div><div class="acciones-clay"><a class="boton" href="#clay2027">'+(lang==="es"?"Más información":"More information")+'</a><a class="boton claro" href="https://clay.aipea.org/" target="_blank" rel="noopener">clay.aipea.org</a></div></div></section>':'')+
   '<section class="cifras-portada"><div class="envoltorio cifras"><div><b>1959</b><span>'+(lang==="es"?"nace el grupo que dio origen a la SEA":"the group that became the SEA is founded")+'</span></div><div><b>+100</b><span>'+(lang==="es"?"socios en España y otros países":"members in Spain and abroad")+'</span></div><div><b>24</b><span>'+(lang==="es"?"minerales de la arcilla explicados":"clay minerals explained")+'</span></div><div><a href="#cuestionario"><b>10</b><span>'+(lang==="es"?"preguntas para ponerte a prueba":"questions to test yourself")+'</span></a></div></div></section>'+
   '<section class="bloque"><div class="envoltorio dos-col"><div><h2>'+U("lamTit")+'</h2><p class="lectura">'+U("lamTxt")+'</p><a class="boton claro" href="#estructura">'+U("verEstructura")+'</a></div><div><div class="lienzo3d" id="l3d"><span class="aviso">'+U("girar")+'</span></div></div></div></section>'+
   '<section class="bloque arena"><div class="envoltorio"><h2>'+U("histTit")+'</h2><p class="entrada">'+U("histE")+'</p><div class="historias">'+HISTORIAS.map(function(s,i){ var im=imgHistoria(s);
     return '<a class="historia'+(i===0?' grande':'')+'" href="#historia/'+s.id+'"><div class="img">'+(im?'<img loading="lazy" src="'+(i===0?im.src:im.mini)+'" alt="">':'')+'</div><h3>'+esc(L(s).n)+'</h3><p>'+esc(L(s).r)+'</p></a>'; }).join("")+'</div></div></section>'+
   '<section class="bloque"><div class="envoltorio"><h2>'+U("indiceTit")+'</h2><div class="indice">'+Object.keys(UI.es.indice).map(function(k){
     var nom=U("nav.arcillas").filter(function(x){return x[0]===k;})[0][1];
     return '<a href="#'+k+'"><span class="mini">'+indiceImg(k)+'</span><span><h3 class="h4">'+esc(nom)+'</h3><p>'+esc(U("indice")[k])+'</p></span></a>'; }).join("")+'</div></div></section>'+
   '<section class="bloque oscuro"><div class="envoltorio"><h2>'+U("galTit")+'</h2><p class="entrada">'+U("galE")+'</p><div class="tira">'+imgSEA().slice(0,10).concat(imgIOC("halloysita").slice(0,1),imgIOC("sepiolita").slice(0,1)).map(function(im){ return fig(im,{sinpie:true}); }).join("")+'</div><p style="margin-top:1.4rem"><a class="boton claro" href="#minerales">'+(lang==="es"?"Ver los minerales":"See the minerals")+'</a></p></div></section>'+
   '<section class="bloque"><div class="envoltorio"><h2>'+U("convTit")+'</h2><div class="convocatorias">'+port.map(tarjetaNoticia).join("")+
     '<div class="convocatoria"><span class="fecha">'+(lang==="es"?"Socios":"Membership")+'</span><h3>'+U("socioTit")+'</h3><p>'+U("socioE")+'</p><a href="#socio">'+U("hazte")+'</a></div>'+
   '</div><p style="margin-top:1.6rem"><a class="boton claro" href="#noticias">'+U("verNoticias")+'</a></p></div></section>';
  main.innerHTML=h;
  heroe();
  crear3D($("#l3d"),"montmorillonita",{autoRotate:true});
};
function indiceImg(k){
  var mapa={"que-es":["sea","2018/02/1esmectita.jpg"],estructura:null,minerales:["ioc","caolinita",1],propiedades:["sea","2018/02/6estevensita.jpg"],aplicaciones:["mano","sepiolita"],yacimientos:["mano","montmorillonita"],estudio:["ioc","caolinita",2],aprende:["sea","2018/02/7opaloygorskita.jpg"]};
  var e=mapa[k]; if(!e) return svgLaminas({seq:"TOT",oct:"di",inter:"K"},{reps:2,w:200});
  var src=e[0]==="sea"?seaImg(e[1],true):(e[0]==="ioc"?(imgIOC(e[1])[e[2]]||{}).mini:(imgMano(e[1])[0]||{}).mini);
  return '<img loading="lazy" src="'+src+'" alt="">';
}
var heroeTimer;
function heroe(){
  clearInterval(heroeTimer);
  var cont=$("#fotos"), placa=$("#placa"); if(!cont) return;
  var lista=HEROE_IMG.map(function(e){ if(e[0]==="sea"){ var g=GALERIA_SEA.filter(function(x){return x.f===e[1];})[0]; return {src:seaImg(e[1]),t:L(minById(g.m)).n,a:"Emilia García-Romero",f:U("seaArch")}; }
    var im=imgIOC(e[1])[e[2]]; return im?{src:im.src,t:im.nombre,a:im.autor,f:"Images of Clay"}:null; }).filter(Boolean);
  var ok=[],i=0;
  lista.forEach(function(d){ var img=new Image(); img.alt=""; img.onload=function(){ if(!document.body.contains(cont)) return; ok.push({img:img,d:d}); cont.appendChild(img); if(ok.length===1) mostrar(0); }; img.src=d.src; });
  function mostrar(k){ ok.forEach(function(o,j){ o.img.classList.toggle("ver",j===k); }); var o=ok[k]; if(o&&placa) placa.innerHTML='<b>'+esc(o.d.t)+'</b>'+esc(o.d.a)+'<br>'+esc(o.d.f); }
  heroeTimer=setInterval(function(){ if(ok.length>1){ i=(i+1)%ok.length; mostrar(i); } },6000);
}

/* ---- historias ---- */
P.historia=function(id){
  var s=HISTORIAS.filter(function(x){return x.id===id;})[0]||HISTORIAS[0], im=imgHistoria(s);
  main.innerHTML=cabezaPagina(esc(L(s).n),esc(L(s).r),["inicio",U("histTit")])+'<div class="envoltorio pagina-cuerpo">'+(im?'<figure><img class="portada-img" src="'+im.src+'" alt=""><figcaption>'+im.cap+'</figcaption></figure>':'')+
   '<div class="historia-texto" style="margin-top:2rem">'+L(s).t.map(function(p){ return '<p>'+esc(p)+'</p>'; }).join("")+'</div>'+
   (s.id==="sepiolita"&&window.EVOLUCION?'<p><a href="#evolucion">'+esc(window.EVOLUCION[lang].fibrTit)+'</a></p>':'')+'<p>'+s.m.map(function(m){ return '<a class="boton claro" style="margin:0 .4rem .4rem 0" href="#mineral/'+m+'">'+esc(L(minById(m)).n)+'</a>'; }).join("")+'</p>'+
   '<h2 class="h3" style="margin-top:2.25rem">'+U("otrasHist")+'</h2><div class="historias" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr))">'+HISTORIAS.filter(function(x){return x.id!==s.id;}).map(function(x){ var i2=imgHistoria(x); return '<a class="historia" href="#historia/'+x.id+'"><div class="img">'+(i2?'<img loading="lazy" src="'+i2.mini+'" alt="">':'')+'</div><h3>'+esc(L(x).n)+'</h3></a>'; }).join("")+'</div></div>';
};

/* ---- qué es ---- */
P["que-es"]=function(){
  main.innerHTML=cabezaPagina(navI("que-es")[1],U("queE"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><h2 class="h3">'+U("tam")+'</h2><p>'+U("tamT")+'</p><h2 class="h3" style="margin-top:1.8rem">'+U("min")+'</h2>'+U("minT")+''+
   '<p class="entrada" style="margin:2rem 0">'+U("def")+'</p>'+
   '<div class="mosaico" style="margin-top:2rem">'+imgSEA("montmorillonita").slice(0,2).concat(imgIOC("caolinita").slice(0,1)).map(function(i){return fig(i);}).join("")+'</div>'+
   '<h2 class="h3" style="margin-top:2.2rem">'+(lang==="es"?"Más allá del mineral natural":"Beyond the natural mineral")+'</h2><p>'+(lang==="es"?"Las arcillas también se transforman en el laboratorio: se intercalan moléculas orgánicas (organoarcillas), se separan sus láminas con pilares de óxidos (arcillas pilareadas), se activan con ácidos o con calor, se combinan con polímeros y biopolímeros o se sintetizan. Así se obtienen materiales para descontaminar aguas, liberar fármacos, catalizar reacciones o fabricar cementos con menos CO₂.":"Clays are also transformed in the laboratory: organic molecules are intercalated (organoclays), their layers are propped apart with oxide pillars (pillared clays), they are activated with acids or heat, combined with polymers and biopolymers, or synthesised. The result is materials to clean water, release drugs, catalyse reactions or make lower-CO₂ cements.")+'</p>'+
   '<p style="margin-top:2rem"><a class="boton" href="#estructura">'+navI("estructura")[1]+'</a> <a class="boton claro" href="#modificadas">'+navI("modificadas")[1]+'</a></p></div>';
};

/* ---- estructura: 3D + constructor ---- */
var m3dSel="caolinita", est={seq:"",oct:"di",inter:null,fibra:null}, v3d=null;
P.estructura=function(){
  var ids=["caolinita","talco","pirofilita","illita","montmorillonita","vermiculita","clorita","sepiolita","palygorskita","pilareada","organoarcilla","ldh"];
  main.innerHTML=cabezaPagina(navI("estructura")[1],U("estE"),migaArcillas())+
   '<section class="bloque oscuro" style="padding-top:2.5rem"><div class="envoltorio"><h2>'+U("m3dTit")+'</h2><div class="filtros">'+ids.map(function(id){ return '<button class="filtro" data-m3d="'+id+'">'+U("nombres3d")[id]+'</button>'; }).join("")+'</div>'+
   '<div class="dos-col" style="align-items:start"><div class="lienzo3d" id="v3d" style="aspect-ratio:1/1"><span class="aviso">'+U("girar")+'</span></div><div><div class="filtros"><button class="filtro" data-vista="oblicua">'+U("oblicua")+'</button><button class="filtro" data-vista="perfil">'+U("perfil")+'</button><button class="filtro" data-vista="planta">'+U("planta")+'</button></div><div id="info3d"></div><div id="ley3d"></div><p class="pequeno" style="margin-top:1rem">'+U("m3dNota")+'</p></div></div></div></section>';
  v3d=crear3D($("#v3d"),m3dSel,{autoRotate:true});
  function pinta3d(){ $$("[data-m3d]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-m3d")===m3dSel); });
    var mmL=minById(m3dSel), LEY_MOD={pilareada:["T","O","pilar"],organoarcilla:["T","O","N","Cc"],ldh:["Oldh","an","agua"]}, M3=(window.MODELOS3D||{})[M3D_DE[m3dSel]||m3dSel];
    $("#ley3d").innerHTML=(mmL?leyenda(clavesLeyenda(mmL).filter(function(k){return k!=="vac"&&k!=="H";}),mmL):(LEY_MOD[m3dSel]?leyenda(LEY_MOD[m3dSel],{id:m3dSel,lam:{oct:m3dSel==="ldh"?"tri":"di"}}):leyenda(["T","O"],{id:m3dSel,lam:{oct:"tri"}})))+(M3&&(M3.d||M3.alt)?'<p class="pequeno" style="margin:.6rem 0 0">'+(lang==="es"?"Espaciado basal del modelo: ":"Basal spacing in the model: ")+(M3.d?num(M3.d)+" Å":M3.alt.map(function(x){return num(x.d);}).join(" + ")+" = "+num(M3.alt.reduce(function(t,x){return t+x.d;},0))+" Å")+'</p>':'');
    var mm=minById(m3dSel);
    var EX={pilareada:{es:["Una montmorillonita en la que se han intercalado policationes de aluminio que, al calcinar, forman pilares de óxido entre las láminas (amarillo). El espaciado sube a unos 18 Å y entre los pilares quedan microporos estables: es la base de catalizadores y adsorbentes.","modificadas"],en:["A montmorillonite intercalated with aluminium polycations that, on calcination, form oxide pillars between the layers (yellow). The spacing rises to about 18 Å and stable micropores remain between the pillars: the basis of catalysts and adsorbents.","modificadas"]},
      organoarcilla:{es:["Una montmorillonita en la que los cationes interlaminares se han cambiado por alquilamonios: la cabeza de nitrógeno (azul) queda junto a la lámina y la cadena de carbono (gris) separa las láminas hasta unos 20 Å. La superficie se vuelve organófila y retiene contaminantes orgánicos o se dispersa en plásticos.","modificadas"],en:["A montmorillonite whose interlayer cations have been exchanged for alkylammonium: the nitrogen head (blue) sits next to the layer and the carbon chain (grey) props the layers apart to about 20 Å. The surface becomes organophilic, retains organic pollutants and disperses in plastics.","modificadas"]},
      ldh:{es:["Un hidróxido doble laminar: láminas octaédricas de tipo brucita con carga positiva y aniones (rojo) y agua entre ellas. Es lo inverso de una esmectita y no es un mineral de la arcilla, sino un material afín.","afines"],en:["A layered double hydroxide: brucite-like octahedral layers with a positive charge and anions (red) and water between them. It is the reverse of a smectite and is not a clay mineral but a related material.","afines"]}};
    if(EX[m3dSel]){ var ex=EX[m3dSel][lang]; $("#info3d").innerHTML='<h3>'+U("nombres3d")[m3dSel]+'</h3><p>'+ex[0]+'</p><p><a href="#'+ex[1]+'">'+navI(ex[1])[1]+'</a></p>'; return; }
    $("#info3d").innerHTML=mm?'<h3>'+esc(L(mm).n)+'</h3><p>'+esc(L(mm).r)+'</p><p><a href="#mineral/'+mm.id+'">'+U("verFicha")+'</a></p>':'<h3>'+U("nombres3d")[m3dSel]+'</h3><p>'+(lang==="es"?"Lámina 2:1 sin carga y sin nada entre láminas. Es la referencia para entender las demás láminas 2:1.":"An uncharged 2:1 layer with nothing between layers. It is the reference for understanding the other 2:1 layers.")+'</p>'; }
  $$("[data-m3d]").forEach(function(b){ b.onclick=function(){ m3dSel=b.getAttribute("data-m3d"); if(v3d) v3d.poner(m3dSel,3); pinta3d(); }; });
  $$("[data-vista]").forEach(function(b){ b.onclick=function(){ if(v3d) v3d.vista(b.getAttribute("data-vista")); }; });
  pinta3d();
};
/* ---- minerales ---- */
P.minerales=function(){
  var filas=""; GRUPOS.forEach(function(g){ var ms=MINERALES.filter(function(m){return m.grupo===g.id;}); if(!ms.length) return;
    var gt=L(g), gi=gt.indexOf(" ("), gn=gi>0?gt.slice(0,gi):gt, gs=gi>0?gt.slice(gi+2,-1):"";
    filas+='<tr class="grupo-fila"><td colspan="4"><span class="g-nom">'+esc(gn)+'</span>'+(gs?'<span class="g-nota">'+esc(num(gs))+'</span>':'')+'</td></tr>'+ms.map(function(m){ var im=primeraImg(m.id);
      return '<tr class="fila" data-ir="#mineral/'+m.id+'"><td style="width:66px"><div class="mini"'+(im?'':' style="background:#fff;padding:3px"')+'>'+(im?'<img loading="lazy" src="'+im.mini+'" alt="">':dibujoMineral(m))+'</div></td><td class="nombre"><a href="#mineral/'+m.id+'">'+esc(L(m).n)+'</a></td><td>'+esc(dTxt(m))+'</td><td>'+esc(L(m).r)+'</td></tr>'; }).join(""); });
  main.innerHTML=cabezaPagina(navI("minerales")[1],lang==="es"?"Los grupos de minerales de la arcilla, ordenados según la clasificación de la AIPEA, y sus especies más importantes.":"The clay mineral groups, arranged according to the AIPEA classification, and their most important species.",migaArcillas())+
   '<div class="envoltorio pagina-cuerpo" style="overflow-x:auto"><table class="tabla-minerales"><thead><tr>'+U("tablaCols").map(function(c){return '<th>'+c+'</th>';}).join("")+'</tr></thead><tbody>'+filas+'</tbody></table>'+tablaAIPEA()+'</div>';
  $$("tr.fila").forEach(function(tr){ tr.onclick=function(e){ if(e.target.tagName!=="A") location.hash=tr.getAttribute("data-ir"); }; });
};
function especieTxt(x){ var n=lang==="en"?x[1]:x[0]; return x[2]?'<a href="#mineral/'+x[2]+'">'+esc(n)+'</a>':esc(n); }
function tablaAIPEA(){ var es=lang==="es";
  var t1=CLASIF_PLANOS.map(function(r){ return r.sp.map(function(o,i){ return '<tr>'+(i===0?'<td rowspan="'+r.sp.length+'">'+esc(es?r.lam:(r.lamen||r.lam))+'</td><td rowspan="'+r.sp.length+'">'+esc(L(r.inter))+'</td><td rowspan="'+r.sp.length+'"><b>'+esc(L(r.g))+'</b></td>':'')+'<td style="white-space:nowrap">'+esc(L(o[0]))+'</td><td style="min-width:13rem">'+o[1].map(especieTxt).join(", ")+'</td></tr>'; }).join(""); }).join("");
  var t2=CLASIF_NOPLANOS.map(function(r){ return '<tr><td>'+r.lam+'</td><td>'+esc(L(r.tipo))+'</td><td>'+esc(L(r.af))+'</td><td>'+r.sp.map(especieTxt).join(", ")+'</td></tr>'; }).join("");
  return '<details class="especialistas" style="margin-top:2rem"><summary>'+(es?"Clasificación de la AIPEA":"AIPEA classification")+'</summary><div class="dentro">'+
   '<p>'+(es?"Clasificación de los filosilicatos hidratados del Comité de Nomenclatura de la AIPEA, con la terminología del Glosario de la SEA: <i>capa</i> (tetraédrica u octaédrica), <i>lámina</i> (1:1 o 2:1) e <i>interlámina</i>. x es la carga neta de la lámina por fórmula unidad. Las listas de especies no son exhaustivas. Los nombres enlazados tienen ficha.":"Classification of hydrous phyllosilicates by the AIPEA Nomenclature Committee. x is the net layer charge per formula unit. Species lists are not exhaustive. Linked names have their own page.")+'</p>'+
   '<h3 class="h4">'+(es?"Filosilicatos planos":"Planar phyllosilicates")+'</h3><div style="overflow-x:auto"><table><thead><tr><th>'+(es?"Lámina":"Layer")+'</th><th>'+(es?"Material interlaminar":"Interlayer material")+'</th><th>'+(es?"Grupo":"Group")+'</th><th>'+(es?"Carácter octaédrico":"Octahedral character")+'</th><th>'+(es?"Especies":"Species")+'</th></tr></thead><tbody>'+t1+'</tbody></table></div>'+
   '<h3 class="h4" style="margin-top:1.5rem">'+(es?"Filosilicatos no planos":"Non-planar phyllosilicates")+'</h3><div style="overflow-x:auto"><table><thead><tr><th>'+(es?"Lámina":"Layer")+'</th><th>'+(es?"Estructura":"Structure")+'</th><th>'+(es?"Afinidad tradicional":"Traditional affiliation")+'</th><th>'+(es?"Especies":"Species")+'</th></tr></thead><tbody>'+t2+'</tbody></table></div>'+
   '<p class="pequeno" style="margin-top:1rem">'+(es?"Fuente: Guggenheim, S. et al. (2006) Summary of recommendations of nomenclature committees relevant to clay mineralogy: report of the AIPEA Nomenclature Committee for 2006. <i>Clays and Clay Minerals</i>, 54, 761–772 (<a href='https://doi.org/10.1346/CCMN.2006.0540610' target='_blank' rel='noopener'>doi:10.1346/CCMN.2006.0540610</a>; fe de erratas en <a href='https://doi.org/10.1346/CCMN.2007.0550611' target='_blank' rel='noopener'>doi:10.1346/CCMN.2007.0550611</a>); Glosario de términos de la SEA (2023). Informes de nomenclatura de la AIPEA en <a href='https://aipea.org/' target='_blank' rel='noopener'>aipea.org</a>.":"Source: Guggenheim, S. et al. (2006) Summary of recommendations of nomenclature committees relevant to clay mineralogy: report of the AIPEA Nomenclature Committee for 2006. <i>Clays and Clay Minerals</i>, 54, 761–772 (<a href='https://doi.org/10.1346/CCMN.2006.0540610' target='_blank' rel='noopener'>doi:10.1346/CCMN.2006.0540610</a>; erratum at <a href='https://doi.org/10.1346/CCMN.2007.0550611' target='_blank' rel='noopener'>doi:10.1346/CCMN.2007.0550611</a>); SEA Glossary (2023). AIPEA nomenclature reports at <a href='https://aipea.org/' target='_blank' rel='noopener'>aipea.org</a>.")+'</p></div></details>'; }
var M3D_DE={caolinita:"caolinita",dickita:"caolinita",nacrita:"caolinita",halloysita:"halloysita",lizardita:"serpentina",berthierina:"serpentina",talco:"talco",pirofilita:"pirofilita",moscovita:"illita",illita:"illita",glauconita:"illita",montmorillonita:"montmorillonita",beidellita:"montmorillonita",nontronita:"montmorillonita",saponita:"saponita",hectorita:"saponita",estevensita:"saponita",vermiculita:"vermiculita",clorita:"clorita",sudoita:"sudoita",rectorita:"rectorita",corrensita:"corrensita",tosudita:"tosudita",aliettita:"aliettita",hidrobiotita:"hidrobiotita",sepiolita:"sepiolita",palygorskita:"palygorskita"};
var MINDAT={caolinita:"Kaolinite",dickita:"Dickite",nacrita:"Nacrite",halloysita:"Halloysite",lizardita:"Lizardite",crisotilo:"Chrysotile",talco:"Talc",pirofilita:"Pyrophyllite",montmorillonita:"Montmorillonite",beidellita:"Beidellite",nontronita:"Nontronite",saponita:"Saponite",hectorita:"Hectorite",estevensita:"Stevensite",vermiculita:"Vermiculite",moscovita:"Muscovite",illita:"Illite",glauconita:"Glauconite",clorita:"Chlorite",rectorita:"Rectorite",corrensita:"Corrensite",sepiolita:"Sepiolite",palygorskita:"Palygorskite"};
var MINDAT_ID={caolinita:2156,nacrita:2826,halloysita:1808,pirofilita:3323,montmorillonita:2821,estevensita:3770,illita:2011,glauconita:1710,sepiolita:3621};
function mindatEnlace(id){ var n=MINDAT[id]; if(!n) return ""; var u=MINDAT_ID[id]?"https://www.mindat.org/min-"+MINDAT_ID[id]+".html":"https://www.mindat.org/show.php?name="+encodeURIComponent(n); return '<p class="pequeno" style="margin:.8rem 0 0"><a href="'+u+'" target="_blank" rel="noopener">'+(lang==="es"?"Más datos de este mineral en Mindat (en inglés)":"More data on "+n+" at Mindat")+'</a></p>'; }
P.mineral=function(id){
  var m=minById(id); if(!m){ P.minerales(); return; } var t=L(m), micro=imgMicro(id), mano=imgMano(id), e=ESPECIALISTAS[id], DI=((window.DATOS_INTERES||{})[id]||{})[lang], prin=micro[0]||mano[0];
  var dat=[[U(m.grupo==="inter"?"ficha.comp":"ficha.formula"),esc(lang==="en"&&m.fen?m.fen:m.formula)],[U("ficha.d"),esc(dTxt(m))]];
  if(m.cic) dat.push([U("ficha.cic"),num(m.cic[0])+"–"+num(m.cic[1])+" "+U("cicU")]);
  if(m.se) dat.push([U("ficha.se"),num(m.se[0])+"–"+num(m.se[1])+" "+U("seU")]);
  if(m.hinch!=null) dat.push([U("ficha.hinch"),U("niveles")[m.hinch]]);
  if(m.plast!=null) dat.push([U("ficha.plast"),U("nivelesF")[m.plast]]);
  var h=cabezaPagina(esc(t.n),esc(t.r),["minerales",navI("minerales")[1]])+'<div class="envoltorio pagina-cuerpo"><div class="ficha-cab"><div class="principal">'+(prin?fig(prin,{grande:true}):'')+'</div><div><p class="pequeno">'+esc(grupoNombre(m.grupo))+'</p><p>'+esc(t.t)+'</p><div class="datos">'+dat.map(function(d,k){ return '<div class="dato'+(k===0?' ancho':'')+'"><small>'+d[0]+'</small><b>'+d[1]+'</b></div>'; }).join("")+'</div></div></div>';
  if(e) h+='<details class="especialistas"><summary>'+U("esp.tit")+'</summary><div class="dentro"><table><tr><th>'+U("esp.lam")+'</th><td>'+esc(L(e.lam))+'</td></tr><tr><th>'+U("esp.x")+'</th><td>'+esc(num(L(e.x)))+'</td></tr><tr><th>'+U("esp.grupo")+'</th><td>'+esc(L(e.grupo))+'</td></tr><tr><th>'+U("esp.oct")+'</th><td>'+esc(L(e.oct))+'</td></tr><tr><th>'+U("esp.inter")+'</th><td>'+esc(L(e.inter))+'</td></tr></table>'+(DI?'<p class="pequeno" style="margin:.4rem 0 0">'+U("esp.fuente")+'</p><dl class="interes">'+DI.map(function(x){ return '<dt>'+esc(x[0])+'</dt><dd>'+esc(x[1])+'</dd>'; }).join("")+'</dl>'+mindatEnlace(id):'<p style="margin:1rem 0 .4rem">'+esc(L(e.nota))+'</p><p class="pequeno" style="margin:0">'+U("esp.fuente")+'</p>')+'</div></details>';
  if(micro.length>1) h+='<h2 style="margin-top:2rem">'+U("ficha.micro")+'</h2><div class="mosaico">'+micro.slice(1).map(function(i){return fig(i);}).join("")+'</div>';
  h+='<h2 style="margin-top:2rem">'+U("ficha.estructura")+'</h2><div class="dos-col" style="align-items:start">'+(M3D_DE[id]?'<div class="lienzo3d claro" id="vm3d"><span class="aviso">'+U("girar")+'</span></div>':'<div></div>')+'<div class="panel">'+dibujoMineral(m,{d:(m.lam.t==="fibra"||m.lam.t==="inter"||m.lam.t==="rollo"||m.lam.t==="onda"||Array.isArray(m.lam.inter))?null:num(m.d.split(/[ ;(]/)[0])+" Å"})+leyenda(clavesLeyenda(m),m)+'</div></div>';
  if(m.espana&&m.espana.length) h+='<h2 style="margin-top:2rem">'+U("ficha.espana")+'</h2><ul>'+m.espana.map(function(k){ return '<li>'+esc(L(MAPA.lugares[k]).n)+'</li>'; }).join("")+'</ul><a class="boton claro" href="#yacimientos">'+U("ficha.verMapa")+'</a>';
  if(mano.length) h+='<h2 style="margin-top:2rem">'+U("ficha.mano")+'</h2><div class="mosaico">'+mano.map(function(i){return fig(i);}).join("")+'</div>';
  h+=modDeMineral(id);
  h+='</div>'; main.innerHTML=h;
  if(M3D_DE[id]) crear3D($("#vm3d"),M3D_DE[id],{autoRotate:true});
};

/* ---- propiedades ---- */
var propSel="cic", PROP_MIN=["caolinita","halloysita","illita","montmorillonita","saponita","vermiculita","clorita","sepiolita","palygorskita"];
P.propiedades=function(){
  var ks=["cic","se","hinch","plast"];
  main.innerHTML=cabezaPagina(navI("propiedades")[1],U("propE"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><div class="filtros">'+ks.map(function(k){ return '<button class="filtro" data-p="'+k+'">'+U("props."+k)+'</button>'; }).join("")+'</div><p id="ptxt" class="lectura"></p><div id="barras" style=""></div><div id="pmas" class="lectura" style="margin-top:1.6rem"></div>'+
   '<div class="mosaico" style="margin-top:2rem">'+imgSEA("estevensita").slice(0,1).concat(imgSEA("montmorillonita").slice(2,3),imgIOC("montmorillonita").slice(0,1)).map(function(i){return fig(i);}).join("")+'</div></div>';
  function pinta(){ $$("[data-p]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-p")===propSel); }); $("#ptxt").textContent=U("propTxt."+propSel); $("#pmas").innerHTML=L(PROP_TXT[propSel]).map(function(x){ return '<p>'+esc(x)+'</p>'; }).join("");
    var max=propSel==="cic"?200:(propSel==="se"?800:4);
    $("#barras").innerHTML=PROP_MIN.map(function(id){ var m=minById(id),a,b,val,iz,an;
      if(propSel==="cic"||propSel==="se"){ a=m[propSel][0]; b=m[propSel][1]; val=num(a)+"–"+num(b)+" "+(propSel==="cic"?U("cicU"):U("seU")); iz=a/max*100; an=Math.max(1.5,(b-a)/max*100); }
      else { b=m[propSel]; val=U("niveles")[b]; iz=0; an=Math.max(1.5,b/max*100); }
      return '<div class="fila-barra"><a href="#mineral/'+id+'">'+esc(L(m).n)+'</a><div class="pista"><div class="rango" style="left:'+iz+'%;width:'+an+'%"></div></div><div class="valor">'+val+'</div></div>'; }).join(""); }
  $$("[data-p]").forEach(function(b){ b.onclick=function(){ propSel=b.getAttribute("data-p"); pinta(); }; }); pinta();
};

function navI(id){ return U("nav.arcillas").filter(function(x){ return x[0]===id; })[0]; }
var GRUPOS_APL=[
 {id:"ceram",es:"Cerámica, construcción y patrimonio",en:"Ceramics, construction and heritage",ids:["ceramica","estructural","azulejos","refractarios","cemento","aislamiento","azulmaya"]},
 {id:"indus",es:"Industria",en:"Industry",ids:["papel","cargas","perforacion","fundicion","pelets"]},
 {id:"ambiente",es:"Medio ambiente e ingeniería",en:"Environment and engineering",ids:["agua","absorbentes","ingenieria","barreras"]},
 {id:"salud",es:"Salud, alimentación y agricultura",en:"Health, food and agriculture",ids:["farmacia","alimentos","pienso","agricultura"]},
 {id:"nuevos",es:"Nuevos materiales y energía",en:"New materials and energy",ids:["catalisis","nanocompuestos","litio"]}];
var tarjetaApl=function(a){
    var im=null; for(var i=0;i<a.m.length&&!im;i++) im=primeraImg(a.m[i]);
    return '<div class="apl">'+(im?'<img loading="lazy" src="'+im.mini+'" alt="">':'<span></span>')+'<div><h2 class="h3">'+esc(L(a).n)+'</h2><p>'+esc(L(a).t)+'</p><p class="apl-min">'+a.m.map(function(id){ return '<a href="#mineral/'+id+'">'+esc(L(minById(id)).n)+'</a>'; }).join(", ")+'</p>'+aportes(a.id)+'</div></div>'; };
var aplTab="ceram";
function modDeApl(id){ var M=[]; (window.MODIFICADAS||[]).forEach(function(g){ g.items.forEach(function(m){ if(m.ap&&m.ap.indexOf(id)>=0) M.push(m); }); });
  return M.length?' · '+M.map(function(m){ return '<a href="#modificadas">'+esc(m[lang].n)+'</a>'; }).join(", "):''; }
function bloquesApl(){ var byId={}; APLICACIONES.forEach(function(x){ byId[x.id]=x; });
  var g=GRUPOS_APL.filter(function(q){ return q.id===aplTab; })[0]||GRUPOS_APL[0];
  return '<div class="filtros salto-apl">'+GRUPOS_APL.map(function(q){ return '<button class="filtro" data-tab="'+q.id+'" aria-pressed="'+(q.id===g.id)+'">'+esc(q[lang])+'</button>'; }).join("")+'</div>'+
   '<div class="aplic">'+g.ids.filter(function(i){ return byId[i]; }).map(function(i){ return tarjetaApl(byId[i]).replace(/(<p class="apl-min">[\s\S]*?)(<\/p>)/,function(_,p1,p2){ return p1+modDeApl(i)+p2; }).replace('<div class="apl">','<div class="apl" id="apl-'+i+'">'); }).join("")+'</div>'; }
/* ---- aplicaciones ---- */
/* Nombres de autor: las palabras escritas enteras en mayúsculas pasan a minúsculas con inicial mayúscula */
function nomAutor(t){ return String(t||"").replace(/\s+/g," ").replace(/[A-ZÁÉÍÓÚÑÜÇ][A-ZÁÉÍÓÚÑÜÇ'’-]+/g,function(w){ return w.length<2?w:w.split("-").map(function(p){ return p.charAt(0)+p.slice(1).toLowerCase(); }).join("-"); }).replace(/\b(De|Del|La|Las|Los|Y)\b(?= [A-ZÁÉÍÓÚ])/g,function(p,q,i){ return i?p.toLowerCase():p; }); }
function refLi(z){ var es=lang==="es", a=nomAutor(z.a); return '<li>'+esc(es?a:a.replace(" y otros"," et al."))+' ('+z.y+'). '+(z.doi||z.url?'<a href="'+(z.doi?'https://doi.org/'+z.doi:z.url)+'" target="_blank" rel="noopener">'+esc(z.t)+'</a>':esc(z.t))+'. <i>'+esc(String(z.r||"").replace(/\s+\d[\d()]*\s*:.*$/,""))+'</i>.</li>'; }
function otrasES(id){ var O=(window.OTRAS_ES||{})[id]; if(!O||!O.length) return "";
  return '<details class="aport"><summary>'+U("otrasT")+' ('+O.length+')</summary><p class="pequeno">'+U("otrasI")+'</p><ul>'+O.map(refLi).join("")+'</ul></details>'; }
function destacados(id){ var D=(window.DESTACADOS||{})[id], es=lang==="es"; if(!D||!D.length) return "";
  return '<div class="destacados"><h3 class="h4">'+(es?"Trabajos destacados de socios":"Highlighted work by members")+'</h3>'+D.map(function(z){ var t=L(z); return '<article><h4 class="h5">'+esc(t.t)+'</h4><p>'+esc(t.x)+'</p><p class="dest-ref">'+esc(es?z.a:z.a.replace(/ y otros/g," et al.").replace(/ y /g," and "))+' ('+z.y+'). <i>'+esc(z.r)+'</i>. <a href="https://doi.org/'+esc(z.doi)+'" target="_blank" rel="noopener">'+(es?"Ver el artículo":"View the article")+'</a>'+(z.c?' · '+z.c+' '+(es?"citas":"citations"):'')+'</p></article>'; }).join("")+'</div>'; }
function sinDest(id,A){ var d=((window.DESTACADOS||{})[id]||[]).map(function(z){ return z.doi.toLowerCase(); }); return (A||[]).filter(function(z){ return d.indexOf(String(z.doi||"").toLowerCase())<0; }); }
function aportes(id){ var A=sinDest(id,(window.APORTES||{})[id]);
  return destacados(id)+(A&&A.length?'<details class="aport"><summary>'+U("aportT")+' ('+A.length+')</summary><ul>'+A.map(refLi).join("")+'</ul></details>':'')+otrasES(id); }
P.aplicaciones=function(arg){ if(arg){ GRUPOS_APL.forEach(function(q){ if(q.ids.indexOf(arg)>=0) aplTab=q.id; }); }
  main.innerHTML=cabezaPagina(navI("aplicaciones")[1],U("aplE"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><p class="intro-aport">'+U("aportI")+'</p>'+bloquesApl()+'</div>';
  var caja=$(".salto-apl").parentNode;
  function activa(){ $$('[data-tab]').forEach(function(b){ b.onclick=function(){ aplTab=b.getAttribute('data-tab'); var t=document.createElement('div'); t.innerHTML=bloquesApl(); $(".salto-apl").nextElementSibling.remove(); $(".salto-apl").replaceWith(t.firstChild); $(".salto-apl").after(t.firstChild); activa(); }; }); }
  activa(); if(arg){ var c=document.getElementById("apl-"+arg); if(c) setTimeout(function(){ c.scrollIntoView({block:"center"}); },50); }
};

/* ---- yacimientos ---- */
function tipoLugar(k){ if(MAPA.lugares[k]&&MAPA.lugares[k].tipo) return MAPA.lugares[k].tipo; if(["vicalvaro","toledosep","orera","bercimuel","torrejonrubio"].indexOf(k)>=0) return "fibrosa"; if(["gata","cuevas"].indexOf(k)>=0) return "bentonita"; return "caolin"; }
var COL_L={fibrosa:"#b88733",bentonita:"#8f3f22",caolin:"#ffffff",comun:"#6f97bd",talco:"#7fae7a",halloysita:"#c9a3d6",otros:"#5d5248"};
function mapaMundo(){ var W=window.MUNDO_MAPA, es=lang==="es", T={caolin:es?"Caolín y arcillas de bola":"Kaolin and ball clays",bentonita:"Bentonita",fibrosa:es?"Sepiolita y palygorskita":"Sepiolite and palygorskite",halloysita:"Halloysita",otros:es?"Otros (vermiculita, hectorita, talco, litio)":"Others (vermiculite, hectorite, talc, lithium)"};
  if(!W) return "";
  var pts=W.puntos.map(function(q){ return '<g class="pmundo" data-w="'+q.id+'"><circle cx="'+q.xy[0]+'" cy="'+q.xy[1]+'" r="6.5" fill="'+COL_L[q.t]+'" stroke="'+(q.t==="caolin"?"#5d5248":"#fff")+'" stroke-width="1.6"><title>'+esc(es?q.es:q.en)+'</title></circle></g>'; }).join("");
  var svg='<svg class="mundo" viewBox="0 0 '+W.W+' '+W.H+'" role="img" aria-label="'+U("mundo")+'"><path d="'+W.esfera+'" fill="#eaf0f3"/><path d="'+W.tierra+'" fill="#e4d9c6" stroke="#b49c7c" stroke-width=".6"/>'+pts+'</svg>';
  var ley='<div class="leyenda">'+Object.keys(T).map(function(k){ return '<span><i style="background:'+COL_L[k]+';border-radius:50%'+(k==="caolin"?';border:2px solid #5d5248':'')+'"></i>'+T[k]+'</span>'; }).join("")+'</div>';
  var lista='<div class="lista-mundo2">'+Object.keys(T).map(function(k){ var q=W.puntos.filter(function(x){return x.t===k;}); return '<div><h3 class="h4">'+T[k]+'</h3><ul>'+q.map(function(x){ return '<li>'+esc((es?x.es:x.en).replace(/^[^:]+: /,""))+'</li>'; }).join("")+'</ul></div>'; }).join("")+'</div>';
  return svg+ley+lista; }
P.yacimientos=function(){
  var M=MAPA,pts="";
  Object.keys(M.lugares).forEach(function(k){ var p=M.lugares[k],t=tipoLugar(k),pas=p.estado==="pasado";
    pts+='<g class="punto" data-l="'+k+'" tabindex="0" role="button" aria-label="'+esc(L(p).n)+'"><circle cx="'+p.xy[0]+'" cy="'+p.xy[1]+'" r="15" fill="'+(pas?"#f6f3ee":COL_L[t])+'" stroke="'+(t==="caolin"?"#5d5248":COL_L[t])+'" stroke-width="'+(pas?4:2.5)+'"/></g>'; });
  var svg='<svg viewBox="0 0 '+M.W+' '+M.H+'" role="group" aria-label="'+navI("yacimientos")[1]+'">'+(M.vecinos||[]).map(function(d){ return '<path d="'+d+'" fill="#efe9de" stroke="#d9cdb8"/>'; }).join("")+'<path d="'+M.peninsula+'" fill="#e4d9c6" stroke="#b49c7c" stroke-width="2"/>'+M.islas.map(function(d){ return '<path d="'+d+'" fill="#e4d9c6" stroke="#b49c7c" stroke-width="2"/>'; }).join("")+pts+'</svg>';
  var ly=U("leyMapa");
  main.innerHTML=cabezaPagina(navI("yacimientos")[1],U("yacE"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><div class="mapa"><div>'+svg+'<div class="leyenda"><span><i style="background:#b88733;border-radius:50%"></i>'+ly.fibrosa+'</span><span><i style="background:#8f3f22;border-radius:50%"></i>'+ly.bentonita+'</span><span><i style="background:#fff;border:2px solid #5d5248;border-radius:50%"></i>'+ly.caolin+'</span><span><i style="background:#6f97bd;border-radius:50%"></i>'+(lang==="es"?"Arcillas comunes para cerámica":"Common clays for ceramics")+'</span><span><i style="background:#7fae7a;border-radius:50%"></i>'+(lang==="es"?"Talco":"Talc")+'</span><span><i style="background:#f6f3ee;border:3px solid #8f3f22;border-radius:50%"></i>'+ly.pasado+'</span></div></div><div id="info"></div></div>'+
   '<h2 style="margin-top:2.25rem">'+U("mundo")+'</h2>'+mapaMundo()+'</div>';
  function ver(k){ var p=M.lugares[k]; $$(".punto").forEach(function(g){ g.classList.toggle("activo",g.getAttribute("data-l")===k); });
    var ms=MINERALES.filter(function(m){ return m.espana&&m.espana.indexOf(k)>=0; });
    $("#info").innerHTML='<p class="pequeno">'+(p.estado==="pasado"?U("pasado"):U("hoy"))+'</p><h2 class="h3">'+esc(L(p).n)+'</h2><p>'+esc(L(p).t)+'</p>'+(ms.length?'<p>'+ms.map(function(m){ return '<a class="boton claro" style="margin:0 .4rem .4rem 0" href="#mineral/'+m.id+'">'+esc(L(m).n)+'</a>'; }).join("")+'</p>':''); }
  $$(".punto").forEach(function(g){ g.onclick=function(){ ver(g.getAttribute("data-l")); }; g.onkeydown=function(e){ if(e.key==="Enter") ver(g.getAttribute("data-l")); }; });
  ver("vicalvaro");
};

/* ---- estudio (DRX) ---- */
var drxSel="montmorillonita", drxOn={AO:true,EG:true,C:true}, DRX_COL={AO:"#26201b",EG:"#4b7398",C:"#8f3f22"};
function dosTheta(d){ return 2*Math.asin(1.5406/(2*d))*180/Math.PI; }
function dDesde(t){ return 1.5406/(2*Math.sin(t/2*Math.PI/180)); }
function picosMezcla(t){ var o=[]; [["caolinita",.6],["illita",.5],["montmorillonita",.8],["clorita",.5]].forEach(function(e){ DRX[e[0]][t].forEach(function(p){ o.push([p[0],p[1]*e[1]]); }); }); return o; }
function svgDRX(){
  var W=640,H=380,x0=50,x1=620,y0=340,lo=2,hi=32; function X(t){ return x0+(t-lo)/(hi-lo)*(x1-x0); }
  var s='<line x1="'+x0+'" y1="'+y0+'" x2="'+x1+'" y2="'+y0+'" stroke="#26201b"/>';
  for(var t=lo;t<=hi;t+=2) s+='<line x1="'+X(t)+'" y1="'+y0+'" x2="'+X(t)+'" y2="'+(y0+5)+'" stroke="#26201b"/><text x="'+X(t)+'" y="'+(y0+20)+'" font-size="12" text-anchor="middle" fill="#5d5248">'+t+'</text>';
  s+='<text x="'+((x0+x1)/2)+'" y="'+(y0+36)+'" font-size="13" text-anchor="middle" fill="#26201b">'+U("grados")+'</text>';
  var desp={AO:0,EG:100,C:200};
  ["AO","EG","C"].forEach(function(k){ if(!drxOn[k]) return;
    var picos=drxSel==="mezcla"?picosMezcla(k):DRX[drxSel][k], base=y0-8-desp[k], path="", aB=(drxSel==="montmorillonita"||drxSel==="mezcla")?.55:.3;
    for(var px=x0;px<=x1;px+=1.5){ var tt=lo+(px-x0)/(x1-x0)*(hi-lo),yv=0; picos.forEach(function(p){ var c=dosTheta(p[0]),wd=(p[0]>11&&p[0]<18&&aB>.4)?.8:aB; yv+=p[1]*Math.exp(-Math.pow((tt-c)/wd,2)); }); yv+=6*Math.exp(-(tt-lo)/3); path+=(px===x0?"M":"L")+px.toFixed(1)+","+(base-yv*.75).toFixed(1); }
    s+='<path d="'+path+'" fill="none" stroke="'+DRX_COL[k]+'" stroke-width="2"/><text x="'+(x1-4)+'" y="'+(base-8)+'" font-size="12" text-anchor="end" fill="'+DRX_COL[k]+'" font-weight="600">'+U(k)+'</text>';
    var pu=[]; picos.slice().sort(function(a,b){return b[1]-a[1];}).forEach(function(p){ var c=dosTheta(p[0]); if((p[1]>=45||drxSel!=="mezcla"&&p[1]>=30)&&pu.every(function(q){return Math.abs(q-c)>1.2;})){ pu.push(c); s+='<text x="'+X(c)+'" y="'+(base-p[1]*.75-6)+'" font-size="11" text-anchor="middle" fill="'+DRX_COL[k]+'">'+num(p[0])+' Å</text>'; } }); });
  s+='<g id="cursor" style="display:none"><line id="cl" y1="20" y2="'+y0+'" stroke="#b88733" stroke-dasharray="3 3"/><rect id="cr" y="8" width="150" height="24" rx="12" fill="#26201b"/><text id="ct" y="25" font-size="12.5" fill="#fff" text-anchor="middle"></text></g>';
  return '<svg id="drxsvg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+U("drxTit")+'">'+s+'</svg>';
}
P.evolucion=function(){ var es=lang==="es", E=(window.EVOLUCION||{})[lang]; if(!E){ main.innerHTML=""; return; }
  function drxMini(){ var D=(window.DRX||{}).montmorillonita; if(!D) return ""; var W=300,H=150,x0=8,x1=292;
    function tt(d){ return 2*Math.asin(1.5406/(2*d))*180/Math.PI; } function X(t){ return x0+(t-2)/(14-2)*(x1-x0); }
    function curva(p,base,col){ var dd=""; for(var t=2;t<=14;t+=.05){ var y=0; p.forEach(function(q){ var c=tt(q[0]); y+=q[1]*Math.exp(-Math.pow((t-c)/.28,2)); }); dd+=(dd?"L":"M")+X(t).toFixed(1)+","+(base-y*.42).toFixed(1); } return '<path d="'+dd+'" fill="none" stroke="'+col+'" stroke-width="2"/>'; }
    var a=X(tt(14.5)), b=X(tt(17));
    return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(es?"Difractograma de una esmectita en seco y con etilenglicol":"Diffraction pattern of a smectite air-dried and with ethylene glycol")+'">'+curva(D.EG,62,"#a0522d")+curva(D.AO,132,"#3b6e8f")+
      '<text x="'+(b+8)+'" y="24" font-size="11" fill="#a0522d">17 Å · '+(es?"etilenglicol":"glycol")+'</text><text x="'+(a+8)+'" y="94" font-size="11" fill="#3b6e8f">14,5 Å · '+(es?"en seco":"air-dried")+'</text><line x1="'+x0+'" y1="138" x2="'+x1+'" y2="138" stroke="#bbb"/><text x="'+x1+'" y="149" font-size="10" text-anchor="end" fill="#777">°2θ</text></svg>'; }
  function vis(k){
    if(k==="drx") return '<div class="ev-vis ev-svg">'+drxMini()+'</div>';
    if(k==="sem"||k==="tem"){ var L2=imgIOC(k==="sem"?"caolinita":"halloysita"), im=k==="sem"?L2[0]:(L2.filter(function(x){ return /TEM/.test(x.cap); })[0]||L2[0]); if(!im) return '<div class="ev-vis"></div>';
      return '<button type="button" class="ev-vis" data-ver="'+esc(im.src)+'" data-cap="'+esc(im.cap)+'" aria-label="'+esc(im.nombre)+'"><img loading="lazy" src="'+im.mini+'" alt="'+esc(im.nombre)+'"></button><p class="pequeno ev-cred">'+(es?"Imagen":"Image")+': '+esc(im.autor)+'. Images of Clay.</p>'; }
    return '<div class="ev-vis ev-svg">'+svgLaminas({seq:"TOT",oct:"di",inter:"K"},{reps:2,w:300})+'</div>'; }
  var miradas='<section class="ev-miradas"><h2>'+esc(E.miradasTit)+'</h2><p class="entrada">'+esc(E.miradasE)+'</p><div class="ev-mgrid">'+E.miradas.map(function(m){ return '<article>'+vis(m.k)+'<h3>'+esc(m.t)+'</h3><p class="ev-desde">'+esc(m.a)+'</p><p>'+esc(m.x)+'</p>'+(m.l?'<p><a href="'+m.l[0]+'">'+esc(m.l[1])+'</a></p>':'')+'</article>'; }).join("")+'</div></section>';
  var nav='<nav class="ev-nav" aria-label="'+(es?"Etapas":"Periods")+'">'+E.etapas.map(function(e,i){ return '<button type="button" data-ev="'+i+'">'+esc(e.p)+'</button>'; }).join("")+'</nav>';
  var etapas=E.etapas.map(function(e,i){ return '<section class="ev-etapa" id="ev-'+i+'"><div class="ev-cab"><span class="ev-periodo">'+esc(e.p)+'</span><h2>'+esc(e.t)+'</h2><p>'+esc(e.e)+'</p></div><ol class="ev-hitos">'+e.h.map(function(x){ return '<li'+(x[2]?' class="ev-es"':'')+'><span class="ev-anio">'+esc(x[0])+(x[2]?' <span class="ev-marca">'+esc(E.hitoEs)+'</span>':'')+'</span><p>'+esc(x[1])+'</p></li>'; }).join("")+'</ol></section>'; }).join("");
  var esp='<section class="ev-espana"><h2>'+esc(E.espTit)+'</h2><p class="entrada">'+esc(E.espE)+'</p><div class="ev-personas">'+E.esp.map(function(p){ var foto=p.s&&SEA.semblanzasFoto[p.s], ini=p.n.split(" ").filter(function(w){ return /^[A-ZÁÉÍÓÚ]/.test(w); }).slice(0,2).map(function(w){ return w[0]; }).join("");
      return '<article>'+(foto?'<img src="'+seaImg(foto)+'" alt="'+esc(p.n)+'">':'<div class="sinfoto">'+ini+'</div>')+'<div><h3>'+esc(p.n)+'</h3><p class="ev-desde">'+esc(p.v)+'</p><p>'+esc(p.t)+'</p>'+(p.s?'<p><a href="#semblanza/'+p.s+'">'+(es?"Leer su semblanza":"Read the profile")+'</a></p>':'')+'</div></article>'; }).join("")+'</div>'+(E.esp2?'<h3 class="ev-esp2t">'+esc(E.esp2Tit)+'</h3><p class="ev-esp2e">'+esc(E.esp2E)+'</p><ul class="ev-esp2">'+E.esp2.map(function(p){ return '<li><b>'+esc(p.n)+'</b> <span class="ev-desde">'+esc(p.d)+'</span><br>'+esc(p.t)+'</li>'; }).join("")+'</ul>':'')+'<p class="ev-fin">'+esc(E.espFin)+'</p></section>';
  var fibr=E.fibr?'<section class="ev-fibr"><h2>'+esc(E.fibrTit)+'</h2><p class="entrada">'+esc(E.fibrE)+'</p><div class="ev-cgrid">'+E.fibr.map(function(c){ return '<div><h3>'+esc(c[0])+'</h3><p>'+esc(c[1])+'</p></div>'; }).join("")+'</div><p class="ev-mas"><a href="#historia/sepiolita">'+esc(E.fibrVer)+'</a> · <a href="#mineral/sepiolita">'+esc(L(minById("sepiolita")).n)+'</a> · <a href="#mineral/palygorskita">'+esc(L(minById("palygorskita")).n)+'</a></p></section>':'';
  var cambios='<section class="ev-cambios"><h2>'+esc(E.cambiosTit)+'</h2><p class="entrada">'+esc(E.cambiosE)+'</p><div class="ev-cgrid">'+E.cambios.map(function(c){ return '<div><h3>'+esc(c[0])+'</h3><p>'+esc(c[1])+'</p></div>'; }).join("")+'</div></section>';
  var hoy='<section class="ev-hoy"><h2>'+esc(E.hoyTit)+'</h2><div class="ev-hgrid">'+E.hoy.map(function(x){ return '<div><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></div>'; }).join("")+'</div><p class="ev-mas">'+esc(E.verTambien)+': <a href="#aplicaciones">'+esc(navI("aplicaciones")[1])+'</a> · <a href="#geologia">'+esc(navI("geologia")[1])+'</a> · <a href="#modificadas">'+esc(navI("modificadas")[1])+'</a></p></section>';
  var fuentes='<h3 style="margin-top:2.5rem">'+esc(E.fuentesTit)+'</h3><ul class="lista-pub ev-fuentes">'+window.EVOLUCION.fuentes.map(function(f){ return '<li><a href="'+esc(f[1])+'" target="_blank" rel="noopener">'+esc(es?f[0]:f[0].replace(/ y /g," and "))+'</a></li>'; }).join("")+'</ul>';
  main.innerHTML=cabezaPagina(E.titulo,E.entrada)+'<div class="envoltorio pagina-cuerpo evolucion">'+miradas+'<h2 class="ev-tit-linea">'+(es?"Un siglo de descubrimientos":"A century of discoveries")+'</h2>'+nav+etapas+esp+fibr+cambios+hoy+fuentes+'</div>';
  main.querySelector(".ev-nav").addEventListener("click",function(e){ var b=e.target.closest("[data-ev]"); if(!b) return; var t=document.getElementById("ev-"+b.dataset.ev); if(t) t.scrollIntoView({behavior:"smooth",block:"start"}); });
};
P.estudio=function(){
  var lista=Object.keys(DRX).concat(["mezcla"]);
  main.innerHTML=cabezaPagina(navI("estudio")[1],U("estuE"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><h2>'+U("drxTit")+'</h2><p class="lectura">'+U("drxE")+'</p><div class="filtros">'+lista.map(function(id){ return '<button class="filtro" data-drx="'+id+'">'+(id==="mezcla"?U("mezcla"):esc(L(minById(id)).n))+'</button>'; }).join("")+'</div>'+
   '<div class="drx"><div><div id="graf"></div><p class="pequeno" style="margin:.5rem 0 0">'+(lang==="es"?"Pasa el ratón o el dedo por el difractograma para leer el ángulo 2θ y el espaciado d correspondiente.":"Move the mouse or your finger over the diffractogram to read the 2θ angle and the corresponding d-spacing.")+'</p></div><div><div class="tratamientos">'+["AO","EG","C"].map(function(k){ return '<button class="trat" data-t="'+k+'" style="border-color:'+DRX_COL[k]+';color:'+DRX_COL[k]+'">'+U(k)+'</button>'; }).join("")+'</div><p id="drxTxt" style="margin-top:1rem"></p><p class="pequeno">'+U("marte")+' <a href="#historia/marte">'+esc(L(HISTORIAS[2]).n)+'</a></p></div></div>'+
   seccionIR()+seccionATD()+
   '<h2 style="margin-top:3rem">'+U("tecnicas")+'</h2><div class="indice">'+TECNICAS.filter(function(t){return ["drx","ir","termico"].indexOf(t.id)<0;}).map(function(t){ var im=t.id==="sem"?imgSEA("caolinita")[0]:(t.id==="tem"?imgIOC("caolinita")[2]:null);
     return '<div style="display:grid;grid-template-columns:'+(im?'96px ':'')+'1fr;gap:1.1rem;padding:1.2rem 0;border-bottom:1px solid var(--sepiolita2)">'+(im?'<span style="width:96px;height:96px;border-radius:3px;overflow:hidden;background:#1c1d1f"><img loading="lazy" src="'+im.mini+'" alt="" style="width:100%;height:100%;object-fit:cover"></span>':'')+'<span><h3 style="font-size:var(--f-l);margin-bottom:.3rem">'+esc(L(t).n)+'</h3><p style="margin:0">'+esc(L(t).t)+'</p></span></div>'; }).join("")+'</div>'+
   seccionNuevas()+
   '</div>';
  function pinta(){ $$("[data-drx]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-drx")===drxSel); }); $$("[data-t]").forEach(function(b){ b.setAttribute("aria-pressed",!!drxOn[b.getAttribute("data-t")]); });
    $("#graf").innerHTML=svgDRX(); cursorDRX();
    $("#drxTxt").textContent=drxSel==="mezcla"?(lang==="es"?"En una muestra real se mezclan varios minerales. El pico de 17 Å con etilenglicol delata la esmectita; a 550 °C desaparece el de 7 Å de la caolinita y queda el de 14 Å de la clorita; el de 10 Å de la illita no se mueve.":"Real samples mix several minerals. The 17 Å peak with ethylene glycol gives the smectite away; at 550 °C kaolinite’s 7 Å peak disappears and chlorite’s 14 Å peak remains; illite’s 10 Å peak does not move."):L(DRX[drxSel]); }
  $$("[data-drx]").forEach(function(b){ b.onclick=function(){ drxSel=b.getAttribute("data-drx"); pinta(); }; });
  $$("[data-t]").forEach(function(b){ b.onclick=function(){ var k=b.getAttribute("data-t"); drxOn[k]=!drxOn[k]; pinta(); }; });
  pinta(); activaIR(); activaATD();
};
function seccionNuevas(){ var T=window.TEC_NUEVAS; if(!T) return ""; var es=lang==="es", I=window.TEC_INFRA;
  return '<h2 style="margin-top:3rem">'+(es?"Técnicas avanzadas y de última generación":"Advanced and state-of-the-art techniques")+'</h2><p class="lectura">'+(es?"Además de las técnicas clásicas, hoy se estudian las arcillas lámina a lámina, en agua, en tres dimensiones y en tiempo real. Estas son las más destacadas, para qué sirven y qué información dan.":"Beyond the classical techniques, clays are now studied layer by layer, in water, in three dimensions and in real time. These are the most important, what they are for and what they reveal.")+'</p>'+
   T.map(function(g){ return '<h3 class="tn-grupo">'+esc(g.g[lang])+'</h3><div class="tn">'+g.items.map(function(t){ var x=t[lang]; return '<div class="tn-it"><h3 class="h4">'+esc(x.n)+'</h3><p>'+esc(x.p)+'</p><p><b>'+(es?"Qué se obtiene: ":"What it gives: ")+'</b>'+esc(x.o)+'</p>'+(t.ref?'<p class="pequeno">'+(es?"Ejemplo: ":"Example: ")+'<a href="'+t.ref.u+'" target="_blank" rel="noopener">'+esc(t.ref.t)+'</a></p>':'')+'</div>'; }).join("")+'</div>'; }).join("")+
   (I?'<h3 class="tn-grupo">'+esc(I.t[lang])+'</h3><p>'+esc(I.intro[lang])+'</p>'+I.grupos.map(function(g){ return '<h3 class="h4" style="margin-top:1.2rem">'+esc(g.t[lang])+'</h3><ul class="infra">'+(g.items.length>5?g.items.slice().sort(function(p,q){ return p.l.localeCompare(q.l,"es"); }):g.items).map(function(x){ return '<li><a href="'+x.u+'" target="_blank" rel="noopener">'+esc(x.n)+'</a> <span class="pequeno">('+esc(x.l)+')</span>. '+esc(x.d[lang])+'</li>'; }).join("")+'</ul>'; }).join("")+'<p class="pequeno"><a href="'+I.nu+'" target="_blank" rel="noopener">'+esc(I.nota[lang])+'</a></p>':''); }
/* ---- infrarrojo y análisis térmico ---- */
var irSel="caolinita", atdSel="caolinita";
function seccionIR(){ var es=lang==="es";
  return '<h2 style="margin-top:3rem">'+(es?"Espectroscopia infrarroja":"Infrared spectroscopy")+'</h2><p class="lectura">'+(es?"La radiación infrarroja hace vibrar los enlaces de la estructura. Cada mineral absorbe a números de onda característicos: los grupos OH entre 3750 y 3400 cm⁻¹, el agua hacia 3400 y 1630 cm⁻¹, los enlaces Si–O entre 1200 y 950 cm⁻¹ y las deformaciones de los OH unidos a los cationes octaédricos entre 950 y 800 cm⁻¹. Es rápida, necesita muy poca muestra y es muy sensible al orden estructural y a la composición de la capa octaédrica. Se usa en transmisión, con pastillas de KBr, o en reflexión total atenuada (ATR); el infrarrojo cercano permite además medir en el campo y, desde satélites y sondas, identificar arcillas en Marte.":"Infrared radiation makes the bonds of the structure vibrate. Each mineral absorbs at characteristic wavenumbers: OH groups between 3750 and 3400 cm⁻¹, water near 3400 and 1630 cm⁻¹, Si–O bonds between 1200 and 950 cm⁻¹, and bending of OH groups bonded to octahedral cations between 950 and 800 cm⁻¹. It is fast, needs very little sample and is very sensitive to structural order and to the composition of the octahedral sheet. It is used in transmission, with KBr pellets, or attenuated total reflectance (ATR); near-infrared also allows field measurements and, from satellites and probes, the identification of clays on Mars.")+'</p><div class="filtros">'+Object.keys(IR).map(function(id){ return '<button class="filtro" data-irm="'+id+'">'+esc(L(minById(id)).n)+'</button>'; }).join("")+'</div><div class="drx"><div id="grafIR"></div><div><p id="irTxt"></p><p class="pequeno">'+(es?"Espectros esquemáticos con las bandas descritas por Madejová (2003) y Farmer (1974). Absorbancia hacia arriba.":"Schematic spectra with the bands described by Madejová (2003) and Farmer (1974). Absorbance upwards.")+'</p></div></div>'; }
function svgIR(){ var W=640,H=300,x0=40,x1=620,y0=250,hi=4000,lo=400,d=IR[irSel].b; function X(w){ return x0+(hi-w)/(hi-lo)*(x1-x0); }
  var s='<line x1="'+x0+'" y1="'+y0+'" x2="'+x1+'" y2="'+y0+'" stroke="#26201b"/>'; for(var w=4000;w>=400;w-=400) s+='<line x1="'+X(w)+'" y1="'+y0+'" x2="'+X(w)+'" y2="'+(y0+5)+'" stroke="#26201b"/><text x="'+X(w)+'" y="'+(y0+19)+'" font-size="12" text-anchor="middle" fill="#5d5248">'+w+'</text>';
  s+='<text x="'+((x0+x1)/2)+'" y="'+(y0+38)+'" font-size="13" text-anchor="middle" fill="#26201b">'+(lang==="es"?"Número de onda (cm⁻¹)":"Wavenumber (cm⁻¹)")+'</text>';
  var path=""; for(var px=x0;px<=x1;px+=1){ var wv=hi-(px-x0)/(x1-x0)*(hi-lo),a=0; d.forEach(function(b){ a+=b[1]*Math.exp(-Math.pow((wv-b[0])/(b[2]*1.8),2)); }); path+=(px===x0?"M":"L")+px+","+(y0-4-Math.min(a,120)*1.7).toFixed(1); }
  s+='<path d="'+path+'" fill="none" stroke="#4b7398" stroke-width="2"/>';
  var us=[]; d.slice().sort(function(a,b){return b[1]-a[1];}).forEach(function(b){ var x=X(b[0]); if(b[1]>=45&&us.every(function(u){return Math.abs(u-x)>26;})){ us.push(x); s+='<text x="'+x+'" y="'+(y0-10-Math.min(b[1],120)*1.7)+'" font-size="11" text-anchor="middle" fill="#4b7398">'+b[0]+'</text>'; } });
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(lang==="es"?"Espectro infrarrojo de ":"Infrared spectrum of ")+esc(L(minById(irSel)||{es:{n:irSel},en:{n:irSel}}).n)+'">'+s+'</svg>'; }
function activaIR(){ function pinta(){ $$("[data-irm]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-irm")===irSel); }); $("#grafIR").innerHTML=svgIR(); $("#irTxt").textContent=L(IR[irSel]); }
  $$("[data-irm]").forEach(function(b){ b.onclick=function(){ irSel=b.getAttribute("data-irm"); pinta(); }; }); pinta(); }
function seccionATD(){ var es=lang==="es";
  return '<h2 style="margin-top:3rem">'+(es?"Análisis térmico":"Thermal analysis")+'</h2><p class="lectura">'+(es?"Se calienta la muestra a velocidad constante, normalmente hasta unos 1000 °C. La termogravimetría (TG) registra la pérdida de masa; el análisis térmico diferencial (ATD) y la calorimetría diferencial de barrido (DSC), el calor absorbido o desprendido. Los picos endotérmicos corresponden a la pérdida de agua adsorbida, de agua interlaminar o de canales y a la deshidroxilación; los exotérmicos, a la cristalización de nuevas fases. La temperatura y la forma de cada pico son características de cada mineral, y la pérdida de masa permite estimar su proporción en la muestra.":"The sample is heated at a constant rate, usually up to about 1000 °C. Thermogravimetry (TG) records mass loss; differential thermal analysis (DTA) and differential scanning calorimetry (DSC) record the heat absorbed or released. Endothermic peaks correspond to the loss of adsorbed water, interlayer or channel water and to dehydroxylation; exothermic peaks to the crystallization of new phases. The temperature and shape of each peak are characteristic of each mineral, and mass loss allows its proportion in the sample to be estimated.")+'</p><div class="filtros">'+Object.keys(ATD).map(function(id){ return '<button class="filtro" data-atd="'+id+'">'+esc(L(minById(id)).n)+'</button>'; }).join("")+'</div><div class="drx"><div id="grafATD"></div><div><p id="atdTxt"></p><p class="pequeno">'+(es?"Curvas de ATD esquemáticas: hacia abajo, efectos endotérmicos; hacia arriba, exotérmicos.":"Schematic DTA curves: downwards, endothermic effects; upwards, exothermic.")+'</p></div></div>'; }
function svgATD(){ var W=640,H=300,x0=40,x1=620,ym=140,lo=20,hi=1100,d=ATD[atdSel].p; function X(t){ return x0+(t-lo)/(hi-lo)*(x1-x0); }
  var s='<line x1="'+x0+'" y1="262" x2="'+x1+'" y2="262" stroke="#26201b"/><line x1="'+x0+'" y1="'+ym+'" x2="'+x1+'" y2="'+ym+'" stroke="#d6c7ad" stroke-dasharray="3 3"/>';
  for(var t=100;t<=1100;t+=100) s+='<line x1="'+X(t)+'" y1="262" x2="'+X(t)+'" y2="267" stroke="#26201b"/><text x="'+X(t)+'" y="281" font-size="12" text-anchor="middle" fill="#5d5248">'+t+'</text>';
  s+='<text x="'+((x0+x1)/2)+'" y="298" font-size="13" text-anchor="middle" fill="#26201b">'+(lang==="es"?"Temperatura (°C)":"Temperature (°C)")+'</text><text x="'+(x0+4)+'" y="24" font-size="11" fill="#8f3f22">'+(lang==="es"?"exo":"exo")+' ↑</text><text x="'+(x0+4)+'" y="252" font-size="11" fill="#4b7398">'+(lang==="es"?"endo":"endo")+' ↓</text>';
  var path=""; for(var px=x0;px<=x1;px+=1){ var tt=lo+(px-x0)/(x1-x0)*(hi-lo),v=0; d.forEach(function(q){ v+=q[1]*Math.exp(-Math.pow((tt-q[0])/q[2],2)); }); path+=(px===x0?"M":"L")+px+","+(ym-v*1.05).toFixed(1); }
  s+='<path d="'+path+'" fill="none" stroke="#26201b" stroke-width="2"/>';
  d.forEach(function(q){ if(Math.abs(q[1])>=30){ var y=ym-q[1]*1.05; s+='<text x="'+X(q[0])+'" y="'+(q[1]<0?y+16:y-7)+'" font-size="11" text-anchor="middle" fill="'+(q[1]<0?"#4b7398":"#8f3f22")+'">'+q[0]+' °C</text>'; } });
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(lang==="es"?"Curva de análisis térmico diferencial de ":"Differential thermal analysis curve of ")+esc(L(minById(atdSel)||{es:{n:atdSel},en:{n:atdSel}}).n)+'">'+s+'</svg>'; }
function activaATD(){ function pinta(){ $$("[data-atd]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-atd")===atdSel); }); $("#grafATD").innerHTML=svgATD(); $("#atdTxt").textContent=L(ATD[atdSel]); }
  $$("[data-atd]").forEach(function(b){ b.onclick=function(){ atdSel=b.getAttribute("data-atd"); pinta(); }; }); pinta(); }
function cursorDRX(){ var sv=$("#drxsvg"); if(!sv) return; var g=$("#cursor",sv),l=$("#cl",sv),r=$("#cr",sv),t=$("#ct",sv);
  function mov(ev){ var p=ev.touches?ev.touches[0]:ev, rc=sv.getBoundingClientRect(), x=(p.clientX-rc.left)/rc.width*640; if(x<52||x>618){ g.style.display="none"; return; }
    var tt=2+(x-50)/570*30, d=dDesde(tt); g.style.display=""; l.setAttribute("x1",x); l.setAttribute("x2",x); var rx=Math.min(Math.max(x-75,0),490); r.setAttribute("x",rx); t.setAttribute("x",rx+75); t.textContent=num(tt.toFixed(2))+"°  d = "+num(d.toFixed(2))+" Å"; }
  sv.addEventListener("mousemove",mov); sv.addEventListener("touchmove",mov,{passive:true}); sv.addEventListener("touchstart",mov,{passive:true}); sv.addEventListener("mouseleave",function(){ g.style.display="none"; }); }

/* ---- galería ---- */
var galM="", galF="";
/* Trabajos de referencia de cada arcilla modificada: los de sus aplicaciones cuyo título trata de ese material, más los propios */
var CLAVE_MOD={"Organoarcillas":/organo|alkylammonium|surfactant|cationic/i,"Arcillas pilareadas":/pillar/i,"Arcillas activadas con ácido":/acid/i,"Arcillas calcinadas y geopolímeros":/metakaolin|geopolym|calcined|alkal[a-z]* activ/i,"Materiales híbridos y bionanocompuestos":/hybrid|bionanocomposite|biopolymer|chitosan|nanocomposite/i,"Nanotubos de halloysita":/halloysite/i,"Arcillas sintéticas":/synthetic/i};
function refsMod(m){ var re=CLAVE_MOD[m.es.n]; if(!re) return ""; var vistos={}, S=[], O=[];
  function mete(L,z){ var k=z.t.toLowerCase().replace(/[^a-z0-9]+/g,""); if(vistos[k]) return; vistos[k]=1; L.push(z); }
  var otras={}; m.ap.forEach(function(ap){ ((window.OTRAS_ES||{})[ap]||[]).forEach(function(z){ otras[z.t.toLowerCase()]=1; if(re.test(z.t)) mete(O,z); }); });
  (m.r||[]).forEach(function(z){ var w={a:z.a,y:z.y,t:z.t,r:z.j,c:z.c,doi:z.d}; if(otras[w.t.toLowerCase()]||/Fernández-Jiménez|Arroyo/.test(w.a)) mete(O,w); else mete(S,w); });
  m.ap.forEach(function(ap){ ((window.APORTES||{})[ap]||[]).forEach(function(z){ if(re.test(z.t)) mete(S,z); }); });
  function ord(L){ return L.sort(function(a,b){ return (b.p?1:0)-(a.p?1:0)||(b.c||0)-(a.c||0); }); }
  return (S.length?'<details class="aport"><summary>'+U("aportT")+' ('+S.length+')</summary><ul>'+ord(S).map(refLi).join("")+'</ul></details>':'')+(O.length?'<details class="aport"><summary>'+U("otrasT")+' ('+O.length+')</summary><p class="pequeno">'+U("otrasI")+'</p><ul>'+ord(O).map(refLi).join("")+'</ul></details>':''); }
function fichaMat(m,conEnlaces){ var es=lang==="es", x=m[lang];
  var enl=conEnlaces&&m.m?'<p class="apl-min">'+(es?"Minerales de partida: ":"Starting minerals: ")+m.m.map(function(id){ var mm=minById(id); return mm?'<a href="#mineral/'+id+'">'+esc(L(mm).n)+'</a>':''; }).filter(Boolean).join(", ")+'<br>'+(es?"Se usa en: ":"Used in: ")+m.ap.map(function(id){ var ap=APLICACIONES.filter(function(q){return q.id===id;})[0]; return ap?'<a href="#aplicaciones/'+id+'">'+esc(L(ap).n)+'</a>':''; }).filter(Boolean).join(", ")+'</p>':'';
  if(conEnlaces) enl+=refsMod(m);
  return '<div class="afin" id="mod-'+m.es.n.replace(/[^A-Za-zÁÉÍÓÚáéíóúñ]+/g,"-").toLowerCase()+'"><h3>'+esc(x.n)+'</h3><p>'+esc(x.t)+'</p>'+(conEnlaces?'':'<p><b>'+(es?"Aplicaciones: ":"Uses: ")+'</b>'+esc(x.u)+'</p>')+enl+(!conEnlaces&&m.r.length?'<details class="aport"><summary>'+U("aportT")+' ('+m.r.length+')</summary><ul>'+m.r.map(function(z){ return '<li>'+esc(es?z.a:z.a.replace(" y otros"," et al."))+' ('+z.y+'). <a href="https://doi.org/'+z.d+'" target="_blank" rel="noopener">'+esc(z.t)+'</a>. <i>'+esc(z.j)+'</i>.</li>'; }).join("")+'</ul></details>':'')+'</div>'; }
function paginaMat(id,ent,G,conEnlaces){ main.innerHTML=cabezaPagina(navI(id)[1],ent,migaArcillas())+'<div class="envoltorio pagina-cuerpo">'+G.map(function(g,gi){ return '<h2'+(gi?' style="margin-top:2.5rem"':'')+'>'+esc(g.g[lang])+'</h2>'+(g.i?'<p>'+esc(g.i[lang])+'</p>':'')+'<div class="afines">'+g.items.map(function(m){ return fichaMat(m,conEnlaces); }).join("")+'</div>'; }).join("")+'</div>'; }
P.afines=function(){ var es=lang==="es";
  paginaMat("afines",es?"Materiales laminares que no son minerales de la arcilla, pero comparten con ellas estructura, propiedades y aplicaciones, y se estudian en los mismos grupos y revistas.":"Layered materials that are not clay minerals but share structure, properties and uses with clays, and are studied by the same groups and journals.",[{g:{es:es?"Hidróxidos dobles laminares y zeolitas":"",en:"Layered double hydroxides and zeolites"},items:(window.AFINES||[{items:[]}])[0].items}],false); };
P.modificadas=function(){ var es=lang==="es";
  paginaMat("modificadas",es?"Arcillas transformadas por intercambio, intercalación, tratamiento químico o térmico, combinación con otros materiales o síntesis, para darles propiedades nuevas.":"Clays transformed by exchange, intercalation, chemical or thermal treatment, combination with other materials or synthesis, to give them new properties.",window.MODIFICADAS||[],true); };
function modDeMineral(id){ var M=[]; (window.MODIFICADAS||[]).forEach(function(g){ g.items.forEach(function(m){ if(m.m&&m.m.indexOf(id)>=0) M.push(m); }); });
  if(!M.length) return ""; return '<p style="margin-top:1.5rem"><b>'+navI("modificadas")[1]+':</b> '+M.map(function(m){ return '<a href="#modificadas">'+esc(m[lang].n)+'</a>'; }).join(", ")+'</p>'; }
P.geologia=function(){ var es=lang==="es", G=window.GEOLOGIA||[], R=window.GEO_REFS||{};
  var ent=es?"Las arcillas guardan la memoria de la Tierra: registran el clima, la temperatura y la edad de las rocas, el movimiento de las fallas y la historia de los suelos, e incluso la presencia de agua en Marte.":"Clays hold the Earth's memory: they record climate, the temperature and age of rocks, fault movement and soil history, and even the presence of water on Mars.";
  main.innerHTML=cabezaPagina(navI("geologia")[1],ent,migaArcillas())+'<div class="envoltorio pagina-cuerpo"><div class="afines">'+G.map(function(b){ var x=b[lang], r=sinDest(b.id,R[b.id]);
    return '<div class="afin" id="geo-'+b.id+'"><h2 class="h3">'+esc(x.n)+'</h2><p>'+esc(x.t)+'</p>'+(b.id==="marte"?'<p class="apl-min"><a href="#historia/marte">'+esc(L(HISTORIAS[2]).n)+'</a></p>':'')+destacados(b.id)+(r.length?'<details class="aport"><summary>'+U("aportT")+' ('+r.length+')</summary><ul>'+r.map(refLi).join("")+'</ul></details>':'')+otrasES(b.id)+'</div>'; }).join("")+'</div></div>'; };
P.galeria=function(){
  var todas=imgSEA().concat([].concat.apply([],Object.keys(SEM).filter(function(k){return minById(k);}).map(imgIOC)),imgLibre().filter(function(i){return minById(i.m);}));
  var mins=[]; todas.forEach(function(i){ if(mins.indexOf(i.m)<0) mins.push(i.m); });
  main.innerHTML=cabezaPagina(lang==="es"?"Galería de microscopía":"Microscopy gallery",U("galPag"),migaArcillas())+'<div class="envoltorio pagina-cuerpo"><div class="filtros"><button class="filtro" data-gm="">'+U("todos")+'</button>'+mins.map(function(m){ return '<button class="filtro" data-gm="'+m+'">'+esc(L(minById(m)).n)+'</button>'; }).join("")+'</div><div class="filtros" style="margin-top:-.6rem"><button class="filtro" data-gf="">'+U("todos")+'</button><button class="filtro" data-gf="sea">'+U("fuentes.sea")+'</button><button class="filtro" data-gf="ioc">'+U("fuentes.ioc")+'</button><button class="filtro" data-gf="libre">'+U("fuentes.libre")+'</button></div><div class="mosaico" id="gal"></div></div>';
  function pinta(){ $$("[data-gm]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-gm")===galM); }); $$("[data-gf]").forEach(function(b){ b.setAttribute("aria-pressed",b.getAttribute("data-gf")===galF); });
    $("#gal").innerHTML=todas.filter(function(i){ return (!galM||i.m===galM)&&(!galF||i.fuente===galF); }).map(function(i){ return fig(i); }).join(""); }
  $$("[data-gm]").forEach(function(b){ b.onclick=function(){ galM=b.getAttribute("data-gm"); pinta(); }; });
  $$("[data-gf]").forEach(function(b){ b.onclick=function(){ galF=b.getAttribute("data-gf"); pinta(); }; });
  pinta();
};


var PREG=[
 {es:"¿Qué mineral tiene una lámina 1:1 y no hincha?",en:"Which mineral has a 1:1 layer and does not swell?",ok:"caolinita",mal:["montmorillonita","vermiculita","illita"]},
 {es:"¿Cuál se desplaza a 17 Å con etilenglicol?",en:"Which one shifts to 17 Å with ethylene glycol?",ok:"montmorillonita",mal:["clorita","illita","caolinita"]},
 {es:"¿Qué mineral forma nanotubos?",en:"Which mineral forms nanotubes?",ok:"halloysita",mal:["caolinita","saponita","clorita"]},
 {es:"¿Con qué mineral se hizo el azul maya?",en:"Which mineral was used to make Maya blue?",ok:"palygorskita",mal:["sepiolita","caolinita","nontronita"]},
 {es:"La cuenca de Madrid tiene el mayor yacimiento del mundo de…",en:"The Madrid Basin has the world’s largest deposit of…",ok:"sepiolita",mal:["caolinita","vermiculita","halloysita"]},
 {es:"¿Qué mineral tiene potasio entre sus láminas?",en:"Which mineral has potassium between its layers?",ok:"illita",mal:["clorita","saponita","halloysita"]},
 {es:"¿Cuál tiene una capa de hidróxido entre las láminas 2:1?",en:"Which one has a hydroxide sheet between its 2:1 layers?",ok:"clorita",mal:["vermiculita","illita","montmorillonita"]},
 {es:"¿Qué mineral se expande como un gusano al calentarlo de golpe?",en:"Which mineral expands like a worm when suddenly heated?",ok:"vermiculita",mal:["sepiolita","illita","caolinita"]},
 {es:"¿Qué esmectita es verde y rica en hierro?",en:"Which smectite is green and iron-rich?",ok:"nontronita",mal:["saponita","hectorita","beidellita"]},
 {es:"¿Qué arcillas ha encontrado el rover Curiosity en Marte?",en:"Which clays has the Curiosity rover found on Mars?",okTxt:{es:"Esmectitas",en:"Smectites"},malTxt:[{es:"Caolín puro",en:"Pure kaolin"},{es:"Sepiolita",en:"Sepiolite"},{es:"Ninguna",en:"None"}]}
];
function baraja(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)),t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function haceDias(d){ var t=new Date(Date.now()-d*864e5); return t.toISOString().slice(0,10); }
function clayPendiente(){ return hoyISO()<="2027-06-26"; }
function vigente(n){ var h=hoyISO(); return (n.tipo==="convocatoria"&&n.plazo&&n.plazo>=h)||(n.tipo==="evento"&&n.fecha>=h); }
function tarjetaNoticia(n){
  var meta = n.tipo==="convocatoria"?(n.plazo>=hoyISO()?U("abiertaHasta")+" "+fechaTxt(n.plazo):U("cerrada")):(n.tipo==="evento"?fechaTxt(n.fecha):fechaTxt(n.fecha));
  return '<div class="convocatoria"><span class="fecha">'+esc(U("tipos")[n.tipo]||n.tipo)+'. '+esc(meta)+'</span><h3>'+esc(L(n).n)+'</h3>'+(n.img?'<img src="'+esc(n.img)+'" alt="" loading="lazy" style="margin:.4rem 0 .8rem;border-radius:3px;max-height:220px;object-fit:cover;width:100%">':'')+'<p>'+esc(L(n).t)+'</p>'+enlacesNoticia(n,1)+'</div>';
}
P.fotos=function(){ var es=lang==="es", F=window.FOTOS_SEA||[];
  var G=[["reuniones",es?"Reuniones y asambleas":"Meetings and assemblies"],["premios",es?"Premios":"Awards"],["congresos",es?"AIPEA y congresos":"AIPEA and conferences"],["icc2017",es?"ICC Granada 2017":"ICC Granada 2017"],["historia",es?"Historia":"History"]].filter(function(g){ return F.some(function(f){ return f.g===g[0]; }); });
  var est={g:G[0][0],y:null,i:0};
  function lista(){ return F.filter(function(f){ return f.g===est.g&&f.y===est.y; }); }
  function anios(){ var y={}; F.forEach(function(f){ if(f.g===est.g) y[f.y]=1; }); return Object.keys(y).map(Number).sort(function(a,b){ return est.g==="historia"?a-b:b-a; }); }
  function pinta(){ var Y=anios(); if(Y.indexOf(est.y)<0) est.y=Y[0]; var L=lista(); if(est.i>=L.length) est.i=0; var f=L[est.i];
    var tabs='<div class="fg-tabs" role="tablist">'+G.map(function(g){ return '<button role="tab" aria-selected="'+(g[0]===est.g)+'" data-fg="'+g[0]+'">'+g[1]+'</button>'; }).join("")+'</div>';
    var chips='<div class="fg-anios">'+Y.map(function(y){ var n=F.filter(function(f){ return f.g===est.g&&f.y===y; }).length; return '<button aria-pressed="'+(y===est.y)+'" data-fy="'+y+'">'+(est.g==="historia"&&y%10===0&&y<1990?y+(es?"s":"s"):y)+'<small>'+n+'</small></button>'; }).join("")+'</div>';
    var src="img/fotos/"+f.f+".webp";
    var visor='<div class="fg-visor"><div class="fg-marco"><button type="button" class="fg-ampliar" data-ver="'+src+'" data-cap="'+esc(esc(f[lang]))+'" aria-label="'+(es?"Ampliar foto":"Enlarge photo")+'"><img src="'+src+'" alt="'+esc(f[lang])+'"></button>'+(L.length>1?'<button class="fg-flecha ant" data-fd="-1" aria-label="'+(es?"Anterior":"Previous")+'">‹</button><button class="fg-flecha sig" data-fd="1" aria-label="'+(es?"Siguiente":"Next")+'">›</button>':'')+'</div><div class="fg-pie"><p>'+esc(f[lang])+'</p><p class="pequeno">'+(L.length>1?(est.i+1)+' / '+L.length+'. ':'')+(es?"Fuente: ":"Source: ")+esc(f.src)+'. <a href="'+src+'" target="_blank" rel="noopener">'+(es?"Ver a tamaño completo":"View full size")+'</a></p>'+(L.length>1?'<div class="fg-miniaturas">'+L.map(function(x,k){ var m=x.mini?"img/fotos/"+x.mini+".webp":"img/fotos/mini/"+x.f+".webp"; return '<button data-fi="'+k+'" aria-current="'+(k===est.i)+'" aria-label="'+(lang==="es"?"Foto ":"Photo ")+(k+1)+(lang==="es"?" de ":" of ")+L.length+'"><img src="'+m+'" alt="" loading="lazy"></button>'; }).join("")+'</div>':'')+'</div></div>';
    document.getElementById("fg").innerHTML=tabs+chips+visor; }
  main.innerHTML=cabezaPagina(U("nav.sociedad")[10][1],es?"Socios de la SEA en reuniones, entregas de premios y congresos, y algunas imágenes de su historia. Elige un tema y un año.":"SEA members at meetings, award ceremonies and conferences, and some images from its history. Choose a theme and a year.",migaSEA())+'<div class="envoltorio pagina-cuerpo"><div id="fg" class="fg"></div></div>';
  var c=document.getElementById("fg"); pinta();
  c.addEventListener("click",function(e){ var b=e.target.closest("button"); if(!b||b.dataset.ver) return; var d=b.dataset;
    if(d.fg){ est.g=d.fg; est.y=null; est.i=0; } else if(d.fy){ est.y=+d.fy; est.i=0; } else if(d.fi){ est.i=+d.fi; } else if(d.fd){ var n=lista().length; est.i=(est.i+(+d.fd)+n)%n; } else return; pinta(); });
  c.tabIndex=-1; c.addEventListener("keydown",function(e){ if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight") return; var n=lista().length; if(n<2) return; est.i=(est.i+(e.key==="ArrowRight"?1:-1)+n)%n; pinta(); });
};
P.centros=function(){ var es=lang==="es", C=window.CENTROS||[];
  var n=C.reduce(function(s,g){ return s+g.c.length; },0);
  main.innerHTML=cabezaPagina(U("nav.sociedad")[11][1],es?"Universidades, centros de investigación y empresas donde se investiga o se ha investigado en arcillas, ordenados por comunidad autónoma. La SEA cuenta además con socios en otros países.":"Universities, research centres and companies where clays are or have been studied, listed by region. The SEA also has members in other countries.",migaSEA())+
   '<div class="envoltorio pagina-cuerpo"><p class="pequeno">'+n+(es?" centros en ":" centres in ")+C.length+(es?" comunidades autónomas.":" regions.")+'</p><div class="centros">'+C.map(function(g){ return '<section><h2 class="h3">'+esc(L(g.r))+'</h2><ul>'+g.c.map(function(c){ return '<li>'+esc(c[0])+'<span>'+esc(es?c[1]:c[1].replace("Varios campus","Several campuses"))+'</span></li>'; }).join("")+'</ul></section>'; }).join("")+'</div>'+
   '<p class="pequeno" style="margin-top:2rem">'+(es?"¿Falta tu centro o hay algún error? Escribe a ":"Is your centre missing or is something wrong? Write to ")+'<a href="mailto:secretaria@sea-arcillas.es">secretaria@sea-arcillas.es</a>.</p></div>'; };
P.pubsocios=function(){ var D=window.PUBLICACIONES_SOCIOS||{obras:[]}, es=lang==="es";
  var entrada=es?"Artículos de los socios de la SEA en revistas científicas publicados en los últimos 24 meses, a partir de OpenAlex.":"Journal articles by SEA members published in the last 24 months, from OpenAlex.";
  var f0=haceDias(730), anios={}; D.obras.filter(function(o){ return (o.f||String(o.y)+"-12-31")>=f0; }).forEach(function(o){ (anios[o.y]=anios[o.y]||[]).push(o); });
  var h=Object.keys(anios).sort().reverse().map(function(y){ return '<h2 style="margin-top:2rem">'+y+'</h2><ul class="lista-pub">'+anios[y].map(function(o){
    var fal=o.s.filter(function(n){ return o.a.indexOf(n)<0; }), au=nomAutor(o.a.join(", ")+(fal.length?", … "+fal.join(", "):""))+(o.na>o.a.length?" et al.":""), ref='<i>'+esc(o.r)+'</i>';
    var d=(o.doi||"").replace(/^https?:\/\/doi.org\//,"");
    return '<li><a href="'+esc(o.doi||"#")+'" target="_blank" rel="noopener">'+esc(o.t)+'</a><div class="pub-meta">'+esc(au)+'. '+ref+'.'+'</div></li>'; }).join("")+'</ul>'; }).join("");
  main.innerHTML=cabezaPagina(U("nav.sociedad")[9][1],entrada,migaSEA())+'<div class="envoltorio pagina-cuerpo">'+h+'<p class="pequeno" style="margin-top:2rem">'+(es?"Actualizado el ":"Updated ")+esc(D.actualizado||"")+'. '+(es?"Fuente: OpenAlex. Solo artículos en revistas.":"Source: OpenAlex. Journal articles only.")+'</p></div>'; };
function idNoticia(n){ return n.id||(n.fecha+"-"+String(n.es.n).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"").slice(0,50)); }
function enlacesNoticia(n,tarjeta){
  var e=[]; if(tarjeta&&L(n).l) e.push('<a href="#noticias/'+esc(idNoticia(n))+'">'+U("leerMas")+'</a>');
  if(n.doc) e.push('<a href="'+esc(n.doc)+'" target="_blank" rel="noopener">'+U("verDoc")+'</a>');
  if(n.url) e.push('<a href="'+esc(n.url)+'" target="_blank" rel="noopener">'+U("masInfo")+'</a>');
  return e.length?'<p class="enlaces-noticia">'+e.join(" · ")+'</p>':'';
}
P.noticias=function(arg){
  if(arg){ var n=(window.NOTICIAS||[]).filter(function(x){ return idNoticia(x)===arg; })[0];
    if(n){ var tx=L(n), largo=String(tx.l||"").split(/\n\s*\n/).filter(function(x){ return x.trim(); }).map(function(x){ return '<p>'+esc(x.trim()).replace(/\n/g,"<br>")+'</p>'; }).join("");
      main.innerHTML=cabezaPagina(tx.n,"",migaSEA())+'<div class="envoltorio pagina-cuerpo"><p class="pequeno">'+esc(U("tipos")[n.tipo]||n.tipo)+'. '+esc(fechaTxt(n.fecha))+(n.tipo==="convocatoria"&&n.plazo?'. '+U("abiertaHasta")+' '+esc(fechaTxt(n.plazo)):'')+'</p>'+(n.img?'<img src="'+esc(n.img)+'" alt="" style="margin:.4rem 0 1rem;border-radius:3px;max-width:100%">':'')+'<p class="entrada">'+esc(tx.t)+'</p>'+largo+enlacesNoticia(n,0)+'<p style="margin-top:2rem"><a href="#noticias">'+U("volverNot")+'</a></p></div>'; return; } }
  var N=window.NOTICIAS||[], vig=N.filter(vigente), resto=N.filter(function(n){ return !vigente(n)&&n.fecha>=haceDias(730); });
  vig.sort(function(a,b){ return (a.plazo||a.fecha)<(b.plazo||b.fecha)?-1:1; });
  main.innerHTML=cabezaPagina(U("nav.sociedad")[0][1],U("notE"),migaSEA())+'<div class="envoltorio pagina-cuerpo">'+(vig.length?'<h2>'+U("proximas")+'</h2><div class="convocatorias">'+vig.map(tarjetaNoticia).join("")+'</div>':'')+(resto.length?'<h2 style="margin-top:2.25rem">'+U("anteriores")+'</h2><div class="convocatorias">'+resto.map(tarjetaNoticia).join("")+'</div>':'')+'</div>';
};

/* ---------------- LA SOCIEDAD ---------------- */
P.sociedad=function(){
  var hf=SEA.historiaFotos;
  main.innerHTML=cabezaPagina(U("nav.sociedad")[1][1],U("socE"))+
   '<div class="envoltorio pagina-cuerpo"><div class="dos-col" style="align-items:start"><div><h2>'+U("fines")+'</h2><p class="entrada">'+esc(L(SEA.fines))+'</p><p>'+esc(L(SEA.actividades))+'</p><p>'+esc(L(SEA.socios))+'</p></div><div><h2>'+U("campos")+'</h2><ul class="columnas-lista">'+L(SEA.campos).map(function(c){ return '<li>'+esc(c)+'</li>'; }).join("")+'</ul><h3 style="margin-top:2rem">'+U("enRed")+'</h3><p>'+esc(L(SEA.red))+'</p></div></div>'+
   '<h2 style="margin-top:2.25rem">'+(lang==="es"?"Socios colectivos":"Corporate members")+'</h2><div class="logos-socios">'+[["ciemat","CIEMAT","https://www.ciemat.es/"],["clariant","Clariant","https://www.clariant.com/"],["sepiolsa","Sepiolsa","https://www.sepiolsa.es/"],["tolsa","Tolsa","https://www.tolsa.com/"]].map(function(s){ return '<a href="'+s[2]+'" target="_blank" rel="noopener" title="'+s[1]+'"><img src="img/socios/'+s[0]+'.png" alt="'+s[1]+'"></a>'; }).join("")+'</div><h2 style="margin-top:2.25rem">'+(lang==="es"?"Presencia internacional":"International presence")+'</h2><p class="lectura">'+(lang==="es"?"Socios de la SEA han ocupado y ocupan puestos de responsabilidad en las principales instituciones y revistas internacionales de la ciencia de las arcillas.":"SEA members have held and hold leading positions in the main international institutions and journals of clay science.")+'</p><div class="internac">'+SEA.internacional.map(function(b){ return '<div><h3>'+esc(L(b.g))+'</h3><ul>'+b.it.map(function(x){ return '<li>'+esc(L(x))+'</li>'; }).join("")+'</ul></div>'; }).join("")+'</div></div>'+
   '<section class="bloque arena"><div class="envoltorio"><h2>'+U("hitos")+'</h2><div class="dos-col" style="align-items:start"><div class="linea">'+SEA.hitos.map(function(x){ return '<div class="hito"><b>'+x.a+'</b>'+esc(L(x))+'</div>'; }).join("")+'</div><div>'+
     '<figure><img src="'+seaImg(hf[1])+'" alt="" onerror="quitaFig(this)" style="aspect-ratio:auto"><figcaption>'+(lang==="es"?"J. L. Martín-Vivaldi en Estados Unidos, 1950.":"J. L. Martín-Vivaldi in the United States, 1950.")+'</figcaption></figure>'+
     '<figure style="margin-top:1.4rem"><img src="'+seaImg(hf[0])+'" alt="" onerror="quitaFig(this)" style="aspect-ratio:auto"></figure></div></div></div></section>'+
   '<section class="bloque"><div class="envoltorio"><h2>'+U("hist")+'</h2><div class="texto-largo">'+L(SEA_TEXTOS.textos.historia)+'</div></div></section>'+
   '<section class="bloque oscuro"><div class="envoltorio dos-col" style="align-items:start"><div><h2>'+U("sede")+'</h2><p>'+esc(SEA.sede)+'</p><h3 style="margin-top:1.6rem">'+U("contacto")+'</h3><p><a href="mailto:'+SEA.correo+'">'+SEA.correo+'</a><br><a href="mailto:'+SEA.secretaria+'">'+SEA.secretaria+'</a></p></div><div><h2>'+U("socioTit")+'</h2><p>'+U("socioE")+'</p><a class="boton claro" href="#socio">'+U("hazte")+'</a></div></div></section>';
};
function juntasAnteriores(){ var es=lang==="es", P=window.PRESIDENTES||[], J=window.JUNTAS||[]; if(!P.length) return "";
  return '<h2 style="margin-top:2.25rem">'+(es?"Presidentes de la Sociedad":"Presidents of the Society")+'</h2><ul class="lista-simple">'+P.map(function(x){ return '<li style="grid-template-columns:1fr 1.4fr"><span>'+esc(x.n)+'</span><span>'+esc(L(x.p))+'</span></li>'; }).join("")+'</ul>'+
   '<h2 style="margin-top:2.25rem">'+(es?"Juntas directivas anteriores":"Past boards")+'</h2>'+J.slice().reverse().map(function(j){ return '<details class="aport"><summary>'+esc(j.a)+' · '+esc(L(j.t))+'</summary><p>'+esc(j.m)+'</p></details>'; }).join("")+
   '<p class="pequeno" style="margin-top:.8rem">'+(es?"Reconstruido a partir del libro del 50 aniversario, los libros de resúmenes, los informes anuales de la SEA y los boletines de la AIPEA (1990–2002). El periodo de Francisco López Aguayo se deduce de esas fuentes: sucedió a Emilio Galán (presidente hasta 1991) y figura como presidente anterior en la junta elegida en diciembre de 1994. Si tienes datos que completen o corrijan esta lista, escribe a la secretaría.":"Compiled from the 50th anniversary book, abstract books, SEA annual reports and AIPEA newsletters (1990–2002). Francisco López Aguayo's term is inferred from these sources: he succeeded Emilio Galán (president until 1991) and is listed as past president on the board elected in December 1994. If you have information to complete or correct this list, please contact the secretariat.")+'</p>'; }
P.junta=function(){
  main.innerHTML=cabezaPagina(U("nav.sociedad")[2][1],U("juntaE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><div class="personas">'+SEA.junta.map(function(p){ var ini=p.n.split(" ").map(function(x){return x[0];}).slice(0,2).join("");
    return '<div class="persona">'+(p.f?'<img src="'+seaImg(p.f)+'" alt="'+esc(p.n)+'" onerror="this.outerHTML=\'<div class=sinfoto>'+ini+'</div>\'">':'<div class="sinfoto">'+ini+'</div>')+'<h2 class="h4">'+esc(p.n)+'</h2><p class="cargo">'+esc(L(p.c))+'</p><p>'+esc(p.o)+'</p>'+(p.e?'<p><a href="mailto:'+p.e+'">'+p.e+'</a></p>':'')+'</div>'; }).join("")+'</div>'+
   juntasAnteriores()+
   '<h2 style="margin-top:2.25rem">'+U("relInt")+'</h2><ul class="lista-simple">'+SEA.relaciones.map(function(r){ return '<li style="grid-template-columns:1fr 1fr"><span>'+esc(L(r.c))+'</span><span>'+esc(r.n)+'</span></li>'; }).join("")+'</ul></div>';
};
function bloqueAIPEA(){ var es=lang==="es", L2=[
  ["https://aipea.org/early-career-research-grant/",es?"Beca de investigación para jóvenes (Early Career Research Grant)":"Early Career Research Grant",es?"Financia estancias o proyectos de investigación de científicos al comienzo de su carrera.":"Funds research stays or projects by early-career scientists."],
  ["https://aipea.org/early-career-travel-grant/",es?"Ayuda para viajes de jóvenes (Early Career Travel Grant)":"Early Career Travel Grant",es?"Ayuda para asistir a los congresos CLAY.":"Support to attend CLAY conferences."],
  ["https://aipea.org/student-travel-funds/",es?"Fondo para estudiantes (Student Travel Fund)":"Student Travel Fund",es?"Ayudas de viaje para estudiantes que presentan trabajos en los congresos.":"Travel support for students presenting at the conferences."],
  ["https://aipea.org/student-awards/",es?"Premios a presentaciones de estudiantes":"Student Presentation Awards",es?"Premios a las mejores comunicaciones orales y pósteres de estudiantes en los congresos.":"Awards for the best student talks and posters at the conferences."],
  ["https://aipea.org/bradley-award/",es?"Premio Bradley":"Bradley Award",es?"Premio de la AIPEA a jóvenes investigadores por un trabajo destacado en ciencia de las arcillas.":"AIPEA award to young researchers for outstanding work in clay science."],
  ["https://aipea.org/aipea-council/",es?"Comité de Jóvenes Científicos de la AIPEA":"AIPEA Early Career Clay Scientists Committee",es?"Organiza talleres y actividades para investigadores jóvenes durante los congresos.":"Organises workshops and activities for early-career researchers at the conferences."]];
  return '<h2 style="margin-top:2.25rem">'+(es?"Ayudas y premios de la AIPEA":"AIPEA grants and awards")+'</h2><p class="lectura">'+(es?"La Asociación Internacional para el Estudio de las Arcillas, de la que forma parte la SEA, convoca también ayudas y premios abiertos a los socios. Las bases y los plazos están en su web.":"The International Association for the Study of Clays, of which the SEA is a member, also offers grants and awards open to members. Rules and deadlines are on its website.")+'</p><ul class="documentos">'+L2.map(function(x){ return '<li><a href="'+x[0]+'" target="_blank" rel="noopener">'+x[1]+'</a><br><span class="pequeno">'+x[2]+'</span></li>'; }).join("")+'</ul>'; }
function palmares(){ var es=lang==="es", P=window.PALMARES||[]; if(!P.length) return "";
  return '<h2 style="margin-top:2.25rem">'+(es?"Palmarés":"Past winners")+'</h2>'+P.map(function(g){ return '<details class="aport"><summary>'+esc(g[lang])+' ('+g.l.length+')</summary><ul class="lista-simple">'+g.l.map(function(x){ return '<li><b>'+x[0]+'</b><span>'+esc(x[1])+'</span></li>'; }).join("")+'</ul></details>'; }).join("")+
   '<p class="pequeno">'+(es?"Recopilado del libro del 50 aniversario y de los informes anuales de la SEA. Faltan algunos años: si tienes los datos, escribe a la secretaría.":"Compiled from the 50th anniversary book and the SEA annual reports. Some years are missing: if you have the data, please contact the secretariat.")+'</p>'; }
P.premios=function(){
  var hoy=hoyISO();
  main.innerHTML=cabezaPagina(U("nav.sociedad")[3][1],U("premiosE"),migaSEA())+'<div class="envoltorio pagina-cuerpo">'+SEA.premios.map(function(p){ var ab=p.abierto&&p.abierto>=hoy;
    return '<div class="premio"><div>'+(ab?'<span class="abierto">'+U("abierto")+'</span>':'<span class="pequeno">'+U("ultima")+'</span>')+'<h2 class="h3">'+esc(L(p).n)+'</h2>'+(ab?'<p class="pequeno">'+U("plazo")+' '+fechaTxt(p.abierto)+'</p>':'')+'</div><div><p class="entrada">'+esc(L(p).r)+'</p><p>'+esc(L(p).t)+'</p><a href="'+p.url+'" target="_blank" rel="noopener">'+U("verBases")+'</a></div></div>'; }).join("")+
   palmares()+bloqueAIPEA()+'<div class="dos-col" style="align-items:start;margin-top:2.25rem"><div><h2>'+U("distinciones")+'</h2><ul class="lista-simple">'+SEA.distinciones.map(function(d){ return '<li><b>'+d.a+'</b><span>'+esc(d.n)+'<br><span class="pequeno">'+esc(d.p)+'</span></span></li>'; }).join("")+'</ul></div><div><h2>'+U("honor")+'</h2><ul class="lista-simple">'+SEA.honor.map(function(d){ return '<li><b>'+d[0]+'</b><span>'+esc(d[1])+'</span></li>'; }).join("")+'</ul></div></div></div>';
};
P.reuniones=function(){
  var TR=[[/Jornada conmemorativa del 50 aniversario/,"50th-anniversary commemorative day"],[/^(\S+) Reunión hispano-italiana sobre minerales de la arcilla/,"$1 Spanish–Italian Meeting on Clay Minerals"],[/^(\S+) Reunión Iberoamericana de Arcillas/,"$1 Ibero-American Clay Meeting"],[/^(\S+) Reunión Científica de la SEA y (\S+) de la SEM/,"$1 SEA and $2 SEM Scientific Meeting"],[/^(\S+) Reunión( Científica)? de la SEA/,"$1 SEA Scientific Meeting"],[/Jornada Científica de la SEA/,"SEA Scientific Day"],[/30 de junio a 2 de julio/,"30 June–2 July"],[/20–26 de junio/,"20–26 June"],[/ y /g," and "],[/Edimburgo/,"Edinburgh"],[/París/,"Paris"],[/Sevilla/g,"Seville"]];
  function tr(s){ if(lang==="es") return s; TR.forEach(function(t){ s=s.replace(t[0],t[1]); }); return s; }
  function lista(a){ return '<ul class="lista-simple">'+a.map(function(r){ return '<li><b>'+r[0]+'</b><span>'+esc(tr(r[1]))+'<br><span class="pequeno">'+esc(tr(r[2]))+'</span></span></li>'; }).join("")+'</ul>'; }
  main.innerHTML=cabezaPagina(U("nav.sociedad")[4][1],U("reunE"),migaSEA())+'<div class="envoltorio pagina-cuerpo">'+(clayPendiente()?'<div class="convocatoria" style="margin-bottom:3rem"><span class="fecha">20–26 '+(lang==="es"?"de junio de":"June")+' 2027</span><h2 class="h3">'+U("clayTit")+'</h2><p>'+U("clayTxt")+'</p><a href="https://clay.aipea.org/" target="_blank" rel="noopener">'+U("clayWeb")+'</a></div>':'')+'<div class="dos-col" style="align-items:start"><div><h2>'+U("nac")+'</h2>'+lista(SEA.reunionesNac)+'</div><div><h2>'+U("int")+'</h2>'+lista(SEA.reunionesInt)+'</div></div></div>';
};
function docURL(f){ return "docs/"+f; }
P.publicaciones=function(){
  var G=[["glosario",U("glosarioPub")],["resumenes",U("resumenes")],["libros",U("libros")],["guias",U("guias")],["cursos",U("cursos")],["informes",U("actividades")]];
  function li(p){ return '<li><a href="'+docURL(p.f)+'" target="_blank" rel="noopener">'+esc(L(p))+'</a> <span class="pequeno">PDF, '+num(p.mb)+' MB</span></li>'; }
  main.innerHTML=cabezaPagina(U("nav.sociedad")[5][1],U("pubE"),migaSEA())+'<div class="envoltorio pagina-cuerpo">'+G.map(function(g){ var it=SEA.publicaciones.filter(function(p){return p.g===g[0];}); if(!it.length) return "";
    return '<h2 style="margin-top:2rem">'+g[1]+'</h2><ul class="documentos">'+it.map(li).join("")+'</ul>'+(g[0]==="glosario"?'<p><a class="boton claro" href="#glosario">'+U("nav.sociedad")[6][1]+'</a></p>':'')+(g[0]==="informes"?'<p class="pequeno" style="margin-top:.8rem">'+(lang==="es"?"Desde 2011 los informes proceden de los boletines de la AIPEA. Todos los boletines, desde 1967, están en ":"Since 2011 the reports come from the AIPEA newsletters. All newsletters since 1967 are at ")+'<a href="https://aipea.org/newsletters/" target="_blank" rel="noopener">aipea.org/newsletters</a>.</p>':''); }).join("")+
   '<h2 style="margin-top:2rem">'+U("interlab")+'</h2><p class="lectura">'+esc(L(SEA.interlab))+'</p></div>';
};
var gloLetra="", gloQ="";
function sinAcentos(s){ return s.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(); }
P.glosario=function(){
  var G=window.GLOSARIO||[], pdf=SEA.publicaciones.filter(function(p){return p.g==="glosario";})[0];
  var enlace='<a href="'+docURL(pdf.f)+'" target="_blank" rel="noopener">'+U("gloPdf")+'</a>';
  if(!G.length){ main.innerHTML=cabezaPagina(U("nav.sociedad")[6][1],U("gloE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><p>'+U("gloPend")+'</p><p>'+enlace+'</p></div>'; return; }
  var letras=[]; G.forEach(function(t){ var l=sinAcentos(t.t[0]).toUpperCase(); if(/[A-Z]/.test(l)&&letras.indexOf(l)<0) letras.push(l); }); letras.sort();
  main.innerHTML=cabezaPagina(U("nav.sociedad")[6][1],U("gloE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><input class="buscador" id="gq" type="search" placeholder="'+U("buscar")+'" aria-label="'+U("buscar")+'" value="'+esc(gloQ)+'"><div class="abecedario">'+letras.map(function(l){ return '<button data-l="'+l+'">'+l+'</button>'; }).join("")+'</div><div id="gres"></div><p style="margin-top:2rem">'+enlace+'</p></div>';
  function pinta(){ var q=sinAcentos(gloQ.trim());
    $$("[data-l]").forEach(function(b){ b.setAttribute("aria-pressed",!q&&b.getAttribute("data-l")===gloLetra); });
    var r=G.filter(function(t){ if(q) return sinAcentos(t.t+" "+(t.en||"")).indexOf(q)>=0; return sinAcentos(t.t[0]).toUpperCase()===gloLetra; });
    $("#gres").innerHTML=r.length?r.slice(0,300).map(function(t){ return '<div class="termino"><h2 class="h4">'+esc(t.t)+(t.en?' <span class="en">('+esc(t.en)+')</span>':'')+'</h2><p>'+esc(t.d)+'</p></div>'; }).join(""):'<p>'+U("sinRes")+'</p>'; }
  $("#gq").oninput=function(e){ gloQ=e.target.value; pinta(); };
  $$("[data-l]").forEach(function(b){ b.onclick=function(){ gloLetra=b.getAttribute("data-l"); gloQ=""; $("#gq").value=""; pinta(); }; });
  if(!gloLetra) gloLetra=letras[0]; pinta();
};
P.semblanzas=function(){
  main.innerHTML=cabezaPagina(U("nav.sociedad")[7][1],U("sembE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><div class="semblanzas">'+SEA_TEXTOS.semblanzas.map(function(s){ return '<a href="#semblanza/'+s.id+'"><img loading="lazy" src="'+seaImg(SEA.semblanzasFoto[s.id])+'" alt="" onerror="this.style.visibility=\'hidden\'"><h2 class="h4">'+esc(L(s).n)+'</h2></a>'; }).join("")+'</div></div>';
};
P.semblanza=function(id){
  var s=SEA_TEXTOS.semblanzas.filter(function(x){return x.id===id;})[0]; if(!s){ P.semblanzas(); return; }
  main.innerHTML=cabezaPagina(esc(L(s).n),"",["semblanzas",U("nav.sociedad")[7][1]])+'<div class="envoltorio pagina-cuerpo"><div class="dos-col" style="grid-template-columns:minmax(0,1fr) minmax(0,2.2fr);align-items:start"><img src="'+seaImg(SEA.semblanzasFoto[id])+'" alt="" onerror="this.remove()" style="filter:grayscale(1);border-radius:3px"><div class="texto-largo">'+L(s).t+'</div></div></div>';
};
P.socio=function(){
  main.innerHTML=cabezaPagina(U("socioTit"),U("socioE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><ol class="lista-simple">'+U("socioPasos").map(function(p,i){ return '<li><b>'+(i+1)+'</b><span>'+esc(p)+'</span></li>'; }).join("")+'</ol><p style="margin-top:1.6rem"><a class="boton" href="'+SEA.inscripcion.pdf+'" target="_blank" rel="noopener">'+U("fichaPdf")+'</a> <a class="boton claro" href="'+SEA.inscripcion.word+'" target="_blank" rel="noopener">'+U("fichaWord")+'</a></p><h2 class="h3" style="margin-top:2rem">'+U("contacto")+'</h2><p><a href="mailto:'+SEA.secretaria+'">'+SEA.secretaria+'</a><br><a href="mailto:'+SEA.correo+'">'+SEA.correo+'</a></p><p>'+esc(SEA.sede)+'</p></div>';
};
P.estatutos=function(){
  main.innerHTML=cabezaPagina(U("nav.sociedad")[8][1],U("estatutosE"),migaSEA())+'<div class="envoltorio pagina-cuerpo"><div class="texto-largo">'+L(SEA_TEXTOS.textos.estatutos)+'</div></div>';
};

/* ---------------- cabecera, pie y rutas ---------------- */
function marcaSVG(){ return '<img src="logo-sea.png" alt="" width="48" height="48">'; }
/* ---- Páginas añadidas: CLAY 2027, Aprende con arcillas, Cuestionario, Buscador, Aviso legal ---- */
var CLAY_INICIO=new Date("2027-06-20T09:00:00+02:00");
function diasClay(){ return Math.max(0,Math.ceil((CLAY_INICIO-new Date())/864e5)); }
P.clay2027=function(){ var es=lang==="es";
  var temas=es?["Arcillas y sociedad","Arcillas, tecnología e innovación","Arcillas, geología y ciencias planetarias","Fundamentos de la ciencia de las arcillas y docencia"]:["Clays & Society","Clays & Technology & Innovation","Clays & Geology & Planetary Science","Clay Science Fundamentals & Teaching"];
  main.innerHTML=cabezaPagina("CLAY 2027",es?"Madrid acoge del 20 al 26 de junio de 2027 el primer congreso de la nueva serie CLAY de la AIPEA, organizado por la Sociedad Española de Arcillas.":"Madrid hosts, from 20 to 26 June 2027, the first conference of AIPEA’s new CLAY series, organised by the Spanish Clay Society.",migaSEA())+
  '<div class="envoltorio pagina-cuerpo"><div class="cifras"><div><b>'+diasClay()+'</b><span>'+(es?"días para empezar":"days to go")+'</span></div><div><b>20–26</b><span>'+(es?"de junio de 2027":"June 2027")+'</span></div><div><b>4</b><span>'+(es?"grandes áreas temáticas":"main topics")+'</span></div></div>'+
  '<h2>'+(es?"Qué es":"What it is")+'</h2><p class="lectura">'+(es?"Las International Clay Conferences (cada cuatro años) y los congresos Euroclay se han unido en una sola serie, CLAY, que se celebrará los años impares bajo los auspicios de la AIPEA. La primera edición la organiza la SEA en Madrid; la siguiente, CLAY 2029, será en Chengdu (China).":"The International Clay Conferences (every four years) and the Euroclay conferences have merged into a single series, CLAY, held in odd-numbered years under the auspices of AIPEA. The first edition is organised by the SEA in Madrid; the next, CLAY 2029, will be in Chengdu (China).")+'</p>'+
  '<h2>'+(es?"Dónde":"Where")+'</h2><p class="lectura">'+(es?"Facultad de Biología de la Universidad Autónoma de Madrid, en el Campus de Excelencia UAM+CSIC de Cantoblanco (Madrid).":"Faculty of Biology, Autonomous University of Madrid, at the UAM+CSIC Campus of Excellence in Cantoblanco (Madrid).")+'</p>'+
  '<h2>'+(es?"Áreas temáticas":"Topics")+'</h2><ul class="lista-simple">'+temas.map(function(t){ return '<li style="grid-template-columns:1fr"><span>'+t+'</span></li>'; }).join("")+'</ul>'+
  '<h2 style="margin-top:2rem">'+(es?"Organizan":"Organisers")+'</h2><p class="lectura">'+(es?"Sociedad Española de Arcillas (SEA), Instituto de Ciencia de Materiales de Madrid (ICMM-CSIC) y Universidad Autónoma de Madrid. Comité presidido por Jaime Cuevas, Pilar Aranda, Ana Isabel Ruiz y Margarita Darder.":"Spanish Clay Society (SEA), Materials Science Institute of Madrid (ICMM-CSIC) and Autonomous University of Madrid. Committee chaired by Jaime Cuevas, Pilar Aranda, Ana Isabel Ruiz and Margarita Darder.")+'</p>'+
  '<p class="lectura">'+(es?"Los plazos de inscripción y de envío de resúmenes, las excursiones y los premios se publican en la web oficial del congreso.":"Registration and abstract deadlines, field trips and awards are published on the official conference website.")+'</p><p><a class="boton" href="https://clay.aipea.org/" target="_blank" rel="noopener">clay.aipea.org</a> <a class="boton claro" href="#premios">'+(es?"Ayudas de la SEA para jóvenes":"SEA grants for young researchers")+'</a></p></div>';
};

var EXPERIMENTOS={es:[
 ["La arcilla que se hincha","Pon una cucharada de arena para gatos «aglomerante» en un vaso transparente y marca la altura (comprueba en el envase que es de bentonita: las camas de gatos también se hacen con sepiolita o palygorskita, que apenas se hinchan). Añade agua poco a poco, espera diez minutos y vuelve a marcar. La bentonita puede ocupar varias veces su volumen inicial porque el agua entra entre sus láminas. Si tienes también arena de sepiolita, haz lo mismo en otro vaso y compara.","propiedades"],
 ["Separar arena, limo y arcilla","Llena un tercio de una botella con tierra del jardín, completa con agua, ciérrala y agítala. Déjala quieta un día: abajo se deposita la arena, encima el limo y arriba, muy despacio, la arcilla; el agua queda turbia durante horas por sus partículas diminutas.","que-es"],
 ["Plástica o no plástica","Humedece un poco de arcilla de modelar y un poco de arena fina. Intenta hacer un churro con cada una y doblarlo: la arcilla se deforma sin romperse (plasticidad) y la arena se desmorona.","propiedades"],
 ["Arcilla que absorbe","Pon unas gotas de aceite de cocina sobre un papel y cúbrelas con arena para gatos de sepiolita o de bentonita. Al día siguiente retira el polvo: gran parte del aceite ha desaparecido del papel. Así se limpian derrames en talleres y carreteras.","aplicaciones"],
 ["Secar y comparar","Modela dos piezas iguales de arcilla, deja una al aire varios días y mide cuánto encoge. Las arcillas con más esmectita encogen y se agrietan más: por eso los alfareros mezclan la arcilla con arena (desgrasante).","propiedades"]],
 en:[
 ["The clay that swells","Put a spoonful of clumping cat litter in a clear glass and mark the height (check the packet says bentonite: cat litters are also made from sepiolite or palygorskite, which hardly swell). Add water slowly, wait ten minutes and mark again. Bentonite can take up several times its initial volume because water enters between its layers. If you also have sepiolite litter, repeat in another glass and compare.","propiedades"],
 ["Separating sand, silt and clay","Fill a third of a bottle with garden soil, top up with water, close it and shake. Leave it for a day: sand settles at the bottom, silt above, and clay very slowly at the top; the water stays cloudy for hours because of its tiny particles.","que-es"],
 ["Plastic or not","Moisten some modelling clay and some fine sand. Try to roll each into a sausage and bend it: clay deforms without breaking (plasticity) while sand crumbles.","propiedades"],
 ["Clay that absorbs","Put a few drops of cooking oil on a sheet of paper and cover them with sepiolite or bentonite cat litter. Next day remove the powder: much of the oil has gone from the paper. This is how spills are cleaned in workshops and on roads.","aplicaciones"],
 ["Dry and compare","Shape two identical pieces of clay, leave one to dry in the air for several days and measure how much it shrinks. Smectite-rich clays shrink and crack more: that is why potters mix clay with sand (temper).","propiedades"]]};
P.aprende=function(){ var es=lang==="es";
  main.innerHTML=cabezaPagina(es?"Aprende con arcillas":"Learn with clays",es?"Experimentos sencillos para hacer en casa o en clase, e ideas para profesores que quieran trabajar las arcillas con sus alumnos.":"Simple experiments to do at home or in class, and ideas for teachers who want to work on clays with their students.",migaArcillas())+
  '<div class="envoltorio pagina-cuerpo"><p class="nota-seguridad">'+(es?"Con supervisión de un adulto. No ingieras ningún material, lávate las manos al terminar y no respires el polvo seco: humedécelo antes de manipularlo.":"With adult supervision. Do not swallow any material, wash your hands afterwards and do not breathe dry dust: moisten it before handling.")+'</p>'+
  '<h2>'+(es?"Cinco experimentos":"Five experiments")+'</h2><div class="experimentos">'+EXPERIMENTOS[lang].map(function(x,i){ return '<div class="experimento"><span class="num">'+(i+1)+'</span><h3>'+x[0]+'</h3><p>'+x[1]+'</p><a href="#'+x[2]+'">'+(es?"Saber más":"Learn more")+'</a></div>'; }).join("")+'</div>'+
  '<h2 style="margin-top:2.5rem">'+(es?"Para profesores":"For teachers")+'</h2><ul class="lista-simple">'+(es?[
   ['estructura','Estructura en 3D: los alumnos pueden girar las láminas de los minerales y ver dónde entra el agua.'],
   ['estudio','Cómo se estudian: un difractograma interactivo para explicar la difracción de rayos X.'],
   ['minerales','Fichas de 24 minerales con fotos de microscopio electrónico, para trabajar por grupos.'],
   ['glosario','Glosario de la SEA con más de 500 términos.'],
   ['cuestionario','Cuestionario de 10 preguntas para repasar al final de la clase.']]:[
   ['estructura','Structure in 3D: students can rotate mineral layers and see where water enters.'],
   ['estudio','How clays are studied: an interactive diffractogram to explain X-ray diffraction.'],
   ['minerales','Sheets on 24 minerals with electron microscope photos, for group work.'],
   ['glosario','SEA glossary with more than 500 terms.'],
   ['cuestionario','A 10-question quiz to review at the end of the lesson.']]).map(function(x){ return '<li style="grid-template-columns:1fr"><span><a href="#'+x[0]+'">'+x[1]+'</a></span></li>'; }).join("")+'</ul>'+
  '</div>';
};

var PREGUNTAS={es:[
 ["En mineralogía, ¿por debajo de qué tamaño se considera que una partícula es de tamaño arcilla?",["2 micras (milésimas de milímetro)","2 milímetros","0,2 milímetros","20 micras"],0,"Por debajo de 2 µm; en sedimentología se usa a veces 4 µm."],
 ["¿Cuántas capas tiene la lámina de un mineral del tipo 2:1, como la montmorillonita?",["Una tetraédrica y una octaédrica","Dos tetraédricas y una octaédrica entre ellas","Dos octaédricas","Tres tetraédricas"],1,"Una capa octaédrica entre dos tetraédricas."],
 ["¿Qué arcilla hincha muchísimo con agua y se usa como barrera en almacenamientos de residuos radiactivos?",["Caolinita","Talco","Bentonita (montmorillonita)","Illita"],2,"La bentonita sódica puede absorber varias veces su peso en agua y sella muy bien."],
 ["¿Qué forma tienen las partículas de sepiolita?",["Placas hexagonales","Tubos enrollados","Fibras con canales en su interior","Esferas"],2,"Son fibras recorridas por canales donde caben agua y otras moléculas."],
 ["¿Qué mineral da resistencia a la porcelana al cocerse la caolinita por encima de 1100 °C?",["Mullita","Cuarzo","Calcita","Yeso"],0,"La caolinita pasa a metacaolín y después forma mullita."],
 ["¿Dónde identificó el rover Curiosity una saponita rica en hierro?",["En la Luna","En el cráter Gale, en Marte","En un meteorito de la Antártida","En Venus"],1,"En el cráter Gale: señal de que allí hubo agua líquida."],
 ["¿Qué técnica distingue una esmectita porque su espaciado pasa a unos 17 Å con etilenglicol?",["Microscopía óptica","Difracción de rayos X","Espectrometría de masas","Resonancia magnética"],1,"La difracción de rayos X; prueba el simulador en «Cómo se estudian»."],
 ["El azul maya, un pigmento que ha resistido siglos, combina índigo con…",["Caolinita","Palygorskita","Clorita","Moscovita"],1,"El índigo queda atrapado en los canales de la palygorskita."],
 ["¿Qué dureza tiene el talco en la escala de Mohs?",["1, la más baja","5","7","10"],0,"Es el mineral más blando de la escala."],
 ["¿Qué sociedad organiza en Madrid el congreso internacional CLAY 2027?",["La Sociedad Española de Arcillas","La NASA","La UNESCO","La Real Academia de Ciencias"],0,"La SEA, del 20 al 26 de junio de 2027."]],
 en:[
 ["In mineralogy, below what size is a particle considered clay-sized?",["2 micrometres","2 millimetres","0.2 millimetres","20 micrometres"],0,"Below 2 µm; sedimentology sometimes uses 4 µm."],
 ["How many sheets does the layer of a 2:1 mineral such as montmorillonite have?",["One tetrahedral and one octahedral","Two tetrahedral with an octahedral one between them","Two octahedral","Three tetrahedral"],1,"One octahedral sheet between two tetrahedral ones."],
 ["Which clay swells strongly in water and is used as a barrier in radioactive waste repositories?",["Kaolinite","Talc","Bentonite (montmorillonite)","Illite"],2,"Sodium bentonite can take up several times its weight in water and seals very well."],
 ["What shape are sepiolite particles?",["Hexagonal plates","Rolled tubes","Fibres with internal channels","Spheres"],2,"They are fibres crossed by channels that hold water and other molecules."],
 ["Which mineral gives porcelain its strength when kaolinite is fired above 1100 °C?",["Mullite","Quartz","Calcite","Gypsum"],0,"Kaolinite turns into metakaolin and then forms mullite."],
 ["Where did the Curiosity rover identify an iron-rich saponite?",["On the Moon","In Gale crater, on Mars","In an Antarctic meteorite","On Venus"],1,"In Gale crater: a sign that liquid water was once there."],
 ["Which technique identifies a smectite because its spacing moves to about 17 Å with ethylene glycol?",["Optical microscopy","X-ray diffraction","Mass spectrometry","Magnetic resonance"],1,"X-ray diffraction; try the simulator in “How clays are studied”."],
 ["Maya blue, a pigment that has lasted for centuries, combines indigo with…",["Kaolinite","Palygorskite","Chlorite","Muscovite"],1,"Indigo is trapped in the channels of palygorskite."],
 ["What is the Mohs hardness of talc?",["1, the lowest","5","7","10"],0,"It is the softest mineral on the scale."],
 ["Which society is organising the CLAY 2027 international conference in Madrid?",["The Spanish Clay Society","NASA","UNESCO","The Royal Academy of Sciences"],0,"The SEA, from 20 to 26 June 2027."]]};
P.cuestionario=function(){ var es=lang==="es", Q=PREGUNTAS[lang], ok=0, hechas=0;
  main.innerHTML=cabezaPagina(es?"¿Cuánto sabes de arcillas?":"How much do you know about clays?",es?"Diez preguntas sobre lo que cuenta esta web. Elige una respuesta y verás al momento si has acertado.":"Ten questions about what this website explains. Choose an answer and you will see straight away whether you got it right.",migaArcillas())+
  '<div class="envoltorio pagina-cuerpo"><ol class="cuestionario">'+Q.map(function(q,i){ return '<li data-q="'+i+'"><p class="preg">'+q[0]+'</p><div class="opciones">'+q[1].map(function(o,j){ return '<button data-o="'+j+'">'+o+'</button>'; }).join("")+'</div><p class="expl" hidden></p></li>'; }).join("")+'</ol><p class="resultado" id="resultado" aria-live="polite"></p><p><a class="boton claro" href="#cuestionario" id="repetir">'+(es?"Volver a empezar":"Start again")+'</a> <a class="boton claro" href="#aprende">'+(es?"Aprende con arcillas":"Learn with clays")+'</a></p></div>';
  $$(".cuestionario li",main).forEach(function(li){ var i=+li.getAttribute("data-q");
    $$("button",li).forEach(function(b){ b.onclick=function(){ if(li.classList.contains("hecha")) return; li.classList.add("hecha"); hechas++;
      var j=+b.getAttribute("data-o"), bien=j===Q[i][2]; if(bien) ok++;
      b.classList.add(bien?"bien":"mal"); $$("button",li)[Q[i][2]].classList.add("bien");
      var e=$(".expl",li); e.hidden=false; e.textContent=(bien?(es?"¡Correcto! ":"Correct! "):(es?"No es esa. ":"Not quite. "))+Q[i][3];
      if(hechas===Q.length) $("#resultado").textContent=(es?"Has acertado ":"You got ")+ok+(es?" de ":" out of ")+Q.length+(ok>=8?(es?". ¡Excelente!":". Excellent!"):ok>=5?(es?". ¡Bien!":". Well done!"):(es?". Repasa las fichas y vuelve a intentarlo.":". Review the pages and try again."));
    }; }); });
  $("#repetir").onclick=function(e){ e.preventDefault(); P.cuestionario(); window.scrollTo(0,0); };
};

function indiceBusqueda(){ var es=lang==="es", I=[];
  U("nav.arcillas").concat(U("nav.sociedad")).forEach(function(x){ I.push({t:x[1],u:"#"+x[0],x:"",k:es?"Página":"Page"}); });
  (window.MINERALES||[]).forEach(function(m){ var di=((window.DATOS_INTERES||{})[m.id]||{})[lang]||[];
    I.push({t:L(m).n,u:"#mineral/"+m.id,x:L(m).t+" "+di.map(function(d){ return d[0]+" "+d[1]; }).join(" "),k:es?"Mineral":"Mineral"}); });
  (window.GLOSARIO||[]).forEach(function(g){ I.push({t:g.t,u:"#glosario",x:g.d,k:es?"Glosario":"Glossary",d:g.d}); });
  (window.NOTICIAS||[]).forEach(function(n){ var t=L(n); I.push({t:t.n,u:"#noticias"+(t.l?"/"+idNoticia(n):""),x:t.t+" "+(t.l||""),k:es?"Noticia":"News"}); });
  (window.FOTOS_SEA||[]).forEach(function(f){ I.push({t:f[lang].slice(0,90),u:"#fotos",x:f[lang],k:es?"Foto":"Photo"}); });
  [["clay2027","CLAY 2027"],["aprende",es?"Aprende con arcillas":"Learn with clays"],["cuestionario",es?"Cuestionario":"Quiz"],["legal",es?"Aviso legal y privacidad":"Legal notice and privacy"]].forEach(function(x){ I.push({t:x[1],u:"#"+x[0],x:"",k:es?"Página":"Page"}); });
  return I; }
function sinAcentos(s){ return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase(); }
P.buscar=function(arg){ var es=lang==="es", q=decodeURIComponent(arg||"");
  main.innerHTML=cabezaPagina(es?"Buscar en la web":"Search the website","",migaSEA())+'<div class="envoltorio pagina-cuerpo"><form id="fbuscar" class="buscador" role="search"><input id="qbuscar" type="search" value="'+esc(q)+'" placeholder="'+(es?"Por ejemplo: sepiolita, cerámica, Marte…":"For example: sepiolite, ceramics, Mars…")+'" aria-label="'+(es?"Buscar":"Search")+'" autofocus><button class="boton">'+(es?"Buscar":"Search")+'</button></form><div id="rbuscar"></div></div>';
  function busca(q){ var p=sinAcentos(q).split(/\s+/).filter(function(w){ return w.length>1; }), R=$("#rbuscar"); if(!p.length){ R.innerHTML=""; return; }
    var res=indiceBusqueda().map(function(e){ var t=sinAcentos(e.t), x=sinAcentos(e.x), s=0; p.forEach(function(w){ if(t.indexOf(w)>=0) s+=5; if(x.indexOf(w)>=0) s+=1; }); return {e:e,s:s,todas:p.every(function(w){ return t.indexOf(w)>=0||x.indexOf(w)>=0; })}; }).filter(function(r){ return r.todas; }).sort(function(a,b){ return b.s-a.s; }).slice(0,40);
    R.innerHTML=res.length?'<p class="pequeno">'+res.length+(es?" resultados":" results")+'</p><ul class="resultados">'+res.map(function(r){ var e=r.e, frag=e.d||e.x; var i=sinAcentos(frag).indexOf(p[0]); frag=frag?((i>60?"…":"")+frag.slice(Math.max(0,i-60),Math.max(0,i-60)+220)+(frag.length>220?"…":"")):"";
      return '<li><span class="tipo">'+e.k+'</span><a href="'+e.u+'">'+esc(e.t)+'</a>'+(frag?'<p>'+esc(frag)+'</p>':'')+'</li>'; }).join("")+'</ul>':'<p>'+(es?"No hay resultados. Prueba con otra palabra o en inglés.":"No results. Try another word.")+'</p>'; }
  $("#fbuscar").onsubmit=function(e){ e.preventDefault(); var v=$("#qbuscar").value; history.replaceState(null,"","#buscar/"+encodeURIComponent(v)); busca(v); };
  $("#qbuscar").oninput=function(){ busca(this.value); };
  busca(q);
};

P.legal=function(){ var es=lang==="es";
  var t=es?[
   ["Titular de la web","Sociedad Española de Arcillas (SEA). NIF: G18388165. Domicilio: IACT, Avda. de las Palmeras, 4, 18100 Armilla (Granada), España. Correo: "+SEA.correo+"."],
   ["Uso de la web","El acceso es libre y gratuito. Los textos propios de la SEA pueden citarse indicando la fuente. Las imágenes pertenecen a sus autores o a las instituciones indicadas en cada caso y no pueden reutilizarse sin su permiso. Los enlaces a webs externas se ofrecen como información; la SEA no se hace responsable de sus contenidos."],
   ["Responsable de los datos","La Sociedad Española de Arcillas, con los datos de contacto indicados arriba."],
   ["Qué datos tratamos y para qué","Los datos de los socios (nombre, centro y datos de contacto) se usan solo para gestionar la pertenencia a la Sociedad, las cuotas y la comunicación con los socios. Los correos que se envían a la SEA se usan para responderlos. En la web se publican el nombre y el centro de los miembros de la Junta Directiva y de los socios distinguidos, y las publicaciones científicas de los socios, que son información pública obtenida de la base de datos OpenAlex."],
   ["Base legal y conservación","La relación de socio y el consentimiento de quien escribe. Los datos se conservan mientras dure esa relación y, después, el tiempo exigido por la ley."],
   ["Tus derechos","Puedes pedir el acceso, la rectificación o la supresión de tus datos, la limitación u oposición a su uso y su portabilidad escribiendo a "+SEA.correo+". Si no quedas satisfecho, puedes reclamar ante la Agencia Española de Protección de Datos (aepd.es)."],
   ["Cookies","Esta web no usa cookies de publicidad ni de análisis. Solo guarda en tu navegador el idioma elegido y una copia de la web para que funcione sin conexión. El acceso de la Junta Directiva usa una cookie técnica de sesión."]]:[
   ["Website owner","Spanish Clay Society (Sociedad Española de Arcillas, SEA). Tax ID (NIF): G18388165 (EU VAT: ESG18388165). Address: IACT, Avda. de las Palmeras, 4, 18100 Armilla (Granada), Spain. Email: "+SEA.correo+"."],
   ["Use of the website","Access is free. The SEA’s own texts may be quoted with the source. Images belong to their authors or to the institutions indicated and may not be reused without permission. Links to external websites are provided for information; the SEA is not responsible for their content."],
   ["Data controller","The Spanish Clay Society, with the contact details above."],
   ["What data we process and why","Members’ data (name, institution and contact details) are used only to manage membership, fees and communication with members. Emails sent to the SEA are used to reply to them. The website shows the names and institutions of Board members and distinguished members, and members’ scientific publications, which are public information from the OpenAlex database."],
   ["Legal basis and retention","The membership relationship and the consent of those who write to us. Data are kept for as long as that relationship lasts and then for the period required by law."],
   ["Your rights","You can request access to, rectification or erasure of your data, restriction of or objection to its use, and portability by writing to "+SEA.correo+". You may also complain to the Spanish Data Protection Agency (aepd.es)."],
   ["Cookies","This website uses no advertising or analytics cookies. It only stores the chosen language and a copy of the site in your browser so that it works offline. The Board access uses a technical session cookie."]];
  main.innerHTML=cabezaPagina(es?"Aviso legal y privacidad":"Legal notice and privacy","",migaSEA())+'<div class="envoltorio pagina-cuerpo lectura">'+t.map(function(x,i){ return (i===2?'<h2 style="margin-top:2.5rem">'+(es?"Política de privacidad":"Privacy policy")+'</h2>':'')+'<h2 class="h3">'+x[0]+'</h2><p>'+esc(x[1])+'</p>'; }).join("")+'<p class="pequeno">'+(es?"Última actualización: noviembre de 2026.":"Last updated: November 2026.")+'</p></div>';
};


/* ---- Glosario enlazado: los términos técnicos muestran su definición al pasar el ratón o al tocarlos ---- */
var GLOS_RE=null, GLOS_DEF={};
function prepGlosario(){ if(GLOS_RE!==null) return GLOS_RE; var NO={"arcilla":1,"arcillas":1,"agua":1,"mineral":1,"amorfo":1,"adobe":1,"agregación":1,"aglomeración":1,"lámina":1,"cerámica":1,"suelo":1,"roca":1,"sedimento":1,"cemento":1,"hormigón":1,"vidrio":1,"porcelana":1,"ladrillo":1,"textura":1,"fábrica":1,"plasticidad":1,"estructura":1,"láminas":1,"superficie":1,"cristal":1,"espuma":1,"vítreo":1,"cocción":1,"partícula":1,"partículas":1,"capa":1,"grano":1,"poro":1,"poros":1,"fase":1,"matriz":1};
  var T=[]; (window.GLOSARIO||[]).forEach(function(g){ var t=String(g.t).replace(/\(.*?\)/g,"").split(/,| o /)[0].trim();
    if(t.length<6||NO[t.toLowerCase()]||/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ\- ]/.test(t)) return; var k=t.toLowerCase(); if(GLOS_DEF[k]) return; GLOS_DEF[k]=g.d; T.push(t); });
  T.sort(function(a,b){ return b.length-a.length; });
  GLOS_RE=T.length?new RegExp("(^|[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ])("+T.map(function(t){ return t.replace(/[-]/g,"\\-"); }).join("|")+")(?=[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]|$)","i"):false; return GLOS_RE; }
function enlazarGlosario(id){ if(lang!=="es"||/^(glosario|buscar|legal|cuestionario|inicio|junta|fotos|pubsocios|estatutos|semblanzas)$/.test(id)) return; var re=prepGlosario(); if(!re) return;
  var usados={}, n=0, MAX=10, w=document.createTreeWalker(main,NodeFilter.SHOW_TEXT,{acceptNode:function(t){ var p=t.parentNode; if(!p||p.closest("a,button,h1,h2,h3,h4,summary,.term,script,style,svg,.miga,label,select,option,table")) return NodeFilter.FILTER_REJECT; return p.closest("p,li,dd")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT; }}), L=[];
  while(w.nextNode()) L.push(w.currentNode);
  L.forEach(function(t){ if(n>=MAX) return; var m=re.exec(t.nodeValue); if(!m) return; var k=m[2].toLowerCase(); if(usados[k]) return; usados[k]=1; n++;
    var i=m.index+m[1].length, r=t.splitText(i); r.splitText(m[2].length); var sp=document.createElement("span"); sp.className="term"; sp.tabIndex=0; sp.setAttribute("role","button"); sp.setAttribute("data-def",GLOS_DEF[k]); sp.setAttribute("aria-label",m[2]+": "+GLOS_DEF[k]); sp.textContent=m[2]; r.parentNode.replaceChild(sp,r); }); }
(function(){ var pop=null; function cierra(){ if(pop){ pop.remove(); pop=null; } }
  function abre(el){ cierra(); pop=document.createElement("div"); pop.className="defpop"; pop.setAttribute("role","tooltip"); pop.innerHTML='<b>'+esc(el.textContent)+'</b> '+esc(el.getAttribute("data-def"))+' <a href="#glosario">Glosario</a>'; document.body.appendChild(pop);
    var r=el.getBoundingClientRect(), W=Math.min(360,window.innerWidth-24); pop.style.width=W+"px"; var x=Math.min(Math.max(12,r.left+window.scrollX),window.scrollX+window.innerWidth-W-12); pop.style.left=x+"px"; pop.style.top=(r.bottom+window.scrollY+8)+"px"; }
  document.addEventListener("click",function(e){ var t=e.target.closest(".term"); if(t){ e.preventDefault(); abre(t); } else if(!e.target.closest(".defpop")) cierra(); });
  document.addEventListener("mouseover",function(e){ var t=e.target.closest(".term"); if(t&&matchMedia("(hover:hover)").matches) abre(t); });
  document.addEventListener("mouseout",function(e){ var t=e.target.closest(".term"); if(t&&!(e.relatedTarget&&e.relatedTarget.closest&&e.relatedTarget.closest(".defpop"))) setTimeout(function(){ if(pop&&!pop.matches(":hover")) cierra(); },250); });
  document.addEventListener("focusin",function(e){ var t=e.target.closest&&e.target.closest(".term"); if(t) abre(t); });
  document.addEventListener("keydown",function(e){ if(e.key==="Escape") cierra(); });
  window.addEventListener("hashchange",cierra); })();

function cabecera(){
  var c=$("#cabecera");
  c.innerHTML='<div class="envoltorio"><a class="marca" href="#inicio">'+marcaSVG()+'<span><b>'+U("sea")+'</b><span>'+(lang==="es"?"Spanish Clay Society":"Sociedad Española de Arcillas")+'</span></span></a>'+
   '<nav class="menu" id="menu" aria-label="'+U("menu")+'">'+[["sociedad",U("sociedad")],["arcillas",U("arcillas")]].map(function(g){ return '<div class="grupo-menu"><button aria-expanded="false">'+g[1]+'</button><div class="desplegable">'+U("nav."+g[0]).map(function(x){ return '<a href="#'+x[0]+'">'+x[1]+'</a>'; }).join("")+'</div></div>'; }).join("")+
   '<a class="enlace-menu discreto" href="#socio">'+U("hazte")+'</a></nav>'+
   '<a class="lupa" href="#buscar" aria-label="'+(lang==="es"?"Buscar":"Search")+'" title="'+(lang==="es"?"Buscar":"Search")+'"><svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15.5 15.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></a>'+
   '<div class="idioma" role="group" aria-label="Idioma / Language"><button data-lang="es" aria-pressed="'+(lang==="es")+'">ES</button><button data-lang="en" aria-pressed="'+(lang==="en")+'">EN</button></div><button id="abrirMenu" aria-expanded="false" aria-controls="menu">'+U("menu")+'</button></div>';
  $$(".grupo-menu>button",c).forEach(function(b){ b.onclick=function(e){ e.stopPropagation(); var g=b.parentNode, ab=!g.classList.contains("abierto"); $$(".grupo-menu",c).forEach(function(x){ x.classList.remove("abierto"); x.firstChild.setAttribute("aria-expanded","false"); }); if(ab){ g.classList.add("abierto"); b.setAttribute("aria-expanded","true"); } }; });
  $("#abrirMenu").onclick=function(){ var m=$("#menu"), ab=!m.classList.contains("abierto"); m.classList.toggle("abierto",ab); this.setAttribute("aria-expanded",ab); this.textContent=ab?U("cerrar"):U("menu"); };
  $$("[data-lang]",c).forEach(function(b){ b.onclick=function(){ lang=b.getAttribute("data-lang"); try{ localStorage.setItem("sea-lang",lang); }catch(e){} cabecera(); pie(); ir(); }; });
}
document.addEventListener("click",function(e){
  if(!e.target.closest(".grupo-menu")) $$(".grupo-menu").forEach(function(x){ x.classList.remove("abierto"); });
  var v=e.target.closest("[data-ver]"); if(v){ verImagen(v.getAttribute("data-ver"),v.getAttribute("data-cap")); }
});
function pie(){
  $("#pie").innerHTML='<div class="estratos sobre-oscuro"></div><div class="envoltorio"><div><img src="logo-sea-negativo.png" alt="" width="72" height="72" style="margin-bottom:1rem"><h2 class="pie-h">'+U("sea")+'</h2><p>'+U("sobreSEA")+'</p><p>'+esc(SEA.sede)+'<br><a href="mailto:'+SEA.correo+'">'+SEA.correo+'</a></p><p class="pequeno" style="color:#8f897f">'+U("creditos")+'. '+U("credT")+'</p><p class="pequeno"><a href="#legal" style="color:#8f897f">'+(lang==="es"?"Aviso legal y privacidad":"Legal notice and privacy")+'</a> · <a href="#clay2027" style="color:#8f897f">CLAY 2027</a></p></div><div><h2 class="pie-h">'+U("sociedad")+'</h2><ul>'+U("nav.sociedad").map(function(x){ return '<li><a href="#'+x[0]+'">'+x[1]+'</a></li>'; }).join("")+'<li><a href="#socio">'+U("hazte")+'</a></li></ul></div><div><h2 class="pie-h">'+U("arcillas")+'</h2><ul>'+U("nav.arcillas").map(function(x){ return '<li><a href="#'+x[0]+'">'+x[1]+'</a></li>'; }).join("")+'</ul><p class="pequeno" style="margin-top:1rem;color:#8f897f">'+U("pie")+'</p></div></div>';
}
function ir(){
  var h=(location.hash||"#inicio").slice(1).split("?")[0], partes=h.split("/"), id=partes[0], arg=partes[1];
  if(!P[id]) id="inicio";
  clearInterval(heroeTimer); limpiar3D();
  if(visor&&visor.open) visor.close();
  var m=$("#menu"); if(m){ m.classList.remove("abierto"); var b=$("#abrirMenu"); if(b){ b.setAttribute("aria-expanded","false"); b.textContent=U("menu"); } }
  $$(".grupo-menu").forEach(function(x){ x.classList.remove("abierto"); });
  P[id](arg);
  try{ enlazarGlosario(id); }catch(e){}
  $$("[data-ir]",main).forEach(function(b){ if(b.tagName!=="TR") b.onclick=function(){ location.hash=b.getAttribute("data-ir"); }; });
  $$(".desplegable a").forEach(function(a){ a.setAttribute("aria-current",a.getAttribute("href")==="#"+id?"page":"false"); });
  window.scrollTo(0,0);
  var tit=$("h1",main); document.title=(id==="inicio"?"":(tit?tit.textContent+" | ":""))+U("sea");
  document.documentElement.lang=lang;
  var md=document.querySelector('meta[name="description"]'), ent=$(".entrada",main);
  if(md){ var dtxt=(id!=="inicio"&&ent)?ent.textContent:(lang==="es"?"Sociedad Española de Arcillas (SEA): el mundo de las arcillas para todos, y la sociedad científica que las estudia en España.":"Spanish Clay Society (SEA): the world of clays for everyone, and the scientific society that studies them in Spain."); md.setAttribute("content",dtxt.length>160?dtxt.slice(0,157).replace(/\s+\S*$/,"")+"…":dtxt); }
}
document.addEventListener("DOMContentLoaded",function(){
  main=$("main"); cabecera(); pie(); window.addEventListener("hashchange",ir); ir();
  if("serviceWorker" in navigator&&location.protocol==="https:") navigator.serviceWorker.register("sw.js").catch(function(){});
});
})();

