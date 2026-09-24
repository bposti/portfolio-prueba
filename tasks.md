# tasks.md · Portfolio de Alex · v3

## Decisiones técnicas

**Stack:** HTML, CSS y JS planos. Sin frameworks ni procesos de build. La raíz del repo se sirve tal cual en GitHub Pages.

**Estructura de ficheros:**
```
portfolio-prueba/
├── index.html              # Estructura base; metadatos OG estáticos (scrapers no ejecutan JS)
├── css/estilos.css         # Sistema de diseño del cliente; se usa tal cual
├── js/app.js               # Carga JSON, renderiza secciones, filtra proyectos, actividad GitHub
├── spec.md                 # Esta especificación
├── tasks.md                # Este documento
├── perfil.json             # Datos de perfil, hero, barra, contacto, pie
├── proyectos.json          # Datos de proyectos (destacados + rejilla)
├── certificaciones.json    # Datos de certificaciones
├── img/                    # Imágenes de proyectos y foto (subidas por el usuario)
└── og.png                  # Imagen Open Graph (subida por el usuario)
```

**Cómo se cargan los JSON:** Rutas relativas desde la raíz del repo. La web vive bajo la subruta `/portfolio-prueba/`, por lo que las rutas en el JS usan `./perfil.json`, `./proyectos.json`, etc. Si un JSON no carga o está mal formado, la sección afectada muestra un mensaje de error y el resto de la página sigue funcionando.

**Cómo se despliega:** GitHub Pages sirve la rama `main` directamente. Cada push a `main` se refleja en la URL pública sin pasos manuales adicionales.

---

## Decisiones técnicas · diseño v3

El CSS y la plantilla HTML son del cliente y se usan **tal cual**, sin modificaciones. El sistema de diseño es "editorial de desarrollador": monocromo con un acento elegido en `perfil.json`, tipografías Geist y Geist Mono desde Google Fonts, tres animaciones exactas (entrada del hero, hover de capturas, fundido del filtro) y ninguna más, respetando `prefers-reduced-motion: reduce`.

Si el Dev necesita una clase que no existe en `css/estilos.css`, la añade al final del fichero bajo el comentario `/* Añadido por el Dev */` y avisa. Cualquier cambio de diseño se aprueba en `spec.md` antes de tocar el CSS.

**Mapeo de bloques de la spec a id/clase de la plantilla:**

| Bloque de la spec | Selector(es) en `plantilla-index.html` |
|---|---|
| **Barra superior** | `.topbar`, `#brand`, `#brand-img`, `#brand-name`, `.topnav` (nav[aria-label="Secciones"]), `#pill-top`, `#btn-correo-top` |
| **Hero** | `.hero`, `#avatar`, `#pill-hero`, `#claim` (h1), `#intro`, `#acciones` |
| **Filtros** | `.filters-row`, `#filtros` (nav[aria-label="Filtro por tecnología"]), `#contador` (aria-live="polite") |
| **Destacados** | `.featured-list`, `#destacados`, `#mas-label` |
| **Rejilla** | `.grid`, `#lista` |
| **Sobre mí** | `#sobre-mi`, `#sobre-texto`, `#ahora-wrap`, `#ahora`, `#stack-wrap`, `#stack` |
| **Actividad** | `#actividad`, `#heat-wrap`, `#heat`, `#heat-total`, `#actividad-vacio` |
| **Certificaciones** | `#certificaciones`, `#certs`, `#certificaciones-vacio`, `#certificaciones-error` |
| **Contacto** | `#contacto`, `#h-contacto`, `#contacto-texto`, `#email`, `#copiar`, `#copiado` (aria-live), `#acciones-2` |
| **Pie** | `footer`, `#spec-link`, `#actualizado` |

---

## Historias de usuario [v3]

### H1 — Estructura HTML semántica y metadatos estáticos
**Qué:** Implementar `index.html` a partir de `plantilla-index.html`, manteniendo la semántica, los `aria-label`, el `lang="es"`, un único `h1`, `h2` por sección, `header`/`main`/`footer`, dos `nav` con `aria-label` distintos, y los metadatos OG estáticos que los scrapers puedan leer sin JS.

**Criterios cubiertos:** CA14 (semántica), D5 (OG estáticos en HTML).

