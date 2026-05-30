// ─── MOBILE NAV TOGGLE ───
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ─── CONTACT FORM (Formspree) ───
async function sendMessage() {
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('submitBtn');

  // Validate required fields
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  if (!name || !email) {
    alert('Please fill in your name and email.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;
  btn.style.opacity = '0.7';

  try {
    const response = await fetch('https://formspree.io/f/xpqnbekv', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#00c48c';
      btn.style.boxShadow = '0 0 25px rgba(0,196,140,0.3)';
      btn.style.opacity = '1';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message →';
        btn.style.background = '';
        btn.style.boxShadow = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Failed');
    }
  } catch (err) {
    btn.textContent = 'Failed — Try Again';
    btn.style.background = '#e53e3e';
    btn.style.opacity = '1';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
    }, 3000);
  }
}

// ─── SKILL BAR ANIMATION ON SCROLL ───
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-level-fill').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = width; }, 100);
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('#skills').forEach(s => skillObserver.observe(s));

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) {
      current = s.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--white)' : '';
  });
});
