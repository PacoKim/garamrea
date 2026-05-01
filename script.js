/* ========================================
   Script - 가람부동산
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initNavbar();
  initMobileMenu();
  initFAQ();
  initCountUp();
  initFloatingCta();
});

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  reveals.forEach(el => observer.observe(el));
}

/* --- Navbar Scroll Effect --- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navbarInner = navbar.querySelector('.navbar-inner');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbarInner.style.background = 'var(--bg-glass-hover)';
      navbarInner.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
      navbarInner.style.background = 'var(--bg-glass)';
      navbarInner.style.boxShadow = '0 4px 30px rgba(0,0,0,0.08)';
    }
  }, { passive: true });

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  const close = document.getElementById('mobileClose');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  if (close && menu) {
    close.addEventListener('click', () => { closeMobile(); });
  }
}

function closeMobile() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* --- FAQ Accordion --- */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
    });
  });
}

/* --- Count Up Animation --- */
function initCountUp() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'));
          countUp(el, target);
        });
      }
    });
  }, { threshold: 0.3 });
  const statsSection = document.getElementById('stats');
  if (statsSection) observer.observe(statsSection);
}

function countUp(element, target) {
  const duration = 2000;
  const frameDuration = 1000 / 60;
  const totalFrames = Math.round(duration / frameDuration);
  let frame = 0;
  const counter = setInterval(() => {
    frame++;
    const progress = easeOutExpo(frame / totalFrames);
    const current = Math.round(target * progress);
    if (target >= 1000) {
      element.textContent = current.toLocaleString() + '+';
    } else {
      element.textContent = current;
    }
    if (frame === totalFrames) {
      clearInterval(counter);
      if (target >= 1000) {
        element.textContent = target.toLocaleString() + '+';
      } else {
        element.textContent = target;
      }
    }
  }, frameDuration);
}

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

/* --- Floating CTA visibility --- */
function initFloatingCta() {
  const floatingCta = document.getElementById('floatingCta');
  if (!floatingCta) return;
  floatingCta.style.opacity = '0';
  floatingCta.style.transform = 'translateY(20px) scale(0.9)';
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      floatingCta.style.opacity = '1';
      floatingCta.style.transform = 'translateY(0) scale(1)';
      floatingCta.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    } else {
      floatingCta.style.opacity = '0';
      floatingCta.style.transform = 'translateY(20px) scale(0.9)';
    }
  }, { passive: true });
}
