/* ==========================================================================
   Balaji S Portfolio - Master Interactive Script (script.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initScrollProgress();
  initThemeSwitcher();
  initParticleCanvas();
  initTypingEngine();
  initFormHandling();
});

/* ==========================================
   1. SCROLL PROGRESS BAR
   ========================================== */
function initScrollProgress() {
  // Create progress element if it doesn't exist in HTML
  let progressBar = document.getElementById('scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    Object.assign(progressBar.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      height: '4px',
      width: '0%',
      backgroundColor: 'var(--primary-accent, #6366f1)',
      zIndex: '9999',
      transition: 'width 0.1s ease-out'
    });
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const progress = (window.scrollY / totalHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

/* ==========================================
   2. THEME SWITCHER (Light / Dark)
   ========================================== */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('portfolio-theme');

  // Apply saved theme or default to system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', initialTheme);
  updateThemeIcon(themeBtn, initialTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
      updateThemeIcon(themeBtn, newTheme);
    });
  }
}

function updateThemeIcon(button, theme) {
  if (!button) return;
  button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  button.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
}

/* ==========================================
   3. PARTICLE CANVAS BACKGROUND
   ========================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrameId;

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
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(30, 41, 59, 0.2)';
      ctx.fill();
    }
  }

  function createParticles() {
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 15000); // Responsive density
    for (let i = 0; i < Math.min(count, 80); i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw particles and connection lines
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
            ? `rgba(255, 255, 255, ${0.15 - distance / 800})`
            : `rgba(99, 102, 241, ${0.12 - distance / 1000})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  resizeCanvas();
  createParticles();
  animate();
}

/* ==========================================
   4. TYPING TEXT ENGINE
   ========================================== */
function initTypingEngine() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const roles = [
    'Full-Stack Developer',
    'UI/UX Enthusiast',
    'Problem Solver',
    'Open Source Contributor'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeSpeed = 100;
  const deleteSpeed = 50;
  const delayNext = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextStepDelay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      nextStepDelay = delayNext;
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
   5. FORM HANDLING & VALIDATION
   ========================================== */
function initFormHandling() {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    // Basic Validation
    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate Form Submission (Replace with API endpoint like Formspree/EmailJS if needed)
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    showStatus('Sending message...', 'info');

    setTimeout(() => {
      showStatus('Thank you, Balaji S will get back to you soon!', 'success');
      form.reset();
      if (submitBtn) submitBtn.disabled = false;
    }, 1500);
  });

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `status-message ${type}`;
    formStatus.style.marginTop = '12px';
    formStatus.style.fontWeight = '500';
    
    if (type === 'error') formStatus.style.color = '#ef4444';
    else if (type === 'success') formStatus.style.color = '#10b981';
    else formStatus.style.color = 'var(--text-muted)';
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
