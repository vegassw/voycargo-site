// ================================
// DATOS DE PRECIOS POR REGIÓN
// ================================
const preciosData = {
    metropolitana: {
      region: "la Región Metropolitana",
      tarifas: [
        {
          icon: "✈️",
          titulo: "Aéreo",
          items: [
            "✓ Valor por kilo (1 kg a 10 kg): <strong>$14.990</strong>",
            "▪︎ Valor por kilo (10 kg a 25 kg): <strong>$12.990</strong>",
            "▪︎ Valor por kilo (25 kg o más): <strong>$11.990</strong>",
            "✓ Electrónico: <strong>$18.000</strong>",
            "✓ Teléfono: <strong>$18.990 + impuesto</strong>",
            "✓ Documentos: <strong>$12.990</strong>",
            "✓ Medicamento: <strong>$12.990</strong>"
          ]
        },
        {
          icon: "🚢",
          titulo: "Marítimo",
          items: [
            "✓ Caja M (40x30x30): <strong>$58.500</strong>",
            "✓ Caja L (50x30x30): <strong>$72.000</strong>",
            "✓ Caja XL (60x40x40): <strong>$153.000</strong>",
            "✓ Caja XXL (60x50x50): <strong>$238.500</strong>",
            "✓ Caja BOX (78x40x40): <strong>$258.000</strong>"
          ]
        },
        {
          icon: "⚡",
          titulo: "Marítimo Express",
          items: [
            "✓ Caja S (30x30x30, 3.5 kg): <strong>$48.965</strong>",
            "✓ Caja M (40x30x30, 5 kg): <strong>$95.000</strong>",
            "✓ Caja L (50x30x30, 10 kg): <strong>$135.000</strong>",
            "✓ Caja XL (60x40x40, 15 kg): <strong>$195.000</strong>",
            "✓ Caja XXL (60x50x50, 20 kg): <strong>$260.000</strong>"
          ]
        }
      ],
      combos: [
        "1. M + M = <strong>$99.990</strong>",
        "2. L + L = <strong>$127.000</strong>",
        "3. XL + XL = <strong>$280.000</strong>",
        "4. XG + XG = <strong>$399.990</strong>",
        "5. XXL + XXL = <strong>$455.000</strong>"
      ]
    },
  
    concepcion: {
        region: "la Región del Biobío (Concepción)",
        tarifas: [
          {
            icon: "✈️",
            titulo: "Aéreo",
            items: [
              "✓ Valor por kilo (1 kg a 25 kg): <strong>$16.990</strong>",
              "▪︎ Valor por kilo (más de 25 kg): <strong>$14.990</strong>",
              "✓ Documentos: <strong>$16.990</strong>",
              "✓ Electrónicos: <strong>$18.990</strong>",
              "✓ Celular: <strong>$24.990</strong>"
            ]
          },
          {
            icon: "🚢",
            titulo: "Marítimo Convencional",
            items: [
              "✓ Caja M (40x30x30): <strong>$76.000</strong>",
              "✓ Caja L (50x30x30): <strong>$89.990</strong>",
              "✓ Caja XL (60x40x40): <strong>$169.990</strong>",
              "✓ Caja XG (70x40x40): <strong>$213.925</strong>",
              "✓ Caja XXL (60x50x50): <strong>$253.000</strong>"
            ]
          }
        ],
        combos: [
          "1. M + M = <strong>$114.000</strong>",
          "2. L + L = <strong>$142.000</strong>",
          "3. XL + XL = <strong>$295.000</strong>",
          "4. XG + XG = <strong>$414.990</strong>",
          "5. XXL + XXL = <strong>$470.000</strong>"
        ]
      }
      
  };
  
  // ================================
  // RENDERIZAR SECCIÓN
  // ================================
  function renderPrecios(regionKey) {
    const regionData = preciosData[regionKey];
    if (!regionData) return;
  
    document.getElementById("region-nombre").textContent = regionData.region;
  
    // Render tarifas
    const tarifasHTML = regionData.tarifas.map(t => `
      <div class="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition">
        <h3 class="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">${t.icon} ${t.titulo}</h3>
        <ul class="space-y-2 text-gray-700 text-lg">
          ${t.items.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    `).join("");
    document.getElementById("tarifas-container").innerHTML = tarifasHTML;
  
    // Render combos
    const combosHTML = regionData.combos.map(c => `<li>${c}</li>`).join("");
    document.getElementById("lista-combos").innerHTML = combosHTML;
  }
  

  function initPrecios() {
    const select = document.getElementById("region-select");
    if (!select) return;
    
    renderPrecios(select.value);
    select.addEventListener("change", () => renderPrecios(select.value));
  }
  
  