<?php
/* Actualización automática de los trabajos pioneros o altamente citados (aportaciones.js y geo-refs.js).
   Criterios (los mismos usados al preparar la web):
   - Al menos un autor es o ha sido socio de la SEA (o trabaja en un socio colectivo); la búsqueda se limita a centros españoles (OpenAlex), desde 1985.
   - Al menos 50 citas; 20 si la sección aún no tiene ningún trabajo.
   - El título debe contener todas las palabras de una de las búsquedas de la sección (evita trabajos ajenos al tema).
   - Los trabajos ya incluidos se conservan (aunque sean de socios antiguos); solo salen si otros más citados los superan.
   - Los pioneros se conservan siempre. Máximo 10 trabajos más citados por sección, además de los pioneros.
   - Un trabajo quitado a mano desde el panel no vuelve a entrar. */
declare(strict_types=1);
require_once __DIR__ . '/publicaciones.php';

const BUSQUEDAS = [
  'ceramica' => ['porcelain', 'stoneware', 'kaolin firing', 'mullite kaolin', 'ceramic pigment', 'whiteware'],
  'estructural' => ['clay brick', 'fired brick', 'roof tile', 'adobe', 'earthen construction'],
  'azulejos' => ['ceramic tile', 'porcelain tile'],
  'refractarios' => ['refractory clay', 'refractory kaolin', 'pyrophyllite'],
  'cemento' => ['metakaolin', 'calcined clay', 'geopolymer kaolin', 'pozzolan clay'],
  'papel' => ['kaolin paper', 'kaolin coating', 'kaolin filler'],
  'cargas' => ['organoclay polymer', 'clay filler', 'talc filler', 'kaolin rubber', 'clay paint'],
  'perforacion' => ['drilling fluid', 'drilling mud', 'bentonite rheology', 'clay suspension rheology'],
  'fundicion' => ['foundry bentonite', 'green sand', 'foundry sand'],
  'pelets' => ['iron ore pellet', 'pelletizing bentonite'],
  'ingenieria' => ['bentonite slurry', 'geosynthetic clay liner', 'compacted clay liner', 'expansive clay', 'clay barrier landfill'],
  'barreras' => ['bentonite radioactive waste', 'bentonite repository', 'FEBEX', 'bentonite buffer', 'compacted bentonite', 'bentonite concrete', 'clay host rock'],
  'absorbentes' => ['sepiolite sorbent', 'sepiolite adsorption', 'palygorskite adsorption', 'bentonite absorbent', 'pet litter'],
  'agricultura' => ['clay pesticide', 'clay herbicide', 'organoclay pesticide', 'organoclay herbicide', 'clay fertilizer'],
  'pienso' => ['clay mycotoxin', 'bentonite aflatoxin', 'sepiolite feed', 'clay feed', 'bentonite feed'],
  'farmacia' => ['clay drug', 'clay pharmaceutical', 'clay cosmetic', 'halloysite drug', 'montmorillonite drug', 'clay excipient', 'peloid', 'pelotherapy', 'clay health'],
  'alimentos' => ['bentonite wine', 'bentonite protein', 'bleaching clay', 'sepiolite food'],
  'agua' => ['clay heavy metal', 'clay pollutant', 'organoclay water', 'clay dye', 'clay contaminant', 'clay arsenic', 'organoclay removal'],
  'catalisis' => ['pillared clay', 'clay catalyst', 'acid activated clay', 'layered double hydroxide catalyst', 'clay photocatalyst'],
  'nanocompuestos' => ['clay nanocomposite', 'bionanocomposite', 'sepiolite nanocomposite', 'montmorillonite nanocomposite', 'clay hybrid', 'halloysite nanocomposite'],
  'aislamiento' => ['vermiculite insulation', 'exfoliated vermiculite', 'clay thermal insulation', 'sepiolite insulation'],
  'litio' => ['lithium clay', 'lithium smectite', 'hectorite lithium'],
  'azulmaya' => ['Maya blue', 'palygorskite indigo', 'clay archaeometry', 'archaeological ceramics clay', 'historic brick'],
  'geo:paleoclima' => ['clay minerals paleoclimate', 'clay minerals palaeoclimate', 'clay mineral provenance', 'clay minerals palaeoenvironment', 'clay minerals paleoenvironment'],
  'geo:diagenesis' => ['illite crystallinity', 'Kubler index', 'illitization', 'smectite illite', 'low-grade metamorphism phyllosilicates', 'diagenesis clay'],
  'geo:datacion' => ['K-Ar illite', 'illite dating', 'illite Ar-Ar'],
  'geo:fallas' => ['fault gouge', 'clay fault zone', 'clay minerals fault'],
  'geo:alteracion' => ['hydrothermal alteration clay', 'bentonite genesis', 'kaolin genesis', 'sepiolite genesis', 'palygorskite genesis', 'bentonite deposit', 'kaolin deposit'],
  'geo:suelos' => ['soil clay mineralogy', 'weathering clay minerals', 'clay minerals soil'],
  'geo:geoarqueologia' => ['archaeological ceramics provenance', 'archaeometry clay', 'archaeological pottery clay'],
  'geo:marte' => ['Mars clay', 'Mars phyllosilicates', 'Martian clay', 'Mars smectite'],
];
/* Palabras de arcilla que debe contener el título */
const ARCILLA = '/\b(clays?|clayey|smectit|montmorillonit|bentonit|kaolin|illit|sepiolit|palygorskit|attapulgit|vermiculit|chlorit|halloysit|hectorit|saponit|beidellit|nontronit|phyllosilicat|organoclay|bionanocomposit|metakaolin|pyrophyllit|talc|mica|layered double hydroxide|hydrotalcit|ldh|peloid|maya blue|febex|adobe|brick|porcelain|stoneware|ceramic|tile|refractor)/';
const MINIMO = 50, MINIMO_VACIA = 20, MAXIMO = 10;

