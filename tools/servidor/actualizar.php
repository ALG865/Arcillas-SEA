<?php
/*
 * Actualización automática de la web de la Sociedad Española de Arcillas (SEA)
 * ----------------------------------------------------------------------------
 * Escribe los archivos de la carpeta 3-AUTOMATICO de la web:
 *   - publicaciones.js : artículos de los socios de los últimos 24 meses
 *   - aportaciones.js  : trabajos más citados por aplicación (actualiza las citas)
 *   - geo-refs.js      : trabajos más citados de geología (actualiza las citas)
 *   - candidatos.js    : trabajos de socios que podrían entrar en los rankings; NO se muestran
 *                        hasta que Claude los revisa (2-ACTUALIZABLE/ajustes-rankings.js)
 *   - otras.js         : otras contribuciones españolas (solo actualiza citas)
 * Datos: OpenAlex (https://openalex.org), gratuito.
 *
 * Se programa en el cron A DIARIO (por ejemplo a las 4:00). El propio programa decide:
 *   - si han pasado 90 días desde la última actualización completa, la hace;
 *   - si OpenAlex corta por límite diario, guarda por dónde iba y sigue al día siguiente;
 *   - el resto de los días no hace nada y termina en un segundo.
 * Para forzar una actualización ahora:  php actualizar.php --forzar
 *
 * Todo lo privado (lista de socios, configuración, registro) está en esta misma carpeta,
 * que debe estar FUERA de public_html.
 */

$DIR = __DIR__;
require $DIR . '/config.php';            // define $WEB (ruta a public_html), $CORREO y $CLAVE_OPENALEX
date_default_timezone_set('Europe/Madrid');
$FORZAR = in_array('--forzar', $argv ?? []);
$AUTO = rtrim($WEB, '/') . '/3-AUTOMATICO';
$DIAS = 90;

function registro($t) { global $DIR; file_put_contents("$DIR/registro.log", date('Y-m-d H:i:s') . "  $t\n", FILE_APPEND); echo "$t\n"; }
function leer_json($f, $def) { return is_file($f) ? (json_decode(file_get_contents($f), true) ?? $def) : $def; }
function guardar_json($f, $d) { file_put_contents("$f.tmp", json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT)); rename("$f.tmp", $f); }
function norm($s) {
    $s = (string)$s;
    if (class_exists('Normalizer')) $s = Normalizer::normalize($s, Normalizer::FORM_D);
    $s = preg_replace('/\p{Mn}/u', '', $s);
    $s = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s);
    return strtolower($s);
}

class Limite extends Exception {}

// Petición a OpenAlex con reintentos. Si se agota el límite diario, lanza Limite.
function oa($ruta, $param) {
    global $CORREO, $CLAVE_OPENALEX;
    $param['mailto'] = $CORREO;
    if (!empty($CLAVE_OPENALEX)) $param['api_key'] = $CLAVE_OPENALEX;
    $url = 'https://api.openalex.org/' . $ruta . '?' . http_build_query($param);
    for ($i = 1; $i <= 5; $i++) {
        usleep(300000);
        $c = curl_init($url);
        curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 60, CURLOPT_USERAGENT => "SEA-web (mailto:$CORREO)"]);
        $r = curl_exec($c); $cod = curl_getinfo($c, CURLINFO_HTTP_CODE); $err = curl_error($c); curl_close($c);
        if ($cod == 200 && $r) return json_decode($r, true);
        if ($cod == 429 || $cod == 402 || ($r && stripos($r, 'budget') !== false)) throw new Limite("límite de OpenAlex (HTTP $cod)");
        sleep(5 * $i);
    }
    throw new Exception("OpenAlex no responde: $ruta (HTTP $cod $err " . substr((string)$r, 0, 150) . ")");
}

