import API from "./classes/API.js";
import UI from "./classes/UI.js";
import Funciones from "./classes/Funciones.js";

(function () {
  // VARIABLES
  const btnBuscarCuidad = document.querySelector("#btn-buscar-ciudad");
  const contenidoClima = document.querySelector(".clima-informacion");
  const btnCambiarTemperatura = document.querySelector(
    ".container .form-check-input"
  );

  // INSTANCIAS
  const api = new API();
  const ui = new UI();
  const funcion = new Funciones();

  // EVENTOS
  eventListeners();
  function eventListeners() {
    // Cunado el documento esta listo
    document.addEventListener("DOMContentLoaded", async () => {
      // Mostrar el clima de la ciudad de LIMA
      const { data } = await api.obtenerDatos("Lima");
      ui.mostrarClima(data, contenidoClima);

      // Actualizamos la hora del header canda 1 SEGUNDO
      const hora = document.querySelector("#header p");
      setInterval(() => funcion.actualizarHora(hora), 1000);

      // Tenemos la opcion de cambiar los grados
      cambiarTemperatura(data, btnCambiarTemperatura);
    });

    // Buscamos por el input
    btnBuscarCuidad.addEventListener("click", buscarCiudad);
  }

  // FUNCIONES
  async function buscarCiudad() {
    const buscarCiudadInput = document.querySelector(".input-with-icon").value;

    if (buscarCiudadInput.trim() === "") {
      ui.mostrarAviso("Es obligario llenar el campo");
      return;
    }

    const { encontrado, data } = await api.obtenerDatos(buscarCiudadInput);

    if (!encontrado) {
      ui.mostrarAviso(data);
      return;
    }

    ui.spinner();

    // Mostramos el clima
    setTimeout(() => {
      ui.mostrarClima(data, contenidoClima);
      btnCambiarTemperatura.checked = false;
    }, 3000);

    // Tenemos la opcion de cambiar la temperatura
    cambiarTemperatura(data, btnCambiarTemperatura);
  }

  function cambiarTemperatura(clima, btn) {
    btn.addEventListener("change", (e) => {
      if (typeof clima === "string") {
        ui.mostrarAviso(clima);
        return;
      }

      const {
        current: { temperature, feelslike },
      } = clima;
      const isFahrenheit = e.target.checked;

      if (isFahrenheit) {
        clima.current.temperature = funcion.celsiusToFahrenheit(
          temperature,
          "F"
        );
        clima.current.feelslike = funcion.celsiusToFahrenheit(feelslike, "F");
      } else {
        clima.current.temperature = funcion.celsiusToFahrenheit(temperature);
        clima.current.feelslike = funcion.celsiusToFahrenheit(feelslike);
      }

      ui.mostrarClima(clima, contenidoClima, isFahrenheit ? "F" : undefined);
    });
  }
})();
