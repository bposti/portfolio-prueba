# spec.md · Portfolio de Alex · v3

## Intención
Quiero un portfolio de una sola página que pueda enseñar a una empresa desde el móvil y mantener yo solo: añadir un proyecto tiene que ser editar un JSON, no tocar HTML. Tiene que funcionar bien con teclado y lector de pantalla, porque quiero poder decir que es accesible y que sea verdad. Y tiene que apetecer tenerlo: en la primera pantalla se ve quién soy, qué construyo y qué busco, y el trabajo real se ve grande antes que la lista de tecnologías.

## Alcance
- Barra superior fija con foto (si la hay), nombre, enlaces a las secciones (desde 900 px), estado de disponibilidad y botón de correo. Datos en `perfil.json`. La foto y el estado de la barra solo se muestran cuando el hero ya no está a la vista.
- Hero: foto opcional, estado de disponibilidad, titular de una frase (`claim`), intro y acciones (Correo, GitHub, LinkedIn y CV si existe). Datos en `perfil.json`.
- Sección "Proyectos": filtro por tecnología, hasta dos proyectos destacados con la imagen a todo el ancho y el resto en rejilla, todo generado desde `proyectos.json`.
- Sección "Sobre mí": texto en párrafos, bloque "Ahora" y stack agrupado, desde `perfil.json`.
- Sección "Actividad": contribuciones públicas de GitHub de las últimas 13 semanas del usuario de `perfil.json`, como rejilla de calor.
- Sección "Certificaciones", desde `certificaciones.json`.
- Sección "Contacto" al final, con el correo como enlace principal y botón de copiar. Pie con enlace a `spec.md` y fecha de actualización.
- Responsive, accesible y desplegado en GitHub Pages desde este repo.

## Fuera de alcance
- Blog, CMS, backend, base de datos, formulario de contacto, analítica, aviso de cookies.
- Modo oscuro, varios idiomas, sombras, degradados, librerías de animación e iconos distintos de los ocho inline del sistema de diseño (correo, fichero, flecha externa, copiar, check, reloj, alerta, guion). Se permiten un único color de acento, elegido en `perfil.json` de una lista cerrada, y exactamente las tres animaciones descritas en el sistema de diseño, desactivadas con `prefers-reduced-motion`.
- Frameworks y procesos de build (React, Vue, Vite, Sass, Tailwind). HTML, CSS y JS planos.
- Páginas de detalle por proyecto: los enlaces "Código" y "Demo" llevan fuera.
- Recordatorios por correo o notificaciones; renovación automática de certificaciones.
- Login con GitHub, contribuciones privadas, más de 3 meses de actividad, estadísticas por repositorio.

## Datos
`proyectos.json` es un array de objetos con: `id` (texto único), `nombre`, `destacado` (booleano; como máximo dos con `true`, si hay más cuentan los dos primeros del fichero), `resumen` (máximo 120 caracteres; es lo que se muestra en la rejilla), `descripcion` (máximo 320 caracteres; se muestra en los destacados y admite `**negrita**` como único marcado, el resto se escapa), `tecnologias` (array de textos), `url` (demo; puede ser null), `repo` (URL, obligatorio), `fecha` (`AAAA-MM`), `imagen` (ruta relativa, data URI o null) y `snippet` (objeto `{ "lang", "code" }` con hasta 8 líneas, o null). `imagen` manda sobre `snippet`, y `snippet` manda sobre el fallback tipográfico.

`perfil.json` es un objeto con: `nombre`, `titular`, `claim` (una frase, máximo 16 palabras; si falta se usa `titular`), `intro` (una o dos líneas; si falta se usa el primer párrafo de `sobreMi`), `sobreMi` (párrafos separados por una línea en blanco), `disponibilidad` (texto o null; null oculta el estado), `ubicacion`, `foto` (ruta relativa, data URI o null), `cv` (ruta o null), `acento` (uno de `violeta`, `azul`, `verde`, `naranja`, `rosa`, `amarillo`; otro valor o ausencia → `violeta`), `ahora` (array de hasta tres textos), `stack` (objeto grupo → array de textos; vacío oculta el bloque), `actualizado` (`AAAA-MM`), `correo`, `github` (nombre de usuario), `linkedin` (URL) y `specUrl` (URL de `spec.md` en el repo; opcional).

`certificaciones.json` es un array de objetos con: `nombre`, `entidad`, `obtenida` (`AAAA-MM-DD`), `caduca` (`AAAA-MM-DD` o null si no caduca) y `url` (URL o null).

