/**
 * Conner Martin — Cybersecurity Portfolio
 * js/main.js
 *
 * Features:
 *  1. Sticky navbar — adds "scrolled" class on scroll
 *  2. Mobile nav toggle (hamburger)
 *  3. Smooth-scroll active link highlighting
 *  4. Intersection Observer — reveal animations on scroll
 *  5. Hero canvas — particle / matrix-style background
 *  6. Typing animation — hero subtitle
 *  7. Contact form — client-side validation + submission feedback
 *  8. Footer year — auto-updates copyright year
 */

'use strict';

/* ===================================================================
   1. NAVBAR — Scroll behaviour & mobile toggle
   =================================================================== */

(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (!navbar) return;

  // Add "scrolled" class once the user scrolls past 20px
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = y;
  }, { passive: true });

  // Mobile hamburger toggle
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }
})();

/* ===================================================================
   2. INTERSECTION OBSERVER — Reveal on scroll
   =================================================================== */

(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal, .section-label');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Unobserve once revealed to save memory
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealEls.forEach((el) => observer.observe(el));
})();

/* ===================================================================
   3. HERO CANVAS — Particle grid / matrix network animation
   =================================================================== */

(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  // Skip heavy animation for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ctx = canvas.getContext('2d');

  // Particle configuration
  const CONFIG = {
    particleCount: 80,
    maxDistance:   130,     // px — max distance to draw a connecting line
    speed:         0.4,     // base movement speed
    particleSize:  1.5,
    colorPrimary:  'rgba(0, 212, 255,',  // --color-blue
    colorSecondary:'rgba(0, 255, 136,',  // --color-green
  };

  let particles = [];
  let animationId;
  let W, H;

  // Resize canvas to match viewport
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  // Create a single particle with random position and velocity
  function createParticle() {
    const isGreen = Math.random() < 0.25; // 25% green particles
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * CONFIG.speed,
      vy:    (Math.random() - 0.5) * CONFIG.speed,
      size:  Math.random() * CONFIG.particleSize + 0.5,
      color: isGreen ? CONFIG.colorSecondary : CONFIG.colorPrimary,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CONFIG.particleCount }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update + draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0)  p.x = W;
      if (p.x > W)  p.x = 0;
      if (p.y < 0)  p.y = H;
      if (p.y > H)  p.y = 0;

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.7)';
      ctx.fill();

      // Draw connections to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q   = particles[j];
        const dx  = p.x - q.x;
        const dy  = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.maxDistance) {
          // Opacity fades as particles get farther apart
          const alpha = (1 - dist / CONFIG.maxDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = p.color + alpha + ')';
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  // Debounced resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      cancelAnimationFrame(animationId);
      init();
      draw();
    }, 150);
  });

  init();
  draw();
})();

/* ===================================================================
   4. TYPING ANIMATION — Hero subtitle typewriter effect
   =================================================================== */

(function initTyping() {
  const el = document.getElementById('typingText');
  if (!el) return;

  // Skip for reduced-motion users — just show first phrase
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = 'Cybersecurity Student & Aspiring Security Professional';
    return;
  }

  const phrases = [
    'Cybersecurity Student & Aspiring Security Professional',
    'Network Security Enthusiast',
    'Penetration Testing Learner',
    'Defender of Digital Infrastructure',
    'Foundation-First Developer',
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPE_SPEED   = 60;   // ms per character (typing)
  const DELETE_SPEED = 30;   // ms per character (deleting)
  const PAUSE_AFTER  = 2200; // ms to pause when phrase is complete
  const PAUSE_BEFORE = 400;  // ms to pause before typing next phrase

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) return;

    if (!isDeleting) {
      // Typing forward
      el.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        // Phrase complete — pause, then start deleting
        isPaused = true;
        setTimeout(() => {
          isPaused    = false;
          isDeleting  = true;
          scheduleNext();
        }, PAUSE_AFTER);
        return;
      }
    } else {
      // Deleting
      el.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Phrase deleted — move to next
        isDeleting   = false;
        phraseIndex  = (phraseIndex + 1) % phrases.length;
        isPaused     = true;
        setTimeout(() => {
          isPaused = false;
          scheduleNext();
        }, PAUSE_BEFORE);
        return;
      }
    }

    scheduleNext();
  }

  function scheduleNext() {
    const delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    setTimeout(type, delay);
  }

  // Start after a short initial delay (hero fade-in is already in progress)
  setTimeout(type, 900);
})();

/* ===================================================================
   5. ACTIVE NAV LINK HIGHLIGHTING — based on scroll position
   =================================================================== */

(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === '#' + id) {
              link.classList.add('active');
              link.style.color = 'var(--color-white)';
            } else {
              link.classList.remove('active');
              link.style.color = '';
            }
          });
        }
      });
    },
    {
      rootMargin: '-40% 0px -55% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
})();

/* ===================================================================
   6. CONTACT FORM — Client-side validation and submission feedback
   =================================================================== */

(function initContactForm() {
  const form       = document.getElementById('contactForm');
  const submitBtn  = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  // Helper: show an inline error for a field
  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input)  input.classList.add('error');
    if (error)  error.textContent = message;
  }

  // Helper: clear error for a field
  function clearError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input)  input.classList.remove('error');
    if (error)  error.textContent = '';
  }

  // Clear errors on input
  ['contactName', 'contactEmail', 'contactMessage'].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const errorEl = document.getElementById(id.replace('contact', '').toLowerCase() + 'Error');
      if (errorEl) errorEl.textContent = '';
    });
  });

  // Validate email format
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    clearError('contactName',    'nameError');
    clearError('contactEmail',   'emailError');
    clearError('contactMessage', 'messageError');

    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let isValid = true;

    if (!name) {
      showError('contactName', 'nameError', 'Please enter your name.');
      isValid = false;
    }

    if (!email) {
      showError('contactEmail', 'emailError', 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError('contactEmail', 'emailError', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message) {
      showError('contactMessage', 'messageError', 'Please enter a message.');
      isValid = false;
    }

    if (!isValid) return;

    // Disable button during "submission"
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    /*
     * TO CONNECT TO A BACKEND:
     *   Option A — Formspree: set form action="https://formspree.io/f/YOUR_ID" method="POST"
     *              and remove this JS handler.
     *   Option B — Fetch API:
     *     fetch('https://formspree.io/f/YOUR_ID', {
     *       method: 'POST',
     *       headers: { 'Accept': 'application/json' },
     *       body: new FormData(form),
     *     }).then(r => r.json()).then(...).catch(...);
     *
     * For now, simulate a short network delay and show success.
     */
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Message';
      form.reset();
      if (successMsg) {
        successMsg.removeAttribute('hidden');
        setTimeout(() => successMsg.setAttribute('hidden', ''), 6000);
      }
    }, 1200);
  });
})();

/* ===================================================================
   7. FOOTER — Auto-update copyright year
   =================================================================== */

(function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();
