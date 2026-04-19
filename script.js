

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

    function submitForm() {
      const fields = ['name', 'company', 'email', 'whatsapp', 'type', 'message'];
      let isValid = true;

      // Reset errors
      fields.forEach(field => {
        const input = document.getElementById('f-' + field);
        const err = document.getElementById('err-' + field);
        if(input) input.classList.remove('error');
        if(err) {
          err.classList.remove('show');
          err.textContent = '';
        }
      });

      const showError = (field, msg) => {
        isValid = false;
        const input = document.getElementById('f-' + field);
        const err = document.getElementById('err-' + field);
        if(input) input.classList.add('error');
        if(err) {
          err.textContent = msg;
          err.classList.add('show');
        }
      };

      const name = document.getElementById('f-name').value.trim();
      if (!name) showError('name', 'Full name is required.');

      const company = document.getElementById('f-company').value.trim();
      if (!company) showError('company', 'Company name is required.');

      const email = document.getElementById('f-email').value.trim();
      if (!email) {
        showError('email', 'Email address is required.');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'Please enter a valid email deal.');
      }

      const whatsapp = document.getElementById('f-whatsapp').value.trim();
      if (!whatsapp) {
        showError('whatsapp', 'WhatsApp number is required.');
      } else if (whatsapp.length < 10) {
        showError('whatsapp', 'Please enter a valid phone number.');
      }

      const type = document.getElementById('f-type').value.trim();
      if (!type) showError('type', 'Please select an enquiry type.');

      const message = document.getElementById('f-message').value.trim();
      if (!message) showError('message', 'Please provide requirement details.');

      if (!isValid) return;

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
