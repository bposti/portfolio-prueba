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
    // Ocultar filtros y contador para no confundir
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

  // Extraer tecnologías únicas y ordenar alfabéticamente
  const tecnologiasSet = new Set();
  proyectos.forEach(p => {
    if (Array.isArray(p.tecnologias)) {
      p.tecnologias.forEach(t => tecnologiasSet.add(t));
    }
  });
  const tecnologias = ['Todas', ...Array.from(tecnologiasSet).sort()];

  let filtroActivo = 'Todas';

  function renderTarjeta(p) {
    const article = document.createElement('article');
    article.className = 'tarjeta';

    if (p.imagen) {
      const img = document.createElement('img');
      img.src = p.imagen;
      img.alt = (p.nombre || 'Proyecto') + (p.descripcion ? ' — ' + p.descripcion.slice(0, 80) : '');
      img.className = 'tarjeta__imagen';
      img.loading = 'lazy';
      article.appendChild(img);
    }

    const contenido = document.createElement('div');
    contenido.className = 'tarjeta__contenido';

    const titulo = document.createElement('h3');
    titulo.className = 'tarjeta__titulo';
    titulo.textContent = p.nombre || 'Proyecto sin nombre';
    contenido.appendChild(titulo);

    const desc = document.createElement('p');
    desc.className = 'tarjeta__descripcion';
    desc.textContent = p.descripcion || '';
    contenido.appendChild(desc);

    if (Array.isArray(p.tecnologias) && p.tecnologias.length) {
      const chips = document.createElement('div');
      chips.className = 'tarjeta__chips';
      p.tecnologias.forEach(t => {
        const chip = document.createElement('span');
        chip.className = 'chip';
        chip.textContent = t;
        chips.appendChild(chip);
      });
      contenido.appendChild(chips);
    }

    const enlace = document.createElement('a');
    enlace.className = 'tarjeta__enlace';
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

    filtrados.forEach(p => contenedor.appendChild(renderTarjeta(p)));

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

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    return btn;
  }

  tecnologias.forEach(tec => {
    filtrosNav.appendChild(crearBotonFiltro(tec));
  });

  renderProyectos('Todas');
})();
