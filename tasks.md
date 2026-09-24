# tasks.md \u00b7 Portfolio de Alex

## Decisiones de dise\u00f1o aprobadas por Alex

| Decisi\u00f3n | Valor aprobado | Notas |
|----------|----------------|-------|
| **Direcci\u00f3n** | Monocromo, blanco y neutros, mucho aire. Sin color de acento: la jerarqu\u00eda se hace con peso tipogr\u00e1fico, tama\u00f1o y gris, no con color. Superficies planas, sin sombras. | No sombras, no degradados, no iconos decorativos, no animaciones, no azul #2563EB/#1E40AF. |
| **Fuente** | Geist (Google Fonts, pesos 400/500/600, `font-display: swap`). Fallback: `-apple-system`, `"Segoe UI"`, Helvetica, Arial, sans-serif. | \u00danica dependencia externa permitida por la spec. |
| **Cabecera** | Todo centrado, tipo landing: eyebrow "PORTFOLIO", nombre en h1, titular en gris, y debajo los tres enlaces como botones pill: GitHub en `--btn` con texto `--btn-ink`; LinkedIn y Correo en `--surface` con texto `--ink`. Sin barra de navegaci\u00f3n superior (no est\u00e1 en el alcance). | |
| **Filtros** | Pills en fila con `flex-wrap` y gap 8px en todos los tama\u00f1os; nada de scroll horizontal. Inactivo: fondo `--surface`, texto `--ink`; hover `--surface-hover`. Activo: fondo `--btn`, texto `--btn-ink` (adem\u00e1s de `aria-pressed`). Altura 36px en desktop y 44px m\u00ednimo en m\u00f3vil (criterio 11). Padding 0 14px, radio `--radius-btn`. Foco visible con `--focus`. El contador "N proyectos" va a la derecha o debajo de la fila, en estilo eyebrow. | |
| **Tarjetas** | Fondo `--bg` (blanco, no gris: las im\u00e1genes de los proyectos tienen fondo blanco y sobre gris se ver\u00edan como un rect\u00e1ngulo pegado), borde 1px `--border`, radio `--radius-card`, sin sombra. Imagen 16:9 arriba, a sangre, recortada con el radio de la tarjeta; sin imagen, la tarjeta empieza directamente en el texto sin hueco (criterio 4). Padding interior 20px. Debajo del t\u00edtulo, chips de tecnolog\u00edas (fondo `--surface`, texto `--ink`, radio `--radius-chip`, padding 2px 8px). Enlace "Ver proyecto \u2197" como texto en 500, `--ink`, subrayado solo en hover. Hover de la tarjeta: borde pasa a `#D4D4D4`, nada m\u00e1s. | |
| **Rejilla y espaciado** | Contenedor m\u00e1x. 1080px centrado, padding lateral 24px (16px en m\u00f3vil). Rejilla de tarjetas: 1 columna, 2 desde 640px, 3 desde 1024px, gap 24px (criterio 10). Separaci\u00f3n entre secciones 80px en desktop y 56px en m\u00f3vil; la cabecera con 96px de aire arriba. | |
| **Estados vac\u00edo/error** | Texto 14px `--muted` centrado dentro de una caja `--surface` con borde `--border` y radio `--radius-card`. | |
| **Pie** | Borde superior 1px `--border`, 14px, `--muted`, con los enlaces en `--ink`. | |

---

## Tokens CSS (custom properties en :root)

```css
--bg: #FFFFFF;            /* fondo de p\u00e1gina y de tarjetas */
--ink: #0A0A0A;           /* texto principal */
--ink-2: #525252;         /* descripciones y texto secundario */
--muted: #737373;         /* eyebrows, metadatos, pie \u2014 SOLO sobre blanco */
--surface: #F5F5F5;       /* botones inactivos, chips, cajas */
--surface-hover: #E5E5E5;
--border: #E5E5E5;
--btn: #171717;           /* bot\u00f3n/filtro activo */
--btn-ink: #FAFAFA;
--radius-btn: 10px;
--radius-card: 12px;
--radius-chip: 8px;
--focus: 2px solid #0A0A0A; outline-offset: 2px;
```

---

