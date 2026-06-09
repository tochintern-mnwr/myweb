const body = document.body;
const pageLoader = document.getElementById('pageLoader');
const themeToggle = document.getElementById('themeToggle');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const footerYear = document.getElementById('footerYear');

const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('portfolioTheme', theme);
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(currentTheme);
};

const toggleMobileMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  mobileMenu.setAttribute('aria-expanded', String(isOpen));
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  scrollTopBtn.style.display = window.scrollY > 420 ? 'flex' : 'none';
};

const handleLinkClick = () => {
  if (navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    mobileMenu.setAttribute('aria-expanded', 'false');
  }
};

const initTheme = () => {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
};

const initFooter = () => {
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }
};

const handleContactSubmit = (event) => {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name || !email || !message) {
    formFeedback.textContent = 'Please fill in every field to send your message.';
    formFeedback.style.color = '#f97070';
    return;
  }

  formFeedback.textContent = 'Thanks! I received your message and will respond soon.';
  formFeedback.style.color = '#94ffa9';
  contactForm.reset();
};

const hideLoader = () => {
  if (!pageLoader) return;
  pageLoader.style.opacity = '0';
  pageLoader.style.pointerEvents = 'none';
  setTimeout(() => {
    pageLoader.remove();
    body.classList.remove('page-hidden');
  }, 250);
};

window.addEventListener('DOMContentLoaded', () => {
  body.classList.add('page-hidden');
  initTheme();
  initFooter();
  mobileMenu.addEventListener('click', toggleMobileMenu);
  themeToggle.addEventListener('click', toggleTheme);
  scrollTopBtn.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', handleScroll);
  navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', handleLinkClick));
  contactForm.addEventListener('submit', handleContactSubmit);
});

window.addEventListener('load', hideLoader);
