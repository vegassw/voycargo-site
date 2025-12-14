function getQuote(e) {
    e.preventDefault();
  
    const origin = document.getElementById("origin").value;
    const destination = document.getElementById("destination").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const service = document.getElementById("serviceType").value;
    const cargo = document.getElementById("cargoType").value;
  
    let price = 0, estimate = "";
  
    if (service === "aereo") {
      if (weight <= 9.9) price = 12990;
      else if (weight <= 24.9) price = 11490;
      else price = 9990;
  
      if (cargo === "electronicos") price = 12990;
      if (cargo === "celular") price = 15990;
      if (cargo === "documentos") price = 11990;
      if (cargo === "medicamentos") price = 9990;
  
      estimate = "✈️ Entrega estimada: 3 a 5 días hábiles.";
    }
  
    if (service === "maritimo") {
      if (cargo === "caja_s") price = 45900;
      if (cargo === "caja_m") price = 56900;
      if (cargo === "caja_l") price = 66900;
      if (cargo === "caja_xl") price = 130900;
      estimate = "🚢 Entrega estimada: 25 a 35 días hábiles.";
    }
  
    if (service === "maritimo_express") {
      if (cargo === "caja_s") price = 54990;
      if (cargo === "caja_m") price = 79990;
      if (cargo === "caja_l") price = 139990;
      if (cargo === "caja_xl") price = 179990;
      estimate = "🚢 Entrega estimada: 25 a 30 días hábiles.";
    }
  
    if (!weight || weight <= 0) {
      alert("Por favor ingresa un peso válido.");
      return;
    }
  
    const formattedText = `
      <strong>Origen:</strong> ${origin}<br>
      <strong>Destino:</strong> ${destination}<br>
      <strong>Servicio:</strong> ${service.replace("_", " ").toUpperCase()}<br>
      <strong>Tipo de carga:</strong> ${cargo.replace("_", " ").toUpperCase()}<br>
      <strong>Peso:</strong> ${weight} kg<br>
      <strong>Precio estimado:</strong> $${price.toLocaleString("es-CL")} CLP<br>
      <em>${estimate}</em>
    `;
  
    document.getElementById("quoteText").innerHTML = formattedText;
    document.getElementById("quoteResult").classList.remove("hidden");
  }
  
  function contactWhatsApp() {
    const msg = document.getElementById("quoteText").innerText;
    const phoneNumber = "56978419619";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent("Hola 👋, quisiera confirmar la siguiente cotización:\n\n" + msg)}`;
    window.open(url, "_blank");
  }
  