**Definición de hecho (verificable en URL pública):**
- [ ] Validador W3C sin errores.
- [ ] Exactamente un `h1` (el claim; si no hay claim, el titular).
- [ ] Cada sección (`#proyectos`, `#sobre-mi`, `#actividad`, `#certificaciones`, `#contacto`) tiene su `h2`.
- [ ] `header` (barra), `main`, `footer` presentes.
- [ ] Dos `nav`: uno `aria-label="Secciones"` (barra), otro `aria-label="Filtro por tecnología"` (filtros).
- [ ] `lang="es"` en `<html>`.
- [ ] `<title>`, `meta description`, `og:title`, `og:description`, `og:image` presentes en el HTML estático.
- [ ] `og.png` responde 200 en la URL pública.

---

### H2 — Carga y renderizado de perfil en barra y hero
**Qué:** Fetch de `perfil.json`. Renderizar nombre, claim/titular, intro, estado de disponibilidad, foto, botones de acción (Correo, GitHub, LinkedIn, CV si existe) en el hero. En la barra: foto (aparece al scroll), nombre, enlaces a secciones (≥900 px), estado de disponibilidad y botón de correo. La foto y el estado de la barra no se ven mientras el hero está a la vista (D9).

**Criterios cubiertos:** CA3 (datos de perfil.json), D9 (barra condicional al scroll).

**Definición de hecho (verificable en URL pública):**
- [ ] El `h1` del hero muestra `claim` si existe; si no, `titular`.
- [ ] La intro del hero muestra `intro` si existe; si no, el primer párrafo de `sobreMi`.
- [ ] Los botones del hero enlazan correctamente a correo, GitHub (`https://github.com/{github}`), LinkedIn y CV si existe.
- [ ] La barra muestra nombre y enlaces a secciones desde 900 px.
- [ ] La foto y el estado de la barra están ocultos cuando el hero es visible; aparecen al hacer scroll más allá del hero.
- [ ] Con `foto: null`, el hero no deja hueco visual.
- [ ] Si `perfil.json` no carga, la página no se rompe: textos genéricos, resto funciona.

---

### H3 — Carga y renderizado de proyectos con destacados
**Qué:** Fetch de `proyectos.json`. Renderizar hasta dos proyectos con `destacado: true` en `.featured-list` con imagen a todo ancho (16:10, sin deformar). El resto en `.grid`. Cada tarjeta muestra nombre, fecha, descripción/resumen, tecnologías, enlace "Código" a `repo` y "Demo" a `url` si no es null (ambos con `rel="noopener"`, pestaña nueva). Si `imagen` es null, se muestra snippet si existe; si no, fallback tipográfico. Nunca imagen rota ni hueco.

**Criterios cubiertos:** CA1-2 (tarjetas desde JSON), CA4 (imagen null), D1 (destacados), D2 (capturas 16:10, snippet, fallback).

**Definición de hecho (verificable en URL pública):**
- [ ] Exactamente una tarjeta por objeto de `proyectos.json`, en el orden del fichero, con los dos primeros `destacado: true` arriba.
- [ ] Los destacados usan `.featured-list` con imagen a todo ancho; el resto va a `.grid`.
- [ ] Cada tarjeta tiene nombre, fecha, descripción o resumen, lista de tecnologías, enlace "Código" y "Demo" si aplica.
- [ ] Enlaces abren en pestaña nueva con `rel="noopener"`.
- [ ] Con `imagen: null`, no hay `<img>` en el DOM ni hueco visual; se ve snippet o fallback.
- [ ] Prueba: añadir un objeto al JSON, push, recargar → una tarjeta más sin tocar nada más.

---

### H4 — Filtro por tecnología
**Qué:** Generar botones de filtro dinámicamente desde `proyectos.json`: un botón por cada tecnología distinta en orden alfabético, más "Todas" al principio. Filtrar proyectos al pulsar. Botón activo con `aria-pressed="true"`; inactivos `aria-pressed="false"`. Contador "N proyectos" con `aria-live="polite"`. Mensaje "No hay proyectos con esta tecnología" si el filtro deja cero.

**Criterios cubiertos:** CA5-9 (filtro completo).

**Definición de hecho (verificable en URL pública):**
- [ ] Los botones se generan del JSON; no están escritos en el HTML.
- [ ] "Todas" es el primer botón y está activo al cargar.
- [ ] Tecnologías en orden alfabético.
- [ ] Al pulsar una tecnología, solo quedan visibles los proyectos que la incluyen (destacados incluidos).
- [ ] Botón activo: `aria-pressed="true"` y estilo visual distintivo; inactivos: `aria-pressed="false"`.
- [ ] El contador "N proyectos" se actualiza con cada filtro y tiene `aria-live="polite"`.
- [ ] Si un filtro deja cero proyectos, aparece "No hay proyectos con esta tecnología".
- [ ] Prueba: editar JSON para que un filtro dé cero, push, recargar → mensaje visible.

