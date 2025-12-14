// Cargar componentes HTML de forma dinámica
document.querySelectorAll(".include").forEach(el => {
    const file = el.getAttribute("data-file");
    fetch(file)
      .then(response => response.text())
      .then(data => el.innerHTML = data)
      .catch(() => el.innerHTML = "<p>Error al cargar sección.</p>");
  });
  
  // Scroll suave
  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }
  
  // Menú responsive (opcional)
  document.addEventListener("click", e => {
    if (e.target.matches("#menuToggle")) {
      document.querySelector("#menuMobile").classList.toggle("hidden");
    }
  });
  