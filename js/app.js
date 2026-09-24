// Portfolio v3 — js/app.js
// Historias: H2(Perfil), H3(Proyectos), H4(Filtro), H7(Sobre mí), H8(Certificaciones),
//            H9(Contacto), H10(Pie), H11(OG), H13(Robustez), H15(Actividad GitHub)

// ---------- Utilidades ----------
const svgIcons = {
  mail: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
  github: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>',
  linkedin: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>',
  file: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  external: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
  copy: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  clock: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  alert: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  dash: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>'
};

function fmtDateMMYYYY(iso) {
  if (!iso || typeof iso !== 'string') return '';
  const [y, m] = iso.split('-');
  if (!y || !m) return '';
  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const mi = parseInt(m, 10) - 1;
  if (mi < 0 || mi > 11) return '';
  return `${meses[mi]} ${y}`;
}

function fmtDateDDMMYYYY(iso) {
  if (!iso || typeof iso !== 'string') return '';
  const d = new Date(iso + 'T00:00:00');
  if (isNaN(d)) return '';
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function parseBold(text) {
  return escapeHtml(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
}

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('HTTP ' + res.status);
  return res.json();
}

// ---------- H2: Perfil ----------
(async function initPerfil() {
  let perfil = {};
  try {
    perfil = await fetchJson('./perfil.json');
  } catch (err) {
    console.error('Error cargando perfil.json:', err);
  }

  const defaults = {
    nombre: 'Portfolio',
    titular: 'Desarrollador',
    claim: '',
    intro: '',
    sobreMi: '',
    disponibilidad: null,
    foto: null,
    cv: null,
    acento: 'violeta',
    ahora: [],
    stack: {},
    actualizado: '',
    correo: '',
    github: '',
    linkedin: '',
    specUrl: 'spec.md'
  };

  const p = { ...defaults, ...perfil };

  // Acento
  const validAcentos = ['violeta','azul','verde','naranja','rosa','amarillo'];
  const acento = validAcentos.includes(p.acento) ? p.acento : 'violeta';
  document.documentElement.setAttribute('data-acento', acento);

  // OG meta (JS actualiza para scrapers que ejecutan JS)
  const h1Text = p.claim || p.titular || defaults.titular;
  document.title = `${p.nombre || defaults.nombre} · ${h1Text}`;
  const desc = p.intro || (p.sobreMi ? p.sobreMi.split('\n\n')[0] : '');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', desc);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', desc);

  // Barra
  const brandName = document.getElementById('brand-name');
  if (brandName) brandName.textContent = p.nombre || defaults.nombre;

  const brandImg = document.getElementById('brand-img');
  if (brandImg) {
    if (p.foto) {
      brandImg.src = p.foto;
      brandImg.hidden = false;
      brandImg.removeAttribute('hidden');
    }
  }

  const pillTop = document.getElementById('pill-top');
  if (pillTop) {
    const pillText = pillTop.querySelector('.pill__text');
    if (p.disponibilidad) {
      if (pillText) pillText.textContent = p.disponibilidad;
      pillTop.hidden = false;
      pillTop.removeAttribute('hidden');
    }
  }

  const btnCorreoTop = document.getElementById('btn-correo-top');
  if (btnCorreoTop && p.correo) {
    btnCorreoTop.href = 'mailto:' + p.correo;
  }

  // Scroll observer para barra (D9)
  const hero = document.querySelector('.hero');
  if (hero && brandImg && pillTop) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const isVisible = entry.isIntersecting;
        brandImg.classList.toggle('is-off', isVisible);
        pillTop.classList.toggle('is-off', isVisible);
      });
    }, { threshold: 0.1 });
    observer.observe(hero);
  }

  // Hero
  const avatar = document.getElementById('avatar');
  if (avatar) {
    if (p.foto) {
      avatar.src = p.foto;
      avatar.alt = 'Foto de ' + (p.nombre || '');
      avatar.hidden = false;
      avatar.removeAttribute('hidden');
    }
  }

  const pillHero = document.getElementById('pill-hero');
  if (pillHero) {
    const pillText = pillHero.querySelector('.pill__text');
    if (p.disponibilidad) {
      if (pillText) pillText.textContent = p.disponibilidad;
      pillHero.hidden = false;
      pillHero.removeAttribute('hidden');
    }
  }

  const claim = document.getElementById('claim');
  if (claim) claim.textContent = p.claim || p.titular || defaults.titular;

  const intro = document.getElementById('intro');
  if (intro) {
    const introText = p.intro || (p.sobreMi ? p.sobreMi.split('\n\n')[0] : '');
    intro.textContent = introText;
  }

  // Acciones del hero
  const acciones = document.getElementById('acciones');
  if (acciones) {
    const actions = [];
    if (p.correo) {
      actions.push({ href: 'mailto:' + p.correo, text: 'Correo', icon: svgIcons.mail });
    }
    if (p.github) {
      actions.push({ href: 'https://github.com/' + p.github, text: 'GitHub', icon: svgIcons.github });
    }
    if (p.linkedin) {
      actions.push({ href: p.linkedin, text: 'LinkedIn', icon: svgIcons.linkedin });
    }
    if (p.cv) {
      actions.push({ href: p.cv, text: 'CV', icon: svgIcons.file });
    }
    acciones.innerHTML = actions.map(a =>
      `<a class="btn${a.text === 'Correo' ? ' btn--primary' : ''}" href="${escapeHtml(a.href)}"${a.text !== 'Correo' ? ' target="_blank" rel="noopener"' : ''}>${a.icon ? '<span style="display:inline-flex;width:16px;height:16px;flex:none">' + a.icon + '</span>' : ''}${escapeHtml(a.text)}</a>`
    ).join('');
  }

  // Guardar perfil global para otras secciones
  window.__perfil = p;

  // Disparar evento para que otras secciones esperen
  window.dispatchEvent(new Event('perfil-loaded'));
})();

