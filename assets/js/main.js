/* ========================================
   VoyCargo - JavaScript Main
   ======================================== */

// ================================
// PRICING DATA - UPDATED FEB 2026
// ================================
const preciosData = {
  santiago: {
    region: "Santiago (Región Metropolitana)",
    aereo: {
      titulo: "Envíos Aéreos",
      porKilo: [
        { label: "1 hasta 10 kg", price: "$13.990", perKg: true },
        { label: "10 kg hasta 25 kg", price: "$11.990", perKg: true },
        { label: "25 kg en adelante", price: "$10.990", perKg: true }
      ],
      especiales: [
        { label: "Celulares", price: "$15.990", icon: "phone" },
        { label: "Electrónicos", price: "$15.990 c/k", icon: "laptop" },
        { label: "Documentos", price: "$12.990", subtitle: "hasta 250 gr", icon: "doc" },
        { label: "Medicamentos", price: "$12.990", subtitle: "hasta 500 gr", icon: "med" },
        { label: "Televisores", price: "$11.990 c/k", icon: "tv" }
      ]
    },
    maritimo: {
      titulo: "Marítimo Tradicional",
      cajas: [
        { size: "S", dimensions: "30×30×30", price: "$44.990" },
        { size: "M", dimensions: "40×30×30", price: "$54.990" },
        { size: "L", dimensions: "50×30×30", price: "$67.990" },
        { size: "XL", dimensions: "60×40×40", price: "$142.990" },
        { size: "XG", dimensions: "70×40×40", price: "$162.990" },
        { size: "XXL", dimensions: "60×50×50", price: "$225.990" }
      ],
      combos: [
        { combo: "S + S", price: "$85.990", savings: "Ahorra $3.990" },
        { combo: "M + M", price: "$105.990", savings: "Ahorra $3.990" },
        { combo: "L + L", price: "$129.990", savings: "Ahorra $5.990" },
        { combo: "XL + XL", price: "$279.990", savings: "Ahorra $5.990" },
        { combo: "XG + XG", price: "$319.990", savings: "Ahorra $5.990" },
        { combo: "XXL + XXL", price: "$444.990", savings: "Ahorra $6.990" }
      ]
    }
  },
  concepcion: {
    region: "Concepción (Región del Biobío)",
    aereo: {
      titulo: "Envíos Aéreos",
      porKilo: [
        { label: "Cada kilogramo", price: "$15.990", perKg: true }
      ],
      especiales: [
        { label: "Celulares", price: "$18.990", icon: "phone" },
        { label: "Electrónicos", price: "$17.990 c/k", icon: "laptop" },
        { label: "Documentos", price: "$14.990", subtitle: "hasta 250 gr", icon: "doc" },
        { label: "Medicamentos", price: "$12.990", subtitle: "hasta 500 gr", icon: "med" },
        { label: "Televisores", price: "$13.990 c/k", icon: "tv" }
      ]
    },
    maritimo: {
      titulo: "Marítimo Tradicional",
      cajas: [
        { size: "S", dimensions: "30×30×30", price: "$56.990" },
        { size: "M", dimensions: "40×30×30", price: "$66.990" },
        { size: "L", dimensions: "50×30×30", price: "$79.990" },
        { size: "XL", dimensions: "60×40×40", price: "$154.990" },
        { size: "XG", dimensions: "70×40×40", price: "$174.990" },
        { size: "XXL", dimensions: "60×50×50", price: "$237.990" }
      ],
      combos: [
        { combo: "S + S", price: "$104.990", savings: "Ahorra $8.990" },
        { combo: "M + M", price: "$124.990", savings: "Ahorra $8.990" },
        { combo: "L + L", price: "$150.990", savings: "Ahorra $8.990" },
        { combo: "XL + XL", price: "$300.990", savings: "Ahorra $8.990" },
        { combo: "XG + XG", price: "$340.990", savings: "Ahorra $8.990" },
        { combo: "XXL + XXL", price: "$470.990", savings: "Ahorra $4.990" }
      ]
    }
  }
};

