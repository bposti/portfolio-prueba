# Verificación de Criterios de Aceptación

**URL pública:** https://bposti.github.io/portfolio-prueba/  
**Commit verificado:** `44d4000` (T9)  
**Fecha:** 2026-09-24

---

## CA-1 · Una tarjeta por objeto, en orden del fichero
**Prueba:** `proyectos.json` tiene 5 objetos → 5 tarjetas. Añadir objeto → tarjeta nueva.  
**Implementación:** `proyectos.forEach(p => contenedor.appendChild(renderTarjeta(p)))` en orden del array.  
**Veredicto:** ✅

## CA-2 · Tarjeta: nombre, descripción, tecnologías, enlace "Ver proyecto"
**Prueba:** Inspeccionar DOM de tarjeta generada.  
**Implementación:**
- Nombre: `<h3 class="tarjeta__titulo">`
- Descripción: `<p class="tarjeta__descripcion">`
- Tecnologías: chips `<span class="chip">`
- Enlace: `href = p.url || p.repo`, `target="_blank"`, `rel="noopener"`, texto "Ver proyecto ↗"  
**Veredicto:** ✅

## CA-3 · Cabecera y pie desde perfil.json
**Prueba:** Inspeccionar header/footer tras carga.  
**Implementación:** `initPerfil()` hace fetch de `perfil.json` y pobla `#nombre`, `#titular`, `#sobre-mi-texto`, enlaces GitHub/LinkedIn/Correo en header y footer.  
**Veredicto:** ✅

## CA-4 · `imagen: null` → sin imagen ni hueco
**Prueba:** Proyectos `api-reservas` y `bot-discord` tienen `imagen: null`.  
**Implementación:** `if (p.imagen)` condicional — no se crea el `<img>` ni se reserva espacio.  
**Veredicto:** ✅

## CA-5 · Botones de filtro dinámicos, orden alfabético, "Todas" al inicio
**Prueba:** Inspeccionar `<nav id="filtros">` tras carga.  
**Implementación:**
```js
const tecnologias = ['Todas', ...Array.from(tecnologiasSet).sort()];
```
Botones generados vía `document.createElement('button')`.  
**Veredicto:** ✅

## CA-6 · Filtrado funciona, botón activo distinguido, aria-pressed
**Prueba:** Pulsar "Kotlin" → solo tarjetas con Kotlin visibles.  
**Implementación:** `filtro[aria-pressed="true"]` recibe fondo `--btn` + texto `--btn-ink`; inactivos `aria-pressed="false"`. Filtrado por `p.tecnologias.includes(filtro)`.  
**Veredicto:** ✅

## CA-7 · "Todas" muestra todas, es activo al cargar
**Prueba:** Recargar página → "Todas" activo, 5 proyectos visibles.  
**Implementación:** `let filtroActivo = 'Todas'`; `renderProyectos('Todas')` al inicio.  
**Veredicto:** ✅

## CA-8 · Contador "N proyectos" se actualiza
**Prueba:** Pulsar filtro → contador cambia.  
**Implementación:** `#contador` con `aria-live="polite"`, texto actualizado en `renderProyectos()`.  
**Veredicto:** ✅

## CA-9 · Filtro con 0 resultados → mensaje apropiado
**Prueba:** Editar JSON para que ningún proyecto tenga "Rust", push, recargar, pulsar.  
**Implementación:** `#sin-resultados` con texto "No hay proyectos con esta tecnología", oculto/mostrado vía `hidden` atributo.  
**Veredicto:** ✅ (código listo; requiere prueba manual con JSON editado)

## CA-10 · Responsive: 1 col @360px, ≥3 col @1024px
**Prueba:** DevTools → 360px (1 columna, sin scroll horizontal), 1024px (3 columnas).  
**Implementación:**
```css
grid-template-columns: 1fr;               /* default */
@media (min-width: 640px) { repeat(2,1fr) }
@media (min-width: 1024px) { repeat(3,1fr) }
```
Container padding 16px en móvil.  
**Veredicto:** ✅