// ---------- H3 + H4: Proyectos + Filtro ----------
(async function initProyectos() {
  // Esperar a que perfil esté disponible (para posibles dependencias)
  await new Promise(r => {
    if (window.__perfil) return r();
    window.addEventListener('perfil-loaded', r, { once: true });
  });

  let proyectos = [];
  try {
    proyectos = await fetchJson('./proyectos.json');
    if (!Array.isArray(proyectos)) throw new Error('proyectos.json no es un array');
  } catch (err) {
    console.error('Error cargando proyectos.json:', err);
    document.getElementById('error-proyectos')?.removeAttribute('hidden');
    document.querySelector('.filters-row')?.setAttribute('hidden', '');
    return;
  }

  const destacados = [];
  const resto = [];
  let destacadoCount = 0;
  for (const p of proyectos) {
    if (p.destacado && destacadoCount < 2) {
      destacados.push(p);
      destacadoCount++;
    } else {
      resto.push(p);
    }
  }

  const contenedorDestacados = document.getElementById('destacados');
  const contenedorGrid = document.getElementById('lista');
  const masLabel = document.getElementById('mas-label');

  function renderMarco(p) {
    if (p.imagen) {
      return `<div class="marco__inner"><img src="${escapeHtml(p.imagen)}" alt="Captura de ${escapeHtml(p.nombre || 'proyecto')}" loading="lazy"></div>`;
    }
    if (p.snippet) {
      const code = escapeHtml(p.snippet.code);
      return `<div class="marco__inner"><div class="terminal"><div class="terminal__bar"><i></i><i></i><i></i></div><pre>${code.replace(/\n/g, '<br>')}</pre></div></div>`;
    }
    return `<div class="marco__inner"><div class="fallback"><strong>${escapeHtml(p.nombre || 'Proyecto')}</strong><span>${escapeHtml(p.fecha || '')}</span></div></div>`;
  }

  function renderLinks(p) {
    const links = [];
    links.push({ href: p.repo, text: 'Código', icon: svgIcons.external });
    if (p.url) {
      links.push({ href: p.url, text: 'Demo', icon: svgIcons.external });
    }
    return `<div class="links">${links.map(l =>
      `<a class="link" href="${escapeHtml(l.href)}" target="_blank" rel="noopener">${l.text}${l.icon ? '<span style="display:inline-flex;width:14px;height:14px;flex:none">' + l.icon + '</span>' : ''}</a>`
    ).join('')}</div>`;
  }

  function renderFeatured(p) {
    const desc = p.descripcion || p.resumen || '';
    const chips = (p.tecnologias || []).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
    return `<article class="featured">
      <a class="marco-link" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">
        <div class="marco">${renderMarco(p)}</div>
      </a>
      <div class="featured__meta">
        <div>
          <p class="meta-line">${escapeHtml(p.fecha || '')}</p>
          <h3>${escapeHtml(p.nombre || '')}</h3>
          <p class="desc">${parseBold(desc)}</p>
          <div class="chips">${chips}</div>
          ${renderLinks(p)}
        </div>
      </div>
    </article>`;
  }

  function renderCard(p) {
    const desc = p.resumen || p.descripcion || '';
    const chips = (p.tecnologias || []).map(t => `<span class="chip">${escapeHtml(t)}</span>`).join('');
    return `<article class="card">
      <a class="marco-link" href="${escapeHtml(p.repo)}" target="_blank" rel="noopener">
        <div class="marco">${renderMarco(p)}</div>
      </a>
      <h3>${escapeHtml(p.nombre || '')}</h3>
      <p class="meta-line">${escapeHtml(p.fecha || '')}</p>
      <p class="resumen">${parseBold(desc)}</p>
      <div class="chips">${chips}</div>
      ${renderLinks(p)}
    </article>`;
  }

  if (contenedorDestacados) {
    contenedorDestacados.innerHTML = destacados.map(renderFeatured).join('');
  }
  if (resto.length > 0 && masLabel) {
    masLabel.removeAttribute('hidden');
  }
  if (contenedorGrid) {
    contenedorGrid.innerHTML = resto.map(renderCard).join('');
  }

  // Filtros (H4)
  const tecnologiasSet = new Set();
  proyectos.forEach(p => {
    if (Array.isArray(p.tecnologias)) {
      p.tecnologias.forEach(t => tecnologiasSet.add(t));
    }
  });
  const tecnologias = ['Todas', ...Array.from(tecnologiasSet).sort()];

  const filtrosNav = document.getElementById('filtros');
  const contador = document.getElementById('contador');
  const vacio = document.getElementById('vacio');
  let filtroActivo = 'Todas';

  function renderFiltros() {
    if (!filtrosNav) return;
    filtrosNav.innerHTML = tecnologias.map(tec => {
      const isActive = tec === filtroActivo;
      return `<li><button class="filter" type="button" aria-pressed="${isActive ? 'true' : 'false'}">${escapeHtml(tec)}</button></li>`;
    }).join('');

    filtrosNav.querySelectorAll('.filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const tec = btn.textContent;
        if (tec === filtroActivo) return;
        filtroActivo = tec;
        renderFiltros();
        applyFilter();
      });
    });
  }

  function applyFilter() {
    const filtrados = filtroActivo === 'Todas'
      ? proyectos
      : proyectos.filter(p => Array.isArray(p.tecnologias) && p.tecnologias.includes(filtroActivo));

    const filtradosDestacados = [];
    const filtradosResto = [];
    let fc = 0;
    for (const p of filtrados) {
      if (p.destacado && fc < 2) { filtradosDestacados.push(p); fc++; }
      else { filtradosResto.push(p); }
    }

    if (contenedorDestacados) {
      contenedorDestacados.innerHTML = filtradosDestacados.map(renderFeatured).join('');
      contenedorDestacados.style.display = filtradosDestacados.length ? '' : 'none';
    }
    if (contenedorGrid) {
      contenedorGrid.innerHTML = filtradosResto.map(renderCard).join('');
    }
    if (masLabel) {
      masLabel.hidden = filtradosResto.length === 0;
    }
    if (contador) {
      contador.textContent = filtrados.length + ' proyecto' + (filtrados.length !== 1 ? 's' : '');
    }
    if (vacio) {
      vacio.hidden = filtrados.length > 0;
    }
  }

  renderFiltros();
  applyFilter();
})();

