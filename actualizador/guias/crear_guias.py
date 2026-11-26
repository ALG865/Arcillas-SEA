import json,subprocess
def P(t,**k): return dict(type="p",r=t if isinstance(t,list) else [{"t":t}],**k)
def H1(t): return dict(type="h1",r=[{"t":t}])
def H2(t): return dict(type="h2",r=[{"t":t}])
def B(t): return dict(type="bullet",r=t if isinstance(t,list) else [{"t":t}],after=40)
def N(t,ref): return dict(type="num",r=t if isinstance(t,list) else [{"t":t}],ref=ref,after=60)
def BOX(t): return dict(type="box",r=t if isinstance(t,list) else [{"t":t}],after=120)
def T(cols,rows): return dict(type="table",cols=cols,head=True,rows=rows,sz=10)
def b(t): return {"t":t,"b":True}
def n(t): return {"t":t}
def render(name,title,blocks,refs):
    spec=dict(title=title,font="Arial",size=11,margin={"top":1134,"bottom":1134,"left":1304,"right":1304},footer=title,numRefs=refs,blocks=blocks)
    json.dump(spec,open(name+".json","w"),ensure_ascii=False)
    subprocess.run(["node","/home/claude/cvtools/render.js",name+".json",name+".docx"],check=True)

# ---------------- CLAUDE ----------------
c=[dict(type="title",r=[n("Actualizar la web de la SEA con Claude")],sz=16),
P([{"t":"Para cualquier cambio en la web. No hace falta instalar nada.","i":True}],center=True,after=200),
H1("Qué necesitas"),
B([b("Una cuenta de Claude "),n("(claude.ai). Sirve la gratuita para cambios pequeños. Con la de pago puedes crear un Proyecto y no tendrás que subir los archivos cada vez (ver el final).")]),
B([b("La carpeta «para-Claude» "),n("del ordenador de la web. Contiene dos archivos: "),b("INSTRUCCIONES-PARA-CLAUDE.md"),n(" y "),b("web-SEA-datos.zip"),n(". El programa ACTUALIZAR-WEB los pone al día cada vez que se ejecuta.")]),
B([b("Acceso al servidor de la SEA "),n("para subir los archivos que Claude te devuelva.")]),
H1("Paso a paso"),
N([b("Abre una conversación nueva "),n("en claude.ai.")],"p1"),
N([b("Sube estos archivos "),n("arrastrándolos a la conversación:")],"p1"),
B("INSTRUCCIONES-PARA-CLAUDE.md (siempre)."),
B("web-SEA-datos.zip (siempre)."),
B("Lo nuevo: fotos, PDF de unas bases, el texto de un correo…"),
N([b("Escribe lo que quieres, "),n("en una frase clara. Ejemplos:")],"p1"),
B([{"t":"«Lee las instrucciones. Añade esta noticia: …»","i":True}]),
B([{"t":"«Lee las instrucciones. Amplía el plazo de los premios Martín-Vivaldi y Serratosa hasta el 17 de enero de 2027.»","i":True}]),
B([{"t":"«Lee las instrucciones. Añade estas 3 fotos a la galería, tema Reuniones, año 2026, con estos pies: …»","i":True}]),
N([b("Revisa lo que te propone. "),n("Si algo no está bien, díselo y lo corregirá.")],"p1"),
N([b("Descarga los archivos "),n("que te devuelva. Al final te dirá qué hacer con cada uno:")],"p1"),
B([b("«Sube al servidor»"),n(": cópialos al servidor de la SEA, en la misma carpeta y sustituyendo los antiguos.")]),
B([b("«Guarda en ENTRADA»"),n(": cópialos a la carpeta ENTRADA del ordenador de la web, sustituyendo los antiguos. Es muy importante: si no lo haces, la próxima vez que se use ACTUALIZAR-WEB se perderá el cambio.")]),
N([b("Comprueba la web "),n("en el navegador. Si no ves el cambio, recarga la página con Ctrl + F5.")],"p1"),
H1("Qué archivos subir a Claude según el cambio"),
T([3600,5700],[["Quiero…","Sube, además de las instrucciones y el zip…"],
 ["Añadir o cambiar una noticia o convocatoria","El texto, y los PDF o Word si los hay."],
 ["Cambiar el plazo de un premio","Nada más."],
 ["Añadir el ganador de un premio","Nada más (escribe el nombre en el mensaje)."],
 ["Añadir fotos a la galería","Las fotos (JPG o PNG), con su tema, año y pie."],
 ["Cambiar la Junta Directiva","Los nombres y cargos nuevos, y las fotos si las hay."],
 ["Corregir un texto o un dato","Nada más (indica dónde está el error y cómo debe quedar)."]]),
H1("Reglas que Claude ya conoce"),
P("Están en las instrucciones y no hace falta repetírselas: solo datos verdaderos; nunca datos personales de los socios; ninguna lista de personas incompleta; IACT-CSIC; los contenidos de la AIPEA solo se enlazan. Todo texto nuevo se pone en español y en inglés."),
BOX([b("Nunca subas a Claude el archivo socios.xlsx. "),n("Tiene datos personales y no hace falta para ningún cambio.")]),
H1("Si tienes Claude de pago: Proyecto"),
N("En claude.ai, crea un Proyecto llamado «Web de la SEA».","p2"),
N("En las instrucciones del proyecto, pega el contenido de INSTRUCCIONES-PARA-CLAUDE.md.","p2"),
N("En los archivos del proyecto, sube web-SEA-datos.zip. Sustitúyelo por el nuevo cada vez que se haya usado ACTUALIZAR-WEB.","p2"),
N("Desde entonces, abre las conversaciones dentro del proyecto y sube solo lo nuevo.","p2"),
]
render("Actualizar-la-web-con-Claude","Actualizar la web de la SEA con Claude",c,["p1","p2"])