function raiz_palabra(string $w): string { return substr($w, 0, 6); }
function palabras(string $q): array {
  return array_values(array_filter(preg_split('/[^a-z0-9]+/', norma($q)), fn($w) => strlen($w) >= 3));
}
/* El título contiene todas las palabras de alguna búsqueda (comparando las 6 primeras letras: clay/clays, mineral/minerals…) */
function titulo_encaja(string $titulo, array $busquedas): bool {
  $t = ' ' . preg_replace('/[^a-z0-9]+/', ' ', norma($titulo));
  foreach ($busquedas as $q) {
    $ok = true;
    foreach (palabras($q) as $w) if (!str_contains($t, ' ' . raiz_palabra($w))) { $ok = false; break; }
    if ($ok) return true;
  }
  return false;
}
/* ¿Algún autor con centro español es o fue socio? (apellido + nombre completo o apellido + centro) */
function autor_socio(array $w, array $socios): bool {
  foreach ($w['authorships'] ?? [] as $a) {
    $nom = str_replace('-', ' ', norma($a['author']['display_name'] ?? ''));
    foreach ($socios as $s) {
      if (!str_contains($nom, norma($s['apellido']))) continue;
      $pn = norma(explode(' ', $s['n'])[0]);
      if (str_contains($nom, $pn) || (isset($nom[0], $pn[0]) && $nom[0] === $pn[0])) return true;
    }
  }
  return false;
}
function ficha_trabajo(array $w): array {
  $es = []; $todos = [];
  foreach ($w['authorships'] ?? [] as $a) {
    $n = $a['author']['display_name'] ?? ''; $todos[] = $n;
    foreach ($a['institutions'] ?? [] as $i) if (($i['country_code'] ?? '') === 'ES') { $es[] = $n; break; }
  }
  $lista = $es ?: $todos;
  return ['a' => nom_autor(implode(', ', array_slice($lista, 0, 3))) . (count($todos) > 3 ? ' y otros' : ''),
    'y' => (int)($w['publication_year'] ?? 0), 't' => strip_tags((string)$w['title']),
    'r' => $w['primary_location']['source']['display_name'] ?? '', 'c' => (int)($w['cited_by_count'] ?? 0),
    'doi' => preg_replace('~^https?://doi\.org/~i', '', (string)$w['doi'])];
}

