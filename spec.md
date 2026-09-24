# spec.md \u00b7 Portfolio de Alex

## Intenci\u00f3n
Quiero un portfolio de una sola p\u00e1gina que pueda ense\u00f1ar a una empresa desde el m\u00f3vil y mantener yo solo: a\u00f1adir un proyecto tiene que ser editar un JSON, no tocar HTML. Tiene que funcionar bien con teclado y lector de pantalla, porque quiero poder decir que es accesible y que sea verdad.

## Alcance
- Cabecera con nombre, titular y enlaces a GitHub, LinkedIn y correo. Datos en `perfil.json`.
- Secci\u00f3n "Sobre m\u00ed": un p\u00e1rrafo, desde `perfil.json`.
- Secci\u00f3n "Proyectos": una tarjeta por proyecto, generadas desde `proyectos.json`.
- Filtro por tecnolog\u00eda sobre las tarjetas.
- Pie con los mismos enlaces de la cabecera.
- Responsive, accesible y desplegado en GitHub Pages desde este repo.

## Fuera de alcance
- Blog, CMS, backend, base de datos, formulario de contacto, anal\u00edtica, aviso de cookies.
- Modo oscuro, varios idiomas, animaciones.
- Frameworks y procesos de build (React, Vue, Vite, Sass, Tailwind). HTML, CSS y JS planos.
- P\u00e1ginas de detalle por proyecto: el enlace "Ver proyecto" lleva fuera.

## Datos
`proyectos.json` es un array de objetos con: `id` (texto \u00fanico), `nombre`, `descripcion` (m\u00e1ximo 200 caracteres), `tecnologias` (array de textos), `url` (demo; puede ser null), `repo` (URL, obligatorio), `fecha` (`AAAA-MM`) e `imagen` (ruta relativa, data URI o null).

`perfil.json` es un objeto con: `nombre`, `titular`, `sobreMi`, `correo`, `github` (nombre de usuario) y `linkedin` (URL).

Los ficheros de ejemplo est\u00e1n en el repo. La p\u00e1gina tiene que funcionar con cualquier contenido que respete este formato, no solo con el de ejemplo.

## Restricciones t\u00e9cnicas
- Sin framework ni build: la ra\u00edz del repo se sirve tal cual en GitHub Pages.
- Sin dependencias externas salvo, como mucho, una fuente tipogr\u00e1fica.
- Ning\u00fan dato de proyecto ni de perfil escrito en el HTML: todo se lee de los JSON al cargar.
- Rutas relativas a los JSON y a las im\u00e1genes: la web vive bajo una subruta (`/portfolio-prueba/`).

## Criterios de aceptaci\u00f3n
Todos se comprueban en la URL p\u00fablica, no en local. Si un criterio no se puede comprobar, est\u00e1 mal escrito y hay que reescribirlo.

**Datos y contenido**
1. Al cargar hay exactamente una tarjeta por objeto de `proyectos.json`, en el orden del fichero. Prueba: a\u00f1adir un objeto al JSON y recargar \u2192 una tarjeta m\u00e1s, sin tocar nada m\u00e1s.
2. Cada tarjeta muestra nombre, descripci\u00f3n, la lista de tecnolog\u00edas y un enlace "Ver proyecto" (a `url` si no es null; si no, a `repo`) que abre en pesta\u00f1a nueva con `rel="noopener"`.
3. Nombre, titular, "Sobre m\u00ed" y los enlaces de cabecera y pie vienen de `perfil.json`.
4. Si `imagen` es null, la tarjeta no muestra ni imagen rota ni hueco: se ve igual de bien.

**Filtro**
5. Encima de las tarjetas hay un bot\u00f3n por cada tecnolog\u00eda distinta de `proyectos.json`, en orden alfab\u00e9tico, m\u00e1s un bot\u00f3n "Todas" al principio. Los botones se generan del JSON; no est\u00e1n escritos en el HTML.
6. Al pulsar una tecnolog\u00eda solo quedan visibles las tarjetas que la incluyen. El bot\u00f3n activo se distingue visualmente y lleva `aria-pressed="true"`; el resto, `aria-pressed="false"`.
7. "Todas" vuelve a mostrar todas las tarjetas y es el filtro activo al cargar.
8. Un texto "N proyectos" junto a los filtros se actualiza con cada filtro.
9. Si un filtro deja cero tarjetas, aparece el texto "No hay proyectos con esta tecnolog\u00eda". (Con el JSON de ejemplo no ocurre; se prueba editando el JSON.)

**Responsive**
10. A 360 px de ancho no hay desplazamiento horizontal y las tarjetas van en una columna. A 1024 px o m\u00e1s, en tres columnas como m\u00ednimo.
11. Los botones de filtro y los enlaces de las tarjetas tienen un \u00e1rea pulsable de al menos 44 \u00d7 44 px en m\u00f3vil.

**Accesibilidad**
12. Toda la p\u00e1gina se recorre y se opera con teclado: Tab llega a todos los enlaces y botones en orden l\u00f3gico, Enter y Espacio activan los filtros, y el foco se ve siempre.
13. Contraste m\u00ednimo 4,5:1 en todo el texto, incluido el del bot\u00f3n activo, medido con una herramienta.
14. Un solo `h1` (el nombre); cada secci\u00f3n con su `h2`; `header`, `main`, `footer` y `nav` para los filtros; `lang="es"` en `<html>`.
15. Toda imagen lleva `alt` descriptivo, y el resultado del filtro se anuncia: el texto "N proyectos" est\u00e1 en una regi\u00f3n `aria-live="polite"`.

**Despliegue y robustez**
16. La URL p\u00fablica de GitHub Pages sirve la \u00faltima versi\u00f3n de `main` sin ning\u00fan paso manual despu\u00e9s del push.
17. No hay errores en la consola del navegador al cargar ni al filtrar.
18. Si `proyectos.json` no carga o est\u00e1 mal formado, la secci\u00f3n muestra "No se han podido cargar los proyectos" y el resto de la p\u00e1gina sigue funcionando.

## Decisiones que dejo al equipo
Colores, tipograf\u00eda, disposici\u00f3n de la cabecera y estilo de las tarjetas: el PM propone en la cabecera de `tasks.md` y yo apruebo. Lo que no se decide sin m\u00ed: nada que toque el alcance, los datos o estos criterios.
