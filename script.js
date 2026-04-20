

function toggleMobile() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function toggleCategory(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.product-category').forEach(c => c.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}

function scrollToService(n, e) {
  if (e) e.preventDefault();
  const target = document.getElementById('service-' + n);
  if (!target) {
    window.location.href = '/services.html#service-' + n;
    return;
  }
  const offset = 120;
  const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({
    top: elementPosition - offset,
    behavior: 'smooth'
  });
}

const validators = {
  name: (val) => val ? '' : 'Full name is required.',
  company: (val) => val ? '' : 'Company name is required.',
  email: (val) => {
    if (!val) return 'Email address is required.';
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val)) return 'Please enter a valid email address.';
    return '';
  },
  whatsapp: (val) => {
    if (!val) return 'WhatsApp number is required.';
    const clean = val.replace(/[\s\-\(\)]/g, '');
    if (!/^\+?[0-9]{10,15}$/.test(clean)) return 'Please enter a valid WhatsApp number, including country code.';
    return '';
  },
  type: (val) => val ? '' : 'Please select an enquiry type.',
  message: (val) => val ? '' : 'Please provide requirement details.'
};

function validateField(field, isSubmit = false) {
  const input = document.getElementById('f-' + field);
  const err = document.getElementById('err-' + field);
  if (!input || !err) return true;

  const val = input.value.trim();
  const msg = validators[field](val);

  input.classList.remove('error', 'error-shake', 'success');
  err.classList.remove('show');
  err.textContent = '';

  if (msg) {
    if (isSubmit || input.dataset.touched) {
      input.classList.add('error');
      if (isSubmit) {
        void input.offsetWidth; // trigger reflow
        input.classList.add('error-shake');
      }
      err.textContent = msg;
      err.classList.add('show');
    }
    return false;
  } else {
    if (val) {
      input.classList.add('success');
    }
    return true;
  }
}

setTimeout(() => {
  ['name', 'company', 'email', 'whatsapp', 'type', 'message'].forEach(field => {
    const input = document.getElementById('f-' + field);
    if (input) {
      input.addEventListener('blur', () => {
        input.dataset.touched = 'true';
        validateField(field);
      });
      input.addEventListener('input', () => {
        if (input.dataset.touched) validateField(field);
      });
    }
  });
}, 100);

function submitForm() {
  const fields = ['name', 'company', 'email', 'whatsapp', 'type', 'message'];
  let isValid = true;
  let firstErrorField = null;

  fields.forEach(field => {
    if (!validateField(field, true)) {
      isValid = false;
      if (!firstErrorField) firstErrorField = document.getElementById('f-' + field);
    }
  });

  if (!isValid) {
    if (firstErrorField) firstErrorField.focus();
    return;
  }

  // Loading State Simulation
  const btn = document.getElementById('submitBtn');
  btn.classList.add('loading');
  btn.disabled = true;

  setTimeout(() => {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  }, 1500); // 1.5s simulated network delay
}

// Scroll-based nav highlight
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(10,10,18,0.98)';
  } else {
    nav.style.background = 'rgba(10,10,18,0.85)';
  }
});

// ─── CUSTOM CURSOR LOGIC ───
document.addEventListener('DOMContentLoaded', () => {
  // Disable on mobile/touch devices
  if (window.innerWidth <= 768 || 'ontouchstart' in window) return;

  const dot = document.createElement('div');
  dot.classList.add('custom-cursor-dot');
  document.body.appendChild(dot);

  const outline = document.createElement('div');
  outline.classList.add('custom-cursor-outline');
  document.body.appendChild(outline);

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot tracks immediately
      dot.style.transform = `translate3d(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%), 0)`;
  });

  // Smooth trailing animation for the outline
  function animate() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      outline.style.transform = `translate3d(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%), 0)`;
      requestAnimationFrame(animate);
  }
  animate();

  // Expand outline on hover elements
  const interactables = document.querySelectorAll('a, button, input, textarea, select, .hamburger, .source-card, .pillar-card');
  interactables.forEach(el => {
      el.addEventListener('mouseenter', () => outline.classList.add('hover-active'));
      el.addEventListener('mouseleave', () => outline.classList.remove('hover-active'));
  });
});
