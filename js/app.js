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

  // Header
  document.getElementById('nombre').textContent = perfil.nombre || defaults.nombre;
  document.getElementById('titular').textContent = perfil.titular || defaults.titular;

  const gh = document.getElementById('github');
  gh.href = perfil.github ? 'https://github.com/' + perfil.github : '#';

  const li = document.getElementById('linkedin');
  li.href = perfil.linkedin || defaults.linkedin;

  const co = document.getElementById('correo');
  co.href = perfil.correo ? 'mailto:' + perfil.correo : defaults.correo;

  // Sobre mí
  document.getElementById('sobre-mi-texto').textContent = perfil.sobreMi || defaults.sobreMi;

  // Footer
  const fGh = document.getElementById('footer-github');
  fGh.href = perfil.github ? 'https://github.com/' + perfil.github : '#';

  const fLi = document.getElementById('footer-linkedin');
  fLi.href = perfil.linkedin || defaults.linkedin;

  const fCo = document.getElementById('footer-correo');
  fCo.href = perfil.correo ? 'mailto:' + perfil.correo : defaults.correo;
})();

// T5 — Carga y renderizado de proyectos
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
    return;
  }

  const contenedor = document.getElementById('lista-proyectos');

  function renderTarjeta(p) {
    const article = document.createElement('article');
    article.className = 'tarjeta';

    if (p.imagen) {
      const img = document.createElement('img');
      img.src = p.imagen;
      img.alt = p.nombre || 'Proyecto';
      img.className = 'tarjeta__imagen';
      img.loading = 'lazy';
      article.appendChild(img);
    }

    const contenido = document.createElement('div');
    contenido.className = 'tarjeta__contenido';

    const titulo = document.createElement('h3');
    titulo.className = 'tarjeta__titulo';
    titulo.textContent = p.nombre;
    contenido.appendChild(titulo);

    const desc = document.createElement('p');
    desc.className = 'tarjeta__descripcion';
    desc.textContent = p.descripcion;
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

  proyectos.forEach(p => {
    contenedor.appendChild(renderTarjeta(p));
  });

  // Guardar para filtros (T6)
  window.__proyectos = proyectos;
  window.__renderTarjeta = renderTarjeta;
})();
