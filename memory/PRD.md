# VoyCargo - Website Refactorization PRD

## Original Problem Statement
Refactorizar el sitio web de VoyCargo manteniendo la misma información pero con diseño minimalista, responsivo, que genere confianza. Integración WhatsApp. Frontend estático para GitHub Pages.

## Última Actualización: Feb 2026
- Precios actualizados según imágenes del cliente
- Nuevo diseño premium para sección de precios

## Architecture
- **Type:** Static Website (HTML/CSS/JS)
- **Hosting:** GitHub Pages
- **Structure:** Single page with smooth scroll

## Precios Actualizados (Feb 2026)

### SANTIAGO (Región Metropolitana)
**Aéreo:**
- 1-10 kg: $13.990/kg
- 10-25 kg: $11.990/kg
- 25+ kg: $10.990/kg
- Celulares: $15.990
- Electrónicos: $15.990/kg
- Documentos: $12.990 (hasta 250gr)
- Medicamentos: $12.990 (hasta 500gr)
- Televisores: $11.990/kg

**Marítimo Tradicional:**
- S (30×30×30): $44.990
- M (40×30×30): $54.990
- L (50×30×30): $67.990
- XL (60×40×40): $142.990
- XG (70×40×40): $162.990
- XXL (60×50×50): $225.990

**Promociones Santiago:**
- S+S: $85.990
- M+M: $105.990
- L+L: $129.990
- XL+XL: $279.990
- XG+XG: $319.990
- XXL+XXL: $444.990

### CONCEPCIÓN (Región del Biobío)
**Aéreo:**
- Por kg: $15.990
- Celulares: $18.990
- Electrónicos: $17.990/kg
- Documentos: $14.990 (hasta 250gr)
- Medicamentos: $12.990 (hasta 500gr)
- Televisores: $13.990/kg

**Marítimo Tradicional:**
- S: $56.990
- M: $66.990
- L: $79.990
- XL: $154.990
- XG: $174.990
- XXL: $237.990

**Promociones Concepción:**
- S+S: $104.990
- M+M: $124.990
- L+L: $150.990
- XL+XL: $300.990
- XG+XG: $340.990
- XXL+XXL: $470.990

## What's Been Implemented
- [x] Hero section con banderas
- [x] Navegación desktop + mobile
- [x] 4 servicios
- [x] **NEW: Sección de precios premium con tabs región/servicio**
- [x] **NEW: Animaciones y diseño tipo "pricing card" premium**
- [x] **NEW: Todos los precios actualizados Feb 2026**
- [x] Formulario de cotización con cálculo
- [x] Integración WhatsApp
- [x] Testimonios
- [x] Footer + botón flotante WhatsApp

## File Structure
```
/app/
├── index.html
├── CNAME
└── assets/
    ├── css/styles.css
    ├── js/main.js
    └── img/
```

## Testing Status
- Frontend: 100% passed
- Precios verificados para ambas regiones
- Tabs funcionando correctamente

## Backlog
- P2: Agregar más testimonios reales
- P2: Integrar Google Analytics
- P3: SEO optimization
