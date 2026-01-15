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
  const whatsappNumber = '917566689553'; // Country code + number

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

  // WhatsApp Get Quote buttons for pricing tables
  const quoteButtons = document.querySelectorAll('.get-quote-btn');

  quoteButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const serviceName = this.getAttribute('data-service') || 'Service';
      const planName = this.getAttribute('data-plan') || 'Plan';
      const price = this.getAttribute('data-price') || '';
      const tableId = this.getAttribute('data-table');

      // Collect all features from the table for this plan column
      let featuresList = [];
      const table = document.getElementById(tableId);

      if (table) {
        // Find which column this button is in (td index)
        const buttonCell = this.closest('td');
        const row = this.closest('tr');
        const rowCells = row.querySelectorAll('td');

        // Find column index of the button
        let colIndex = -1;
        rowCells.forEach((cell, idx) => {
          if (cell === buttonCell) {
            colIndex = idx;
          }
        });

        // Get all feature rows (skip category header rows and button row)
        const featureRows = table.querySelectorAll('tbody tr:not(.bg-orange-100):not(.bg-gray-100)');

        featureRows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells.length > 1) {
            const featureName = cells[0].textContent.trim();
            // Get value from the button's column (colIndex)
            if (colIndex > 0 && cells[colIndex]) {
              const featureValue = cells[colIndex].textContent.trim();
              if (featureName && featureValue && featureValue !== '-') {
                featuresList.push(`• ${featureName}: ${featureValue}`);
              }
            }
          }
        });
      }

      // Build the message
      let message = `Hello StreamX24,\n\n`;
      message += `I'm interested in the ${serviceName} - ${planName}.\n\n`;
      message += `📋 Plan Details:\n`;
      if (price) {
        message += `• Price: ${price}\n`;
      }
      if (featuresList.length > 0) {
        message += `${featuresList.join('\n')}\n`;
      }
      message += `\nPlease provide more information.\n\nThank you!`;

      // Encode and redirect
      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      window.open(waUrl, '_blank');
    });
  });
});

