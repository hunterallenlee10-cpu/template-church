// Page behavior: nav state, scroll progress, section reveals,
// and the still golden motes painted over the hero.

document.documentElement.classList.add('js');

const nav = document.getElementById('nav');
const bar = document.getElementById('progress-bar');

function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Mobile menu ────────────────────────────────────────────

const navToggle = document.getElementById('nav-toggle');
if (navToggle) {
  const setMenu = open => {
    nav.classList.toggle('menu-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    // The menu sits before the toggle in the DOM, so hand focus
    // to its first link on open — Tab then walks the menu.
    if (open) {
      const first = document.querySelector('.nav-links a');
      if (first) first.focus();
    }
  };
  navToggle.addEventListener('click', () =>
    setMenu(!nav.classList.contains('menu-open')));
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('menu-open')) {
      setMenu(false);
      navToggle.focus();
    }
  });
}

const observer = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('shown');
      observer.unobserve(e.target);
    }
  }
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Safety net: if the observer never fires (odd embed contexts,
// anchor landings), everything is visible within a few seconds.
setTimeout(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('shown'));
}, 4000);

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// ── Golden motes over the hero ─────────────────────────────
// Painted once (and again on resize) — the hero is fully still.

const hero = document.getElementById('hero');
const canvas = document.getElementById('motes');
if (canvas && hero) {
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const motes = Array.from({ length: 56 }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.6 + Math.random() * 1.8,
    a: 0.14 + Math.random() * 0.5,
  }));

  function paint() {
    const w = hero.clientWidth;
    const h = hero.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, w, h);
    for (const m of motes) {
      const g = ctx.createRadialGradient(m.x * w, m.y * h, 0, m.x * w, m.y * h, m.r * 4);
      g.addColorStop(0, `rgba(255, 216, 138, ${m.a})`);
      g.addColorStop(1, 'rgba(255, 216, 138, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(m.x * w, m.y * h, m.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  paint();
  window.addEventListener('resize', paint);
}
