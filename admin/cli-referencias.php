<?php
/* Para pruebas desde la línea de órdenes: php admin/cli-referencias.php */
require __DIR__ . '/referencias.php';
[$n, $log] = actualizar_referencias();
echo "Propuestos: $n\n"; foreach (leer_json("propuestos.json", []) as $x) echo ($x["socio"]?"S ":"  "), "{$x["seccion"]} | {$x["c"]} | {$x["t"]}\n";
echo implode("\n", $log), "\n";
