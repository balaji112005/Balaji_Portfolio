/* ==========================================================================
   Balaji S Portfolio - Master Interactive Script (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initThemeSwitcher();
  initMobileMenu();
  initParticleCanvas();
  initTypingEngine();
  initFormHandling();
  initBackToTop();
});

/* ==========================================
   1. SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================
   2. THEME SWITCHER
   ========================================== */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const storedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = storedTheme || 'dark';
  
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(themeBtn, initialTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(themeBtn, newTheme);
  });
}

function updateThemeIcon(button, theme) {
  const icon = button.querySelector('i');
  if (!icon) return;
  
  if (theme === 'dark') {
    icon.className = 'fa-solid fa-sun';
  } else {
    icon.className = 'fa-solid fa-moon';
  }
}

/* ==========================================
   3. MOBILE NAVIGATION MENU
   ========================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });
}

/* ==========================================
   4. PARTICLE CANVAS BACKGROUND (FIXED ID)
   ========================================== */
function initParticleCanvas() {
  // Corrected ID matching the HTML element: "particles-canvas"
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    createParticles();
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(30, 41, 59, 0.3)';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < Math.min(count, 70); i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark 
            ? `rgba(255, 255, 255, ${0.12 - distance / 1000})`
            : `rgba(99, 102, 241, ${0.15 - distance / 800})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();
}

/* ==========================================
   5. TYPING TEXT ENGINE
   ========================================== */
function initTypingEngine() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Software Developer',
    'Java Programmer',
    'Full-Stack Enthusiast',
    'IT Student'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextStepDelay = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
      nextStepDelay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      nextStepDelay = 500;
    }

    setTimeout(type, nextStepDelay);
  }

  type();
}

/* ==========================================
   6. FORM HANDLING
   ========================================== */
function initFormHandling() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
    form.reset();
  });
}

/* ==========================================
   7. BACK TO TOP BUTTON
   ========================================== */
function initBackToTop() {
  const backBtn = document.getElementById('back-to-top');
  if (!backBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backBtn.style.display = 'block';
    } else {
      backBtn.style.display = 'none';
    }
  });

  backBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
