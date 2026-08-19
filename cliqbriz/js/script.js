/**
 * CliqBriz - Modern Performance Tracking Platform Script (Light Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar shrink effect on scroll
  const navbar = document.querySelector('.navbar-custom');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  });

  // 2. Intersection Observer for Scroll Fade-in-up Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -30px 0px"
  };

  const fadeElements = document.querySelectorAll('.fade-in-up');
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => scrollObserver.observe(el));

  // 3. Contact Form Submission (Client-Side Feedback Only)
  const contactForm = document.getElementById('cliqbrizContactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactForm.checkValidity()) {
        contactForm.classList.add('d-none');
        if (formSuccessMessage) {
          formSuccessMessage.classList.remove('d-none');
        }
      } else {
        contactForm.classList.add('was-validated');
      }
    });
  }

  // 4. Initializing Chart.js for Light SaaS Preview
  const chartCanvas = document.getElementById('previewPerformanceChart');
  if (chartCanvas && typeof Chart !== 'undefined') {
    const ctx = chartCanvas.getContext('2d');
    
    // Light-mode cyan-blue soft fill
    const gradient = ctx.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(2, 132, 199, 0.25)');
    gradient.addColorStop(1, 'rgba(2, 132, 199, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
        datasets: [
          {
            label: 'Clicks (k)',
            data: [12.4, 18.2, 45.1, 84.6, 92.3, 110.8, 128.4],
            borderColor: '#0284c7',
            backgroundColor: gradient,
            fill: true,
            tension: 0.35,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: '#0284c7'
          },
          {
            label: 'Conversions',
            data: [1.2, 1.9, 4.8, 9.1, 9.8, 12.1, 14.2],
            borderColor: '#2563eb',
            backgroundColor: 'transparent',
            tension: 0.35,
            borderWidth: 2,
            pointRadius: 3,
            pointBackgroundColor: '#2563eb'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#475569',
              font: { family: 'Plus Jakarta Sans', size: 12, weight: '600' }
            }
          },
          tooltip: {
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            borderWidth: 1,
            titleColor: '#0f172a',
            bodyColor: '#475569',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(226, 232, 240, 0.8)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(226, 232, 240, 0.8)' },
            ticks: { color: '#64748b' }
          }
        }
      }
    });
  }
});