---

### H5 — Responsive layout
**Qué:** Asegurar que a 360 px no hay scroll horizontal, proyectos en una columna, hero visible sin scroll, botón de correo de la barra siempre a la vista. A 1024 px o más: proyectos no destacados en dos columnas, destacados con imagen a todo ancho, barra permanece visible al desplazar. Áreas pulsables ≥ 44×44 px en móvil.

**Criterios cubiertos:** CA10-11 (responsive y áreas pulsables).

**Definición de hecho (verificable en URL pública):**
- [ ] A 360×640, no hay scroll horizontal; DevTools muestra `overflow-x: hidden` respetado.
- [ ] A 360×640, proyectos en una columna; a 1024 px, no destacados en dos columnas.
- [ ] A 360×640, estado y titular del hero visibles sin desplazarse; botón correo de la barra a la vista.
- [ ] Barra permanece visible al desplazarse en ≥1024 px (sticky).
- [ ] Todos los botones de filtro y enlaces de tarjetas tienen área pulsable ≥44×44 px (verificable en DevTools o con regla visual).

---

### H6 — Accesibilidad: teclado, foco, contraste y ARIA
**Qué:** Toda la página operable con teclado: Tab en orden lógico, Enter/Espacio activan filtros, foco siempre visible. Contraste mínimo 4.5:1 en todo el texto, incluido botón activo y texto en color de acento. Imágenes con `alt` descriptivo. Contador del filtro en `aria-live="polite"`.

**Criterios cubiertos:** CA12-13 (teclado y contraste), CA15 (imágenes y aria-live), D4 (contraste acento).

**Definición de hecho (verificable en URL pública):**
- [ ] Se recorre toda la página con Tab en orden lógico (barra → hero → filtros → tarjetas → sobre mí → actividad → certificaciones → contacto → pie).
- [ ] Enter y Espacio activan los filtros.
- [ ] Foco visible en todos los enlaces y botones (outline definido).
- [ ] Contraste ≥4.5:1 en todo el texto, medido con herramienta (WCAG contrast checker), incluido `--muted` sobre blanco, botón activo y texto en color de acento.
- [ ] Todas las imágenes llevan `alt` no vacío.
- [ ] El contador "N proyectos" está en una región `aria-live="polite"`.

---

### H7 — Sección Sobre mí con Ahora y Stack
**Qué:** Renderizar párrafos de `sobreMi` en `#sobre-texto`. Renderizar lista "Ahora" desde `perfil.ahora` (máx. 3 items) en `#ahora`. Renderizar stack agrupado desde `perfil.stack` en `#stack`. Ocultar bloques si los arrays/objetos están vacíos.

**Criterios cubiertos:** CA3 (datos de perfil.json).

**Definición de hecho (verificable en URL pública):**
- [ ] Los párrafos de `sobreMi` se renderizan como párrafos separados en `#sobre-texto`.
- [ ] "Ahora" muestra hasta 3 items con guion como viñeta; si array vacío, bloque oculto.
- [ ] "Stack" muestra grupos (Lenguajes, Frameworks, Herramientas) con sus items; si objeto vacío, bloque oculto.
- [ ] Layout responsive: una columna en móvil, dos columnas (texto + aside) en ≥900 px.

---

### H8 — Sección Certificaciones con estados calculados
**Qué:** Fetch de `certificaciones.json`. Renderizar una fila por certificación, ordenadas por `obtenida` descendente. Mostrar nombre (enlace si hay `url`), entidad, fecha obtención DD/MM/AAAA. Estado calculado con fecha del navegador: "Caducada" (pasada), "Caduca pronto" (≤60 días), "Vigente", "Sin caducidad" (null). Estado como texto + distintivo visual (color + icono), nunca solo por color. Caducadas destacan. Fecha de caducidad en DD/MM/AAAA junto al estado si existe.

**Criterios cubiertos:** CA19-24 (certificaciones completas).

