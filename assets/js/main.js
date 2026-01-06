// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.sx-nav-toggle');
  const nav = document.querySelector('.sx-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('sx-nav-open');
    });

    // Close nav on link click (mobile)
    nav.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        nav.classList.remove('sx-nav-open');
      }
    });
  }

  // Dynamic year in footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Limited-time offer countdown timers (supports duration in hours)
  const timerEls = document.querySelectorAll('.sx-offer-timer');

  if (timerEls.length > 0) {
    const updateTimers = () => {
      const now = Date.now();

      timerEls.forEach((el) => {
        // Prefer duration-based timers for simplicity (e.g., 9 hours)
        const durationHoursAttr = el.getAttribute('data-duration-hours');
        let target;

        if (durationHoursAttr) {
          const stored = el.getAttribute('data-target-ts');
          if (stored) {
            target = Number(stored);
          } else {
            const hours = Number(durationHoursAttr) || 0;
            target = now + hours * 60 * 60 * 1000;
            el.setAttribute('data-target-ts', String(target));
          }
        } else {
          const deadlineStr = el.getAttribute('data-deadline');
          if (!deadlineStr) return;
          target = Date.parse(deadlineStr);
          if (Number.isNaN(target)) return;
        }

        let diff = target - now;
        if (diff <= 0) {
          el.textContent = '00d 00h 00m 00s';
          return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / (60 * 60));
        const minutes = Math.floor((totalSeconds / 60) % 60);
        const seconds = totalSeconds % 60;

        const pad = (n) => String(n).padStart(2, '0');
        el.textContent = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
      });
    };

    updateTimers();
    setInterval(updateTimers, 1000);
  }

  // WhatsApp Buy Now buttons
  const buyButtons = document.querySelectorAll('.sx-buy-btn');
  const whatsappNumber = '918839178090'; // Country code + number

  const buildWhatsAppUrl = (productName) => {
    const base = 'https://wa.me/';
    const message = `Hi, I want to buy the product: "${productName}" from StreamX24. Please share the payment details.`;
    const encodedMessage = encodeURIComponent(message);
    return `${base}${whatsappNumber}?text=${encodedMessage}`;
  };

  buyButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const productName =
        button.getAttribute('data-product') || 'StreamX24 Product';
      const url = buildWhatsAppUrl(productName);
      window.open(url, '_blank');
    });
  });
});





