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

  // ----- Product grid rendered from JS array -----
  const productGrid = document.getElementById('product-grid');

  const products = [
    {
      tag: 'Full-Stack',
      name: 'Full-Stack eCommerce Starter Kit',
      price: '₹11,999',
      description:
        'Full-Stack Application – deploy a complete store in hours, not weeks.',
      detailsUrl: 'full-stack-starter-kit.html',
      buttonStyle: 'primary',
      dataProduct: 'Full-Stack eCommerce Starter Kit',
    },
    {
      tag: 'Plugin',
      name: 'Adsense Eligibility Checker – WordPress Plugin',
      price: '₹50',
      description:
        'A lightweight WordPress plugin that checks whether your website meets basic Google AdSense eligibility requirements.',
      detailsUrl: 'adsense-eligibility-checker.html',
      buttonStyle: 'primary',
      dataProduct: 'Adsense Eligibility Checker – WordPress Plugin',
    },
  ];

  if (productGrid) {
    productGrid.innerHTML = products
      .map((product) => {
        const buyBtnClass =
          product.buttonStyle === 'primary'
            ? 'sx-btn sx-btn-primary'
            : 'sx-btn sx-btn-secondary';

        return `
      <article class="sx-product-card">
        <div class="sx-product-tag">${product.tag}</div>

        <h3 class="sx-product-name">
          <a href="${product.detailsUrl}">
            ${product.name}
          </a>
        </h3>

        <p class="sx-product-desc">
          ${product.description}
        </p>

        <div class="sx-product-meta">
          <span class="sx-price">${product.price}</span>
          <div style="display: flex; gap: 0.5rem;">
          <a
            href="${product.detailsUrl}"
            class="sx-btn sx-btn-ghost"
            aria-label="View details for ${product.name}"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M12 5C7 5 3.3 8.1 2 12c1.3 3.9 5 7 10 7s8.7-3.1 10-7c-1.3-3.9-5-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"
              />
              <circle cx="12" cy="12" r="2.3" />
            </svg>
          </a>
          <button
            class="${buyBtnClass} sx-buy-btn"
            data-product="${product.dataProduct}"
            aria-label="Buy ${product.name} now"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M7 4h-.8a1 1 0 0 0 0 2H8l1.1 8.2A2.5 2.5 0 0 0 11.6 16h6.2a1 1 0 0 0 0-2h-6.2l-.2-1.5h7.2a1.5 1.5 0 0 0 1.4-1.1l1-4A1 1 0 0 0 20 6H9.2L9 4.8A1.5 1.5 0 0 0 7.5 4H7z"
              />
              <circle cx="10" cy="19" r="1.4" />
              <circle cx="17" cy="19" r="1.4" />
            </svg>
          </button>
          </div>
        </div>
      </article>
    `;
      })
      .join('');
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





