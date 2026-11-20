<?php
/* Panel de administración de la web de la SEA: noticias, socios, trabajos de referencia y publicaciones. */
declare(strict_types=1);
require_once __DIR__ . '/referencias.php';

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
    if ($accion === 'socios_fichero') {
      $f = $_FILES['fichero'] ?? null;
      if (!$f || $f['error'] !== UPLOAD_ERR_OK) throw new RuntimeException('Elige el fichero con el listado.');
      $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
      $filas = $ext === 'xlsx' ? filas_xlsx($f['tmp_name']) : ($ext === 'csv' || $ext === 'txt' ? filas_csv($f['tmp_name']) : throw new RuntimeException('El fichero debe ser Excel (.xlsx) o CSV.'));
      $antes = leer_json('socios.json', []); $S = socios_desde_filas($filas, $antes);
      if (count($S) < 5) throw new RuntimeException('No se reconocieron nombres en el fichero. La primera fila debe tener los títulos de las columnas (Nombre, Apellidos, Centro).');
      escribir_json('socios-anterior.json', $antes); escribir_json('socios.json', $S);
      $na = array_map(fn($x) => norma($x['n']), $antes); $nn = array_map(fn($x) => norma($x['n']), $S);
      $aviso = 'Listado cargado: ' . count($S) . ' socios (' . count(array_diff($nn, $na)) . ' nuevos, ' . count(array_diff($na, $nn)) . ' ya no están). Sus publicaciones se actualizarán solas.';
    }
    if ($accion === 'socios_deshacer') {
      $prev = leer_json('socios-anterior.json', null); if (!$prev) throw new RuntimeException('No hay listado anterior.');
      escribir_json('socios.json', $prev); $aviso = 'Recuperado el listado anterior.';
    }
    if ($accion === 'socio_guardar') {
      $S = leer_json('socios.json', []); $nuevo = socios_desde_filas([[trim($_POST['n'] ?? '')]], []);
      if (!$nuevo) throw new RuntimeException('Escribe nombre y apellidos.');
      $c = trim($_POST['centro'] ?? ''); if ($c !== '') $nuevo[0]['centro'] = [$c];
      $S[] = $nuevo[0]; escribir_json('socios.json', $S); $aviso = 'Socio añadido.';
    }
    if ($accion === 'socio_borrar') {
      $S = leer_json('socios.json', []); array_splice($S, (int)$_POST['i'], 1); escribir_json('socios.json', $S); $aviso = 'Socio quitado.';
    }
    /* Actualización automática (normalmente no hace falta tocar nada) */
    if ($accion === 'quitar_trabajo') { excluir_trabajo($_POST['doi'] ?? ''); $aviso = 'Trabajo quitado; no volverá a añadirse.'; }
    if ($accion === 'actualizar_todo') {
      [$np] = actualizar_publicaciones(); [$nr] = actualizar_referencias();
      $aviso = "Hecho: $np publicaciones recientes de socios; $nr trabajos de referencia nuevos.";
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
<nav><?php foreach (['noticias' => 'Noticias', 'socios' => 'Socios', 'auto' => 'Actualización automática', 'ajustes' => 'Contraseña y copia'] as $k => $v): ?>
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
<h1>Socios</h1>
<p class="nota">Sube el listado actual de socios cuando cambie. Basta un Excel o CSV con columnas <b>Nombre</b>, <b>Apellidos</b> y, si se tiene, <b>Centro</b> de trabajo. Las publicaciones de la web se actualizan solas a partir de este listado; los trabajos de referencia de socios antiguos se conservan.</p>
<form method="post" class="ficha" action="?p=socios" enctype="multipart/form-data"><?= $F ?><input type="hidden" name="accion" value="socios_fichero">
<label>Fichero con el listado <small>(.xlsx o .csv)</small><input type="file" name="fichero" accept=".xlsx,.csv,.txt" required></label><button>Cargar listado</button></form>
<?php if (is_file(DATOS . '/socios-anterior.json')): ?><form method="post" action="?p=socios" style="margin-top:.6rem" onsubmit="return confirm('¿Volver al listado anterior?')"><?= $F ?><input type="hidden" name="accion" value="socios_deshacer"><button class="claro">Deshacer la última carga</button></form><?php endif; ?>
<h2>Añadir un socio suelto</h2>
<form method="post" class="ficha" action="?p=socios"><?= $F ?><input type="hidden" name="accion" value="socio_guardar">
<div class="dos"><label>Nombre y apellidos<input name="n" required placeholder="María Pérez García"></label><label>Centro de trabajo<input name="centro" placeholder="Universidad de Salamanca"></label></div><button>Añadir</button></form>
<h2>Listado actual (<?= count($S) ?>)</h2>
<table><tr><th>Nombre</th><th>Centro</th><th></th></tr>
<?php foreach ($S as $i => $s): ?><tr><td><?= h($s['n']) ?></td><td><?= h(implode(', ', $s['centro'])) ?></td>
<td><form method="post" action="?p=socios" onsubmit="return confirm('¿Quitar a esta persona?')"><?= $F ?><input type="hidden" name="accion" value="socio_borrar"><input type="hidden" name="i" value="<?= $i ?>"><button class="claro">Quitar</button></form></td></tr><?php endforeach; ?></table>

<?php elseif ($pag === 'auto'): $P = leer_js('publicaciones.js', 'PUBLICACIONES_SOCIOS') ?? []; $rf = leer_json('referencias-fecha.json', []); $an = array_reverse(leer_json('anadidos.json', [])); ?>
<h1>Actualización automática</h1>
<p class="nota">No hace falta hacer nada aquí: cada mes la web busca sola las publicaciones recientes de los socios y los trabajos pioneros o altamente citados (con participación española, al menos 50 citas, los 10 más citados por sección). Los ya incluidos se mantienen salvo que otros más citados los superen.</p>
<table><tr><th>Publicaciones de socios</th><td><?= h($P['actualizado'] ?? 'nunca') ?> · <?= count($P['obras'] ?? []) ?> artículos</td></tr>
<tr><th>Trabajos de referencia</th><td><?= h($rf['actualizado'] ?? 'nunca') ?></td></tr></table>
<form method="post" class="ficha" action="?p=auto" style="margin-top:1rem" onsubmit="this.querySelector('button').textContent='Actualizando… puede tardar unos minutos'"><?= $F ?><input type="hidden" name="accion" value="actualizar_todo"><button class="claro">Actualizar ahora</button></form>
<h2>Últimos trabajos añadidos solos</h2>
<p class="nota">Por si alguno no corresponde a su sección: «Quitar» lo elimina y no vuelve a añadirse.</p>
<?php if (!$an): ?><p class="nota">Ninguno todavía.</p><?php else: ?>
<table><tr><th>Sección</th><th>Trabajo</th><th></th></tr>
<?php foreach ($an as $x): ?><tr><td><?= h(SECCIONES[$x['seccion']] ?? $x['seccion']) ?></td><td><?= h($x['a']) ?> (<?= (int)$x['y'] ?>). <a href="https://doi.org/<?= h($x['doi']) ?>" target="_blank"><?= h($x['t']) ?></a></td>
<td><form method="post" action="?p=auto"><?= $F ?><input type="hidden" name="accion" value="quitar_trabajo"><input type="hidden" name="doi" value="<?= h($x['doi']) ?>"><button class="claro">Quitar</button></form></td></tr><?php endforeach; ?></table><?php endif; ?>

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