// ---------- H7: Sobre mí ----------
(async function initSobreMi() {
  await new Promise(r => {
    if (window.__perfil) return r();
    window.addEventListener('perfil-loaded', r, { once: true });
  });
  const p = window.__perfil || {};

  const sobreTexto = document.getElementById('sobre-texto');
  if (sobreTexto && p.sobreMi) {
    const parrafos = p.sobreMi.split(/\n\n+/).filter(Boolean);
    sobreTexto.innerHTML = parrafos.map(txt => `<p>${parseBold(txt)}</p>`).join('');
  }

  const ahoraWrap = document.getElementById('ahora-wrap');
  const ahoraList = document.getElementById('ahora');
  if (ahoraWrap && ahoraList) {
    const items = (p.ahora || []).slice(0, 3);
    if (items.length === 0) {
      ahoraWrap.hidden = true;
    } else {
      ahoraList.innerHTML = items.map(item => `<li>${escapeHtml(item)}</li>`).join('');
    }
  }

  const stackWrap = document.getElementById('stack-wrap');
  const stackDiv = document.getElementById('stack');
  if (stackWrap && stackDiv) {
    const stack = p.stack || {};
    const grupos = Object.entries(stack).filter(([, arr]) => Array.isArray(arr) && arr.length > 0);
    if (grupos.length === 0) {
      stackWrap.hidden = true;
    } else {
      stackDiv.innerHTML = grupos.map(([grupo, arr]) =>
        `<div class="stack-row"><span class="label">${escapeHtml(grupo)}</span><span>${arr.map(s => `<span class="chip">${escapeHtml(s)}</span>`).join(' ')}</span></div>`
      ).join('');
    }
  }
})();

