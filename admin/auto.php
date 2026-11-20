<?php
/* Actualización automática mensual de las publicaciones de los socios.
   La web llama a esta página en segundo plano; solo actúa si la lista tiene más de 30 días. */
declare(strict_types=1);
require_once __DIR__ . '/publicaciones.php';
header('Content-Type: text/plain; charset=utf-8');
$p = leer_js('publicaciones.js', 'PUBLICACIONES_SOCIOS');
$fecha = $p['actualizado'] ?? '2000-01-01';
if (strtotime($fecha) > time() - 30 * 86400) exit('Al día');
$cerrojo = DATOS . '/actualizando.txt';
if (is_file($cerrojo) && filemtime($cerrojo) > time() - 3600) exit('Ya en marcha');
touch($cerrojo);
ignore_user_abort(true);
try { [$n] = actualizar_publicaciones(); echo "Actualizado: $n artículos"; }
catch (Throwable $e) { echo 'Error: ' . $e->getMessage(); }
finally { @unlink($cerrojo); }
