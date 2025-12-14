// ================================
// MENU RESPONSIVE FIABLE (para carga dinámica)
// ================================

// Espera a que los includes terminen de cargar
document.addEventListener("DOMContentLoaded", () => {
    const tryInitMenu = () => {
      const menuBtn = document.getElementById("menu-btn");
      const mobileMenu = document.getElementById("mobile-menu");
  
      // Si el header aún no está cargado, vuelve a intentarlo
      if (!menuBtn || !mobileMenu) {
        setTimeout(tryInitMenu, 200);
        return;
      }
  
      // Si existe, conecta los eventos
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("show");
        menuBtn.textContent = mobileMenu.classList.contains("show") ? "✕" : "☰";
      });
  
      mobileMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("show");
          menuBtn.textContent = "☰";
        });
      });
    };
  
    tryInitMenu();
  });
  