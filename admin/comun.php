<?php
/* Funciones comunes del panel de administración de la web de la SEA. */
declare(strict_types=1);
session_start();
const RAIZ = __DIR__ . '/..';
const DATOS = __DIR__ . '/datos';
const CORREO = 'sea.arcillas.web@gmail.com';
const SECCIONES = [
  "ceramica" => "Cerámica y porcelana",
  "estructural" => "Ladrillos y tejas",
  "azulejos" => "Pavimentos y revestimientos cerámicos",
  "refractarios" => "Refractarios",
  "cemento" => "Cemento con menos CO₂",
  "papel" => "Papel",
  "cargas" => "Pinturas, plásticos y caucho",
  "perforacion" => "Lodos de perforación",
  "fundicion" => "Moldes de fundición",
  "pelets" => "Peletización del mineral de hierro",
  "ingenieria" => "Impermeabilización e ingeniería civil",
  "barreras" => "Barreras para residuos radiactivos",
  "absorbentes" => "Absorbentes y lechos para mascotas",
  "agricultura" => "Agricultura y suelos",
  "pienso" => "Alimentación animal",
  "farmacia" => "Farmacia y cosmética",
  "alimentos" => "Vinos y aceites",
  "agua" => "Descontaminación de aguas",
  "catalisis" => "Catálisis",
  "nanocompuestos" => "Nanocompuestos y bionanocompuestos",
  "aislamiento" => "Aislamiento térmico y acústico",
  "litio" => "Litio",
  "azulmaya" => "Patrimonio cultural",
  "geo:paleoclima" => "Geología · Paleoclima y paleoambiente",
  "geo:diagenesis" => "Geología · Diagénesis, metamorfismo de bajo grado y evolución de cuencas",
  "geo:datacion" => "Geología · Datación",
  "geo:fallas" => "Geología · Fallas y terremotos",
  "geo:alteracion" => "Geología · Alteración hidrotermal y génesis de yacimientos",
  "geo:suelos" => "Geología · Suelos y meteorización",
  "geo:geoarqueologia" => "Geología · Geoarqueología",
  "geo:marte" => "Geología · Marte y otros planetas"
];

function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }

/* Lee un fichero de la web del tipo «window.NOMBRE = [...];» */
function leer_js(string $fichero, string $var) {
  $ruta = RAIZ . '/' . $fichero;
  if (!is_file($ruta)) return null;
  $t = file_get_contents($ruta);
  $i = strpos($t, 'window.' . $var . '=');
  if ($i === false) return null;
  $t = substr($t, $i + strlen('window.' . $var . '='));
  $t = rtrim(trim($t), ';');
  return json_decode($t, true);
}
/* Escribe un fichero de datos de la web de forma segura (primero a un temporal). */
function escribir_js(string $fichero, string $var, $datos, string $comentario): void {
  $ruta = RAIZ . '/' . $fichero;
  $txt = "/* $comentario */\nwindow.$var=" . json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) . ";\n";
  $tmp = $ruta . '.tmp';
  if (file_put_contents($tmp, $txt, LOCK_EX) === false || !rename($tmp, $ruta)) {
    throw new RuntimeException("No se pudo guardar $fichero. Comprueba que la carpeta de la web admite escritura.");
  }
}
function leer_json(string $nombre, $defecto = []) {
  $r = DATOS . '/' . $nombre;
  return is_file($r) ? (json_decode(file_get_contents($r), true) ?? $defecto) : $defecto;
}
function escribir_json(string $nombre, $datos): void {
  file_put_contents(DATOS . '/' . $nombre, json_encode($datos, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX);
}

/* Descarga JSON de una API externa (OpenAlex, Crossref). */
function pedir_json(string $url) {
  $url .= (str_contains($url, '?') ? '&' : '?') . 'mailto=' . CORREO;
  if (function_exists('curl_init')) {
    $c = curl_init($url);
    curl_setopt_array($c, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 40, CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_USERAGENT => 'Web SEA (mailto:' . CORREO . ')']);
    $r = curl_exec($c); $cod = curl_getinfo($c, CURLINFO_HTTP_CODE); curl_close($c);
    if ($r === false || $cod >= 400) return null;
  } else {
    $ctx = stream_context_create(['http' => ['timeout' => 40, 'header' => 'User-Agent: Web SEA (mailto:' . CORREO . ")\r\n"]]);
    $r = @file_get_contents($url, false, $ctx);
    if ($r === false) return null;
  }
  return json_decode($r, true);
}

