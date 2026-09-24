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
