# Instrucciones para Claude: actualizar la web de la Sociedad Española de Arcillas (SEA)

Lee este documento entero antes de hacer nada.

Quien te escribe no es informático. Necesita que hagas el cambio, que le devuelvas dos archivos zip y que le digas en dos líneas qué hacer con ellos. No le pidas que edite código ni que ejecute nada.

## 1. Cómo está organizada la web

La web es estática (HTML + JavaScript), en español y en inglés, y está en https://sea-arcillas.es/. No hay base de datos. Tiene tres carpetas:

| Carpeta | Qué contiene | ¿La tocas? |
|---|---|---|
| `1-FIJO/` | El programa (`programa/`: `app.js`, `estilo.css`, tipos de letra, logotipos) y el archivo histórico de PDF (`archivo-historico/`). | **No.** Solo si te lo piden expresamente y el cambio lo exige. |
| `2-ACTUALIZABLE/` | Todo el contenido: textos en `.js`, `imagenes/` (fotos, Junta, SEM/TEM, muestras de mano, microfotografías, logotipos de socios institucionales) y `documentos/` (PDF y Word nuevos). | **Sí.** Aquí van todos tus cambios. |
| `3-AUTOMATICO/` | Publicaciones de los socios y trabajos destacados. Los escribe un programa del servidor cada 3 meses. | **Nunca.** Cualquier cambio se perdería en la siguiente ejecución. |

En la raíz están `index.html`, `sw.js`, `404.html`, `.htaccess` (redirecciones de las direcciones de la web antigua) y otros archivos del servidor: no los toques.

## 2. Qué recibes

- `web-SEA-datos.zip`: los archivos de texto de `2-ACTUALIZABLE/` (los `.js` y `lista-imagenes.json`). No lleva imágenes ni documentos, que ya están en el servidor.
- Este documento.
- Lo nuevo que haya que poner: un texto, fotos, un PDF, un nombre…

## 3. Qué tienes que devolver SIEMPRE

1. **`web-SEA-datos.zip` actualizado:** el mismo zip con tus cambios, misma estructura y mismo nombre. La persona lo guarda para la próxima vez.
2. **`CAMBIOS-para-el-servidor.zip`:** solo los archivos nuevos o modificados, con las rutas relativas a `2-ACTUALIZABLE/` (por ejemplo `noticias.js`, `imagenes/fotos/2027-asamblea.webp`, `documentos/bases-2028.pdf`). El técnico lo descomprime **dentro de la carpeta `2-ACTUALIZABLE`** del servidor, sustituyendo lo que haya.
3. **Un resumen breve:**
   - si algo no lo has podido hacer o te falta un dato, dilo al principio;
   - qué has cambiado, en una o dos frases;
   - «Guarda el nuevo web-SEA-datos.zip (sustituye al anterior)»;
   - «Envía CAMBIOS-para-el-servidor.zip al técnico: lo descomprime dentro de 2-ACTUALIZABLE».

## 4. Mapa de archivos de `2-ACTUALIZABLE/`

| Archivo | Contenido |
|---|---|
| `noticias.js` | Noticias, convocatorias y eventos (`window.NOTICIAS`), de más reciente a más antigua. Campos: `tipo` (noticia, convocatoria o evento), `fecha` y `plazo` (AAAA-MM-DD; el plazo solo en convocatorias), `id`, `es:{n,t,l}` y `en:{n,t,l}` (título, texto breve y texto ampliado opcional), `url` (enlace externo), `doc` (documento descargable, `2-ACTUALIZABLE/documentos/archivo.pdf`), `img` (imagen opcional, `2-ACTUALIZABLE/imagenes/fotos/archivo.webp`). |
| `sea.js` | Contenido institucional: Junta Directiva (`junta`), premios (`premios`), distinciones, socios de honor (`honor`), reuniones, presencia internacional. |
| `palmares.js` | Ganadores de cada premio por año (`window.PALMARES`). |
| `fotos.js` | Galería de fotos (`window.FOTOS_SEA`). Campos: `f` (nombre del archivo sin extensión), `g` (reuniones, premios, congresos, icc2017 o historia), `y` (año), `es`, `en` (pies) y `src` (fuente). |
| `juntas.js` | Historia de las Juntas Directivas y presidentes. |
| `sea-textos.js` | Textos largos (historia de la SEA…). |
| `centros.js` | «Dónde se investiga»: SOLO centros, nunca nombres de personas. |
| `datos.js`, `datos-interes.js`, `datos-mapa.js`, `datos-mundo.js` | Fichas de minerales, sus imágenes SEM/TEM, muestras de mano, microfotografías y datos de interés. |
| `destacados.js` | Comentarios de los trabajos más citados de cada apartado (ver tarea fija, sección 6). |
| `ajustes-rankings.js` | Correcciones a los rankings automáticos: mover un trabajo de apartado u ocultarlo. |
| `afines.js` | Sociedades afines. |
| `glosario.js`, `evolucion.js`, `tecnicas-nuevas.js`, `geologia.js` | Contenidos de divulgación. |
| `docs.js` | Lista de documentos descargables. |
| `lista-imagenes.json` | Lista de todas las imágenes, para que la web funcione sin conexión. |