/* Contraseña */
function clave_guardada(): ?string { $f = DATOS . '/clave.php'; return is_file($f) ? (include $f) : null; }
function guardar_clave(string $clave): void {
  $hash = password_hash($clave, PASSWORD_DEFAULT);
  file_put_contents(DATOS . '/clave.php', "<?php return " . var_export($hash, true) . ";\n", LOCK_EX);
}
function dentro(): bool { return !empty($_SESSION['sea_admin']); }
function ficha(): string { if (empty($_SESSION['ficha'])) $_SESSION['ficha'] = bin2hex(random_bytes(16)); return $_SESSION['ficha']; }
function comprobar_ficha(): void { if (!hash_equals(ficha(), $_POST['ficha'] ?? '')) { http_response_code(400); exit('Formulario caducado. Vuelve atrás y recarga la página.'); } }

/* Trabajos de referencia: aplicaciones (aportaciones.js) y geología (geo-refs.js) */
function leer_referencias(): array {
  return ['ap' => leer_js('aportaciones.js', 'APORTES') ?? [], 'geo' => leer_js('geo-refs.js', 'GEO_REFS') ?? []];
}
function ordenar_refs(array $l): array {
  $p = array_values(array_filter($l, fn($z) => !empty($z['p'])));
  $n = array_values(array_filter($l, fn($z) => empty($z['p'])));
  usort($p, fn($a, $b) => ($a['y'] ?? 0) <=> ($b['y'] ?? 0));
  usort($n, fn($a, $b) => ($b['c'] ?? 0) <=> ($a['c'] ?? 0));
  return array_merge($p, $n);
}
function guardar_referencias(array $R): void {
  foreach ($R['ap'] as $k => $l) $R['ap'][$k] = ordenar_refs($l);
  foreach ($R['geo'] as $k => $l) $R['geo'][$k] = ordenar_refs($l);
  escribir_js('aportaciones.js', 'APORTES', $R['ap'], 'Trabajos pioneros o altamente citados de grupos españoles, por aplicación. Lo mantiene el panel de administración.');
  escribir_js('geo-refs.js', 'GEO_REFS', $R['geo'], 'Trabajos de referencia de la página de geología. Lo mantiene el panel de administración.');
}
/* Datos de un trabajo a partir de su DOI (OpenAlex; si no, Crossref) */
function datos_doi(string $doi): ?array {
  $doi = preg_replace('~^(https?://)?(dx\.)?doi\.org/~i', '', trim($doi));
  if ($doi === '') return null;
  $w = pedir_json('https://api.openalex.org/works/doi:' . rawurlencode($doi));
  if ($w && !empty($w['title'])) {
    $es = []; $todos = [];
    foreach ($w['authorships'] ?? [] as $a) {
      $n = $a['author']['display_name'] ?? ''; $todos[] = $n;
      foreach ($a['institutions'] ?? [] as $i) if (($i['country_code'] ?? '') === 'ES') { $es[] = $n; break; }
    }
    $lista = $es ?: $todos;
    $a = implode(', ', array_slice($lista, 0, 3)) . (count($todos) > 3 ? ' y otros' : '');
    return ['a' => $a, 'y' => (int)($w['publication_year'] ?? 0), 't' => $w['title'],
      'r' => $w['primary_location']['source']['display_name'] ?? '', 'c' => (int)($w['cited_by_count'] ?? 0), 'doi' => $doi];
  }
  $c = pedir_json('https://api.crossref.org/works/' . rawurlencode($doi));
  if ($c && isset($c['message'])) {
    $m = $c['message']; $au = array_map(fn($x) => trim(($x['given'] ?? '') . ' ' . ($x['family'] ?? '')), $m['author'] ?? []);
    return ['a' => implode(', ', array_slice($au, 0, 3)) . (count($au) > 3 ? ' y otros' : ''), 'y' => (int)($m['issued']['date-parts'][0][0] ?? 0),
      't' => $m['title'][0] ?? '', 'r' => $m['container-title'][0] ?? '', 'c' => (int)($m['is-referenced-by-count'] ?? 0), 'doi' => $doi];
  }
  return null;
}

function norma(string $s): string {
  $s = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $s) ?: $s;
  return strtolower($s);
}