// Lee un archivo window.X={...}; de la web
function leer_js($f) {
    $t = @file_get_contents($f);
    if ($t === false) return null;
    $w = strpos($t, 'window.'); $i = strpos($t, '=', $w === false ? 0 : $w); $j = strrpos($t, '}');
    return json_decode(substr($t, $i + 1, $j - $i), true);
}
function escribir_js($f, $var, $d, $nota) {
    file_put_contents("$f.tmp", "/* $nota */\nwindow.$var=" . json_encode($d, JSON_UNESCAPED_UNICODE) . ";\n");
    rename("$f.tmp", $f);
}

// ¿Firma el socio este trabajo con su centro del listado de la SEA?
function firma_socio($autoria, $s) {
    $t = norm(implode(' | ', array_merge(array_map(fn($x) => $x['display_name'] ?? '', $autoria['institutions'] ?? []), $autoria['raw_affiliation_strings'] ?? [])));
    $t = str_replace('-', ' ', $t);
    $ciud = array_map('norm', $s['ciudad'] ?? []); $gen = array_map('norm', $s['generico'] ?? []);
    foreach ($s['afil'] ?? [] as $c) {
        $c = str_replace('-', ' ', norm($c));
        if ($c !== '' && strpos($t, $c) !== false) {
            if (!in_array($c, $gen)) return true;
            foreach ($ciud as $x) if ($x !== '' && strpos($t, $x) !== false) return true;
        }
    }
    return false;
}
// ¿Coincide el nombre del autor con el del socio? (apellido y nombre o inicial)
function nombre_socio($autoria, $s) {
    $nom = str_replace('-', ' ', norm($autoria['author']['display_name'] ?? ''));
    $partes = explode(' ', $nom); $pn = $partes[0] ?? '';
    if (strpos($nom, norm($s['apellido'])) === false) return false;
    $n = $s['nombre'] ?? '';
    return $n === '' || $pn === $n || (strlen(rtrim($pn, '.')) == 1 && $pn[0] === $n[0]) || in_array($n, $partes);
}
function resumen($w) {
    $pos = [];
    foreach (($w['abstract_inverted_index'] ?? []) as $pal => $ps) foreach ($ps as $p) $pos[$p] = $pal;
    ksort($pos); return implode(' ', $pos);
}
function doi_limpio($d) { return strtolower(str_replace('https://doi.org/', '', (string)$d)); }

// ---------------------------------------------------------------------------
$estado = leer_json("$DIR/estado.json", []);
$ultima = $estado['ultima_completa'] ?? '2000-01-01';
$pendiente = $estado['fase'] ?? null;
if (!$FORZAR && !$pendiente && (time() - strtotime($ultima)) < $DIAS * 86400) exit(0);
registro('Inicio' . ($pendiente ? " (continúa en la fase $pendiente)" : ''));

$socios = leer_json("$DIR/socios.json", []);
$honor = leer_json("$DIR/socios-honor-excluidos.json", []);
$socios = array_values(array_filter($socios, fn($s) => !in_array($s['n'], $honor)));
$excl = array_map('strtolower', leer_json("$DIR/pubs-excluidas.json", []));
$incl = array_map('strtolower', leer_json("$DIR/pubs-incluidas.json", []));
$cache = leer_json("$DIR/socios-openalex.json", []);
$revisados = array_flip(leer_json("$DIR/ya-revisados.json", []));   // trabajos ya valorados al montar los rankings: no se vuelven a proponer
$TEMA = '/clay|arcilla|smectit|montmorillon|bentonit|kaolin|caolin|illit|sepiolit|palygorsk|attapulg|vermiculit|chlorit|tosudit|halloysit|hectorit|saponit|stevensit|kerolit|beidellit|nontronit|phyllosilic|pyrophyllit|\btalc|\bmicas?\b|glauconit|celadonit|imogolit|aluminum silicate|layered double|hydrotalc|hydrocalumit|ldh|zeolit|geopolym|metakaol|calcined clay|\bcement|ceramic|porcelain|brick|\btiles?\b|metapelit/';