## Tipograf\u00eda

| Elemento | Tama\u00f1o | Peso | Otros | Color |
|----------|--------|------|-------|-------|
| Nombre (h1) | clamp(40px, 6vw, 60px) | 600 | letter-spacing: -0.025em, line-height: 1.05 | --ink |
| Titular bajo nombre | 18px / 28px | 400 | | --muted |
| Eyebrow (secciones, contador) | 14px | 500 | may\u00fasculas, letter-spacing: 0.16em | --muted |
| h2 de secci\u00f3n | 28px | 600 | letter-spacing: -0.02em | --ink |
| T\u00edtulo de tarjeta | 18px | 600 | letter-spacing: -0.01em | --ink |
| Descripci\u00f3n | 15px / 24px | 400 | | --ink-2 |
| Botones y enlaces de acci\u00f3n | 14px | 500 | | --ink |
| Chips | 12px | 500 | | --ink |

Fuente: Geist desde Google Fonts (400/500/600, `font-display: swap`). Fallback: `-apple-system`, `"Segoe UI"`, Helvetica, Arial, sans-serif.

---

## Auditor\u00eda de la spec (notas para el equipo)

| # | Hueco | Decisi\u00f3n tomada |
|---|-------|-----------------|
| 1 | No se define qu\u00e9 ocurre si `perfil.json` no carga (solo `proyectos.json` en CA-18). | La cabecera y el pie muestran textos gen\u00e9ricos ("Portfolio", "Desarrollador") y un `console.error`. El resto de la p\u00e1gina sigue. |
| 2 | No se especifica si el orden de tarjetas se mantiene tras filtrar. | Se mantiene el orden del array original de `proyectos.json`. |
| 3 | CA-10: "tres columnas como m\u00ednimo" \u2014 \u00bfhay l\u00edmite superior? | Implementamos 1/2/3 columnas seg\u00fan viewport (1 default, 2 desde 640px, 3 desde 1024px). En pantallas >1440px podr\u00edan ser 4, pero no es un requisito. Se asegura m\u00ednimo 3 a 1024px. |
| 4 | CA-4: si `imagen` es null, \u00bfla tarjeta se compacta o mantiene altura? | Layout flexible sin hueco: no se renderiza el elemento `<img>` ni se reserva espacio. |

---

## Tareas

### T1 \u2014 Setup: estructura de archivos y JSONs de ejemplo
**Qu\u00e9:** Crear `index.html`, `css/estilos.css`, `js/app.js`, `perfil.json`, `proyectos.json` en el repo. Los JSONs deben contener datos de ejemplo v\u00e1lidos que cubran todos los casos de borde.
**Dependencias:** Ninguna.
**Definici\u00f3n de hecho:**
- [ ] Los 5 archivos existen en la rama `main` del repo.
- [ ] `proyectos.json` tiene \u22653 proyectos con variaci\u00f3n de campos opcionales (con/sin `url`, con/sin `imagen`, m\u00faltiples tecnolog\u00edas).
- [ ] `perfil.json` tiene todos los campos obligatorios.
- [ ] Las rutas son relativas y funcionar\u00e1n bajo la subruta `/portfolio-prueba/`.
- [ ] Geist anotada como \u00fanica dependencia externa permitida (se implementa en T2).

### T2 \u2014 HTML sem\u00e1ntico y estructura est\u00e1tica
**Qu\u00e9:** Escribir `index.html` con estructura sem\u00e1ntica, accesible, sin datos hardcodeados, con Geist cargada desde Google Fonts.
**Dependencias:** T1.
**Definici\u00f3n de hecho:**
- [ ] Pasa validador W3C sin errores.
- [ ] Un solo `h1`, cada secci\u00f3n con `h2`.
- [ ] `header`, `main`, `footer`, `nav` presentes y correctamente anidados.
- [ ] No hay texto de perfil ni proyectos hardcodeado en el HTML.
- [ ] `lang="es"` en `<html>`.
- [ ] Geist cargada desde Google Fonts con `font-display: swap`.
- [ ] Estructura de cabecera refleja dise\u00f1o aprobado: eyebrow "PORTFOLIO", h1 centrado, titular, botones pill.