/* ---------- Listado de socios desde un fichero (Excel .xlsx o .csv) ---------- */
function filas_xlsx(string $f): array {
  if (!class_exists('ZipArchive')) throw new RuntimeException('El servidor no puede leer ficheros Excel; guárdalo como CSV.');
  $z = new ZipArchive(); if ($z->open($f) !== true) throw new RuntimeException('No se pudo abrir el fichero Excel.');
  $comp = [];
  if (($s = $z->getFromName('xl/sharedStrings.xml')) !== false) {
    $x = simplexml_load_string($s); foreach ($x->si as $si) { $t = ''; foreach ($si->xpath('.//*[local-name()="t"]') as $n) $t .= (string)$n; $comp[] = $t; }
  }
  $h = $z->getFromName('xl/worksheets/sheet1.xml'); $z->close();
  if ($h === false) throw new RuntimeException('El fichero Excel no tiene hojas.');
  $x = simplexml_load_string($h); $filas = [];
  foreach ($x->sheetData->row as $row) {
    $f = [];
    foreach ($row->c as $c) {
      preg_match('/^([A-Z]+)/', (string)$c['r'], $m); $col = 0; foreach (str_split($m[1]) as $l) $col = $col * 26 + ord($l) - 64;
      $v = (string)$c['t'] === 's' ? ($comp[(int)$c->v] ?? '') : ((string)$c['t'] === 'inlineStr' ? (string)$c->is->t : (string)$c->v);
      $f[$col - 1] = trim($v);
    }
    if ($f) { $max = max(array_keys($f)); $fila = []; for ($i = 0; $i <= $max; $i++) $fila[] = $f[$i] ?? ''; $filas[] = $fila; }
  }
  return $filas;
}
function filas_csv(string $f): array {
  $txt = file_get_contents($f); if (!mb_check_encoding($txt, 'UTF-8')) $txt = mb_convert_encoding($txt, 'UTF-8', 'Windows-1252');
  $txt = preg_replace('/^\xEF\xBB\xBF/', '', $txt); $lin = preg_split('/\r\n|\r|\n/', trim($txt));
  $sep = substr_count($lin[0] ?? '', ';') >= substr_count($lin[0] ?? '', ',') ? ';' : ',';
  if (substr_count($lin[0] ?? '', "\t") > 0) $sep = "\t";
  return array_map(fn($l) => array_map('trim', str_getcsv($l, $sep)), array_filter($lin, fn($l) => trim($l) !== ''));
}
const PARTICULAS = ['de', 'del', 'la', 'las', 'los', 'y', 'i', 'da', 'van', 'von'];
function primer_apellido(string $apellidos): string {
  $p = preg_split('/\s+/', trim($apellidos)); $r = [];
  foreach ($p as $w) { $r[] = $w; if (!in_array(mb_strtolower($w), PARTICULAS, true)) break; }
  return explode('-', implode(' ', $r))[0];
}
/* Convierte las filas en socios. Reconoce columnas «Nombre», «Apellidos» y «Centro/Institución/Universidad»;
   o una sola columna con «Apellidos, Nombre» o «Nombre Apellido1 Apellido2». Devuelve [socios, avisos]. */
function socios_desde_filas(array $filas, array $previos): array {
  $cab = array_map(fn($c) => norma((string)$c), $filas[0] ?? []); $col = ['nombre' => null, 'apellidos' => null, 'centro' => null];
  foreach ($cab as $i => $c) {
    if ($col['apellidos'] === null && str_contains($c, 'apellido')) $col['apellidos'] = $i;
    elseif ($col['nombre'] === null && (str_contains($c, 'nombre') || $c === 'name' || str_contains($c, 'socio'))) $col['nombre'] = $i;
    elseif ($col['centro'] === null && preg_match('/centro|instituc|universidad|organismo|empresa|afiliac|lugar de trabajo/', $c)) $col['centro'] = $i;
  }
  if ($col['nombre'] !== null || $col['apellidos'] !== null) array_shift($filas); else $col['nombre'] = 0;
  $ant = []; foreach ($previos as $s) $ant[norma($s['n'])] = $s;
  $res = []; $vistos = [];
  foreach ($filas as $f) {
    $nom = trim($f[$col['nombre']] ?? ''); $ape = $col['apellidos'] !== null ? trim($f[$col['apellidos']] ?? '') : '';
    if ($ape === '' && str_contains($nom, ',')) { [$ape, $nom] = array_map('trim', explode(',', $nom, 2)); }
    if ($ape === '') { $p = preg_split('/\s+/', $nom); if (count($p) < 2) continue; $k = (count($p) >= 3 && !str_contains(end($p), "-")) ? 2 : 1; $ape = implode(' ', array_slice($p, -$k)); $nom = implode(' ', array_slice($p, 0, -$k)); }
    $n = trim("$nom $ape"); $clave = norma($n); if ($n === '' || isset($vistos[$clave])) continue; $vistos[$clave] = true;
    $centro = $col['centro'] !== null ? trim($f[$col['centro']] ?? '') : '';
    if (isset($ant[$clave])) { $s = $ant[$clave]; if ($centro !== '' && !in_array($centro, $s['centro'], true)) $s['centro'][] = $centro; $res[] = $s; continue; }
    $s = ['n' => $n, 'buscar' => $n, 'apellido' => primer_apellido($ape), 'centro' => $centro !== '' ? [$centro] : []];
    $s['nombre'] = norma(explode(' ', $n)[0]); $s['completo'] = $n; // también se acepta el autor cuyo nombre completo coincide exactamente
    $res[] = $s;
  }
  return $res;
}
