/* Correcciones a los rankings automáticos (3-AUTOMATICO/aportaciones.js y geo-refs.js).
   La web las aplica al cargar; el programa trimestral del servidor no las sobrescribe.
   mover:   {"doi": "apartado"}  → pasa ese trabajo a otro apartado (p. ej. "farmacia", "paleoclima").
   ocultar: ["doi", ...]         → no se muestra (no es de un socio, apartado erróneo sin sitio, etc.).
   Los DOI en minúsculas. */
window.AJUSTES_RANKINGS={"mover":{},"ocultar":[]};