// ================================
// DOM READY
// ================================
document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileMenu();
  initPricing();
  initQuoteForm();
  initSmoothScroll();
});

// ================================
// HEADER SCROLL EFFECT
// ================================
function initHeader() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ================================
// MOBILE MENU
// ================================
function initMobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navMobile = document.getElementById('navMobile');
  
  menuToggle.addEventListener('click', function() {
    menuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking links
  const mobileLinks = navMobile.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      navMobile.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });
}

// ================================
// PRICING SECTION - PREMIUM DESIGN
// ================================
function initPricing() {
  const regionBtns = document.querySelectorAll('.region-btn');
  const serviceTypeBtns = document.querySelectorAll('.service-type-btn');
  
  // Initial render
  renderPricing('santiago', 'aereo');
  
  // Region button clicks
  regionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const region = this.dataset.region;
      regionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const activeService = document.querySelector('.service-type-btn.active')?.dataset.service || 'aereo';
      renderPricing(region, activeService);
    });
  });
  
  // Service type button clicks
  serviceTypeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const service = this.dataset.service;
      serviceTypeBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const activeRegion = document.querySelector('.region-btn.active')?.dataset.region || 'santiago';
      renderPricing(activeRegion, service);
    });
  });
}

function getItemIcon(iconType) {
  const icons = {
    phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
    laptop: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>`,
    doc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    med: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    tv: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>`
  };
  return icons[iconType] || '';
}

