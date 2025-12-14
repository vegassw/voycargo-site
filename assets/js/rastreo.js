function sendToWhatsApp() {
    const number = document.getElementById("trackingNumber").value.trim();
    if (!number) {
      alert("Por favor ingresa tu número de guía antes de rastrear.");
      return;
    }
  
    const phoneNumber = "56978419619";
    const message = `Hola 👋, deseo rastrear mi envío con el número de guía ${number}. ¿Podrían ayudarme con el estado del envío?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }
  