# ---------------- BAT ----------------
a=[dict(type="title",r=[n("Actualizar la web de la SEA con ACTUALIZAR-WEB")],sz=16),
P([{"t":"Para fotos, noticias, premios y publicaciones. Un doble clic.","i":True}],center=True,after=200),
H1("La carpeta del ordenador"),
T([3300,6000],[["Carpeta o archivo","Para qué sirve"],
 ["ACTUALIZAR-WEB.bat","Doble clic para actualizar la web."],
 ["INSTALAR (una sola vez).bat","Prepara el ordenador. Solo la primera vez."],
 ["ENTRADA\\fotos","Aquí se dejan las fotos nuevas."],
 ["ENTRADA\\documentos","Aquí se dejan los PDF o Word (bases, formularios…) y las imágenes de las noticias."],
 ["ENTRADA\\noticias.xlsx","Todas las noticias de la web. Lo que hay en el Excel es lo que sale en la web."],
 ["ENTRADA\\premios.xlsx","Premios: convocatorias, palmarés, distinciones y socios de honor."],
 ["ENTRADA\\socios.xlsx","Lista de socios. PRIVADA: nunca se sube a ningún sitio ni se envía a nadie."],
 ["ENTRADA\\hecho","Lo ya procesado, por fechas, y el registro de todo lo que se ha hecho."],
 ["web","Copia completa de la web. No hace falta tocarla."],
 ["para-Claude","Kit para hacer cambios con Claude (ver el otro documento)."],
 ["config.ini","Datos del servidor para subir la web. Lo rellena una vez el técnico."]]),
H1("Primera vez en un ordenador"),
N([n("Haz doble clic en "),b("INSTALAR (una sola vez).bat"),n(".")],"i1"),
N([n("Si falta Python, se abrirá su página de descarga. Instálalo y "),b("marca la casilla «Add python.exe to PATH»"),n(" antes de pulsar «Install Now». Después vuelve a hacer doble clic en INSTALAR.")],"i1"),
N("Espera a que diga «TODO LISTO». Descarga el traductor (unos 100 MB), así que tarda unos minutos.","i1"),
N([n("Pide al técnico del servidor que rellene "),b("config.ini"),n(" si queréis que la web se suba sola. Si no, se sube a mano (ver «Publicar»).")],"i1"),
H1("Añadir fotos"),
N([n("Copia las fotos en "),b("ENTRADA\\fotos"),n(", tal como salen de la cámara o del móvil.")],"f1"),
N([n("Doble clic en "),b("ACTUALIZAR-WEB"),n(". Se abrirá el Excel de fotos con una fila por foto y su miniatura.")],"f1"),
N([n("Rellena "),b("Tema"),n(" (de la lista), "),b("Año"),n(" y "),b("Pie de foto"),n(". Si salen personas, escribe sus nombres en «Personas (de izquierda a derecha)». Guarda y cierra el Excel.")],"f1"),
N([n("Doble clic otra vez en "),b("ACTUALIZAR-WEB"),n(". Las fotos se publican y la carpeta se queda vacía.")],"f1"),
H1("Noticias, convocatorias y eventos"),
N([n("Abre "),b("ENTRADA\\noticias.xlsx"),n(".")],"n1"),
N([b("Para añadir, "),n("escribe una fila nueva: Tipo (de la lista), Fecha, Plazo (solo convocatorias), Título y Texto. Si hay documentos, déjalos en ENTRADA\\documentos y escribe sus nombres en la columna Documentos.")],"n1"),
N([b("Para corregir o quitar, "),n("cambia o borra la fila.")],"n1"),
N([n("Guarda, cierra y haz doble clic en "),b("ACTUALIZAR-WEB"),n(".")],"n1"),
P([n("Las columnas en inglés se rellenan solas. Puedes corregirlas, y tu corrección se respeta. Las convocatorias pasan a «cerradas» solas al pasar el plazo.")],before=60),
H1("Premios"),
P([n("Todo está en "),b("ENTRADA\\premios.xlsx"),n(", una hoja por tema:")]),
B([b("Convocatorias: "),n("para abrir o ampliar un plazo, cambia la fecha de la columna Plazo. La noticia de portada se crea sola. Las bases y formularios van en ENTRADA\\documentos, con su nombre en la columna Documentos.")]),
B([b("Palmarés: "),n("tras cada fallo, añade una fila con Premio, Año y Ganador. La noticia del fallo se crea sola.")]),
B([b("Distinciones "),n("y "),b("Socios de honor: "),n("una fila por cada nuevo.")]),
P([n("No cambies la columna «Código» de la hoja Convocatorias.")],before=60),
H1("Socios y publicaciones (automático)"),
P([n("Cada vez que se ejecuta ACTUALIZAR-WEB, se actualizan solas las publicaciones de los socios de los últimos 24 meses y los trabajos más citados. Basta con tener al día "),b("ENTRADA\\socios.xlsx"),n(":")]),
B([b("Alta: "),n("añade una fila con el nombre completo, el centro y, si se sabe, el ORCID.")]),
B([b("Baja: "),n("borra la fila.")]),
B([n("Si sale un artículo que no es de arcillas, pon su DOI en la hoja «Excluir artículos» (o en «Excluir destacados»).")]),
H1("Publicar"),
B([b("Si el técnico ha rellenado config.ini, "),n("la web se sube sola al terminar.")]),
B([b("Si no, "),n("al terminar se abre "),b("ARCHIVOS-PARA-SUBIR.txt"),n(" con la lista de archivos de la carpeta «web» que hay que copiar al servidor. Cuando los hayas subido, borra ese archivo.")]),
H1("Si algo sale mal"),
B([n("La ventana dice qué falta y en qué fila del Excel. Corrígelo, guarda y vuelve a hacer doble clic.")]),
B([n("Si un Excel está abierto, el programa espera a que lo cierres.")]),
B([n("Si no hay internet, se actualiza lo demás y las publicaciones quedan para la próxima vez.")]),
B([n("Todo lo que hace el programa queda escrito en ENTRADA\\hecho\\registro.txt. Si hace falta ayuda, envía ese archivo.")]),
BOX([b("Nunca envíes a nadie "),n("socios.xlsx ni config.ini: contienen datos personales y la contraseña del servidor.")]),
]
render("Actualizar-la-web-con-ACTUALIZAR-WEB","Actualizar la web de la SEA con ACTUALIZAR-WEB",a,["i1","f1","n1"])