**Definición de hecho (verificable en URL pública):**
- [ ] Filas ordenadas por `obtenida` descendente.
- [ ] Nombre con enlace si `url` no es null; enlace abre en pestaña nueva.
- [ ] Fecha de obtención en formato DD/MM/AAAA.
- [ ] Estados calculados correctamente según la fecha del navegador al cargar.
- [ ] Cada estado tiene texto + color + icono; caducadas destacan visualmente sobre las demás.
- [ ] Fecha de caducidad visible junto al estado cuando existe.
- [ ] Sección cumple responsive (CA10) y a11y (CA12-15): teclado, foco, contraste.
- [ ] Si `certificaciones.json` no carga: "No se han podido cargar las certificaciones"; resto funciona.

---

### H9 — Sección Contacto con copiar correo
**Qué:** Renderizar correo como enlace principal (`mailto:`) y botón "Copiar". Al pulsar copiar, copiar la dirección de `perfil.json` al portapapeles y mostrar "Copiado ✓" en `#copiado` con `aria-live="polite"`. Renderizar enlaces secundarios (GitHub, LinkedIn) en `#acciones-2`.

**Criterios cubiertos:** D6 (copiar correo).

**Definición de hecho (verificable en URL pública):**
- [ ] El enlace de correo apunta a `mailto:{correo}` con la dirección de `perfil.json`.
- [ ] Pulsar "Copiar" copia la dirección al portapapeles.
- [ ] Aparece "Copiado ✓" en `#copiado` con `aria-live="polite"`.
- [ ] Los enlaces secundarios (GitHub, LinkedIn) se renderizan correctamente.

---

### H10 — Pie con actualización y enlace a spec
**Qué:** Renderizar enlace a `spec.md` del repo (`perfil.specUrl` o ruta relativa) y texto "Actualizado en <mes año>" a partir de `perfil.actualizado` (formato `AAAA-MM`).

**Criterios cubiertos:** D8 (pie actualizado).

**Definición de hecho (verificable en URL pública):**
- [ ] El enlace "spec.md" apunta a la URL correcta del repo.
- [ ] El texto muestra "Actualizado en <mes> <año>" parseado desde `AAAA-MM`.

---

### H11 — Meta tags OG y favicon
**Qué:** Asegurar que `index.html` tiene `title`, `meta description`, `og:title`, `og:description`, `og:image` (puntando a `og.png`), `twitter:card`, y favicon SVG inline. El JS actualiza `title` y metadatos OG al cargar con datos de `perfil.json` (para scrapers que ejecuten JS, aunque los estáticos ya cubren el caso base).

**Criterios cubiertos:** D5 (OG completo).

**Definición de hecho (verificable en URL pública):**
- [ ] `og.png` existe en la raíz y responde 200.
- [ ] Facebook Debugger o similar muestra título, descripción e imagen correctos.
- [ ] Favicon visible en la pestaña del navegador.

---

### H12 — GitHub Pages despliegue automático
**Qué:** Configurar el repo para servir desde `main` en la subruta `/portfolio-prueba/`. Asegurar rutas relativas en todos los recursos. Verificar que un push se refleja en la URL pública.

**Criterios cubiertos:** CA16 (despliegue automático).

**Definición de hecho (verificable en URL pública):**
- [ ] La URL pública de GitHub Pages carga sin 404.
- [ ] Los JSON se cargan correctamente desde la subruta.
- [ ] Las imágenes se cargan correctamente desde la subruta.
- [ ] Un push a `main` se refleja en la URL pública sin pasos manuales.

---

### H13 — Robustez, errores y motion
**Qué:** Manejar errores de carga de JSON sin romper la página. Asegurar `prefers-reduced-motion: reduce` desactiva todas las animaciones. Con motion permitido, solo las tres animaciones del sistema de diseño (entrada hero, hover capturas, fundido filtro). Asegurar que `acento` fuera de la lista o ausente usa el valor por defecto (`violeta`).

**Criterios cubiertos:** CA17-18 (sin errores en consola, error JSON), D3 (reduced motion), D4 (acento por defecto).

**Definición de hecho (verificable en URL pública):**
- [ ] No hay errores en la consola al cargar ni al filtrar.
- [ ] Si `proyectos.json` no carga o está mal formado: "No se han podido cargar los proyectos"; resto funciona.
- [ ] Con `prefers-reduced-motion: reduce` activado en el sistema operativo, no hay transiciones ni animaciones visibles.
- [ ] Con motion permitido, solo se ven: entrada del hero (fadeUp escalonado), hover de capturas (scale 1.02), fundido del filtro.
- [ ] Con `acento: "turquesa"` (fuera de lista) o ausente, el acento es `violeta`.