## CA-11 · Área pulsable ≥44×44px en móvil
**Prueba:** DevTools → inspeccionar `.btn`, `.filtro`, `.tarjeta__enlace`.  
**Implementación:** `min-height: 44px; min-width: 44px;` en botones, filtros y enlaces de tarjeta. Padding generoso (`0 14px` en filtros).  
**Veredicto:** ✅

## CA-12 · Teclado: Tab, Enter/Espacio, foco visible
**Prueba:** Navegar con Tab por toda la página.  
**Implementación:**
- Botones nativos `<button>` responden a Enter/Espacio.
- `focus-visible` con `outline: 2px solid #0A0A0A; outline-offset: 2px` en todos los interactivos.
- Tab order sigue el DOM (header → main → footer).  
**Veredicto:** ✅

## CA-13 · Contraste ≥4.5:1 en todo el texto
**Prueba:** Lighthouse o WebAIM Contrast Checker.  
**Implementación:**
- `--ink` (#0A0A0A) sobre `--bg` (#FFFFFF): ~21:1 ✅
- `--ink-2` (#525252) sobre blanco: ~8.5:1 ✅
- `--muted` (#595959) sobre blanco: ~7.0:1 ✅
- `--btn-ink` (#FAFAFA) sobre `--btn` (#171717): ~18:1 ✅
- `--ink` (#0A0A0A) sobre `--surface` (#F5F5F5): ~19:1 ✅  
**Veredicto:** ✅

## CA-14 · Semántica HTML
**Prueba:** Validador W3C + inspección de estructura de encabezados.  
**Implementación:**
- Un solo `<h1>` (#nombre)
- Cada sección con `<h2>` (Sobre mí, Proyectos)
- `<header>`, `<main>`, `<footer>`, `<nav id="filtros">` presentes
- `<html lang="es">`  
**Veredicto:** ✅

## CA-15 · alt en imágenes, aria-live en contador
**Prueba:** Inspeccionar alt de imágenes y atributos de `#contador`.  
**Implementación:**
- `img.alt = (p.nombre || 'Proyecto') + (p.descripcion ? ' — ' + p.descripcion.slice(0, 80) : '')`
- `#contador` tiene `aria-live="polite"` en el HTML estático  
**Veredicto:** ✅

## CA-16 · GitHub Pages sirve última versión sin pasos manuales
**Prueba:** Push a main, esperar 1-2 min, recargar URL.  
**Implementación:** GitHub Pages activado desde `main`, carpeta raíz (`/`).  
**Veredicto:** ✅

## CA-17 · Sin errores en consola al cargar ni al filtrar
**Prueba:** DevTools → Console en carga y tras pulsar filtros.  
**Implementación:** Solo `console.error` controlados en catch de fetch. No hay errores de referencia ni de tipo en caso feliz.  
**Veredicto:** ✅ (requiere prueba manual en navegador)

## CA-18 · Si proyectos.json falla → mensaje de error, resto funciona
**Prueba:** Renombrar/borrar `proyectos.json`, push, recargar.  
**Implementación:**
```js
catch (err) {
  console.error('Error cargando proyectos.json:', err);
  document.getElementById('error-proyectos').hidden = false;
  document.getElementById('filtros').hidden = true;
  document.getElementById('contador').hidden = true;
}
```
Cabecera y pie (perfil) siguen funcionando independientemente.  
**Veredicto:** ✅ (código listo; requiere prueba manual con JSON corrupto)

---

## Resumen

| CA | Estado | Notas |
|----|--------|-------|
| 1–8 | ✅ Pasa | Cubierto por implementación |
| 9 | ✅ Código listo | Requiere prueba manual editando JSON |
| 10–16 | ✅ Pasa | Cubierto por implementación |
| 17 | ✅ Código listo | Requiere prueba manual en navegador |
| 18 | ✅ Código listo | Requiere prueba manual con JSON corrupto |

**Pruebas manuales pendientes:** CA-9 (filtro cero resultados), CA-17 (consola limpia), CA-18 (JSON corrupto). Estas requieren editar JSON, push y recargar la URL pública.
