<?php
/* Panel de administración de la web de la SEA: noticias, socios, trabajos de referencia y publicaciones. */
declare(strict_types=1);
require_once __DIR__ . '/publicaciones.php';

$aviso = ''; $error = '';
$accion = $_POST['accion'] ?? '';

/* ---------- Entrada, salida y contraseña ---------- */
if ($accion === 'crear_clave' && clave_guardada() === null) {
  comprobar_ficha();
  $c = $_POST['clave'] ?? '';
  if (strlen($c) < 8) $error = 'La contraseña debe tener al menos 8 caracteres.';
  elseif ($c !== ($_POST['clave2'] ?? '')) $error = 'Las dos contraseñas no coinciden.';
  else { guardar_clave($c); $_SESSION['sea_admin'] = true; $aviso = 'Contraseña creada. Ya puedes usar el panel.'; }
}
if ($accion === 'entrar') {
  comprobar_ficha();
  $intentos = $_SESSION['intentos'] ?? 0;
  if ($intentos >= 5 && time() - ($_SESSION['ultimo'] ?? 0) < 300) $error = 'Demasiados intentos. Espera cinco minutos.';
  elseif (password_verify($_POST['clave'] ?? '', (string)clave_guardada())) { session_regenerate_id(true); $_SESSION['sea_admin'] = true; $_SESSION['intentos'] = 0; }
  else { $_SESSION['intentos'] = $intentos + 1; $_SESSION['ultimo'] = time(); $error = 'Contraseña incorrecta.'; }
}
if (($_GET['salir'] ?? '') === '1') { session_destroy(); header('Location: ./'); exit; }

$pag = $_GET['p'] ?? 'noticias';

