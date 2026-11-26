# Instrucciones para Claude: actualizar la web de la Sociedad Española de Arcillas (SEA)

Lee este documento entero antes de hacer nada. Quien te escribe no es informático: necesita que hagas el cambio, que le devuelvas los archivos listos y que le digas exactamente qué subir.

## 1. Qué es la web

- Web estática de una sola página (HTML + JavaScript), en español e inglés, para https://sea-arcillas.es/
- No hay base de datos: todo el contenido está en archivos `.js` de datos.
- La web se actualiza de dos formas. Las dos deben dar el mismo resultado:
  1. Con el programa `ACTUALIZAR-WEB.bat`, que lee los Excel de la carpeta `ENTRADA`.
  2. Contigo, a partir del zip `web-SEA-datos.zip`, que lleva los archivos de datos y los Excel de noticias y premios.

## 2. Regla más importante: el Excel manda

Noticias, premios y fotos los genera el programa a partir de los Excel. Si solo cambias el `.js`, la próxima vez que alguien ejecute el `.bat` tu cambio se perderá.

| Contenido | Cambia SIEMPRE el Excel… | …y también el archivo de la web |
|---|---|---|
| Noticias, convocatorias, eventos | `ENTRADA/noticias.xlsx` | `noticias.js` |
| Premios (fichas, plazos, palmarés, distinciones, socios de honor) | `ENTRADA/premios.xlsx` | `premios-datos.js` |
| Fotos de la galería | (la fila va en `ENTRADA/fotos/fotos.xlsx` solo si se usa el `.bat`) | `fotos.js` + imágenes |

Devuelve siempre los dos: el Excel modificado y el `.js` modificado.

## 3. Mapa de archivos

| Archivo | Contenido |
|---|---|
| `noticias.js` | Noticias, convocatorias y eventos (`window.NOTICIAS`). Campos: `tipo` (noticia, convocatoria o evento), `fecha` y `plazo` (AAAA-MM-DD), `id`, `es:{n,t,l}` y `en:{n,t,l}` (título, texto y texto ampliado opcional), `url`, `img`, `d` (documentos: `[ruta, etiqueta es, etiqueta en]`). |
| `premios-datos.js` | `window.PREMIOS_DATOS = {premios, palmares, distinciones, honor}`. Un premio con `abierto:"AAAA-MM-DD"` sale como «Convocatoria abierta» hasta esa fecha. |
| `fotos.js` | Galería (`window.FOTOS_SEA`). Campos: `f` (nombre sin extensión), `g` (reuniones, premios, congresos, icc2017 o historia), `y` (año), `es`, `en`, `src` (fuente). |
| `sea.js` | Textos institucionales y Junta Directiva (`SEA.junta`), reuniones y presencia internacional. |
| `juntas.js` | Historia de las Juntas Directivas y lista de presidentes. |
| `sea-textos.js` | Textos largos: historia de la SEA, etc. |
| `centros.js` | «Dónde se investiga»: SOLO centros, nunca nombres de personas. |
| `datos.js`, `datos-interes.js`, `modelos3d.js` | Fichas de minerales, sus «datos de interés» y los modelos 3D. Cámbialos solo si te lo piden expresamente. |
| `aportaciones.js`, `geo-refs.js`, `otras.js`, `destacados.js` | Trabajos destacados por aplicación y por tema geológico. Los actualiza el `.bat` desde OpenAlex. |
| `publicaciones.js` | Publicaciones de los socios. Lo genera el `.bat`. No lo edites a mano. |
| `glosario.js`, `evolucion.js`, `tecnicas-nuevas.js`, `afines.js`, `geologia.js` | Contenidos de divulgación. |
| `app.js`, `estilo.css`, `index.html` | Programa y diseño. Tócalos solo si el cambio lo exige, y con mucho cuidado. |
| `sw.js` | Caché para funcionar sin conexión. |
| `img/fotos/` (y `mini/`), `docs/` | Imágenes de la galería y documentos descargables. |

## 4. Cómo hacer los cambios habituales

**Noticia, convocatoria o evento**
1. Añade una fila a `noticias.xlsx`. Columnas:
   - Tipo, Fecha y Plazo (el plazo solo en convocatorias).
   - Título y Texto (dos o tres frases).
   - Enlace y Documentos (nombres de archivo), opcionales.
   - Título, Texto y Texto ampliado en inglés.
   - Deja vacía la columna Código.
