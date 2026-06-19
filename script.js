const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const year = document.getElementById('year');
const form = document.getElementById('contact-form');
const message = document.getElementById('form-message');

if (year) year.textContent = new Date().getFullYear();

menuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name')?.toString().trim();

  if (!name) {
    message.textContent = 'Please enter your name.';
    return;
  }

  message.textContent = `Thanks ${name}! Your message has been received.`;
  form.reset();
});
