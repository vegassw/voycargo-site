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
  initTracking();
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
          <div class="pricing-hero-badge">Entrega: 8-12 días</div>
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
          <div class="pricing-hero-badge maritimo">Entrega: 45-60 días</div>
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
    
    estimate = '8 a 12 días hábiles';
  }
  
  if (service === 'maritimo') {
    if (cargo === 'caja_s') price = 44990;
    if (cargo === 'caja_m') price = 54990;
    if (cargo === 'caja_l') price = 67990;
    if (cargo === 'caja_xl') price = 142990;
    if (cargo === 'caja_xg') price = 162990;
    if (cargo === 'caja_xxl') price = 225990;
    estimate = '45 a 60 días hábiles';
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
// TRACKING FUNCTIONALITY - REAL API
// ================================
const TRACKING_API_URL = 'https://voycargo-api-1099445735275.southamerica-east1.run.app/api/public/track';

// Initialize tracking on page load
function initTracking() {
  // Check for query param ?orden=
  const urlParams = new URLSearchParams(window.location.search);
  const ordenParam = urlParams.get('orden');
  
  if (ordenParam) {
    const input = document.getElementById('trackingNumber');
    input.value = ordenParam;
    // Auto-execute search
    trackPackage(new Event('submit'));
  }
  
  // Allow Enter key to submit
  document.getElementById('trackingNumber').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      trackPackage(e);
    }
  });
}

// Normalize order number: "13" -> "VOY00013", "voy13" -> "VOY13"
function normalizeOrderNumber(input) {
  let normalized = input.trim().toUpperCase();
  
  // If only digits, prefix with VOY and pad
  if (/^\d+$/.test(normalized)) {
    normalized = 'VOY' + normalized.padStart(5, '0');
  }
  
  // If doesn't start with VOY, add it
  if (!normalized.startsWith('VOY')) {
    normalized = 'VOY' + normalized;
  }
  
  return normalized;
}

// Format date to Chilean locale
function formatDateCL(isoString) {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Format relative time (e.g., "hace 2 horas")
function formatRelativeTime(isoString) {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'hace un momento';
  if (diffMins < 60) return `hace ${diffMins} minuto${diffMins > 1 ? 's' : ''}`;
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
  if (diffDays < 30) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
  return formatDateCL(isoString);
}

// Set loading state
function setTrackingLoading(isLoading) {
  const btn = document.getElementById('trackingBtn');
  const icon = btn.querySelector('.btn-icon');
  const spinner = btn.querySelector('.btn-spinner');
  const text = btn.querySelector('.btn-text');
  const input = document.getElementById('trackingNumber');
  
  if (isLoading) {
    btn.disabled = true;
    input.disabled = true;
    icon.classList.add('hidden');
    spinner.classList.remove('hidden');
    text.textContent = 'Buscando...';
  } else {
    btn.disabled = false;
    input.disabled = false;
    icon.classList.remove('hidden');
    spinner.classList.add('hidden');
    text.textContent = 'Rastrear';
  }
}

// Render timeline
function renderTimeline(history) {
  if (!history || history.length === 0) {
    return `
      <div class="timeline-empty">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
        <p>Tu envío está en preparación. Pronto verás más actualizaciones aquí.</p>
      </div>
    `;
  }
  
  // Sort chronologically (oldest first, newest last)
  const sorted = [...history].sort((a, b) => new Date(a.changed_at) - new Date(b.changed_at));
  
  const items = sorted.map((item, index) => {
    const isLast = index === sorted.length - 1;
    const delay = index * 80;
    
    return `
      <div class="timeline-item ${isLast ? 'timeline-item-current' : ''}" style="animation-delay: ${delay}ms">
        <div class="timeline-marker" style="background-color: ${item.state_color}"></div>
        <div class="timeline-content">
          <h4 class="timeline-state">${item.state_name}</h4>
          <span class="timeline-date">${formatDateCL(item.changed_at)}</span>
          ${item.observation ? `<p class="timeline-observation">"${item.observation}"</p>` : ''}
        </div>
      </div>
    `;
  }).join('');
  
  return `<div class="tracking-timeline">${items}</div>`;
}

// Render tracking result card
function renderTrackingResult(data) {
  const { order_number, current_state, history } = data;
  
  return `
    <div class="tracking-card animate-card">
      <button class="tracking-card-close" onclick="clearTrackingResult()" aria-label="Cerrar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      
      <div class="tracking-card-header">
        <span class="tracking-card-label">N° DE ORDEN</span>
        <h3 class="tracking-card-number">${order_number}</h3>
        <div class="tracking-card-badge" style="background-color: ${current_state.color}">
          ${current_state.name}
        </div>
        <span class="tracking-card-updated">Última actualización ${formatRelativeTime(current_state.since)}</span>
      </div>
      
      <div class="tracking-card-body">
        <h4 class="tracking-card-timeline-title">Historial de seguimiento</h4>
        ${renderTimeline(history)}
      </div>
      
      <div class="tracking-card-footer">
        <button class="btn btn-outline" onclick="clearTrackingResult()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          Buscar otra orden
        </button>
      </div>
    </div>
  `;
}

// Render error message
function renderTrackingError(type, orderNumber) {
  const errors = {
    notFound: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M15 9l-6 6M9 9l6 6"/>
            </svg>`,
      title: 'Orden no encontrada',
      message: `No encontramos la orden <strong>${orderNumber}</strong>. Verifica el número e intenta nuevamente.`
    },
    network: {
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>`,
      title: 'Error de conexión',
      message: 'No pudimos contactar al servidor. Reintenta en unos segundos.'
    }
  };
  
  const error = errors[type];
  
  return `
    <div class="tracking-error animate-card">
      <div class="tracking-error-icon ${type}">${error.icon}</div>
      <h4 class="tracking-error-title">${error.title}</h4>
      <p class="tracking-error-message">${error.message}</p>
      <button class="btn btn-primary" onclick="clearTrackingResult()">
        Intentar de nuevo
      </button>
    </div>
  `;
}

