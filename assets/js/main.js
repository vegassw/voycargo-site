/* ========================================
   VoyCargo - JavaScript Main
   ======================================== */

// ================================
// PRICING DATA
// ================================
const preciosData = {
  metropolitana: {
    region: "la Región Metropolitana",
    tarifas: [
      {
        icon: "air",
        emoji: "✈️",
        titulo: "Aéreo",
        items: [
          { label: "1 kg a 10 kg (por kilo)", price: "$14.990" },
          { label: "10 kg a 25 kg (por kilo)", price: "$12.990" },
          { label: "25 kg o más (por kilo)", price: "$11.990" },
          { label: "Electrónico", price: "$18.000" },
          { label: "Teléfono", price: "$18.990 + imp." },
          { label: "Documentos", price: "$12.990" },
          { label: "Medicamento", price: "$12.990" }
        ]
      },
      {
        icon: "sea",
        emoji: "🚢",
        titulo: "Marítimo",
        items: [
          { label: "Caja M (40x30x30)", price: "$58.500" },
          { label: "Caja L (50x30x30)", price: "$72.000" },
          { label: "Caja XL (60x40x40)", price: "$153.000" },
          { label: "Caja XXL (60x50x50)", price: "$238.500" },
          { label: "Caja BOX (78x40x40)", price: "$258.000" }
        ]
      },
      {
        icon: "express",
        emoji: "⚡",
        titulo: "Marítimo Express",
        items: [
          { label: "Caja S (30x30x30, 3.5 kg)", price: "$48.965" },
          { label: "Caja M (40x30x30, 5 kg)", price: "$95.000" },
          { label: "Caja L (50x30x30, 10 kg)", price: "$135.000" },
          { label: "Caja XL (60x40x40, 15 kg)", price: "$195.000" },
          { label: "Caja XXL (60x50x50, 20 kg)", price: "$260.000" }
        ]
      }
    ],
    combos: [
      { label: "M + M", price: "$99.990" },
      { label: "L + L", price: "$127.000" },
      { label: "XL + XL", price: "$280.000" },
      { label: "XG + XG", price: "$399.990" },
      { label: "XXL + XXL", price: "$455.000" }
    ]
  },
  concepcion: {
    region: "la Región del Biobío (Concepción)",
    tarifas: [
      {
        icon: "air",
        emoji: "✈️",
        titulo: "Aéreo",
        items: [
          { label: "1 kg a 25 kg (por kilo)", price: "$16.990" },
          { label: "Más de 25 kg (por kilo)", price: "$14.990" },
          { label: "Documentos", price: "$16.990" },
          { label: "Electrónicos", price: "$18.990" },
          { label: "Celular", price: "$24.990" }
        ]
      },
      {
        icon: "sea",
        emoji: "🚢",
        titulo: "Marítimo Convencional",
        items: [
          { label: "Caja M (40x30x30)", price: "$76.000" },
          { label: "Caja L (50x30x30)", price: "$89.990" },
          { label: "Caja XL (60x40x40)", price: "$169.990" },
          { label: "Caja XG (70x40x40)", price: "$213.925" },
          { label: "Caja XXL (60x50x50)", price: "$253.000" }
        ]
      }
    ],
    combos: [
      { label: "M + M", price: "$114.000" },
      { label: "L + L", price: "$142.000" },
      { label: "XL + XL", price: "$295.000" },
      { label: "XG + XG", price: "$414.990" },
      { label: "XXL + XXL", price: "$470.000" }
    ]
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
// PRICING SECTION
// ================================
function initPricing() {
  const regionBtns = document.querySelectorAll('.region-btn');
  
  // Initial render
  renderPricing('metropolitana');
  
  // Region button clicks
  regionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const region = this.dataset.region;
      
      // Update active button
      regionBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Render new pricing
      renderPricing(region);
    });
  });
}

function renderPricing(regionKey) {
  const data = preciosData[regionKey];
  if (!data) return;
  
  const pricingGrid = document.getElementById('pricingGrid');
  const combosList = document.getElementById('combosList');
  
  // Render pricing cards
  pricingGrid.innerHTML = data.tarifas.map(tarifa => `
    <div class="pricing-card">
      <div class="pricing-card-header">
        <div class="pricing-card-icon ${tarifa.icon}">${tarifa.emoji}</div>
        <h3 class="pricing-card-title">${tarifa.titulo}</h3>
      </div>
      <ul class="pricing-list">
        ${tarifa.items.map(item => `
          <li>
            <span>${item.label}</span>
            <span class="price">${item.price}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
  
  // Render combos
  combosList.innerHTML = data.combos.map(combo => `
    <li>
      <span>${combo.label}</span>
      <span class="combo-price">${combo.price}</span>
    </li>
  `).join('');
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
      <option value="paquete">Paquete General</option>
      <option value="documentos">Documentos</option>
      <option value="medicamentos">Medicamentos</option>
      <option value="electronicos">Electrónicos</option>
      <option value="celular">Celular</option>
    `;
  } else {
    options = `
      <option value="caja_s">Caja S (30x30x30)</option>
      <option value="caja_m">Caja M (40x30x30)</option>
      <option value="caja_l">Caja L (50x30x30)</option>
      <option value="caja_xl">Caja XL (60x40x40)</option>
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
  
  // Calculate price based on service and cargo type
  if (service === 'aereo') {
    if (weight <= 9.9) price = 14990;
    else if (weight <= 24.9) price = 12990;
    else price = 11990;
    
    // Multiply by weight for total
    price = price * Math.ceil(weight);
    
    if (cargo === 'electronicos') price = 18000;
    if (cargo === 'celular') price = 18990;
    if (cargo === 'documentos') price = 12990;
    if (cargo === 'medicamentos') price = 12990;
    
    estimate = '3 a 5 días hábiles';
  }
  
  if (service === 'maritimo') {
    if (cargo === 'caja_s') price = 48965;
    if (cargo === 'caja_m') price = 58500;
    if (cargo === 'caja_l') price = 72000;
    if (cargo === 'caja_xl') price = 153000;
    estimate = '15 a 25 días hábiles';
  }
  
  if (service === 'maritimo_express') {
    if (cargo === 'caja_s') price = 48965;
    if (cargo === 'caja_m') price = 95000;
    if (cargo === 'caja_l') price = 135000;
    if (cargo === 'caja_xl') price = 195000;
    estimate = '25 a 30 días hábiles';
  }
  
  // Format service name
  const serviceNames = {
    aereo: 'Aéreo Express',
    maritimo: 'Marítimo',
    maritimo_express: 'Marítimo Express'
  };
  
  // Format cargo name
  const cargoFormatted = cargo.replace(/_/g, ' ').toUpperCase();
  
  // Display result
  const quoteResult = document.getElementById('quoteResult');
  const quoteText = document.getElementById('quoteText');
  
  quoteText.innerHTML = `
    <p><span>Origen:</span> <strong>${origin}</strong></p>
    <p><span>Destino:</span> <strong>${destination}</strong></p>
    <p><span>Servicio:</span> <strong>${serviceNames[service]}</strong></p>
    <p><span>Tipo de carga:</span> <strong>${cargoFormatted}</strong></p>
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
    cargo: cargoFormatted,
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