### T3 \u2014 CSS base, responsive y \u00e1reas pulsables
**Qu\u00e9:** Implementar estilos con tokens CSS custom properties, dise\u00f1o monocromo aprobado, responsive y \u00e1reas pulsables \u226544px.
**Dependencias:** T2.
**Definici\u00f3n de hecho:**
- [ ] Tokens CSS en `:root` con todos los valores aprobados.
- [ ] A 360px: 1 columna, sin scroll horizontal.
- [ ] A 1024px: \u22653 columnas.
- [ ] Todos los botones de filtro y enlaces de tarjeta tienen \u00e1rea \u226544\u00d744px.
- [ ] No se usan `!important` ni hacks de CSS.
- [ ] Estilos validados en DevTools en ambos viewports.
- [ ] Geist aplicada con fallback.
- [ ] Foco visible en todos los elementos interactivos con `outline` definido.

### T4 \u2014 Carga y renderizado de perfil
**Qu\u00e9:** Fetch de `perfil.json`, poblar cabecera (eyebrow, h1, titular, botones pill), "Sobre m\u00ed" y pie. Manejar error de carga.
**Dependencias:** T1, T2.
**Definici\u00f3n de hecho:**
- [ ] Al cargar, la cabecera muestra datos de `perfil.json` con estilo aprobado.
- [ ] El enlace a GitHub construye la URL correctamente desde el nombre de usuario.
- [ ] Pie con borde superior 1px `--border`, texto 14px `--muted`, enlaces en `--ink`.
- [ ] Si `perfil.json` falla, la p\u00e1gina no se rompe: textos gen\u00e9ricos, resto funciona.
- [ ] Sin errores en consola en el caso feliz.

### T5 \u2014 Carga y renderizado de proyectos
**Qu\u00e9:** Fetch de `proyectos.json`, generar tarjetas con dise\u00f1o monocromo aprobado (blanco, borde, sin sombra, imagen 16:9 a sangre).
**Dependencias:** T1, T2.
**Definici\u00f3n de hecho:**
- [ ] Exactamente una tarjeta por objeto en `proyectos.json`.
- [ ] Tarjeta sin imagen cuando `imagen: null` \u2014 no hay `<img>` en el DOM ni hueco visual.
- [ ] Enlace "Ver proyecto" apunta correctamente seg\u00fan regla `url ?? repo`.
- [ ] Cada imagen tiene `alt` descriptivo (nombre del proyecto).
- [ ] Las tarjetas se generan desde JS; no est\u00e1n en el HTML est\u00e1tico.
- [ ] Estilo de tarjeta refleja dise\u00f1o aprobado: blanco, borde, sin sombra, imagen 16:9 a sangre, chips `--surface`.

### T6 \u2014 Filtro por tecnolog\u00eda
**Qu\u00e9:** Botones de filtro din\u00e1micos (pills, flex-wrap, sin scroll horizontal), filtrado JS, `aria-pressed`, contador con `aria-live="polite"`, mensaje de cero resultados.
**Dependencias:** T5.
**Definici\u00f3n de hecho:**
- [ ] Botones generados del JSON, no escritos en HTML.
- [ ] Orden alfab\u00e9tico de tecnolog\u00edas, "Todas" al principio.
- [ ] Filtrado funciona correctamente.
- [ ] `aria-pressed="true"` en activo, `"false"` en inactivos.
- [ ] Contador se actualiza y tiene `aria-live="polite"`.
- [ ] Mensaje "No hay proyectos con esta tecnolog\u00eda" cuando aplica, con estilo aprobado.
- [ ] Enter y Espacio activan los filtros.
- [ ] Filtros en pills con `flex-wrap`, sin scroll horizontal, altura correcta seg\u00fan viewport.

