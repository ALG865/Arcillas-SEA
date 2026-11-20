<?php
/* Para pruebas desde la línea de órdenes: php admin/cli-referencias.php */
require __DIR__ . '/referencias.php';
[$n, $log] = actualizar_referencias();
echo "Añadidos: $n\n"; foreach (leer_json('anadidos.json', []) as $x) echo "{$x['seccion']} | {$x['c']} | {$x['y']} | {$x['t']}\n";
echo implode("\n", $log), "\n";
