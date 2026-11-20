<?php
/* Actualiza publicaciones.js con los artículos de los socios (año actual y anterior), desde OpenAlex.
   Es la misma lógica que tools/publicaciones.py. */
declare(strict_types=1);
require_once __DIR__ . '/comun.php';


/* Devuelve [número de artículos, mensajes] o lanza una excepción. */
function actualizar_publicaciones(): array {
  @set_time_limit(300);
  $socios = leer_json('socios.json', []);
  $desde = (date('Y') - 1) . '-01-01';
  $obras = []; $idsocio = []; $log = [];
  foreach ($socios as $s) {
    $res = pedir_json('https://api.openalex.org/authors?per-page=25&search=' . rawurlencode($s['buscar']));
    if ($res === null) { $log[] = "Sin respuesta de OpenAlex para {$s['n']}"; continue; }
    $claves = array_map('norma', $s['centro'] ?? []);
    $elegidos = [];
    foreach ($res['results'] ?? [] as $a) {
      $inst = [];
      foreach ($a['last_known_institutions'] ?? [] as $i) $inst[] = $i['display_name'] ?? '';
      foreach ($a['affiliations'] ?? [] as $af) $inst[] = $af['institution']['display_name'] ?? '';
      $txt = norma(implode(' | ', $inst));
      $nom = str_replace('-', ' ', norma($a['display_name'] ?? ''));
      $centro_ok = false; foreach ($claves as $c) if ($c !== '' && str_contains($txt, $c)) $centro_ok = true;
      $pn = explode(' ', trim($nom))[0] ?? ''; $sn = $s['nombre'] ?? '';
      $nomok = $sn === '' || $pn === $sn || (strlen(rtrim($pn, '.')) === 1 && $pn[0] === $sn[0]) || in_array($sn, explode(' ', $nom), true);
      $ok = $nomok && ($a['works_count'] ?? 0) > 0 && ((str_contains($nom, norma($s['apellido'])) && $centro_ok) || (!empty($s['completo']) && str_contains($nom, norma($s['completo']))));
      if ($ok) $elegidos[] = basename($a['id']);
    }
    $log[] = $s['n'] . ': ' . count($elegidos) . ' perfil(es) en OpenAlex';
    if (!$elegidos) continue;
    foreach ($elegidos as $e) $idsocio[$e] = $s['n'];
    $cursor = '*';
    while ($cursor) {
      $d = pedir_json('https://api.openalex.org/works?per-page=200&cursor=' . rawurlencode($cursor) . '&filter=' .
        rawurlencode('author.id:' . implode('|', $elegidos) . ",from_publication_date:$desde,type:article"));
      if ($d === null) break;
      foreach ($d['results'] ?? [] as $w) {
        $src = $w['primary_location']['source'] ?? [];
        if (($src['type'] ?? '') !== 'journal') continue;
        $k = strtolower($w['doi'] ?? $w['id']);
        if (!isset($obras[$k])) {
          $b = $w['biblio'] ?? []; $fp = $b['first_page'] ?? ''; $lp = $b['last_page'] ?? '';
          $obras[$k] = ['t' => $w['title'] ?? '', 'a' => [], 'ai' => [], 'na' => count($w['authorships'] ?? []),
            'r' => $src['display_name'] ?? '', 'y' => $w['publication_year'] ?? null, 'f' => $w['publication_date'] ?? '',
            'doi' => $w['doi'] ?? '', 'v' => $b['volume'] ?? '', 'n' => $b['issue'] ?? '',
            'p' => ($lp && $lp !== $fp) ? "$fp–$lp" : (string)$fp, 's' => []];
          foreach (array_slice($w['authorships'] ?? [], 0, 12) as $x) {
            $obras[$k]['a'][] = $x['author']['display_name'] ?? '';
            $obras[$k]['ai'][] = basename($x['author']['id'] ?? '');
          }
        }
        if (!in_array($s['n'], $obras[$k]['s'], true)) $obras[$k]['s'][] = $s['n'];
      }
      $cursor = $d['meta']['next_cursor'] ?? null;
    }
  }
  foreach ($obras as &$o) {
    foreach ($o['a'] as $i => $n) if (isset($idsocio[$o['ai'][$i]])) $o['a'][$i] = $idsocio[$o['ai'][$i]];
    unset($o['ai']);
  }
  unset($o);
  $lista = array_values($obras);
  usort($lista, fn($a, $b) => strcmp((string)$b['f'], (string)$a['f']));
  if (!$lista) throw new RuntimeException('OpenAlex no devolvió ningún artículo; se mantiene la lista anterior.');
  escribir_js('publicaciones.js', 'PUBLICACIONES_SOCIOS', ['actualizado' => date('Y-m-d'), 'desde' => substr($desde, 0, 4), 'obras' => $lista],
    'Generado automáticamente desde OpenAlex; no editar a mano.');
  return [count($lista), $log];
}