---

### H14 — PageSpeed Insights
**Qué:** Verificar que la URL pública obtiene ≥95 en Rendimiento, Accesibilidad, Buenas prácticas y SEO en PageSpeed Insights modo móvil.

**Criterios cubiertos:** D7 (PageSpeed).

**Definición de hecho (verificable en URL pública):**
- [ ] PageSpeed Insights (móvil) muestra ≥95 en las cuatro categorías.
- [ ] Captura de pantalla del informe como evidencia.

---

## Historias de usuario [Actividad]

### H15 — Rejilla de calor de contribuciones GitHub
**Qué:** Leer el usuario de GitHub desde `perfil.github`. Llamar a `https://github-contributions-api.jogruber.de/v4/{usuario}?y=last`. Filtrar los últimos 91 días en el cliente. Renderizar rejilla: 13 columnas (semanas) × 7 filas (días, lunes a domingo). Cada celda codifica 5 niveles de intensidad por luminosidad. Leyenda visible: "Menos → Más". Resumen textual: "N contribuciones en los últimos 3 meses" con `aria-live="polite"`. Cada celda tiene `aria-label` con fecha y número.

**Criterios cubiertos:** CA25-28 (actividad: usuario, rejilla, accesibilidad, resumen).

**Definición de hecho (verificable en URL pública):**
- [ ] El usuario se lee de `perfil.json`; no está hardcodeado en HTML ni JS.
- [ ] La rejilla tiene 13 columnas (semanas) y 7 filas (lunes a domingo).
- [ ] La última columna es la semana en curso; días futuros se ven vacíos (transparente con borde dashed).
- [ ] Cada celda tiene `aria-label` con fecha y número de contribuciones.
- [ ] Leyenda visible con 5 niveles de intensidad.
- [ ] Resumen textual visible con total de contribuciones y `aria-live="polite"`.
- [ ] Los colores de intensidad respetan el sistema de diseño (escala de grises monocroma).

---

### H16 — Estados vacíos y responsive de actividad
**Qué:** Manejar casos donde no hay usuario de GitHub, no hay contribuciones, o la API no responde. Mostrar estado vacío con mensaje descriptivo. Asegurar que a 360 px la rejilla entera se ve sin scroll horizontal.

**Criterios cubiertos:** CA29-30 (estados vacíos y responsive actividad).

**Definición de hecho (verificable en URL pública):**
- [ ] Si `perfil.github` es null o ausente: sección muestra mensaje de estado vacío; resto del portfolio no se afecta.
- [ ] Si la API no responde o devuelve error: sección muestra mensaje de estado vacío; resto funciona.
- [ ] Si el usuario existe pero no tiene contribuciones en los últimos 91 días: rejilla visible con todas las celdas vacías y resumen "0 contribuciones".
- [ ] A 360 px de ancho, la rejilla completa se ve sin scroll horizontal (scroll interno si es necesario, pero no overflow-x en la página).

---

## Dependencias entre historias

```
H1 (HTML estructura)
  ├── H2 (Perfil) ──┬── H7 (Sobre mí)
  │                 ├── H9 (Contacto)
  │                 ├── H10 (Pie)
  │                 └── H11 (OG)
  ├── H3 (Proyectos) ── H4 (Filtro)
  ├── H8 (Certificaciones)
  ├── H15 (Actividad) ── H16 (Estados actividad)
  └── H5 (Responsive) ── H6 (A11y)

H12 (Deploy) puede empezar tras H1.
H13 (Robustez) necesita H2, H3, H4, H8, H15.
H14 (PageSpeed) necesita todo lo demás hecho.
```

---

## Notas de ejecución

- Las decisiones de diseño en la sección "Decisiones técnicas · diseño v3" están aprobadas por Alex. No se modifican sin su explícita aprobación.
- Cada historia se mueve a `In Progress` cuando se empieza y a `Review` cuando el dev cree que está hecha. Alex (o el PM) la mueve a `Done` tras validar los criterios de hecho en la **URL pública**.
- Las pruebas que requieren editar JSON (CA1, CA9, H13-acento) deben hacerse en `main`, push, y verificar en la URL pública. No en local.
- Las imágenes (`img/`) y `og.png` las sube Alex por otra vía; no se generan ni se referencian de otra forma.
