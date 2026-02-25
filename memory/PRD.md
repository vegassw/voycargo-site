# VoyCargo - Website Refactorization PRD

## Original Problem Statement
Refactorizar el sitio web de VoyCargo (https://voycargo.cl) manteniendo la misma información pero con un diseño minimalista, totalmente responsivo, que genere confianza para envíos entre Chile y Venezuela. Integración con WhatsApp. Frontend estático para GitHub Pages.

## Architecture
- **Type:** Static Website (HTML/CSS/JS)
- **Hosting:** GitHub Pages
- **Structure:** Single page application with smooth scroll navigation

## User Personas
1. **Emigrantes chilenos/venezolanos** - Quieren enviar paquetes a familiares
2. **Comerciantes** - Envían productos regularmente
3. **Familias** - Envío de medicinas y documentos urgentes

## Core Requirements (Static)
- ✅ Diseño minimalista y profesional
- ✅ 100% Responsivo (mobile-first)
- ✅ Integración WhatsApp (botón flotante + links)
- ✅ Calculadora de cotización
- ✅ Tarifas por región (Metropolitana y Concepción)
- ✅ Todos los precios actualizados del sitio original

## What's Been Implemented (Feb 2025)
- [x] Hero section con banderas Chile/Venezuela
- [x] Navegación desktop + mobile hamburger menu
- [x] Sección de 4 servicios (Aéreo, Marítimo, Express, Retiro)
- [x] Tarifas con tabs por región (data dinámica)
- [x] Formulario de cotización con cálculo instantáneo
- [x] Integración WhatsApp (envío de cotización)
- [x] 6 beneficios/razones para elegir VoyCargo
- [x] 3 testimonios de clientes
- [x] Footer con información de contacto
- [x] Botón WhatsApp flotante
- [x] Smooth scroll navigation

## File Structure
```
/app/
├── index.html              # Página principal (todo el sitio)
├── CNAME                   # Dominio voycargo.cl
├── assets/
│   ├── css/styles.css     # Estilos completos
│   ├── js/main.js         # Lógica (precios, cotización, menú)
│   └── img/               # Logo y banderas
└── components/            # (legacy, no se usa)
```

## Testing Status
- Frontend: 100% passed
- All sections rendering correctly
- Form validation working
- WhatsApp integration working
- Mobile responsive verified

## Next Actions / Backlog
- P1: Agregar sección FAQ expandible
- P2: Añadir más testimonios reales
- P2: Integrar Google Analytics
- P3: Agregar blog de noticias

## Notes
- WhatsApp: +56 9 7841 9619
- Número está hardcoded en el código
- Precios actualizados según sitio original (Ene 2026)
