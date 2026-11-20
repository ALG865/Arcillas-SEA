<?php
/* Actualización automática de los trabajos pioneros o altamente citados (aportaciones.js y geo-refs.js).
   Criterios (los mismos usados al preparar la web):
   - Participación de centros españoles (OpenAlex), desde 1985.
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
function ficha_trabajo(array $w): array {
  $es = []; $todos = [];
  foreach ($w['authorships'] ?? [] as $a) {
    $n = $a['author']['display_name'] ?? ''; $todos[] = $n;
    foreach ($a['institutions'] ?? [] as $i) if (($i['country_code'] ?? '') === 'ES') { $es[] = $n; break; }
  }
  $lista = $es ?: $todos;
  return ['a' => implode(', ', array_slice($lista, 0, 3)) . (count($todos) > 3 ? ' y otros' : ''),
    'y' => (int)($w['publication_year'] ?? 0), 't' => strip_tags((string)$w['title']),
    'r' => $w['primary_location']['source']['display_name'] ?? '', 'c' => (int)($w['cited_by_count'] ?? 0),
    'doi' => preg_replace('~^https?://doi\.org/~i', '', (string)$w['doi'])];
}

/* Devuelve [número de trabajos añadidos, mensajes]. */
function actualizar_referencias(): array {
  @set_time_limit(600);
  $R = leer_referencias(); $log = []; $nuevos = [];
  $excluidos = array_map('strtolower', leer_json('excluidos.json', []));
  $presentes = [];
  foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $l) foreach ($l as $z) $presentes[strtolower($z['doi'])] = true;

  /* 1. Citas al día de los trabajos ya incluidos */
  $dois = array_keys($presentes);
  foreach (array_chunk($dois, 40) as $trozo) {
    $res = pedir_json('https://api.openalex.org/works?per-page=50&select=doi,cited_by_count&mailto=' . CORREO . '&filter=doi:' . rawurlencode(implode('|', $trozo)));
    foreach ($res['results'] ?? [] as $w) {
      $d = strtolower(preg_replace('~^https?://doi\.org/~i', '', (string)$w['doi']));
      foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $k => $l) foreach ($l as $i => $z)
        if (strtolower($z['doi']) === $d && $w['cited_by_count'] > ($z['c'] ?? 0)) $R[$g][$k][$i]['c'] = (int)$w['cited_by_count'];
    }
    usleep(300000);
  }

  /* 2. Trabajos nuevos que cumplan los criterios */
  foreach (BUSQUEDAS as $sec => $qs) {
    $geo = str_starts_with($sec, 'geo:'); $g = $geo ? 'geo' : 'ap'; $k = $geo ? substr($sec, 4) : $sec;
    $lista = $R[$g][$k] ?? [];
    $normales = array_values(array_filter($lista, fn($z) => empty($z['p'])));
    $umbral = $normales ? MINIMO : MINIMO_VACIA;
    foreach ($qs as $q) {
      $url = 'https://api.openalex.org/works?per-page=50&sort=cited_by_count:desc&mailto=' . CORREO . '&filter='
        . rawurlencode("institutions.country_code:ES,from_publication_date:1985-01-01,cited_by_count:>" . ($umbral - 1) . ",title_and_abstract.search:$q");
      $res = pedir_json($url);
      if ($res === null) { $log[] = "Sin respuesta para «$q»"; usleep(1000000); continue; }
      foreach ($res['results'] ?? [] as $w) {
        if (empty($w['doi']) || empty($w['title'])) continue;
        $z = ficha_trabajo($w); $d = strtolower($z['doi']);
        if (isset($presentes[$d]) || in_array($d, $excluidos, true)) continue;
        if (($w['type'] ?? '') === 'paratext' || !titulo_encaja($z['t'], $qs)) continue;
        $lista[] = $z; $presentes[$d] = true; $nuevos[$d] = ['s' => $sec, 'z' => $z];
      }
      usleep(300000);
    }
    /* Pioneros siempre; de los demás, los 10 más citados */
    $p = array_values(array_filter($lista, fn($z) => !empty($z['p'])));
    $n = array_values(array_filter($lista, fn($z) => empty($z['p'])));
    usort($n, fn($a, $b) => ($b['c'] ?? 0) <=> ($a['c'] ?? 0));
    $quedan = array_slice($n, 0, MAXIMO);
    foreach (array_slice($n, MAXIMO) as $z) unset($nuevos[strtolower($z['doi'])]);
    if ($p || $quedan) $R[$g][$k] = array_merge($p, $quedan);
  }
  guardar_referencias($R);
  /* Lista de lo añadido en esta actualización, para poder revisarlo en el panel */
  $hist = leer_json('anadidos.json', []);
  foreach ($nuevos as $d => $x) $hist[] = ['fecha' => date('Y-m-d'), 'seccion' => $x['s'], 'doi' => $x['z']['doi'], 't' => $x['z']['t'], 'a' => $x['z']['a'], 'y' => $x['z']['y'], 'c' => $x['z']['c']];
  escribir_json('anadidos.json', array_slice($hist, -60));
  escribir_json('referencias-fecha.json', ['actualizado' => date('Y-m-d')]);
  return [count($nuevos), $log];
}

/* Quitar un trabajo (añadido por error) de todas las secciones y no volver a incluirlo */
function excluir_trabajo(string $doi): void {
  $d = strtolower($doi); $R = leer_referencias();
  foreach (['ap', 'geo'] as $g) foreach ($R[$g] as $k => $l) $R[$g][$k] = array_values(array_filter($l, fn($z) => strtolower($z['doi']) !== $d));
  guardar_referencias($R);
  $ex = leer_json('excluidos.json', []); $ex[] = $doi; escribir_json('excluidos.json', array_values(array_unique($ex)));
  escribir_json('anadidos.json', array_values(array_filter(leer_json('anadidos.json', []), fn($x) => strtolower($x['doi']) !== $d)));
}