### T7 \u2014 Accesibilidad: teclado, foco y contraste
**Qu\u00e9:** Verificar y ajustar a11y: Tab order, foco visible (`outline: 2px solid #0A0A0A; outline-offset: 2px`), contraste \u22654.5:1 en todo el texto (incluido `--muted` sobre blanco), sem\u00e1ntica, `aria-live`, `alt` en im\u00e1genes.
**Dependencias:** T3, T4, T5, T6.
**Definici\u00f3n de hecho:**
- [ ] Se recorre toda la p\u00e1gina con Tab en orden l\u00f3gico.
- [ ] Foco visible en todos los enlaces y botones.
- [ ] Contraste \u22654.5:1 en todo el texto, incluido bot\u00f3n activo y texto `--muted` sobre blanco (evidencia con captura de herramienta).
- [ ] `aria-live="polite"` presente en contenedor del contador.
- [ ] Todas las im\u00e1genes tienen `alt` no vac\u00edo.
- [ ] Lighthouse Accessibility \u2265 95.

### T8 \u2014 Manejo de errores y edge cases
**Qu\u00e9:** Si `proyectos.json` no carga o est\u00e1 mal formado, mostrar "No se han podido cargar los proyectos". Si array vac\u00edo, mensaje apropiado. El resto de la p\u00e1gina sigue funcionando.
**Dependencias:** T4, T5.
**Definici\u00f3n de hecho:**
- [ ] Con `proyectos.json` corrupto o 404, aparece mensaje de error y el resto funciona.
- [ ] Con `proyectos.json` como array vac\u00edo, mensaje apropiado.
- [ ] No hay errores en consola que detengan la ejecuci\u00f3n (solo `console.error` controlado).
- [ ] Se prueba editando manualmente el JSON, haciendo push y recargando la URL p\u00fablica.

### T9 \u2014 Configuraci\u00f3n GitHub Pages y despliegue
**Qu\u00e9:** Configurar el repo para servir desde `main` en la subruta `/portfolio-prueba/`. Asegurar rutas relativas. Push y verificar URL p\u00fablica.
**Dependencias:** T1.
**Definici\u00f3n de hecho:**
- [ ] La URL p\u00fablica de GitHub Pages carga sin 404.
- [ ] Los JSON se cargan correctamente desde la subruta.
- [ ] Las im\u00e1genes se cargan correctamente desde la subruta.
- [ ] Un push a `main` se refleja en la URL p\u00fablica sin pasos manuales.
- [ ] No hay errores 404 en consola para recursos est\u00e1ticos.

### T10 \u2014 Verificaci\u00f3n de criterios de aceptaci\u00f3n
**Qu\u00e9:** Revisar uno a uno los 18 CA en la URL p\u00fablica. Documentar evidencia. Cualquier fallo \u2192 tarea de correcci\u00f3n.
**Dependencias:** T7, T8, T9.
**Definici\u00f3n de hecho:**
- [ ] Checklist de los 18 CA completado con evidencia documentada.
- [ ] Todos los CA que requieren edici\u00f3n de JSON se prueban editando, push y recarga.
- [ ] Cualquier fallo se documenta con pasos de reproducci\u00f3n y se crea tarea de correcci\u00f3n.
- [ ] Informe final de verificaci\u00f3n entregado.

---

## Dependencias entre tareas

```
T1 (Setup)
  \u251c\u2500\u2500 T2 (HTML) \u2500\u2500 T3 (CSS) \u2500\u2500 T7 (A11y)
  \u251c\u2500\u2500 T4 (Perfil) \u2500\u2500 T7 (A11y)
  \u2514\u2500\u2500 T5 (Proyectos) \u2500\u2500 T6 (Filtro) \u2500\u2500 T7 (A11y)
                              \u2514\u2500\u2500 T8 (Errores)

T9 (Deploy) puede empezar tras T1, pero necesita T7+T8+T10 para "Done".
T10 (Verificaci\u00f3n) necesita T7, T8, T9.
```

---

## Notas de ejecuci\u00f3n

- Las decisiones de dise\u00f1o en la cabecera de este documento est\u00e1n **aprobadas por Alex**. No se modifican sin su expl\u00edcita aprobaci\u00f3n.
- Cada tarea se mueve a `In Progress` cuando se empieza y a `Review` cuando el dev cree que est\u00e1 hecha. Alex (o el PM) la mueve a `Done` tras validar los criterios de hecho.
- Las pruebas de CA que requieren editar JSON deben hacerse en `main`, push, y verificar en la URL p\u00fablica. No en local.