function renderPricing(regionKey, serviceType) {
  const data = preciosData[regionKey];
  if (!data) return;
  
  const pricingContent = document.getElementById('pricingContent');
  
  if (serviceType === 'aereo') {
    const aereo = data.aereo;
    pricingContent.innerHTML = `
      <div class="pricing-premium-container animate-fade-in">
        <div class="pricing-hero-card">
          <div class="pricing-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 16v-2a4 4 0 0 0-4-4h-2l-3.5-5H8l1.5 5H6L4.5 8H2l1 4-1 4h2.5L6 14h3.5L8 19h3.5l3.5-5h2a4 4 0 0 0 4-4v-2"/>
            </svg>
          </div>
          <h3 class="pricing-hero-title">${aereo.titulo}</h3>
          <p class="pricing-hero-subtitle">${data.region}</p>
          <div class="pricing-hero-badge">Entrega: 3-5 días</div>
        </div>
        
        <div class="pricing-rates-section">
          <h4 class="rates-title">
            <span class="rates-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            Tarifas por Kilogramo
          </h4>
          <div class="rates-grid">
            ${aereo.porKilo.map((item, idx) => `
              <div class="rate-card ${idx === 0 ? 'featured' : ''}" style="animation-delay: ${idx * 0.1}s">
                <span class="rate-label">${item.label}</span>
                <span class="rate-price">${item.price}</span>
                ${item.perKg ? '<span class="rate-unit">por kg</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="pricing-specials-section">
          <h4 class="rates-title">
            <span class="rates-icon special">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </span>
            Envíos Especiales
          </h4>
          <div class="specials-grid">
            ${aereo.especiales.map((item, idx) => `
              <div class="special-card" style="animation-delay: ${idx * 0.08}s">
                <div class="special-icon">${getItemIcon(item.icon)}</div>
                <div class="special-info">
                  <span class="special-label">${item.label}</span>
                  ${item.subtitle ? `<span class="special-subtitle">${item.subtitle}</span>` : ''}
                </div>
                <span class="special-price">${item.price}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else {
    const maritimo = data.maritimo;
    pricingContent.innerHTML = `
      <div class="pricing-premium-container animate-fade-in">
        <div class="pricing-hero-card maritimo">
          <div class="pricing-hero-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M2 20a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6"/>
              <path d="M12 14V4"/>
              <path d="M12 4l4 4"/>
              <path d="M12 4L8 8"/>
            </svg>
          </div>
          <h3 class="pricing-hero-title">${maritimo.titulo}</h3>
          <p class="pricing-hero-subtitle">${data.region}</p>
          <div class="pricing-hero-badge maritimo">Entrega: 15-25 días</div>
        </div>
        
        <div class="pricing-boxes-section">
          <h4 class="rates-title">
            <span class="rates-icon box">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </span>
            Cajas Individuales
          </h4>
          <div class="boxes-grid">
            ${maritimo.cajas.map((item, idx) => `
              <div class="box-card" style="animation-delay: ${idx * 0.08}s">
                <div class="box-size">${item.size}</div>
                <div class="box-dimensions">${item.dimensions}</div>
                <div class="box-price">${item.price}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="pricing-combos-section">
          <h4 class="rates-title">
            <span class="rates-icon promo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            </span>
            Promociones (2 Cajas)
          </h4>
          <div class="combos-grid">
            ${maritimo.combos.map((item, idx) => `
              <div class="combo-card" style="animation-delay: ${idx * 0.08}s">
                <div class="combo-name">${item.combo}</div>
                <div class="combo-price">${item.price}</div>
                <div class="combo-savings">${item.savings}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

// ================================
// QUOTE FORM
// ================================
function initQuoteForm() {
  const form = document.getElementById('quoteForm');
  const serviceType = document.getElementById('serviceType');
  const cargoType = document.getElementById('cargoType');
  
  // Update cargo options based on service type
  serviceType.addEventListener('change', function() {
    updateCargoOptions(this.value);
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    calculateQuote();
  });
}

function updateCargoOptions(service) {
  const cargoType = document.getElementById('cargoType');
  
  let options = '';
  
  if (service === 'aereo') {
    options = `
      <option value="paquete">Paquete General (por kg)</option>
      <option value="celular">Celular</option>
      <option value="electronicos">Electrónicos (por kg)</option>
      <option value="documentos">Documentos (hasta 250 gr)</option>
      <option value="medicamentos">Medicamentos (hasta 500 gr)</option>
      <option value="tv">Televisor (por kg)</option>
    `;
  } else {
    options = `
      <option value="caja_s">Caja S (30×30×30)</option>
      <option value="caja_m">Caja M (40×30×30)</option>
      <option value="caja_l">Caja L (50×30×30)</option>
      <option value="caja_xl">Caja XL (60×40×40)</option>
      <option value="caja_xg">Caja XG (70×40×40)</option>
      <option value="caja_xxl">Caja XXL (60×50×50)</option>
    `;
  }
  
  cargoType.innerHTML = options;
}

function calculateQuote() {
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const service = document.getElementById('serviceType').value;
  const cargo = document.getElementById('cargoType').value;
  
  if (!weight || weight <= 0) {
    alert('Por favor ingresa un peso válido.');
    return;
  }
  
  let price = 0;
  let estimate = '';
  
  // Calculate price based on service and cargo type (Santiago prices)
  if (service === 'aereo') {
    // Base price per kg
    if (weight <= 10) price = 13990;
    else if (weight <= 25) price = 11990;
    else price = 10990;
    
    // Multiply by weight for kg-based items
    if (cargo === 'paquete' || cargo === 'electronicos') {
      price = price * Math.ceil(weight);
    }
    
    // Special items fixed prices
    if (cargo === 'celular') price = 15990;
    if (cargo === 'documentos') price = 12990;
    if (cargo === 'medicamentos') price = 12990;
    if (cargo === 'tv') price = 11990 * Math.ceil(weight);
    
    estimate = '3 a 5 días hábiles';
  }
  
  if (service === 'maritimo') {
    if (cargo === 'caja_s') price = 44990;
    if (cargo === 'caja_m') price = 54990;
    if (cargo === 'caja_l') price = 67990;
    if (cargo === 'caja_xl') price = 142990;
    if (cargo === 'caja_xg') price = 162990;
    if (cargo === 'caja_xxl') price = 225990;
    estimate = '15 a 25 días hábiles';
  }
  
  // Format service name
  const serviceNames = {
    aereo: 'Aéreo Express',
    maritimo: 'Marítimo Tradicional'
  };
  
  // Format cargo name
  const cargoNames = {
    paquete: 'Paquete General',
    documentos: 'Documentos',
    medicamentos: 'Medicamentos',
    electronicos: 'Electrónicos',
    celular: 'Celular',
    tv: 'Televisor',
    caja_s: 'Caja S (30×30×30)',
    caja_m: 'Caja M (40×30×30)',
    caja_l: 'Caja L (50×30×30)',
    caja_xl: 'Caja XL (60×40×40)',
    caja_xg: 'Caja XG (70×40×40)',
    caja_xxl: 'Caja XXL (60×50×50)'
  };
  
  // Display result
  const quoteResult = document.getElementById('quoteResult');
  const quoteText = document.getElementById('quoteText');
  
  quoteText.innerHTML = `
    <p><span>Origen:</span> <strong>${origin}</strong></p>
    <p><span>Destino:</span> <strong>${destination}</strong></p>
    <p><span>Servicio:</span> <strong>${serviceNames[service]}</strong></p>
    <p><span>Tipo de carga:</span> <strong>${cargoNames[cargo] || cargo}</strong></p>
    <p><span>Peso:</span> <strong>${weight} kg</strong></p>
    <p><span>Precio estimado:</span> <span class="price-highlight">$${price.toLocaleString('es-CL')} CLP</span></p>
    <p><span>Entrega estimada:</span> <strong>${estimate}</strong></p>
  `;
  
  quoteResult.classList.remove('hidden');
  
  // Store for WhatsApp
  window.currentQuote = {
    origin,
    destination,
    service: serviceNames[service],
    cargo: cargoNames[cargo] || cargo,
    weight,
    price,
    estimate
  };
}

// ================================
// WHATSAPP INTEGRATION
// ================================
function sendToWhatsApp() {
  const quote = window.currentQuote;
  if (!quote) return;
  
  const message = `Hola 👋, quisiera confirmar la siguiente cotización:

📍 Origen: ${quote.origin}
📍 Destino: ${quote.destination}
📦 Servicio: ${quote.service}
📦 Tipo de carga: ${quote.cargo}
⚖️ Peso: ${quote.weight} kg
💰 Precio estimado: $${quote.price.toLocaleString('es-CL')} CLP
🕐 Entrega estimada: ${quote.estimate}

¿Pueden confirmarme los detalles?`;
  
  const phoneNumber = '56978419619';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ================================
// SMOOTH SCROLL
// ================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ================================
// TRACKING FUNCTIONALITY
// ================================
function trackPackage(e) {
  e.preventDefault();
  
  const trackingNumber = document.getElementById('trackingNumber').value.trim();
  
  if (!trackingNumber) {
    alert('Por favor ingresa un código de rastreo válido.');
    return;
  }
  
  // Create or update result container
  let resultContainer = document.querySelector('.tracking-result');
  if (!resultContainer) {
    resultContainer = document.createElement('div');
    resultContainer.className = 'tracking-result';
    document.querySelector('.tracking-form').after(resultContainer);
  }
  
  // Show loading state
  resultContainer.innerHTML = `
    <h4>Buscando envío...</h4>
    <p>Consultando el estado de tu paquete <strong>${trackingNumber}</strong></p>
  `;
  
  // Simulate tracking lookup (in real implementation, this would call an API)
  setTimeout(() => {
    resultContainer.innerHTML = `
      <h4>Código: ${trackingNumber}</h4>
      <p>Para obtener información detallada sobre tu envío, contáctanos directamente:</p>
      <a href="https://wa.me/56978419619?text=${encodeURIComponent('Hola 👋, quisiera rastrear mi envío con código: ' + trackingNumber)}" target="_blank" class="btn btn-whatsapp" style="margin-top: 12px;">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Consultar por WhatsApp
      </a>
    `;
  }, 1000);
}