2. Añade el mismo objeto al principio de `noticias.js`. El `id` es la fecha y el título en minúsculas sin tildes, unidos por guiones: `2027-01-10-titulo-corto`.
3. Si hay documentos (PDF, Word), ponlos en `docs/` con nombres sin espacios ni tildes. En el `.js` van como `"d":[["docs/archivo.pdf","Bases (PDF)","Rules (PDF)"]]`.

**Ampliar o cambiar un plazo**
- Cambia la columna Plazo en `premios.xlsx`, hoja Convocatorias, y el campo `abierto` en `premios-datos.js`.
- Si existe una noticia de esa convocatoria, cambia también su plazo y su texto en `noticias.xlsx` y en `noticias.js`.

**Ganador de un premio**
- Añade una fila en `premios.xlsx`, hoja Palmarés: Premio, Año y Ganador.
- Añádelo también al principio de la lista `l` de ese premio en `premios-datos.js`.

**Fotos de la galería**
1. Convierte cada foto a WebP en dos tamaños:
   - `img/fotos/NOMBRE.webp`, lado mayor 1400 px, calidad 82;
   - `img/fotos/mini/NOMBRE.webp`, lado mayor 560 px, calidad 78.
2. NOMBRE es el año y unas palabras del pie, sin tildes y unidas por guiones: `2026-asamblea-madrid`. Respeta la orientación de la foto: aplica la rotación EXIF.
3. Añade la entrada al principio de `fotos.js`.
4. Añade las rutas nuevas a `img/lista.json`, que está ordenado alfabéticamente.
5. Fotos de colecciones propias o de la SEA: sin crédito de colección en el pie. Fotos de terceros (por ejemplo Wikimedia Commons): autor y licencia en el pie, siempre.

**Junta Directiva**
- Está en `sea.js`, en `SEA.junta`. La foto va en `img/sea/` y `img/sea/mini/` como `AAAA-MM-INICIALES.webp`.
- Si cambia la Junta, añade la nueva a `juntas.js`.

## 5. Reglas de contenido de la SEA (obligatorias)

1. Solo datos verdaderos y comprobados. Si no estás seguro de algo, pregúntalo; no lo inventes ni lo deduzcas.
2. Ninguna lista de personas incompleta: es mejor no poner la lista que dejar a alguien fuera.
3. «Dónde se investiga» muestra centros, nunca nombres de personas.
4. Nunca publiques datos personales de los socios: teléfonos, NIF, direcciones ni listas de socios. El archivo `socios.xlsx` NUNCA se sube a la web.
5. Escribe IACT-CSIC, nunca IACT-CSIC-UGR.
6. El contenido de la AIPEA (aipea.org) solo se enlaza; no se copia.
7. Los socios de honor no aparecen como socios de número, salvo Saverio Fiore, que es socio de la SEA.
8. Nombres: «Mercedes Suárez», sin segundo apellido; «Castell-Landete»; «López Galindo», sin guion.
9. Todo texto nuevo va en español y en inglés. El inglés debe ser una traducción correcta, no literal.
10. Tono sobrio e informativo. Nada de adjetivos promocionales.

## 6. Comprobaciones antes de devolver los archivos

- Cada `.js` que toques debe seguir siendo válido. Si puedes ejecutar código, compruébalo (`node --check archivo.js` o leyendo el JSON con Python).
- No borres ni reordenes contenido que no te han pedido cambiar.
- Si has cambiado cualquier archivo de la web, aumenta en 1 el número de versión de `sw.js` (`var CACHE = "sea-vNNN"`). Así los navegadores cargan la versión nueva.
- Fechas siempre en formato AAAA-MM-DD en los `.js`.

## 7. Qué tienes que devolver

1. Los archivos modificados o nuevos, con su ruta exacta: `noticias.js`, `docs/bases-2027.pdf`, `img/fotos/mini/...`.
2. Los Excel modificados (`noticias.xlsx`, `premios.xlsx`), para que la persona los guarde en su carpeta `ENTRADA`.
3. Una lista final, clara y corta:
   - «Sube al servidor, sustituyendo los antiguos: …»
   - «Guarda en tu carpeta ENTRADA: …»
4. Si algo no lo has podido hacer, o necesitas un dato, dilo claramente al principio.
