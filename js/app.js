// T4 — Carga y renderizado de perfil
(async function initPerfil() {
  const defaults = {
    nombre: 'Portfolio',
    titular: 'Desarrollador',
    sobreMi: '',
    correo: '#',
    github: '',
    linkedin: '#'
  };

  let perfil;
  try {
    const res = await fetch('perfil.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    perfil = await res.json();
  } catch (err) {
    console.error('Error cargando perfil.json:', err);
    perfil = defaults;
  }

  document.getElementById('nombre').textContent = perfil.nombre || defaults.nombre;
  document.getElementById('titular').textContent = perfil.titular || defaults.titular;

  const gh = document.getElementById('github');
  gh.href = perfil.github ? 'https://github.com/' + perfil.github : '#';

  const li = document.getElementById('linkedin');
  li.href = perfil.linkedin || defaults.linkedin;

  const co = document.getElementById('correo');
  co.href = perfil.correo ? 'mailto:' + perfil.correo : defaults.correo;

  document.getElementById('sobre-mi-texto').textContent = perfil.sobreMi || defaults.sobreMi;

  const fGh = document.getElementById('footer-github');
  fGh.href = perfil.github ? 'https://github.com/' + perfil.github : '#';

  const fLi = document.getElementById('footer-linkedin');
  fLi.href = perfil.linkedin || defaults.linkedin;

  const fCo = document.getElementById('footer-correo');
  fCo.href = perfil.correo ? 'mailto:' + perfil.correo : defaults.correo;
})();

// T5 + T6 + T8 — Carga de proyectos, renderizado, filtros y errores
(async function initProyectos() {
  let proyectos = [];
  try {
    const res = await fetch('proyectos.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    proyectos = await res.json();
    if (!Array.isArray(proyectos)) throw new Error('proyectos.json no es un array');
  } catch (err) {
    console.error('Error cargando proyectos.json:', err);
    document.getElementById('error-proyectos').hidden = false;
    document.getElementById('filtros').hidden = true;
    document.getElementById('contador').hidden = true;
    return;
  }

  if (proyectos.length === 0) {
    document.getElementById('sin-resultados').textContent = 'No hay proyectos todavía';
    document.getElementById('sin-resultados').hidden = false;
    document.getElementById('filtros').hidden = true;
    document.getElementById('contador').hidden = true;
    return;
  }

  const contenedor = document.getElementById('lista-proyectos');
  const filtrosNav = document.getElementById('filtros');
  const contador = document.getElementById('contador');
  const sinResultados = document.getElementById('sin-resultados');

  const tecnologiasSet = new Set();
  proyectos.forEach(p => {
    if (Array.isArray(p.tecnologias)) {
      p.tecnologias.forEach(t => tecnologiasSet.add(t));
    }
  });
  const tecnologias = ['Todas', ...Array.from(tecnologiasSet).sort()];

  let filtroActivo = 'Todas';

  function renderFila(p) {
    const article = document.createElement('article');
    article.className = 'fila-proyecto';

    if (p.imagen) {
      const img = document.createElement('img');
      img.src = p.imagen;
      img.alt = (p.nombre || 'Proyecto') + (p.descripcion ? ' — ' + p.descripcion.slice(0, 80) : '');
      img.className = 'fila-proyecto__imagen';
      img.loading = 'lazy';
      article.appendChild(img);
    }

    const contenido = document.createElement('div');
    contenido.className = 'fila-proyecto__contenido';

    const titulo = document.createElement('h3');
    titulo.className = 'fila-proyecto__titulo';
    titulo.textContent = p.nombre || 'Proyecto sin nombre';
    contenido.appendChild(titulo);

    const desc = document.createElement('p');
    desc.className = 'fila-proyecto__descripcion';
    desc.textContent = p.descripcion || '';
    contenido.appendChild(desc);

    if (Array.isArray(p.tecnologias) && p.tecnologias.length) {
      const chips = document.createElement('div');
      chips.className = 'fila-proyecto__chips';
      p.tecnologias.forEach(t => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = t;
        chips.appendChild(chip);
      });
      contenido.appendChild(chips);
    }

    const enlace = document.createElement('a');
    enlace.className = 'fila-proyecto__enlace';
    enlace.href = p.url || p.repo || '#';
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.textContent = 'Ver proyecto ↗';
    contenido.appendChild(enlace);

    article.appendChild(contenido);
    return article;
  }

  function renderProyectos(filtro) {
    contenedor.innerHTML = '';
    const filtrados = filtro === 'Todas'
      ? proyectos
      : proyectos.filter(p => Array.isArray(p.tecnologias) && p.tecnologias.includes(filtro));

    filtrados.forEach(p => contenedor.appendChild(renderFila(p)));

    contador.textContent = filtrados.length + ' proyecto' + (filtrados.length !== 1 ? 's' : '');
    sinResultados.hidden = filtrados.length > 0;
  }

  function crearBotonFiltro(tec) {
    const btn = document.createElement('button');
    btn.className = 'filtro';
    btn.textContent = tec;
    btn.setAttribute('aria-pressed', tec === filtroActivo ? 'true' : 'false');
    btn.type = 'button';

    btn.addEventListener('click', () => {
      if (filtroActivo === tec) return;
      filtroActivo = tec;
      filtrosNav.querySelectorAll('.filtro').forEach(b => {
        b.setAttribute('aria-pressed', b.textContent === filtroActivo ? 'true' : 'false');
      });
      renderProyectos(filtroActivo);
    });

    return btn;
  }

  tecnologias.forEach(tec => {
    filtrosNav.appendChild(crearBotonFiltro(tec));
  });

  renderProyectos('Todas');
})();

// T14 + T15 — Carga, renderizado, estados y errores de certificaciones
(async function initCertificaciones() {
  let certificaciones = [];
  const contenedor = document.getElementById('certificaciones-contenedor');
  const errorMsg = document.getElementById('certificaciones-error');
  const vacioMsg = document.getElementById('certificaciones-vacio');

  try {
    const res = await fetch('certificaciones.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    certificaciones = await res.json();
    if (!Array.isArray(certificaciones)) throw new Error('certificaciones.json no es un array');
  } catch (err) {
    console.error('Error cargando certificaciones.json:', err);
    errorMsg.hidden = false;
    contenedor.innerHTML = '';
    return;
  }

  if (certificaciones.length === 0) {
    vacioMsg.hidden = false;
    contenedor.innerHTML = '';
    return;
  }

  function formatearFecha(fechaStr) {
    if (!fechaStr) return null;
    const d = new Date(fechaStr + 'T00:00:00');
    if (isNaN(d)) return null;
    return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function calcularEstado(cert) {
    if (cert.caduca === null) {
      return { estado: 'Sin caducidad', clase: 'cert-card--sin-caducidad' };
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const caduca = new Date(cert.caduca + 'T00:00:00');
    caduca.setHours(0, 0, 0, 0);

    const diffMs = caduca - hoy;
    const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDias < 0) {
      return { estado: 'Caducada', clase: 'cert-card--caducada' };
    }
    if (diffDias <= 60) {
      return { estado: 'Caduca pronto', clase: 'cert-card--pronto' };
    }
    return { estado: 'Vigente', clase: 'cert-card--vigente' };
  }

  certificaciones.sort((a, b) => {
    const da = new Date(a.obtenida + 'T00:00:00');
    const db = new Date(b.obtenida + 'T00:00:00');
    return db - da;
  });

  certificaciones.forEach(cert => {
    const card = document.createElement('article');
    const { estado, clase } = calcularEstado(cert);
    card.className = 'cert-card ' + clase;

    const nombre = document.createElement('div');
    nombre.className = 'cert-card__nombre';
    if (cert.url) {
      const a = document.createElement('a');
      a.href = cert.url;
      a.target = '_blank';
      a.rel = 'noopener';
      a.textContent = cert.nombre;
      nombre.appendChild(a);
    } else {
      nombre.textContent = cert.nombre;
    }
    card.appendChild(nombre);

    const entidad = document.createElement('div');
    entidad.className = 'cert-card__entidad';
    entidad.textContent = cert.entidad;
    card.appendChild(entidad);

    const fechaObtenida = document.createElement('div');
    fechaObtenida.className = 'cert-card__fecha';
    fechaObtenida.textContent = 'Obtenida: ' + formatearFecha(cert.obtenida);
    card.appendChild(fechaObtenida);

    const estadoEl = document.createElement('div');
    estadoEl.className = 'cert-card__estado';
    let estadoTexto = estado;
    if (cert.caduca !== null) {
      estadoTexto += ' · Caduca: ' + formatearFecha(cert.caduca);
    }
    estadoEl.textContent = estadoTexto;
    card.appendChild(estadoEl);

    contenedor.appendChild(card);
  });
})();