try {
    // 1. Identificadores de OpenAlex de los socios nuevos (los ya buscados están en socios-openalex.json)
    foreach ($socios as $s) {
        if (isset($cache[$s['n']])) continue;
        $res = oa('authors', ['search' => $s['buscar'], 'per-page' => 25])['results'] ?? [];
        $ids = [];
        foreach ($res as $a) {
            $nom = str_replace('-', ' ', norm($a['display_name'] ?? ''));
            $pn = explode(' ', $nom)[0] ?? '';
            $okn = empty($s['nombre']) || $pn === $s['nombre'] || (strlen(rtrim($pn, '.')) == 1 && $pn[0] === $s['nombre'][0]) || in_array($s['nombre'], explode(' ', $nom));
            if (($a['works_count'] ?? 0) > 0 && $okn && strpos($nom, norm($s['apellido'])) !== false && !empty($s['afil'])) $ids[] = basename($a['id']);
        }
        $cache[$s['n']] = $ids;
        guardar_json("$DIR/socios-openalex.json", $cache);
        registro("Socio nuevo: {$s['n']} (" . count($ids) . ' perfiles en OpenAlex)');
    }
    $porid = [];
    foreach ($socios as $s) foreach ($cache[$s['n']] ?? [] as $id) $porid[$id] = $s;
    $ids = array_keys($porid); sort($ids);
    $lotes = array_chunk($ids, 40);
    $lotesG = array_chunk($ids, 100);   // lotes grandes para las búsquedas de los rankings (menos peticiones)
    $CAMPOS = 'id,doi,title,publication_year,cited_by_count,type,authorships,primary_location,abstract_inverted_index';

    // 2. Publicaciones recientes (24 meses)
    if (!$pendiente || $pendiente === 'publicaciones') {
        $estado['fase'] = 'publicaciones'; guardar_json("$DIR/estado.json", $estado);
        $desde = date('Y-m-d', time() - 730 * 86400);
        $obras = [];
        foreach ($lotes as $lote) {
            for ($np = 1; $np <= 20; $np++) {
                $d = oa('works', ['per-page' => 200, 'page' => $np, 'filter' => 'author.id:' . implode('|', $lote) . ",from_publication_date:$desde,type:article"]);
                foreach ($d['results'] as $w) {
                    $sw = [];
                    foreach ($w['authorships'] ?? [] as $au) {
                        $s = $porid[basename($au['author']['id'] ?? '')] ?? null;
                        if ($s && nombre_socio($au, $s) && firma_socio($au, $s) && !in_array($s['n'], $sw)) $sw[] = $s['n'];
                    }
                    if (!$sw) continue;
                    $k = strtolower($w['doi'] ?? $w['id']);
                    if (in_array($k, $excl)) continue;
                    if (!preg_match($TEMA, norm(($w['title'] ?? '') . ' ' . resumen($w))) && !in_array($k, $incl)) continue;
                    $src = $w['primary_location']['source'] ?? [];
                    if (($src['type'] ?? '') !== 'journal') continue;
                    $b = $w['biblio'] ?? [];
                    $pag = ($b['last_page'] ?? null) && ($b['last_page'] != ($b['first_page'] ?? null)) ? $b['first_page'] . '–' . $b['last_page'] : ($b['first_page'] ?? '');
                    if (!isset($obras[$k])) {
                        $aut = [];
                        foreach (array_slice($w['authorships'] ?? [], 0, 12) as $au) {
                            $s = $porid[basename($au['author']['id'] ?? '')] ?? null;
                            $aut[] = $s ? $s['n'] : ($au['author']['display_name'] ?? '');
                        }
                        $obras[$k] = ['t' => $w['title'] ?? '', 'a' => $aut, 'na' => count($w['authorships'] ?? []), 'r' => $src['display_name'] ?? '',
                            'y' => $w['publication_year'] ?? null, 'f' => $w['publication_date'] ?? '', 'doi' => $w['doi'] ?? '',
                            'v' => $b['volume'] ?? '', 'n' => $b['issue'] ?? '', 'p' => $pag, 's' => []];
                    }
                    foreach ($sw as $n) if (!in_array($n, $obras[$k]['s'])) $obras[$k]['s'][] = $n;
                }
                if ($np * 200 >= ($d['meta']['count'] ?? 0)) break;
            }
        }
        $lista = array_values($obras);
        usort($lista, fn($a, $b) => strcmp($b['f'], $a['f']));
        $prev = leer_js("$AUTO/publicaciones.js");
        $n0 = count($prev['obras'] ?? []);
        if (count($lista) < 0.5 * $n0) registro('Publicaciones: ' . count($lista) . " frente a $n0 la vez anterior; parece un fallo, no se cambia el archivo");
        else {
            escribir_js("$AUTO/publicaciones.js", 'PUBLICACIONES_SOCIOS', ['actualizado' => date('Y-m-d'), 'desde' => $desde, 'obras' => $lista], 'Generado automáticamente desde OpenAlex; no editar a mano.');
            registro('Publicaciones: ' . count($lista) . ' artículos');
        }
        $pendiente = null;
    }

    // 3. Rankings: citas al día y trabajos nuevos de socios con más de 50 citas
    if (!$pendiente || $pendiente === 'rankings') {
        $estado['fase'] = 'rankings'; guardar_json("$DIR/estado.json", $estado);
        $consultas = leer_json("$DIR/consultas.json", []);
        $F = ['aportaciones' => ['aportaciones.js', 'APORTES'], 'geologia' => ['geo-refs.js', 'GEO_REFS'], 'otras' => ['otras.js', 'OTRAS_ES']];
        $D = []; $todos = [];
        foreach ($F as $k => [$f, $v]) { $D[$k] = leer_js("$AUTO/$f") ?? []; foreach ($D[$k] as $sec) foreach ($sec as $z) if (!empty($z['doi'])) $todos[doi_limpio($z['doi'])] = 1; }
        // 3a. Citas
        $dois = array_keys($todos); $citas = [];
        foreach (array_chunk($dois, 40) as $lote) {
            $d = oa('works', ['per-page' => 50, 'select' => 'doi,cited_by_count', 'filter' => 'doi:' . implode('|', array_map(fn($x) => "https://doi.org/$x", $lote))]);
            foreach ($d['results'] as $w) $citas[doi_limpio($w['doi'])] = $w['cited_by_count'] ?? 0;
        }
        $cambios = 0;
        foreach ($D as $k => &$secs) foreach ($secs as &$sec) foreach ($sec as &$z) {
            $c = $citas[doi_limpio($z['doi'] ?? '')] ?? null;
            if ($c !== null && $c > ($z['c'] ?? 0)) { $z['c'] = $c; $cambios++; }
        }
        unset($secs, $sec, $z);
        // 3b. Candidatos: trabajos de socios con más de 50 citas que aún no están en los rankings.
        //     NO se publican: quedan en 3-AUTOMATICO/candidatos.js hasta que Claude los revisa y los aprueba
        //     en 2-ACTUALIZABLE/ajustes-rankings.js («anadir») o los rechaza («rechazar»).
        $aj = leer_js(rtrim($WEB, '/') . '/2-ACTUALIZABLE/ajustes-rankings.js') ?? [];
        $ya = $revisados;
        foreach (array_keys($aj['anadir'] ?? []) as $x) $ya[doi_limpio($x)] = 1;
        foreach (array_merge($aj['rechazar'] ?? [], $aj['ocultar'] ?? []) as $x) $ya[doi_limpio($x)] = 1;
        $cand = leer_js("$AUTO/candidatos.js") ?? [];
        foreach ($cand as $doi => $z) if (isset($todos[$doi]) || isset($ya[$doi])) unset($cand[$doi]);
        $nuevos = 0;
        foreach (['aportaciones', 'geologia'] as $k) {
            foreach ($consultas[$k] ?? [] as $sec => $qs) {
                if (!isset($D[$k][$sec])) continue;
                registro("Rankings: buscando candidatos en $k/$sec");
                foreach ($qs as $q) foreach ($lotesG as $lote) {
                    $d = oa('works', ['per-page' => 25, 'sort' => 'cited_by_count:desc', 'select' => $CAMPOS, 'filter' => 'author.id:' . implode('|', $lote) . ",cited_by_count:>50,type:article|review,title_and_abstract.search:$q"]);
                    foreach ($d['results'] as $w) {
                        $doi = doi_limpio($w['doi'] ?? '');
                        if (!$doi || isset($todos[$doi]) || isset($ya[$doi]) || isset($cand[$doi]) || in_array("https://doi.org/$doi", $excl) || in_array($doi, $excl)) continue;
                        if (($w['primary_location']['source']['type'] ?? '') !== 'journal') continue;
                        if (!preg_match($TEMA, norm(($w['title'] ?? '') . ' ' . resumen($w)))) continue;
                        $quien = [];
                        foreach ($w['authorships'] ?? [] as $au) {
                            $s = $porid[basename($au['author']['id'] ?? '')] ?? null;
                            if ($s && nombre_socio($au, $s) && firma_socio($au, $s)) $quien[] = $s['n'];
                        }
                        if (!$quien) continue;
                        $au = array_map(fn($x) => $x['author']['display_name'] ?? '', $w['authorships'] ?? []);
                        $cand[$doi] = ['k' => $k, 'sec' => $sec, 'a' => count($au) > 2 ? $au[0] . ' y otros' : implode(' y ', $au),
                            'y' => $w['publication_year'] ?? null, 't' => $w['title'] ?? '', 'r' => $w['primary_location']['source']['display_name'] ?? '',
                            'c' => $w['cited_by_count'] ?? 0, 'doi' => $doi, 'socios' => array_values(array_unique($quien)), 'desde' => date('Y-m-d')];
                        $nuevos++;
                    }
                }
            }
        }
        // citas al día de los candidatos que ya estaban
        foreach (array_chunk(array_keys($cand), 40) as $lote) {
            $d = oa('works', ['per-page' => 50, 'select' => 'doi,cited_by_count', 'filter' => 'doi:' . implode('|', array_map(fn($x) => "https://doi.org/$x", $lote))]);
            foreach ($d['results'] as $w) { $x = doi_limpio($w['doi']); if (isset($cand[$x])) $cand[$x]['c'] = max($cand[$x]['c'], $w['cited_by_count'] ?? 0); }
        }
        escribir_js("$AUTO/candidatos.js", 'CANDIDATOS', (object)$cand, 'Candidatos para los rankings, pendientes de revisión con Claude. La web no los muestra hasta que se aprueban en 2-ACTUALIZABLE/ajustes-rankings.js.');
        foreach ($F as $k => [$f, $v]) if ($D[$k]) escribir_js("$AUTO/$f", $v, $D[$k], 'Generado automáticamente desde OpenAlex; no editar a mano. Correcciones: 2-ACTUALIZABLE/ajustes-rankings.js');
        registro("Rankings: $cambios citas actualizadas, $nuevos candidatos nuevos (" . count($cand) . ' pendientes de revisión)');
    }

    $estado = ['ultima_completa' => date('Y-m-d'), 'fase' => null];
    guardar_json("$DIR/estado.json", $estado);
    registro('Fin: actualización completa');
} catch (Limite $e) {
    registro('Pausa: ' . $e->getMessage() . '. Se seguirá mañana.');
} catch (Throwable $e) {
    registro('Error: ' . $e->getMessage() . '. Se reintentará mañana.');
}