/* ---------- Acciones (solo con sesión iniciada) ---------- */
if (dentro() && $accion !== '' && !in_array($accion, ['entrar', 'crear_clave'], true)) {
  comprobar_ficha();
  try {
    /* Noticias */
    if ($accion === 'noticia_guardar') {
      $N = leer_js('noticias.js', 'NOTICIAS') ?? [];
      $tes = trim($_POST['titulo_es'] ?? ''); $fecha = $_POST['fecha'] ?? '';
      if ($tes === '' || !preg_match('/^\d{4}-\d{2}-\d{2}$/', $fecha)) throw new RuntimeException('Faltan el título o la fecha.');
      $n = ['tipo' => $_POST['tipo'] ?? 'noticia', 'fecha' => $fecha, 'plazo' => $_POST['plazo'] ?? '',
        'es' => ['n' => $tes, 't' => trim($_POST['texto_es'] ?? '')],
        'en' => ['n' => trim($_POST['titulo_en'] ?? '') ?: $tes, 't' => trim($_POST['texto_en'] ?? '') ?: trim($_POST['texto_es'] ?? '')],
        'url' => trim($_POST['enlace'] ?? ''), 'img' => ''];
      $i = $_POST['i'] ?? '';
      if ($i !== '' && isset($N[(int)$i])) { $n['img'] = $N[(int)$i]['img'] ?? ''; $N[(int)$i] = $n; } else $N[] = $n;
      usort($N, fn($a, $b) => strcmp($b['fecha'], $a['fecha']));
      escribir_js('noticias.js', 'NOTICIAS', $N, 'Noticias y convocatorias. Lo mantiene el panel de administración.');
      $aviso = 'Noticia guardada y publicada.';
    }
    if ($accion === 'noticia_borrar') {
      $N = leer_js('noticias.js', 'NOTICIAS') ?? []; array_splice($N, (int)$_POST['i'], 1);
      escribir_js('noticias.js', 'NOTICIAS', $N, 'Noticias y convocatorias. Lo mantiene el panel de administración.');
      $aviso = 'Noticia borrada.';
    }
    /* Socios */
    if ($accion === 'socio_guardar') {
      $S = leer_json('socios.json', []);
      $n = trim($_POST['n'] ?? ''); $buscar = trim($_POST['buscar'] ?? '') ?: $n; $ap = trim($_POST['apellido'] ?? '');
      $centro = array_values(array_filter(array_map('trim', explode(',', $_POST['centro'] ?? ''))));
      if ($n === '' || $ap === '' || !$centro) throw new RuntimeException('Rellena el nombre, el apellido y el centro.');
      $S[] = ['n' => $n, 'buscar' => $buscar, 'apellido' => $ap, 'centro' => $centro];
      escribir_json('socios.json', $S);
      $aviso = "Socio añadido. Sus artículos aparecerán al pulsar «Actualizar ahora» en Publicaciones, o solos en la próxima actualización mensual.";
    }
    if ($accion === 'socio_borrar') {
      $S = leer_json('socios.json', []); array_splice($S, (int)$_POST['i'], 1); escribir_json('socios.json', $S);
      $aviso = 'Socio quitado de la lista. Sus artículos desaparecerán en la próxima actualización.';
    }
    /* Trabajos de referencia */
    if ($accion === 'ref_doi') {
      $d = datos_doi($_POST['doi'] ?? '');
      if (!$d) throw new RuntimeException('No se encontró ese DOI. Compruébalo o rellena los datos a mano.');
      $_SESSION['ref_borrador'] = $d; $aviso = 'Datos recuperados. Revísalos y pulsa «Guardar trabajo».';
    }
    if ($accion === 'ref_guardar') {
      $sec = $_POST['seccion'] ?? '';
      if (!isset(SECCIONES[$sec])) throw new RuntimeException('Elige una sección.');
      $z = ['a' => trim($_POST['a'] ?? ''), 'y' => (int)($_POST['y'] ?? 0), 't' => trim($_POST['t'] ?? ''), 'r' => trim($_POST['r'] ?? ''),
        'c' => (int)($_POST['c'] ?? 0), 'doi' => preg_replace('~^(https?://)?(dx\.)?doi\.org/~i', '', trim($_POST['doi'] ?? ''))];
      if (!empty($_POST['pionero'])) $z['p'] = 1;
      if ($z['t'] === '' || $z['a'] === '' || !$z['y']) throw new RuntimeException('Faltan autores, año o título.');
      $R = leer_referencias();
      if (str_starts_with($sec, 'geo:')) $R['geo'][substr($sec, 4)][] = $z; else $R['ap'][$sec][] = $z;
      guardar_referencias($R); unset($_SESSION['ref_borrador']);
      $aviso = 'Trabajo añadido y publicado.';
    }
    if ($accion === 'ref_borrar') {
      $sec = $_POST['seccion'] ?? ''; $R = leer_referencias();
      if (str_starts_with($sec, 'geo:')) array_splice($R['geo'][substr($sec, 4)], (int)$_POST['i'], 1); else array_splice($R['ap'][$sec], (int)$_POST['i'], 1);
      guardar_referencias($R); $aviso = 'Trabajo quitado.';
    }
    /* Publicaciones */
    if ($accion === 'pub_actualizar') {
      [$num, $log] = actualizar_publicaciones();
      $aviso = "Publicaciones actualizadas: $num artículos. " . implode(' · ', $log);
    }
    /* Ajustes */
    if ($accion === 'clave_cambiar') {
      if (!password_verify($_POST['actual'] ?? '', (string)clave_guardada())) throw new RuntimeException('La contraseña actual no es correcta.');
      if (strlen($_POST['nueva'] ?? '') < 8) throw new RuntimeException('La nueva contraseña debe tener al menos 8 caracteres.');
      guardar_clave($_POST['nueva']); $aviso = 'Contraseña cambiada.';
    }
  } catch (Throwable $e) { $error = $e->getMessage(); }
}
if (dentro() && ($_GET['copia'] ?? '') === '1') {
  header('Content-Type: application/json; charset=utf-8');
  header('Content-Disposition: attachment; filename="copia-web-SEA-' . date('Y-m-d') . '.json"');
  echo json_encode(['noticias' => leer_js('noticias.js', 'NOTICIAS'), 'socios' => leer_json('socios.json'), 'referencias' => leer_referencias(),
    'publicaciones' => leer_js('publicaciones.js', 'PUBLICACIONES_SOCIOS')], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
  exit;
}
$F = '<input type="hidden" name="ficha" value="' . h(ficha()) . '">';
?><!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>Panel de la web · SEA</title>
<style>
@font-face{font-family:"Instrument Sans";src:url("../fuentes-tipo/instrument-sans-latin-400-normal.woff2") format("woff2")}@font-face{font-family:"Instrument Sans";src:url("../fuentes-tipo/instrument-sans-latin-600-normal.woff2") format("woff2");font-weight:600}
:root{--fondo:#f5f2ec;--tinta:#2a2520;--suave:#6b625a;--borde:#ddd5c8;--acento:#8f3f22}
*{box-sizing:border-box}body{margin:0;font:16px/1.5 "Instrument Sans",system-ui,sans-serif;background:var(--fondo);color:var(--tinta)}
header{display:flex;gap:1.5rem;align-items:center;flex-wrap:wrap;padding:1rem 1.5rem;border-bottom:1px solid var(--borde);background:#fff}
header b{font-size:1.1rem;margin-right:auto}nav a{color:var(--tinta);text-decoration:none;padding:.3rem .1rem;margin-right:1rem}
nav a.activo{border-bottom:2px solid var(--acento);font-weight:600}main{max-width:62rem;margin:0 auto;padding:1.5rem}
h1{font-size:1.5rem;margin:.2rem 0 1rem}h2{font-size:1.15rem;margin:2rem 0 .6rem}
.aviso,.error{padding:.7rem 1rem;border-radius:6px;margin:0 0 1rem}.aviso{background:#e7f1e3}.error{background:#f6e0da}
form.ficha{background:#fff;border:1px solid var(--borde);border-radius:8px;padding:1.2rem;display:grid;gap:.8rem}
label{display:grid;gap:.25rem;font-weight:600;font-size:.92rem}label small{font-weight:400;color:var(--suave)}
input,select,textarea{font:inherit;padding:.5rem .6rem;border:1px solid var(--borde);border-radius:6px;background:#fff;width:100%}
textarea{min-height:6rem}.dos{display:grid;grid-template-columns:1fr 1fr;gap:.8rem}
button{font:inherit;font-weight:600;padding:.55rem 1.1rem;border-radius:6px;border:1px solid var(--acento);background:var(--acento);color:#fff;cursor:pointer;justify-self:start}
button.claro{background:#fff;color:var(--acento)}table{width:100%;border-collapse:collapse;background:#fff;border:1px solid var(--borde)}
td,th{padding:.5rem .6rem;border-bottom:1px solid var(--borde);text-align:left;vertical-align:top;font-size:.93rem}th{background:#faf8f4}
td form{display:inline}td button{padding:.25rem .6rem;font-size:.85rem}.nota{color:var(--suave);font-size:.92rem}
.entrar{max-width:24rem;margin:4rem auto}@media(max-width:640px){.dos{grid-template-columns:1fr}}
</style></head><body>
<?php if (!dentro()): ?>
<main class="entrar"><h1>Panel de la web de la SEA</h1>
<?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>
<?php if (clave_guardada() === null): ?>
  <p class="nota">Es la primera vez que se abre el panel. Elige la contraseña que usará la persona encargada de actualizar la web.</p>
  <form method="post" class="ficha"><?= $F ?><input type="hidden" name="accion" value="crear_clave">
  <label>Nueva contraseña <small>(al menos 8 caracteres)</small><input type="password" name="clave" required autofocus></label>
  <label>Repítela<input type="password" name="clave2" required></label><button>Crear contraseña</button></form>
<?php else: ?>
  <form method="post" class="ficha"><?= $F ?><input type="hidden" name="accion" value="entrar">
  <label>Contraseña<input type="password" name="clave" required autofocus></label><button>Entrar</button></form>
<?php endif; ?></main>
<?php else: ?>
<header><b>Panel de la web de la SEA</b>
<nav><?php foreach (['noticias' => 'Noticias', 'socios' => 'Socios', 'refs' => 'Trabajos de referencia', 'publicaciones' => 'Publicaciones', 'ajustes' => 'Contraseña y copia'] as $k => $v): ?>
<a href="?p=<?= $k ?>" class="<?= $pag === $k ? 'activo' : '' ?>"><?= $v ?></a><?php endforeach; ?></nav>
<a href="../" target="_blank">Ver la web</a> · <a href="?salir=1">Salir</a></header>
<main>
<?php if ($aviso): ?><p class="aviso"><?= h($aviso) ?></p><?php endif; ?>
<?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?>

<?php if ($pag === 'noticias'):
  $N = leer_js('noticias.js', 'NOTICIAS') ?? []; $e = isset($_GET['editar']) ? ($N[(int)$_GET['editar']] ?? null) : null; ?>
<h1><?= $e ? 'Modificar noticia' : 'Nueva noticia, convocatoria o congreso' ?></h1>
<form method="post" class="ficha" action="?p=noticias"><?= $F ?><input type="hidden" name="accion" value="noticia_guardar">
<input type="hidden" name="i" value="<?= $e ? (int)$_GET['editar'] : '' ?>">
<div class="dos"><label>Tipo<select name="tipo">
<?php foreach (['noticia' => 'Noticia', 'convocatoria' => 'Convocatoria o premio (tiene plazo)', 'evento' => 'Congreso, jornada o evento'] as $k => $v): ?>
<option value="<?= $k ?>" <?= ($e['tipo'] ?? '') === $k ? 'selected' : '' ?>><?= $v ?></option><?php endforeach; ?></select></label>
<label>Fecha <small>(de la noticia o del evento)</small><input type="date" name="fecha" required value="<?= h($e['fecha'] ?? date('Y-m-d')) ?>"></label></div>
<label>Plazo <small>(solo convocatorias: último día para presentarse; después deja de destacarse)</small><input type="date" name="plazo" value="<?= h($e['plazo'] ?? '') ?>"></label>
<label>Título<input name="titulo_es" required value="<?= h($e['es']['n'] ?? '') ?>"></label>
<label>Texto <small>(dos o tres frases)</small><textarea name="texto_es"><?= h($e['es']['t'] ?? '') ?></textarea></label>
<label>Enlace <small>(opcional: página con más información)</small><input type="url" name="enlace" placeholder="https://…" value="<?= h($e['url'] ?? '') ?>"></label>
<details><summary>Versión en inglés (opcional; si se deja vacía se muestra el texto en español)</summary>
<label>Title<input name="titulo_en" value="<?= h(($e && $e['en']['n'] !== $e['es']['n']) ? $e['en']['n'] : '') ?>"></label>
<label>Text<textarea name="texto_en"><?= h(($e && $e['en']['t'] !== $e['es']['t']) ? $e['en']['t'] : '') ?></textarea></label></details>
<button><?= $e ? 'Guardar cambios' : 'Publicar' ?></button></form>
<h2>Noticias publicadas</h2>
<table><tr><th>Fecha</th><th>Tipo</th><th>Título</th><th></th></tr>
<?php foreach ($N as $i => $n): ?><tr><td><?= h($n['fecha']) ?></td><td><?= h($n['tipo']) ?></td><td><?= h($n['es']['n']) ?></td>
<td><a href="?p=noticias&editar=<?= $i ?>">Modificar</a>
<form method="post" action="?p=noticias" onsubmit="return confirm('¿Borrar esta noticia?')"><?= $F ?><input type="hidden" name="accion" value="noticia_borrar"><input type="hidden" name="i" value="<?= $i ?>"><button class="claro">Borrar</button></form></td></tr><?php endforeach; ?></table>

<?php elseif ($pag === 'socios'): $S = leer_json('socios.json', []); ?>
<h1>Socios cuyas publicaciones aparecen en la web</h1>
<p class="nota">La web busca cada mes en OpenAlex los artículos de estas personas publicados este año y el anterior. Para evitar confundirlas con otras del mismo nombre, se comprueba el apellido y el centro de trabajo.</p>
<form method="post" class="ficha" action="?p=socios"><?= $F ?><input type="hidden" name="accion" value="socio_guardar">
<div class="dos"><label>Nombre y apellidos <small>(como aparecerá en la web)</small><input name="n" required placeholder="María Pérez García"></label>
<label>Nombre con el que firma <small>(si es distinto)</small><input name="buscar" placeholder="María Pérez-García"></label></div>
<div class="dos"><label>Apellido para comprobar<input name="apellido" required placeholder="Pérez"></label>
<label>Centro de trabajo <small>(palabras clave separadas por comas)</small><input name="centro" required placeholder="Universidad de Salamanca"></label></div>
<button>Añadir socio</button></form>
<h2>Lista actual (<?= count($S) ?>)</h2>
<table><tr><th>Nombre</th><th>Firma</th><th>Centro</th><th></th></tr>
<?php foreach ($S as $i => $s): ?><tr><td><?= h($s['n']) ?></td><td><?= h($s['buscar']) ?></td><td><?= h(implode(', ', $s['centro'])) ?></td>
<td><form method="post" action="?p=socios" onsubmit="return confirm('¿Quitar a esta persona de la lista?')"><?= $F ?><input type="hidden" name="accion" value="socio_borrar"><input type="hidden" name="i" value="<?= $i ?>"><button class="claro">Quitar</button></form></td></tr><?php endforeach; ?></table>

<?php elseif ($pag === 'refs'):
  $R = leer_referencias(); $sec = $_GET['s'] ?? ($_POST['seccion'] ?? array_key_first(SECCIONES)); $b = $_SESSION['ref_borrador'] ?? [];
  $lista = str_starts_with($sec, 'geo:') ? ($R['geo'][substr($sec, 4)] ?? []) : ($R['ap'][$sec] ?? []); ?>
<h1>Trabajos pioneros o altamente citados</h1>
<form method="get" class="ficha"><input type="hidden" name="p" value="refs"><label>Sección de la web
<select name="s" onchange="this.form.submit()"><?php foreach (SECCIONES as $k => $v): ?><option value="<?= h($k) ?>" <?= $k === $sec ? 'selected' : '' ?>><?= h($v) ?></option><?php endforeach; ?></select></label></form>
<h2>Añadir un trabajo a «<?= h(SECCIONES[$sec] ?? '') ?>»</h2>
<form method="post" class="ficha" action="?p=refs&s=<?= h(urlencode($sec)) ?>"><?= $F ?><input type="hidden" name="accion" value="ref_doi"><input type="hidden" name="seccion" value="<?= h($sec) ?>">
<label>1. Escribe el DOI y pulsa el botón; los demás datos se rellenan solos<input name="doi" placeholder="10.1016/j.clay.2006.06.010" value="<?= h($b['doi'] ?? '') ?>"></label><button class="claro">Rellenar con el DOI</button></form>
<form method="post" class="ficha" action="?p=refs&s=<?= h(urlencode($sec)) ?>" style="margin-top:.8rem"><?= $F ?><input type="hidden" name="accion" value="ref_guardar"><input type="hidden" name="seccion" value="<?= h($sec) ?>">
<label>2. Autores <small>(los de centros españoles; «y otros» si hay más)</small><input name="a" required value="<?= h($b['a'] ?? '') ?>"></label>
<div class="dos"><label>Año<input name="y" type="number" required value="<?= h((string)($b['y'] ?? '')) ?>"></label><label>Citas <small>(se usa para ordenar)</small><input name="c" type="number" value="<?= h((string)($b['c'] ?? '')) ?>"></label></div>
<label>Título<input name="t" required value="<?= h($b['t'] ?? '') ?>"></label>
<div class="dos"><label>Revista<input name="r" value="<?= h($b['r'] ?? '') ?>"></label><label>DOI<input name="doi" value="<?= h($b['doi'] ?? '') ?>"></label></div>
<label style="display:flex;gap:.5rem;align-items:center;font-weight:400"><input type="checkbox" name="pionero" style="width:auto"> Es un trabajo pionero (aparece el primero de la lista)</label>
<button>Guardar trabajo</button></form>
<h2>Trabajos actuales (<?= count($lista) ?>)</h2>
<table><tr><th>Año</th><th>Trabajo</th><th></th></tr>
<?php foreach ($lista as $i => $z): ?><tr><td><?= h((string)$z['y']) ?><?= !empty($z['p']) ? '<br><small>pionero</small>' : '' ?></td>
<td><?= h($z['a']) ?>. <a href="https://doi.org/<?= h($z['doi']) ?>" target="_blank"><?= h($z['t']) ?></a>. <i><?= h($z['r']) ?></i></td>
<td><form method="post" action="?p=refs&s=<?= h(urlencode($sec)) ?>" onsubmit="return confirm('¿Quitar este trabajo?')"><?= $F ?><input type="hidden" name="accion" value="ref_borrar"><input type="hidden" name="seccion" value="<?= h($sec) ?>"><input type="hidden" name="i" value="<?= $i ?>"><button class="claro">Quitar</button></form></td></tr><?php endforeach; ?></table>

<?php elseif ($pag === 'publicaciones'): $P = leer_js('publicaciones.js', 'PUBLICACIONES_SOCIOS') ?? []; ?>
<h1>Publicaciones recientes de los socios</h1>
<p>Última actualización: <b><?= h($P['actualizado'] ?? 'nunca') ?></b> · <?= count($P['obras'] ?? []) ?> artículos.</p>
<p class="nota">Se actualizan solas una vez al mes. Si acabas de añadir un socio o quieres verlas ya, pulsa el botón; tarda uno o dos minutos.</p>
<form method="post" class="ficha" action="?p=publicaciones" onsubmit="this.querySelector('button').textContent='Actualizando… no cierres la página'"><?= $F ?><input type="hidden" name="accion" value="pub_actualizar"><button>Actualizar ahora</button></form>

<?php else: ?>
<h1>Contraseña y copia de seguridad</h1>
<form method="post" class="ficha" action="?p=ajustes"><?= $F ?><input type="hidden" name="accion" value="clave_cambiar">
<div class="dos"><label>Contraseña actual<input type="password" name="actual" required></label><label>Nueva contraseña<input type="password" name="nueva" required></label></div>
<button>Cambiar contraseña</button></form>
<h2>Copia de seguridad</h2>
<p class="nota">Descarga en un solo fichero todas las noticias, socios, trabajos de referencia y publicaciones. Conviene hacerlo de vez en cuando.</p>
<p><a href="?copia=1">Descargar copia</a></p>
<?php endif; ?>
</main>
<?php endif; ?>
</body></html>