## 5. Cómo hacer los cambios habituales

**Noticia, convocatoria o evento**
1. Añade un objeto al principio de `noticias.js`, con todos los campos en español y en inglés.
2. El `id` se forma con la fecha y unas palabras del título, sin tildes y unidas por guiones: `2027-01-10-asamblea-general`.
3. Si hay un documento, ponlo en `documentos/` con un nombre sin espacios ni tildes y escribe en `doc` la ruta `2-ACTUALIZABLE/documentos/nombre.pdf`.
4. Las convocatorias salen como abiertas hasta su `plazo` y después pasan solas a «cerrada».

**Convocatoria de un premio (abrir, ampliar el plazo, cambiar las bases)**
1. En `sea.js`, en `premios`, cambia el campo `abierto` del premio (la fecha del plazo) y los textos `r` (resumen) y `t` (condiciones) en `es` y en `en`.
2. Los documentos van en `d`, dentro de `es` y de `en`: `d:[["Bases (PDF)","2-ACTUALIZABLE/documentos/bases.pdf"],["Formulario de inscripción (Word)","2-ACTUALIZABLE/documentos/formulario.docx"]]`.
3. Si hay una noticia de esa convocatoria en `noticias.js`, actualízala también con el mismo plazo.

**Reunión o jornada de la SEA (o congreso internacional)**
- En `sea.js`, en `reunionesNac` (o `reunionesInt`), añade al principio: `["AÑO","Nombre","Lugar","AAAA-MM-DD/AAAA-MM-DD",["libro.pdf","guia.pdf"]]`. Si es un solo día, una sola fecha; si no se conoce, `""`. Los PDF van en `documentos/` y también en `publicaciones` (grupo `resumenes` o `guias`), para que salgan en las dos páginas.
- Las listas van de la más reciente a la más antigua.

**Ganador de un premio**
- En `palmares.js`, añade `["AÑO","Nombre"]` al principio de la lista `l` de ese premio.

**Imágenes (galería, Junta, SEM/TEM, muestras de mano, microfotografías)**
1. Formato WebP, en dos tamaños, en la subcarpeta que toque de `imagenes/` (`fotos`, `sea`, `sem`, `mano` o `micro`):
   - `imagenes/CARPETA/NOMBRE.webp`: lado mayor 1400 px, calidad 82;
   - `imagenes/CARPETA/mini/NOMBRE.webp`: lado mayor 560 px, calidad 78.
2. NOMBRE: sin espacios ni tildes, unido por guiones (`2026-asamblea-madrid`). Aplica la rotación EXIF.
3. Añade la entrada en su archivo: `fotos.js` (galería), `sea.js` (Junta, foto `AAAA-MM-INICIALES.webp`, 450 × 520 px), `datos.js` (SEM/TEM, mano y micro de cada mineral). Copia el formato de las entradas vecinas.
4. Añade las rutas nuevas (`2-ACTUALIZABLE/imagenes/…`) a `lista-imagenes.json`, en orden alfabético.
5. Fotos de la SEA o de colecciones propias: sin crédito de colección. Fotos de terceros (por ejemplo, Wikimedia Commons): autor y licencia en el pie, siempre. Usa solo imágenes con licencia libre o propias.

