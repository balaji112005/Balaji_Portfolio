// ============================================================
// Balaji S — Portfolio interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- Mobile nav ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- Signal mode toggle (stop -> caution -> go -> stop) ---------- */
const modes = ['stop', 'caution', 'go'];
const signalToggle = document.getElementById('signal-toggle');
const body = document.body;

signalToggle.addEventListener('click', () => {
  const current = modes.indexOf(body.dataset.mode);
  const next = modes[(current + 1) % modes.length];
  body.dataset.mode = next;
  localStorage.setItem('bs-mode', next);
});

const savedMode = localStorage.getItem('bs-mode');
if (savedMode && modes.includes(savedMode)) {
  body.dataset.mode = savedMode;
}

/* ---------- Typing effect ---------- */
const typedEl = document.getElementById('typed');
const phrases = ['ship faster.', 'solve real problems.', 'respond to what matters.', 'just work.'];
let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!deleting) {
    charIndex++;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

/* ---------- Console boot sequence stagger ---------- */
document.querySelectorAll('.console-line').forEach(line => {
  const delay = parseInt(line.dataset.delay, 10) || 0;
  line.style.animationDelay = `${delay}ms`;
});

/* ---------- Scroll reveal for sections ---------- */
const revealTargets = document.querySelectorAll('.section, .project-card, .stat, .skill-category, .cert-card, .log-entry');
revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => observer.observe(el));
