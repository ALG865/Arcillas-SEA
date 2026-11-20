<?php
/* Actualización automática mensual: publicaciones de los socios y trabajos de referencia.
   La web llama a esta página en segundo plano; solo actúa si han pasado más de 30 días. */
declare(strict_types=1);
require_once __DIR__ . '/referencias.php';
header('Content-Type: text/plain; charset=utf-8');
$cerrojo = DATOS . '/actualizando.txt';
if (is_file($cerrojo) && filemtime($cerrojo) > time() - 3600) exit('Ya en marcha');
$viejo = fn(?string $f) => strtotime($f ?? '2000-01-01') < time() - 30 * 86400;
$pub = $viejo(leer_js('publicaciones.js', 'PUBLICACIONES_SOCIOS')['actualizado'] ?? null);
$ref = $viejo(leer_json('referencias-fecha.json', [])['actualizado'] ?? null);
if (!$pub && !$ref) exit('Al día');
touch($cerrojo); ignore_user_abort(true);
try {
  if ($pub) { [$n] = actualizar_publicaciones(); echo "Publicaciones: $n\n"; }
  if ($ref) { [$n] = actualizar_referencias(); echo "Trabajos de referencia añadidos: $n\n"; }
} catch (Throwable $e) { echo 'Error: ' . $e->getMessage(); }
finally { @unlink($cerrojo); }