// Clear tracking result
function clearTrackingResult() {
  const resultContainer = document.getElementById('trackingResult');
  resultContainer.innerHTML = '';
  resultContainer.classList.remove('active');
  document.getElementById('trackingNumber').value = '';
  document.getElementById('trackingNumber').focus();
  
  // Clear URL param
  const url = new URL(window.location);
  url.searchParams.delete('orden');
  window.history.replaceState({}, '', url);
}

// Main tracking function
async function trackPackage(e) {
  e.preventDefault();
  
  const input = document.getElementById('trackingNumber');
  const rawValue = input.value.trim();
  
  if (!rawValue) {
    input.focus();
    return;
  }
  
  const orderNumber = normalizeOrderNumber(rawValue);
  input.value = orderNumber; // Update input with normalized value
  
  const resultContainer = document.getElementById('trackingResult');
  
  // Update URL with order param
  const url = new URL(window.location);
  url.searchParams.set('orden', orderNumber);
  window.history.replaceState({}, '', url);
  
  // Set loading state
  setTrackingLoading(true);
  resultContainer.innerHTML = `
    <div class="tracking-loading">
      <div class="tracking-loading-spinner"></div>
      <p>Buscando orden <strong>${orderNumber}</strong>...</p>
    </div>
  `;
  resultContainer.classList.add('active');
  
  try {
    const response = await fetch(`${TRACKING_API_URL}/${orderNumber}`);
    
    if (response.status === 404) {
      resultContainer.innerHTML = renderTrackingError('notFound', orderNumber);
      return;
    }
    
    if (!response.ok) {
      throw new Error('Server error');
    }
    
    const data = await response.json();
    resultContainer.innerHTML = renderTrackingResult(data);
    
    // Scroll to result
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
  } catch (error) {
    console.error('Tracking error:', error);
    resultContainer.innerHTML = renderTrackingError('network', orderNumber);
  } finally {
    setTrackingLoading(false);
  }
}