**Junta Directiva**
- En `sea.js`, en `junta`: cargo (es y en), nombre, centro, correo y foto.
- Si cambia la Junta entera, añádela también a `juntas.js`.

**Publicaciones de los socios**
- Se actualizan solas cada 3 meses en el servidor (`3-AUTOMATICO/`). No las toques.
- NUNCA pidas ni guardes la lista de socios: tiene datos personales.

## 6. Tarea fija en CADA actualización: comentarios de los más citados

Hazla siempre, además de lo que te pidan, y menciónala en el resumen. Si en esta conversación no puedes consultar internet, dilo y sáltala: se hará la próxima vez.

Cada 3 meses, un programa del servidor actualiza los rankings de trabajos de socios más citados. Tu tarea es que los primeros de cada ranking tengan comentario y estén en el apartado correcto.

1. Descarga los rankings publicados (son públicos):
   - https://sea-arcillas.es/3-AUTOMATICO/aportaciones.js (aplicaciones, `window.APORTES`)
   - https://sea-arcillas.es/3-AUTOMATICO/geo-refs.js (geología, `window.GEO_REFS`)
   Si no responden, usa https://alg865.github.io/Arcillas-SEA/ con las mismas rutas.
2. Aplica `ajustes-rankings.js`. En cada apartado, toma los **3 trabajos más citados** (campo `c`).
3. Los que no estén en `destacados.js` (compara por `doi`, en minúsculas) necesitan comentario:
   - Busca el trabajo por su DOI (https://doi.org/DOI o https://api.openalex.org/works/doi:DOI, que da el resumen) y léelo.
   - Comprueba que el apartado es correcto. Si no lo es, añade el DOI a `mover` en `ajustes-rankings.js` con el apartado bueno (usa solo apartados que ya existan en los rankings). Si no encaja en ninguno, añádelo a `ocultar`.
   - Añade el trabajo a `destacados.js` en su apartado, con el mismo formato que los demás: `doi`, `a` (autores, «y otros» si son más de dos), `y`, `r` (revista), `c` (citas) y `es:{t,x}`, `en:{t,x}`.
   - `t`: un título breve y claro para el público general (no el título del artículo). `x`: 3 a 5 frases con qué aportó el trabajo y por qué se cita tanto, en lenguaje sencillo. Escríbelo con tus palabras: no copies el resumen. Nada que no esté en el artículo.
4. No borres comentarios existentes ni cambies los rankings de `3-AUTOMATICO/`.
5. Mete `destacados.js` y `ajustes-rankings.js` en el zip de cambios si los has tocado.

## 7. Reglas de contenido de la SEA (obligatorias)

1. Solo datos verdaderos y comprobados. Si no estás seguro de algo, pregunta; no lo inventes ni lo deduzcas.
2. Ninguna lista de personas incompleta: es mejor no poner la lista que dejar a alguien fuera.
3. «Dónde se investiga» muestra centros, nunca nombres de personas.
4. Nunca publiques datos personales de socios: teléfonos, NIF, direcciones ni listas de socios.
5. Escribe IACT-CSIC.
6. El contenido de la AIPEA (aipea.org) solo se enlaza, no se copia.
7. Los socios de honor no aparecen como socios de número, salvo Saverio Fiore, que es socio de la SEA.
8. Nombres: «Mercedes Suárez», sin segundo apellido; «Castell-Landete»; «López Galindo», sin guion.
9. Todo texto nuevo va en español y en inglés. El inglés debe ser una traducción correcta y natural.
10. Tono sobrio e informativo, sin adjetivos promocionales.

## 8. Antes de devolver los archivos

- Comprueba que cada `.js` que hayas tocado sigue siendo válido. Si puedes ejecutar código, usa `node --check archivo.js` o lee su contenido con un analizador.
- No borres ni reordenes nada que no te hayan pedido cambiar.
- No hace falta tocar `sw.js`: los textos nuevos llegan solos a los navegadores.
- Nada fuera de `2-ACTUALIZABLE/` en el zip de cambios.
- Fechas siempre en formato AAAA-MM-DD.
- Revisa que el zip de cambios lleva todos los archivos nuevos y modificados, cada uno en su carpeta.
