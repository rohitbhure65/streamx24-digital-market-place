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
      const productName = button.getAttribute('data-product') || 'StreamX24 Product';
      const url = buildWhatsAppUrl(productName);
      window.open(url, '_blank');
    });
  });
});