Los ficheros de ejemplo están en el repo. La página tiene que funcionar con cualquier contenido que respete este formato, no solo con el de ejemplo.

## Restricciones técnicas
- Sin framework ni build: la raíz del repo se sirve tal cual en GitHub Pages.
- Dependencias externas: únicamente las tipografías Geist (400/500/600) y Geist Mono (400/500) desde Google Fonts, con `font-display: swap` y fallbacks del sistema. Ninguna otra.
- El sistema de diseño lo entrega el cliente en `css/estilos.css` y se usa tal cual; los cambios de diseño se aprueban en esta spec antes de tocar el CSS. Si hace falta una clase que no existe, se añade al final del fichero bajo el comentario "Añadido por el Dev" y se avisa. La estructura HTML de referencia del cliente está en `plantilla-index.html`.
- Ningún dato de proyecto ni de perfil escrito en el HTML: todo se lee de los JSON al cargar. Única excepción: `<title>`, `meta description`, etiquetas Open Graph y favicon van en `index.html` porque los scrapers de enlaces no ejecutan JS; el JS los actualiza al cargar con los datos de `perfil.json`.
- Rutas relativas a los JSON, a las imágenes y al CSS: la web vive bajo una subruta (`/portfolio-prueba/`).
- Datos de actividad de `https://github-contributions-api.jogruber.de/v4/{usuario}?y=last` (fecha, número y nivel 0–4 por día); se filtran los últimos 91 días en el cliente. Sin backend ni token.

## Criterios de aceptación
Todos se comprueban en la URL pública, no en local. Si un criterio no se puede comprobar, está mal escrito y hay que reescribirlo.

**Datos y contenido**
1. Al cargar hay exactamente una tarjeta por objeto de `proyectos.json`, en el orden del fichero (primero los destacados, luego el resto). Prueba: añadir un objeto al JSON y recargar → una tarjeta más, sin tocar nada más.
2. Cada tarjeta muestra nombre, fecha, descripción o resumen, la lista de tecnologías, un enlace "Código" a `repo` y, si `url` no es null, un enlace "Demo" a `url`; ambos abren en pestaña nueva con `rel="noopener"`.
3. Nombre, titular, claim, intro, estado, "Sobre mí", "Ahora", stack y los enlaces de barra, hero, contacto y pie vienen de `perfil.json`.
4. Si `imagen` es null, la tarjeta no muestra ni imagen rota ni hueco: se ve igual de bien.

**Filtro**
5. Encima de los proyectos hay un botón por cada tecnología distinta de `proyectos.json`, en orden alfabético, más un botón "Todas" al principio. Los botones se generan del JSON; no están escritos en el HTML.
6. Al pulsar una tecnología solo quedan visibles los proyectos que la incluyen, destacados incluidos. El botón activo se distingue visualmente y lleva `aria-pressed="true"`; el resto, `aria-pressed="false"`.
7. "Todas" vuelve a mostrar todos los proyectos y es el filtro activo al cargar.
8. Un texto "N proyectos" junto a los filtros se actualiza con cada filtro.
9. Si un filtro deja cero proyectos, aparece el texto "No hay proyectos con esta tecnología". (Con el JSON de ejemplo no ocurre; se prueba editando el JSON.)

**Responsive**
10. A 360 px de ancho no hay desplazamiento horizontal, los proyectos van en una columna y, a 360×640, el estado y el titular completo del hero se ven sin desplazarse, con el botón de correo de la barra superior siempre a la vista. A 1024 px o más, los proyectos no destacados van en dos columnas, los destacados muestran la imagen a todo el ancho y la barra superior permanece visible al desplazarse.
11. Los botones de filtro y los enlaces de las tarjetas tienen un área pulsable de al menos 44 × 44 px en móvil.

**Accesibilidad**
12. Toda la página se recorre y se opera con teclado: Tab llega a todos los enlaces y botones en orden lógico, Enter y Espacio activan los filtros, y el foco se ve siempre.
13. Contraste mínimo 4,5:1 en todo el texto, incluido el del botón activo y el texto en color de acento, medido con una herramienta.
14. Un solo `h1` (el claim; si no hay claim, el titular); cada sección con su `h2`; `header` (la barra superior), `main` y `footer`; dos `nav` con `aria-label` distintos, uno para las secciones y otro para los filtros; `lang="es"` en `<html>`.
15. Toda imagen lleva `alt` descriptivo, y el resultado del filtro se anuncia: el texto "N proyectos" está en una región `aria-live="polite"`.

