/* Correcciones y altas en los rankings automáticos (3-AUTOMATICO/aportaciones.js y geo-refs.js).
   La web las aplica al cargar; el programa trimestral del servidor no las sobrescribe.
   anadir:   {"doi": "apartado"}  → candidato de 3-AUTOMATICO/candidatos.js revisado y aprobado: entra en ese apartado.
   rechazar: ["doi", ...]         → candidato revisado y rechazado: no se vuelve a proponer.
   mover:    {"doi": "apartado"}  → pasa un trabajo ya publicado a otro apartado.
   ocultar:  ["doi", ...]         → no se muestra.
   Los DOI en minúsculas y sin https://doi.org/. */
window.AJUSTES_RANKINGS={"anadir":{},"rechazar":[],"mover":{},"ocultar":[]};
