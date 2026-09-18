// Page behavior: nav state, scroll progress, section reveals,
// hero video boot, and the golden-motes canvas over the hero.

document.documentElement.classList.add('js');

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

// ── Hero video ─────────────────────────────────────────────
// Sources are tried in order: a local file in assets/ first,
// then the hosted render. If neither loads, the "glory light"
// layer beneath simply remains — the hero still stands.

const hero = document.getElementById('hero');
const video = document.getElementById('hero-video');

// WCAG 2.2.2: a visible control that stops all hero motion —
// the video, the rotating rays, the bobbing hint, the motes.
let motionPaused = REDUCED;
const motionBtn = document.getElementById('motion-toggle');
// State is carried by the swapped accessible name alone — no
// aria-pressed, which would contradict a name that also changes.
function applyMotionState() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  if (motionBtn) {
    motionBtn.setAttribute('aria-label',
      motionPaused ? 'Play background animation' : 'Pause background animation');
  }
}
applyMotionState();
if (motionBtn) {
  motionBtn.addEventListener('click', () => {
    motionPaused = !motionPaused;
    applyMotionState();
    if (video) {
      if (motionPaused) video.pause();
      else { video.muted = true; video.play().catch(() => {}); }
    }
  });
}

if (video) {
  if (REDUCED) {
    // Respect reduced motion: hold the still first frame.
    video.removeAttribute('autoplay');
    video.addEventListener('loadeddata', () => {
      // Only hold the still frame if the visitor hasn't pressed
      // play in the meantime.
      if (motionPaused) video.pause();
      hero.classList.add('video-live');
    }, { once: true });
    video.load();
  } else {
    video.muted = true;
    const live = () => hero.classList.add('video-live');
    if (video.readyState >= 2) live();
    else video.addEventListener('canplay', live, { once: true });
    video.play().catch(() => { /* glory layer stays */ });
  }
}

// ── Golden motes over the hero ─────────────────────────────

const canvas = document.getElementById('motes');
if (canvas && !REDUCED) {
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, raf = 0;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const N = 56;
  const motes = Array.from({ length: N }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.6 + Math.random() * 1.8,
    s: 0.006 + Math.random() * 0.02,   // rise speed (fraction of height / s)
    drift: (Math.random() - 0.5) * 0.01,
    phase: Math.random() * Math.PI * 2,
    tw: 0.5 + Math.random() * 1.2,     // twinkle speed
    a: 0.3,                            // last drawn alpha
  }));

  // Drawing is separate from physics so a resize can repaint the
  // frozen frame while motion is paused.
  function draw() {
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

  function size() {
    w = hero.clientWidth;
    h = hero.clientHeight;
    canvas.width = w * DPR;
    canvas.height = h * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    draw();
  }
  size();
  window.addEventListener('resize', size);

  let last = performance.now();
  function frame(now) {
    if (motionPaused) {
      last = now;
      raf = requestAnimationFrame(frame);
      return;
    }
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const t = now / 1000;
    for (const m of motes) {
      m.y -= m.s * dt;
      m.x += (m.drift + Math.sin(t * 0.4 + m.phase) * 0.0108) * dt;
      if (m.y < -0.02) { m.y = 1.02; m.x = Math.random(); }
      if (m.x < -0.02) m.x = 1.02;
      if (m.x > 1.02) m.x = -0.02;
      m.a = 0.14 + 0.5 * (0.5 + 0.5 * Math.sin(t * m.tw + m.phase * 3));
    }
    draw();
    raf = requestAnimationFrame(frame);
  }

  // Only animate while the hero is on screen.
  const heroWatch = new IntersectionObserver(([e]) => {
    if (e.isIntersecting && !raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    } else if (!e.isIntersecting && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  });
  heroWatch.observe(hero);
}