**Despliegue y robustez**
16. La URL pública de GitHub Pages sirve la última versión de `main` sin ningún paso manual después del push.
17. No hay errores en la consola del navegador al cargar ni al filtrar.
18. Si `proyectos.json` no carga o está mal formado, la sección muestra "No se han podido cargar los proyectos" y el resto de la página sigue funcionando.

**Certificaciones**
19. Una fila por certificación, ordenadas por `obtenida` descendente, con nombre, entidad y fecha de obtención en formato DD/MM/AAAA. Si hay `url`, el nombre enlaza a ella en pestaña nueva.
20. El estado se calcula con la fecha del navegador al cargar, nunca escrita en el código: "Caducada" si `caduca` es anterior a hoy; "Caduca pronto" si faltan 60 días o menos; "Vigente" en el resto; "Sin caducidad" si `caduca` es null.
21. El estado se ve como texto y como distintivo visual (color más icono), nunca solo por color, y las caducadas destacan sobre las demás.
22. Cuando existe, la fecha de caducidad se muestra en DD/MM/AAAA junto al estado.
23. La sección cumple los criterios 10 a 15 (responsive y accesibilidad) igual que el resto de la página.
24. Si `certificaciones.json` no carga o está mal formado, la sección muestra "No se han podido cargar las certificaciones" y el resto sigue funcionando.

**Actividad**
25. El usuario de GitHub se lee del campo `github` de `perfil.json`; no aparece en el HTML ni en el JS.
26. La rejilla cubre los últimos 91 días: una columna por semana (13), una fila por día de lunes a domingo; la última columna es la semana en curso y los días futuros se ven vacíos.
27. Cada celda lleva fecha y número de contribuciones como texto accesible (`aria-label`); el color codifica cinco niveles de intensidad por luminosidad, con leyenda visible.
28. Debajo de la rejilla hay un resumen en texto: "N contribuciones en los últimos 3 meses".
29. Si no hay usuario, no hay contribuciones o la fuente no responde, la sección muestra un estado vacío con mensaje y el resto del portfolio no se ve afectado.
30. A 360 px de ancho la rejilla entera se ve sin desplazamiento horizontal.

**Acabado**
- D1. Con `destacado: true` en dos proyectos, esos dos aparecen antes que el resto con la imagen a todo el ancho; con ninguno, todos van a la rejilla y no queda hueco.
- D2. Toda captura se muestra a 16:10 sin deformarse, dentro del marco del sistema de diseño; sin `imagen`, se muestra la tarjeta terminal si hay `snippet` y, si no, el fallback tipográfico. En ningún caso hay imagen rota, hueco ni monograma.
- D3. Con `prefers-reduced-motion: reduce` no hay ninguna transición ni animación; sin él, hay exactamente las tres descritas en el sistema de diseño (entrada del hero, hover de capturas, fundido del filtro).
- D4. Con `acento` fuera de la lista o ausente, la página usa el acento por defecto; el texto en color de acento cumple 4,5:1 sobre blanco.
- D5. `index.html` incluye `title`, `description`, `og:title`, `og:description` y `og:image`, y `og.png` existe en la raíz y responde 200 en la URL pública.
- D6. El botón de copiar correo copia la dirección de `perfil.json` y muestra "Copiado ✓" en una región `aria-live`.
- D7. PageSpeed Insights sobre la URL pública, en móvil, da 95 o más en Rendimiento, Accesibilidad, Buenas prácticas y SEO.
- D8. El pie muestra "Actualizado en <mes año>" a partir de `perfil.actualizado` y un enlace a `spec.md` del repo.
- D9. La foto y el estado de disponibilidad de la barra superior no se ven mientras el hero está a la vista y aparecen al desplazarse más allá; con `foto: null` el hero no deja hueco.

## Dirección visual (aprobada)
Editorial de desarrollador: una sola columna, base monocroma, un acento elegido por el alumno, capturas grandes y enmarcadas, Geist para todo y Geist Mono para los metadatos, tres animaciones y ninguna más. Los valores concretos están en `css/estilos.css` (tokens, tipografía, componentes, animación) y en la sección "Decisiones técnicas · diseño v3" de `tasks.md`, que forma parte de esta spec por referencia. Cualquier cambio de diseño se aprueba aquí antes de tocar el CSS.
