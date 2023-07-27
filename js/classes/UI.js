class UI {
  mostrarClima(datos, container, tipo) {
    
    this.limpiarHMTL(container);

    const {
      current: {
        temp_c,
        temp_f,
        humidity,
        wind_degree,
        last_updated,
        vis_km,
        pressure_in,
        wind_kph,
        cloud,
        precip_in,
      },
      location: { name, lat, lon, tz_id, country },
    } = datos;

    // SCRIPTING
    const contenidoClima = document.createElement("DIV");
    contenidoClima.className = "contenido-clima p-3 mx-auto mt-4";
    const divRegion = document.createElement("DIV");
    divRegion.classList.add("d-flex");
    const regionText = document.createElement("H3");
    regionText.classList.add("mb-0");
    regionText.textContent = name;
    const iconUbicacion = document.createElement("I");
    iconUbicacion.className = "bi bi-geo-alt-fill";
    divRegion.appendChild(regionText);
    divRegion.appendChild(iconUbicacion);

    const divClima = document.createElement("DIV");
    divClima.className =
      "d-flex align-items-center justify-content-center mt-5";
    divClima.innerHTML = `
        <i class="bi bi-thermometer-sun mx-2"></i>
        <h2>${tipo ? temp_f+"°F" : temp_c+"°C"}</h2>
        <img src="img/Group 41.png" alt="" />
      `;

    const divFecha = document.createElement("DIV");
    divFecha.classList.add("fecha-actual");
    divFecha.innerHTML = `${last_updated} ${
      Number(last_updated.slice(11, 13)) >= 12 ? "PM" : "AM"
    }; ${country}`;

    const divMasInfo = document.createElement("DIV");
    divMasInfo.className =
      "d-flex flex-wrap justify-content-center justify-content-around mt-5";
    divMasInfo.innerHTML = `
          <div class="text-center">
           <p class="mb-0">Humedad</p>
           <p>${humidity}%</p>
          </div>
          <div class="text-center">
           <p class="mb-0">Visibilidad</p>
           <p>${vis_km}Km</p>
          </div>
          <div class="text-center">
           <p class="mb-0">Presión at.</p>
           <p>${pressure_in}inHg</p>
          </div>
          <div class="text-center">
           <p class="mb-0">Velocidad del viento</p>
           <p>${wind_kph}Km/h</p>
          </div>
      `;

    contenidoClima.appendChild(divRegion);
    contenidoClima.appendChild(divClima);
    contenidoClima.appendChild(divFecha);
    contenidoClima.appendChild(divMasInfo);

    const divInfoExtra = document.createElement("DIV");
    divInfoExtra.className =
      "infoExtra d-flex flex-wrap justify-content-center mt-5";
    divInfoExtra.innerHTML = `
         <div class="text-center">
            <p class="mb-0">Cobertura de nubes</p>
            <img class="img-fluid" src="img/nubes.png">
            <p>${cloud}%</p>
          </div>
          <div class="text-center">
            <p class="mb-0">Precipitación</p>
            <img class="img-fluid" src="img/termica.png">
            <p>${precip_in}</p>
          </div>
          <div class="text-center">
            <p class="mb-0">Dirección del viento</p>
            <img class="img-fluid" src="img/viento.png">
            <p>${wind_degree}°</p>
          </div>
          <div class="text-center">
            <p class="mb-0">Latitud</p>
            <img class="img-fluid" src="img/latitud.png">
            <p>${lat}</p>
          </div>
          <div class="text-center">
            <p class="mb-0">Longitud</p>
            <img class="img-fluid" src="img/longitud.png">
            <p>${lon}</p>
          </div>
          <div class="text-center">
            <p class="mb-0">Zona horaria</p>
            <img class="img-fluid" src="img/zona.png">
            <p>${tz_id}</p>
          </div>
      `;

    // Insertamos el HTML
    container.appendChild(contenidoClima);
    container.appendChild(divInfoExtra);

  }

  mostrarAviso(mensaje) {
    Swal.fire({
      icon: "error",
      title: "¡Error!",
      text: mensaje,
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
      customClass: {
        container: "mi-contenedor-swal",
        title: "mi-titulo-swal",
        text: "mi-texto-swal",
        confirmButton: "mi-boton-swal",
      },
      buttonsStyling: false,
      confirmButtonText: "Entendido",
      cancelButtonText: "Cancelar",
      showCancelButton: false,
      reverseButtons: true,
      background: "#f2f2f2",
      timer: 4000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  }

  spinner() {
    Swal.fire({
      html: `
        <div class="sk-cube-grid">
          <div class="sk-cube sk-cube1"></div>
          <div class="sk-cube sk-cube2"></div>
          <div class="sk-cube sk-cube3"></div>
          <div class="sk-cube sk-cube4"></div>
          <div class="sk-cube sk-cube5"></div>
          <div class="sk-cube sk-cube6"></div>
          <div class="sk-cube sk-cube7"></div>
          <div class="sk-cube sk-cube8"></div>
          <div class="sk-cube sk-cube9"></div>
        </div>
      `,
      showConfirmButton: false, // Ocultar el botón de confirmación
      allowOutsideClick: false, // Evitar que se cierre haciendo clic fuera del modal
      allowEscapeKey: false, // Evitar que se cierre con la tecla "Esc"
      background: "transparent",
      timer: 3000,
    });
  }

  limpiarHMTL(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }
}

export default UI;