// ---------- H15 + H16: Actividad GitHub ----------
(async function initActividad() {
  await new Promise(r => {
    if (window.__perfil) return r();
    window.addEventListener('perfil-loaded', r, { once: true });
  });
  const p = window.__perfil || {};
  const heat = document.getElementById('heat');
  const heatTotal = document.getElementById('heat-total');
  const actividadVacio = document.getElementById('actividad-vacio');

  if (!p.github) {
    if (actividadVacio) {
      actividadVacio.textContent = 'No hay usuario de GitHub configurado.';
      actividadVacio.removeAttribute('hidden');
    }
    if (heat) heat.style.display = 'none';
    return;
  }

  let data;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(p.github)}?y=last`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    data = await res.json();
  } catch (err) {
    console.error('Error cargando actividad GitHub:', err);
    if (actividadVacio) {
      actividadVacio.textContent = 'No se ha podido cargar la actividad de GitHub.';
      actividadVacio.removeAttribute('hidden');
    }
    if (heat) heat.style.display = 'none';
    return;
  }

  const contributions = data.contributions || [];
  if (contributions.length === 0) {
    if (actividadVacio) {
      actividadVacio.textContent = 'No hay contribuciones en los últimos 3 meses.';
      actividadVacio.removeAttribute('hidden');
    }
    if (heat) heat.style.display = 'none';
    return;
  }

  // Filtrar últimos 91 días
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const noventaYDiasAtras = new Date(hoy);
  noventaYDiasAtras.setDate(hoy.getDate() - 90);

  const filtrados = contributions.filter(c => {
    const d = new Date(c.date + 'T00:00:00');
    return d >= noventaYDiasAtras && d <= hoy;
  });

  // Agrupar por semana (lunes a domingo)
  const semanas = [];
  let semanaActual = [];
  const diaSemana = (d) => (d.getDay() + 6) % 7; // 0=lunes, 6=domingo

  // Encontrar el lunes de la semana del primer día
  let primerDia = filtrados.length > 0 ? new Date(filtrados[0].date + 'T00:00:00') : new Date();
  const offset = diaSemana(primerDia);
  const lunesInicial = new Date(primerDia);
  lunesInicial.setDate(primerDia.getDate() - offset);

  // Generar 13 semanas
  for (let s = 0; s < 13; s++) {
    const semana = [];
    for (let d = 0; d < 7; d++) {
      const fecha = new Date(lunesInicial);
      fecha.setDate(lunesInicial.getDate() + s * 7 + d);
      const fechaStr = fecha.toISOString().split('T')[0];
      const contrib = filtrados.find(c => c.date === fechaStr);
      const count = contrib ? contrib.count : 0;
      const level = contrib ? contrib.level : 0;
      const isFuture = fecha > hoy;
      semana.push({ date: fechaStr, count, level, isFuture });
    }
    semanas.push(semana);
  }

  if (heat) {
    heat.innerHTML = semanas.map((semana, si) =>
      `<div class="col" role="group" aria-label="Semana ${si + 1}">` +
      semana.map(dia => {
        const clase = dia.isFuture ? 'future' : (dia.level > 0 ? `l${dia.level}` : '');
        const label = `${dia.date}: ${dia.count} contribucion${dia.count !== 1 ? 'es' : ''}`;
        return `<div class="cell ${clase}" aria-label="${escapeHtml(label)}"></div>`;
      }).join('') +
      `</div>`
    ).join('');
  }

  const total = filtrados.reduce((sum, c) => sum + c.count, 0);
  if (heatTotal) {
    heatTotal.textContent = `${total} contribucion${total !== 1 ? 'es' : ''} en los últimos 3 meses`;
  }
})();

// ---------- H8: Certificaciones ----------
(async function initCertificaciones() {
  let certs = [];
  try {
    certs = await fetchJson('./certificaciones.json');
    if (!Array.isArray(certs)) throw new Error('certificaciones.json no es un array');
  } catch (err) {
    console.error('Error cargando certificaciones.json:', err);
    document.getElementById('certificaciones-error')?.removeAttribute('hidden');
    return;
  }

  if (certs.length === 0) {
    document.getElementById('certificaciones-vacio')?.removeAttribute('hidden');
    return;
  }

  // Ordenar por obtenida descendente
  certs.sort((a, b) => {
    const da = new Date((a.obtenida || '') + 'T00:00:00');
    const db = new Date((b.obtenida || '') + 'T00:00:00');
    return db - da;
  });

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  function calcEstado(cert) {
    if (cert.caduca === null || cert.caduca === undefined) {
      return { texto: 'Sin caducidad', clase: 'badge--none', icon: svgIcons.clock };
    }
    const caduca = new Date(cert.caduca + 'T00:00:00');
    caduca.setHours(0, 0, 0, 0);
    const diffMs = caduca - hoy;
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias < 0) {
      return { texto: 'Caducada', clase: 'badge--bad', icon: svgIcons.alert };
    }
    if (diffDias <= 60) {
      return { texto: 'Caduca pronto', clase: 'badge--warn', icon: svgIcons.clock };
    }
    return { texto: 'Vigente', clase: 'badge--ok', icon: svgIcons.check };
  }

  const contenedor = document.getElementById('certs');
  if (contenedor) {
    contenedor.innerHTML = certs.map(cert => {
      const estado = calcEstado(cert);
      const nombre = cert.url
        ? `<a href="${escapeHtml(cert.url)}" target="_blank" rel="noopener">${escapeHtml(cert.nombre)}</a>`
        : escapeHtml(cert.nombre);
      const caducaTexto = cert.caduca ? ` · Caduca: ${fmtDateDDMMYYYY(cert.caduca)}` : '';
      const expiredClass = estado.clase === 'badge--bad' ? ' cert--expired' : '';
      return `<li class="cert${expiredClass}">
        <div>
          <p class="cert__name">${nombre}</p>
          <p class="cert__meta">${escapeHtml(cert.entidad || '')} · Obtenida: ${fmtDateDDMMYYYY(cert.obtenida)}</p>
        </div>
        <span class="badge ${estado.clase}">${estado.icon ? '<span style="display:inline-flex;width:14px;height:14px;flex:none">' + estado.icon + '</span>' : ''}${estado.texto}${caducaTexto}</span>
      </li>`;
    }).join('');
  }
})();

// ---------- H9: Contacto ----------
(async function initContacto() {
  await new Promise(r => {
    if (window.__perfil) return r();
    window.addEventListener('perfil-loaded', r, { once: true });
  });
  const p = window.__perfil || {};

  const email = document.getElementById('email');
  if (email) {
    email.textContent = p.correo || '';
    email.href = p.correo ? 'mailto:' + p.correo : '#';
  }

  const copiarBtn = document.getElementById('copiar');
  const copiado = document.getElementById('copiado');
  if (copiarBtn && p.correo) {
    copiarBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(p.correo);
        if (copiado) copiado.textContent = 'Copiado ✓';
      } catch (err) {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = p.correo;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        if (copiado) copiado.textContent = 'Copiado ✓';
      }
    });
  }

  const acciones2 = document.getElementById('acciones-2');
  if (acciones2) {
    const actions = [];
    if (p.github) {
      actions.push({ href: 'https://github.com/' + p.github, text: 'GitHub', icon: svgIcons.github });
    }
    if (p.linkedin) {
      actions.push({ href: p.linkedin, text: 'LinkedIn', icon: svgIcons.linkedin });
    }
    acciones2.innerHTML = actions.map(a =>
      `<a class="btn" href="${escapeHtml(a.href)}" target="_blank" rel="noopener">${a.icon ? '<span style="display:inline-flex;width:16px;height:16px;flex:none">' + a.icon + '</span>' : ''}${escapeHtml(a.text)}</a>`
    ).join('');
  }
})();

// ---------- H10: Pie ----------
(async function initPie() {
  await new Promise(r => {
    if (window.__perfil) return r();
    window.addEventListener('perfil-loaded', r, { once: true });
  });
  const p = window.__perfil || {};

  const specLink = document.getElementById('spec-link');
  if (specLink) {
    specLink.href = p.specUrl || 'spec.md';
  }

  const actualizado = document.getElementById('actualizado');
  if (actualizado && p.actualizado) {
    actualizado.textContent = 'Actualizado en ' + fmtDateMMYYYY(p.actualizado);
  }
})();

// ---------- H13: Robustez adicional ----------
// prefers-reduced-motion ya manejado en CSS
// Acento por defecto ya manejado en initPerfil
