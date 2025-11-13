// Mobile nav toggle, smooth scroll, and simple contact behavior
document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navlinks = document.getElementById('navlinks');

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navlinks.style.display === 'flex') {
        navlinks.style.display = 'none';
      } else {
        navlinks.style.display = 'flex';
        navlinks.style.flexDirection = 'column';
        navlinks.style.gap = '12px';
        navlinks.style.position = 'absolute';
        navlinks.style.right = '10px';
        navlinks.style.top = '48px';
        navlinks.style.background = 'rgba(15,20,28,0.95)';
        navlinks.style.padding = '10px';
        navlinks.style.borderRadius = '8px';
      }
    });
  }

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
        // hide mobile nav after clicking
        if (window.innerWidth < 720 && navlinks) navlinks.style.display = 'none';
      }
    });
  });

  // Contact form handling with Formspree
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('.contact-submit');
      const formData = new FormData(form);

      // Replace the URL below with your Formspree form endpoint (e.g. https://formspree.io/f/yourFormID)
      const endpoint = 'https://formspree.io/f/yourFormID';

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });

        if (res.ok) {
          alert('Thanks! Your message was sent.');
          form.reset();
        } else {
          const data = await res.json();
          alert(data.error || 'Oops — there was a problem sending your message.');
        }
      } catch (err) {
        alert('Network error. Please try again later.');
      }

      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit';
    });
  }

  // image fade-in for project images
  document.querySelectorAll('.proj img').forEach(img => {
    img.style.opacity = '0';
    img.onload = () => { img.style.transition = 'opacity .6s'; img.style.opacity = '1'; }
    if (img.complete) img.style.opacity = '1';
  });
});