/* Devuelve [número de trabajos añadidos, mensajes]. */
function actualizar_referencias(): array {
  @set_time_limit(600);
  $R = leer_referencias(); $log = []; $nuevos = [];
  $excluidos = array_map('strtolower', leer_json('excluidos.json', []));
  /* Socios actuales y antiguos (se acumulan: nadie sale de esta lista) */
  $hist = leer_json('socios-historico.json', null);
  if ($hist === null) { /* Primera vez: los autores de los trabajos ya seleccionados cuentan como «socios antiguos» */
    $nombres = [];
    foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $l) foreach ($l as $z) foreach (preg_split('/, | y /', preg_replace('/ y otros$/', '', $z['a'])) as $n) $nombres[] = [trim($n)];
    $hist = socios_desde_filas($nombres, []);
  }
  $ya = array_map(fn($s) => norma($s['n']), $hist);
  foreach (leer_json('socios.json', []) as $s) if (!in_array(norma($s['n']), $ya, true)) $hist[] = $s;
  escribir_json('socios-historico.json', $hist);
  $presentes = [];
  foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $l) foreach ($l as $z) if (!empty($z['doi'])) $presentes[strtolower($z['doi'])] = true;

  /* 1. Citas al día de los trabajos ya incluidos */
  $dois = array_keys($presentes);
  foreach (array_chunk($dois, 40) as $trozo) {
    $res = pedir_json('https://api.openalex.org/works?per-page=50&select=doi,cited_by_count&filter=doi:' . rawurlencode(implode('|', $trozo)));
    foreach ($res['results'] ?? [] as $w) {
      $d = strtolower(preg_replace('~^https?://doi\.org/~i', '', (string)$w['doi']));
      foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $k => $l) foreach ($l as $i => $z)
        if (strtolower($z['doi'] ?? '') === $d && $w['cited_by_count'] > ($z['c'] ?? 0)) $R[$g][$k][$i]['c'] = (int)$w['cited_by_count'];
    }
    usleep(300000);
  }

  /* 2. Los ya incluidos: pioneros siempre; de los demás, ordenados por citas (no sale ninguno) */
  foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $k => $l) $R[$g][$k] = ordenar_seccion($l, PHP_INT_MAX);
  guardar_referencias($R);

  /* 3. Trabajos nuevos: NO se publican; quedan «propuestos» para aceptarlos o descartarlos en el panel */
  $prop = leer_json('propuestos.json', []); $yaProp = [];
  foreach ($prop as $x) $yaProp[strtolower($x['doi'])] = true;
  $nuevos = 0;
  foreach (BUSQUEDAS as $sec => $qs) {
    $geo = str_starts_with($sec, 'geo:'); $g = $geo ? 'geo' : 'ap'; $k = $geo ? substr($sec, 4) : $sec;
    $normales = array_values(array_filter($R[$g][$k] ?? [], fn($z) => empty($z['p'])));
    $umbral = $normales ? MINIMO : MINIMO_VACIA;
    if (count($normales) >= MAXIMO) $umbral = max($umbral, (int)($normales[MAXIMO - 1]['c'] ?? 0) + 1); // solo si supera al décimo
    foreach ($qs as $q) {
      $url = 'https://api.openalex.org/works?per-page=50&sort=cited_by_count:desc&filter='
        . rawurlencode("institutions.country_code:ES,from_publication_date:1985-01-01,cited_by_count:>" . ($umbral - 1) . ",title_and_abstract.search:$q");
      $res = pedir_json($url); if ($res === null) { sleep(3); $res = pedir_json($url); }
      if ($res === null) { $log[] = "Sin respuesta para «{$q}»"; continue; }
      foreach ($res['results'] ?? [] as $w) {
        if (empty($w['doi']) || empty($w['title'])) continue;
        $z = ficha_trabajo($w); $d = strtolower($z['doi']);
        if (isset($presentes[$d]) || isset($yaProp[$d]) || in_array($d, $excluidos, true)) continue;
        if (($w['type'] ?? '') === 'paratext' || !titulo_encaja($z['t'], $qs) || !preg_match(ARCILLA, norma($z['t']))) continue;
        if (!autor_socio($w, $hist)) continue; // solo trabajos con algún autor socio
        $prop[] = ['fecha' => date('Y-m-d'), 'seccion' => $sec, 'socio' => true] + $z;
        $yaProp[$d] = true; $nuevos++;
      }
      usleep(1000000);
    }
  }
  usort($prop, fn($a, $b) => [$b['socio'], $b['c']] <=> [$a['socio'], $a['c']]);
  escribir_json('propuestos.json', $prop);
  escribir_json('referencias-fecha.json', ['actualizado' => date('Y-m-d')]);
  return [$nuevos, $log];
}

/* Pioneros primero (por año); los demás por citas, como máximo $max */
function ordenar_seccion(array $l, int $max): array {
  $p = array_values(array_filter($l, fn($z) => !empty($z['p']))); usort($p, fn($a, $b) => $a['y'] <=> $b['y']);
  $n = array_values(array_filter($l, fn($z) => empty($z['p']))); usort($n, fn($a, $b) => ($b['c'] ?? 0) <=> ($a['c'] ?? 0));
  return array_merge($p, array_slice($n, 0, $max));
}
function sacar_propuesto(string $doi): ?array {
  $d = strtolower($doi); $prop = leer_json('propuestos.json', []); $x = null;
  foreach ($prop as $i => $y) if (strtolower($y['doi']) === $d) { $x = $y; array_splice($prop, $i, 1); break; }
  escribir_json('propuestos.json', $prop); return $x;
}
/* Aceptar: entra en su sección; si ya hay 10, sale el menos citado */
function aceptar_propuesto(string $doi): void {
  $x = sacar_propuesto($doi); if (!$x) return;
  $sec = $x['seccion']; $z = array_intersect_key($x, array_flip(['a', 'y', 't', 'r', 'c', 'doi']));
  $R = leer_referencias(); $geo = str_starts_with($sec, 'geo:'); $g = $geo ? 'geo' : 'ap'; $k = $geo ? substr($sec, 4) : $sec;
  $R[$g][$k] = ordenar_seccion(array_merge($R[$g][$k] ?? [], [$z]), MAXIMO);
  guardar_referencias($R);
}
/* Descartar: no se vuelve a proponer */
function descartar_propuesto(string $doi): void {
  sacar_propuesto($doi);
  $ex = leer_json('excluidos.json', []); $ex[] = $doi; escribir_json('excluidos.json', array_values(array_unique($ex)));
}
